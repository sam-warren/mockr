import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="font-mono text-xl font-bold">{"{mockr}"}</span>
    </Link>
  );
}
