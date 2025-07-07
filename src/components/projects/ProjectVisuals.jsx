import React from 'react';
import {
  Box,
  Image,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FaExpand, FaPlay } from 'react-icons/fa';

const ProjectVisuals = ({ visuals }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = React.useState(null);

  const openLightbox = (visual) => {
    setSelectedImage(visual);
    onOpen();
  };

  // Group visuals by category
  const visualsByCategory = {
    screenshots: visuals?.filter(v => v.category === 'screenshot') || [],
    architecture: visuals?.filter(v => v.category === 'architecture') || [],
    metrics: visuals?.filter(v => v.category === 'metrics') || [],
    demos: visuals?.filter(v => v.category === 'demo') || [],
  };

  const categories = [
    { key: 'screenshots', label: 'Screenshots', icon: '🖼️' },
    { key: 'architecture', label: 'Architecture', icon: '🏗️' },
    { key: 'metrics', label: 'Metrics', icon: '📊' },
    { key: 'demos', label: 'Demos', icon: '🎬' },
  ];

  return (
    <Box>
      <Tabs variant="soft-rounded" colorScheme="cyan">
        <TabList mb={6}>
          {categories.map(cat => (
            visualsByCategory[cat.key].length > 0 && (
              <Tab key={cat.key}>
                <HStack spacing={2}>
                  <Text>{cat.icon}</Text>
                  <Text>{cat.label}</Text>
                  <Badge>{visualsByCategory[cat.key].length}</Badge>
                </HStack>
              </Tab>
            )
          ))}
        </TabList>

        <TabPanels>
          {categories.map(cat => (
            visualsByCategory[cat.key].length > 0 && (
              <TabPanel key={cat.key} p={0}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {visualsByCategory[cat.key].map((visual, index) => (
                    <VStack
                      key={index}
                      align="stretch"
                      spacing={3}
                      p={4}
                      bg="var(--color-glassBg)"
                      borderRadius="lg"
                      className="glass hover-lift"
                      cursor="pointer"
                      onClick={() => openLightbox(visual)}
                    >
                      <Box position="relative" borderRadius="md" overflow="hidden">
                        {visual.type === 'video' ? (
                          <Box
                            position="relative"
                            paddingBottom="56.25%"
                            bg="black"
                          >
                            <IconButton
                              icon={<FaPlay />}
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                              size="lg"
                              isRound
                              colorScheme="cyan"
                              aria-label="Play video"
                            />
                            {visual.thumbnail && (
                              <Image
                                src={visual.thumbnail}
                                alt={visual.title}
                                position="absolute"
                                top={0}
                                left={0}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                opacity={0.7}
                              />
                            )}
                          </Box>
                        ) : (
                          <>
                            <Image
                              src={visual.thumbnail || visual.url}
                              alt={visual.title}
                              w="100%"
                              h="200px"
                              objectFit="cover"
                            />
                            <IconButton
                              icon={<FaExpand />}
                              position="absolute"
                              top={2}
                              right={2}
                              size="sm"
                              colorScheme="cyan"
                              aria-label="Expand image"
                            />
                          </>
                        )}
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" color="var(--color-text)">
                          {visual.title}
                        </Text>
                        <Text fontSize="sm" color="var(--color-textSecondary)">
                          {visual.description}
                        </Text>
                      </VStack>
                    </VStack>
                  ))}
                </SimpleGrid>
              </TabPanel>
            )
          ))}
        </TabPanels>
      </Tabs>

      {/* Lightbox Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay bg="rgba(0, 0, 0, 0.9)" />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color="white" size="lg" />
          <ModalBody p={0}>
            {selectedImage && (
              <VStack spacing={4}>
                {selectedImage.type === 'video' ? (
                  <Box w="100%" position="relative" paddingBottom="56.25%">
                    <iframe
                      src={selectedImage.url}
                      title={selectedImage.title}
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                      allowFullScreen
                    />
                  </Box>
                ) : (
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    maxW="100%"
                    maxH="80vh"
                    objectFit="contain"
                  />
                )}
                <VStack align="start" w="100%" p={4} bg="rgba(0, 0, 0, 0.8)" borderRadius="md">
                  <Text color="white" fontSize="lg" fontWeight="bold">
                    {selectedImage.title}
                  </Text>
                  <Text color="gray.300">
                    {selectedImage.description}
                  </Text>
                </VStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProjectVisuals;