
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, IMAGES, LANDING_FEATURES, PLANS, TESTIMONIALS } from '../constants';
import { Shield, Eye, Heart, Bell, Lock, Image as ImageIcon, ShieldAlert, Bot, Check, ArrowRight, Menu, X } from 'lucide-react';
import GuestScanner from './GuestScanner';

const IconMap: Record<string, any> = {
  Eye: Eye,
  ShieldAlert: ShieldAlert,
  Image: ImageIcon,
  Bot: Bot,
  Lock: Lock,
  Bell: Bell
};

const Landing = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-charcoal">
        {/* Scanner Modal */}
        <GuestScanner isOpen={showScanner} onClose={() => setShowScanner(false)} />

        {/* Nav */}
        <nav className="px-6 md:px-12 py-4 flex justify-between items-center bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 z-50">
                <Logo className="w-10 h-10" />
                <span className="text-2xl font-serif font-bold text-teal-900 tracking-tight">DigiSafe+</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-sm font-bold tracking-wide uppercase text-gray-600">
                <Link to="/about" className="hover:text-terracotta transition-colors">The Crisis</Link>
                <Link to="/about" className="hover:text-terracotta transition-colors">Our Solution</Link>
                <Link to="/plans" className="hover:text-terracotta transition-colors">Membership</Link>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex space-x-4">
                <Link to="/auth" className="text-teal-900 font-bold hover:underline py-2">Log In</Link>
                <button 
                  onClick={() => setShowScanner(true)}
                  className="bg-terracotta text-white px-6 py-2 rounded-md font-bold hover:bg-terracotta-600 transition-colors shadow-sm uppercase tracking-wide text-sm"
                >
                    Free Safety Scan
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-50">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-teal-900 p-2"
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-cream/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in md:hidden">
                    <Link 
                      to="/about" 
                      className="text-2xl font-serif font-bold text-teal-900" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                        Our Mission
                    </Link>
                    <Link 
                      to="/plans" 
                      className="text-2xl font-serif font-bold text-teal-900" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                        Membership Plans
                    </Link>
                    <Link 
                      to="/support" 
                      className="text-2xl font-serif font-bold text-teal-900" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                        Support Center
                    </Link>
                    <hr className="w-24 border-teal-200" />
                    <Link 
                      to="/auth" 
                      className="text-xl font-bold text-terracotta" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                        Log In
                    </Link>
                    <button 
                      onClick={() => { setShowScanner(true); setMobileMenuOpen(false); }}
                      className="bg-teal-900 text-white px-8 py-3 rounded-full font-bold shadow-lg"
                    >
                        Run Safety Scan
                    </button>
                </div>
            )}
        </nav>

        {/* Humanitarian Hero Section */}
        <section className="relative w-full h-[600px] md:h-[700px] flex items-center bg-teal-900 overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                  src={IMAGES.hero} 
                  alt="African woman confidently using technology" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/60 to-teal-900/40 md:to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-12">
                <div className="max-w-2xl space-y-6">
                    <span className="inline-block bg-gold text-teal-900 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm mb-2 shadow-sm">
                        System D • Digital Protection
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-tight md:leading-[1.1]">
                        Every girl deserves to be safe online.
                    </h1>
                    <p className="text-lg md:text-xl text-teal-50 leading-relaxed font-light drop-shadow-sm">
                        Millions of women and girls face online violence daily. We provide the digital shield they need to learn, connect, and grow without fear.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button 
                            onClick={() => setShowScanner(true)} 
                            className="bg-terracotta text-white px-8 py-4 rounded-md font-bold text-lg shadow-lg hover:bg-terracotta-600 transition-all hover:-translate-y-1 text-center"
                        >
                            Run Safety Scan
                        </button>
                        <Link to="/auth" className="px-8 py-4 rounded-md font-bold text-white border-2 border-white hover:bg-white hover:text-teal-900 transition-all text-center">
                            Join the Platform
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* The Crisis / Statistics Section */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-cream">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                <div className="flex-1 relative w-full">
                    <img 
                      src={IMAGES.crisis} 
                      alt="Woman looking concerned at phone" 
                      className="rounded-lg shadow-xl w-full h-[300px] md:h-[500px] object-cover" 
                    />
                    <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 bg-white p-6 rounded-lg shadow-lg border-l-4 border-terracotta max-w-xs hidden sm:block">
                        <p className="font-serif italic text-gray-600">"Online violence silences women, forcing them offline and out of public spaces."</p>
                    </div>
                </div>
                <div className="flex-1 space-y-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900">The Digital Crisis</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        The internet should be a gateway to opportunity, but for many African women, it is a place of danger. Harassment, stalking, and image abuse are rising threats that often go unreported.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div>
                            <span className="text-4xl md:text-5xl font-bold text-terracotta block mb-2">38%</span>
                            <p className="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wide">of women globally have experienced online violence.</p>
                        </div>
                        <div>
                            <span className="text-4xl md:text-5xl font-bold text-terracotta block mb-2">85%</span>
                            <p className="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wide">of women report witnessing online violence against others.</p>
                        </div>
                    </div>

                    <div className="bg-teal-100 p-6 rounded-lg border-l-4 border-teal-800">
                        <h4 className="font-bold text-teal-900 mb-2">Our Promise</h4>
                        <p className="text-teal-800">DigiSafe+ (System D) monitors, detects, and protects. We don't just alert you; we guide you to safety.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* How We Help (Features) */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
                <span className="text-terracotta font-bold uppercase tracking-widest text-sm">Our Solution</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mt-3 mb-6">How We Protect You</h2>
                <div className="w-24 h-1 bg-terracotta mx-auto"></div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {LANDING_FEATURES.map((feature, idx) => {
                  const Icon = IconMap[feature.iconName];
                  return (
                    <div key={idx} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:border-terracotta transition-colors group">
                        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-900 mx-auto mb-6 group-hover:bg-teal-900 group-hover:text-gold transition-colors">
                            <Icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-teal-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
            </div>

            <div className="mt-12 md:mt-16 text-center">
                 <button 
                    onClick={() => setShowScanner(true)}
                    className="inline-flex items-center gap-2 text-teal-900 font-bold border-b-2 border-terracotta pb-1 hover:text-terracotta transition-colors text-lg"
                >
                    Take a Free Safety Check <ArrowRight size={20} />
                 </button>
            </div>
        </section>

        {/* Impact / Stories */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-teal-900 text-white relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${IMAGES.community})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            
            <div className="max-w-5xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 md:mb-16">Stories from the Community</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TESTIMONIALS.map((t, idx) => (
                        <div key={idx} className="bg-white text-gray-800 p-8 rounded-lg shadow-xl relative mt-4 md:mt-0">
                            <div className="text-terracotta text-6xl font-serif absolute -top-6 left-6 opacity-100">"</div>
                            <p className="text-lg italic leading-relaxed mb-6 pt-4">
                                {t.text}
                            </p>
                            <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                                <div className="w-10 h-10 bg-teal-900 rounded-full flex items-center justify-center text-gold font-bold">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-teal-900 uppercase text-sm tracking-wide">{t.author}</div>
                                    <div className="text-xs text-gray-500">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Plans Section */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-cream">
             <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-4">Membership Options</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Safety is a human right. Our core protection is free, forever. Upgrades support our mission and provide advanced tools for families.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PLANS.map((plan, idx) => (
                    <div key={idx} className={`relative bg-white rounded-xl p-6 flex flex-col border ${plan.recommended ? 'border-terracotta shadow-xl scale-100 lg:scale-105 z-10' : 'border-gray-200'}`}>
                       {plan.recommended && (
                         <div className="absolute top-0 left-0 w-full bg-terracotta text-white text-center py-1 text-xs font-bold uppercase tracking-widest rounded-t-lg">
                           Recommended
                         </div>
                       )}
                       <div className={plan.recommended ? 'pt-6' : ''}>
                           <h3 className="text-xl font-bold text-teal-900 mb-2">{plan.name}</h3>
                           <div className="mb-4">
                             <span className="text-3xl font-bold">{plan.price}</span>
                             {plan.period && <span className="text-xs text-gray-500 block">{plan.period}</span>}
                           </div>
                           <ul className="space-y-3 mb-8 flex-1">
                             {plan.features.map((feat, i) => (
                               <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                 <Check size={16} className="text-teal-600 shrink-0 mt-0.5" />
                                 <span>{feat}</span>
                               </li>
                             ))}
                           </ul>
                           <Link to="/auth" className={`w-full py-3 rounded-md font-bold text-center transition-colors border-2 block ${
                               plan.recommended 
                               ? 'bg-teal-900 text-white border-teal-900 hover:bg-teal-800' 
                               : 'bg-white text-teal-900 border-teal-900 hover:bg-teal-50'
                           }`}>
                             {plan.cta}
                           </Link>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
        </section>

        {/* CTA Footer-ish Section */}
        <section className="py-20 px-6 md:px-12 bg-terracotta text-white text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join the Movement</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
                Don't wait until it's too late. Protect your digital identity and help us build a safer internet for African women.
            </p>
            <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setShowScanner(true)}
                  className="bg-white text-terracotta px-8 py-3 rounded-md font-bold hover:bg-teal-50 transition-colors shadow-lg"
                >
                    Start Free Scan
                </button>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-teal-950 text-gray-400 py-12 px-6 border-t border-teal-900 text-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <div className="flex items-center space-x-2">
                        <Logo className="w-8 h-8" />
                        <span className="font-serif font-bold text-xl text-white">DigiSafe+</span>
                    </div>
                    <p>System D • Protecting African Women & Girls</p>
                </div>
                <div className="flex gap-6 font-bold uppercase tracking-wider text-xs flex-wrap justify-center">
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    <Link to="/plans" className="hover:text-white transition-colors">Plans</Link>
                    <Link to="/support" className="hover:text-white transition-colors">Support</Link>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                </div>
                <div className="text-center md:text-right">
                    &copy; {new Date().getFullYear()} System D.
                </div>
            </div>
        </footer>
    </div>
  );
};

export default Landing;
