import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const isServer = (): boolean => typeof window === "undefined";

interface DeferredPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: string }>;
}

interface ExtendedNavigator extends Navigator {
  standalone?: boolean;
}

interface UsePwaReturn {
  installPrompt: () => Promise<void>;
  isInstalled: boolean;
  isStandalone: boolean;
  isOffline: boolean;
  canInstall: boolean;
  userChoice: string;
}

export const usePwa = (): UsePwaReturn => {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setInstalled] = useState(false);
  const [isOffline, setOffline] = useState(false);
  const [userChoice, setUserChoice] = useState("userChoice");
  const deferredPrompt = useRef<DeferredPromptEvent | null>(null);

  const handleInstallEvent = useCallback(() => setInstalled(true), []);

  const handleBeforePromptEvent = useCallback((event: Event) => {
    event.preventDefault();
    deferredPrompt.current = event as DeferredPromptEvent;
    setCanInstall(true);
  }, []);

  const handleOfflineEvent = useCallback(
    (offline: boolean) => () => {
      setOffline(offline);
    },
    []
  );

  useEffect(() => {
    if (isServer()) {
      return;
    }

    window.addEventListener("beforeinstallprompt", handleBeforePromptEvent);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforePromptEvent
      );
  }, [handleBeforePromptEvent]);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    window.addEventListener("appinstalled", handleInstallEvent);
    return () => window.removeEventListener("appinstalled", handleInstallEvent);
  }, [handleInstallEvent]);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    if (navigator) {
      setOffline(!navigator.onLine);
    }

    window.addEventListener("online", handleOfflineEvent(false));
    window.addEventListener("offline", handleOfflineEvent(true));
    return () => {
      window.removeEventListener("online", handleOfflineEvent(false));
      window.removeEventListener("offline", handleOfflineEvent(true));
    };
  }, [handleOfflineEvent]);

  const installPrompt = useCallback(async () => {
    if (!deferredPrompt.current || isServer()) {
      return;
    }

    deferredPrompt.current.prompt();
    const choiceResult = await deferredPrompt.current.userChoice;
    deferredPrompt.current = null;
    setUserChoice(choiceResult.outcome);
  }, []);

  const isStandalone = useMemo(
    () =>
      !isServer() &&
      ((navigator as ExtendedNavigator).standalone ||
        window.matchMedia("(display-mode: standalone)").matches),
    []
  );

  return {
    installPrompt,
    isInstalled,
    isStandalone,
    isOffline,
    canInstall,
    userChoice,
  };
};

export default usePwa;
