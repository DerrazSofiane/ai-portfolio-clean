import React from 'react';
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
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaBriefcase, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const ProjectCardWithThumbnail = ({ project, index, onOpen }) => {
  const [ref, isInView] = useScrollAnimation();
  const navigate = useNavigate();
  
  // Default thumbnail if none provided
  const thumbnail = project.thumbnail || `/images/projects/default-${project.category}.png`;
  
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
      cursor="pointer"
      onClick={() => navigate(`/projects/${project.id}`)}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Thumbnail */}
      <AspectRatio ratio={16 / 9}>
        <Box position="relative" overflow="hidden">
          <Image
            src={thumbnail}
            alt={project.title}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.3s"
            _groupHover={{ transform: 'scale(1.05)' }}
          />
          {/* Overlay gradient */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            h="50%"
            bgGradient="linear(to-t, rgba(0,0,0,0.8), transparent)"
          />
          {/* Category badge on image */}
          <Badge
            position="absolute"
            top={4}
            left={4}
            colorScheme="green"
            fontSize="sm"
            px={3}
            py={1}
          >
            <Icon as={FaBriefcase} mr={1} />
            {project.category.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </Badge>
          {/* Client badge */}
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme="purple"
            fontSize="sm"
            px={3}
            py={1}
          >
            {project.client}
          </Badge>
        </Box>
      </AspectRatio>
      
      {/* Content */}
      <VStack align="start" spacing={3} flex={1} p={6}>
        <HStack justify="space-between" width="full">
          <Heading size="md" color="var(--color-accent)" noOfLines={2}>
            {project.title}
          </Heading>
        </HStack>
        
        <Text fontSize="xs" color="var(--color-primary)">
          {project.period}
        </Text>
        
        <Text color="var(--color-textSecondary)" fontSize="sm" flex={1} noOfLines={2}>
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
              <Text fontSize="xs" color="var(--color-text)" fontWeight="medium" noOfLines={1}>
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
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/projects/${project.id}`);
            }}
            flex={1}
          >
            View Case Study
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

export default ProjectCardWithThumbnail;