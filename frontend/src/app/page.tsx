import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container flex flex-col gap-12 items-center justify-center min-h-screen">
      <p className="text-2xl font-bold">Welcome!</p>
      <h1 className="text-6xl font-bold">Ux Show Go</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
    </main>
  );
}
