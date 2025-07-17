import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Flex,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FaPython, 
  FaDocker, 
  FaGitAlt,
  FaAws,
  FaDatabase,
  FaChartLine
} from 'react-icons/fa';
// Removed Si icons temporarily to fix white screen issue
import { BiNetworkChart } from 'react-icons/bi';
import { AiOutlineRobot } from 'react-icons/ai';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const SkillCard = ({ icon, name, level, color, index }) => {
  const bgHover = useColorModeValue('gray.100', 'whiteAlpha.100');
  const [ref, isInView] = useScrollAnimation();
  
  return (
    <Box
      ref={ref}
      className={`glass glass-hover hover-lift ${isInView ? 'scroll-animate in-view' : 'scroll-animate'}`}
      p={6}
      borderRadius="xl"
      transition="all 0.3s"
      _hover={{ bg: bgHover, transform: 'translateY(-4px)' }}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <VStack spacing={4}>
        <Icon 
          as={icon} 
          w={12} 
          h={12} 
          color={color || 'var(--color-primary)'}
        />
        <Text fontWeight="bold" color="var(--color-accent)">
          {name}
        </Text>
        <Box w="full">
          <Progress 
            value={level} 
            size="sm" 
            colorScheme="cyan"
            borderRadius="full"
            bg="var(--color-background-light)"
          />
        </Box>
      </VStack>
    </Box>
  );
};

const About = () => {
  const skills = {
    "AI & Machine Learning": [
      { name: "TensorFlow", icon: FaPython, level: 90 },
      { name: "PyTorch", icon: FaPython, level: 85 },
      { name: "Scikit-learn", icon: FaPython, level: 95 },
      { name: "Hugging Face", icon: FaPython, level: 80 },
    ],
    "Data & Analytics": [
      { name: "Python", icon: FaPython, level: 95 },
      { name: "Pandas", icon: FaChartLine, level: 90 },
      { name: "NumPy", icon: FaChartLine, level: 90 },
      { name: "SQL", icon: FaDatabase, level: 85 },
    ],
    "MLOps & DevOps": [
      { name: "Docker", icon: FaDocker, level: 85 },
      { name: "Kubernetes", icon: FaDocker, level: 75 },
      { name: "MLflow", icon: FaChartLine, level: 80 },
      { name: "Airflow", icon: FaChartLine, level: 75 },
    ],
    "Cloud & Tools": [
      { name: "Azure", icon: FaAws, level: 80 },
      { name: "AWS", icon: FaAws, level: 75 },
      { name: "Git", icon: FaGitAlt, level: 90 },
      { name: "Streamlit", icon: FaPython, level: 85 },
    ],
  };

  const expertise = [
    {
      icon: AiOutlineRobot,
      title: "Artificial Intelligence",
      description: "Deep learning, computer vision, NLP, and generative AI for innovative solutions."
    },
    {
      icon: FaAws,
      title: "Cloud",
      description: "Scalable cloud architectures on Azure, AWS, and GCP for AI deployments."
    },
    {
      icon: FaDocker,
      title: "MLOps & Automation",
      description: "End-to-end ML pipelines, CI/CD, containerization, and workflow automation."
    },
  ];

  return (
    <Box id="about" py={20} bg="var(--color-background-dark)">
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          {/* Section Header */}
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="var(--color-accent)">
              About Me
            </Heading>
            <Text color="var(--color-secondary)" fontSize="lg" maxW="3xl" mx="auto">
              AI Engineer passionate about innovation and the impact of artificial 
              intelligence technologies. With expertise in machine learning, deep learning, 
              and MLOps, I transform data into concrete solutions.
            </Text>
          </VStack>

          {/* Expertise Areas */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {expertise.map((area, index) => (
              <Box
                key={index}
                className="glass"
                p={8}
                borderRadius="xl"
                textAlign="center"
              >
                <Icon
                  as={area.icon}
                  w={16}
                  h={16}
                  color="var(--color-primary)"
                  mb={4}
                />
                <Heading size="md" mb={3} color="var(--color-accent)">
                  {area.title}
                </Heading>
                <Text color="var(--color-secondary)" fontSize="sm">
                  {area.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* Skills Section */}
          <VStack spacing={12} align="stretch">
            <Heading size="xl" color="var(--color-accent)" textAlign="center">
              Technical Skills
            </Heading>
            
            {Object.entries(skills).map(([category, categorySkills]) => (
              <VStack key={category} spacing={6} align="stretch">
                <Heading size="lg" color="var(--color-primary)">
                  {category}
                </Heading>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                  {categorySkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      icon={skill.icon}
                      name={skill.name}
                      level={skill.level}
                      index={index}
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            ))}
          </VStack>

          {/* Additional Info */}
          <Box
            className="glass"
            p={8}
            borderRadius="xl"
            textAlign="center"
          >
            <VStack spacing={4}>
              <Heading size="lg" color="var(--color-accent)">
                Education & Certifications
              </Heading>
              <Text color="var(--color-secondary)" maxW="2xl">
                OC CentraleSupélec AI Engineering graduate with 10 professional projects. 
                Continuous learning on the latest advances in generative AI and LLMs. 
                Bachelor's degree in Mathematics and Computer Science from University of Le Havre.
              </Text>
              <HStack spacing={8} justify="center" flexWrap="wrap" pt={4}>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="var(--color-primary)">
                    10+
                  </Text>
                  <Text color="var(--color-secondary)">AI Projects</Text>
                </VStack>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="var(--color-primary)">
                    5+
                  </Text>
                  <Text color="var(--color-secondary)">Cloud Technologies</Text>
                </VStack>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="var(--color-primary)">
                    5+
                  </Text>
                  <Text color="var(--color-secondary)">Years of Experience</Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default About;