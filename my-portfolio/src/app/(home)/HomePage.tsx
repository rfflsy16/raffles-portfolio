


import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectSection from "./ProjectSection";
import EducationSection from "./Education";
import CertificationSection from "./Certification";
import ContactSection from "./ContactSection";

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