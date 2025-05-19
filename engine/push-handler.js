export function maybeInitPush() {
  const meta = sessionStorage.getItem("main_meta");
  if (!meta) return;

  const script = document.createElement("script");
  script.src = "assets/js/OneSignalSDK.page.js";
  script.defer = true;
  script.onload = () => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(async (OneSignal) => {
      await OneSignal.init({ appId: "3b924b99-c302-4919-a97e-baf909394696" });
      console.log("🔔 Push Ready");
    });
  };
  document.head.appendChild(script);
}