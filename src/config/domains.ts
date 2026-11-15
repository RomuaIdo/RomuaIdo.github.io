// Project domains, each mapped to an oscilloscope-style channel color (see global.css).
export const domains = {
  embedded: { ch: 1, pt: 'Edge AI & Embarcados', en: 'Edge AI & Embedded' },
  hardware: { ch: 2, pt: 'Arquitetura de Hardware', en: 'Hardware Architecture' },
  vision: { ch: 3, pt: 'Visão Computacional & Civic Tech', en: 'Computer Vision & Civic Tech' },
  iot: { ch: 1, pt: 'IoT & Full-Stack', en: 'IoT & Full-Stack' },
  software: { ch: 4, pt: 'Engenharia de Software', en: 'Software Engineering' },
  communication: { ch: 1, pt: 'Comunicação de Dados', en: 'Data Communication' },
  digital: { ch: 2, pt: 'Circuitos Digitais', en: 'Digital Circuits' },
  simulation: { ch: 4, pt: 'Simulação Física', en: 'Physics Simulation' },
} as const;

export type Domain = keyof typeof domains;

// Lanes drawn in the hero; one per channel.
export const channels = [
  { ch: 1, pt: 'Embarcados', en: 'Embedded' },
  { ch: 2, pt: 'Hardware', en: 'Hardware' },
  { ch: 3, pt: 'Visão', en: 'Vision' },
  { ch: 4, pt: 'Software', en: 'Software' },
] as const;
