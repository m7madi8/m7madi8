import Link from "next/link";
import BrandMark from "../../components/BrandMark";

export default function Nav() {
  return (
    <header className="r-header">
      <nav className="r-nav" aria-label="Navigation">
        <BrandMark
          href="/"
          size="sm"
          tone="light"
          animate={false}
          aria-label="m. — Home"
        />
        <Link href="/" className="r-nav-back">
          Portfolio
        </Link>
      </nav>
    </header>
  );
}
