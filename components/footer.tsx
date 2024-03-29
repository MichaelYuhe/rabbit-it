import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex w-screen justify-center border-t-2 border-gray-600 p-4">
      <div className="w-full max-w-6xl">
        <Link href="https://zeabur.com?referralCode=MichaelYuhe&utm_source=rabbit_it&utm_campaign=oss">
          <img
            src="https://zeabur.com/deployed-on-zeabur-dark.svg"
            alt="zeabur"
          />
        </Link>
      </div>
    </footer>
  );
}
