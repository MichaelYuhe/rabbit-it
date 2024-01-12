import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex w-screen items-center justify-center border-b-2 border-gray-600 p-4">
      <div className="flex w-full max-w-6xl items-center justify-between">
        <Link className="text-3xl font-bold text-white" href="/">
          rabbit it
        </Link>

        <Link
          href="https://github.com/michaelyuhe/rabbit-it"
          className="text-xl font-bold text-white"
        >
          GitHub
        </Link>
      </div>
    </header>
  );
}
