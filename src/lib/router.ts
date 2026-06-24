import { useEffect, useState } from 'react';

const PRODUCTOS_HASH = '#/productos';

// Strip leading "#" and any trailing slash, normalize.
const normalize = (raw: string): string => {
  let h = raw;
  if (h.startsWith('#')) h = h.slice(1);
  if (h.startsWith('/')) h = '/' + h.slice(1).replace(/^\/+/, '');
  // strip trailing slash for consistency
  if (h.length > 1 && h.endsWith('/')) h = h.slice(0, -1);
  return h;
};

const parseHash = (): string | null => {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return null;
  const n = normalize(hash);
  return n || null;
};

export interface RouteMatch {
  path: string; // the full path, e.g. "/productos/borneras"
  segments: string[]; // ["productos", "borneras"]
}

export const parseRoute = (route: string | null): RouteMatch | null => {
  if (!route) return null;
  const segments = route.split('/').filter(Boolean);
  return { path: route, segments };
};

export const useHashRoute = (): string | null => {
  const [route, setRoute] = useState<string | null>(parseHash());

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
};

export const isProductosIndex = (route: string | null): boolean =>
  route === '/productos';

export const isProductosCategory = (
  route: string | null
): { isCategory: boolean; categoryId: string | null } => {
  if (!route) return { isCategory: false, categoryId: null };
  const prefix = '/productos/';
  if (!route.startsWith(prefix)) return { isCategory: false, categoryId: null };
  const id = route.slice(prefix.length);
  if (!id) return { isCategory: false, categoryId: null };
  return { isCategory: true, categoryId: id };
};

export const isInsideProductos = (route: string | null): boolean => {
  if (!route) return false;
  return route === '/productos' || route.startsWith('/productos/');
};

export const navigate = (path: string): void => {
  window.location.hash = path;
};

export const navigateProductos = (): void => {
  navigate('/productos');
};

export const navigateProductosCategory = (categoryId: string): void => {
  navigate(`/productos/${categoryId}`);
};

export const PRODUCTOS_LINK = PRODUCTOS_HASH;

export const productosCategoryLink = (categoryId: string): string =>
  `#/productos/${categoryId}`;