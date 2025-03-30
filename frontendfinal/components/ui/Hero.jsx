import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      {/* Background SVG pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            {/* Block nodes */}
            {[...Array(15)].map((_, i) => (
              <rect
                key={`rect-${i}`}
                x={(i % 5) * 160 + 10}
                y={Math.floor(i / 5) * 180 + 30}
                width="120"
                height="60"
                rx="10"
                fill="#4f46e5"
                opacity="0.6"
              />
            ))}
            
            {/* Connection lines */}
            {[...Array(12)].map((_, i) => (
              <path
                key={`path-${i}`}
                d={`M${(i % 4) * 160 + 70},${Math.floor(i / 4) * 180 + 90} L${(i % 4 + 1) * 160 + 70},${Math.floor(i / 4) * 180 + 90}`}
                stroke="#a5b4fc"
                strokeWidth="2"
              />
            ))}
            {[...Array(9)].map((_, i) => (
              <path
                key={`vpath-${i}`}
                d={`M${(i % 3 + 1) * 160 + 70},${Math.floor(i / 3) * 180 + 90} L${(i % 3 + 1) * 160 + 70},${(Math.floor(i / 3) + 1) * 180 + 90}`}
                stroke="#a5b4fc"
                strokeWidth="2"
              />
            ))}
          </g>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-32 sm:py-36 lg:py-40">
          <div className="text-center">
            {/* Logo/Badge */}
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full p-3 bg-indigo-500 bg-opacity-10 text-white ring-1 ring-indigo-500 ring-opacity-30">
                <svg className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 16L16 12L12 12L12 8L16 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Main headline */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Meet Budget Bot: Your Smart Finance Assistant
            </h1>
            
            {/* Subheading */}
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                Effortlessly track, manage, and optimize your spending with a friendly, AI-powered companion
            </p>
            
            {/* Call to action buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/chatbot" className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Get Started
              </Link>
              <Link href="https://pathway.com/developers/user-guide/introduction/welcome/" className="rounded-md bg-transparent px-5 py-3 text-base font-semibold text-gray-100 ring-1 ring-white ring-opacity-25 hover:bg-white hover:text-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40">
                Learn More
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 sm:mt-24">
              <p className="text-sm text-gray-400 mb-4">Trusted by industry leaders</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-70">
                {/* Placeholder company logos */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-32 bg-gray-700 rounded opacity-50"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;