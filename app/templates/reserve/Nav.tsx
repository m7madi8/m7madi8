import Link from "next/link";

export default function ReserveNav({ book = false }: { book?: boolean }) {
  return (
    <header className={`nr-top${book ? " is-solid" : ""}`}>
      <div className="nr-wrap nr-top-row">
        {book ? (
          <Link href="/templates/reserve" className="nr-logo nr-focus">
            NOIR
          </Link>
        ) : (
          <Link href="/restaurants" className="nr-back nr-focus">
            <span className="nr-back-short">Back</span>
            <span className="nr-back-long">Portfolio</span>
          </Link>
        )}

        {book ? (
          <span className="nr-kicker nr-top-label">Table</span>
        ) : (
          <Link href="/templates/reserve" className="nr-logo nr-focus">
            NOIR
          </Link>
        )}

        {book ? (
          <Link href="/restaurants" className="nr-back nr-focus">
            <span className="nr-back-short">Back</span>
            <span className="nr-back-long">Portfolio</span>
          </Link>
        ) : (
          <Link href="/templates/reserve/book" className="nr-top-cta nr-focus">
            Book
          </Link>
        )}
      </div>
    </header>
  );
}
