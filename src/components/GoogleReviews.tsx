import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import data from '../data/reviews.json';

/*
 * Google Maps reviews, scraped once by scripts/scrape-reviews.mjs into
 * src/data/reviews.json. Real customer text only — never edit the JSON by hand.
 */

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
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

const Stars = ({ value, size = 'w-4 h-4' }: { value: number; size?: string }) => (
  <div className="flex gap-0.5" aria-label={`${value} de 5 estrellas`} role="img">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`${size} ${i <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-ink-200'}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const GoogleReviews = () => {
  const withText = reviewsData.reviews.filter((r) => r.text);
  const [idx, setIdx] = useState(0);

  if (!reviewsData.rating || withText.length === 0) return null;

  const review = withText[idx];
  const go = (d: number) => setIdx((i) => (i + d + withText.length) % withText.length);

  return (
    <aside aria-label="Opiniones en Google" data-testid="google-reviews" className="flex flex-col">
      <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-500 mb-3">
        Opiniones en Google
      </div>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl font-semibold text-navy-900 leading-none">
          {reviewsData.rating.toFixed(1).replace('.', ',')}
        </span>
        <div>
          <Stars value={reviewsData.rating} size="w-5 h-5" />
          <div className="text-sm text-ink-500 mt-1">
            {reviewsData.totalReviews} opiniones
          </div>
        </div>
      </div>

      <figure className="border-2 border-navy-800 bg-white p-6 flex-1 flex flex-col min-h-[220px]">
        <Stars value={review.rating} />
        <blockquote className="body text-ink-800 mt-4 flex-1 whitespace-pre-line">
          “{review.text}”
        </blockquote>
        {/* No date: the scrape stores Google's relative "Hace 2 meses", which goes stale in a static file. */}
        <figcaption className="mt-4 font-semibold text-navy-900">{review.name}</figcaption>
      </figure>

      <div className="flex items-center justify-between mt-4">
        {withText.length > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="p-2 border border-ink-200 hover:border-navy-800 text-navy-800"
              aria-label="Opinión anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-ink-500 tabular-nums">
              {idx + 1} / {withText.length}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              className="p-2 border border-ink-200 hover:border-navy-800 text-navy-800"
              aria-label="Opinión siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <span />
        )}
        <a
          href={PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:underline"
        >
          Ver en Google <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};

export default GoogleReviews;
