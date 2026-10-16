import { useEffect, useRef, useState } from 'react';
import { Star, ExternalLink, X } from 'lucide-react';
import data from '../data/reviews.json';

/*
 * Google Maps reviews, scraped once by scripts/scrape-reviews.mjs into
 * src/data/reviews.json (+ reviewer photos in public/images/avatars).
 * Real customer text only — never edit the JSON by hand, never invent reviews.
 *
 * Card + "ver todas" dialog mirror AyniCollective's VoicesSection.svelte and
 * ReviewPopup.svelte: avatar with a tinted ring, name + Local Guide badge,
 * stars on the right, a hairline divider, then the quote opened by a large
 * tinted quotation mark. Ayni lays three cards in a grid; here they run in
 * the same infinite marquee as the Clients section.
 *
 * No dates on purpose: Google only exposes relative dates ("Hace 2 meses"),
 * which go stale in a static file.
 */

interface Review {
  name: string;
  rating: number;
  text: string;
  date?: string;
  isLocalGuide?: boolean;
  avatar?: string;
}

interface ReviewsData {
  placeUrl?: string;
  rating?: number;
  totalReviews?: number;
  reviews: Review[];
}

const reviewsData = data as ReviewsData;
const PLACE_URL =
  reviewsData.placeUrl ?? 'https://www.google.com/maps?cid=11350864758242169580';

/** Ring + quote-mark tint per card, cycling — Ayni's wing hues, in Baltec's palette. */
const HUES = ['var(--navy-700)', 'var(--accent)', 'var(--navy-600)', 'var(--ink-500)', 'var(--navy-900)'];

const clean = (t: string) => t.replace(/[ \t]+/g, ' ').trim();

const Stars = ({ value, size = 'w-3 h-3 md:w-3.5 md:h-3.5' }: { value: number; size?: string }) => (
  <span className="flex gap-0.5 flex-shrink-0" aria-label={`${value} de 5 estrellas`} role="img">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`${size} ${i <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-ink-200'}`}
        aria-hidden="true"
      />
    ))}
  </span>
);

/** Photo when the scrape found one; otherwise the initial on a tinted disc. */
const Avatar = ({ review, hue, size }: { review: Review; hue: string; size: number }) => {
  const [failed, setFailed] = useState(false);
  const ring = { border: `1px solid color-mix(in srgb, ${hue} 45%, var(--paper))`, width: size, height: size };
  if (review.avatar && !failed) {
    return (
      <img
        src={review.avatar}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="flex-shrink-0 rounded-full object-cover bg-ink-100"
        style={ring}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-paper"
      style={{ ...ring, background: hue, fontSize: size * 0.4 }}
    >
      {review.name.trim().charAt(0).toUpperCase()}
    </span>
  );
};

/** Who: avatar · name / badge · stars — Ayni's figcaption row. */
const Who = ({ review, hue, size }: { review: Review; hue: string; size: number }) => (
  <div className="flex items-center gap-3">
    <Avatar review={review} hue={hue} size={size} />
    <span className="flex flex-col gap-1 min-w-0 flex-1">
      <span className="text-sm font-medium text-ink-900 truncate">{review.name}</span>
      {/* Ayni's slot is badge + date; with no date, the badge or the source. */}
      <span className="flex items-center text-xs text-ink-500 leading-normal whitespace-nowrap">
        {review.isLocalGuide ? (
          <span className="text-[9px] px-[5px] py-px rounded-[3px] bg-ink-50 border border-ink-200 uppercase tracking-[0.05em]">
            Local Guide
          </span>
        ) : (
          'Reseña en Google'
        )}
      </span>
    </span>
    <Stars value={review.rating} />
  </div>
);

const Card = ({ review, hue }: { review: Review; hue: string }) => {
  const texto = clean(review.text).replace(/\s*\n+\s*/g, ' ');
  return (
    <li className="flex-shrink-0 mx-2.5 md:mx-3 w-[310px] md:w-[360px] flex">
      <figure className="m-0 w-full flex flex-col p-5 md:p-6 bg-paper border border-ink-200 rounded-lg">
        <figcaption className="pb-3 border-b border-ink-100">
          <Who review={review} hue={hue} size={48} />
        </figcaption>
        <blockquote className="mt-3 flex-1">
          <p className="m-0 text-sm leading-[1.6] text-ink-800 line-clamp-4">
            <span
              aria-hidden="true"
              className="text-2xl leading-[0] align-[-0.05em] mr-1 opacity-60 select-none font-semibold"
              style={{ color: hue }}
            >
              “
            </span>
            {texto}
          </p>
        </blockquote>
      </figure>
    </li>
  );
};

const AllReviews = ({
  open,
  onClose,
  reviews,
}: {
  open: boolean;
  onClose: () => void;
  reviews: Review[];
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal(); // focus trap, inert page, Esc → cancel: all native
      document.documentElement.style.overflow = 'hidden';
    } else if (!open && dlg.open) {
      dlg.close();
    }
    if (!open) document.documentElement.style.overflow = '';
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="opiniones-todas-titulo"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // backdrop
      }}
      className="reviews-dialog p-0 border-0 bg-paper text-ink-900 overflow-hidden fixed inset-0 m-auto w-full h-[100dvh] max-w-full max-h-[100dvh] rounded-none sm:w-[calc(100vw-48px)] sm:max-w-[680px] sm:h-fit sm:max-h-[85vh] sm:rounded-lg shadow-[0_24px_48px_rgba(0,0,0,0.2)]"
    >
      <div className="flex flex-col h-full max-h-[100dvh] sm:max-h-[85vh]">
        <header className="relative flex-shrink-0 px-6 pt-6 pb-3 border-b border-ink-100">
          <h2 id="opiniones-todas-titulo" className="text-xl md:text-2xl font-semibold text-navy-900 pr-12">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-sm text-ink-500 mt-1">
            {reviews.length} opiniones con comentario · {reviewsData.totalReviews} calificaciones en Google
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ink-50 hover:bg-ink-100 text-ink-800 flex items-center justify-center transition-colors"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          {reviews.map((r, i) => (
            <article key={i} className="py-4 border-b border-ink-100 last:border-b-0">
              <Who review={r} hue={HUES[i % HUES.length]} size={48} />
              <p className="mt-3 text-sm leading-[1.6] text-ink-800 whitespace-pre-line">{clean(r.text)}</p>
            </article>
          ))}
        </div>

        <footer className="flex-shrink-0 px-6 py-3 border-t border-ink-100 flex justify-center">
          <a href={PLACE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Ver en Google Maps <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </footer>
      </div>
    </dialog>
  );
};

const GoogleReviews = () => {
  const [open, setOpen] = useState(false);
  const withText = reviewsData.reviews.filter((r) => r.text);
  if (!reviewsData.rating || withText.length === 0) return null;

  return (
    <section
      id="opiniones"
      aria-label="Opiniones en Google"
      data-testid="google-reviews"
      className="pb-16 md:pb-24"
      style={{ background: 'var(--ink-50)' }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 mb-8 md:mb-10">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          <span className="text-2xl font-semibold text-navy-900 leading-none">
            {reviewsData.rating.toFixed(1).replace('.', ',')}
          </span>
          <Stars value={reviewsData.rating} size="w-5 h-5" />
          <span className="text-sm text-ink-500">
            · {reviewsData.totalReviews} opiniones en Google
          </span>
          <a
            href={PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:underline"
          >
            Ver en Google <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Full-bleed track, same as Clients. Two identical halves + translateX(-50%)
          = no jump at the loop point. Pauses on hover/focus; reduced motion: swipe. */}
      <div className="relative overflow-hidden motion-reduce:overflow-x-auto w-full">
        <div
          className="absolute left-0 top-0 bottom-0 w-10 md:w-32 z-10 pointer-events-none motion-reduce:hidden"
          style={{ background: 'linear-gradient(to right, var(--ink-50), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-10 md:w-32 z-10 pointer-events-none motion-reduce:hidden"
          style={{ background: 'linear-gradient(to left, var(--ink-50), transparent)' }}
        />

        <div className="flex items-stretch animate-reviews py-1" style={{ width: 'fit-content' }}>
          <ul className="flex items-stretch list-none m-0 p-0" role="list">
            {withText.map((r, i) => (
              <Card key={`a${i}`} review={r} hue={HUES[i % HUES.length]} />
            ))}
          </ul>
          {/* Second copy only feeds the loop. */}
          <ul className="flex items-stretch list-none m-0 p-0 motion-reduce:hidden" aria-hidden="true">
            {withText.map((r, i) => (
              <Card key={`b${i}`} review={r} hue={HUES[i % HUES.length]} />
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-8 md:mt-10 px-6">
        <button type="button" className="btn btn-ghost bg-paper" onClick={() => setOpen(true)}>
          Ver todas las opiniones <span className="arrow">→</span>
        </button>
      </div>

      <AllReviews open={open} onClose={() => setOpen(false)} reviews={withText} />
    </section>
  );
};

export default GoogleReviews;
