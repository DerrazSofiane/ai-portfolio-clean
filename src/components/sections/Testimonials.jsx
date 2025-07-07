import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Icon,
  IconButton,
  useBreakpointValue,
  Flex,
  Circle,
  Button,
} from '@chakra-ui/react';
import { FaQuoteLeft, FaLinkedin, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { testimonials } from '../../data/testimonials';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const TestimonialCard = ({ testimonial, isActive }) => {
  const [ref, isInView] = useScrollAnimation();
  
  return (
    <Box
      ref={ref}
      className={`glass ${isInView ? 'animate-fade-in' : ''}`}
      p={8}
      borderRadius="xl"
      position="relative"
      width="100%"
      opacity={isActive ? 1 : 0.7}
      transform={`scale(${isActive ? 1 : 0.95})`}
      transition="all 0.3s"
      _hover={{
        transform: `scale(${isActive ? 1.02 : 0.97})`,
      }}
    >
      {/* Quote Icon */}
      <Icon
        as={FaQuoteLeft}
        w={10}
        h={10}
        color="var(--color-primary)"
        opacity={0.2}
        position="absolute"
        top={4}
        left={4}
      />
      
      {/* Platform Badge */}
      {testimonial.platform && (
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme={testimonial.platform === 'LinkedIn' ? 'blue' : 'purple'}
          variant="subtle"
          display="flex"
          alignItems="center"
          gap={1}
        >
          {testimonial.platform === 'LinkedIn' && <Icon as={FaLinkedin} boxSize={3} />}
          {testimonial.platform}
        </Badge>
      )}
      
      {/* Content */}
      <VStack align="start" spacing={6} pt={8}>
        {/* Testimonial Text */}
        <Text
          color="var(--color-text)"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight="tall"
          fontStyle="italic"
        >
          "{testimonial.content}"
        </Text>
        
        {/* Highlights */}
        {testimonial.highlights && (
          <HStack spacing={2} flexWrap="wrap">
            {testimonial.highlights.map((highlight, idx) => (
              <Badge
                key={idx}
                colorScheme="cyan"
                variant="subtle"
                fontSize="xs"
              >
                {highlight}
              </Badge>
            ))}
          </HStack>
        )}
        
        {/* Author Info */}
        <HStack spacing={4} width="full" justify="space-between">
          <HStack spacing={3}>
            <Avatar
              name={testimonial.name}
              src={testimonial.image}
              size="md"
              border="2px solid"
              borderColor="var(--color-primary)"
            />
            <VStack align="start" spacing={0}>
              <HStack>
                <Text fontWeight="bold" color="var(--color-accent)">
                  {testimonial.name}
                </Text>
                {testimonial.linkedinUrl && (
                  <Icon
                    as={FaLinkedin}
                    color="var(--color-primary)"
                    cursor="pointer"
                    _hover={{ transform: 'scale(1.1)' }}
                  />
                )}
              </HStack>
              <Text fontSize="sm" color="var(--color-secondary)">
                {testimonial.role}
                {testimonial.company && ` at ${testimonial.company}`}
              </Text>
            </VStack>
          </HStack>
          
          {/* Stars */}
          <HStack spacing={0}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                as={FaStar}
                color="var(--color-primary)"
                boxSize={4}
              />
            ))}
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerRef, isHeaderInView] = useScrollAnimation();
  
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const maxIndex = Math.max(0, testimonials.length - slidesToShow);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };
  
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + slidesToShow
  );
  
  return (
    <Box
      as="section"
      id="testimonials"
      py={20}
      bg="var(--color-background-light)"
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="80%"
        height="80%"
        bg="var(--color-primary)"
        opacity={0.02}
        borderRadius="full"
        filter="blur(100px)"
        pointerEvents="none"
      />
      
      <Container maxW="container.xl" position="relative">
        <VStack spacing={12}>
          {/* Section Header */}
          <VStack
            ref={headerRef}
            spacing={4}
            textAlign="center"
            className={`${isHeaderInView ? 'animate-fade-in' : ''}`}
          >
            <Badge colorScheme="green" fontSize="md" px={4} py={1}>
              What Clients Say
            </Badge>
            <Heading
              as="h2"
              size="2xl"
              color="var(--color-accent)"
              className="gradient-text"
            >
              Testimonials & Reviews
            </Heading>
            <Text color="var(--color-secondary)" fontSize="lg" maxW="2xl">
              Feedback from colleagues, clients, and partners who have experienced 
              the value I bring to AI and data science projects.
            </Text>
          </VStack>
          
          {/* Testimonials Carousel */}
          <Box position="relative" width="full">
            <HStack spacing={6} align="stretch">
              {/* Previous Button */}
              <IconButton
                icon={<FaChevronLeft />}
                onClick={prevTestimonial}
                position="absolute"
                left={{ base: -4, md: -12 }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                variant="solid"
                colorScheme="cyan"
                borderRadius="full"
                size="lg"
                aria-label="Previous testimonial"
                isDisabled={currentIndex === 0}
                display={{ base: 'none', md: 'flex' }}
              />
              
              {/* Testimonials */}
              <Flex
                gap={6}
                width="full"
                transition="all 0.5s"
                align="stretch"
              >
                {visibleTestimonials.map((testimonial, idx) => (
                  <Box
                    key={testimonial.id}
                    flex={{ base: '0 0 100%', md: '0 0 50%', lg: '0 0 33.333%' }}
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      isActive={idx === Math.floor(slidesToShow / 2)}
                    />
                  </Box>
                ))}
              </Flex>
              
              {/* Next Button */}
              <IconButton
                icon={<FaChevronRight />}
                onClick={nextTestimonial}
                position="absolute"
                right={{ base: -4, md: -12 }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                variant="solid"
                colorScheme="cyan"
                borderRadius="full"
                size="lg"
                aria-label="Next testimonial"
                isDisabled={currentIndex === maxIndex}
                display={{ base: 'none', md: 'flex' }}
              />
            </HStack>
            
            {/* Mobile Navigation Buttons */}
            <HStack
              justify="center"
              spacing={4}
              mt={6}
              display={{ base: 'flex', md: 'none' }}
            >
              <IconButton
                icon={<FaChevronLeft />}
                onClick={prevTestimonial}
                variant="solid"
                colorScheme="cyan"
                size="sm"
                borderRadius="full"
                aria-label="Previous testimonial"
                isDisabled={currentIndex === 0}
              />
              <IconButton
                icon={<FaChevronRight />}
                onClick={nextTestimonial}
                variant="solid"
                colorScheme="cyan"
                size="sm"
                borderRadius="full"
                aria-label="Next testimonial"
                isDisabled={currentIndex === maxIndex}
              />
            </HStack>
            
            {/* Dots Indicator */}
            <HStack justify="center" spacing={2} mt={8}>
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <Circle
                  key={idx}
                  size={2}
                  bg={idx === currentIndex ? 'var(--color-primary)' : 'var(--color-secondary)'}
                  cursor="pointer"
                  onClick={() => setCurrentIndex(idx)}
                  transition="all 0.3s"
                  _hover={{
                    transform: 'scale(1.2)',
                  }}
                />
              ))}
            </HStack>
          </Box>
          
          {/* Call to Action */}
          <Box
            textAlign="center"
            p={8}
            bg="var(--color-glassBg)"
            borderRadius="xl"
            className="glass"
          >
            <VStack spacing={4}>
              <Text color="var(--color-text)" fontSize="xl" fontWeight="bold">
                Want to work together?
              </Text>
              <Text color="var(--color-textSecondary)" maxW="md">
                Let's discuss how I can help transform your data into actionable insights
              </Text>
              <Button
                as="a"
                href="#contact"
                size="lg"
                colorScheme="cyan"
                variant="solid"
                mt={2}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Start a Conversation
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Testimonials;