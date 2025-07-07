import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      background: '#0F172A', // Navy profond
      primary: '#22D3EE', // Cyan néon
      secondary: '#64748B', // Gris cool
      accent: '#F4F4F4', // Gris clair
      // Additional shades
      primaryDark: '#0891B2',
      primaryLight: '#67E8F9',
      backgroundLight: '#1E293B',
      backgroundDark: '#020617',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    mono: `'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'brand.background',
        color: 'brand.accent',
        fontSize: '16px',
        lineHeight: '1.6',
      },
      a: {
        color: 'brand.primary',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
      variants: {
        primary: {
          bg: 'brand.primary',
          color: 'brand.background',
          _hover: {
            bg: 'brand.primaryDark',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        },
        secondary: {
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'brand.primary',
          color: 'brand.primary',
          _hover: {
            bg: 'brand.primary',
            color: 'brand.background',
          },
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: 'brand.accent',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        p: 6,
        borderRadius: 'xl',
        boxShadow: 'xl',
      },
      variants: {
        glass: {
          bg: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
});

export default theme;