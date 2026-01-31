"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Sun, Moon, Menu, X, Leaf, BarChart3, Calendar, 
  Package, TrendingUp, MessageSquare, Send, 
  ChevronRight, Twitter, Linkedin, ShoppingCart
} from 'lucide-react';

// --- Utilities ---
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

// --- Components ---

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Navbar = ({ theme, toggleTheme, isMenuOpen, setIsMenuOpen }: NavbarProps) => {
  const menuItems = ['Home', 'About Us', 'Cocoa', 'Cashew', 'Calendar', 'Stock', 'Ecosystem'];
  
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-emerald-600 dark:text-emerald-400">
          <Leaf className="w-8 h-8" />
          <span>ADERIBOLE<span className="text-amber-600">COCOA</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-emerald-500 transition-colors">
              {item}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white/10">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-6 right-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold border-b border-white/10 pb-2">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50 dark:to-zinc-950 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="Cocoa Farm" 
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src = 'https://via.placeholder.com/1920x1080?text=Lush+Cocoa+Forest';
            }}

        />
      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 mb-6 border border-emerald-500/30 rounded-full bg-emerald-500/10 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-widest uppercase"
        >
          Direct From Source • Pure Raw Quality
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-none"
        >
          THE ART OF <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-emerald-600">RARE HARVEST</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto"
        >
          Beyond agriculture, we cultivate the foundational elements of global luxury. Specializing in high-yield raw cocoa and premium raw cashew nut production.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20">
            View Current Yield
          </button>
          <button className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 rounded-full font-bold backdrop-blur-md hover:bg-white/10 transition-all">
            Farming Calendar
          </button>
        </motion.div>
      </div>
    </section>
  );
};

interface ProductStat {
  label: string;
  value: string;
}

interface ProductCardProps {
  title: string;
  desc: string;
  img: string;
  stats: ProductStat[];
}

const ProductCard = ({ title, desc, img, stats }: ProductCardProps) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden p-1 shadow-2xl"
  >
    <div className="relative h-80 rounded-2xl overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
        <div className="flex gap-4">
        {stats.map((s: ProductStat, i: number) => (
            <div key={i} className="text-xs text-white/70 uppercase tracking-widest font-bold">
            {s.label}: <span className="text-emerald-400">{s.value}</span>
            </div>
        ))}
        </div>
      </div>
    </div>
    <div className="p-8">
      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
        {desc}
      </p>
      <button className="flex items-center gap-2 text-emerald-500 font-bold group-hover:gap-4 transition-all">
        Bid for Stock <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Welcome to Aderibole Cocoa Support. How can I help you with your cocoa/cashew inquiry today?", sender: 'bot' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Our trade team has been notified. We will reach out to you via your registered account.", sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 md:w-96 h-[500px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl mb-4 flex flex-col overflow-hidden"
          >
            <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
              <div>
                <h4 className="font-bold">Trade Concierge</h4>
                <p className="text-xs text-emerald-100">Usually responds instantly</p>
              </div>
              <button onClick={() => setIsOpen(false)}><X /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'bot' ? 'bg-zinc-100 dark:bg-zinc-800 self-start' : 'bg-emerald-600 text-white self-end'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..." 
                className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 ring-emerald-500"
              />
              <button onClick={handleSend} className="p-2 bg-emerald-600 text-white rounded-full"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-2">
        <a 
          href="https://wa.me/yournumber" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:rotate-12 transition-all"
        >
          {isOpen ? <X /> : <MessageSquare />}
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mousePos = useMousePosition();

  // Theme logic based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`${theme === 'dark' ? 'dark bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'} transition-colors duration-500 font-sans selection:bg-emerald-500/30 min-h-screen overflow-x-hidden`}>
      
      {/* Dynamic Cursor Blob */}
      <motion.div 
        animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, restDelta: 0.001 }}
        className="fixed pointer-events-none w-[300px] h-[300px] bg-emerald-500/20 blur-[120px] rounded-full z-0"
      />

      <Navbar theme={theme} toggleTheme={toggleTheme} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <Hero />

      {/* Metrics Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Hectares Under Management', val: '4,200+', icon: <Leaf /> },
            { label: 'Annual Cocoa Yield', val: '12.5k T', icon: <TrendingUp /> },
            { label: 'Cashew Purity Rate', val: '99.8%', icon: <BarChart3 /> },
            { label: 'Global Trade Partners', val: '48', icon: <Package /> },
          ].map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl"
            >
              <div className="text-emerald-500 mb-4">{m.icon}</div>
              <div className="text-4xl font-black mb-2">{m.val}</div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Display */}
      <section id="cocoa" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6">OUR PRIMARY <span className="text-emerald-600">ASSETS</span></h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              We operate exclusively as primary producers. Our focus is the genetic integrity and sustainable harvesting of raw commodities, ensuring the highest fermentation standards for global chocolatiers and premium grading for cashew processors.
            </p>
          </div>
          <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 font-bold">
            Explore Quality Grades
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <ProductCard 
            title="Raw Forastero Cocoa"
            desc="Sourced from heritage trees, our cocoa beans undergo a precise 6-day solar fermentation process. We maintain a strict moisture content of 7.5%, resulting in a flavor profile that is robust, earthy, and deep."
            img="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=1200"
            stats={[{label: 'Grade', value: 'A1 Premium'}, {label: 'Oil', value: '54%'}]}
          />
          <ProductCard 
            title="Premium Raw Cashew"
            desc="Harvested at peak maturity, our raw cashew nuts are sun-dried and sorted by size. We provide raw kernels with high KOR (Kernel Outturn Ratio), suitable for high-end processing and luxury nut markets."
            img="https://images.unsplash.com/photo-1536592248574-9892c90c746e?auto=format&fit=crop&q=80&w=1200"
            stats={[{label: 'KOR', value: '52-54 lbs'}, {label: 'Moisture', value: '9%'}]}
          />
        </div>
      </section>

      {/* Seasonal Calendar & Stock */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-black mb-6 flex items-center gap-4">
                <Calendar className="text-emerald-500" /> HARVEST TIMELINE
              </h2>
              <div className="space-y-4">
                {[
                  { month: 'September', event: 'Main Cocoa Crop Bloom Begins', status: 'Upcoming' },
                  { month: 'October', event: 'Primary Harvesting Phase 1', status: 'Scheduled' },
                  { month: 'November', event: 'Solar Fermentation Peaks', status: 'Pending' },
                  { month: 'January', event: 'Cashew Season Commencement', status: 'Q1' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-white/10 rounded-2xl bg-white/5">
                    <div>
                      <div className="font-bold">{item.month}</div>
                      <div className="text-sm text-zinc-400">{item.event}</div>
                    </div>
                    <div className="text-xs font-black uppercase text-emerald-500">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black mb-6 flex items-center gap-4">
                <ShoppingCart className="text-amber-500" /> AVAILABLE STOCK
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Raw Cocoa (Dried)</span>
                    <span className="text-emerald-500">82% Available</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '82%' }} className="h-full bg-emerald-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Raw Cashew (Unprocessed)</span>
                    <span className="text-amber-500">14% Available</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '14%' }} className="h-full bg-amber-500" />
                  </div>
                </div>
                <button className="w-full py-4 bg-white text-zinc-950 rounded-2xl font-black hover:bg-emerald-500 hover:text-white transition-all">
                  SECURE RESERVATION BID
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px]" />
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
              className="rounded-[40px] border border-white/20 relative z-10"
              alt="Farm Aerial"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-bold text-3xl tracking-tighter text-emerald-600 mb-6">
                <Leaf className="w-8 h-8" />
                <span>ADERIBOLE<span className="text-amber-600">COCOA</span></span>
              </div>
              <p className="text-zinc-500 max-w-xs mb-6">
                Redefining raw commodity production through sustainable farming, genetic preservation, and transparent trade ecosystems.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:text-emerald-500 transition-colors"><Twitter /></a>
                <a href="#" className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:text-emerald-500 transition-colors"><Linkedin /></a>
              </div>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase text-xs tracking-widest text-zinc-400">Products</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-emerald-500">Raw Cocoa Beans</a></li>
                <li><a href="#" className="hover:text-emerald-500">Unprocessed Cashew</a></li>
                <li><a href="#" className="hover:text-emerald-500">Quality Grading</a></li>
                <li><a href="#" className="hover:text-emerald-500">Bulk Reservation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase text-xs tracking-widest text-zinc-400">Company</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-emerald-500">Our Heritage</a></li>
                <li><a href="#" className="hover:text-emerald-500">Farm Locations</a></li>
                <li><a href="#" className="hover:text-emerald-500">Trade Metrics</a></li>
                <li><a href="#" className="hover:text-emerald-500">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-6 uppercase text-xs tracking-widest text-zinc-400">Legal</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-emerald-500">Trade Terms</a></li>
                <li><a href="#" className="hover:text-emerald-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-500">Export Certs</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between gap-4 text-sm text-zinc-500">
            <p>© 2024 Aderibole Cocoa Estates Ltd. All rights reserved.</p>
            <p>Designed for the Future of Global Agriculture.</p>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
