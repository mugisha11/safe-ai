import React from 'react';
import { Mail, MessageCircle, Phone, LifeBuoy, ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
  <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <summary className="flex justify-between items-center p-6 cursor-pointer list-none hover:bg-gray-50 transition-colors">
      <span className="font-bold text-teal-900">{question}</span>
      <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" />
    </summary>
    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
      {answer}
    </div>
  </details>
);

const Support = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-teal-900">How can we help you?</h1>
        <p className="text-gray-600">We are here to support you 24/7. Your safety is our priority.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-terracotta transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-800 mx-auto mb-4 group-hover:bg-teal-900 group-hover:text-white transition-colors">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
          <p className="text-sm text-gray-500 mb-4">For general inquiries and account help.</p>
          <span className="text-terracotta font-bold text-sm">help@digisafe.africa</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-terracotta transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-terracotta mx-auto mb-4 group-hover:bg-terracotta group-hover:text-white transition-colors">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-500 mb-4">Chat with a safety advisor instantly.</p>
          <span className="text-terracotta font-bold text-sm">Start Chat</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-terracotta transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <LifeBuoy size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Crisis Hotline</h3>
          <p className="text-sm text-gray-500 mb-4">Urgent help for immediate threats.</p>
          <span className="text-red-600 font-bold text-sm">0800-SAFE-KEY</span>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-teal-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FAQItem 
            question="Is my data really private?"
            answer="Yes. DigiSafe+ uses local-first technology. We store your evidence encrypted on your device. We only access data you explicitly share for analysis."
          />
          <FAQItem 
            question="Can I use DigiSafe+ on multiple devices?"
            answer="The Free plan covers one primary device. The Premium plan allows you to sync your safety dashboard across unlimited devices."
          />
          <FAQItem 
            question="How does the Face Watcher work?"
            answer="We convert your photo into a mathematical hash locally. We then scan public platforms for this hash. We never store your actual photo on our servers."
          />
          <FAQItem 
            question="I forgot my Safe Folder PIN. Can you reset it?"
            answer="For your security, we do not store your PIN. If you lose it, the contents of the Safe Folder cannot be recovered. We recommend backing up critical evidence."
          />
        </div>
      </div>
    </div>
  );
};

export default Support;