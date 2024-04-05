import TopPage from './components/TopPage';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container px-4 mx-auto">
        <TopPage />
      </main>
    </>
  );
}
