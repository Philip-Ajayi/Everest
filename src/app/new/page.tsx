"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Camera, 
  Aperture, 
  MonitorPlay, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  GraduationCap, 
  Menu, 
  X,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
/* --- UTILITY HOOKS --- */

// Hook for scroll position
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

// Hook for mouse position (for cursor effects)
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

// Hook for Intersection Observer (Detect when element is in view)
const useOnScreen = (
  options?: IntersectionObserverInit
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isVisible];
};


/* --- SUB-COMPONENTS --- */

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;

    if (
        target &&
        (target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('.interactive'))
    ) {
        setIsHovering(true);
    } else {
        setIsHovering(false);
    }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
    >
      <div 
        className="absolute rounded-full bg-white transition-transform duration-100 ease-out"
        style={{
          left: x,
          top: y,
          width: isHovering ? '64px' : '12px',
          height: isHovering ? '64px' : '12px',
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0.8 : 1
        }}
      />
      <div 
        className="absolute rounded-full border border-white transition-all duration-300 ease-out"
        style={{
          left: x,
          top: y,
          width: isHovering ? '80px' : '40px',
          height: isHovering ? '80px' : '40px',
          transform: 'translate(-50%, -50%)',
          opacity: 0.5
        }}
      />
    </div>
  );
};

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const FluidBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50">
    {/* Animated Blobs */}
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
    <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
    <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000" />
    <div className="absolute top-[40%] right-[30%] w-[40vw] h-[40vw] bg-sky-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob animation-delay-6000" />
  </div>
);

interface NavBarProps {
  isScrolled: boolean;
}

const NavBar = ({ isScrolled }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`mx-auto max-w-7xl px-6 flex justify-between items-center transition-all duration-500 
        ${isScrolled ? 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg p-3 px-6' : 'bg-transparent'}`}>
        
        <div className="text-2xl font-bold tracking-tighter interactive cursor-pointer flex items-center gap-2 text-slate-800">
          <Aperture className="w-6 h-6 animate-spin-slow text-blue-600" />
          <span>EVEREST</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Portfolio', 'Students', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors interactive relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full hover:bg-white/20 interactive transition-colors text-slate-600"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        <button className="md:hidden text-slate-800 interactive" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-center justify-center gap-8`}>
        {['Services', 'Portfolio', 'Students', 'Contact'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            onClick={() => setIsOpen(false)}
            className="text-3xl font-light tracking-widest text-slate-800"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ icon: Icon, title, description, delay }: ServiceCardProps) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div 
      ref={ref}
      className={`group relative p-8 rounded-3xl overflow-hidden interactive transition-all duration-700 transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-lg border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all duration-300 group-hover:bg-white/60 group-hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] group-hover:scale-[1.02]"></div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <Icon size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
          <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
        
        <div className="mt-8 flex items-center gap-2 text-blue-600 font-semibold cursor-pointer group/link">
          <span className="relative">
            Learn More
            <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover/link:w-full"></span>
          </span>
          <ArrowRight size={16} className="transform transition-transform group-hover/link:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

interface PortfolioItemProps {
  src: string;
  size: string;
  speed: number;
  title: string;
  category: string;
}

const PortfolioItem = ({ src, size, speed, title, category }: PortfolioItemProps) => {
  const scrollY = useScroll();
  const [ref, isVisible] = useOnScreen({ threshold: 0 });
  // Calculate parallax offset based on scroll position and speed factor
  const offset = useRef(0);
  
  // Update offset only on client side to avoid hydration mismatch, simplified here
  const parallaxY = (scrollY * speed) * 0.1;

  return (
    <div 
      ref={ref}
      className={`relative rounded-none overflow-hidden group interactive transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} ${size}`}
    >
      <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
      
      <img 
        src={src} 
        alt={title} 
        className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        style={{ transform: `scale(1.1) translateY(${parallaxY}px)` }} // Simple Parallax
      />
      
      {/* Floating Info Card */}
      <div className="absolute bottom-6 left-6 z-30 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg">
          <h4 className="text-white font-bold text-lg">{title}</h4>
          <p className="text-blue-200 text-sm">{category}</p>
        </div>
      </div>
    </div>
  );
};

/* --- MAIN COMPONENT --- */

export default function EverestStudio() {
  const scrollY = useScroll();
  const [loading, setLoading] = useState(true);

  // Initial Load Animation
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-[10000]">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <Aperture className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-slate-800 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5 {
          font-family: 'Space Grotesk', sans-serif;
        }

        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
      `}</style>

      <CustomCursor />
      <NoiseOverlay />
      <FluidBackground />
      <NavBar isScrolled={scrollY > 50} />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="relative z-10 text-center mix-blend-darken">
          <div className="overflow-hidden mb-4">
             <h2 className="text-blue-600 font-medium tracking-[0.5em] text-sm md:text-base animate-[slideUp_1s_ease-out]">
               EST. 2025
             </h2>
          </div>
          
          <div className="relative">
            <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-slate-500 animate-[fadeIn_1.5s_ease-out]">
              EVEREST
              <br />
              <span className="text-stroke-thin opacity-50">STUDIO</span>
            </h1>
            
            {/* Decorative circles around text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38vw] h-[38vw] border border-slate-900/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>

          <p className="mt-8 max-w-lg mx-auto text-lg text-slate-600 font-light animate-[fadeIn_2s_ease-out]">
            Capturing the ethereal moments of life through a futuristic lens. 
            Where memory meets imagination.
          </p>

          <div className="mt-12 flex justify-center gap-6 animate-[fadeIn_2.5s_ease-out]">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300 interactive shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1">
              Explore Portfolio
            </button>
            <button className="px-8 py-4 bg-white/50 backdrop-blur-sm border border-white text-slate-900 rounded-full font-medium hover:bg-white transition-all duration-300 interactive">
              Book Session
            </button>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-800 to-transparent"></div>
        </div>
      </section>

      {/* --- SERVICES BENTO GRID --- */}
      <section id="services" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-6xl font-bold tracking-tight text-slate-900 mb-6">Our Services</h2>
            <div className="w-24 h-2 bg-blue-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            {/* Large Feature */}
            <div className="md:col-span-2 row-span-2 rounded-3xl overflow-hidden relative group interactive h-[600px]">
               <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Photoshoot" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                 <h3 className="text-4xl font-bold text-white mb-2">Professional Photoshoot</h3>
                 <p className="text-gray-300 max-w-md">High-end fashion, portrait, and artistic photography in our state-of-the-art studio or on location.</p>
                 <button className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full w-fit hover:bg-white hover:text-black transition-all">Learn More</button>
               </div>
            </div>

            {/* Bento Cards */}
            <ServiceCard 
              icon={Camera}
              title="Event Coverage"
              description="Cinematic documentation of weddings, corporate galas, and cultural festivals with a documentary approach."
              delay={100}
            />
            
            <ServiceCard 
              icon={MonitorPlay}
              title="Space Rentage"
              description="Access our minimal, naturally lit studio spaces equipped with professional lighting gears for your own creative projects."
              delay={200}
            />

             <div className="md:col-span-1 rounded-3xl bg-blue-600 text-white p-8 flex flex-col justify-center relative overflow-hidden group interactive">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                <h3 className="text-3xl font-bold mb-4 relative z-10">Custom Package?</h3>
                <p className="text-blue-100 mb-6 relative z-10">Tailor make your experience. Let's discuss your specific needs.</p>
                <ArrowRight className="w-8 h-8 relative z-10" />
             </div>
          </div>
        </div>
      </section>

      {/* --- STUDENT SUBDOMAIN SECTION (Claymorphism/Neomorphism) --- */}
      <section id="students" className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-[#e0e5ec] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 transform transition-transform hover:scale-[1.01] duration-500">
            <div className="flex-1 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 font-semibold mb-6">
                <GraduationCap size={20} />
                <span>Student Portal</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Matriculation & <br />Convocation
              </h2>
              <p className="text-slate-600 mb-8 text-lg">
                Access your specialized student gallery. Find your matriculation photos, graduation ceremonies, and campus memories in a dedicated private vault.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-2xl shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#2563eb,-6px_-6px_12px_#3b82f6] transition-all duration-300 font-medium interactive group"
              >
                Access Student Subdomain
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="flex-1 relative w-full h-[400px]">
              {/* Neomorphic floating elements */}
              <div className="absolute top-10 left-10 w-48 h-64 bg-slate-100 rounded-2xl shadow-[10px_10px_20px_#d1d1d1,-10px_-10px_20px_#ffffff] rotate-[-6deg] z-10 overflow-hidden p-2">
                 <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" className="w-full h-full object-cover rounded-xl" alt="Student" />
              </div>
              <div className="absolute top-20 left-32 w-48 h-64 bg-slate-100 rounded-2xl shadow-[10px_10px_20px_#d1d1d1,-10px_-10px_20px_#ffffff] rotate-[12deg] z-20 overflow-hidden p-2">
                 <img src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" className="w-full h-full object-cover rounded-xl" alt="Graduation" />
              </div>
              {/* Decorative floating shapes */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO PARALLAX --- */}
      <section id="portfolio" className="relative py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 flex justify-between items-end">
          <div>
            <h2 className="text-7xl font-bold tracking-tighter mb-4">Selected<br/><span className="text-blue-500 italic">Work</span></h2>
          </div>
          <div className="hidden md:block">
            <p className="text-right text-gray-400 max-w-xs">Drag to explore the visual journey. Click to expand.</p>
          </div>
        </div>

        {/* Masonry Layout with different speeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 min-h-[150vh]">
           {/* Column 1 */}
           <div className="flex flex-col gap-4 mt-0">
             <PortfolioItem 
               src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
               size="h-[400px]"
               speed={0.1}
               title="Neon Portrait"
               category="Editorial"
             />
             <PortfolioItem 
               src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
               size="h-[300px]"
               speed={0.2}
               title="Forest Mist"
               category="Landscape"
             />
           </div>

           {/* Column 2 */}
           <div className="flex flex-col gap-4 md:mt-20">
             <PortfolioItem 
               src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
               size="h-[500px]"
               speed={-0.1}
               title="The Wedding"
               category="Event"
             />
             <PortfolioItem 
               src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
               size="h-[350px]"
               speed={0.05}
               title="Urban Flow"
               category="Street"
             />
           </div>

           {/* Column 3 */}
           <div className="flex flex-col gap-4 mt-0">
             <PortfolioItem 
               src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
               size="h-[300px]"
               speed={0.3}
               title="Pink Haze"
               category="Creative"
             />
             <PortfolioItem 
               src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
               size="h-[450px]"
               speed={0.1}
               title="Nature's Pattern"
               category="Nature"
             />
           </div>

           {/* Column 4 */}
           <div className="flex flex-col gap-4 md:mt-32">
             <PortfolioItem 
               src="https://images.unsplash.com/photo-1551316679-9c6ae9dec224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
               size="h-[400px]"
               speed={-0.2}
               title="Blue Abstract"
               category="Abstract"
             />
              <PortfolioItem 
               src="https://images.unsplash.com/photo-1620641788427-b9f4dbd0b50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
               size="h-[300px]"
               speed={0}
               title="Lines & Curves"
               category="Architecture"
             />
           </div>
        </div>
        
        <div className="flex justify-center mt-20">
          <button className="px-10 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 interactive uppercase tracking-widest text-sm">
            View All Projects
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-slate-950 text-white pt-24 pb-12 rounded-t-[3rem] mt-[-2rem] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-2xl font-bold">
                 <Aperture className="text-blue-500" /> EVEREST
              </div>
              <p className="text-gray-400">
                Redefining photography through creative lens and future aesthetics.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors interactive">Studio Shoot</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors interactive">Outdoor Events</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors interactive">Space Rental</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors interactive">Editing</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Student Zone</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors interactive">Login</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors interactive">Find My Gallery</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors interactive">Pricing</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors interactive">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors interactive">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors interactive">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors interactive">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 Everest Studio. All rights reserved.</p>
            <div className="flex gap-6 text-gray-500 text-sm">
              <span className="cursor-pointer hover:text-white transition-colors interactive">Privacy Policy</span>
              <span className="cursor-pointer hover:text-white transition-colors interactive">Terms of Service</span>
            </div>
          </div>
          
          <div className="mt-12 text-center md:text-right">
             <h1 className="text-[10vw] font-bold text-white/5 leading-none select-none">EVEREST</h1>
          </div>
        </div>
      </footer>
    </div>
  );
}
