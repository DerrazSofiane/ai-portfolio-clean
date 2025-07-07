import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  HStack,
  VStack,
  Badge,
  useDisclosure,
  Flex,
  Icon,
  Progress,
  Wrap,
  WrapItem,
  Image,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaGraduationCap, FaTrophy, FaCode } from 'react-icons/fa';
import { projects, categories } from '../../data/projects';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import ProjectModal from '../common/ProjectModal';

const ProjectCard = ({ project, index, onOpen }) => {
  const [ref, isInView] = useScrollAnimation();
  const navigate = useNavigate();
  
  return (
    <Box
      ref={ref}
      className={`glass glass-hover hover-lift ${isInView ? 'scroll-animate-fade in-view' : 'scroll-animate-fade'}`}
      p={6}
      borderRadius="xl"
      height="100%"
      display="flex"
      flexDirection="column"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Project Number */}
      <Badge
        position="absolute"
        top={4}
        right={4}
        colorScheme="blue"
        variant="solid"
        fontSize="lg"
        borderRadius="full"
        px={3}
        py={1}
      >
        #{project.id}
      </Badge>
      
      {/* Content */}
      <VStack align="start" spacing={3} flex={1}>
        <Badge colorScheme="purple" fontSize="sm">
          <Icon as={FaGraduationCap} mr={1} />
          {project.category}
        </Badge>
        
        <Heading size="md" color="var(--color-accent)" noOfLines={2}>
          {project.title}
        </Heading>
        
        <Text color="var(--color-textSecondary)" fontSize="sm" flex={1} noOfLines={3}>
          {project.description}
        </Text>
        
        {/* Key Achievement */}
        {project.results && project.results[0] && (
          <HStack spacing={2} color="var(--color-primary)" fontSize="sm">
            <Icon as={FaTrophy} />
            <Text fontWeight="medium" noOfLines={1}>
              {project.results[0]}
            </Text>
          </HStack>
        )}
        
        {/* Technologies */}
        <Flex flexWrap="wrap" gap={2}>
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              colorScheme="blue"
              fontSize="xs"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" colorScheme="gray" fontSize="xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </Flex>
        
        {/* Actions */}
        <HStack spacing={2} pt={2}>
          <Button
            size="sm"
            variant="solid"
            colorScheme="blue"
            onClick={() => navigate(`/projects/${project.id}`)}
            flex={1}
          >
            Details
          </Button>
          {project.github && (
            <Button
              as="a"
              href={project.github}
              target="_blank"
              size="sm"
              variant="ghost"
              colorScheme="blue"
              leftIcon={<FaGithub />}
            >
              Code
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

const EducationalProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [headerRef, isHeaderInView] = useScrollAnimation();
  
  // Create category objects with counts
  const categoryObjects = categories.map(cat => ({
    id: cat,
    name: cat,
    count: cat === 'All' 
      ? projects.length 
      : projects.filter(p => p.category === cat).length
  }));
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
  
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    onOpen();
  };
  
  return (
    <Box
      as="section"
      id="educational-projects"
      py={20}
      bg="var(--color-background-dark)"
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        bottom="10%"
        right="-10%"
        width="40%"
        height="40%"
        bg="var(--color-secondary)"
        opacity={0.03}
        borderRadius="full"
        filter="blur(100px)"
        pointerEvents="none"
      />
      
      <Container maxW="container.xl" position="relative">
        <VStack
          spacing={12}
          ref={headerRef}
          className={`${isHeaderInView ? 'animate-fade-in' : ''}`}
        >
          {/* Section Header */}
          <VStack spacing={4} textAlign="center" maxW="3xl">
            <Badge colorScheme="blue" fontSize="md" px={4} py={1}>
              <Icon as={FaGraduationCap} mr={2} />
              Personal Projects
            </Badge>
            <Heading
              as="h2"
              size="2xl"
              color="var(--color-accent)"
            >
              AI Engineering Personal Projects
            </Heading>
            <Text color="var(--color-secondary)" fontSize="lg">
              Comprehensive portfolio showcasing my passion for AI/ML through 
              challenging projects covering the full development lifecycle.
            </Text>
          </VStack>
          
          {/* Progress Overview */}
          <Box w="full" maxW="2xl" p={6} bg="var(--color-glassBg)" borderRadius="xl" className="glass">
            <HStack justify="space-between" mb={2}>
              <Text color="var(--color-text)" fontWeight="bold">
                Learning Journey Progress
              </Text>
              <Text color="var(--color-primary)" fontWeight="bold">
                100%
              </Text>
            </HStack>
            <Progress value={100} colorScheme="green" size="sm" borderRadius="full" />
            <HStack justify="space-between" mt={4} spacing={8}>
              <VStack align="center" spacing={0}>
                <Text color="var(--color-primary)" fontWeight="bold" fontSize="lg">
                  10
                </Text>
                <Text color="var(--color-textSecondary)" fontSize="sm" textAlign="center">
                  Projects Completed
                </Text>
              </VStack>
              <VStack align="center" spacing={0}>
                <Text color="var(--color-primary)" fontWeight="bold" fontSize="lg">
                  2+ Years
                </Text>
                <Text color="var(--color-textSecondary)" fontSize="sm" textAlign="center">
                  Development Time
                </Text>
              </VStack>
              <VStack align="center" spacing={0}>
                <Text color="var(--color-primary)" fontWeight="bold" fontSize="lg">
                  Advanced
                </Text>
                <Text color="var(--color-textSecondary)" fontSize="sm" textAlign="center">
                  Skill Level Achieved
                </Text>
              </VStack>
            </HStack>
          </Box>
          
          {/* Category Filter */}
          <Wrap justify="center" spacing={3}>
            {categoryObjects.map((category) => (
              <WrapItem key={category.id}>
                <Button
                  size="md"
                  variant={selectedCategory === category.id ? 'solid' : 'outline'}
                  colorScheme={selectedCategory === category.id ? 'blue' : 'gray'}
                  onClick={() => setSelectedCategory(category.id)}
                  rightIcon={
                    category.count > 0 && (
                      <Badge
                        ml={1}
                        colorScheme={selectedCategory === category.id ? 'blue' : 'gray'}
                        variant="solid"
                      >
                        {category.count}
                      </Badge>
                    )
                  }
                >
                  {category.name}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
          
          {/* Projects Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={handleOpenModal}
              />
            ))}
          </SimpleGrid>
          
          {/* Academic Background */}
          <Box w="full">
            <Heading size="lg" mb={6} textAlign="center" color="var(--color-accent)">
              Academic Background
            </Heading>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} w="full">
              {/* Bachelor's Degree */}
              <Box
                p={8}
                bg="var(--color-glassBg)"
                borderRadius="xl"
                textAlign="center"
                className="glass"
              >
                <HStack justify="center" spacing={4} mb={4}>
                  <Icon as={FaGraduationCap} boxSize={8} color="var(--color-primary)" />
                  <VStack align="center" spacing={0}>
                    <Heading size="lg" color="var(--color-accent)">
                      Bachelor's Degree
                    </Heading>
                    <Text color="var(--color-primary)" fontSize="sm" fontWeight="medium">
                      Mathematics & Computer Science
                    </Text>
                  </VStack>
                </HStack>
                <Text color="var(--color-textSecondary)" mb={2} fontWeight="bold">
                  University of Le Havre
                </Text>
                <Text color="var(--color-textSecondary)" fontSize="sm">
                  Strong foundation in mathematical modeling, algorithms, data structures, 
                  and computational theory that underpins my AI expertise.
                </Text>
              </Box>
              
              {/* Master's Degree */}
              <Box
                p={8}
                bg="var(--color-glassBg)"
                borderRadius="xl"
                textAlign="center"
                className="glass"
              >
                <HStack justify="center" spacing={4} mb={4}>
                  <Icon as={FaGraduationCap} boxSize={8} color="var(--color-primary)" />
                  <VStack align="center" spacing={0}>
                    <Heading size="lg" color="var(--color-accent)">
                      Master's Degree
                    </Heading>
                    <Text color="var(--color-primary)" fontSize="sm" fontWeight="medium">
                      Engineering (MEng)
                    </Text>
                  </VStack>
                </HStack>
                <Text color="var(--color-textSecondary)" mb={2} fontWeight="bold">
                  CentraleSupélec
                </Text>
                <Text color="var(--color-textSecondary)" fontSize="sm">
                  Graduate-level engineering degree from one of France's most prestigious 
                  engineering schools, providing advanced expertise in system design, 
                  optimization, and cutting-edge technology innovation.
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isOpen}
          onClose={onClose}
          project={{...selectedProject, type: 'education'}}
        />
      )}
    </Box>
  );
};

export default EducationalProjects;