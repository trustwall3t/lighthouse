import { featuredAsianFinancialInstitutions } from "@/lib/public/asian-financial-institutions";

function MarkList({
  marks,
  duplicate,
}: {
  marks: ReturnType<typeof featuredAsianFinancialInstitutions>;
  duplicate?: boolean;
}) {
  return (
    <ul
      className={`sr-partner-marklist${duplicate ? " sr-partner-marklist--clone" : ""}`}
      aria-label={duplicate ? undefined : "Asia-Pacific financial institutions"}
      aria-hidden={duplicate ? true : undefined}
    >
      {marks.map((mark) => (
        <li key={`${duplicate ? "clone-" : ""}${mark.name}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={mark.wide ? "sr-partner-mark--wide" : undefined}
            src={mark.src}
            alt={duplicate ? "" : `${mark.name}, ${mark.region}`}
            width={mark.width}
            height={mark.height}
            loading="lazy"
            decoding="async"
            title={`${mark.name} (${mark.region})`}
          />
        </li>
      ))}
    </ul>
  );
}

export function AsianFinancialInstitutionsBar() {
  const marks = featuredAsianFinancialInstitutions();

  return (
    <div className="sr-trust-bar sr-trust-bar--institutions">
      <div className="sr-wrap sr-trust-bar-strip">
        <p className="sr-trust-bar-tagline">Asia-Pacific banks &amp; exchanges</p>
        <div className="sr-partner-marquee">
          <div className="sr-partner-marquee__fade sr-partner-marquee__fade--start" aria-hidden="true" />
          <div className="sr-partner-marquee__fade sr-partner-marquee__fade--end" aria-hidden="true" />
          <div className="sr-partner-marquee__viewport">
            <div className="sr-partner-marquee__track">
              <MarkList marks={marks} />
              <MarkList marks={marks} duplicate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
