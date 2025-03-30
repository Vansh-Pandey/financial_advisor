import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-2">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-500 text-sm">
            © 2025 BudgetBot. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-blue-600 text-sm">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-blue-600 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;