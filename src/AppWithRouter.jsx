import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import App from './App';

// Lazy load the project detail page
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// Loading component
const PageLoading = () => (
  <Center h="100vh" bg="var(--color-background)">
    <Spinner 
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="var(--color-primary)"
      size="xl"
    />
  </Center>
);

function AppWithRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route 
        path="/projects/:projectId" 
        element={
          <Suspense fallback={<PageLoading />}>
            <ProjectDetail />
          </Suspense>
        } 
      />
    </Routes>
  );
}

export default AppWithRouter;