export const expectedProducts = {
  spannersSet: 'Open-end Spanners (Set)',
  swissWoodcarvingChisels: 'Swiss Woodcarving Chisels',
  adjustableWrench: 'Adjustable Wrench',
  clawHammer: 'Claw Hammer with Fiberglass Handle',
};

export const products = {
  Bolt_Cutters: {
    name: 'Bolt Cutters',
    description: 'Aliquam viverra scelerisque tempus. Ut vehicula, ex sed elementum',
    price: '$48.41',
  },
  Thor_Hammer: {
    name: 'Thor Hammer',
    description: 'A powerful hammer for all your needs.',
    price: '$11.14',
  },
  Long_Nose_Pliers: {
    name: 'Long Nose Pliers',
    description: 'Perfect for reaching tight spaces.',
    price: '$14.24',
  },
  Combination_Pliers: {
    name: 'Combination Pliers',
    description: 'Versatile pliers for various tasks.',
    price: '$14.24',
    related: /Combination Pliers More information/i,
  },
  productRegex: /^https:\/\/practicesoftwaretesting\.com\/product\/.*/,
};
