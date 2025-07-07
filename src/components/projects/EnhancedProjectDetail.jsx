import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Flex,
  Icon,
  Link,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Code,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { FiArrowLeft, FiExternalLink, FiGithub, FiPlay, FiDownload, FiShare2, FiUsers, FiCalendar, FiAward } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const EnhancedProjectDetail = ({ project, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Enhanced metrics with before/after comparisons
  const renderMetrics = () => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {project.metrics?.map((metric, index) => (
        <Box
          key={index}
          p={6}
          bg="rgba(255, 255, 255, 0.05)"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          border="1px solid rgba(255, 255, 255, 0.1)"
        >
          <Stat>
            <StatLabel color="gray.400">{metric.label}</StatLabel>
            <StatNumber fontSize="2xl" color="primary.400">
              {metric.value}
            </StatNumber>
            {metric.change && (
              <StatHelpText>
                <StatArrow type={metric.change > 0 ? 'increase' : 'decrease'} />
                {Math.abs(metric.change)}% {metric.baseline && `from ${metric.baseline}`}
              </StatHelpText>
            )}
            {metric.impact && (
              <Text fontSize="sm" color="gray.500" mt={2}>
                {metric.impact}
              </Text>
            )}
          </Stat>
        </Box>
      ))}
    </SimpleGrid>
  );

  // Interactive media gallery
  const renderMediaGallery = () => (
    <VStack spacing={6} align="stretch">
      {project.media?.length > 0 && (
        <>
          <Box
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            cursor="pointer"
            onClick={onOpen}
          >
            <Image
              src={project.media[selectedImage].url}
              alt={project.media[selectedImage].caption}
              w="100%"
              h="400px"
              objectFit="cover"
            />
            <Box
              position="absolute"
              top={4}
              right={4}
              bg="rgba(0, 0, 0, 0.6)"
              color="white"
              px={3}
              py={1}
              borderRadius="md"
              fontSize="sm"
            >
              Click to enlarge
            </Box>
          </Box>
          
          <SimpleGrid columns={4} spacing={3}>
            {project.media.map((media, index) => (
              <Box
                key={index}
                borderRadius="md"
                overflow="hidden"
                cursor="pointer"
                onClick={() => setSelectedImage(index)}
                opacity={selectedImage === index ? 1 : 0.6}
                transition="opacity 0.2s"
                _hover={{ opacity: 1 }}
              >
                <Image
                  src={media.thumbnail || media.url}
                  alt={media.caption}
                  w="100%"
                  h="80px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}

      {project.demoUrl && (
        <Button
          leftIcon={<FiPlay />}
          size="lg"
          colorScheme="primary"
          onClick={() => window.open(project.demoUrl, '_blank')}
        >
          Watch Live Demo
        </Button>
      )}
    </VStack>
  );

  // Enhanced code examples with syntax highlighting
  const renderCodeExamples = () => (
    <VStack spacing={6} align="stretch">
      {project.codeExamples?.map((example, index) => (
        <Box key={index}>
          <HStack justify="space-between" mb={3}>
            <Heading size="sm">{example.title}</Heading>
            <Badge colorScheme="purple">{example.language}</Badge>
          </HStack>
          <Text fontSize="sm" color="gray.400" mb={3}>
            {example.description}
          </Text>
          <Box borderRadius="lg" overflow="hidden">
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
            <Alert status="info" mt={3} bg="rgba(99, 179, 237, 0.1)">
              <AlertIcon />
              <Box>
                <AlertTitle fontSize="sm">Key Insight</AlertTitle>
                <AlertDescription fontSize="sm">
                  {example.explanation}
                </AlertDescription>
              </Box>
            </Alert>
          )}
        </Box>
      ))}
    </VStack>
  );

  // Architecture and technical decisions
  const renderArchitecture = () => (
    <VStack spacing={6} align="stretch">
      {project.architecture && (
        <Box>
          <Heading size="md" mb={4}>System Architecture</Heading>
          <Image
            src={project.architecture.diagram}
            alt="System Architecture"
            borderRadius="lg"
            mb={4}
          />
          <Text color="gray.300">{project.architecture.description}</Text>
        </Box>
      )}

      {project.techDecisions && (
        <Box>
          <Heading size="md" mb={4}>Technical Decisions</Heading>
          <VStack spacing={4} align="stretch">
            {project.techDecisions.map((decision, index) => (
              <Box
                key={index}
                p={4}
                bg="rgba(255, 255, 255, 0.05)"
                borderRadius="lg"
                border="1px solid rgba(255, 255, 255, 0.1)"
              >
                <Heading size="sm" mb={2}>{decision.choice}</Heading>
                <Text fontSize="sm" color="gray.400" mb={2}>
                  <strong>Rationale:</strong> {decision.rationale}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  <strong>Trade-offs:</strong> {decision.tradeoffs}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );

  // Testimonials and feedback
  const renderTestimonials = () => (
    <VStack spacing={6} align="stretch">
      {project.testimonials?.map((testimonial, index) => (
        <Box
          key={index}
          p={6}
          bg="rgba(255, 255, 255, 0.05)"
          borderRadius="xl"
          border="1px solid rgba(255, 255, 255, 0.1)"
        >
          <Text fontSize="lg" mb={4} fontStyle="italic">
            "{testimonial.quote}"
          </Text>
          <HStack>
            <Box>
              <Text fontWeight="bold">{testimonial.author}</Text>
              <Text fontSize="sm" color="gray.400">
                {testimonial.role} at {testimonial.company}
              </Text>
            </Box>
          </HStack>
        </Box>
      ))}
    </VStack>
  );

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Breadcrumb mb={4}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={onBack}>Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{project.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <HStack justify="space-between" align="start" flexWrap="wrap">
            <VStack align="start" spacing={3}>
              <Heading size="2xl">{project.title}</Heading>
              <HStack spacing={4} flexWrap="wrap">
                <HStack>
                  <Icon as={FiUsers} />
                  <Text>{project.client}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiCalendar} />
                  <Text>{project.period}</Text>
                </HStack>
                {project.teamSize && (
                  <HStack>
                    <Icon as={FiUsers} />
                    <Text>{project.teamSize} team members</Text>
                  </HStack>
                )}
                {project.awards && (
                  <HStack>
                    <Icon as={FiAward} />
                    <Text>{project.awards}</Text>
                  </HStack>
                )}
              </HStack>
            </VStack>
            
            <HStack spacing={3}>
              {project.githubUrl && (
                <Button
                  leftIcon={<FiGithub />}
                  variant="outline"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  View Code
                </Button>
              )}
              {project.caseStudyUrl && (
                <Button
                  leftIcon={<FiDownload />}
                  variant="outline"
                  onClick={() => window.open(project.caseStudyUrl, '_blank')}
                >
                  Download Case Study
                </Button>
              )}
              <Button
                leftIcon={<FiShare2 />}
                variant="outline"
                onClick={() => {
                  navigator.share({
                    title: project.title,
                    text: project.description,
                    url: window.location.href,
                  });
                }}
              >
                Share
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* Enhanced Tabs */}
        <Tabs variant="soft-rounded" colorScheme="primary">
          <TabList flexWrap="wrap">
            <Tab>Overview</Tab>
            <Tab>Metrics & Impact</Tab>
            <Tab>Technical Deep Dive</Tab>
            <Tab>Architecture</Tab>
            <Tab>Code Examples</Tab>
            <Tab>Media Gallery</Tab>
            {project.testimonials && <Tab>Testimonials</Tab>}
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Text fontSize="lg" color="gray.300">
                  {project.longDescription}
                </Text>
                
                <Box>
                  <Heading size="md" mb={4}>Key Features</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {project.features?.map((feature, index) => (
                      <HStack key={index} align="start">
                        <Box
                          w={2}
                          h={2}
                          bg="primary.400"
                          borderRadius="full"
                          mt={2}
                          flexShrink={0}
                        />
                        <Text>{feature}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>Technologies Used</Heading>
                  <Flex flexWrap="wrap" gap={2}>
                    {project.technologies?.map((tech, index) => (
                      <Badge
                        key={index}
                        px={3}
                        py={1}
                        borderRadius="full"
                        bg="rgba(99, 179, 237, 0.1)"
                        color="primary.300"
                        border="1px solid"
                        borderColor="primary.300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              {renderMetrics()}
            </TabPanel>

            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="md" mb={4}>Technical Implementation</Heading>
                  <Text color="gray.300">{project.technicalDetails}</Text>
                </Box>
                
                <Box>
                  <Heading size="md" mb={4}>Challenges & Solutions</Heading>
                  <Text color="gray.300">{project.challenges}</Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>Performance Optimizations</Heading>
                  <VStack spacing={3} align="stretch">
                    {project.optimizations?.map((opt, index) => (
                      <Box key={index}>
                        <Text fontWeight="bold">{opt.technique}</Text>
                        <Text fontSize="sm" color="gray.400">{opt.result}</Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              {renderArchitecture()}
            </TabPanel>

            <TabPanel>
              {renderCodeExamples()}
            </TabPanel>

            <TabPanel>
              {renderMediaGallery()}
            </TabPanel>

            {project.testimonials && (
              <TabPanel>
                {renderTestimonials()}
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="transparent">
          <ModalCloseButton />
          <ModalBody p={0}>
            <Image
              src={project.media?.[selectedImage]?.url}
              alt={project.media?.[selectedImage]?.caption}
              w="100%"
              borderRadius="lg"
            />
            <Text
              mt={2}
              textAlign="center"
              color="white"
              bg="rgba(0, 0, 0, 0.8)"
              p={2}
              borderRadius="md"
            >
              {project.media?.[selectedImage]?.caption}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default EnhancedProjectDetail;