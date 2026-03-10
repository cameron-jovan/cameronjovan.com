import './App.css';
import Hero from './sections/Hero';
import FeaturedIn from './components/FeaturedIn';
import Projects from './sections/Projects';
import FloatingEmailCapture from './components/FloatingEmailCapture';

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Preload images
  //   const preloadImages = [
  //     '/images/hero-bg.png',
  //     '/images/hero-reveal.png',
  //   ];

  //   let loadedCount = 0;
  //   const totalImages = preloadImages.length;

  //   const checkAllLoaded = () => {
  //     loadedCount++;
  //     if (loadedCount >= totalImages) {
  //       setIsLoading(false);
  //     }
  //   };

  //   preloadImages.forEach((src) => {
  //     const img = new Image();
  //     img.onload = checkAllLoaded;
  //     img.onerror = checkAllLoaded;
  //     img.src = src;
  //   });

  //   // Fallback timeout
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <main className="relative w-full min-h-screen bg-white overflow-x-hidden">
      {/* Loading Screen */}
      {/* {isLoading && (
        <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 font-sans text-sm text-[#666666]">Loading...</p>
          </div>
        </div>
      )} */}

      {/* Main Content */}
      <Hero />
      <FeaturedIn />
      <Projects />
      <FloatingEmailCapture />
    </main>
  );
}

export default App;
