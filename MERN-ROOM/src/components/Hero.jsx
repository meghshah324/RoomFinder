import React, { useEffect } from 'react';

const Hero = () => {
  // Animation effect for staggered entrance
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-on-scroll opacity-0 transition-all duration-700 delay-100 transform translate-y-8" 
                style={{ animationDelay: '0.1s' }}>
              Find Your Perfect <span className="text-green-600 relative inline-block animate-pulse">Room</span> and <span className="text-green-600 relative inline-block animate-pulse">Roommate</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-lg leading-relaxed animate-on-scroll opacity-0 transition-all duration-700 delay-300 transform translate-y-8" 
               style={{ animationDelay: '0.3s' }}>
              Connect with compatible roommates and discover ideal living spaces that match your lifestyle and budget.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-on-scroll opacity-0 transition-all duration-700 delay-500 transform translate-y-8" 
                 style={{ animationDelay: '0.5s' }}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transform hover:scale-105 hover:-translate-y-1">
                Find a Room
              </button>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transform hover:scale-105 hover:-translate-y-1">
                List a Room
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex items-center gap-4 animate-on-scroll opacity-0 transition-all duration-700 delay-700 transform translate-y-8" 
                 style={{ animationDelay: '0.7s' }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <img 
                    key={item}
                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}0.jpg`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white transform transition-all duration-300 hover:scale-110 hover:z-10"
                    style={{ animationDelay: `${item * 0.1}s` }}
                  />
                ))}
              </div>
              <div className="text-gray-600">
                <p className="font-medium">10,000+ happy users</p>
                <p className="text-sm">Trusted by students and professionals</p>
              </div>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center animate-on-scroll opacity-0 transition-all duration-1000 delay-300 transform translate-x-8" 
               style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-4 -left-4 w-full h-full bg-green-600 rounded-xl transform transition-all duration-700 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJvb21tYXRlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                alt="Happy roommates in their shared apartment" 
                className="relative z-10 rounded-xl shadow-xl object-cover w-full aspect-video transform transition-all duration-500 hover:scale-105"
              />
              
              {/* Floating card element */}
              <div className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-lg shadow-lg border border-gray-100 max-w-xs transform transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-2xl animate-on-scroll opacity-0 transition-all duration-1000 delay-1000" 
                   style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Perfect matches</p>
                    <p className="text-sm text-gray-600">Based on your preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
        }
        
        .animate-on-scroll.appear {
          opacity: 1;
          transform: translate(0, 0);
        }
      `}</style>
    </section>
  );
};

export default Hero;