import { useState } from 'react';
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
  Image,
  useColorModeValue,
  Flex,
  Icon,
  useDisclosure,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { allProjects, projectCategories, getProjectsByCategory } from '../../data/allProjects';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import ProjectModal from '../common/ProjectModal';

const ProjectCard = ({ project, index, onOpen }) => {
  const bgHover = useColorModeValue('gray.100', 'whiteAlpha.100');
  const [ref, isInView] = useScrollAnimation();
  
  const typeIcon = project.type === 'professional' ? FaBriefcase : FaGraduationCap;
  const typeColor = project.type === 'professional' ? 'green' : 'blue';
  
  return (
    <Box
      ref={ref}
      className={`glass glass-hover hover-lift ${isInView ? 'scroll-animate-scale in-view' : 'scroll-animate-scale'}`}
      p={6}
      borderRadius="xl"
      transition="all 0.3s"
      _hover={{ bg: bgHover }}
      height="100%"
      display="flex"
      flexDirection="column"
      style={{ transitionDelay: `${index * 100}ms` }}
      position="relative"
    >
      {/* Project Type Badge */}
      <Badge
        position="absolute"
        top={4}
        right={4}
        colorScheme={typeColor}
        display="flex"
        alignItems="center"
        gap={1}
        px={2}
        py={1}
      >
        <Icon as={typeIcon} boxSize={3} />
        {project.type === 'professional' ? 'Pro' : 'Edu'}
      </Badge>
      
      {/* Project Image Placeholder */}
      <Box
        h="200px"
        bg="var(--color-background-light)"
        borderRadius="lg"
        mb={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        position="relative"
      >
        <Text color="var(--color-secondary)" fontSize="4xl">
          {project.title.charAt(0)}
        </Text>
        {project.featured && (
          <Badge
            position="absolute"
            top={2}
            left={2}
            colorScheme="yellow"
            variant="solid"
          >
            Featured
          </Badge>
        )}
      </Box>
      
      {/* Project Content */}
      <VStack align="start" spacing={3} flex={1}>
        <HStack spacing={2} flexWrap="wrap">
          <Badge colorScheme="cyan" fontSize="sm">
            {project.category.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </Badge>
          {project.displayClient && (
            <Badge colorScheme="purple" fontSize="xs" variant="outline">
              {project.displayClient}
            </Badge>
          )}
        </HStack>
        
        <Heading size="md" color="var(--color-accent)" noOfLines={2}>
          {project.title}
        </Heading>
        
        {project.displayPeriod && (
          <Text fontSize="xs" color="var(--color-primary)">
            {project.displayPeriod}
          </Text>
        )}
        
        <Text color="var(--color-secondary)" fontSize="sm" flex={1} noOfLines={3}>
          {project.description}
        </Text>
        
        {/* Technologies */}
        <Flex flexWrap="wrap" gap={2}>
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              colorScheme="gray"
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
        
        {/* Results Preview */}
        {project.results && project.results.length > 0 && (
          <Box w="full" pt={2}>
            <Text fontSize="xs" color="var(--color-primary)" fontWeight="bold" mb={1}>
              Key Result:
            </Text>
            <Text fontSize="xs" color="var(--color-secondary)" noOfLines={2}>
              {project.results[0]}
            </Text>
          </Box>
        )}
        
        {/* Action Buttons */}
        <HStack spacing={3} pt={2}>
          <Button
            size="sm"
            variant="solid"
            colorScheme="cyan"
            onClick={() => onOpen(project)}
          >
            View Details
          </Button>
          {project.github && (
            <Button
              as="a"
              href={project.github}
              target="_blank"
              size="sm"
              variant="ghost"
              leftIcon={<FaGithub />}
            >
              Code
            </Button>
          )}
          {project.demo && (
            <Button
              as="a"
              href={project.demo}
              target="_blank"
              size="sm"
              variant="ghost"
              leftIcon={<FaExternalLinkAlt />}
            >
              Demo
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [headerRef, isHeaderInView] = useScrollAnimation();
  
  const filteredProjects = getProjectsByCategory(selectedCategory);
  
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    onOpen();
  };
  
  return (
    <Box
      as="section"
      id="projects"
      py={20}
      bg="var(--color-background)"
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="-50%"
        right="-10%"
        width="60%"
        height="150%"
        bg="var(--color-primary)"
        opacity={0.03}
        transform="rotate(25deg)"
        pointerEvents="none"
      />
      
      <Container maxW="container.xl" position="relative">
        <VStack
          spacing={12}
          ref={headerRef}
          className={`${isHeaderInView ? 'animate-fade-in' : ''}`}
        >
          {/* Section Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              as="h2"
              size="2xl"
              color="var(--color-accent)"
              className="gradient-text"
            >
              Projects Portfolio
            </Heading>
            <Text color="var(--color-secondary)" fontSize="lg" maxW="2xl">
              A collection of professional client work and educational projects showcasing 
              expertise in AI, Machine Learning, and Data Science
            </Text>
          </VStack>
          
          {/* Category Filter */}
          <Wrap justify="center" spacing={3}>
            {projectCategories.map((category) => (
              <WrapItem key={category.id}>
                <Button
                  size="md"
                  variant={selectedCategory === category.id ? 'solid' : 'outline'}
                  colorScheme={selectedCategory === category.id ? 'cyan' : 'gray'}
                  onClick={() => setSelectedCategory(category.id)}
                  rightIcon={
                    <Badge
                      ml={2}
                      colorScheme={selectedCategory === category.id ? 'cyan' : 'gray'}
                      variant="solid"
                    >
                      {category.count}
                    </Badge>
                  }
                >
                  {category.name}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
          
          {/* Projects Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={handleOpenModal}
              />
            ))}
          </SimpleGrid>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text color="var(--color-secondary)">
                No projects found in this category.
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isOpen}
          onClose={onClose}
          project={selectedProject}
        />
      )}
    </Box>
  );
};

export default Projects;