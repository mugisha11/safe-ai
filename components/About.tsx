import React from 'react';
import { Shield, Heart, Users } from 'lucide-react';
import { Logo } from '../constants';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Logo className="w-20 h-20" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-teal-900">
          Our Mission
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Building a safer digital world for African women and girls through privacy-first technology and community support.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-teal-900 mb-4 font-serif">Why DigiSafe+?</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Online violence against women is rising. From harassment to impersonation, the digital space can feel unsafe.
          </p>
          <p className="text-gray-600 leading-relaxed">
            System D (DigiSafe+) was created to be your digital bodyguard. We combine advanced AI monitoring with a warm, human-centered approach to safety, ensuring you can express yourself freely without fear.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-teal-900 text-cream p-6 rounded-2xl flex items-start space-x-4">
            <Shield className="shrink-0 text-gold" size={32} />
            <div>
              <h3 className="font-bold text-lg mb-1">Privacy First</h3>
              <p className="text-teal-100 text-sm">We believe safety shouldn't cost you your privacy. Our tools run locally whenever possible.</p>
            </div>
          </div>
          <div className="bg-terracotta text-white p-6 rounded-2xl flex items-start space-x-4">
            <Heart className="shrink-0 text-white" size={32} />
            <div>
              <h3 className="font-bold text-lg mb-1">Sisterly Support</h3>
              <p className="text-orange-100 text-sm">Our coaching isn't robotic. It's built with empathy, understanding the cultural context of our users.</p>
            </div>
          </div>
          <div className="bg-indigo-900 text-white p-6 rounded-2xl flex items-start space-x-4">
            <Users className="shrink-0 text-indigo-300" size={32} />
            <div>
              <h3 className="font-bold text-lg mb-1">Community Driven</h3>
              <p className="text-indigo-100 text-sm">Built in collaboration with women's safety groups across the continent.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gold/10 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-serif font-bold text-teal-900 mb-6">Join the Movement</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Whether you are an individual looking for protection, or an organization wanting to safeguard your members, DigiSafe+ is here for you.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-teal-900 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-800 transition-colors">
            Contact Us
          </button>
          <button className="bg-white text-teal-900 border border-teal-900 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition-colors">
            Read Success Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;