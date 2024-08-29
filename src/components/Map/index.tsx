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
  useMapEvents,
} from "react-leaflet";
import L, { Icon } from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import { Icon as Icona, Tooltip } from "..";
import theme from "@/theme";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import { isAppleDevice } from "@/utils/isMobile";
import { optionsAnimate } from "@/utils/constants";

const DEFAULTZOOM = 12;

const CenterNav = ({
  position = "topright",
  selection,
  zoom,
  iconName,
  iconColor = theme.colors.success,
  onClick,
  block,
  withTooltip,
}: any) => {
  const map = useMap();
  const helpDivRef: any = useRef(null);

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
        const render = withTooltip ? (
          <Tooltip content={withTooltip} flex>
            <Icona
              name={iconName}
              size={theme.spaces.space6}
              color={iconColor}
            />
          </Tooltip>
        ) : (
          <Icona name={iconName} size={theme.spaces.space6} color={iconColor} />
        );

        root.render(render);

        helpDivRef.current = helpDiv;
        helpDiv.addEventListener("click", onClick);

        return helpDiv;
      },
      onRemove: () => {
        if (helpDivRef.current) {
          helpDivRef.current.removeEventListener("click", onClick);
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
  }, [map, block]);

  return null;
};

const UpdateMapView = ({
  selection,
  selectionSeller,
  zoom,
  withRadius = false,
  radius,
  dinamic,
  onChange,
}: {
  selection?: any;
  selectionSeller?: any;
  zoom?: number;
  withRadius?: boolean;
  radius?: number;
  dinamic?: boolean;
  onChange?: any;
}) => {
  const [circleRadius, setCircleRadius] = useState((radius || 20) * 100);
  const map = useMap();

  useEffect(() => {
    // if (map && center) {
    //   map.setView(center, zoom, optionsAnimate);
    // }
    if (map && zoom && !dinamic) {
      map.setZoom(zoom, optionsAnimate);
    }
    if (map && selection && selection.position && !dinamic) {
      map.flyTo(selection.position, zoom, optionsAnimate);
    }
    if (map && selectionSeller && selectionSeller.position && !dinamic) {
      map.flyTo(selectionSeller.position, zoom, optionsAnimate);
    }
  }, [zoom, selection, selectionSeller, map]);

  useEffect(() => {
    if (map) {
      // Logica per adattare il raggio in base al livello di zoom
      const newRadius = radius ? radius * 100 : 200;
      setCircleRadius(newRadius);
    }
  }, [zoom, radius, map]);

  useMapEvents({
    moveend: (event) => {
      const map = event.target;
      const { lat, lng } = map.getCenter();
      onChange && onChange({ position: [lat, lng] });
    },
  });

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

const GestureHandlingSetter = () => {
  /* eslint-disable */
  const map = useMap() as any;
  map?.gestureHandling?.enable();
  map.addHandler("gestureHandling", GestureHandling);
  /* eslint-enable */
  return null;
};

const Map = ({
  height,
  center = [41.902782, 12.496366],
  zoom = 8,
  children,
  className,
  selection,
  selectionSeller,
  withRadius = false,
  radius,
  dinamic,
  gestureHandling = true,
  onChange,
}: any) => {
  const [device, setDevice] = useState<boolean>();
  const [block, setBlock] = useState(false);
  const [mapHeight, setMapHeight] = useState(height || "100vh");
  const map: any = useRef();

  useEffect(() => {
    const handleResize = () => {
      const navbarHeight = document.querySelector(".navbar")?.clientHeight || 0;
      const filtersHeight =
        document.querySelector(".filters")?.clientHeight || 0;
      const calculatedHeight =
        window.innerHeight - navbarHeight - filtersHeight - 2;
      setMapHeight(`${calculatedHeight}px`);
    };

    if (!height) {
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [map, height]);

  const handleFly = () => {
    if (map && map?.current && selection && selection.position) {
      map?.current.flyTo(selection.position, zoom, optionsAnimate);
    }
  };

  const handleBlock = () => {
    setBlock(!block);
  };

  useEffect(() => {
    const d = isAppleDevice();
    setDevice(d);
  }, []);

  useEffect(() => {
    if (map && map?.current && selection && selection.position && block) {
      map?.current.flyTo(selection.position, undefined, optionsAnimate);
    }
  }, [map, block, selection]);

  useEffect(() => {
    // Disabilita lo scroll zoom di default
    map?.current?.scrollWheelZoom.disable();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.key === "Meta" || e.key === "Ctrl") {
        map?.current?.scrollWheelZoom.enable();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control" || e.key === "Meta" || e.key === "Ctrl") {
        map?.current?.scrollWheelZoom.disable();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      map?.current?.scrollWheelZoom.enable(); // Ensure the scroll zoom is enabled if component is unmounted
    };
  }, []);

  const colorMap = {
    default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    light: "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
    dark: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
    sat: "https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
    hybrid: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  };

  const customMarker = useMemo(
    () =>
      new Icon({
        iconUrl: `static/pin/current-location.png`,
        iconSize: [35, 35],
        iconAnchor: [10, 30],
        popupAnchor: [7, -20],
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
    <div style={{ height: mapHeight }}>
      <MapContainerStyle
        ref={map}
        center={center}
        zoom={DEFAULTZOOM}
        zoomAnimation
        touchZoom
        markerZoomAnimation
        fadeAnimation
        scrollWheelZoom={false}
        className={className ? className : ""}
        height={mapHeight}
      >
        {gestureHandling && <GestureHandlingSetter />}
        <UpdateMapView
          onChange={onChange}
          dinamic={dinamic}
          selection={selection}
          selectionSeller={selectionSeller}
          zoom={zoom}
          withRadius={withRadius}
          radius={radius}
        />
        <LayersControl>
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution="Google Maps"
              url={device ? colorMap.light : colorMap.default}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer attribution="Google Maps Satellite" url={colorMap.sat} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Ibrida">
            <TileLayer attribution="Google Maps Ibrida" url={colorMap.hybrid} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Default">
            <TileLayer attribution="Nearme" url={colorMap.default} />
          </LayersControl.BaseLayer>

          {/* <LayersControl.BaseLayer name="Leaflet">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={colorMap.light}
          />
        </LayersControl.BaseLayer> */}
        </LayersControl>
        {selection?.position && (
          <>
            <CenterNav
              zoom={zoom}
              selection={selection}
              iconName="pin"
              onClick={handleFly}
              block={block}
            />
            <CenterNav
              zoom={zoom}
              selection={selection}
              iconName={block ? "pinTrakOn" : "pinTrakOff"}
              iconColor={block ? theme.colors.error : theme.colors.success}
              onClick={handleBlock}
              block={block}
              withTooltip="Segui"
            />
          </>
        )}
        {children && children}
        {selection?.position && (
          <Marker position={selection.position} icon={customMarker}>
            <Popup closeButton={false}>{selection.label}</Popup>
          </Marker>
        )}
        {selectionSeller?.position && (
          <Marker position={selectionSeller.position} icon={customSellerMarker}>
            <Popup closeButton={false}>{selectionSeller.label}</Popup>
          </Marker>
        )}
      </MapContainerStyle>
    </div>
  );
};

export default React.memo(Map);

const MapContainerStyle = styled(MapContainer)<{ height?: string }>`
  width: 100%;
  flex: 1;
  /* height: ${(p) => p.height}; */
  height: 100%;
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
  .leaflet-popup-content-wrapper {
    border-radius: ${theme.spaces.space5};
    .leaflet-popup-content {
      .content-card {
        p {
          margin: unset !important;
        }
      }
    }
  }
  .leaflet-popup-tip-container {
    .leaflet-popup-tip {
      background: ${theme.colors.softWhite};
    }
  }
  .content-popup {
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 400;
    width: 100%;
    max-width: 450px;
    .popup-body {
      width: 100%;
      height: 100%;
    }
  }
`;
