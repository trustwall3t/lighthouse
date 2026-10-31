import { enrichTestimonials } from "@/lib/public/trustpilot-enrich";
import type { SiteInfo, Testimonial } from "@/types/site";

export function TrustpilotReviews({
  site,
  testimonials,
}: {
  site: SiteInfo;
  testimonials: Testimonial[];
}) {
  const enriched = enrichTestimonials(testimonials);
  const hasReviews = enriched.length > 0;

  return (
    <section className="sr-section sr-trustpilot-section" aria-labelledby="sr-trustpilot-heading">
      <div className="sr-wrap">
        <header className="sr-tp-head">
          <h2 id="sr-trustpilot-heading">What investors say about {site.siteName}</h2>
          <div className="sr-tp-badge-row">
            <span className="sr-tp-trustpilot-mark" aria-hidden="true">
              <svg className="sr-tp-trustpilot-logo" width="18" height="18" viewBox="0 0 24 24" focusable="false">
                <path
                  fill="currentColor"
                  d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14l-5-4.87 7.1-1.01L12 2z"
                />
              </svg>
              Trustpilot
            </span>
            {hasReviews ? (
              <div className="sr-tp-star-tiles" role="img" aria-label="Five out of five stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} className="sr-tp-star-tile" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" focusable="false">
                      <path
                        fill="currentColor"
                        d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14l-5-4.87 7.1-1.01L12 2z"
                      />
                    </svg>
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <p className="sr-tp-lead">
            {hasReviews
              ? "Client reviews in a Trustpilot-style layout, shared with permission from verified account holders."
              : `Customer reviews will appear here as clients share their experience with ${site.siteName}.`}
          </p>
          {hasReviews ? <p className="sr-tp-filter">Showing our 4 &amp; 5 star reviews</p> : null}
        </header>

        {hasReviews ? (
          <div className="sr-tp-reviews-shell">
            <div
              className="sr-tp-track"
              data-sr-reviews-carousel
              tabIndex={0}
              role="region"
              aria-label="Customer review cards"
            >
              {enriched.map((review) => (
                <article key={review.id ?? review.name} className="sr-tp-card">
                  <header className="sr-tp-card-consumer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="sr-tp-card-avatar"
                      src={review.avatarUrl}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="sr-tp-card-consumer-text">
                      <div className="sr-tp-card-name-row">
                        <h3 className="sr-tp-card-name">{review.name}</h3>
                      </div>
                      <p className="sr-tp-card-meta">
                        <span className="sr-tp-card-country">
                          <span className="sr-tp-card-flag" aria-hidden="true">
                            {review.countryFlag}
                          </span>
                          <span className="sr-tp-card-country-code">{review.countryCode}</span>
                        </span>
                        <span className="sr-tp-card-meta-sep" aria-hidden="true">
                          ·
                        </span>
                        <time className="sr-tp-card-date" dateTime={review.dateIso}>
                          {review.dateLabel}
                        </time>
                      </p>
                    </div>
                  </header>
                  <div className="sr-tp-card-stars" role="img" aria-label="Rated five out of five stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className="sr-tp-star-tile sr-tp-star-tile--sm" aria-hidden="true">
                        <svg width="10" height="10" viewBox="0 0 24 24" focusable="false">
                          <path
                            fill="currentColor"
                            d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14l-5-4.87 7.1-1.01L12 2z"
                          />
                        </svg>
                      </span>
                    ))}
                  </div>
                  <h4 className="sr-tp-card-title">{review.title}</h4>
                  <p className="sr-tp-card-body">{review.body}</p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <p className="sr-tp-empty" role="status">
            Customer reviews will appear here.
          </p>
        )}
      </div>
    </section>
  );
}
