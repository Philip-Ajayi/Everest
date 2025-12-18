"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Camera, 
  GraduationCap, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Facebook, 
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  MousePointer2
} from 'lucide-react';

// --- Components ---

type GlassCardProps = React.PropsWithChildren<{
  className?: string;
}>;

const GlassCard = ({ children, className = "" }: GlassCardProps) => (
  <div
    className={`backdrop-blur-xl bg-white/40 border border-white/40 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] rounded-[2rem] ${className}`}
  >
    {children}
  </div>
);


type ClayButtonProps = React.PropsWithChildren<{
  primary?: boolean;
  className?: string;
}>;

const ClayButton = ({
  children,
  primary = false,
  className = "",
}: ClayButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05, translateY: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
      primary
        ? "bg-blue-600 text-white shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2),0_10px_20px_rgba(37,99,235,0.3)]"
        : "bg-white text-blue-600 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.05)] border border-blue-50"
    } ${className}`}
  >
    {children}
  </motion.button>
);


const ParticleCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
        setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="w-full h-full bg-blue-400 rounded-full blur-sm opacity-50" />
    </motion.div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Floating Background Blobs
  const blobs = [
    { color: 'bg-blue-200', size: 'w-96 h-96', top: '10%', left: '5%' },
    { color: 'bg-purple-200', size: 'w-[30rem] h-[30rem]', top: '40%', left: '60%' },
    { color: 'bg-cyan-100', size: 'w-80 h-80', top: '70%', left: '20%' },
  ];

  const services = [
    {
      title: "Matriculation & Convocation",
      desc: "Capturing the milestone of your academic journey with premium portraits.",
      icon: <GraduationCap className="w-8 h-8" />,
      tag: "Student Special",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Induction Portraits",
      desc: "Formal and professional sessions for newly inducted professionals.",
      icon: <Sparkles className="w-8 h-8" />,
      tag: "Discounted",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Event Coverage",
      desc: "Dinner awards, summits, and student association gatherings.",
      icon: <Users className="w-8 h-8" />,
      tag: "Group Rates",
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const portfolio = [
    { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000", span: "row-span-2 col-span-1" },
    { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000", span: "row-span-1 col-span-2" },
    { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000", span: "row-span-1 col-span-1" },
    { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000", span: "row-span-2 col-span-2" },
    { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000", span: "row-span-1 col-span-1" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F0F4F8] text-slate-900 font-sans selection:bg-blue-200 overflow-x-hidden">
      <ParticleCursor />
      
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-40 ${blob.color} ${blob.size}`}
            style={{ top: blob.top, left: blob.left }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
        <GlassCard className="px-6 py-4 flex items-center justify-between !rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Camera size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter text-blue-900">EVEREST</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            {['Services', 'Portfolio', 'Student Rates', 'Main Site'].map(item => (
              <a key={item} href="#" className="hover:text-blue-600 transition-colors">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ClayButton className="!py-2 !px-5 !text-sm hidden sm:block">Book Now</ClayButton>
            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </GlassCard>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              STUDENT EXCLUSIVE PORTAL
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900 mb-8">
              Capturing <span className="text-blue-600 italic">Tomorrow's</span> Icons <span className="text-blue-600 italic underline decoration-blue-200">Today.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Premium photography for students at rates that respect your hustle. From graduation gowns to award nights, we freeze your best moments in high definition.
            </p>
            <div className="flex flex-wrap gap-4">
              <ClayButton primary className="flex items-center gap-2">
                View Student Rates <ArrowRight size={18} />
              </ClayButton>
              <a href="https://evereststudio.com" className="group flex items-center gap-2 px-8 py-4 font-bold text-slate-500 hover:text-blue-600 transition-colors">
                Visit Main Site <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756defe93?auto=format&fit=crop&q=80&w=1000" 
                alt="Graduate" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
            {/* Claymorphic Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-3xl shadow-xl z-20 flex items-center justify-center p-4 border border-blue-50"
            >
              <div className="text-center">
                <p className="text-2xl font-black text-blue-600">40%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Off for Students</p>
              </div>
            </motion.div>
            <div className="absolute -bottom-6 -left-6 w-48 h-20 bg-blue-600 rounded-2xl shadow-lg z-20 flex items-center gap-3 px-5 text-white">
              <Users className="text-blue-200" />
              <div>
                <p className="font-bold">Group Shoots</p>
                <p className="text-xs opacity-80">Book with friends</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Our Special <span className="text-blue-600">Services</span></h2>
              <p className="text-slate-500 mt-2">Tailored photography solutions for the academic community.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] overflow-hidden rounded-[2.5rem] bg-white shadow-xl border border-white"
              >
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    {s.icon}
                  </div>
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                    {s.tag}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                  <p className="text-white/70 text-sm mb-6 line-clamp-2">{s.desc}</p>
                  <button className="flex items-center gap-2 font-bold text-sm hover:gap-4 transition-all">
                    LEARN MORE <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Parallax Scrollytelling */}
      <section className="py-24 bg-white/30 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">Studio <span className="text-blue-600">Archive</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto">A glimpse into the visual stories we've told. Diverse faces, unforgettable milestones.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 h-[1000px] md:h-[1200px]">
            {portfolio.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-[2rem] shadow-lg group ${item.span}`}
              >
                <img 
                  src={item.url} 
                  alt="Portfolio piece" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    <div className="bg-white p-4 rounded-full shadow-2xl">
                      <Camera className="text-blue-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neumorphic CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 blur-3xl rounded-full" />
            
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-800">Ready for your <span className="text-blue-600">Shining</span> Moment?</h2>
            <p className="text-lg text-slate-500 mb-12">Don't wait until the last minute. Our student slots fill up fast during convocation seasons.</p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ClayButton primary className="w-full sm:w-auto text-xl py-6 px-12">
                Secure Your Date
              </ClayButton>
              <ClayButton className="w-full sm:w-auto text-xl py-6 px-12 border-blue-100">
                Download Brochure
              </ClayButton>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Camera size={24} />
                </div>
                <span className="text-3xl font-black tracking-tighter">EVEREST STUDIO</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-8">
                Official student photography partner for matriculations, inductions, and campus life. Elevating your narrative through the lens of excellence.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -5, scale: 1.1 }}
                    href="#" 
                    className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                {['Home', 'Student Discounts', 'Main Portfolio', 'Contact Us'].map(l => (
                  <li key={l}><a href="#" className="hover:text-blue-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-4 text-slate-400">
                {['Graduation Packs', 'Group Shoots', 'Event Coverage', 'Studio Rental'].map(s => (
                  <li key={s}><a href="#" className="hover:text-blue-400 transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Everest Studio. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX: smoothProgress }}
      />
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[45] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {['Services', 'Portfolio', 'Student Rates', 'Main Site'].map(item => (
                <a key={item} href="#" className="text-3xl font-black text-slate-800" onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <ClayButton primary className="mt-4">Book Now</ClayButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
