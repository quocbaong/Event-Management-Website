import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import DashboardMockupSection from '../components/landing/DashboardMockupSection';
import StatisticsSection from '../components/landing/StatisticsSection';
import MarqueeLogos from '../components/landing/MarqueeLogos';
import FeatureStickyScroll from '../components/landing/FeatureStickyScroll';
import FeatureBlocksSection from '../components/landing/FeatureBlocksSection';
import ExperienceTypesSection from '../components/landing/ExperienceTypesSection';
import AppShowcaseSection from '../components/landing/AppShowcaseSection';
import SecuritySection from '../components/landing/SecuritySection';
import AwardsSection from '../components/landing/AwardsSection';
import CTASection from '../components/landing/CTASection';
import LandingFooter from '../components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="landing-page bg-white selection:bg-[#e4322a]/30">
      <LandingNavbar />
      <main>
        {/* Dark Hero Area */}
        <HeroSection />
        
        {/* Light Dashboard Showcase */}
        <DashboardMockupSection />
        
        {/* Statistics Bar - Peach background */}
        <StatisticsSection />
        
        {/* Partners Row */}
        <MarqueeLogos />
        
        {/* Core Features - Sticky Stacked Cards */}
        <FeatureStickyScroll />
        
        {/* Advanced Feature Blocks (Z-Pattern) */}
        <FeatureBlocksSection />
        
        {/* Experience Cards - Blue/Orange/Purple */}
        <ExperienceTypesSection />
        
        {/* Mobile App Showcases */}
        <AppShowcaseSection />
        
        {/* Security & Awards - Impactful Blue Sections */}
        <SecuritySection />
        <AwardsSection />
        
        {/* Final CTA & FAQ */}
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
