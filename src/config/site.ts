// Single source of truth for personal data, handles and contact links.
export const site = {
  name: 'Vinícius Romualdo Silva',
  shortName: 'Vinícius R. Silva',
  url: 'https://romuaido.github.io',
  github: {
    // Capital "I", not "Romualdo".
    user: 'RomuaIdo',
    get profile() {
      return `https://github.com/${this.user}`;
    },
  },
  // Empty values are hidden in the UI.
  email: 'viniciusromualdo24@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vin%C3%ADcius-romualdo-silva-4241833b8/',
  lattes: 'http://lattes.cnpq.br/1979015471245674',
  location: 'Curitiba, PR',
  education: {
    current: {
      pt: 'Engenharia da Computação · UTFPR, Campus Curitiba',
      en: 'Computer Engineering · UTFPR, Curitiba campus',
      expected: '12/2028',
    },
    previous: {
      pt: 'Técnico em Petróleo e Gás · UFPR (2023)',
      en: 'Petroleum and Gas Technician · UFPR (2023)',
    },
  },
} as const;

export type Site = typeof site;
