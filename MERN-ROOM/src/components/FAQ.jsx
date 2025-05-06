import React, { useState } from 'react';

const faqItems = [
  {
    question: "How does the verification process work?",
    answer: "Our verification process includes ID verification, email and phone confirmation, and optional background checks. This helps ensure all users are legitimate and builds a trusted community."
  },
  {
    question: "What fees does RoomFinder charge?",
    answer: "Basic room searches and profile creation are free. We charge a small service fee only when you successfully find a match and decide to proceed. Premium features like enhanced visibility are available through subscription plans."
  },
  {
    question: "Can I list multiple properties?",
    answer: "Yes! You can list multiple rooms or properties under a single account. Each listing can have its own details, photos, and preferences for potential roommates."
  },
  {
    question: "How do I report an issue with a user or listing?",
    answer: "You can report concerns through the 'Report' button on any profile or listing. Our Trust & Safety team reviews all reports within 24 hours and takes appropriate action."
  },
  {
    question: "Is my personal information secure?",
    answer: "We take data security very seriously. Your personal information is encrypted and never shared with third parties without your consent. Payment information is processed through secure, PCI-compliant systems."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using RoomFinder.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center text-left font-medium py-4 hover:text-green-600 focus:outline-none"
              >
                <span>{item.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180 text-green-600' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="text-gray-600 pb-4">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="#"
            className="text-green-600 font-semibold hover:underline"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
