import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex w-screen justify-center border-t-2 border-gray-600 py-4">
      <div className="w-full max-w-6xl">
        <Link href="https://zeabur.com?referralCode=MichaelYuhe&utm_source=nice-buttons&utm_campaign=oss">
          <img
            src="https://zeabur.com/deployed-on-zeabur-light.svg"
            alt="zeabur"
          />
        </Link>
      </div>
    </footer>
  );
}