import { lazy, Suspense } from 'react';
import { Box, Spinner, Center } from '@chakra-ui/react';
import Layout from './components/common/Layout';
import SEO from './components/SEO';
import ColorPaletteSelector from './components/ColorPaletteSelector';
import usePerformanceMonitor from './hooks/usePerformanceMonitor';
import useScrollToSection from './hooks/useScrollToSection';

// Lazy load sections for better performance
const Hero = lazy(() => import('./components/sections/Hero'));
const ProfessionalProjects = lazy(() => import('./components/sections/ProfessionalProjects'));
const About = lazy(() => import('./components/sections/About'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const EducationalProjects = lazy(() => import('./components/sections/EducationalProjects'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Loading component
const LoadingSection = () => (
  <Center py={20}>
    <Spinner 
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.primary"
      size="xl"
    />
  </Center>
);

function App() {
  // Monitor performance in production
  usePerformanceMonitor();
  
  // Handle scrolling to sections when navigating from other pages
  useScrollToSection();

  return (
    <>
      <SEO />
      <Layout>
        <Suspense fallback={<LoadingSection />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <ProfessionalProjects />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <EducationalProjects />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <Contact />
        </Suspense>
      </Layout>
      <ColorPaletteSelector />
    </>
  );
}

export default App;