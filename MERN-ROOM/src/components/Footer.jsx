import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-gray-300 pt-12 font-sans">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">RoomMate Connect</h3>
            <p className="text-gray-400">
              Connecting people with the perfect rooms and roommates across the country.
            </p>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Find a Room', 'List a Room', 'How It Works', 'Testimonials'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {['FAQs', 'Blog', 'Terms & Conditions', 'Privacy Policy', 'Contact Us'].map((resource) => (
                <li key={resource}>
                  <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <div className="text-gray-400 space-y-2">
              <p>123 Apartment St.</p>
              <p>Suite 456</p>
              <p>San Francisco, CA 94107</p>
              <p className="mt-4">
                <a href="tel:+1234567890" className="hover:text-teal-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </p>
              <p>
                <a href="mailto:info@roommateconnect.com" className="hover:text-teal-400 transition-colors">
                  info@roommateconnect.com
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Social Media Row */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex justify-center space-x-6">
            {[
              { icon: <Facebook size={20} />, name: 'Facebook' },
              { icon: <Twitter size={20} />, name: 'Twitter' },
              { icon: <Instagram size={20} />, name: 'Instagram' },
              { icon: <Linkedin size={20} />, name: 'LinkedIn' }
            ].map((social) => (
              <a 
                key={social.name}
                href="#" 
                aria-label={social.name}
                className="text-gray-400 hover:text-teal-400 hover:scale-110 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 RoomMate Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}