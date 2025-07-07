import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  HStack,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaGithub,
      url: 'https://github.com/DerrazSofiane',
      label: 'GitHub',
    },
    {
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/sofiane-derraz',
      label: 'LinkedIn',
    },
    {
      icon: FaEnvelope,
      url: 'mailto:contact@sofianederraz.com',
      label: 'Email',
    },
  ];

  return (
    <Box as="footer" bg="brand.backgroundDark" mt={20}>
      <Container maxW="container.xl" py={10}>
        <Stack spacing={8}>
          <HStack justify="center" spacing={6}>
            {socialLinks.map((link) => (
              <IconButton
                key={link.label}
                as={Link}
                href={link.url}
                isExternal
                aria-label={link.label}
                icon={<link.icon />}
                variant="ghost"
                color="brand.secondary"
                _hover={{ color: 'brand.primary' }}
                fontSize="xl"
              />
            ))}
          </HStack>
          
          <Divider borderColor="brand.secondary" opacity={0.2} />
          
          <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
            <Text color="brand.secondary" fontSize="sm">
              © {currentYear} Sofiane Derraz. Tous droits réservés.
            </Text>
            <Text color="brand.secondary" fontSize="sm">
              Conçu avec React & Chakra UI
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;