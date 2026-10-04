// Contenu du portfolio, tiré du CV de Pierre Emmanuel Lebughe Litite.
// Pour mettre le site à jour, il suffit en général de modifier ce fichier.

export const person = {
  firstName: 'Pierre Emmanuel',
  lastName: 'Lebughe Litite',
  title: 'Ingénieur en géologie pétrolière',
  role: 'Géologue pétrolier junior',
  location: 'Kinshasa, République démocratique du Congo',
  email: 'Pierreemmanuellitite@gmail.com',
  phoneDisplay: '+243 82 030 4793',
  phoneHref: 'tel:+243820304793',
  whatsapp: 'https://wa.me/243820304793',
};

export const profile =
  "Ingénieur en géologie pétrolière formé à l'Institut du Pétrole et du Gaz, je lis le sous-sol comme un récit : " +
  'exploration, interprétation des données géologiques et géophysiques, caractérisation des systèmes pétroliers. ' +
  "Passé par le Ministère des Hydrocarbures et façonné par le terrain, je cherche aujourd'hui un poste de géologue pétrolier junior, " +
  'en restant ouvert aux autres domaines de la géologie.';

export const traits = ['Rigoureux', 'Analytique', 'Adaptable'];

export const education = {
  school: 'Institut du Pétrole et du Gaz',
  degree: 'Maîtrise en géologie pétrolière · Ingénieur',
  year: '2026',
  thesis:
    'Évaluation des systèmes pétroliers en offshore profond et caractérisation géophysique des pièges subtils à l’aide des méthodes sismiques',
  defense: 'Soutenu le 18 septembre 2026',
};

export const experience = {
  org: 'Ministère des Hydrocarbures',
  unit: 'Cabinet du Secrétaire général',
  role: 'Stagiaire',
  period: 'Octobre – novembre 2023',
  tasks: [
    'Participation aux réunions entre le Ministère et des entreprises privées du secteur pétrolier.',
    'Rédaction de correspondances administratives destinées à la signature du Secrétaire général.',
    'Élaboration d’un tableau de synthèse des activités pétrolières amont et aval en RDC.',
    'Recensement, pour chaque activité, des outils, contrats, qualifications et dispositions légales prévus par la législation congolaise sur les hydrocarbures.',
    'Familiarisation avec plusieurs blocs pétroliers de la RDC.',
  ],
};

export const fieldwork = {
  places: 'Kimpese & Matadi',
  steps: [
    {
      kicker: 'Sorties géologiques',
      title: 'Kimpese & Matadi',
      text: 'Travaux pratiques de pétrologie, pétrographie et levé géologique, au contact direct des affleurements.',
    },
    {
      kicker: 'Immersion',
      title: '5 à 9 jours sur le terrain',
      text: 'Observation, description et cartographie des formations, puis interprétation sur place.',
    },
    {
      kicker: 'Sous terre',
      title: 'La grotte de Wene',
      text: 'Exploration d’une grotte au village de Wene, à Matadi : la géologie vue de l’intérieur.',
    },
  ],
};

export const skillStrata = [
  {
    name: 'Géologie & exploration',
    color: 'var(--stratum-3)',
    items: [
      'Géologie pétrolière',
      'Systèmes pétroliers',
      'Exploration pétrolière',
      'Cartographie géologique',
      'Interprétation de cartes sismiques',
      'Géophysique',
      'Géologie structurale',
      'Stratigraphie',
      'Sédimentologie',
      'Pétrologie',
      'Pétrographie',
      'Géochimie',
    ],
  },
  {
    name: 'Logiciels',
    color: 'var(--stratum-2)',
    items: ['QGIS', 'ArcGIS', 'Petrel'],
    note: 'Notions de base',
  },
  {
    name: 'Compétences transverses',
    color: 'var(--stratum-1)',
    items: [
      'Rédaction administrative',
      'Gestion de projet',
      'Analyse et synthèse de données',
      'Travail de terrain',
      'Permis B & 4×4',
    ],
  },
];

export const certifications = [
  {
    org: 'École Nationale d’Administration',
    short: 'ENA',
    logo: 'ena',
    items: ['Formation en gestion de projet', 'Formation en rédaction administrative'],
  },
  {
    org: 'CALI',
    short: 'CALI',
    logo: 'cali',
    items: ['Diplôme de maîtrise de la langue anglaise', 'Certificat de réussite, préparation au TOEFL'],
  },
];

export const languages = [
  { name: 'Français', level: 'Courant', value: 1 },
  { name: 'Anglais', level: 'Avancé', value: 0.8 },
];

export const interests = [
  'Exploration pétrolière',
  'Géosciences',
  'Géologie de terrain',
  'Géophysique',
  'Cartographie & SIG',
  'Hydrocarbures en RDC',
];

// Les sections du site, dans l'ordre de la « descente ».
export const sections = [
  { id: 'accueil', label: 'Surface', depth: 0 },
  { id: 'profil', label: 'Profil', depth: 1 },
  { id: 'formation', label: 'Formation', depth: 2 },
  { id: 'experience', label: 'Expérience', depth: 3 },
  { id: 'terrain', label: 'Terrain', depth: 4 },
  { id: 'competences', label: 'Compétences', depth: 5 },
  { id: 'certifications', label: 'Certifications', depth: 6 },
  { id: 'contact', label: 'Contact', depth: 7 },
];
