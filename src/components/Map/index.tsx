import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayerGroup,
  Circle,
  useMap,
} from "react-leaflet";
import L, { Icon } from "leaflet";
import { Icon as Icona } from "..";
import theme from "@/theme";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const DEFAULTZOOM = 12;

const CenterNav = ({ position = "topright", selection, zoom }: any) => {
  const map = useMap();
  const helpDivRef: any = useRef(null);

  const handleFly = () => {
    if (map && selection && selection.position) {
      map.flyTo(selection.position, zoom, { animate: true });
    }
  };

  useEffect(() => {
    const MapHelp = L.Control.extend({
      onAdd: () => {
        const helpDiv = L.DomUtil.create("div", "");
        helpDiv.classList.add("button-redirect");

        const iconWrapper = L.DomUtil.create("div", "icon-wrapper");
        helpDiv.appendChild(iconWrapper);
        const iconElement = document.createElement("div");
        iconWrapper.appendChild(iconElement);

        const root = createRoot(iconElement);
        root.render(
          <Icona
            name="pin"
            size={theme.spaces.space6}
            color={theme.colors.success}
          />
        );

        helpDivRef.current = helpDiv;
        helpDiv.addEventListener("click", handleFly);

        return helpDiv;
      },
      onRemove: () => {
        if (helpDivRef.current) {
          helpDivRef.current.removeEventListener("click", handleFly);
        }
      },
    });

    const control = new MapHelp({ position });
    control.addTo(map);

    return () => {
      if (helpDivRef.current) {
        helpDivRef.current.remove();
      }
    };
  }, [map, selection]);

  return null;
};

const UpdateMapView = ({
  selection,
  selectionSeller,
  zoom,
  withRadius = false,
  radius,
  dinamic,
}: {
  selection?: any;
  selectionSeller?: any;
  zoom?: number;
  withRadius?: boolean;
  radius?: number;
  dinamic?: boolean;
}) => {
  const [circleRadius, setCircleRadius] = useState((radius || 20) * 100);
  const map = useMap();

  useEffect(() => {
    // if (map && center) {
    //   map.setView(center, zoom, { animate: true });
    // }
    if (map && zoom && !dinamic) {
      map.setZoom(zoom, { animate: true });
    }
    if (map && selection && selection.position && !dinamic) {
      map.flyTo(selection.position, zoom, { animate: true });
    }
    if (map && selectionSeller && selectionSeller.position && !dinamic) {
      map.flyTo(selectionSeller.position, zoom, { animate: true });
    }
  }, [zoom, selection, selectionSeller, map]);

  useEffect(() => {
    if (map) {
      // Logica per adattare il raggio in base al livello di zoom
      const newRadius = radius ? radius * 100 : 200;
      setCircleRadius(newRadius);
    }
  }, [zoom, radius, map]);

  return (
    <>
      {withRadius && selection?.position && (
        <LayerGroup>
          <Circle
            center={selection.position}
            radius={circleRadius}
            pathOptions={{ color: "#3388ff", fillColor: "blue" }}
          />
        </LayerGroup>
      )}
    </>
  );
};

const Map = ({
  height = "700px",
  center = [41.902782, 12.496366],
  zoom = 8,
  children,
  className,
  selection,
  selectionSeller,
  withRadius = false,
  radius,
  dinamic,
}: any) => {
  const colorMap = {
    light: "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
    dark: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
  };

  const customMarker = useMemo(
    () =>
      new Icon({
        iconUrl: `static/pin/redPin.svg`,
        iconSize: [25, 41],
        iconAnchor: [10, 30],
        popupAnchor: [2, -20],
      }),
    []
  );

  const customSellerMarker = useMemo(
    () =>
      new Icon({
        iconUrl: `static/pin/greenPin.svg`,
        iconSize: [25, 41],
        iconAnchor: [10, 30],
        popupAnchor: [2, -20],
      }),
    []
  );

  return (
    <MapContainerStyle
      center={center}
      zoom={DEFAULTZOOM}
      zoomAnimation
      touchZoom
      markerZoomAnimation
      fadeAnimation
      scrollWheelZoom={false}
      className={className ? className : ""}
      height={height}
    >
      <UpdateMapView
        dinamic={dinamic}
        selection={selection}
        selectionSeller={selectionSeller}
        zoom={zoom}
        withRadius={withRadius}
        radius={radius}
      />
      <LayersControl>
        <LayersControl.BaseLayer checked name="Map">
          <TileLayer attribution="Google Maps" url={colorMap.light} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution="Google Maps Satellite"
            url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>

        {/* <LayersControl.BaseLayer name="Leaflet">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={colorMap.light}
          />
        </LayersControl.BaseLayer> */}
      </LayersControl>
      {selection?.position && <CenterNav zoom={zoom} selection={selection} />}
      {children && children}
      {selection?.position && (
        <Marker position={selection.position} icon={customMarker}>
          <Popup>{selection.label}</Popup>
        </Marker>
      )}
      {selectionSeller?.position && (
        <Marker position={selectionSeller.position} icon={customSellerMarker}>
          <Popup>{selectionSeller.label}</Popup>
        </Marker>
      )}
    </MapContainerStyle>
  );
};

export default React.memo(Map);

const MapContainerStyle = styled(MapContainer)<{ height: string }>`
  width: 100%;
  height: ${(p) => p.height};
  .leaflet-div-icon {
    background: transparent !important;
    border: none !important;
  }
  .button-redirect {
    border: 2px solid rgba(0, 0, 0, 0.2);
    width: 48px;
    height: 48px;
    background: ${theme.colors.white};
    border-radius: ${theme.spaces.space1};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
