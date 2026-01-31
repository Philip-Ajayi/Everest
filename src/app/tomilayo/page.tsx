"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  Twitter, 
  ChevronRight, 
  ExternalLink, 
  Zap, 
  Layout, 
  Search, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  PenTool, 
  Globe,
  Sun,
  Moon,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Time-based theme detection
  useEffect(() => {
    const hour = new Date().getHours();
    setIsDark(hour < 6 || hour >= 18);
  }, []);

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
    };


  const services = [
    { title: "Email Marketing", icon: <Mail className="w-6 h-6" />, desc: "High-conversion automation and targeted campaigns that turn leads into loyal customers.", metrics: "35% Avg Open Rate" },
    { title: "WordPress Dev", icon: <Layout className="w-6 h-6" />, desc: "Responsive, high-performance websites built for scalability and user experience.", metrics: "100+ Sites Delivered" },
    { title: "SEO Strategy", icon: <Search className="w-6 h-6" />, desc: "Organic growth strategies that place your brand at the top of search engine results.", metrics: "Top 3 Rankings" },
    { title: "Sponsored Ads", icon: <TrendingUp className="w-6 h-6" />, desc: "ROI-driven Meta and Google Ads campaigns designed for maximum conversion.", metrics: "4x ROAS Average" },
    { title: "Zoho Setup", icon: <Settings className="w-6 h-6" />, desc: "Streamlining operations through expert Zoho CRM and workspace configuration.", metrics: "50% Higher Efficiency" },
    { title: "Data Analysis", icon: <BarChart3 className="w-6 h-6" />, desc: "Visualizing complex data to drive informed business decisions and growth.", metrics: "Data-Driven Results" },
  ];

  const blogs = [
    {
      title: "The Future of AI in Email Marketing",
      date: "Oct 12, 2023",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      excerpt: "How generative AI is personalizing the customer journey at scale..."
    },
    {
      title: "Why WordPress is Still King in 2024",
      date: "Nov 05, 2023",
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
      excerpt: "Deep dive into the latest Gutenberg updates and site performance optimizations..."
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "250+" },
    { label: "Client Satisfaction", value: "99%" },
    { label: "Leads Generated", value: "15k+" },
    { label: "Ad Spend Managed", value: "$500k+" },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`min-h-screen transition-colors duration-700 font-sans selection:bg-purple-500 selection:text-white ${isDark ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'}`}
    >
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20"
          style={{ 
            background: 'radial-gradient(circle, #8b5cf6, transparent)',
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)` 
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full blur-[150px] opacity-10"
          style={{ 
            background: 'radial-gradient(circle, #3b82f6, transparent)',
            transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` 
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors ${isDark ? 'bg-black/20 border-white/10' : 'bg-white/40 border-black/5'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-lg shadow-purple-500/20" />
            AJAYI.
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest opacity-80">
            <a href="#services" className="hover:text-purple-500 transition-colors">Solutions</a>
            <a href="#about" className="hover:text-purple-500 transition-colors">Philosophy</a>
            <a href="#blog" className="hover:text-purple-500 transition-colors">Insights</a>
            <a href="#metrics" className="hover:text-purple-500 transition-colors">Impact</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full border transition-all ${isDark ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold text-sm shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all">
              LET'S TALK
            </button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold tracking-widest mb-6">
              DIGITAL ARCHITECT & STRATEGIST
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[0.9]">
              OLUWATOMILAYO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 italic">AJAYI</span>
            </h1>
            <p className="text-xl opacity-70 mb-10 max-w-lg leading-relaxed">
              Transforming complex business challenges into seamless digital experiences through data-driven marketing, precision engineering, and visual storytelling.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-all shadow-2xl">
                START A PROJECT <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex gap-4 items-center px-4">
                <a href="#" className="p-2 opacity-50 hover:opacity-100 hover:text-purple-500"><Twitter /></a>
                <a href="#" className="p-2 opacity-50 hover:opacity-100 hover:text-purple-500"><Instagram /></a>
                <a href="#" className="p-2 opacity-50 hover:opacity-100 hover:text-purple-500"><Linkedin /></a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-500/20 border border-white/10 backdrop-blur-xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt="Oluwatomilayo Ajayi"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            {/* Floating Card UI */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 p-6 glass-morphism rounded-2xl border border-white/20 shadow-2xl z-20 backdrop-blur-2xl"
              style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-xs font-bold opacity-50">STATUS</p>
                  <p className="font-bold">Available for Strategy</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Metrics Section */}
      <section id="metrics" className="py-20 border-y border-white/5 relative z-10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              key={idx} 
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic">
                {stat.value}
              </div>
              <div className="text-xs font-bold tracking-[0.2em] opacity-50 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">SERVICES THAT <span className="italic text-purple-500 underline">CONVERT.</span></h2>
              <p className="opacity-60 text-lg">A holistic approach to digital growth—blending technical excellence with marketing psychology to scale your revenue.</p>
            </div>
            <button className="group flex items-center gap-2 text-sm font-bold tracking-widest opacity-80 hover:opacity-100">
              VIEW ALL SOLUTIONS <div className="w-12 h-[1px] bg-current group-hover:w-20 transition-all" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={idx}
                className={`p-8 rounded-3xl border transition-all duration-500 group ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'}`}
              >
                <div className="mb-8 p-4 w-fit rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="opacity-60 mb-6 leading-relaxed">{service.desc}</p>
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-500 tracking-wider uppercase">{service.metrics}</span>
                  <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      <section id="blog" className={`py-32 px-6 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 underline decoration-purple-500/30">THOUGHT LEADERSHIP</h2>
            <p className="opacity-60 max-w-2xl mx-auto">Sharing strategies, industry trends, and deep-dives into the digital landscape.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {blogs.map((blog, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-video rounded-3xl overflow-hidden mb-6 relative">
                  <img src={blog.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-6 py-3 bg-white text-black rounded-full font-bold">READ FULL STORY</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4 text-xs font-bold opacity-50 tracking-widest">
                  <span>{blog.date}</span>
                  <div className="w-1 h-1 bg-current rounded-full" />
                  <span>STRATEGY</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-500 transition-colors">{blog.title}</h3>
                <p className="opacity-60 mb-6 leading-relaxed text-lg">{blog.excerpt}</p>
                <button className="flex items-center gap-2 font-bold text-sm border-b-2 border-purple-500 pb-1">
                  DISCOVER MORE <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="px-10 py-5 border-2 border-current rounded-full font-black tracking-tighter hover:bg-current hover:text-white transition-all">
              GO TO FULL BLOG ARCHIVE
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="text-[20vw] font-black tracking-tighter animate-pulse select-none">GROWTH.</div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-8">READY TO <span className="italic text-blue-500">SCALE?</span></h2>
          <p className="text-xl md:text-2xl opacity-70 mb-12 font-medium">
            Stop leaving revenue on the table. Let's engineer a digital presence that actually drives business value.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-black text-xl shadow-2xl shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all">
              LET'S START THE PROPOSAL
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`pt-24 pb-12 border-t px-6 transition-colors ${isDark ? 'bg-black border-white/5' : 'bg-slate-100 border-black/5'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2">
              <div className="text-3xl font-black mb-6">AJAYI.</div>
              <p className="opacity-50 mb-8 max-w-xs">Building the next generation of digital assets for visionary companies worldwide.</p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="col-span-1">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest opacity-30">Studio</h4>
              <ul className="space-y-4 font-medium opacity-60">
                <li><a href="#" className="hover:text-purple-500">Projects</a></li>
                <li><a href="#" className="hover:text-purple-500">Process</a></li>
                <li><a href="#" className="hover:text-purple-500">Contact</a></li>
                <li><a href="#" className="hover:text-purple-500">About Me</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest opacity-30">Legal</h4>
              <ul className="space-y-4 font-medium opacity-60">
                <li><a href="#" className="hover:text-purple-500">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-500">Terms</a></li>
                <li><a href="#" className="hover:text-purple-500">Cookies</a></li>
              </ul>
            </div>

            <div className="col-span-2">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest opacity-30">Newsletter</h4>
              <p className="opacity-50 mb-4 text-sm">Weekly digital growth strategies in your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="bg-white/5 border border-white/10 rounded-full px-6 py-3 flex-1 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button className="p-3 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold tracking-widest opacity-30 uppercase">
            <p>© 2024 OLUWATOMILAYO AJAYI. ALL RIGHTS RESERVED.</p>
            <p>BUILT BY AJAYI DIGITAL</p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-black p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl font-black">AJAYI.</div>
              <button onClick={() => setIsMenuOpen(false)}><CloseIcon size={32}/></button>
            </div>
            <div className="space-y-6">
              {['Solutions', 'Philosophy', 'Insights', 'Impact'].map((item, i) => (
                <a key={i} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="block text-6xl font-black tracking-tighter hover:text-purple-500 transition-all">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex gap-6">
              <Twitter />
              <Instagram />
              <Linkedin />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,400;0,700;0,800;1,800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
        }

        .glass-morphism {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #333;
        }

        * {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;
