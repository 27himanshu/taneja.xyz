define([
], () => {
  home = {
    setupResumeTab: (target) => {
      if (this._setup) return;
      iframe = document.createElement('iframe');
      iframe.src = '/resources/data/resume.pdf';
      iframe.style.height = '100%';
      target.appendChild(iframe);
      this._setup = true;
    }
  }
  return home;
});
