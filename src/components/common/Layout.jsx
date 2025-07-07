import { Box } from '@chakra-ui/react';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" bg="var(--color-background)" color="var(--color-text)">
      <Navigation />
      <Box as="main" pt="80px">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;