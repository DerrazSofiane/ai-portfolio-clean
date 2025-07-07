import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  SimpleGrid,
  Image,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  Code,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  Icon,
  Link,
  useBreakpointValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react';
import { 
  FaArrowLeft, 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCheckCircle,
  FaLightbulb,
  FaChartLine,
  FaCode,
  FaRocket,
  FaUsers,
  FaClock,
  FaAward,
  FaChevronRight,
  FaQuoteLeft,
} from 'react-icons/fa';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { professionalProjects } from '../data/professionalProjects';
import { projects as educationalProjects } from '../data/projects';
import ProjectVisuals from '../components/projects/ProjectVisuals';
import EducationalProjectDetail from './EducationalProjectDetail';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [headerRef, isHeaderInView] = useScrollAnimation();
  const [project, setProject] = useState(null);
  const [isEducational, setIsEducational] = useState(false);
  
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
  useEffect(() => {
    // Find project in professional or educational projects
    const professionalProject = professionalProjects.find(p => p.id === projectId);
    const educationalProject = educationalProjects.find(p => p.id === parseInt(projectId) || p.id === projectId);
    
    if (professionalProject) {
      setProject(professionalProject);
      setIsEducational(false);
    } else if (educationalProject) {
      setProject(educationalProject);
      setIsEducational(true);
    } else {
      // Project not found
      navigate('/');
    }
  }, [projectId, navigate]);
  
  if (!project) {
    return (
      <Box minH="100vh" bg="var(--color-background)">
        <Navigation />
        <Container maxW="container.xl" pt={32} pb={20}>
          <Text>Loading project...</Text>
        </Container>
      </Box>
    );
  }
  
  // If it's an educational project, render the educational template
  if (isEducational) {
    return <EducationalProjectDetail />;
  }
  
  // Process longDescription into problem and solution
  const descriptionParts = project.longDescription?.split('\n\n') || [];
  const problemStatement = descriptionParts[0] || project.description;
  const solution = descriptionParts[1] || descriptionParts[0] || '';
  
  // Create hero stats from metrics or use default structure
  const heroStats = project.metrics ? project.metrics.slice(0, 4).map(m => ({
    label: m.label,
    value: m.value,
    help: m.baseline ? `from ${m.baseline}` : m.impact
  })) : [
    { label: 'Duration', value: project.period, help: 'Project timeline' },
    { label: 'Technologies', value: project.technologies?.length || '10+', help: 'Tech stack size' },
    { label: 'Impact', value: 'High', help: 'Business impact' }
  ];
  
  // Process features into structured format
  const keyFeatures = project.features?.map(feature => {
    if (typeof feature === 'string') {
      return {
        title: feature.split(':')[0] || feature,
        description: feature.split(':')[1] || '',
        impact: ''
      };
    }
    return feature;
  }) || [];
  
  // Process results for display
  const results = project.results || [];
  
  // Process lessons learned
  const lessons = project.lessons || {
    learned: [],
    wouldDoDifferently: [],
    keyInsights: []
  };
  
  // Future improvements
  const futureImprovements = project.futureImprovements || [];
  
  return (
    <Box minH="100vh" bg="var(--color-background)">
      <Navigation />
      
      {/* Hero Section */}
      <Box
        pt={{ base: 20, md: 24 }}
        pb={10}
        bg="var(--color-background-dark)"
        position="relative"
        overflow="hidden"
      >
        {/* Background decoration */}
        <Box
          position="absolute"
          top="20%"
          right="-10%"
          width="40%"
          height="150%"
          bg="var(--color-primary)"
          opacity={0.05}
          transform="rotate(45deg)"
          pointerEvents="none"
        />
        
        <Container maxW="container.xl">
          {/* Breadcrumb */}
          <Breadcrumb
            spacing="8px"
            separator={<FaChevronRight color="gray.500" />}
            mb={6}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/" color="var(--color-secondary)">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/#professional-projects" color="var(--color-secondary)">
                Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="var(--color-primary)">
                {project.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <VStack align="start" spacing={6} ref={headerRef}>
            {/* Back button */}
            <Button
              leftIcon={<FaArrowLeft />}
              variant="ghost"
              onClick={() => navigate('/#professional-projects')}
              className={isHeaderInView ? 'animate-fade-in' : ''}
            >
              Back to Projects
            </Button>
            
            {/* Project header */}
            <VStack align="start" spacing={4} className={isHeaderInView ? 'animate-fade-in' : ''}>
              <HStack spacing={4} flexWrap="wrap">
                <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                  {project.client}
                </Badge>
                <Badge colorScheme="cyan" fontSize="md" px={3} py={1}>
                  {project.period}
                </Badge>
                <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                  {project.category}
                </Badge>
              </HStack>
              
              <Heading
                as="h1"
                size="2xl"
                color="var(--color-accent)"
                className="gradient-text"
              >
                {project.title}
              </Heading>
              
              <Text fontSize="xl" color="var(--color-secondary)">
                {project.description}
              </Text>
            </VStack>
            
            {/* Stats */}
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              spacing={6}
              w="full"
              className={isHeaderInView ? 'animate-scale-in' : ''}
            >
              {heroStats.map((stat, index) => (
                <Stat
                  key={index}
                  p={4}
                  bg="var(--color-glassBg)"
                  borderRadius="lg"
                  className="glass"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <StatLabel color="var(--color-textSecondary)">{stat.label}</StatLabel>
                  <StatNumber color="var(--color-primary)" fontSize="2xl">
                    {stat.value}
                  </StatNumber>
                  <StatHelpText color="var(--color-textSecondary)">
                    {stat.help}
                  </StatHelpText>
                </Stat>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      
      {/* Main Content */}
      <Container maxW="container.xl" py={10}>
        <Tabs
          index={activeTab}
          onChange={setActiveTab}
          colorScheme="cyan"
          variant="soft-rounded"
        >
          <TabList mb={8} flexWrap="wrap">
            <Tab>Overview</Tab>
            <Tab>Technical Details</Tab>
            <Tab>Results & Impact</Tab>
            <Tab>Insights & Future</Tab>
            {project.visuals && project.visuals.length > 0 && <Tab>Visuals</Tab>}
          </TabList>
          
          <TabPanels>
            {/* Overview Tab */}
            <TabPanel p={0}>
              <VStack spacing={10} align="stretch">
                {/* Problem & Solution */}
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
                  <Box
                    p={6}
                    bg="var(--color-glassBg)"
                    borderRadius="xl"
                    className="glass"
                  >
                    <Icon as={FaLightbulb} boxSize={8} color="var(--color-primary)" mb={4} />
                    <Heading size="md" mb={4} color="var(--color-accent)">
                      The Challenge
                    </Heading>
                    <Text color="var(--color-text)" lineHeight="tall">
                      {problemStatement}
                    </Text>
                  </Box>
                  
                  <Box
                    p={6}
                    bg="var(--color-glassBg)"
                    borderRadius="xl"
                    className="glass"
                  >
                    <Icon as={FaRocket} boxSize={8} color="var(--color-primary)" mb={4} />
                    <Heading size="md" mb={4} color="var(--color-accent)">
                      The Solution
                    </Heading>
                    <Text color="var(--color-text)" lineHeight="tall">
                      {solution}
                    </Text>
                  </Box>
                </SimpleGrid>
                
                {/* Key Features */}
                {keyFeatures.length > 0 && (
                  <Box>
                    <Heading size="lg" mb={6} color="var(--color-accent)">
                      Key Features Implemented
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {keyFeatures.map((feature, index) => (
                        <Box
                          key={index}
                          p={6}
                          bg="var(--color-glassBg)"
                          borderRadius="lg"
                          className="glass hover-lift"
                        >
                          <Heading size="sm" mb={2} color="var(--color-primary)">
                            {feature.title}
                          </Heading>
                          {feature.description && (
                            <Text color="var(--color-text)" mb={3}>
                              {feature.description}
                            </Text>
                          )}
                          {feature.impact && (
                            <HStack>
                              <Icon as={FaChartLine} color="var(--color-primary)" />
                              <Text fontSize="sm" color="var(--color-secondary)">
                                {feature.impact}
                              </Text>
                            </HStack>
                          )}
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
                
                {/* Technologies */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    Technology Stack
                  </Heading>
                  <Flex flexWrap="wrap" gap={3}>
                    {project.technologies?.map((tech) => (
                      <Badge
                        key={tech}
                        colorScheme="cyan"
                        fontSize="md"
                        px={4}
                        py={2}
                        borderRadius="full"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </VStack>
            </TabPanel>
            
            {/* Technical Details Tab */}
            <TabPanel p={0}>
              <VStack spacing={10} align="stretch">
                {/* Architecture */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    Architecture & Implementation
                  </Heading>
                  <Box
                    p={6}
                    bg="var(--color-glassBg)"
                    borderRadius="xl"
                    className="glass"
                  >
                    <Text color="var(--color-text)" mb={6} lineHeight="tall">
                      {project.challenges || project.longDescription}
                    </Text>
                    
                    {project.technologies && (
                      <Box>
                        <Heading size="sm" mb={4} color="var(--color-primary)">
                          Core Technologies Used
                        </Heading>
                        <List spacing={2}>
                          {project.technologies.slice(0, 10).map((tech, index) => (
                            <ListItem key={index} color="var(--color-text)">
                              <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                              {tech}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                </Box>
                
                {/* Code Examples */}
                {project.codeExamples && project.codeExamples.length > 0 && (
                  <Box>
                    <Heading size="lg" mb={6} color="var(--color-accent)">
                      Implementation Examples
                    </Heading>
                    <VStack spacing={6} align="stretch">
                      {project.codeExamples.map((example, index) => (
                        <Box key={index}>
                          <HStack justify="space-between" mb={3}>
                            <Heading size="sm" color="var(--color-primary)">
                              {example.title}
                            </Heading>
                            <Badge colorScheme="purple">{example.language}</Badge>
                          </HStack>
                          <Text fontSize="sm" color="var(--color-textSecondary)" mb={3}>
                            {example.description}
                          </Text>
                          <Box
                            borderRadius="lg"
                            overflow="hidden"
                            border="1px solid"
                            borderColor="var(--color-glassBorder)"
                          >
                            <SyntaxHighlighter
                              language={example.language.toLowerCase()}
                              style={atomDark}
                              customStyle={{
                                margin: 0,
                                fontSize: '14px',
                              }}
                            >
                              {example.code}
                            </SyntaxHighlighter>
                          </Box>
                          {example.explanation && (
                            <Text fontSize="sm" color="var(--color-textSecondary)" mt={3}>
                              {example.explanation}
                            </Text>
                          )}
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            </TabPanel>
            
            {/* Results & Impact Tab */}
            <TabPanel p={0}>
              <VStack spacing={10} align="stretch">
                {/* Key Results */}
                {results.length > 0 && (
                  <Box>
                    <Heading size="lg" mb={6} color="var(--color-accent)">
                      Key Results Achieved
                    </Heading>
                    <List spacing={4}>
                      {results.map((result, index) => (
                        <ListItem
                          key={index}
                          p={4}
                          bg="var(--color-glassBg)"
                          borderRadius="lg"
                          className="glass"
                        >
                          <HStack align="start">
                            <Icon as={FaCheckCircle} color="var(--color-primary)" mt={1} />
                            <Text color="var(--color-text)">{result}</Text>
                          </HStack>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
                
                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <Box>
                    <Heading size="lg" mb={6} color="var(--color-accent)">
                      Performance Metrics
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {project.metrics.map((metric, index) => (
                        <Box
                          key={index}
                          p={6}
                          bg="var(--color-glassBg)"
                          borderRadius="xl"
                          className="glass"
                        >
                          <Stat>
                            <StatLabel color="var(--color-textSecondary)">
                              {metric.label}
                            </StatLabel>
                            <HStack spacing={3} align="baseline">
                              <StatNumber color="var(--color-primary)" fontSize="3xl">
                                {metric.value}
                              </StatNumber>
                              {metric.baseline && (
                                <Text fontSize="sm" color="var(--color-textSecondary)">
                                  from {metric.baseline}
                                </Text>
                              )}
                            </HStack>
                            {metric.change && (
                              <StatHelpText>
                                <StatArrow type={metric.change > 0 ? 'increase' : 'decrease'} />
                                {Math.abs(metric.change)}% change
                              </StatHelpText>
                            )}
                            {metric.impact && (
                              <Text fontSize="sm" color="var(--color-secondary)" mt={2}>
                                {metric.impact}
                              </Text>
                            )}
                          </Stat>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
                
                {/* Testimonials */}
                {project.testimonials && project.testimonials.length > 0 && (
                  <Box>
                    <Heading size="lg" mb={6} color="var(--color-accent)">
                      Client Feedback
                    </Heading>
                    <VStack spacing={6} align="stretch">
                      {project.testimonials.map((testimonial, index) => (
                        <Box
                          key={index}
                          p={6}
                          bg="var(--color-glassBg)"
                          borderRadius="xl"
                          className="glass"
                          position="relative"
                        >
                          <Icon
                            as={FaQuoteLeft}
                            position="absolute"
                            top={4}
                            left={4}
                            boxSize={8}
                            color="var(--color-primary)"
                            opacity={0.2}
                          />
                          <VStack align="start" spacing={4} pl={8}>
                            <Text
                              fontSize="lg"
                              color="var(--color-text)"
                              fontStyle="italic"
                              lineHeight="tall"
                            >
                              {testimonial.quote}
                            </Text>
                            <Box>
                              <Text fontWeight="bold" color="var(--color-primary)">
                                {testimonial.author}
                              </Text>
                              <Text fontSize="sm" color="var(--color-textSecondary)">
                                {testimonial.role} at {testimonial.company}
                              </Text>
                            </Box>
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            </TabPanel>
            
            {/* Insights & Future Tab */}
            <TabPanel p={0}>
              <VStack spacing={10} align="stretch">
                {/* Lessons Learned */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    Lessons Learned
                  </Heading>
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                    <Box
                      p={6}
                      bg="var(--color-glassBg)"
                      borderRadius="xl"
                      className="glass"
                    >
                      <Icon as={FaLightbulb} boxSize={6} color="var(--color-primary)" mb={3} />
                      <Heading size="sm" mb={3} color="var(--color-primary)">
                        Key Insights
                      </Heading>
                      <List spacing={2}>
                        {(lessons.keyInsights || ['Scalability is crucial from the start', 'User feedback drives innovation']).map((insight, index) => (
                          <ListItem key={index} fontSize="sm" color="var(--color-text)">
                            • {insight}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    
                    <Box
                      p={6}
                      bg="var(--color-glassBg)"
                      borderRadius="xl"
                      className="glass"
                    >
                      <Icon as={FaClock} boxSize={6} color="var(--color-primary)" mb={3} />
                      <Heading size="sm" mb={3} color="var(--color-primary)">
                        What I'd Do Differently
                      </Heading>
                      <List spacing={2}>
                        {(lessons.wouldDoDifferently || ['Implement more comprehensive testing early', 'Focus on documentation from day one']).map((item, index) => (
                          <ListItem key={index} fontSize="sm" color="var(--color-text)">
                            • {item}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </SimpleGrid>
                </Box>
                
                {/* Future Improvements */}
                {futureImprovements.length > 0 && (
                  <Box>
                    <Heading size="lg" mb={6} color="var(--color-accent)">
                      Future Roadmap
                    </Heading>
                    <List spacing={3}>
                      {futureImprovements.map((improvement, index) => (
                        <ListItem
                          key={index}
                          p={4}
                          bg="var(--color-glassBg)"
                          borderRadius="lg"
                          className="glass"
                        >
                          <HStack align="start">
                            <Icon as={FaRocket} color="var(--color-primary)" mt={1} />
                            <Text color="var(--color-text)">{improvement}</Text>
                          </HStack>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
                
                {/* Call to Action */}
                <Box
                  p={8}
                  bg="var(--color-glassBg)"
                  borderRadius="xl"
                  className="glass"
                  textAlign="center"
                >
                  <Heading size="md" mb={4} color="var(--color-accent)">
                    Interested in Similar Solutions?
                  </Heading>
                  <Text color="var(--color-textSecondary)" mb={6}>
                    Let's discuss how we can apply these learnings to your project
                  </Text>
                  <HStack spacing={4} justify="center">
                    <Button
                      as="a"
                      href="#contact"
                      size="lg"
                      colorScheme="cyan"
                      leftIcon={<FaUsers />}
                    >
                      Get in Touch
                    </Button>
                    {project.githubUrl && (
                      <Button
                        as="a"
                        href={project.githubUrl}
                        target="_blank"
                        size="lg"
                        variant="outline"
                        leftIcon={<FaGithub />}
                      >
                        View Code
                      </Button>
                    )}
                  </HStack>
                </Box>
              </VStack>
            </TabPanel>
            
            {/* Visuals Tab */}
            {project.visuals && project.visuals.length > 0 && (
              <TabPanel p={0}>
                <VStack spacing={10} align="stretch">
                  <Box>
                    <Heading size="lg" mb={6} color="var(--color-accent)">
                      Project Visuals & Demonstrations
                    </Heading>
                    <ProjectVisuals visuals={project.visuals} />
                  </Box>
                </VStack>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
        
        {/* Navigation to other projects */}
        <Box mt={20} pt={10} borderTop="1px solid" borderColor="var(--color-glassBorder)">
          <Heading size="lg" mb={8} color="var(--color-accent)">
            More Projects
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[...professionalProjects, ...educationalProjects]
              .filter(p => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map((relatedProject) => (
                <Box
                  key={relatedProject.id}
                  p={6}
                  bg="var(--color-glassBg)"
                  borderRadius="lg"
                  className="glass hover-lift"
                  cursor="pointer"
                  onClick={() => navigate(`/projects/${relatedProject.id}`)}
                >
                  <Badge colorScheme="cyan" mb={2}>
                    {relatedProject.category}
                  </Badge>
                  <Heading size="sm" mb={2} color="var(--color-accent)">
                    {relatedProject.title}
                  </Heading>
                  <Text fontSize="sm" color="var(--color-secondary)" noOfLines={2}>
                    {relatedProject.description}
                  </Text>
                </Box>
              ))}
          </SimpleGrid>
        </Box>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default ProjectDetail;