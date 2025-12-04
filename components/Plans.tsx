import React from 'react';
import { PLANS } from '../constants';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Plans = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-teal-900 mb-4">Choose Your Protection</h1>
        <p className="text-gray-600 text-lg">
          Safety is a right, not a luxury. Whether you need basic coverage or comprehensive monitoring for your whole family, we have a plan for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan, i) => (
          <div 
            key={i} 
            className={`relative rounded-3xl p-6 flex flex-col ${plan.recommended ? 'bg-teal-900 text-white shadow-2xl scale-105 border-2 border-gold z-10' : 'bg-white text-gray-800 shadow-sm border border-orange-100'}`}
          >
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold text-teal-900 px-4 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                Most Popular
              </div>
            )}
            
            <h3 className={`text-xl font-bold font-serif mb-2 ${plan.recommended ? 'text-gold' : 'text-teal-900'}`}>
              {plan.name}
            </h3>
            <div className="mb-4">
               <span className="text-3xl font-bold">{plan.price}</span>
               {plan.period && <span className={`text-sm block ${plan.recommended ? 'text-teal-200' : 'text-gray-500'}`}>{plan.period}</span>}
            </div>
            
            <p className={`text-sm mb-6 ${plan.recommended ? 'text-gray-300' : 'text-gray-500'}`}>
              {plan.description}
            </p>

            <ul className="flex-1 space-y-3 mb-8">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <Check size={18} className={`shrink-0 ${plan.recommended ? 'text-gold' : 'text-teal-600'}`} />
                  <span className="text-sm font-medium leading-tight">{feat}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/auth"
              className={`w-full py-3 rounded-xl font-bold text-center transition-transform active:scale-95 ${
                plan.recommended 
                  ? 'bg-gold hover:bg-orange-400 text-teal-900' 
                  : 'bg-teal-100 hover:bg-teal-200 text-teal-900'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 rounded-3xl p-8 text-center space-y-4 border border-orange-100">
        <h3 className="text-xl font-bold text-teal-900">Are you a school or NGO?</h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          We offer subsidized bulk licenses for educational institutions. 
          Deploy System D to protect your entire student body with a unified dashboard.
        </p>
        <button className="text-terracotta font-bold underline hover:text-terracotta-600">Contact Enterprise Sales</button>
      </div>
    </div>
  );
};

export default Plans;