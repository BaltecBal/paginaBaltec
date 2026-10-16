import { Star, ExternalLink } from 'lucide-react';
import data from '../data/reviews.json';

/*
 * Google Maps reviews, scraped once by scripts/scrape-reviews.mjs into
 * src/data/reviews.json. Real customer text only — never edit the JSON by hand.
 *
 * Same marquee as the Clients section (full-bleed track, duplicated list,
 * translateX(-50%) loop, faded edges), but each item is a speech bubble.
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

const Bubble = ({ review }: { review: Review }) => {
  // Long reviews get a wider bubble instead of a towering one.
  const wide = review.text.length > 160;
  return (
    <figure
      className={`flex-shrink-0 mx-3 md:mx-5 flex flex-col ${
        wide ? 'w-[330px] md:w-[600px]' : 'w-[240px] md:w-[320px]'
      }`}
    >
      <div className="relative bg-paper border-2 border-navy-800 rounded-2xl px-5 py-4 md:px-6 md:py-5">
        <Stars value={review.rating} />
        <blockquote className="text-[15px] leading-relaxed text-ink-800 mt-3">
          “{review.text.replace(/\s+/g, ' ').trim()}”
        </blockquote>
        {/* Tail: a rotated square whose white fill hides the bubble's bottom border. */}
        <span
          aria-hidden="true"
          className="absolute -bottom-[9px] left-7 w-4 h-4 bg-paper border-r-2 border-b-2 border-navy-800 rotate-45"
        />
      </div>
      {/* No date: the scrape stores Google's relative "Hace 2 meses", which goes stale in a static file. */}
      <figcaption className="mt-4 pl-5 text-sm font-semibold text-navy-900">{review.name}</figcaption>
    </figure>
  );
};

const GoogleReviews = () => {
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

      {/* Full-bleed track, same as Clients. Reduced motion: no loop, swipe instead. */}
      <div className="relative overflow-hidden motion-reduce:overflow-x-auto w-full">
        <div
          className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none motion-reduce:hidden"
          style={{ background: 'linear-gradient(to right, var(--ink-50), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 pointer-events-none motion-reduce:hidden"
          style={{ background: 'linear-gradient(to left, var(--ink-50), transparent)' }}
        />

        <div className="flex items-center animate-reviews pb-2" style={{ width: 'fit-content' }}>
          {withText.map((r, i) => (
            <Bubble key={`a${i}`} review={r} />
          ))}
          {/* Second copy only feeds the loop. */}
          <div className="flex items-center motion-reduce:hidden" aria-hidden="true">
            {withText.map((r, i) => (
              <Bubble key={`b${i}`} review={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
