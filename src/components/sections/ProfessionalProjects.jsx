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
  useDisclosure,
  Flex,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaBriefcase, FaChartLine, FaClock, FaAward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { professionalProjects, getProfessionalProjectsByCategory } from '../../data/professionalProjects';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import ProjectModal from '../common/ProjectModal';
import ProjectCardEnhanced from '../projects/ProjectCardEnhanced';

const ProjectCard = ({ project, index, onOpen }) => {
  const [ref, isInView] = useScrollAnimation();
  const navigate = useNavigate();
  
  return (
    <Box
      ref={ref}
      className={`glass glass-hover hover-lift ${isInView ? 'scroll-animate-scale in-view' : 'scroll-animate-scale'}`}
      p={6}
      borderRadius="xl"
      height="100%"
      display="flex"
      flexDirection="column"
      style={{ transitionDelay: `${index * 100}ms` }}
      position="relative"
      borderWidth={project.featured ? 2 : 1}
      borderColor={project.featured ? 'var(--color-primary)' : 'var(--color-glassBorder)'}
      overflow="hidden"
    >
      
      {/* Header */}
      <VStack align="start" spacing={3} flex={1}>
        <HStack justify="space-between" width="full">
          <Badge colorScheme="green" fontSize="sm">
            <Icon as={FaBriefcase} mr={1} />
            {project.category.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </Badge>
          <Text fontSize="xs" color="var(--color-primary)">
            {project.period}
          </Text>
        </HStack>
        
        <Heading size="md" color="var(--color-accent)" noOfLines={2}>
          {project.title}
        </Heading>
        
        <Text fontSize="sm" color="var(--color-secondary)" fontWeight="medium">
          {project.client}
        </Text>
        
        <Text color="var(--color-textSecondary)" fontSize="sm" flex={1} noOfLines={3}>
          {project.description}
        </Text>
        
        {/* Key Result Highlight */}
        <Box
          w="full"
          p={3}
          bg="var(--color-glassBg)"
          borderRadius="md"
          borderLeft="3px solid"
          borderLeftColor="var(--color-primary)"
        >
          <HStack spacing={2}>
            <Icon as={FaChartLine} color="var(--color-primary)" />
            <Text fontSize="sm" color="var(--color-text)" fontWeight="bold">
              {project.results[0]}
            </Text>
          </HStack>
        </Box>
        
        {/* Technologies */}
        <Flex flexWrap="wrap" gap={2}>
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge
              key={tech}
              variant="subtle"
              colorScheme="cyan"
              fontSize="xs"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="subtle" colorScheme="gray" fontSize="xs">
              +{project.technologies.length - 5}
            </Badge>
          )}
        </Flex>
        
        {/* Action Buttons */}
        <HStack spacing={2} width="full" mt={2}>
          <Button
            size="sm"
            variant="solid"
            colorScheme="cyan"
            onClick={() => navigate(`/projects/${project.id}`)}
            flex={1}
          >
            View Case Study
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="cyan"
            onClick={() => onOpen(project)}
          >
            Quick View
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

const ProfessionalProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [headerRef, isHeaderInView] = useScrollAnimation();
  
  const categories = [
    { id: 'all', name: 'All Projects', count: professionalProjects.length },
    { id: 'ai', name: 'AI/ML', count: professionalProjects.filter(p => p.category === 'ai').length },
    { id: 'mlops', name: 'MLOps', count: professionalProjects.filter(p => p.category === 'mlops').length },
    { id: 'nlp', name: 'NLP', count: professionalProjects.filter(p => p.category === 'nlp').length },
    { id: 'data-viz', name: 'Data Viz', count: professionalProjects.filter(p => p.category === 'data-viz').length },
  ];
  
  const filteredProjects = selectedCategory === 'all' 
    ? professionalProjects 
    : getProfessionalProjectsByCategory(selectedCategory);
  
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    onOpen();
  };
  
  // Calculate impact stats
  const stats = {
    totalProjects: professionalProjects.length,
    totalClients: new Set(professionalProjects.map(p => p.client)).size,
    avgImpact: '75%', // You could calculate this from your results
    techStack: new Set(professionalProjects.flatMap(p => p.technologies)).size,
  };
  
  return (
    <Box
      as="section"
      id="professional-projects"
      py={20}
      bg="var(--color-background)"
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="10%"
        left="-5%"
        width="30%"
        height="30%"
        bg="var(--color-primary)"
        opacity={0.05}
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
            <Badge colorScheme="green" fontSize="md" px={4} py={1}>
              <Icon as={FaBriefcase} mr={2} />
              Professional Experience
            </Badge>
            <Heading
              as="h2"
              size="2xl"
              color="var(--color-accent)"
              className="gradient-text"
            >
              Client Projects & Impact
            </Heading>
            <Text color="var(--color-secondary)" fontSize="lg">
              Real-world AI solutions delivered for businesses across industries, 
              from startups to government organizations, with measurable results and ROI.
            </Text>
          </VStack>
          
          {/* Impact Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
            <Stat textAlign="center">
              <StatNumber color="var(--color-primary)" fontSize="3xl">
                {stats.totalProjects}
              </StatNumber>
              <StatLabel color="var(--color-textSecondary)">Projects Delivered</StatLabel>
            </Stat>
            <Stat textAlign="center">
              <StatNumber color="var(--color-primary)" fontSize="3xl">
                {stats.totalClients}
              </StatNumber>
              <StatLabel color="var(--color-textSecondary)">Happy Clients</StatLabel>
            </Stat>
            <Stat textAlign="center">
              <StatNumber color="var(--color-primary)" fontSize="3xl">
                {stats.avgImpact}
              </StatNumber>
              <StatLabel color="var(--color-textSecondary)">Avg. Efficiency Gain</StatLabel>
            </Stat>
            <Stat textAlign="center">
              <StatNumber color="var(--color-primary)" fontSize="3xl">
                {stats.techStack}+
              </StatNumber>
              <StatLabel color="var(--color-textSecondary)">Technologies Used</StatLabel>
            </Stat>
          </SimpleGrid>
          
          {/* Category Filter */}
          <Wrap justify="center" spacing={3}>
            {categories.map((category) => (
              <WrapItem key={category.id}>
                <Button
                  size="md"
                  variant={selectedCategory === category.id ? 'solid' : 'outline'}
                  colorScheme={selectedCategory === category.id ? 'green' : 'gray'}
                  onClick={() => setSelectedCategory(category.id)}
                  rightIcon={
                    <Badge
                      ml={1}
                      colorScheme={selectedCategory === category.id ? 'green' : 'gray'}
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
              <ProjectCardEnhanced
                key={project.id}
                project={project}
                index={index}
                onOpen={handleOpenModal}
              />
            ))}
          </SimpleGrid>
          
          {/* Call to Action */}
          <Box
            w="full"
            p={8}
            bg="var(--color-glassBg)"
            borderRadius="xl"
            textAlign="center"
            className="glass"
          >
            <Heading size="lg" color="var(--color-accent)" mb={3}>
              Have a project in mind?
            </Heading>
            <Text color="var(--color-textSecondary)" mb={6}>
              Let's discuss how AI can transform your business operations
            </Text>
            <Button
              as="a"
              href="#contact"
              size="lg"
              colorScheme="cyan"
              rightIcon={<FaChartLine />}
            >
              Start a Conversation
            </Button>
          </Box>
        </VStack>
      </Container>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isOpen}
          onClose={onClose}
          project={{...selectedProject, type: 'professional'}}
        />
      )}
    </Box>
  );
};

export default ProfessionalProjects;