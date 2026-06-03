import { Link } from 'react-router-dom';
import { FiFacebook, FiMail, FiMapPin } from 'react-icons/fi';
import logo from '../assets/school.png';


const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-950 via-blue-800 to-blue-950 dark:from-gray-900/70 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Dr. Kabiru Gwarzo Academy Logo" className="w-12 h-12" />
              <h3 className="text-xl font-bold">Dr. Kabiru Gwarzo Academy</h3>
            </div>
            <p className="text-gray-300 mb-4">
              & Tahfeez - Committed to excellence in education and Islamic values.
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <FiMapPin size={16} />
              <span className="text-sm">No.296 Layin Road Safety, Maikalwa Naibawa<br />Zaria Road, Kumbotso LGA, Kano-Nigeria</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">About Us</Link>
              <Link to="/apply" className="block text-gray-300 hover:text-white transition-colors">Apply Now</Link>
              <Link to="/gallery" className="block text-gray-300 hover:text-white transition-colors">Gallery</Link>
              <Link to="/results" className="block text-gray-300 hover:text-white transition-colors">Results</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiMail size={20} />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Follow us for updates and school events
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Dr. Kabiru Gwarzo Academy & Tahfeez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
