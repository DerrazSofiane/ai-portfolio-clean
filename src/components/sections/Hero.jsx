import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Transforming Data into Business Intelligence";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      id="hero"
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      bg="var(--color-background)"
    >
      {/* Background Animation */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        className="gradient-mesh"
        opacity={0.3}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} align="flex-start" maxW="3xl">
          <Heading
            as="h1"
            size="4xl"
            fontWeight="bold"
            color="var(--color-accent)"
            className="animate-fadeInUp"
          >
            Sofiane Derraz
          </Heading>
          
          <Heading
            as="h2"
            size="2xl"
            color="var(--color-primary)"
            className="animate-fadeInUp animate-delay-200"
          >
            AI Engineer & Data Scientist
          </Heading>
          
          <Text
            fontSize="xl"
            color="var(--color-secondary)"
            className="animate-fadeInUp animate-delay-400"
          >
            {text}
            <Box as="span" className="pulse-animation">|</Box>
          </Text>
          
          <HStack spacing={4} flexWrap="wrap" className="animate-fadeInUp animate-delay-600">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<HiArrowDown />}
              onClick={() => document.getElementById('professional-projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="button-hover hover-lift"
            >
              View Client Work
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<FaDownload />}
              as="a"
              href="/AI_resume_sofiane_derraz.pdf"
              download
              className="button-hover hover-lift"
            >
              Download Resume
            </Button>
          </HStack>
          
          <HStack spacing={4} mt={4} className="animate-fadeIn animate-delay-800">
            <IconButton
              as="a"
              href="https://github.com/DerrazSofiane"
              target="_blank"
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="glass"
              size="lg"
              className="hover-scale"
            />
            <IconButton
              as="a"
              href="https://linkedin.com/in/sofiane-derraz"
              target="_blank"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="glass"
              size="lg"
              className="hover-scale"
            />
          </HStack>
        </VStack>
      </Container>
      
      {/* Scroll Indicator */}
      <Box
        position="absolute"
        bottom={10}
        left="50%"
        transform="translateX(-50%)"
        className="float-animation"
      >
        <Icon as={HiArrowDown} w={6} h={6} color="var(--color-primary)" />
      </Box>
    </Box>
  );
};

export default Hero;