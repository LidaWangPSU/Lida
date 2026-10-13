(function () {
  var links = document.querySelectorAll('.side-nav a');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  var current = null;
  function activate(id) {
    if (current === id || !byId[id]) return;
    current = id;
    links.forEach(function (a) { a.classList.remove('active'); });
    byId[id].classList.add('active');
  }

  // A section is "current" while its heading sits in the upper part of the viewport.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) activate(e.target.id); });
  }, { rootMargin: '0px 0px -75% 0px' });

  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();
