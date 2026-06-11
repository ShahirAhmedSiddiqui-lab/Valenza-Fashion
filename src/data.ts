/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, CollectionItem, JournalPost } from './types';

import heroImg from './assets/images/valenza_hero_model_1781025998821.png';
import outerwearImg from './assets/images/valenza_outerwear_1781026020090.png';
import topsImg from './assets/images/valenza_tops_1781026038817.png';
import bottomsImg from './assets/images/valenza_bottoms_1781026058825.png';
import accessoriesImg from './assets/images/valenza_accessories_1781026075076.png';
import filmThumbnailImg from './assets/images/valenza_philosophy_film_1781026095646.png';

// Map generated image paths
export const IMAGES = {
  hero: heroImg,
  outerwear: outerwearImg,
  tops: topsImg,
  bottoms: bottomsImg,
  accessories: accessoriesImg,
  filmThumbnail: filmThumbnailImg
};

export const CATEGORIES = [
  {
    id: 'outerwear',
    num: '01',
    name: 'OUTERWEAR',
    imageUrl: IMAGES.outerwear,
    description: 'Crafted wool coats, structural blazers, and protective heavy layers designed to leave a mark.'
  },
  {
    id: 'tops',
    num: '02',
    name: 'TOPS',
    imageUrl: IMAGES.tops,
    description: 'Fine knitwear, minimalist silk shirts, and heavyweight Japanese cotton tees defined by purpose.'
  },
  {
    id: 'bottoms',
    num: '03',
    name: 'BOTTOMS',
    imageUrl: IMAGES.bottoms,
    description: 'Relaxed trousers, structured pleated wool pants, and sculptural denim tailored with architectural precision.'
  },
  {
    id: 'accessories',
    num: '04',
    name: 'ACCESSORIES',
    imageUrl: IMAGES.accessories,
    description: 'Conceptual silver jewelry, custom acetate eyewear, and premium heavy-cut leather boots.'
  }
];

export const FEATURED_COLLECTIONS: CollectionItem[] = [
  {
    id: 'c1',
    title: 'NOCTURNE COLLECTION',
    subtitle: 'SS 24',
    year: '2024 / SS',
    imageUrl: IMAGES.hero,
    description: 'An exploration of shadow, heavy drapes, and high-contrast lines. Designed for movement and architectural silhouettes.'
  },
  {
    id: 'c2',
    title: 'ARCHITECTURAL LINES',
    subtitle: 'SS 24',
    year: '2024 / SS',
    imageUrl: IMAGES.outerwear,
    description: 'Structured tailoring inspired by modernist brutalism. Garments that claim their place in space, defined by absolute structure.'
  },
  {
    id: 'c3',
    title: 'SILENT MOTION',
    subtitle: 'SS 24',
    year: '2024 / SS',
    imageUrl: IMAGES.tops,
    description: 'Fluid wool-silk blends and light, breath-inspired knitwear that react naturally to the surrounding environment.'
  },
  {
    id: 'c4',
    title: 'MONOLITHIC ESSENTIALS',
    subtitle: 'SS 24',
    year: '2024 / SS',
    imageUrl: IMAGES.bottoms,
    description: 'Heavyweight silhouettes, raw structures, and utility hardware that anchor our continuous daily uniform.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'val-trench',
    numericalId: 'V24-081',
    name: 'Nocturne Heavy Trench',
    category: 'Outerwear',
    price: '$1,350',
    description: 'Structured double-breasted coat in dry virgin wool. Features deep lapels, adjustable throat tab, and raw-cut hem finish.',
    imageUrl: IMAGES.outerwear,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'val-knit',
    numericalId: 'V24-112',
    name: 'Structured Ivory Knit',
    category: 'Tops',
    price: '$720',
    description: 'Heavyweight organic wool-alpaca blend sweater. Cable ribbing is knit in geometric lines to mimic concrete pillars.',
    imageUrl: IMAGES.tops,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'val-pants',
    numericalId: 'V24-034',
    name: 'Draped Wool Trousers',
    category: 'Bottoms',
    price: '$650',
    description: 'High-waisted, triple-pleated trousers in Italian fluid wool drape. Relaxed wide leg with subtle taper and raw hems.',
    imageUrl: IMAGES.bottoms,
    sizes: ['44', '46', '48', '50', '52']
  },
  {
    id: 'val-earring',
    numericalId: 'V24-401',
    name: 'Conceptual Silver Earring',
    category: 'Accessories',
    price: '$280',
    description: 'Hand-sculpted single earring in solid sterling silver. Brushed stone finish with custom secure push-back mechanism.',
    imageUrl: IMAGES.accessories,
    sizes: ['UNI']
  }
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'post-1',
    tag: 'BRUTALISM',
    title: 'Form and Function: Modern Architecture as Garment Blueprint',
    date: 'May 14, 2026',
    readTime: '4 min read',
    imageUrl: IMAGES.filmThumbnail
  },
  {
    id: 'post-2',
    tag: 'CRAFT',
    title: 'Sartorial Intention: Why the Raw Edge Tells the Full Story',
    date: 'Apr 28, 2026',
    readTime: '6 min read',
    imageUrl: IMAGES.outerwear
  },
  {
    id: 'post-3',
    tag: 'PROCESS',
    title: 'From Volcanic Clay to Fabric Pigment: Creative Muted Tones',
    date: 'Mar 19, 2026',
    readTime: '5 min read',
    imageUrl: IMAGES.tops
  }
];
