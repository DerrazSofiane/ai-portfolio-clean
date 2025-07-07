import React from 'react';
import { getAssetPath } from '../../utils/assetPath';
import {
  Box,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Flex,
  Icon,
  AspectRatio,
  Avatar,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaBriefcase, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const ProjectCardEnhanced = ({ project, index, onOpen }) => {
  const [ref, isInView] = useScrollAnimation();
  const navigate = useNavigate();
  
  // Default thumbnail based on category if none provided
  const thumbnail = project.thumbnail || getAssetPath(`/images/projects/default-${project.category}.png`);
  
  return (
    <Box
      ref={ref}
      className={`glass glass-hover hover-lift ${isInView ? 'scroll-animate-scale in-view' : 'scroll-animate-scale'}`}
      borderRadius="xl"
      height="100%"
      display="flex"
      flexDirection="column"
      style={{ transitionDelay: `${index * 100}ms` }}
      position="relative"
      borderWidth={project.featured ? 2 : 1}
      borderColor={project.featured ? 'var(--color-primary)' : 'var(--color-glassBorder)'}
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Thumbnail with gradient overlay */}
      <AspectRatio ratio={16 / 9}>
        <Box 
          position="relative" 
          overflow="hidden"
          cursor="pointer"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <Image
            src={thumbnail}
            alt={project.title}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.05)' }}
            fallbackSrc="/images/projects/default-placeholder.png"
          />
          
          {/* Gradient overlay for better text readability */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            h="70%"
            bgGradient="linear(to-t, rgba(0,0,0,0.9), transparent)"
          />
          
          {/* Category badge */}
          <Badge
            position="absolute"
            top={4}
            left={4}
            colorScheme="green"
            fontSize="sm"
            px={3}
            py={1}
            bg="rgba(16, 185, 129, 0.9)"
          >
            <Icon as={FaBriefcase} mr={1} />
            {project.category.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </Badge>
          
          {/* Company logo and name */}
          <HStack
            position="absolute"
            top={4}
            right={4}
            bg="rgba(255, 255, 255, 0.98)"
            px={2}
            py={1.5}
            borderRadius="md"
            spacing={2}
            boxShadow="0 2px 8px rgba(0,0,0,0.1)"
          >
            {project.companyLogo ? (
              <Box
                w="40px"
                h="24px"
                borderRadius="sm"
                overflow="hidden"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={0.5}
              >
                <Image
                  src={project.companyLogo}
                  alt={project.client}
                  maxW="100%"
                  maxH="100%"
                  objectFit="contain"
                />
              </Box>
            ) : (
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                bg="gray.300"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="bold"
                color="gray.600"
              >
                {project.client.charAt(0)}
              </Box>
            )}
            <Text fontSize="xs" fontWeight="bold" color="gray.700">
              {project.client}
            </Text>
          </HStack>
          
          {/* Project title overlay */}
          <VStack
            position="absolute"
            bottom={4}
            left={4}
            right={4}
            align="start"
            spacing={1}
          >
            <Heading
              size="md"
              color="white"
              textShadow="0 2px 4px rgba(0,0,0,0.8)"
              noOfLines={2}
            >
              {project.title}
            </Heading>
            <Text
              fontSize="sm"
              color="whiteAlpha.900"
              textShadow="0 1px 2px rgba(0,0,0,0.8)"
            >
              {project.period}
            </Text>
          </VStack>
        </Box>
      </AspectRatio>
      
      {/* Content */}
      <VStack align="start" spacing={3} flex={1} p={6}>
        <Text color="var(--color-textSecondary)" fontSize="sm" noOfLines={2}>
          {project.description}
        </Text>
        
        {/* Key Result Highlight */}
        {project.results && project.results[0] && (
          <Box
            w="full"
            p={3}
            bg="var(--color-glassBg)"
            borderRadius="md"
            borderLeft="3px solid"
            borderLeftColor="var(--color-primary)"
          >
            <HStack spacing={2}>
              <Icon as={FaChartLine} color="var(--color-primary)" size="sm" />
              <Text fontSize="xs" color="var(--color-text)" fontWeight="medium">
                {project.results[0]}
              </Text>
            </HStack>
          </Box>
        )}
        
        {/* Technologies */}
        <Flex flexWrap="wrap" gap={2}>
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="subtle"
              colorScheme="cyan"
              fontSize="xs"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="subtle" colorScheme="gray" fontSize="xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </Flex>
        
        {/* Actions */}
        <HStack spacing={2} pt={2} width="full">
          <Button
            size="sm"
            variant="solid"
            colorScheme="blue"
            onClick={() => navigate(`/projects/${project.id}`)}
            flex={1}
          >
            View Case Study
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
          >
            Quick View
          </Button>
          {project.githubUrl && (
            <Button
              as="a"
              href={project.githubUrl}
              target="_blank"
              size="sm"
              variant="ghost"
              colorScheme="blue"
              leftIcon={<FaGithub />}
              onClick={(e) => e.stopPropagation()}
            >
              Code
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProjectCardEnhanced;