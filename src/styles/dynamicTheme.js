import { extendTheme } from '@chakra-ui/react';

const dynamicTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        fontSize: '16px',
        lineHeight: '1.6',
      },
      a: {
        color: 'var(--color-primary)',
        _hover: {
          textDecoration: 'underline',
        },
      },
      ':root': {
        // Default Tech & Futuristic palette
        '--color-background': '#0F172A',
        '--color-background-light': '#1E293B',
        '--color-background-dark': '#020617',
        '--color-primary': '#22D3EE',
        '--color-primary-dark': '#0891B2',
        '--color-secondary': '#64748B',
        '--color-accent': '#F4F4F4',
        '--color-text': '#F4F4F4',
        '--color-textSecondary': '#94A3B8',
        '--color-glassBg': 'rgba(15, 23, 42, 0.6)',
        '--color-glassBorder': 'rgba(100, 116, 139, 0.3)',
      },
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    mono: `'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
        transition: 'all 0.3s',
      },
      variants: {
        primary: {
          bg: 'var(--color-primary)',
          color: 'var(--color-background)',
          _hover: {
            filter: 'brightness(0.9)',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        },
        secondary: {
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'var(--color-primary)',
          color: 'var(--color-primary)',
          _hover: {
            bg: 'var(--color-primary)',
            color: 'var(--color-background)',
          },
        },
        glass: {
          bg: 'var(--color-glassBg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'var(--color-glassBorder)',
          color: 'var(--color-text)',
          _hover: {
            borderColor: 'var(--color-primary)',
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
          bg: 'var(--color-glassBg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'var(--color-glassBorder)',
        },
      },
    },
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
});

export default dynamicTheme;