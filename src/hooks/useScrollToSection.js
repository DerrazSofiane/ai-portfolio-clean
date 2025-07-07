import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

const useScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const section = location.hash.replace('#', '');
      
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        scroller.scrollTo(section, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -80, // Adjust for fixed navbar height
        });
      }, 100);
    }
  }, [location]);
};

export default useScrollToSection;