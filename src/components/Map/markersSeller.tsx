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
import Button from "../Button";
import Rating from "../Rating";

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

const Markers = ({ options, zoom, active, setActive }: any) => {
  const [selectedMarker, setSelectedMarker] = useState<any>(active);
  const [bounds, setBounds] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState<any>(zoom);
  const [done, setDone] = useState(true);
  const markerRef: any = useRef({});
  const popupRef: any = useRef({});
  const map = useMap();

  useEffect(() => {
    updateMap();
  }, [done]);

  useEffect(() => {
    if (active) {
      if (!active?.isInternal) {
        map.flyTo(active.position, 15, { animate: true });
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
  };

  useMapEvents({
    click: () => {
      setSelectedMarker(null);
      setActive && setActive(null);
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
        setSelectedMarker(null);
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

  useEffect(() => {
    // Disabilita lo scroll zoom di default
    map.scrollWheelZoom.disable();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.key === "Meta" || e.key === "Ctrl") {
        map.scrollWheelZoom.enable();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.key === "Meta" || e.key === "Ctrl") {
        map.scrollWheelZoom.disable();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      map.scrollWheelZoom.enable(); // Ensure the scroll zoom is enabled if component is unmounted
    };
  }, []);

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
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        const initColor: any = {
          1: `static/pin/gGreen.svg`,
          2: `static/pin/gGreen.svg`,
          3: `static/pin/gGreen.svg`,
          4: `static/pin/gGreen.svg`,
          5: `static/pin/gGreen.svg`,
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
            {cluster.properties.name && (
              <Popup
                autoClose
                closeOnEscapeKey
                ref={(pop) => {
                  popupRef.current[cluster.properties.id] = pop;
                }}
              >
                VENDITORE
              </Popup>
            )}
            {selectedMarker?.id === cluster.properties.id && (
              <LayerGroup>
                <Circle
                  center={[latitude, longitude]}
                  radius={100}
                  pathOptions={{ color: "#3388ff", fillColor: "blue" }}
                />
              </LayerGroup>
            )}
          </Marker>
        );
      })}
    </ContentMarker>
  );
};

export default React.memo(Markers);

const ContentMarker = styled.div``;

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
  button {
    border: 2px solid ${theme.colors.primary};
    padding: ${theme.spaces.space2};
    border-radius: ${theme.extra.radiusBig};
    text-transform: uppercase;
    height: inherit;
    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    }
    &:active,
    &:focus {
      animation: none !important;
      transform: none !important;
    }
  }
`;
