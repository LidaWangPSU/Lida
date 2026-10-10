(function () {
  var root = document.documentElement;
  var KEY = 'theme';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function current() {
    return root.getAttribute('data-theme') || (systemDark() ? 'dark' : 'light');
  }

  // Apply saved choice immediately (this script is loaded in <head>) to avoid a flash.
  var saved = stored();
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  function label(btn) {
    var dark = current() === 'dark';
    btn.textContent = dark ? '\u2600\uFE0F' : '\uD83C\uDF19';
    var text = dark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.title = text;
    btn.setAttribute('aria-label', text);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.type = 'button';
    label(btn);
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label(btn);
    });
    document.body.appendChild(btn);
  });
})();
