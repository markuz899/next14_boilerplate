import React, { useEffect, useState } from "react";
import {
  Circle,
  LayerGroup,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styled from "styled-components";
import theme from "@/theme";
import { Button } from "..";
import Rating from "../Rating";

const Markers = ({ options, zoom }: any) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
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
    options.length &&
    options.map((mark: any) => {
      return (
        <Marker
          key={mark.name}
          position={mark.position}
          eventHandlers={{
            click: () => {
              handleMarkerClick(mark);
            },
          }}
        >
          {mark.name && (
            <Popup>
              <Drop>
                <div className="profile">
                  <div className="registered">
                    <p className="m-0">06/03/2022</p>
                    {mark?.rating && (
                      <Rating
                        rate={mark?.rating}
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
                        <span className="bold">Nome:</span> {mark.name}
                      </p>
                      <p>
                        <span className="bold">Raggio:</span> {mark.range}km
                      </p>
                      <p>
                        <span className="bold">Professione:</span>{" "}
                        {mark.profession}
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
          {mark.range && selectedMarker === mark.name && (
            <LayerGroup>
              <Circle
                center={mark.position}
                radius={mark.range * 100}
                pathOptions={{ color: "#3388ff", fillColor: "blue" }}
              />
            </LayerGroup>
          )}
        </Marker>
      );
    })
  );
};

export default React.memo(Markers);

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
