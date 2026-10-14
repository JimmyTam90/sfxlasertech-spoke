// Central catalog manifest (Collection & Category Hub).
// Facts here come from the supplied inputs and from the merchant's own collection pages,
// observed on 2026-10-13. Prices and stock are intentionally NOT included: the merchant's
// listings showed inconsistent variant prices and mixed availability, so neither is verified.
//
// Image URLs are copied verbatim from the merchant's collection pages (not invented).

const OBSERVED = 'Merchant collection listing, observed 2026-10-13';

export const CATEGORIES = [
  {
    id: 'laser-cleaning-machines',
    name: 'Laser Cleaning Machines',
    description:
      'Non-contact rust, paint, oxide and oil removal. The merchant lists pulse cleaners at 300W / 500W (air-cooled) and higher-power water-cooled MAX models in the multi-kilowatt range.',
    cta: 'Browse Laser Cleaners',
    destination: { kind: 'category', id: 'laser-cleaning-machines' },
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/AGC-300_3_125b2cdc-8dc2-44f5-96ca-3a8781255d96.jpg?v=1789460178&width=533',
      alt: 'SFX portable air-cooled pulse laser cleaning machine',
      evidence: OBSERVED,
    },
  },
  {
    id: 'laser-welding-machines',
    name: 'Laser Welding Machines',
    description:
      'Handheld fiber laser welders, many as 2-in-1 welding and cleaning units. Listings run from 1200W up to 3000W, plus automatic platform welding systems.',
    cta: 'Browse Laser Welders',
    destination: { kind: 'category', id: 'laser-welding-machines' },
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/Q0306Z_10.jpg?v=1776217765&width=533',
      alt: 'SFX handheld fiber laser welding and cleaning 2-in-1 machine',
      evidence: OBSERVED,
    },
  },
  {
    id: 'laser-marking-engraving',
    name: 'Laser Marking & Engraving',
    description:
      'JPT fiber laser marking machines for metal. This merchant collection lists three models: a 50W JPT engraver (with a rotary-axis option) and portable 20W, 30W and 50W units.',
    cta: 'Browse Marking Machines',
    destination: { kind: 'category', id: 'laser-marking-engraving' },
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/2N0801X.jpg?v=1700289500&width=533',
      alt: 'SFX portable JPT fiber laser marking machine',
      evidence: OBSERVED,
    },
  },
  {
    id: 'fiber-laser-cutters',
    name: 'Fiber Laser Cutters',
    description:
      'Fiber laser cutting machines for sheet metal, from compact enclosed 300 x 300 mm units to large 1300 x 2500 mm workbeds, in 1000W to 3000W configurations.',
    cta: 'Browse Laser Cutters',
    destination: { kind: 'category', id: 'fiber-laser-cutters' },
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/SFX-2030-_Q0120HMG-9.jpg?v=1770096211&width=533',
      alt: 'SFX air-cooled precision fiber laser cutting machine',
      evidence: OBSERVED,
    },
  },
  {
    id: 'machine-tool-accessories',
    name: 'Machine Tool Accessories',
    description:
      'BMT-series driven (live) tool holders for CNC turning centers, in BMT45 to BMT65 sizes with axial and radial options.',
    cta: 'Browse Tool Accessories',
    destination: { kind: 'category', id: 'machine-tool-accessories' },
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/BMT_P1217HMG-BMT55-90_SC-85-ER32-J-N-T.jpg?v=1766215366&width=533',
      alt: 'SFX BMT driven tool holder',
      evidence: OBSERVED,
    },
  },
  {
    id: 'all-laser-equipment',
    name: 'All Laser Equipment',
    description:
      'The full merchant catalog in one list: cleaners, welders, marking machines, cutters, CO2 systems and accessories.',
    cta: 'Browse All Equipment',
    destination: { kind: 'category', id: 'all-laser-equipment' },
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/lQDPJxbGJdU2A8_NA-jNA-iwyVMSk88RXtEDRbYtbwBAAA_1000_1000_175dfa36-0f9d-40ee-b5d3-762326208bbb.jpg?v=1716446264&width=533',
      alt: 'SFX JPT MOPA fiber laser marking machine from the full catalog',
      evidence: OBSERVED,
    },
  },
];

// Only collections that have a supplied destination mapping are listed.
// "Portable Laser Marking Machines" and "Sheet Metal Laser Cutters" (COLLECTION_SEED) have no
// supplied collection URL, so they are covered by the category cards instead of inventing keys.
export const COLLECTIONS = [
  {
    id: 'air-cooled-pulse-cleaners',
    name: 'Air-Cooled Pulse Laser Cleaners',
    description:
      '300W / 500W air-cooled pulse cleaners for rust, paint, oil and oxide layers. This link opens the full laser cleaning collection, which includes the pulse models alongside continuous cleaners.',
    cta: 'Browse Laser Cleaners',
    destination: { kind: 'collection', id: 'air-cooled-pulse-cleaners' },
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/APC-300_91fee170-59f3-435b-a476-6dd99182e4c8.jpg?v=1791619345&width=533',
      alt: 'SFX air-cooled pulsed laser cleaning machine',
      evidence: OBSERVED,
    },
  },
  {
    id: 'handheld-welder-cleaners',
    name: 'Handheld Welder & Cleaner 2-in-1',
    description:
      'Handheld fiber laser units that weld and clean with one machine. This link opens the merchant’s laser welding collection, which includes the handheld welder and cleaner models.',
    cta: 'Browse Laser Welders',
    destination: { kind: 'collection', id: 'handheld-welder-cleaners' },
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/1747616380510_d80c59b5ab1b1e0920612ada4d197b54.jpg?v=1747642014&width=533',
      alt: 'SFX 1200W handheld laser welding and cleaning machine',
      evidence: OBSERVED,
    },
  },
];

// Models worth a closer look. Specs are limited to what the merchant listing titles state.
// Optical cable length, warranty terms, prices and stock were NOT_FOUND / not verified.
export const MODELS = [
  {
    id: 'pulse-cleaner-300-500',
    name: 'Portable Air-Cooled Pulse Laser Cleaning Machine',
    power: '300W / 500W',
    cooling: 'Air-cooled',
    use: 'Rust, paint, oil and oxide removal',
    destination: { kind: 'collection', id: 'air-cooled-pulse-cleaners' },
    cta: 'View Laser Cleaners',
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/AGC-300_3_125b2cdc-8dc2-44f5-96ca-3a8781255d96.jpg?v=1789460178&width=533',
      alt: 'SFX 300W/500W portable air-cooled pulse laser cleaning machine',
      evidence: OBSERVED,
    },
  },
  {
    id: 'handheld-welder-cleaner-1500-3000',
    name: 'Handheld Fiber Laser Welder & Cleaner 2-in-1',
    power: '1500W / 2000W / 3000W',
    cooling: null,
    use: 'Handheld laser welding and cleaning',
    destination: { kind: 'collection', id: 'handheld-welder-cleaners' },
    cta: 'View Handheld Welders',
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/Q0306Z_10.jpg?v=1776217765&width=533',
      alt: 'SFX 1500W/2000W/3000W handheld fiber laser welding and cleaning 2-in-1 machine',
      evidence: OBSERVED,
    },
  },
  {
    id: 'jpt-mopa-m7',
    name: 'JPT MOPA M7 Fiber Laser Marking Machine',
    power: '60W / 100W / 200W',
    cooling: null,
    use: 'Metal marking and colour marking',
    destination: { kind: 'category', id: 'all-laser-equipment' },
    cta: 'Find in Full Catalog',
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/lQDPJxbGJdU2A8_NA-jNA-iwyVMSk88RXtEDRbYtbwBAAA_1000_1000_175dfa36-0f9d-40ee-b5d3-762326208bbb.jpg?v=1716446264&width=533',
      alt: 'JPT MOPA M7 fiber laser marking machine',
      evidence: OBSERVED,
    },
  },
  {
    id: 'air-cooled-fiber-cutter',
    name: 'Air-Cooled Precision Fiber Laser Cutting Machine',
    power: null,
    cooling: 'Air-cooled',
    use: 'Cutting stainless steel and copper sheet',
    destination: { kind: 'category', id: 'fiber-laser-cutters' },
    cta: 'View Laser Cutters',
    image: {
      src: 'https://sfxlasertech.com/cdn/shop/files/SFX-2030-_Q0120HMG-9.jpg?v=1770096211&width=533',
      alt: 'SFX air-cooled precision fiber laser cutting machine',
      evidence: OBSERVED,
    },
  },
];

export const APPLICATIONS = [
  {
    id: 'rust-oxide',
    title: 'Rust & Oxide Removal',
    audience: 'Automotive restoration shops, fabrication facilities',
    points: [
      'Pulse lasers are commonly chosen where heat input to the base metal must stay low.',
      'Test settings on a scrap area before cleaning a finished or thin part.',
      'Heavier scale and larger surfaces generally call for higher power.',
    ],
    destination: { kind: 'category', id: 'laser-cleaning-machines' },
    cta: 'Browse Laser Cleaners',
  },
  {
    id: 'paint-coating',
    title: 'Paint & Coating Removal',
    audience: 'Restoration shops, industrial cleaning contractors',
    points: [
      'Coating type and thickness change how many passes are needed.',
      'Laser cleaning is non-contact and needs no chemical solvents or abrasive media.',
      'Plan fume extraction: removed coatings become airborne particles.',
    ],
    destination: { kind: 'collection', id: 'air-cooled-pulse-cleaners' },
    cta: 'Browse Laser Cleaners',
  },
  {
    id: 'oil-contaminants',
    title: 'Oil & Surface Contaminants',
    audience: 'Metal manufacturing workshops, maintenance teams',
    points: [
      'Useful for prepping surfaces before welding, bonding or coating.',
      'Confirm the process suits your material and the finish you need.',
      'Keep a repeatable parameter sheet for each part family.',
    ],
    destination: { kind: 'category', id: 'laser-cleaning-machines' },
    cta: 'Browse Laser Cleaners',
  },
  {
    id: 'handheld-welding',
    title: 'Handheld Laser Welding',
    audience: 'Professional welders, fabrication facilities',
    points: [
      'Handheld units are flexible for varied joints and on-site repairs.',
      '2-in-1 models combine welding with cleaning in one machine.',
      'Material, thickness and joint design set the power you need.',
    ],
    destination: { kind: 'collection', id: 'handheld-welder-cleaners' },
    cta: 'Browse Laser Welders',
  },
  {
    id: 'marking-engraving',
    title: 'Part Marking & Engraving',
    audience: 'Hardware engravers, job shops',
    points: [
      'Serial numbers, logos and data codes on metal parts.',
      'MOPA sources add pulse-width control, which helps with colour marking on some metals.',
      'Check the marking field size against your largest part.',
    ],
    destination: { kind: 'category', id: 'laser-marking-engraving' },
    cta: 'Browse Marking Machines',
  },
  {
    id: 'sheet-cutting',
    title: 'Sheet Metal Cutting',
    audience: 'Fabrication facilities, metal manufacturing workshops',
    points: [
      'Match the workbed size to your standard sheet.',
      'Maximum cut thickness depends on material, power and assist gas.',
      'Enclosed models can simplify shop safety compared with open beds.',
    ],
    destination: { kind: 'category', id: 'fiber-laser-cutters' },
    cta: 'Browse Laser Cutters',
  },
];

export const FAQ = [
  {
    q: 'Is PrimeGearLab the manufacturer or the seller?',
    a: 'No. PrimeGearLab is an independent guide. Products are made and sold by SFX Laser Tech, and every purchase happens on the merchant’s own website.',
  },
  {
    q: 'What is the difference between air-cooled and water-cooled laser equipment?',
    a: 'Air-cooled machines are generally lighter and simpler to set up, which suits portable work. Water-cooled machines use a chiller to manage heat and are typically used for higher continuous power. The merchant lists air-cooled 300W / 500W pulse cleaners and water-cooled 1.5KW to 3KW MAX cleaners.',
  },
  {
    q: 'Will laser cleaning damage the base metal?',
    a: 'It depends on the settings, the material and the operator. Laser cleaning is non-contact and chemical-free, but power, speed and pulse settings must be tuned to the job. Always test on a scrap area first and follow the manufacturer’s manual.',
  },
  {
    q: 'What laser safety eyewear do I need?',
    a: 'Eyewear must be rated for your laser’s wavelength and power. Fiber lasers typically operate near 1064 nm, and workshops commonly specify OD 6+ or OD 7+ protection at that wavelength. Confirm the exact requirement in your machine’s manual and with your laser safety officer.',
  },
  {
    q: 'What does this page not tell me about each machine?',
    a: 'It does not show prices, stock, optical cable length or warranty terms, because those were not verified and change often. Check them on the merchant’s product page before you buy.',
  },
  {
    q: 'What certifications does the merchant list?',
    a: 'The merchant’s site lists CE, FDA, ISO9001, UKCA, SGS and RoHS. Certification can vary by model, so ask the merchant for the documents that apply to the specific machine you choose.',
  },
  {
    q: 'Does support exist in the United States?',
    a: 'The merchant states that it operates two after-sales service centers in the United States. Ask the merchant about service coverage for your location.',
  },
  {
    q: 'Do I pay more when I use your links?',
    a: 'No. We may earn a commission when you buy through eligible links, at no additional cost to you. See the Affiliate Disclosure for details.',
  },
];

export const SELECTOR = {
  jobs: [
    {
      id: 'clean',
      label: 'Remove rust, paint or oil',
      options: [
        {
          id: 'light',
          label: 'Lighter jobs: small parts, restoration, spot cleaning',
          result: {
            title: 'Pulse laser cleaner, 300W to 500W',
            detail:
              'The merchant lists portable air-cooled pulse cleaners at 300W and 500W. Pulse cleaning is a common choice when you want low heat input.',
            destination: { kind: 'collection', id: 'air-cooled-pulse-cleaners' },
            cta: 'Browse Laser Cleaners',
          },
        },
        {
          id: 'heavy',
          label: 'Heavy-duty: thick coatings, large surfaces, production',
          result: {
            title: 'Higher-power cleaner, 1.5KW and up',
            detail:
              'The merchant lists water-cooled MAX cleaners at 1.5KW, 2KW and 3KW, and larger systems above that. Higher power suits heavy build-up and large areas.',
            destination: { kind: 'category', id: 'laser-cleaning-machines' },
            cta: 'Browse Laser Cleaners',
          },
        },
      ],
    },
    {
      id: 'weld',
      label: 'Weld metal',
      options: [
        {
          id: 'light',
          label: 'Lighter work: thin sheet, light fabrication',
          result: {
            title: 'Handheld laser welder, about 1200W to 1500W',
            detail:
              'The merchant lists handheld welders at 1200W, 1400W and 1500W, several as 2-in-1 welder and cleaner units.',
            destination: { kind: 'collection', id: 'handheld-welder-cleaners' },
            cta: 'Browse Laser Welders',
          },
        },
        {
          id: 'heavy',
          label: 'Heavy-duty: thicker sections, daily production',
          result: {
            title: 'Handheld laser welder, 2000W to 3000W',
            detail:
              'The merchant lists 1500W / 2000W / 3000W handheld welder and cleaner units. Thicker material generally needs the higher end.',
            destination: { kind: 'collection', id: 'handheld-welder-cleaners' },
            cta: 'Browse Laser Welders',
          },
        },
      ],
    },
    {
      id: 'mark',
      label: 'Mark or engrave metal',
      options: [
        {
          id: 'light',
          label: 'Lighter work: serial numbers, text, small logos',
          result: {
            title: 'Portable fiber marker, 20W to 50W',
            detail:
              'The merchant’s marking collection lists portable fiber marking machines at 20W, 30W and 50W, plus a 50W JPT engraver.',
            destination: { kind: 'category', id: 'laser-marking-engraving' },
            cta: 'Browse Marking Machines',
          },
        },
        {
          id: 'heavy',
          label: 'Heavy-duty: deeper engraving, colour marking, higher speed',
          result: {
            title: 'JPT MOPA M7, 60W to 200W',
            detail:
              'The merchant lists JPT MOPA M7 marking machines at 60W, 100W and 200W in its full catalog; they are not in the marking collection. MOPA sources add pulse-width control.',
            destination: { kind: 'category', id: 'all-laser-equipment' },
            cta: 'Browse All Equipment',
          },
        },
      ],
    },
    {
      id: 'cut',
      label: 'Cut sheet metal',
      options: [
        {
          id: 'light',
          label: 'Lighter work: smaller sheets, thinner stock',
          result: {
            title: 'Compact enclosed fiber cutter, 1000W to 1500W',
            detail:
              'The merchant lists 1000W / 1500W enclosed fiber cutters with a 300 x 300 mm working area.',
            destination: { kind: 'category', id: 'fiber-laser-cutters' },
            cta: 'Browse Laser Cutters',
          },
        },
        {
          id: 'heavy',
          label: 'Heavy-duty: full-size sheets, thicker stock',
          result: {
            title: 'Large-bed fiber cutter, 1500W to 3000W',
            detail:
              'The merchant lists SFX-1325 cutters with a 1300 x 2500 mm workbed at 1500W, 2000W and 3000W.',
            destination: { kind: 'category', id: 'fiber-laser-cutters' },
            cta: 'Browse Laser Cutters',
          },
        },
      ],
    },
  ],
};
