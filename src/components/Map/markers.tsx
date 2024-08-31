import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Circle,
  LayerGroup,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import useSupercluster from "use-supercluster";
import styled from "styled-components";
import theme from "@/theme";
import Rating from "../Rating";
import Card from "../Card";
import { optionsAnimate } from "@/utils/constants";

const icons: any = {};

const fetchIcon = (count: any, size: any) => {
  if (!icons[count]) {
    const markerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: #3388ff;
        color: white;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0px 0px 0px 10px #3388ff99;
      ">
        ${count}
      </div>
    `;
    icons[count] = L.divIcon({
      html: markerHTML,
    });
  }
  return icons[count];
};

const Markers = ({
  options,
  zoom,
  active,
  setActive,
  isSmall = false,
}: any) => {
  const [selectedMarker, setSelectedMarker] = useState<any>(active);
  const [bounds, setBounds] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState<any>(zoom);
  const [done, setDone] = useState(true);
  const [showCircle, setShowCircle] = useState(false);
  const markerRef: any = useRef({});
  const markerHtmlPopup: any = useRef({});
  const popupRef: any = useRef({});
  const map = useMap();

  useEffect(() => {
    updateMap();
  }, [done]);

  useEffect(() => {
    if (active) {
      if (!active?.isInternal) {
        map.flyTo(active.position, 15, optionsAnimate);
        map.on("zoomend", function () {
          markerRef.current[active.id]?.openPopup();
        });
      }
      setSelectedMarker(active);
    }
    return () => {
      map.off("zoomend");
    };
  }, [active]);

  const handleMarkerClick = (mark: any) => {
    updateMap();
    setSelectedMarker(mark);
    setActive && setActive(mark);

    // offset position marker and popup
    const offsetY = isSmall ? 0 : 100;

    const point = map.latLngToContainerPoint(mark.position);
    const newPoint = L.point(point.x, point.y - offsetY);

    const newLatLng = map.containerPointToLatLng(newPoint);

    map.flyTo(newLatLng, map.getZoom(), optionsAnimate);
    setShowCircle(false);
  };

  useMapEvents({
    click: (e) => {
      if (
        markerHtmlPopup.current &&
        Object.keys(markerHtmlPopup.current)?.length &&
        markerHtmlPopup.current.contains(e.originalEvent.target)
      )
        return;
      setSelectedMarker(null);
      setActive && setActive(null);
      setShowCircle(false);
    },
    moveend: () => {
      setShowCircle(true);
    },
  });

  const updateMap = (e?: any) => {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setCurrentZoom(map.getZoom());
    // handling close selection when move
    if (e && e.type == "move" && e.originalEvent) {
      if (selectedMarker && markerRef?.current) {
        const markerPosition = selectedMarker.position;
        // Check if the marker is within the current map bounds
        Object.keys(markerRef.current).forEach((el: any) => {
          markerRef.current[el]?.closePopup();
        });
        !isSmall && setSelectedMarker(null);
      }
    }
  };

  useEffect(() => {
    map.on("move", updateMap);
    return () => {
      map.off("move", updateMap);
    };
  }, [map, updateMap]);

  const points = options.map((mark: any) => ({
    id: mark.id,
    type: "Feature",
    properties: {
      id: mark.id,
      cluster: false,
      name: mark.name,
      rating: mark.rating,
      range: mark.range,
      profession: mark.profession,
      createdAt: mark.createdAt,
    },
    geometry: {
      type: "Point",
      coordinates: [parseFloat(mark.position[1]), parseFloat(mark.position[0])],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: currentZoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <ContentMarker>
      {clusters.map((cluster, i) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    22
                  );
                  map.setView(
                    [latitude, longitude],
                    expansionZoom,
                    optionsAnimate
                  );
                },
              }}
            />
          );
        }

        const initColor: any = {
          1: `static/pin/gBlue.svg`,
          2: `static/pin/gBlue.svg`,
          3: `static/pin/gBlue.svg`,
          4: `static/pin/gBlue.svg`,
          5: `static/pin/gBlue.svg`,
          active: `static/pin/gRed.svg`,
        };

        const customMarkers = new Icon({
          iconUrl: initColor[cluster.properties.rating || 0],
          iconSize: [25, 41],
          iconAnchor: [10, 40],
          popupAnchor: [2, -40],
        });

        const selectedMarkers = new Icon({
          iconUrl: initColor.active,
          iconSize: [25, 41],
          iconAnchor: [10, 40],
          popupAnchor: [2, -40],
        });

        return (
          <Marker
            key={`marker-${cluster.properties.name}`}
            ref={(mark) => {
              markerRef.current[cluster.properties.id] = mark;
            }}
            position={[latitude, longitude]}
            icon={
              selectedMarker?.id === cluster.properties.id
                ? selectedMarkers
                : customMarkers
            }
            eventHandlers={{
              click: () => {
                handleMarkerClick({
                  ...cluster.properties,
                  position: [latitude, longitude],
                  isInternal: true,
                });
              },
            }}
          >
            {!isSmall && cluster.properties.name && (
              <CustomPopup
                autoClose
                closeOnEscapeKey
                closeButton={false}
                ref={(pop) => {
                  popupRef.current[cluster.properties.id] = pop;
                }}
              >
                <Card option={cluster.properties} mini={isSmall} />
              </CustomPopup>
            )}
            {cluster.properties.range &&
              selectedMarker?.id === cluster.properties.id &&
              showCircle && (
                <LayerGroup>
                  <Circle
                    center={[latitude, longitude]}
                    radius={cluster.properties.range * 100}
                    pathOptions={{ color: "#3388ff", fillColor: "blue" }}
                  />
                </LayerGroup>
              )}
            {isSmall && selectedMarker?.id && (
              <div ref={markerHtmlPopup} className="content-popup">
                <div className="popup-body">
                  <Card option={selectedMarker} mini={isSmall} />
                </div>
              </div>
            )}
          </Marker>
        );
      })}
    </ContentMarker>
  );
};

export default React.memo(Markers);

const ContentMarker = styled.div``;
const CustomPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    background: unset;
    color: unset;
    box-shadow: none;
    padding: 0;
    .leaflet-popup-content {
      margin: 0;
      width: 250px !important;
      .card {
        .cardstyle {
          margin: 0;
          .content-card {
            margin: 0;
          }
        }
      }
    }
  }
`;
const Drop = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: ${theme.extra.radius};
  .profile {
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme.spaces.space2};
    .registered {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: ${theme.spaces.space2};
    }
    .row {
      display: flex;
      align-items: center;
      gap: ${theme.spaces.space2};
      .img {
        width: 80px;
        box-shadow: ${theme.extra.shadow};
        border-radius: ${theme.extra.radiusRound};
        overflow: hidden;
      }
      .info {
        display: flex;
        flex-direction: column;
        p {
          margin-top: 0;
          margin-bottom: ${theme.spaces.space2};
          font-size: ${theme.font.size.tiny};
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;
