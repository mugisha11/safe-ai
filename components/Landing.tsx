import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, IllustrationShield, IllustrationWoman, LANDING_FEATURES, PLANS, TESTIMONIALS } from '../constants';
import { Shield, Eye, Heart, Bell, Lock, Image as ImageIcon, ShieldAlert, Bot, Check } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-cream font-sans">
        {/* Scanner Modal */}
        <GuestScanner isOpen={showScanner} onClose={() => setShowScanner(false)} />

        {/* Nav */}
        <nav className="p-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm transition-all">
            <div className="flex items-center space-x-2">
                <Logo className="w-10 h-10" />
                <span className="text-2xl font-bold font-serif text-teal-900">DigiSafe+</span>
            </div>
            <div className="space-x-8 hidden md:block">
                <a href="#features" className="text-teal-900 hover:text-terracotta font-medium transition-colors">Features</a>
                <a href="#plans" className="text-teal-900 hover:text-terracotta font-medium transition-colors">Pricing</a>
                <a href="#testimonials" className="text-teal-900 hover:text-terracotta font-medium transition-colors">Stories</a>
            </div>
            <div className="space-x-4">
                <Link to="/auth" className="text-teal-900 font-bold hover:underline hidden sm:inline-block">Log In</Link>
                <Link to="/auth" className="bg-terracotta text-white px-6 py-2 rounded-full font-bold hover:bg-terracotta-600 transition-colors shadow-lg">
                    Get Protected
                </Link>
            </div>
        </nav>

        {/* Hero */}
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative">
            <div className="flex-1 space-y-8 relative z-10">
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-teal-900 leading-tight">
                    DigiSafe+: Your trusted <span className="text-terracotta">digital bodyguard</span> for African women & girls.
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    Protect your digital life, get real-time alerts, and stay safe online. We monitor your accounts so you don't have to.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                        onClick={() => setShowScanner(true)} 
                        className="bg-teal-900 text-gold px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-teal-800 transition-all hover:-translate-y-1 text-center"
                    >
                        Start My Scan
                    </button>
                    <a href="#plans" className="px-8 py-4 rounded-full font-bold text-teal-900 border-2 border-teal-900 hover:bg-teal-50 transition-all text-center">
                        See Plans
                    </a>
                </div>
                <div className="pt-4 flex items-center gap-6 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-2"><Shield size={18} className="text-green-600"/> Private & Secure</span>
                  <span className="flex items-center gap-2"><Heart size={18} className="text-terracotta"/> Trusted by 10k+</span>
                </div>
            </div>
            <div className="flex-1 relative w-full flex justify-center">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl transform translate-y-10 scale-75"></div>
                <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                    <IllustrationWoman />
                </div>
            </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="bg-white py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-teal-900 mb-6">Complete Digital Protection</h2>
                    <p className="text-gray-600 text-lg">System D provides comprehensive tools to safeguard your identity, reputation, and peace of mind.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {LANDING_FEATURES.map((feature, idx) => {
                      const Icon = IconMap[feature.iconName] || Shield;
                      return (
                        <div key={idx} className="bg-cream p-8 rounded-3xl border border-orange-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-800 mb-6 shadow-sm group-hover:bg-teal-900 group-hover:text-gold transition-colors">
                                <Icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-teal-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                      );
                    })}
                </div>
            </div>
        </section>

        {/* Plans Section */}
        <section id="plans" className="py-24 px-6 md:px-12 bg-teal-900 text-cream bg-kitenge-pattern">
             <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Simple, Fair Pricing</h2>
                    <p className="text-teal-100 text-lg">Safety is a right. We offer a powerful free plan and affordable upgrades for advanced protection.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PLANS.map((plan, idx) => (
                    <div key={idx} className={`relative bg-cream rounded-3xl p-6 flex flex-col text-gray-800 ${plan.recommended ? 'transform md:-translate-y-4 shadow-2xl border-4 border-gold' : 'border border-transparent'}`}>
                       {plan.recommended && (
                         <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold text-teal-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                           Most Popular
                         </div>
                       )}
                       <h3 className="text-xl font-bold text-teal-900 mb-2">{plan.name}</h3>
                       <div className="mb-4">
                         <span className="text-3xl font-bold">{plan.price}</span>
                         {plan.period && <span className="text-sm text-gray-500 block">{plan.period}</span>}
                       </div>
                       <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
                       <ul className="space-y-3 mb-8 flex-1">
                         {plan.features.map((feat, i) => (
                           <li key={i} className="flex items-start gap-2 text-sm">
                             <Check size={16} className="text-terracotta shrink-0 mt-0.5" />
                             <span>{feat}</span>
                           </li>
                         ))}
                       </ul>
                       <Link to="/auth" className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${plan.recommended ? 'bg-teal-900 text-white hover:bg-teal-800' : 'bg-teal-100 text-teal-900 hover:bg-teal-200'}`}>
                         {plan.cta}
                       </Link>
                    </div>
                  ))}
                </div>
             </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 px-6 md:px-12 bg-white">
           <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-12 text-center">Trusted by Sisters Across Africa</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="bg-cream p-8 rounded-3xl relative">
                     <div className="text-gold text-6xl font-serif absolute top-4 left-6 opacity-30">"</div>
                     <p className="text-gray-700 text-lg leading-relaxed relative z-10 mb-6 italic">
                       {t.text}
                     </p>
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center text-white font-bold text-lg">
                         {t.author.charAt(0)}
                       </div>
                       <div>
                         <div className="font-bold text-teal-900">{t.author}</div>
                         <div className="text-sm text-gray-500">{t.role}</div>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-teal-950 text-cream py-12 px-6 border-t border-teal-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <div className="flex items-center space-x-2">
                        <Logo className="w-8 h-8" />
                        <span className="font-serif font-bold text-xl">DigiSafe+</span>
                    </div>
                    <p className="text-sm text-teal-400">System D • Protecting African Women & Girls</p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
                    <Link to="/about" className="hover:text-gold transition-colors">About Us</Link>
                    <Link to="/plans" className="hover:text-gold transition-colors">Plans</Link>
                    <Link to="/support" className="hover:text-gold transition-colors">Support Center</Link>
                    <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                </div>
                <div className="text-sm opacity-50">
                    &copy; 2024 System D. All rights reserved.
                </div>
            </div>
        </footer>
    </div>
  );
};

export default Landing;