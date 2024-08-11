import { useEffect, useState } from "react";

interface GeolocationOptions extends PositionOptions {}

interface GeolocationData {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  loading: boolean;
  error: GeolocationPositionError | null;
  data: GeolocationData | null;
}

export const defaultOpt = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function useGeolocation(
  options?: GeolocationOptions
): UseGeolocationReturn {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [data, setData] = useState<GeolocationData | null>(null);

  // Funzione di successo
  const successHandler = (position: GeolocationPosition) => {
    setLoading(false);
    setError(null);
    setData({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  // Funzione di errore
  const errorHandler = (error: GeolocationPositionError) => {
    setError(error);
    setLoading(false);
    window.location.href = "app-settings:location";
  };

  useEffect(() => {
    const mergedOptions = { ...defaultOpt, ...options };
    // navigator.permissions
    //   .query({ name: "geolocation" })
    //   .then((permissionStatus) => {
    //     if (permissionStatus.state === "denied") {
    //       window.location.href = "app-settings:location";
    //     } else {
    //       navigator.geolocation.getCurrentPosition(
    //         successHandler,
    //         errorHandler
    //       );
    //     }
    //   });

    // Richiedi la posizione corrente
    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      mergedOptions
    );

    // Inizia a monitorare la posizione
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      mergedOptions
    );

    // Pulizia della watch
    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { loading, error, data };
}
