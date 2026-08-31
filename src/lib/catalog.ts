import { useEffect, useState } from 'react';
import { categories as bundled, type Category } from '../data/products';

/**
 * Live catalog from the panel's stock module, with the bundled data as
 * fallback. The endpoint serves the same Category/Product shape this site
 * always used (published products only, no prices, no quantities), so the
 * bundled `products.ts` keeps working as the offline/error copy.
 */
const CATALOG_URL =
  (import.meta.env.VITE_STOCK_CATALOG_URL as string | undefined) ||
  'https://actions.balanceobaltec.com/stock/catalog';

let live: Category[] | null = null;
let pending: Promise<Category[] | null> | null = null;

const looksValid = (cats: unknown): cats is Category[] =>
  Array.isArray(cats) &&
  cats.length > 0 &&
  cats.every(
    (c) =>
      c &&
      typeof (c as Category).id === 'string' &&
      typeof (c as Category).name === 'string' &&
      Array.isArray((c as Category).items),
  );

const fetchCatalog = (): Promise<Category[] | null> => {
  if (live) return Promise.resolve(live);
  if (!pending) {
    pending = fetch(CATALOG_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const cats = data?.categories;
        if (!looksValid(cats)) return null;
        live = cats;
        return cats;
      })
      .catch(() => null);
  }
  return pending;
};

export function useCatalog(): { categories: Category[]; totalItems: number } {
  const [categories, setCategories] = useState<Category[]>(live ?? bundled);

  useEffect(() => {
    let mounted = true;
    void fetchCatalog().then((cats) => {
      if (mounted && cats) setCategories(cats);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    categories,
    totalItems: categories.reduce((sum, c) => sum + c.items.length, 0),
  };
}
