import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/glassmorphism.css'
import './styles/animations.css'
import dynamicTheme from './styles/dynamicTheme'
import { ColorPaletteProvider } from './context/ColorPaletteContext'
import AppWithRouter from './AppWithRouter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorPaletteProvider>
      <ChakraProvider theme={dynamicTheme}>
        <BrowserRouter basename="/ai-portfolio-clean">
          <AppWithRouter />
        </BrowserRouter>
      </ChakraProvider>
    </ColorPaletteProvider>
  </React.StrictMode>,
)