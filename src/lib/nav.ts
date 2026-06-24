// Smart scroll helpers. The site has multiple route shapes (home, Productos
// index, Productos category) and many CTA buttons want to "go to the contact
// form" or "go to inicio". On a Productos sub-page, the contact form is on
// the home page, so getElementById returns null. This helper handles both
// cases: scroll if the target exists locally, or navigate to the right route
// first and scroll after the new page mounts.

import { isInsideProductos } from './router';

const SCROLL_AFTER_NAV_MS = 80;
const HOME_HASH = ''; // setting hash to '' returns to home

export const safeScrollToId = (
  id: string,
  currentRoute: string | null,
  options: { offset?: number; onMobileMenuClose?: () => void } = {}
): void => {
  if (options.onMobileMenuClose) options.onMobileMenuClose();

  const element = document.getElementById(id);
  if (element) {
    const offset = options.offset ?? (id === 'contacto' ? 60 : 20);
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    return;
  }

  // Element not on current page. If we're inside /productos/*, navigate to
  // home and scroll after the new page mounts.
  if (isInsideProductos(currentRoute)) {
    if (window.location.hash) {
      window.location.hash = HOME_HASH;
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const offset = options.offset ?? (id === 'contacto' ? 60 : 20);
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, SCROLL_AFTER_NAV_MS);
  }
  // else: not on Productos and the element is missing — silently no-op.
  // (This shouldn't happen on the home page since all sections are rendered.)
};

export const safeScrollToContact = (
  currentRoute: string | null,
  onMobileMenuClose?: () => void
): void => {
  safeScrollToId('contacto', currentRoute, {
    offset: 60,
    onMobileMenuClose,
  });
};

export const safeScrollToInicio = (
  currentRoute: string | null,
  onMobileMenuClose?: () => void
): void => {
  safeScrollToId('inicio', currentRoute, {
    offset: 20,
    onMobileMenuClose,
  });
};