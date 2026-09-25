// Keep the existing theme and overflow navigation accessible with keyboard input.
document.addEventListener('DOMContentLoaded', function () {
  var theme = document.querySelector('#theme-toggle [role="button"]');
  if (theme) {
    theme.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        theme.click();
      }
    });
  }

  var menu = document.querySelector('#site-nav > button');
  var overflow = document.getElementById('navigation-overflow');
  if (menu && overflow) {
    var syncMenuState = function () {
      menu.setAttribute('aria-expanded', String(!overflow.classList.contains('hidden')));
    };
    new MutationObserver(syncMenuState).observe(overflow, { attributes: true, attributeFilter: ['class'] });
    syncMenuState();
  }

  // The navigation measures label widths; repeat that measurement after fonts load.
  if (document.fonts) {
    document.fonts.ready.then(function () {
      window.dispatchEvent(new Event('resize'));
    });
  }
});
