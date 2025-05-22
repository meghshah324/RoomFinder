import React from 'react';
import { MessageCircle, MapPin, Shield, Star } from 'lucide-react';

const benefits = [
  {
    icon: <MessageCircle size={24} className="text-green-600" />,
    title: "Real-Time Chat",
    description: "Communicate instantly with potential roommates or landlords to ask questions and arrange viewings."
  },
  {
    icon: <Shield size={24} className="text-green-600" />,
    title: "Verified Profiles",
    description: "Every user's identity is verified, creating a trusted community you can feel confident in."
  },
  {
    icon: <MapPin size={24} className="text-green-600" />,
    title: "Location-Based Search",
    description: "Find rooms near your work, school, or preferred neighborhoods with our smart location filters."
  },
  {
    icon: <Star size={24} className="text-green-600" />,
    title: "Review System",
    description: "Read and leave reviews to help others make informed decisions about potential living situations."
  }
];

const Benefits = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RoomFinder</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers unique features designed to make finding the perfect room or roommate simple and secure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-green-500 hover:shadow-md transition-all">
              <div className="bg-green-100 p-3 rounded-full inline-flex mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-green-600 font-medium">
            <span className="mr-2">⭐</span>
            Trusted by over 50,000 users worldwide
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
