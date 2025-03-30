"use client";
import { ClerkProvider} from '@clerk/nextjs';
import Hero from '@/components/ui/Hero';
import AnimatedFeaturesSection from '@/components/Features';  
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
        <ClerkProvider>
            <Hero/>
            <AnimatedFeaturesSection/>
            <Footer />
        </ClerkProvider>
    </>
  );
};

export default HomePage;