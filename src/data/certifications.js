import { getAssetPath } from '../utils/assetPath';

// Certifications data
export const certifications = [
  {
    id: 'aws-solutions-architect-professional',
    name: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services',
    credentialId: '',
    credlyBadgeUrl: 'https://www.credly.com/badges/3b2e89eb-3488-4856-a5bb-681024cbbcdf',
    imageUrl: getAssetPath('/images/certifications/aws-solutions-architect-professional.png'),
    skills: ['AWS Architecture', 'Cloud Solutions', 'Multi-Platform Design', 'Technical Strategy'],
    description: 'Extensive understanding of designing technical strategies to accomplish specific business goals with the ability to design solutions across multiple platforms and providers.',
  },
  {
    id: 'big-data-foundations',
    name: 'Big Data Foundations',
    issuer: 'IBM',
    credentialId: '',
    credlyBadgeUrl: 'https://www.credly.com/badges/bd9d2326-6945-4d57-8793-f0e6f0f48897',
    imageUrl: getAssetPath('/images/certifications/big-data-foundations.png'),
    skills: ['Big Data', 'Data Analytics', 'Data Integration', 'Data Governance'],
    description: 'Understanding of Big Data concepts and their applications to gain insight for providing better service to customers, including variety, velocity, and volume of data.',
  },
  {
    id: 'ibm-blockchain-essentials',
    name: 'IBM Blockchain Essentials',
    issuer: 'IBM',
    credentialId: '',
    credlyBadgeUrl: 'https://www.credly.com/badges/bc60c748-79a6-4cca-aefa-d015a74b403d',
    imageUrl: getAssetPath('/images/certifications/ibm-blockchain-essentials.png'),
    skills: ['Blockchain', 'Distributed Ledger', 'Smart Contracts', 'Business Applications'],
    description: 'Understanding of Blockchain principles and practices, distributed ledger systems, and how assets can be transferred in a Blockchain network.',
  },
  {
    id: 'python-data-science',
    name: 'Python for Data Science',
    issuer: 'IBM',
    credentialId: '',
    credlyBadgeUrl: 'https://www.credly.com/badges/bef5e634-b92e-4578-b0e6-7eb77ee8b1f0',
    imageUrl: getAssetPath('/images/certifications/python-data-science.png'),
    skills: ['Python', 'Data Analysis', 'Jupyter Notebooks', 'Data Science'],
    description: 'Ability to write Python scripts and perform basic hands-on data analysis using IBM\'s Jupyter-based lab environment.',
  },
  {
    id: 'hadoop-foundations',
    name: 'Hadoop Foundations',
    issuer: 'IBM',
    credentialId: '',
    credlyBadgeUrl: 'https://www.credly.com/users/sofiane-derraz/badges',
    imageUrl: getAssetPath('/images/certifications/hadoop-foundations.png'),
    skills: ['Hadoop', 'Big Data Processing', 'Distributed Computing', 'MapReduce'],
    description: 'Foundational knowledge of Hadoop ecosystem and its components for processing large-scale data sets in distributed computing environments.',
  },
];

// Helper function to get featured certifications
export const getFeaturedCertifications = () => {
  return certifications.slice(0, 3); // Return first 3 certifications as featured
};

// Helper function to group certifications by issuer
export const getCertificationsByIssuer = () => {
  return certifications.reduce((acc, cert) => {
    if (!acc[cert.issuer]) {
      acc[cert.issuer] = [];
    }
    acc[cert.issuer].push(cert);
    return acc;
  }, {});
};