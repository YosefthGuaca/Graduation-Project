import TopPage from './components/TopPage';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="container px-4 mx-auto min-h-screen">
      <Navbar />
      <TopPage />
    </main>
  );
}
