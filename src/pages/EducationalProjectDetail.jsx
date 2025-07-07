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
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  Icon,
  Link,
  useBreakpointValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Progress,
  Divider,
  Card,
  CardBody,
  CardHeader,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { 
  FaArrowLeft, 
  FaGithub, 
  FaCheckCircle,
  FaLightbulb,
  FaCode,
  FaRocket,
  FaChevronRight,
  FaGraduationCap,
  FaBook,
  FaTrophy,
  FaBrain,
  FaTools,
  FaCertificate,
  FaChartLine,
  FaFileAlt,
  FaPuzzlePiece,
  FaFlask,
} from 'react-icons/fa';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { projects as educationalProjects } from '../data/projects';

const EducationalProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [headerRef, isHeaderInView] = useScrollAnimation();
  const [project, setProject] = useState(null);
  
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
  useEffect(() => {
    // Find educational project
    const educationalProject = educationalProjects.find(p => p.id === parseInt(projectId) || p.id === projectId);
    
    if (educationalProject) {
      setProject(educationalProject);
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
  
  // Educational project specific stats
  const projectStats = [
    { label: 'Project Number', value: `#${project.id}`, icon: FaCertificate },
    { label: 'Category', value: project.category, icon: FaCode },
    { label: 'Technologies', value: project.technologies?.length || '10+', icon: FaTools },
    { label: 'Completion', value: '100%', icon: FaTrophy },
  ];
  
  // Process description for better display
  const learningObjectives = [
    'Master industry-standard tools and frameworks',
    'Apply theoretical knowledge to real-world scenarios',
    'Develop production-ready solutions',
    'Learn best practices and design patterns',
  ];
  
  // Extract key achievements from results
  const keyAchievements = project.results || [];
  
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
          left="-10%"
          width="50%"
          height="120%"
          bg="var(--color-secondary)"
          opacity={0.03}
          transform="rotate(-45deg)"
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
              <BreadcrumbLink as={RouterLink} to="/#educational-projects" color="var(--color-secondary)">
                Personal Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="var(--color-primary)">
                Project {project.id}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <VStack align="start" spacing={6} ref={headerRef}>
            {/* Back button */}
            <Button
              leftIcon={<FaArrowLeft />}
              variant="ghost"
              onClick={() => navigate('/#educational-projects')}
              className={isHeaderInView ? 'animate-fade-in' : ''}
            >
              Back to Personal Projects
            </Button>
            
            {/* Project header */}
            <VStack align="start" spacing={4} className={isHeaderInView ? 'animate-fade-in' : ''}>
              <HStack spacing={4} flexWrap="wrap">
                <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                  <Icon as={FaGraduationCap} mr={2} />
                  Personal Project #{project.id}
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
              
              {/* GitHub Link */}
              {project.github && (
                <Button
                  as="a"
                  href={project.github}
                  target="_blank"
                  leftIcon={<FaGithub />}
                  variant="outline"
                  colorScheme="cyan"
                  size="sm"
                >
                  View Repository
                </Button>
              )}
            </VStack>
            
            {/* Stats */}
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              spacing={6}
              w="full"
              className={isHeaderInView ? 'animate-scale-in' : ''}
            >
              {projectStats.map((stat, index) => (
                <Box
                  key={index}
                  p={4}
                  bg="var(--color-glassBg)"
                  borderRadius="lg"
                  className="glass"
                  textAlign="center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon as={stat.icon} boxSize={6} color="var(--color-primary)" mb={2} />
                  <Text color="var(--color-textSecondary)" fontSize="sm">{stat.label}</Text>
                  <Text color="var(--color-primary)" fontSize="xl" fontWeight="bold">
                    {stat.value}
                  </Text>
                </Box>
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
          colorScheme="blue"
          variant="soft-rounded"
        >
          <TabList mb={8} flexWrap="wrap">
            <Tab><Icon as={FaBook} mr={2} />Project Overview</Tab>
            <Tab><Icon as={FaCode} mr={2} />Technical Implementation</Tab>
            <Tab><Icon as={FaBrain} mr={2} />Learning Outcomes</Tab>
            <Tab><Icon as={FaFileAlt} mr={2} />Documentation</Tab>
          </TabList>
          
          <TabPanels>
            {/* Project Overview Tab */}
            <TabPanel p={0}>
              <VStack spacing={10} align="stretch">
                {/* Project Context */}
                <Card variant="outline" borderColor="var(--color-glassBorder)">
                  <CardHeader>
                    <Heading size="md" color="var(--color-accent)">
                      <Icon as={FaFlask} mr={3} />
                      Project Context
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text color="var(--color-text)" lineHeight="tall" mb={4}>
                      {project.longDescription || project.description}
                    </Text>
                    <Alert status="info" variant="subtle" borderRadius="md">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Personal Initiative</AlertTitle>
                        <AlertDescription>
                          This project was developed to explore advanced {project.category} concepts
                          and demonstrate practical solutions to industry challenges.
                        </AlertDescription>
                      </Box>
                    </Alert>
                  </CardBody>
                </Card>
                
                {/* Learning Objectives */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaGraduationCap} mr={3} />
                    Learning Objectives
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {learningObjectives.map((objective, index) => (
                      <Box
                        key={index}
                        p={4}
                        bg="var(--color-glassBg)"
                        borderRadius="lg"
                        className="glass hover-lift"
                      >
                        <HStack align="start">
                          <Icon as={FaCheckCircle} color="var(--color-primary)" mt={1} />
                          <Text color="var(--color-text)">{objective}</Text>
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
                
                {/* Key Features */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaPuzzlePiece} mr={3} />
                    Key Features Implemented
                  </Heading>
                  <List spacing={3}>
                    {keyAchievements.map((achievement, index) => (
                      <ListItem
                        key={index}
                        p={4}
                        bg="var(--color-glassBg)"
                        borderRadius="lg"
                        className="glass"
                      >
                        <HStack align="start">
                          <Icon as={FaTrophy} color="var(--color-primary)" mt={1} />
                          <Text color="var(--color-text)">{achievement}</Text>
                        </HStack>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </VStack>
            </TabPanel>
            
            {/* Technical Implementation Tab */}
            <TabPanel p={0}>
              <VStack spacing={10} align="stretch">
                {/* Technology Stack */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaTools} mr={3} />
                    Technology Stack
                  </Heading>
                  <Flex flexWrap="wrap" gap={3} mb={6}>
                    {project.technologies?.map((tech) => (
                      <Badge
                        key={tech}
                        colorScheme="blue"
                        fontSize="md"
                        px={4}
                        py={2}
                        borderRadius="full"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </Flex>
                  
                  <Card variant="outline" borderColor="var(--color-glassBorder)">
                    <CardBody>
                      <Heading size="sm" mb={3} color="var(--color-primary)">
                        Why These Technologies?
                      </Heading>
                      <Text color="var(--color-text)">
                        The technology choices for this project were made to align with industry standards
                        and provide hands-on experience with tools commonly used in {project.category} roles.
                      </Text>
                    </CardBody>
                  </Card>
                </Box>
                
                {/* Implementation Approach */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaCode} mr={3} />
                    Implementation Approach
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    <Box p={6} bg="var(--color-glassBg)" borderRadius="xl" className="glass">
                      <Heading size="sm" mb={3} color="var(--color-primary)">
                        Architecture Design
                      </Heading>
                      <Text color="var(--color-text)" mb={4}>
                        Implemented a modular architecture focusing on scalability and maintainability.
                        The solution follows best practices for {project.category} applications.
                      </Text>
                    </Box>
                    
                    <Box p={6} bg="var(--color-glassBg)" borderRadius="xl" className="glass">
                      <Heading size="sm" mb={3} color="var(--color-primary)">
                        Code Organization
                      </Heading>
                      <Text color="var(--color-text)">
                        Structured the codebase with clear separation of concerns, comprehensive documentation,
                        and extensive testing to ensure production-ready quality.
                      </Text>
                    </Box>
                    
                    {project.demo && (
                      <Box p={6} bg="var(--color-glassBg)" borderRadius="xl" className="glass">
                        <Heading size="sm" mb={3} color="var(--color-primary)">
                          Live Demo
                        </Heading>
                        <Button
                          as="a"
                          href={project.demo}
                          target="_blank"
                          colorScheme="cyan"
                          size="md"
                          leftIcon={<FaRocket />}
                        >
                          View Live Demo
                        </Button>
                      </Box>
                    )}
                  </VStack>
                </Box>
                
                {/* Code Example */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaFileAlt} mr={3} />
                    Code Highlights
                  </Heading>
                  <Alert status="info" mb={4}>
                    <AlertIcon />
                    <Text>
                      Visit the <Link href={project.github} isExternal color="var(--color-primary)">
                        GitHub repository
                      </Link> to explore the complete implementation with detailed comments and documentation.
                    </Text>
                  </Alert>
                </Box>
              </VStack>
            </TabPanel>
            
            {/* Learning Outcomes Tab */}
            <TabPanel p={0}>
              <VStack spacing={10} align="stretch">
                {/* Skills Developed */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaBrain} mr={3} />
                    Skills Developed
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Card variant="outline" borderColor="var(--color-glassBorder)">
                      <CardHeader>
                        <Heading size="sm" color="var(--color-primary)">
                          Technical Skills
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <List spacing={2}>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Advanced {project.category} techniques
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Production-ready code development
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Testing and quality assurance
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Performance optimization
                          </ListItem>
                        </List>
                      </CardBody>
                    </Card>
                    
                    <Card variant="outline" borderColor="var(--color-glassBorder)">
                      <CardHeader>
                        <Heading size="sm" color="var(--color-primary)">
                          Professional Skills
                        </Heading>
                      </CardHeader>
                      <CardBody>
                        <List spacing={2}>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Project planning and management
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Documentation writing
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Problem-solving methodology
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Code review practices
                          </ListItem>
                        </List>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </Box>
                
                {/* Project Impact */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaChartLine} mr={3} />
                    Project Impact & Metrics
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    {keyAchievements.map((achievement, index) => (
                      <Box
                        key={index}
                        p={6}
                        bg="var(--color-glassBg)"
                        borderRadius="xl"
                        className="glass"
                        textAlign="center"
                      >
                        <Icon as={FaTrophy} boxSize={8} color="var(--color-primary)" mb={3} />
                        <Text color="var(--color-text)" fontWeight="medium">
                          {achievement}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
                
                {/* Challenges Overcome */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaLightbulb} mr={3} />
                    Challenges & Solutions
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    <Alert status="success" variant="left-accent">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Technical Challenge</AlertTitle>
                        <AlertDescription>
                          Successfully implemented complex algorithms and data structures required for
                          optimal performance in production environments.
                        </AlertDescription>
                      </Box>
                    </Alert>
                    <Alert status="success" variant="left-accent">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Scalability Challenge</AlertTitle>
                        <AlertDescription>
                          Designed the system to handle large-scale data processing while maintaining
                          efficiency and reliability.
                        </AlertDescription>
                      </Box>
                    </Alert>
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>
            
            {/* Documentation Tab */}
            <TabPanel p={0}>
              <VStack spacing={10} align="stretch">
                {/* Project Resources */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaFileAlt} mr={3} />
                    Project Resources
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Card
                      as="a"
                      href={project.github}
                      target="_blank"
                      variant="outline"
                      borderColor="var(--color-glassBorder)"
                      className="hover-lift"
                      cursor="pointer"
                    >
                      <CardBody>
                        <HStack spacing={3}>
                          <Icon as={FaGithub} boxSize={8} color="var(--color-primary)" />
                          <Box>
                            <Heading size="sm" color="var(--color-accent)">
                              GitHub Repository
                            </Heading>
                            <Text fontSize="sm" color="var(--color-textSecondary)">
                              Complete source code with documentation
                            </Text>
                          </Box>
                        </HStack>
                      </CardBody>
                    </Card>
                    
                    {project.demo && (
                      <Card
                        as="a"
                        href={project.demo}
                        target="_blank"
                        variant="outline"
                        borderColor="var(--color-glassBorder)"
                        className="hover-lift"
                        cursor="pointer"
                      >
                        <CardBody>
                          <HStack spacing={3}>
                            <Icon as={FaRocket} boxSize={8} color="var(--color-primary)" />
                            <Box>
                              <Heading size="sm" color="var(--color-accent)">
                                Live Demo
                              </Heading>
                              <Text fontSize="sm" color="var(--color-textSecondary)">
                                See the project in action
                              </Text>
                            </Box>
                          </HStack>
                        </CardBody>
                      </Card>
                    )}
                  </SimpleGrid>
                </Box>
                
                {/* README Preview */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaBook} mr={3} />
                    Documentation Highlights
                  </Heading>
                  <Card variant="outline" borderColor="var(--color-glassBorder)">
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <Text color="var(--color-text)">
                          The project includes comprehensive documentation covering:
                        </Text>
                        <List spacing={2}>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Installation and setup instructions
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            API documentation and usage examples
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Architecture diagrams and design decisions
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Testing strategies and coverage reports
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaCheckCircle} color="var(--color-primary)" />
                            Deployment guides and best practices
                          </ListItem>
                        </List>
                      </VStack>
                    </CardBody>
                  </Card>
                </Box>
                
                {/* Next Steps */}
                <Box>
                  <Heading size="lg" mb={6} color="var(--color-accent)">
                    <Icon as={FaRocket} mr={3} />
                    How This Project Applies to Real Work
                  </Heading>
                  <Alert
                    status="info"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    borderRadius="xl"
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Ready for Production
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      The skills and patterns learned in this project are directly applicable to
                      building production systems. I can help you implement similar solutions
                      tailored to your specific business needs.
                    </AlertDescription>
                    <Button
                      as="a"
                      href="/#contact"
                      colorScheme="cyan"
                      mt={4}
                      size="sm"
                    >
                      Let's Discuss Your Project
                    </Button>
                  </Alert>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        {/* Progress Indicator */}
        <Box mt={20} pt={10} borderTop="1px solid" borderColor="var(--color-glassBorder)">
          <VStack spacing={6}>
            <Heading size="md" color="var(--color-accent)">
              Certification Progress
            </Heading>
            <Box w="full" maxW="600px">
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" color="var(--color-textSecondary)">
                  Project {project.id} of 10
                </Text>
                <Text fontSize="sm" color="var(--color-primary)" fontWeight="bold">
                  {project.id * 10}% Complete
                </Text>
              </HStack>
              <Progress
                value={project.id * 10}
                size="sm"
                colorScheme="blue"
                borderRadius="full"
                hasStripe
                isAnimated
              />
            </Box>
            
            {/* Navigation to other projects */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
              {project.id > 1 && (
                <Button
                  variant="outline"
                  leftIcon={<FaArrowLeft />}
                  onClick={() => navigate(`/projects/${project.id - 1}`)}
                >
                  Previous Project
                </Button>
              )}
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => navigate('/#educational-projects')}
              >
                All Projects
              </Button>
              {project.id < 10 && (
                <Button
                  variant="outline"
                  rightIcon={<FaChevronRight />}
                  onClick={() => navigate(`/projects/${project.id + 1}`)}
                >
                  Next Project
                </Button>
              )}
            </SimpleGrid>
          </VStack>
        </Box>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default EducationalProjectDetail;