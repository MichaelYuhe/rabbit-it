import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex w-screen items-center justify-center border-b-2 border-gray-600 py-4">
      <div className="flex w-full max-w-6xl items-center justify-between">
        <Link className="text-3xl font-bold text-white" href="/">
          rabbit it
        </Link>
      </div>
    </header>
  );
}
