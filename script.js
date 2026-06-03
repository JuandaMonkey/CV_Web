(function () {

  function createPanel() {
    const panel = document.createElement('div');
    panel.id = 'pdf-panel';
    panel.innerHTML = `
      <div id="pdf-panel-inner">
        <div id="pdf-panel-header">
          <span id="pdf-panel-title">Certificado</span>
          <button id="pdf-panel-close" aria-label="Cerrar visor">×</button>
        </div>
        <iframe id="pdf-frame" title="Visor de certificado"></iframe>
      </div>
    `;
    document.body.appendChild(panel);
    document.getElementById('pdf-panel-close').addEventListener('click', closePanel);
    return panel;
  }

  function openPanel(src, title) {
    let panel = document.getElementById('pdf-panel');
    if (!panel) panel = createPanel();

    document.getElementById('pdf-frame').src = src + '#page=1';
    document.getElementById('pdf-panel-title').textContent = title;
    document.body.classList.add('viewer-open');
  }

  function closePanel() {
    document.body.classList.remove('viewer-open');
    const frame = document.getElementById('pdf-frame');
    if (frame) frame.src = '';
    document.querySelectorAll('.cert.active').forEach(el => el.classList.remove('active'));
  }

  document.addEventListener('click', function (e) {
    const cert = e.target.closest('.cert[data-pdf]');
    if (!cert) return;

    const isActive = cert.classList.contains('active');
    document.querySelectorAll('.cert.active').forEach(el => el.classList.remove('active'));

    if (isActive) {
      closePanel();
    } else {
      cert.classList.add('active');
      openPanel(cert.dataset.pdf, cert.textContent.trim());
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });

})();