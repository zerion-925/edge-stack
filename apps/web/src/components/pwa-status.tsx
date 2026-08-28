import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "@edge-stack/ui";
import { useCallback, useEffect, useState } from "react";

export function PwaStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const dismiss = useCallback(() => {
    setNeedRefresh(false);
    setOfflineReady(false);
  }, [setNeedRefresh, setOfflineReady]);
  const installUpdate = useCallback(async () => {
    await updateServiceWorker(true);
  }, [updateServiceWorker]);

  if (!(needRefresh || offlineReady || !isOnline)) {
    return null;
  }

  let title = "You are offline";
  let message = "Cached pages remain available. API data needs a connection.";
  if (needRefresh) {
    title = "Update available";
    message = "Reload to use the latest version.";
  } else if (isOnline) {
    title = "Ready for offline use";
    message = "The app shell is cached on this device.";
  }

  return (
    <aside aria-live="polite" className="pwa-status" role="status">
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      <div className="pwa-actions">
        {needRefresh ? <Button onClick={installUpdate}>Reload</Button> : null}
        {isOnline ? (
          <Button className="secondary" onClick={dismiss}>
            {needRefresh ? "Later" : "Dismiss"}
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
