import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import { FaPalette } from 'react-icons/fa';
import { useColorPalette } from '../context/ColorPaletteContext';

const ColorPaletteSelector = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentPalette, changePalette, availablePalettes } = useColorPalette();

  const PalettePreview = ({ paletteName, palette }) => {
    const isActive = currentPalette === paletteName;
    
    return (
      <Button
        onClick={() => {
          changePalette(paletteName);
          onClose();
        }}
        p={4}
        height="auto"
        variant="unstyled"
        borderRadius="lg"
        border="2px solid"
        borderColor={isActive ? palette.colors.primary : 'transparent'}
        bg={palette.colors.glassBg}
        backdropFilter="blur(10px)"
        _hover={{
          borderColor: palette.colors.primary,
          transform: 'scale(1.05)',
        }}
        transition="all 0.3s"
      >
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="bold" fontSize="sm" color={palette.colors.text}>
            {palette.name}
          </Text>
          <HStack spacing={1}>
            <Box
              w={6}
              h={6}
              borderRadius="full"
              bg={palette.colors.background}
              border="1px solid"
              borderColor={palette.colors.glassBorder}
            />
            <Box
              w={6}
              h={6}
              borderRadius="full"
              bg={palette.colors.primary}
            />
            <Box
              w={6}
              h={6}
              borderRadius="full"
              bg={palette.colors.secondary}
            />
            <Box
              w={6}
              h={6}
              borderRadius="full"
              bg={palette.colors.accent}
            />
          </HStack>
        </VStack>
      </Button>
    );
  };

  return (
    <>
      {/* Floating button */}
      <Tooltip label="Change color palette" placement="left">
        <IconButton
          icon={<FaPalette />}
          onClick={onOpen}
          position="fixed"
          bottom={8}
          right={8}
          size="lg"
          borderRadius="full"
          bg="var(--color-glassBg)"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="var(--color-glassBorder)"
          color="var(--color-primary)"
          _hover={{
            transform: 'scale(1.1)',
            bg: 'var(--color-primary)',
            color: 'var(--color-background)',
          }}
          zIndex={100}
          aria-label="Color palette selector"
        />
      </Tooltip>

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent
          bg="var(--color-background)"
          borderLeft="1px solid"
          borderColor="var(--color-glassBorder)"
        >
          <DrawerCloseButton color="var(--color-text)" />
          <DrawerHeader color="var(--color-text)">
            Choose Color Palette
          </DrawerHeader>

          <DrawerBody>
            <SimpleGrid columns={2} spacing={4}>
              {Object.entries(availablePalettes).map(([paletteName, palette]) => (
                <PalettePreview
                  key={paletteName}
                  paletteName={paletteName}
                  palette={palette}
                />
              ))}
            </SimpleGrid>

            <Box mt={8} p={4} borderRadius="lg" bg="var(--color-glassBg)">
              <Text fontSize="sm" color="var(--color-textSecondary)">
                💡 Tip: Your color preference is saved automatically and will persist
                across sessions.
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ColorPaletteSelector;