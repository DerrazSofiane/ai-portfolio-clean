import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  Box,
  Link,
  Icon,
  Heading,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Image,
  AspectRatio,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const navigate = useNavigate();
  
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
      <ModalContent bg="var(--color-background-light)" borderColor="var(--color-glassBorder)" borderWidth={1}>
        <ModalHeader color="var(--color-accent)" fontSize="2xl">
          {project.title}
        </ModalHeader>
        <ModalCloseButton color="var(--color-primary)" />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Project Thumbnail */}
            <AspectRatio ratio={16 / 9}>
              <Box
                bg="var(--color-background)"
                borderRadius="lg"
                position="relative"
                overflow="hidden"
              >
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    fallbackSrc={`/images/projects/default-${project.category}.png`}
                  />
                ) : (
                  <Box
                    w="100%"
                    h="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text color="var(--color-secondary)" fontSize="6xl" opacity={0.3}>
                      {project.title.charAt(0)}
                    </Text>
                  </Box>
                )}
                <HStack position="absolute" top={4} right={4} spacing={2}>
                  <Badge
                    colorScheme="cyan"
                    fontSize="sm"
                    px={3}
                    py={1}
                    bg="rgba(6, 182, 212, 0.9)"
                  >
                    {project.category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                  {project.type && (
                    <Badge
                      colorScheme={project.type === 'professional' ? 'green' : 'blue'}
                      fontSize="sm"
                      px={3}
                      py={1}
                      bg={project.type === 'professional' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(59, 130, 246, 0.9)'}
                    >
                      {project.type === 'professional' ? 'Professional' : 'Educational'}
                    </Badge>
                  )}
                </HStack>
              </Box>
            </AspectRatio>

            {/* Client and Period Info */}
            {(project.displayClient || project.displayPeriod) && (
              <HStack spacing={4} flexWrap="wrap">
                {project.displayClient && (
                  <Box>
                    <Text fontSize="sm" color="var(--color-primary)" fontWeight="bold">
                      Client
                    </Text>
                    <Text color="var(--color-secondary)">
                      {project.displayClient}
                    </Text>
                  </Box>
                )}
                {project.displayPeriod && (
                  <Box>
                    <Text fontSize="sm" color="var(--color-primary)" fontWeight="bold">
                      Period
                    </Text>
                    <Text color="var(--color-secondary)">
                      {project.displayPeriod}
                    </Text>
                  </Box>
                )}
              </HStack>
            )}

            {/* Description */}
            <VStack spacing={4} align="stretch">
              <Box>
                <Heading size="md" color="var(--color-primary)" mb={2}>
                  Description
                </Heading>
                <Text color="var(--color-secondary)" lineHeight="tall">
                  {project.longDescription || project.description}
                </Text>
              </Box>

              {/* Technologies */}
              <Box>
                <Heading size="md" color="var(--color-primary)" mb={3}>
                  Technologies Used
                </Heading>
                <HStack spacing={2} flexWrap="wrap">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="solid"
                      colorScheme="cyan"
                      fontSize="sm"
                      px={3}
                      py={1}
                      mb={2}
                    >
                      {tech}
                    </Badge>
                  ))}
                </HStack>
              </Box>

              {/* Challenges */}
              {project.challenges && (
                <Box>
                  <Heading size="md" color="var(--color-primary)" mb={3}>
                    Challenges
                  </Heading>
                  <Text color="var(--color-secondary)" lineHeight="tall">
                    {project.challenges}
                  </Text>
                </Box>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <Box>
                  <Heading size="md" color="var(--color-primary)" mb={3}>
                    Key Results
                  </Heading>
                  <List spacing={2}>
                    {project.results.map((result, index) => (
                      <ListItem key={index} color="var(--color-secondary)">
                        <ListIcon as={FaCheckCircle} color="green.400" />
                        {result}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <Box>
                  <Heading size="md" color="var(--color-primary)" mb={3}>
                    Key Features
                  </Heading>
                  <List spacing={2}>
                    {project.features.map((feature, index) => (
                      <ListItem key={index} color="var(--color-secondary)">
                        <ListIcon as={FaCheckCircle} color="cyan.400" />
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Links */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} pt={4}>
                {project.github && (
                  <Button
                    as={Link}
                    href={project.github}
                    isExternal
                    variant="secondary"
                    leftIcon={<FaGithub />}
                    size="md"
                    w="full"
                    _hover={{ textDecoration: 'none' }}
                  >
                    View Code
                  </Button>
                )}
                {project.demo && (
                  <Button
                    as={Link}
                    href={project.demo}
                    isExternal
                    variant="primary"
                    leftIcon={<FaExternalLinkAlt />}
                    size="md"
                    w="full"
                    _hover={{ textDecoration: 'none' }}
                  >
                    View Demo
                  </Button>
                )}
              </SimpleGrid>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button 
            variant="solid" 
            colorScheme="blue"
            onClick={() => {
              navigate(`/projects/${project.id}`);
              onClose();
            }}
          >
            View More Details
          </Button>
          <Button variant="ghost" onClick={onClose} color="var(--color-secondary)">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;