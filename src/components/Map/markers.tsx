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
import { Button } from "..";
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

const Markers = ({ options, zoom, active }: any) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [bounds, setBounds] = useState<any>(null);
  const [currentZoom, setCurrentZoom] = useState<any>(zoom);
  const map = useMap();

  const handleMarkerClick = (mark: any) => {
    setSelectedMarker(mark.name);
    // if (selectedMarker !== mark.name) {
    //   map.setView(mark.position, zoom, { animate: true });
    // }
  };

  useMapEvents({
    click: () => {
      setSelectedMarker(null);
    },
  });

  const updateMap = useCallback(() => {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setCurrentZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map, updateMap]);

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
  }, [map]);

  return (
    <ContentMarker>
      {clusters.map((cluster) => {
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
          1: `static/pin/gBlue.svg`,
          2: `static/pin/gBlue.svg`,
          3: `static/pin/gBlue.svg`,
          4: `static/pin/gBlue.svg`,
          5: `static/pin/gBlue.svg`,
        };

        const customMarker = new Icon({
          iconUrl: initColor[cluster.properties.rating || 0],
          iconSize: [25, 41],
          iconAnchor: [10, 40],
          popupAnchor: [2, -40],
        });

        return (
          <Marker
            key={`marker-${cluster.properties.name}`}
            position={[latitude, longitude]}
            icon={customMarker}
            eventHandlers={{
              click: () => {
                handleMarkerClick(cluster.properties);
              },
            }}
          >
            {cluster.properties.name && (
              <Popup>
                <Drop>
                  <div className="profile">
                    <div className="registered">
                      <p className="m-0">06/03/2022</p>
                      {cluster.properties.rating && (
                        <Rating
                          rate={cluster.properties.rating}
                          size={theme.spaces.space3}
                          disable
                        />
                      )}
                    </div>
                    <div className="row">
                      <div className="img">
                        <img
                          src={`https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg`}
                          alt="img"
                        />
                      </div>
                      <div className="info">
                        <p>
                          <span className="bold">Nome:</span>{" "}
                          {cluster.properties.name}
                        </p>
                        <p>
                          <span className="bold">Raggio:</span>{" "}
                          {cluster.properties.range}km
                        </p>
                        <p>
                          <span className="bold">Professione:</span>{" "}
                          {cluster.properties.profession}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button kind="inverse-primary" className="btn" size="sm">
                    Dettaglio
                  </Button>
                </Drop>
              </Popup>
            )}
            {cluster.properties.range &&
              selectedMarker === cluster.properties.name && (
                <LayerGroup>
                  <Circle
                    center={[latitude, longitude]}
                    radius={cluster.properties.range * 100}
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
        border-radius: 50px;
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
    text-transform: uppercase;
    height: inherit;
    &:hover {
      border-color: inherit;
    }
    &:active,
    &:focus {
      animation: none !important;
      transform: none !important;
    }
  }
`;
