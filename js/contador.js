/* Contador de acessos próprio (só o Diego vê o resultado). Não usa cookies de terceiros nem guarda IP:
   cada navegador recebe um código aleatório, e a página avisa ao abrir e a cada 60 s enquanto estiver aberta. */
(function () {
  if (!/diegoreiseleicoes\.com\.br$/.test(location.hostname) || !navigator.sendBeacon) return;
  var URL = "https://monitoramentospeed.com.br/api/visita", id;
  try { id = localStorage.getItem("dr-vid"); if (!id) { id = Math.random().toString(36).slice(2, 12) + Date.now().toString(36); localStorage.setItem("dr-vid", id); } }
  catch (e) { id = Math.random().toString(36).slice(2, 12); }
  function enviar(t) {
    try { navigator.sendBeacon(URL, new Blob([JSON.stringify({ v: id, p: location.pathname, t: t })], { type: "text/plain" })); } catch (e) {}
  }
  enviar("load");
  setInterval(function () { if (!document.hidden) enviar("ping"); }, 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) enviar("ping"); });
})();
