"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Video, 
  Box, 
  ArrowRight, 
  Menu, 
  X, 
  Instagram, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  Play,
  Aperture,
  Zap,
  Globe
} from 'lucide-react';

/**
 * EVEREST STUDIO LANDING PAGE
 * * Design Philosophy: 
 * - Asymmetrical "Bento" Grids for dynamic layout.
 * - Glassmorphism and floating elements for "Gen Z" appeal.
 * - Strict adherence to image dimension aspect ratios.
 */

const EverestStudio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom CSS for specific animations
  const styles = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes horizontalScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-delay { animation: float 7s ease-in-out infinite 1s; }
    .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .glass-nav {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.05);
    }
    .text-outline {
      -webkit-text-stroke: 1px rgba(0,0,0,0.1);
      color: transparent;
    }
    .clip-text-image {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%);
    }
    /* Hide scrollbar for gallery */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <style>{styles}</style>

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center overflow-hidden transform group-hover:rotate-12 transition-transform">
              <div className="absolute inset-0 bg-blue-500 opacity-50 mix-blend-overlay"></div>
              <Aperture className="text-white w-6 h-6 animate-spin-slow" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Everest<span className="text-blue-600">Studio</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            {['Services', 'Portfolio', 'Spaces', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            {/* Special Student Link */}
            <a 
              href="https://example.com/students" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
            >
              <span>Student Photography</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl md:hidden animate-slide-up">
            {['Services', 'Portfolio', 'Spaces', 'About'].map((item) => (
              <a key={item} href="#" className="text-lg font-medium text-slate-600" onClick={() => setIsMenuOpen(false)}>{item}</a>
            ))}
             <a href="#" className="text-blue-600 font-bold flex items-center gap-2">
                Visit Student Portal <ArrowRight size={16}/>
             </a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-100 rounded-full blur-3xl opacity-30 translate-y-1/4 -translate-x-1/4 animate-float-delay"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Media Production Reimagined
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-slate-900">
                We capture <br />
                <span className="clip-text-image">Hyper-Reality.</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Everest Studio creates digital masterpieces. From high-fashion summits to panoramic creative spaces. Designed for the visionaries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-2 group">
                  Explore Portfolio
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Play size={18} className="fill-slate-700" />
                  Showreel
                </button>
              </div>
            </div>

            {/* Hero Image Grid (Simulating a dynamic layout) */}
            <div className="flex-1 relative w-full h-[600px] hidden md:block">
              {/* Image 1: Tall */}
              <div className="absolute top-0 right-10 w-64 h-96 bg-slate-200 rounded-3xl overflow-hidden transform rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl z-20 group">
                <img 
                  src="https://placehold.co/1328x2000/2563EB/FFFFFF/png?text=Fashion+Shoot" 
                  alt="Fashion Shoot" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              {/* Image 2: Wide */}
              <div className="absolute bottom-10 left-0 w-80 h-56 bg-slate-200 rounded-3xl overflow-hidden transform -rotate-6 hover:rotate-0 transition-all duration-500 shadow-xl z-30 group border-4 border-white">
                <img 
                  src="https://placehold.co/2000x1328/1e293b/FFFFFF/png?text=Event+Coverage" 
                  alt="Event Coverage" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-20 left-10 text-9xl font-black text-outline opacity-20 -z-10 select-none">
                CREATE
              </div>
              <div className="absolute bottom-40 right-0 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SERVICES SECTION (Bento Grid) --- */}
      <section id="services" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Expertise</h2>
              <p className="text-slate-500 max-w-md">Precision crafted media services tailored for modern brands.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:translate-x-1 transition-transform">
              View All Services <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            
            {/* Service 1: Event Coverage (Wide) */}
            <div className="md:col-span-8 relative group overflow-hidden rounded-3xl">
               <img 
                  src="https://placehold.co/2000x1328/0f172a/FFFFFF/png?text=Event+Coverage+2000x1328" 
                  alt="Event Coverage" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                       <Video className="text-blue-400" />
                       <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Coverage</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Event Coverage</h3>
                    <p className="text-slate-300 mb-6 max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      From corporate summits to award nights. We capture the energy of the crowd.
                    </p>
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-slate-900 transition-all">
                      See More
                    </button>
                  </div>
                </div>
            </div>

            {/* Service 2: Photo Shoot (Tall) */}
            <div className="md:col-span-4 row-span-2 relative group overflow-hidden rounded-3xl">
               <img 
                  src="https://placehold.co/1328x2000/e2e8f0/1e293b/png?text=Photo+Shoot+1328x2000" 
                  alt="Photo Shoot" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                       <Camera className="text-blue-400" />
                       <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Studio</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Professional Photo Shoots</h3>
                    <button className="bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all">
                      See More
                    </button>
                  </div>
                </div>
            </div>

             {/* Service 3: Space Rentage (Panoramic) */}
             <div className="md:col-span-8 relative group overflow-hidden rounded-3xl border border-slate-200">
                <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Box size={12} /> 3D View
                </div>
               <img 
                  src="https://placehold.co/2000x800/2563EB/FFFFFF/png?text=Panoramic+Space+Rentage" 
                  alt="Space Rentage" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                 <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                    <div className="text-center p-8 bg-white/90 backdrop-blur-xl rounded-2xl transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Creative Space Rental</h3>
                      <p className="text-slate-600 mb-4 text-sm">Fully equipped studios for your next project.</p>
                      <button className="text-blue-600 font-bold hover:underline">Book Space &rarr;</button>
                    </div>
                 </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SELECTED WORKS (Masonry Layout) --- */}
      <section id="portfolio" className="py-24 bg-slate-50">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Selected Works</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">Visual Excellence</h2>
            </div>

            {/* Masonry Grid Implementation using CSS Columns logic via Flexbox for React simplicity */}
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Column 1 */}
              <div className="flex-1 flex flex-col gap-6">
                 {/* Workshop: 2000x1328 (Landscape) */}
                 <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                    <img src="https://placehold.co/2000x1328/94a3b8/ffffff?text=Workshop" className="w-full h-auto object-cover" alt="Workshop" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <p className="font-bold text-lg">Creative Workshop</p>
                      <p className="text-xs">2000 x 1328</p>
                    </div>
                 </div>

                 {/* Summit: 4000x6016 (Portrait - Huge, scaled) */}
                 <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                    <img src="https://placehold.co/1328x2000/1e293b/ffffff?text=Global+Summit" className="w-full h-auto object-cover" alt="Summit" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                     <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <p className="font-bold text-lg">Tech Summit</p>
                      <p className="text-xs">4000 x 6016 (Scaled)</p>
                    </div>
                 </div>
              </div>

              {/* Column 2 */}
              <div className="flex-1 flex flex-col gap-6">
                 {/* Photo Shoot: 1328x2000 (Portrait) */}
                 <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                    <img src="https://placehold.co/1328x2000/3b82f6/ffffff?text=Fashion+Editorial" className="w-full h-auto object-cover" alt="Fashion" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <p className="font-bold text-lg">Vogue Editorial</p>
                      <p className="text-xs">1328 x 2000</p>
                    </div>
                 </div>

                 {/* Wedding: 2000x1328 (Landscape) */}
                 <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                    <img src="https://placehold.co/2000x1328/f472b6/ffffff?text=Royal+Wedding" className="w-full h-auto object-cover" alt="Wedding" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <p className="font-bold text-lg">Royal Wedding</p>
                      <p className="text-xs">2000 x 1328</p>
                    </div>
                 </div>
              </div>

              {/* Column 3 */}
              <div className="flex-1 flex flex-col gap-6">
                {/* Award Event: 4000x6016 (Portrait) */}
                 <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                    <img src="https://placehold.co/1328x2000/fbbf24/000000?text=Award+Gala" className="w-full h-auto object-cover" alt="Award" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <p className="font-bold text-lg">National Awards</p>
                      <p className="text-xs">4000 x 6016 (Scaled)</p>
                    </div>
                 </div>
                 
                 {/* Student Promo Card in Grid */}
                 <div className="relative group rounded-2xl overflow-hidden bg-slate-900 p-8 flex flex-col justify-center items-center text-center">
                    <Zap className="text-yellow-400 w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Student?</h3>
                    <p className="text-slate-400 mb-6 text-sm">Special packages for matriculation & convocation.</p>
                    <a href="https://example.com/students" className="text-white border-b border-yellow-400 pb-1 hover:text-yellow-400 transition-colors">Visit Student Site</a>
                 </div>
              </div>

            </div>
         </div>
      </section>

      {/* --- STUDENT PHOTOGRAPHY PROMO --- */}
      <section className="py-20 bg-blue-600 text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-xl">
             <div className="inline-block bg-blue-500 border border-blue-400 rounded-lg px-3 py-1 text-xs font-bold uppercase mb-4">Dedicated Platform</div>
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Capture Your Milestone.</h2>
             <p className="text-blue-100 text-lg mb-8">
               Matriculation, Convocation, Induction. We have a dedicated website just for student ceremonies with exclusive student pricing.
             </p>
             <a 
               href="https://example.com/students" 
               target="_blank"
               className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
             >
               Visit Student Photography <ExternalLink size={20} />
             </a>
           </div>

           {/* Decorative overlapping images */}
           <div className="relative w-full max-w-md h-64 md:h-80">
              <div className="absolute top-0 right-0 w-48 h-64 bg-slate-800 rotate-6 rounded-2xl overflow-hidden border-4 border-white/20">
                <img src="https://placehold.co/400x600/1e293b/fff?text=Convocation" className="w-full h-full object-cover opacity-80" alt="Convocation" />
              </div>
              <div className="absolute top-8 right-24 w-48 h-64 bg-slate-700 -rotate-6 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                 <img src="https://placehold.co/400x600/334155/fff?text=Matriculation" className="w-full h-full object-cover" alt="Matriculation" />
              </div>
           </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6">
           <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to create something iconic?</h2>
           <p className="text-slate-500 mb-10 text-lg">Book our studios or hire our production team today.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all">
               Book a Session
             </button>
             <button className="px-10 py-4 bg-transparent border-2 border-slate-200 text-slate-700 rounded-full font-bold hover:border-slate-900 hover:text-slate-900 transition-all">
               View Rates
             </button>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
           
           {/* Brand */}
           <div className="space-y-4">
             <div className="flex items-center gap-2 text-white font-bold text-xl">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <Aperture size={16} />
               </div>
               Everest Studio
             </div>
             <p className="text-sm">
               Defining the visual language of tomorrow. Premium media production for brands and individuals.
             </p>
           </div>

           {/* Sitemap */}
           <div>
             <h4 className="text-white font-bold mb-6">Explore</h4>
             <ul className="space-y-3 text-sm">
               <li><a href="#" className="hover:text-blue-400 transition-colors">Services</a></li>
               <li><a href="#" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
               <li><a href="#" className="hover:text-blue-400 transition-colors">Space Rental</a></li>
               <li><a href="#" className="hover:text-blue-400 transition-colors">Student Portal</a></li>
             </ul>
           </div>

           {/* Contact Info (No Form) */}
           <div>
             <h4 className="text-white font-bold mb-6">Contact</h4>
             <ul className="space-y-3 text-sm">
               <li>hello@evereststudio.com</li>
               <li>+234 905 228 8824</li>
               <li>Water, Ibadan</li>
             </ul>
             <div className="flex gap-4 mt-6">
               <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Instagram size={16} /></a>
               <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Twitter size={16} /></a>
               <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Linkedin size={16} /></a>
             </div>
           </div>

           {/* Legal */}
           <div>
             <h4 className="text-white font-bold mb-6">Legal</h4>
             <ul className="space-y-3 text-sm">
               <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
             </ul>
           </div>

        </div>
        
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Everest Studio. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span>Designed for Gen Z</span>
             <span>•</span>
             <span>Made with Passion</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EverestStudio;
