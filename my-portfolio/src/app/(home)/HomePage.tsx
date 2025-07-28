

import HeroSection from "./(sections)/HeroSection";
import AboutSection from "./(sections)/AboutSection";
import SkillsSection from "./(sections)/SkillsSection";
import ProjectSection from "./(sections)/ProjectSection";
import EducationSection from "./(sections)/Education";
import CertificationSection from "./(sections)/Certification";
import ContactSection from "./(sections)/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection/>
      <AboutSection/>
      <SkillsSection/>
      <ProjectSection/>
      <EducationSection/>
      <CertificationSection/>
      <ContactSection/>
    </div>
  );
}