import React from 'react';
import { UserPlus, Home, MessageCircle, Check } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus size={32} className="text-green-600" />,
    title: "Sign Up",
    description: "Create your profile with preferences and lifestyle details."
  },
  {
    icon: <Home size={32} className="text-green-600" />,
    title: "Find/List a Room",
    description: "Search for available rooms or list your space for potential roommates."
  },
  {
    icon: <MessageCircle size={32} className="text-green-600" />,
    title: "Connect",
    description: "Chat with potential roommates or landlords through our secure messaging system."
  },
  {
    icon: <Check size={32} className="text-green-600" />,
    title: "Move In",
    description: "Finalize details, sign agreements, and start your new living arrangement."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How RoomFinder Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Finding the perfect room or roommate is easy with our streamlined process.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow h-full flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {/* Connector Line for Large Screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-0.5 bg-green-100">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
