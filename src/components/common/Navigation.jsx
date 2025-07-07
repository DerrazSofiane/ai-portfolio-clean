import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Container,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Button,
  Icon,
  Image,
} from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'Professional', to: 'professional-projects' },
    { name: 'About', to: 'about' },
    { name: 'Testimonials', to: 'testimonials' },
    { name: 'Education', to: 'educational-projects' },
    { name: 'Contact', to: 'contact' },
  ];

  const handleNavClick = (item, onClick) => {
    if (isHomePage) {
      // If we're on the home page, just scroll
      if (onClick) onClick();
    } else {
      // If we're on another page, navigate to home then scroll
      navigate(`/#${item.to}`);
      if (onClick) onClick();
    }
  };

  const NavLink = ({ item, onClick }) => {
    if (isHomePage) {
      // On home page, use scroll link
      return (
        <ScrollLink
          to={item.to}
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          onClick={onClick}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            color: 'var(--color-accent)',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          activeClass="active-nav-link"
        >
          {item.name}
        </ScrollLink>
      );
    } else {
      // On other pages, use regular link with navigation
      return (
        <Link
          px={4}
          py={2}
          rounded="md"
          color="var(--color-accent)"
          _hover={{
            color: 'var(--color-primary)',
            bg: 'rgba(34, 211, 238, 0.1)',
          }}
          transition="all 0.3s"
          cursor="pointer"
          onClick={() => handleNavClick(item, onClick)}
        >
          {item.name}
        </Link>
      );
    }
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      w="full"
      zIndex={1000}
      className={scrolled ? 'glass' : ''}
      bg={scrolled ? 'rgba(15, 23, 42, 0.8)' : 'var(--color-background)'}
      transition="all 0.3s"
    >
      <Container maxW="container.xl">
        <Flex h={20} alignItems="center" justifyContent="space-between">
          <Box
            cursor="pointer"
            onClick={() => navigate('/')}
            display="flex"
            alignItems="center"
          >
            <Image 
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Sofiane Derraz" 
              height="40px"
              width="auto"
              objectFit="contain"
            />
          </Box>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <NavLink key={item.to} item={item} />
            ))}
            <Button variant="primary" size="md">
              Télécharger CV
            </Button>
          </HStack>

          {/* Mobile Navigation */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            aria-label="Open menu"
            icon={
              <Box as="span" w={5} h={5}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </Box>
            }
            color="var(--color-primary)"
          />
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="var(--color-background-light)">
          <DrawerCloseButton color="var(--color-primary)" />
          <DrawerHeader color="var(--color-primary)">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <NavLink key={item.to} item={item} onClick={onClose} />
              ))}
              <Button variant="primary" size="md" w="full">
                Télécharger CV
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navigation;