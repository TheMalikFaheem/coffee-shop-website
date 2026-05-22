// LocalStorage database keys
const MENU_STORAGE_KEY = 'verdant_cafe_menu';
const BLOG_STORAGE_KEY = 'verdant_cafe_blog';

// Default Menu Items (Premium Luxury Showcase)
const DEFAULT_MENU_ITEMS = [
  {
    id: 1,
    name: 'Ethereal Vanilla Latte',
    slug: 'vanilla-latte',
    subtitle: 'Where every cup tells a story',
    description: 'Indulge in a smooth espresso base paired with steamed organic milk and premium Madagascar vanilla bean extract. Finished with a delicate microfoam art and a light dusting of nutmeg, creating a sweet and comforting premium café experience.',
    price: '$8.50',
    category: 'Hot Coffees',
    flavorNotes: ['Madagascar Vanilla', 'Rich Espresso', 'Sweet Cream', 'Nutmeg Accent'],
    origin: 'Colombia (Huila Highland)',
    roast: 'Medium Roast',
    strength: 3,
    servingStyle: 'Hot in ceramic mug',
    shapeBg: 'bg-[#008248]', // Emerald Green
    bannerText: 'LATTE',
    rotation: -12,
    imgFilter: '', // Natural appearance
    ingredients: [
      { name: 'Huila Arabica Espresso', type: 'Coffee Bean', amount: 'Double Shot', note: 'Rich crema and chocolate undertones' },
      { name: 'Organic Whole Milk', type: 'Milk', amount: '8 oz', note: 'Steamed to velvety 65°C microfoam' },
      { name: 'Madagascar Vanilla Extract', type: 'Syrup', amount: '2 Pumps', note: 'House-made syrup from real vanilla pods' },
      { name: 'Nutmeg Dust', type: 'Toppings', amount: 'Pinch', note: 'Freshly grated on top' }
    ],
    preparation: [
      { step: 1, action: 'Grind 18g of Huila Highlands coffee beans to a fine consistency.' },
      { step: 2, action: 'Pull a double shot of espresso (approx. 36g out) in 28 seconds.' },
      { step: 3, action: 'Steam 8 oz of fresh organic whole milk to create a dense microfoam texture.' },
      { step: 4, action: 'Combine the vanilla syrup with the hot espresso at the bottom of the cup.' },
      { step: 5, action: 'Pour the steamed milk slowly, carving a beautiful leaf pattern in the crema.' }
    ],
    nutrition: {
      calories: '180 kcal',
      sugar: '14g',
      caffeine: '150mg',
      fat: '6g'
    },
    gallery: [
      '/coffee.png'
    ],
    tags: ['Best Seller', 'Classic', 'Velvety']
  },
  {
    id: 2,
    name: 'Velvet Cocoa Mocha',
    slug: 'mocha-brew',
    subtitle: 'Indulge in sweet chocolate harmony',
    description: 'A decadent combination of dark Belgian cocoa syrup, double shot espresso, and steamed organic oat milk. This drink offers a velvet texture, topped with dark chocolate curls and high-grade cocoa powder for chocolate lovers.',
    price: '$9.20',
    category: 'Hot Coffees',
    flavorNotes: ['Dark Belgian Chocolate', 'Earthy Espresso', 'Roasted Oat', 'Fudge'],
    origin: 'Ethiopia (Yirgacheffe)',
    roast: 'Dark Roast',
    strength: 4,
    servingStyle: 'Hot with dark chocolate drizzle',
    shapeBg: 'bg-[#4E3629]', // Warm Mocha Dark Brown
    bannerText: 'MOCHA',
    rotation: 12,
    imgFilter: 'brightness(0.9) contrast(1.1) hue-rotate-[-10deg] saturate(1.2)', // Richer cocoa tint
    ingredients: [
      { name: 'Yirgacheffe Espresso', type: 'Coffee Bean', amount: 'Double Shot', note: 'Natural berry notes' },
      { name: 'Organic Oat Milk', type: 'Milk', amount: '8 oz', note: 'Rich texture that pairs perfectly with chocolate' },
      { name: 'Belgian Dark Chocolate Ganache', type: 'Syrup', amount: '3 Pumps', note: '72% cocoa dark chocolate' },
      { name: 'Chocolate Flakes & Cocoa Dust', type: 'Toppings', amount: 'Generous', note: 'Garnished on whipped cream' }
    ],
    preparation: [
      { step: 1, action: 'Prepare the cup by coating the inside with fresh warm chocolate ganache.' },
      { step: 2, action: 'Pull a double espresso shot over the dark chocolate base and stir well.' },
      { step: 3, action: 'Steam oat milk until smooth and pour directly into the chocolate-coffee blend.' },
      { step: 4, action: 'Optionally add fresh whipped cream and sprinkle cocoa flakes generously.' }
    ],
    nutrition: {
      calories: '260 kcal',
      sugar: '22g',
      caffeine: '150mg',
      fat: '8g'
    },
    gallery: [
      '/coffee.png'
    ],
    tags: ['Dessert', 'Rich', 'Dark Cocoa']
  },
  {
    id: 3,
    name: 'Golden Caramel Macchiato',
    slug: 'caramel-twist',
    subtitle: 'Sweet buttery golden layers',
    description: 'Refreshing cold brew coffee layered over almond milk and vanilla syrup, then finished with a heavy crosshatch drizzle of our house-made buttery salted caramel. Served over clear slow-melting ice cubes.',
    price: '$9.50',
    category: 'Cold Drinks',
    flavorNotes: ['Salted Caramel', 'Buttery Sweetness', 'Toasted Almond', 'Smooth Brew'],
    origin: 'Guatemala (Antigua Highlands)',
    roast: 'Medium Roast',
    strength: 3,
    servingStyle: 'Iced in tall glass',
    shapeBg: 'bg-[#B07238]', // Warm Gold/Caramel
    bannerText: 'CARAMEL',
    rotation: 18,
    imgFilter: 'hue-rotate-[15deg] sepia(0.3) saturate(1.2) contrast(1.1)', // Warm golden tint
    ingredients: [
      { name: 'Guatemalan Cold Brew Concentrated', type: 'Coffee Bean', amount: '3 oz', note: 'Steeped for 18 hours' },
      { name: 'Almond Milk', type: 'Milk', amount: '6 oz', note: 'Nutty unsweetened base' },
      { name: 'Salted Caramel Sauce', type: 'Syrup', amount: '2 Pumps & Drizzle', note: 'Cooked in-house with sea salt' },
      { name: 'Toffee Crunch', type: 'Toppings', amount: 'Pinch', note: 'Crisp buttery caramel crystals' }
    ],
    preparation: [
      { step: 1, action: 'Fill a tall glass with gourmet ice spheres.' },
      { step: 2, action: 'Add almond milk and vanilla base, stirring gently.' },
      { step: 3, action: 'Slowly pour the cold brew concentrate over the ice so it floats on top.' },
      { step: 4, action: 'Create a crosshatch pattern using hot caramel drizzle and top with toffee crystals.' }
    ],
    nutrition: {
      calories: '150 kcal',
      sugar: '12g',
      caffeine: '120mg',
      fat: '4.5g'
    },
    gallery: [
      '/coffee.png'
    ],
    tags: ['Iced', 'Sweet', 'Signature']
  },
  {
    id: 4,
    name: 'Verdant Peppermint Espresso',
    slug: 'verdant-espresso',
    subtitle: 'A minty botanical coffee escape',
    description: 'A botanical-inspired specialty double-shot espresso poured over fresh coconut water, organic mint extract, and honey. Garnished with fresh mint leaves and dark chocolate nibs, creating an incredibly refreshing and crisp herbal coffee experience.',
    price: '$9.80',
    category: 'Specials',
    flavorNotes: ['Fresh Mint', 'Lime Zest', 'Crisp Espresso', 'Forest Honey'],
    origin: 'Kenya (Nyeri region)',
    roast: 'Dark Roast',
    strength: 5,
    servingStyle: 'Iced in luxury tumbler',
    shapeBg: 'bg-[#044035]', // Emerald Forest Dark Green
    bannerText: 'VERDANT',
    rotation: -5,
    imgFilter: 'hue-rotate-[80deg] saturate(0.9) contrast(1.1) brightness(0.95)', // Deep forest teal tint
    ingredients: [
      { name: 'Kenyan AA Espresso', type: 'Coffee Bean', amount: 'Double Shot', note: 'Bright, citrus-forward acidity' },
      { name: 'Organic Coconut Water', type: 'Milk', amount: '6 oz', note: 'Rehydrating natural base' },
      { name: 'Fresh Mint Extract & Raw Honey', type: 'Syrup', amount: '1 Pump', note: 'Sourced from organic local hives' },
      { name: 'Fresh Mint Leaf & Cocoa Nibs', type: 'Toppings', amount: 'Garnish', note: 'Aromatic crushed leaves' }
    ],
    preparation: [
      { step: 1, action: 'Muddle fresh mint leaves with honey and mint extract at the bottom of the glass.' },
      { step: 2, action: 'Add cracked ice and fill with pure coconut water.' },
      { step: 3, action: 'Extract a fresh, hot double espresso shot and float it gently over the coconut water layer.' },
      { step: 4, action: 'Decorate with fresh mint sprigs and a sprinkle of organic cacao nibs.' }
    ],
    nutrition: {
      calories: '90 kcal',
      sugar: '8g',
      caffeine: '165mg',
      fat: '0g'
    },
    gallery: [
      '/coffee.png'
    ],
    tags: ['Botanical', 'Refreshing', 'High Caffeine']
  },
  {
    id: 5,
    name: 'Matcha Cloud Brew',
    slug: 'matcha-cream',
    subtitle: 'Ceremonial tea meets cloud cream',
    description: 'Top-grade Uji ceremonial matcha whisked and layered over sweet macadamia milk, then crowned with our cold vanilla sweet cream foam. A beautiful ombre green-and-white look with smooth, grassy and creamy flavor profiles.',
    price: '$8.90',
    category: 'Cold Drinks',
    flavorNotes: ['Ceremonial Matcha', 'Sweet Cream', 'Nutty Macadamia', 'Umami'],
    origin: 'Uji, Kyoto (Japan)',
    roast: 'Light (Stone Ground)',
    strength: 2,
    servingStyle: 'Iced in glass cup',
    shapeBg: 'bg-[#5D8A66]', // Sage Green
    bannerText: 'MATCHA',
    rotation: 8,
    imgFilter: 'hue-rotate-[110deg] saturate(1.4) brightness(0.9)', // Vibrant matcha green tint
    ingredients: [
      { name: 'Uji Ceremonial Matcha', type: 'Coffee Bean', amount: '3g Whisked', note: 'Rich in L-theanine and antioxidants' },
      { name: 'Macadamia Milk', type: 'Milk', amount: '6 oz', note: 'Silky, buttery nut milk' },
      { name: 'Vanilla Sweet Cream Foam', type: 'Syrup', amount: '2 oz Float', note: 'Heavy cream whipped cold' },
      { name: 'Pure Matcha Dust', type: 'Toppings', amount: 'Dusting', note: 'Sifted on top of the foam' }
    ],
    preparation: [
      { step: 1, action: 'Whisk 3g of premium matcha powder with 2 oz of 80°C water using a bamboo whisk until frothy.' },
      { step: 2, action: 'Fill a serving glass with ice and pour macadamia milk.' },
      { step: 3, action: 'Whip heavy cream, vanilla syrup, and milk to create the cold cloud cream foam.' },
      { step: 4, action: 'Layer the whisked matcha over the milk, then float the vanilla cloud cream foam on top.' }
    ],
    nutrition: {
      calories: '210 kcal',
      sugar: '16g',
      caffeine: '70mg',
      fat: '11g'
    },
    gallery: [
      '/coffee.png'
    ],
    tags: ['Matcha', 'Cloud Foam', 'Antioxidants']
  }
];

// Default Blog Posts (Editorial magazine style)
const DEFAULT_BLOG_POSTS = [
  {
    id: 1,
    title: 'Sourcing the Finest Beans: Our Journey to High-Altitude Farms',
    slug: 'sourcing-the-finest-beans',
    description: 'An inside look at our direct-trade sourcing model, trekking through the highlands of Colombia and Ethiopia to find sustainable, micro-lot specialty coffees.',
    author: 'Elena Rostova',
    role: 'Head of Coffee Sourcing',
    date: 'May 18, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    content: [
      {
        type: 'paragraph',
        text: 'The journey to a premium cup of coffee does not begin at the espresso machine, or even inside the roaster. It begins thousands of meters above sea level, on steep volcanic slopes where coffee cherries ripen slowly under the shade of native forest trees. Sourcing truly exceptional coffee requires more than just calling brokers – it requires stepping onto the soil, shaking hands with the farmers, and understanding the ecology of the estate.'
      },
      {
        type: 'quote',
        text: 'True luxury is trace-ability. Knowing exactly which hillside, which variety, and which fermentation method produced the cherries in your cup creates a profound connection between consumer and grower.',
        author: 'Elena Rostova'
      },
      {
        type: 'paragraph',
        text: 'This spring, our sourcing team traveled to the Huila region in southwestern Colombia. Nestled between the eastern and central ranges of the Andes, Huila is renowned for producing beans with a bright acidity, medium body, and sweet caramel notes. We spent five days at Finca El Paraiso, a family-owned micro-lot farm run by third-generation grower Manuel Torres. Manuel has pioneered anaerobic fermentation techniques that draw out intense floral and tropical fruit notes from the Typica variety.'
      },
      {
        type: 'paragraph',
        text: 'By paying Manuel 45% above the Fair Trade minimum directly, we ensure he has the resources to continue his innovative farming methods. This direct-trade relationship isn\'t just ethical; it guarantees our customers will experience a cup that is clean, complex, and utterly unique. Back in our roastery, we roasted Manuel\'s beans to a precise light-medium level, preserving the delicate peach and honeysuckle aromas that make it the crown jewel of our seasonal menu.'
      }
    ],
    tags: ['Sourcing', 'Sustainability', 'High Altitude']
  },
  {
    id: 2,
    title: 'The Art of Milk Texturing: From Flat White to Microfoam',
    slug: 'art-of-milk-texturing',
    description: 'Learn the molecular science behind steaming milk. Discover how to create wet paint textures and pull off beautiful latte art at home.',
    author: 'Marcus Vance',
    role: 'Lead Barista Trainer',
    date: 'May 10, 2026',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=800&auto=format&fit=crop',
    content: [
      {
        type: 'paragraph',
        text: 'Ask any barista, and they will tell you: pulling a perfect espresso shot is only half the battle. Steaming milk to the exact consistency of liquid gloss—often called "microfoam" or "wet paint"—is a craft that blends thermodynamics with culinary precision. When milk is textured properly, it enhances the natural sweetness of the coffee without needing added sugar.'
      },
      {
        type: 'paragraph',
        text: 'At the heart of milk texturing is protein and fat. When you insert the steam wand, you introduce tiny air bubbles into the milk, while the heat denatures the whey proteins, causing them to coat the bubbles and form a stable foam matrix. At the same time, the lactose in the milk breaks down into simpler sugars, making the milk taste significantly sweeter at around 60°C to 65°C.'
      },
      {
        type: 'quote',
        text: 'Steaming milk is not just heating it up. It is an active aeration phase followed by an intensive vortex phase. If you do not hear a soft paper-tearing hiss in the first few seconds, you are making hot milk, not microfoam.',
        author: 'Marcus Vance'
      },
      {
        type: 'paragraph',
        text: 'To achieve this level of quality, baristas must master two distinct phases: stretching and rolling. Stretching introduces air into the cold milk, creating volume. Rolling involves submerging the steam tip slightly to create a rapid whirlpool that breaks larger bubbles down into sub-millimeter microfoam. The resulting milk should have a glassy sheen, pouring smoothly to integrate with the espresso crema, allowing for the creation of intricate rosettas and tulips.'
      }
    ],
    tags: ['Barista Craft', 'Technique', 'Guide']
  },
  {
    id: 3,
    title: 'Mastering the Pour Over: A Cinematic Guide to Slow Coffee',
    slug: 'mastering-the-pour-over',
    description: 'A deep dive into slow-drip brewing. We cover grind size distributions, water temperature profiles, and the chemistry of the bloom phase.',
    author: 'Sienna Brooks',
    role: 'Roaster & Quality Analyst',
    date: 'April 28, 2026',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    content: [
      {
        type: 'paragraph',
        text: 'In an era of instant gratification and super-automatic coffee machines, the pour-over stands as a quiet rebellion. It is a slow, manual process that requires patience, focus, and a steady hand. But for coffee purists, there is no better way to extract the bright, clean, and highly complex flavor compounds of single-origin coffee.'
      },
      {
        type: 'paragraph',
        text: 'The beauty of pour-over brewing lies in control. By adjusting your water temperature, pouring speed, and grind size, you can highlight different aspects of the coffee bean. A slightly coarser grind and faster pour will yield a cup that is light and tea-like, with delicate floral notes. Conversely, a finer grind and slower pour will extract deeper berry and chocolate notes.'
      },
      {
        type: 'quote',
        text: 'The bloom phase is where the magic happens. By pouring twice the coffee weight in water and letting it rest for 45 seconds, we allow trapped carbon dioxide to escape. This prepares the coffee bed for a uniform extraction.',
        author: 'Sienna Brooks'
      },
      {
        type: 'paragraph',
        text: 'For the ultimate V60 brew, we recommend using water at exactly 93°C, filtered through a paper filter that has been thoroughly rinsed to remove paper tastes. Pour in circular motions, keeping the water level steady and avoiding pouring directly onto the paper filter sides. The entire process should take between 3 to 3.5 minutes. The result is a cup of absolute clarity, showcasing the true terroir of the bean.'
      }
    ],
    tags: ['Brewing Science', 'Tutorial', 'Slow Living']
  }
];

// Helper to initialize data in localStorage
const initDb = () => {
  if (!localStorage.getItem(MENU_STORAGE_KEY)) {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(DEFAULT_MENU_ITEMS));
  }
  if (!localStorage.getItem(BLOG_STORAGE_KEY)) {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
  }
};

// CRUD operations
export const getMenuItems = () => {
  initDb();
  try {
    return JSON.parse(localStorage.getItem(MENU_STORAGE_KEY));
  } catch (e) {
    return DEFAULT_MENU_ITEMS;
  }
};

export const getMenuItemBySlug = (slug) => {
  const items = getMenuItems();
  return items.find(item => item.slug === slug);
};

export const saveMenuItem = (menuItem) => {
  const items = getMenuItems();
  const index = items.findIndex(item => item.slug === menuItem.slug || item.id === menuItem.id);
  
  if (index > -1) {
    // Update existing
    items[index] = { ...items[index], ...menuItem };
  } else {
    // Add new
    const nextId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    items.push({
      id: nextId,
      gallery: ['/coffee.png'],
      rotation: 0,
      shapeBg: 'bg-[#008248]',
      bannerText: 'BREW',
      imgFilter: '',
      ...menuItem
    });
  }
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
  // Dispatch custom event to notify components
  window.dispatchEvent(new Event('coffee_db_update'));
  return true;
};

export const deleteMenuItem = (slug) => {
  const items = getMenuItems();
  const filtered = items.filter(item => item.slug !== slug);
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('coffee_db_update'));
  return true;
};

export const getBlogPosts = () => {
  initDb();
  try {
    return JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY));
  } catch (e) {
    return DEFAULT_BLOG_POSTS;
  }
};

export const getBlogPostBySlug = (slug) => {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
};

export const saveBlogPost = (blogPost) => {
  const posts = getBlogPosts();
  const index = posts.findIndex(post => post.slug === blogPost.slug || post.id === blogPost.id);
  
  if (index > -1) {
    posts[index] = { ...posts[index], ...blogPost };
  } else {
    const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    posts.push({
      id: nextId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      ...blogPost
    });
  }
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event('coffee_db_update'));
  return true;
};

export const deleteBlogPost = (slug) => {
  const posts = getBlogPosts();
  const filtered = posts.filter(post => post.slug !== slug);
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('coffee_db_update'));
  return true;
};
