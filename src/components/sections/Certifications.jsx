import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Link,
  Image,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';
import { certifications } from '../../data/certifications';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const CertificationCard = ({ cert, index }) => {
  const [ref, isInView] = useScrollAnimation();
  
  return (
    <Box
      ref={ref}
      className={`glass glass-hover hover-lift ${isInView ? 'scroll-animate in-view' : 'scroll-animate'}`}
      p={6}
      borderRadius="xl"
      transition="all 0.3s"
      style={{ transitionDelay: `${index * 100}ms` }}
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={4} align="center">
        {/* Badge Image */}
        {cert.imageUrl ? (
          <Image
            src={cert.imageUrl}
            alt={cert.name}
            boxSize="120px"
            objectFit="contain"
            fallback={
              <Box
                boxSize="120px"
                bg="var(--color-backgroundLight)"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaCertificate} boxSize="60px" color="var(--color-primary)" />
              </Box>
            }
          />
        ) : (
          <Box
            boxSize="120px"
            bg="var(--color-backgroundLight)"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaCertificate} boxSize="60px" color="var(--color-primary)" />
          </Box>
        )}

        {/* Certification Info */}
        <VStack spacing={2} align="center" textAlign="center">
          <Heading size="md" color="var(--color-accent)">
            {cert.name}
          </Heading>
          <Text color="var(--color-primary)" fontWeight="bold">
            {cert.issuer}
          </Text>
        </VStack>

        {/* Skills */}
        {cert.skills && cert.skills.length > 0 && (
          <HStack spacing={2} flexWrap="wrap" justify="center">
            {cert.skills.map((skill, idx) => (
              <Badge
                key={idx}
                colorScheme="cyan"
                variant="subtle"
                fontSize="xs"
                px={2}
                py={1}
              >
                {skill}
              </Badge>
            ))}
          </HStack>
        )}

        {/* Description */}
        {cert.description && (
          <Text
            color="var(--color-textSecondary)"
            fontSize="sm"
            textAlign="center"
            noOfLines={3}
          >
            {cert.description}
          </Text>
        )}

        {/* View Badge Link */}
        {cert.credlyBadgeUrl && (
          <Link
            href={cert.credlyBadgeUrl}
            isExternal
            color="var(--color-primary)"
            fontSize="sm"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap={1}
            _hover={{
              color: 'var(--color-primaryDark)',
              textDecoration: 'none',
              transform: 'translateX(2px)',
            }}
            transition="all 0.2s"
          >
            View on Credly
            <Icon as={FaExternalLinkAlt} boxSize={3} />
          </Link>
        )}

        {/* Credential ID */}
        {cert.credentialId && (
          <Tooltip label="Credential ID" placement="top">
            <Text fontSize="xs" color="var(--color-textSecondary)" opacity={0.7}>
              ID: {cert.credentialId}
            </Text>
          </Tooltip>
        )}
      </VStack>
    </Box>
  );
};

const Certifications = () => {
  const [titleRef, isTitleInView] = useScrollAnimation();

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <Box id="certifications" py={20} bg="var(--color-background-dark)">
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          {/* Section Header */}
          <VStack
            ref={titleRef}
            spacing={4}
            textAlign="center"
            className={isTitleInView ? 'animate-fade-in' : ''}
          >
            <Heading size="2xl" color="var(--color-accent)">
              Certifications
            </Heading>
            <Text color="var(--color-secondary)" fontSize="lg" maxW="3xl" mx="auto">
              Professional certifications demonstrating expertise in cloud computing, 
              AI/ML, and modern data technologies.
            </Text>
          </VStack>

          {/* Certifications Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} />
            ))}
          </SimpleGrid>

          {/* Call to Action */}
          {certifications.some(cert => cert.credlyBadgeUrl) && (
            <Box textAlign="center" mt={8}>
              <Link
                href="https://www.credly.com/users/sofiane-derraz/badges"
                isExternal
                color="var(--color-primary)"
                fontSize="lg"
                fontWeight="bold"
                display="inline-flex"
                alignItems="center"
                gap={2}
                _hover={{
                  color: 'var(--color-primaryDark)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s"
              >
                View All Badges on Credly
                <Icon as={FaExternalLinkAlt} />
              </Link>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Certifications;