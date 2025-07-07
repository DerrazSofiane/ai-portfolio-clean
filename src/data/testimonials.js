export const testimonials = [
  {
    id: 1,
    name: "Adama Barry",
    role: "Président Fondateur",
    company: "Fonds d'Aide au Développement du Sport en Afrique - FADSA",
    relationship: "Managed Sofiane directly",
    date: "February 6, 2020",
    content: "Sofiane est un collaborateur sérieux, rigoureux qui par ses compétences a permis à notre organisation d'améliorer son réseau informatique et numérique. A cela s'ajoute de bonnes capacités en gestion de projet. Il sait être force de proposition avec des idées innovantes. Il fait parti des éléments qui apportent un vrai plus à notre structure.",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGJ3S49KKpjSQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1682745055979?e=1756944000&v=beta&t=SKekAZa_P_8upEtK10DZjPV454u2bKaHk3xdTgE9RIA",
    linkedinUrl: null,
    highlights: ["Compétences techniques", "Gestion de projet", "Force de proposition"],
    featured: true,
    platform: "LinkedIn"
  },
  {
    id: 2,
    name: "Nicolas Baudy",
    role: "Client",
    company: "Parisjetaime",
    relationship: "Worked with Sofiane",
    date: "2021",
    content: "Sofiane est la personne qu'il vous faut pour faire avancer vos sujets de façon agile et intelligente. Toujours disponible (et de bonne humeur), il est focus et obstiné pour atteindre ses objectifs.",
    image: null,
    linkedinUrl: null,
    highlights: ["Agilité", "Disponibilité", "Focus sur les objectifs"],
    featured: true,
    platform: "Malt"
  },
  {
    id: 3,
    name: "Romain Hochard",
    role: "UX/UI Designer",
    company: "IZI Solutions Renov",
    relationship: "Worked with Sofiane on different teams",
    date: "February 15, 2020",
    content: "Passionné et rigoureux, Sofiane a su faire preuve d'investissement et leadership tout au long de notre projet commun. Un véritable plaisir de travailler avec lui.",
    image: "https://media.licdn.com/dms/image/v2/C4D03AQGkOByczN_GHg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1554449289562?e=1756944000&v=beta&t=b6JINAYy6Fks8jite_Nm3h-8Ju6C6te68AQf5FXYquk",
    linkedinUrl: null,
    highlights: ["Leadership", "Investissement", "Collaboration"],
    featured: false,
    platform: "LinkedIn"
  },
  {
    id: 4,
    name: "Djogo Barry, PhD",
    role: "Leader",
    company: null,
    relationship: "Worked with Sofiane directly",
    date: "December 8, 2020",
    content: "Sofiane est une personne très professionnelle, animée d'une passion et d'une rigueur à tous les niveaux. C'est une personne que je recommande vivement !",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGcuOzzhTA3ow/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1691697363853?e=1756944000&v=beta&t=POQUs4QGJBlDmPwpwScDDm4y-CqJ3LfzDaeTxw31llg",
    linkedinUrl: null,
    highlights: ["Professionnalisme", "Passion", "Rigueur"],
    featured: false,
    platform: "LinkedIn"
  },
  {
    id: 5,
    name: "Vincent Boisbourdain, PhD",
    role: "Client",
    company: "Âdhavan Algorithmics",
    relationship: "Worked with Sofiane",
    date: "July 4, 2025",
    content: "Sofiane a su m'accompagner dans des missions de conseils complexes, de data science et l'intelligence artificielle, avec un très grand pragmatisme et une très grande efficacité. Avec un esprit toujours positif pour relever les défis, ça a été un très grand plaisir de travailler avec lui.",
    image: "https://dam.malt.com/obkheoa42w2372x3mqwp?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp",
    linkedinUrl: null,
    highlights: ["Data Science", "Intelligence Artificielle", "Pragmatisme", "Efficacité"],
    featured: true,
    platform: "Malt"
  }
];

// Helper functions
export const getFeaturedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.featured);
};

export const getTestimonialsByPlatform = (platform) => {
  return testimonials.filter(testimonial => 
    testimonial.platform === platform || (!testimonial.platform && platform === 'LinkedIn')
  );
};