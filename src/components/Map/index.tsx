import React from "react";
import theme from "@/theme";
import styled from "styled-components";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayerGroup,
  Circle,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const Map = ({
  height = "700px",
  center = [41.902782, 12.496366],
  zoom = 8,
  children,
  className,
  selection,
  withRadius = false,
  radius,
}: any) => {
  const colorMap = {
    light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
  };

  const customMarker = new Icon({
    iconUrl: `static/pin/redPin.svg`,
    iconSize: [25, 41],
    iconAnchor: [10, 30],
    popupAnchor: [2, -20],
  });
  return (
    <MapContainerStyle
      zoomAnimation
      touchZoom
      markerZoomAnimation
      fadeAnimation
      scrollWheelZoom={false}
      className={className ? className : ""}
      center={selection ? selection.position : center}
      zoom={zoom}
      style={{ height, width: "100%" }}
    >
      <LayersControl>
        <LayersControl.BaseLayer checked name="Map">
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
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
      {children && children}
      {selection?.position && (
        <Marker position={selection.position} icon={customMarker}>
          <Popup>{selection.label}</Popup>
        </Marker>
      )}
      {withRadius && selection?.position && (
        <LayerGroup>
          <Circle
            center={selection.position}
            radius={(radius || 20) * 100}
            pathOptions={{ color: "#3388ff", fillColor: "blue" }}
          />
        </LayerGroup>
      )}
    </MapContainerStyle>
  );
};

export default React.memo(Map);

const MapContainerStyle = styled(MapContainer)`
  width: 100%;
  height: 700px;
  .leaflet-div-icon {
    background: transparent !important;
    border: none !important;
  }
`;
