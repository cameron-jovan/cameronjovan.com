import './App.css';
import SiteHeader from './components/site/SiteHeader';
import Hero from './components/site/Hero';
import Projects from './components/site/Projects';
import Playbooks from './components/site/Playbooks';
import About from './components/site/About';
import Footer from './components/site/Footer';

function App() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#070707] text-white">
      <SiteHeader />
      <Hero />
      <Projects />
      <Playbooks />
      <About />
      <Footer />
    </main>
  );
}

export default App;
