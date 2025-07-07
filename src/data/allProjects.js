import { projects as openClassroomsProjects } from './projects';
import { professionalProjects } from './professionalProjects';

// Combine all projects
export const allProjects = [
  ...professionalProjects.map(project => ({
    ...project,
    type: 'professional',
    displayPeriod: project.period,
    displayClient: project.client
  })),
  ...openClassroomsProjects.map(project => ({
    ...project,
    type: 'education',
    category: project.category.toLowerCase().replace(/\s+/g, '-'),
    displayPeriod: '2020-2022',
    displayClient: 'OpenClassrooms'
  }))
];

// Get all unique categories
const getAllCategories = () => {
  const categories = new Map();
  
  // Add professional categories
  professionalProjects.forEach(project => {
    const cat = project.category;
    if (!categories.has(cat)) {
      categories.set(cat, { 
        id: cat, 
        name: getCategoryDisplayName(cat), 
        count: 0,
        type: 'professional'
      });
    }
    categories.get(cat).count++;
  });
  
  // Add OpenClassrooms categories
  openClassroomsProjects.forEach(project => {
    const cat = project.category.toLowerCase().replace(/\s+/g, '-');
    if (!categories.has(cat)) {
      categories.set(cat, { 
        id: cat, 
        name: project.category, 
        count: 0,
        type: 'education'
      });
    }
    categories.get(cat).count++;
  });
  
  return Array.from(categories.values());
};

// Helper function to get display name for categories
const getCategoryDisplayName = (categoryId) => {
  const names = {
    'ai': 'AI/ML',
    'nlp': 'NLP',
    'mlops': 'MLOps',
    'data-viz': 'Data Visualization',
    'machine-learning': 'Machine Learning',
    'deep-learning': 'Deep Learning',
    'computer-vision': 'Computer Vision',
    'azure': 'Cloud/Azure',
    'strategy': 'AI Strategy'
  };
  return names[categoryId] || categoryId;
};

// Export categories with counts
export const projectCategories = [
  { 
    id: 'all', 
    name: 'All Projects', 
    count: allProjects.length,
    type: 'all'
  },
  { 
    id: 'professional', 
    name: 'Professional', 
    count: professionalProjects.length,
    type: 'filter'
  },
  { 
    id: 'education', 
    name: 'OpenClassrooms', 
    count: openClassroomsProjects.length,
    type: 'filter'
  },
  ...getAllCategories().sort((a, b) => b.count - a.count)
];

// Helper functions
export const getProjectsByCategory = (categoryId) => {
  if (categoryId === 'all') return allProjects;
  if (categoryId === 'professional') return allProjects.filter(p => p.type === 'professional');
  if (categoryId === 'education') return allProjects.filter(p => p.type === 'education');
  return allProjects.filter(p => p.category === categoryId);
};

export const getFeaturedProjects = () => {
  // Get 3 featured professional and 3 featured educational projects
  const featuredProfessional = allProjects
    .filter(p => p.type === 'professional' && p.featured)
    .slice(0, 3);
  const featuredEducation = allProjects
    .filter(p => p.type === 'education' && p.featured)
    .slice(0, 3);
  
  // Interleave them for better display
  const featured = [];
  for (let i = 0; i < Math.max(featuredProfessional.length, featuredEducation.length); i++) {
    if (i < featuredProfessional.length) featured.push(featuredProfessional[i]);
    if (i < featuredEducation.length) featured.push(featuredEducation[i]);
  }
  
  return featured;
};

// Search function
export const searchProjects = (query) => {
  const searchTerm = query.toLowerCase();
  return allProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
    (project.client && project.client.toLowerCase().includes(searchTerm))
  );
};