import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 sm:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xl font-bold text-white">CodeFlow</span>
            </div>
            <p className="text-sm leading-relaxed">
              Accelerating your development workflow with powerful tools and integrations.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social icons here */}
            </div>
          </div>

          {/* Product */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/features" className="text-sm hover:text-white transition-colors block">Features</a></li>
              <li><a href="/pricing" className="text-sm hover:text-white transition-colors block">Pricing</a></li>
              <li><a href="/integrations" className="text-sm hover:text-white transition-colors block">Integrations</a></li>
              <li><a href="/changelog" className="text-sm hover:text-white transition-colors block">Changelog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/docs" className="text-sm hover:text-white transition-colors block">Documentation</a></li>
              <li><a href="/tutorials" className="text-sm hover:text-white transition-colors block">Tutorials</a></li>
              <li><a href="/blog" className="text-sm hover:text-white transition-colors block">Blog</a></li>
              <li><a href="/community" className="text-sm hover:text-white transition-colors block">Community</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/privacy" className="text-sm hover:text-white transition-colors block">Privacy</a></li>
              <li><a href="/terms" className="text-sm hover:text-white transition-colors block">Terms</a></li>
              <li><a href="/security" className="text-sm hover:text-white transition-colors block">Security</a></li>
              <li><a href="/contact" className="text-sm hover:text-white transition-colors block">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-xs">&copy; {new Date().getFullYear()} CodeFlow. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
            <a href="/privacy-policy" className="text-xs hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-xs hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookie-policy" className="text-xs hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
