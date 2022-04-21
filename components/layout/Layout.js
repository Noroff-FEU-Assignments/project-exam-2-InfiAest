import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">About</Link>
      </nav>

      <div className="container">{children}</div>
    </>
  );
}
