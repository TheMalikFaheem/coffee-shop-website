// ─────────────────────────────────────────────────────────────────────────────
// N Squared Café — Data Layer (localStorage CMS)
// ─────────────────────────────────────────────────────────────────────────────
const MENU_STORAGE_KEY  = 'nsquared_cafe_menu_v2';
const BLOG_STORAGE_KEY  = 'nsquared_cafe_blog_v2';
const AUTH_STORAGE_KEY  = 'nsquared_admin_auth';

// ─── Shape helpers ────────────────────────────────────────────────────────────
const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Common ingredient sets
const espressoBase = (roast = 'Medium Roast') => [
  { name: 'Premium Arabica Espresso', type: 'Coffee Bean', amount: 'Double Shot', note: 'Rich crema with smooth bitter-sweet finish' },
  { name: `${roast} Blend`, type: 'Roast Profile', amount: '18g', note: 'Sourced from high-altitude Colombian farms' },
];
const milkFoam = { name: 'Whole Steamed Milk', type: 'Milk', amount: '200ml', note: 'Velvety microfoam steamed to 65°C' };
const coldFoam = { name: 'Cold Vanilla Foam', type: 'Topping', amount: '30ml', note: 'Silky cold-whipped cream with vanilla' };
const ice = { name: 'Fresh Ice Cubes', type: 'Cooling', amount: 'Full glass', note: 'Filtered water ice for clean taste' };

const genericPrep = (style) => [
  { step: 1, action: 'Pull a fresh double espresso shot using 18g of ground Arabica beans at 9 bars of pressure.' },
  { step: 2, action: `Prepare the ${style} base — steam or chill the milk to optimal temperature.` },
  { step: 3, action: 'Combine all components in the correct order to achieve perfect layering and flavor balance.' },
  { step: 4, action: 'Garnish as specified and serve immediately for the freshest experience.' },
];

// ─── DEFAULT MENU ITEMS ───────────────────────────────────────────────────────
const DEFAULT_MENU_ITEMS = [
  // ── HOT COFFEE ──────────────────────────────────────────────────────────────
  {
    id: 1, name: 'French Vanilla Hot Coffee', price: 'Rs 690',
    slug: 'french-vanilla-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Classic warmth with a French twist',
    description: 'A timeless hot coffee infused with rich French vanilla flavor, crafted with premium espresso and velvety steamed milk for a smooth, comforting cup that warms the soul.',
    flavorNotes: ['French Vanilla', 'Creamy Espresso', 'Warm Milk', 'Sweet Finish'],
    tags: ['Classic', 'Sweet', 'Crowd Favorite'],
    strength: 3, rotation: -8,
    shapeBg: 'bg-[#B9805D]', bannerText: 'VANILLA', imgFilter: 'sepia(0.3) saturate(1.2)',
    servingStyle: 'Hot in ceramic mug',
    ingredients: [
      ...espressoBase(), milkFoam,
      { name: 'French Vanilla Syrup', type: 'Syrup', amount: '2 Pumps', note: 'House-made from real vanilla beans' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '190 kcal', caffeine: '140mg', sugar: '16g', fat: '6g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 2, name: 'Espresso Double Shot', price: 'Rs 450',
    slug: 'espresso-double-shot', category: 'Hot Coffee',
    subtitle: 'Pure. Bold. Unapologetic.',
    description: 'Double shot of strong, rich espresso with a smooth finish. Our signature blend is extracted at precise pressure to deliver a perfect crema and complex flavor profile.',
    flavorNotes: ['Bold Espresso', 'Dark Chocolate', 'Nutty', 'Velvet Crema'],
    tags: ['Strong', 'Pure', 'Classic'],
    strength: 5, rotation: 5,
    shapeBg: 'bg-[#4B3226]', bannerText: 'ESPRESSO', imgFilter: 'brightness(0.85) contrast(1.2)',
    servingStyle: 'Hot in espresso cup',
    ingredients: [
      { name: 'Premium Arabica Blend', type: 'Coffee Bean', amount: 'Double Shot (36ml)', note: 'Pulled at 9 bars for 28 seconds' },
      { name: 'Filtered Hot Water', type: 'Water', amount: 'Rinse', note: 'Pre-heated cup for temperature stability' },
    ],
    preparation: [
      { step: 1, action: 'Grind 18g of premium Arabica beans to a fine, consistent powder.' },
      { step: 2, action: 'Tamp the ground coffee evenly at 30 lbs of pressure in the portafilter.' },
      { step: 3, action: 'Extract at 9 bars pressure for exactly 25-30 seconds to yield 36ml of espresso.' },
      { step: 4, action: 'Serve immediately in a pre-warmed espresso cup to preserve the crema.' },
    ],
    nutrition: { calories: '5 kcal', caffeine: '160mg', sugar: '0g', fat: '0g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 3, name: 'Lotus Hot Coffee', price: 'Rs 790',
    slug: 'lotus-hot-coffee', category: 'Hot Coffee',
    subtitle: 'The iconic biscoff infusion',
    description: 'A luxurious hot coffee blending rich espresso with the unmistakable caramelized warmth of Lotus Biscoff. Topped with smooth steamed milk and a Lotus crumble garnish.',
    flavorNotes: ['Lotus Biscoff', 'Caramel Spice', 'Creamy Espresso', 'Warm Cinnamon'],
    tags: ['Signature', 'Premium', 'Biscoff'],
    strength: 3, rotation: -12,
    shapeBg: 'bg-[#C47E44]', bannerText: 'LOTUS', imgFilter: 'sepia(0.4) saturate(1.3) hue-rotate(5deg)',
    servingStyle: 'Hot with Lotus crumble',
    ingredients: [
      ...espressoBase(), milkFoam,
      { name: 'Lotus Biscoff Sauce', type: 'Sauce', amount: '2 Pumps', note: 'Imported caramelized biscuit sauce' },
      { name: 'Lotus Cookie Crumble', type: 'Garnish', amount: 'Generous', note: 'Crushed on top for texture' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '240 kcal', caffeine: '140mg', sugar: '22g', fat: '8g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 4, name: 'Caramel Hot Coffee', price: 'Rs 690',
    slug: 'caramel-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Buttery caramel warmth in every sip',
    description: 'A warm, indulgent caramel hot coffee with rich espresso and silky steamed milk, finished with a generous drizzle of buttery caramel sauce for a sweet, comforting experience.',
    flavorNotes: ['Salted Caramel', 'Smooth Espresso', 'Warm Milk', 'Buttery Sweet'],
    tags: ['Sweet', 'Caramel', 'Classic'],
    strength: 3, rotation: 10,
    shapeBg: 'bg-[#B9805D]', bannerText: 'CARAMEL', imgFilter: 'sepia(0.3) saturate(1.4) hue-rotate(10deg)',
    servingStyle: 'Hot with caramel drizzle',
    ingredients: [
      ...espressoBase(), milkFoam,
      { name: 'House Caramel Sauce', type: 'Sauce', amount: '2 Pumps + Drizzle', note: 'Cooked in-house with sea salt' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '200 kcal', caffeine: '140mg', sugar: '18g', fat: '7g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 5, name: 'Mocha Latte Hot Coffee', price: 'Rs 690',
    slug: 'mocha-latte-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Chocolate meets espresso',
    description: 'A rich blend of bold espresso and velvety steamed milk swirled with deep Belgian chocolate mocha sauce. A perfect balance of bitter coffee and sweet chocolate in every cup.',
    flavorNotes: ['Dark Chocolate', 'Bold Espresso', 'Creamy Milk', 'Fudge Notes'],
    tags: ['Chocolate', 'Rich', 'Indulgent'],
    strength: 4, rotation: -5,
    shapeBg: 'bg-[#4E3629]', bannerText: 'MOCHA', imgFilter: 'brightness(0.88) contrast(1.15) saturate(1.2)',
    servingStyle: 'Hot with chocolate dust',
    ingredients: [
      ...espressoBase('Dark Roast'), milkFoam,
      { name: 'Belgian Mocha Sauce', type: 'Sauce', amount: '2 Pumps', note: '72% dark chocolate blend' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '230 kcal', caffeine: '150mg', sugar: '20g', fat: '8g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 6, name: 'Pistachio Hot Coffee', price: 'Rs 890',
    slug: 'pistachio-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Middle Eastern luxury in a cup',
    description: 'A premium hot coffee experience inspired by Middle Eastern café culture. Rich espresso meets imported pistachio cream, topped with a dusting of crushed pistachios for elegance.',
    flavorNotes: ['Premium Pistachio', 'Roasted Nut', 'Smooth Espresso', 'Sweet Cream'],
    tags: ['Premium', 'Nutty', 'Luxury'],
    strength: 3, rotation: 8,
    shapeBg: 'bg-[#7A9E6F]', bannerText: 'PISTACHIO', imgFilter: 'hue-rotate(80deg) saturate(0.9)',
    servingStyle: 'Hot with pistachio dust',
    ingredients: [
      ...espressoBase(), milkFoam,
      { name: 'Pistachio Cream Sauce', type: 'Sauce', amount: '2 Pumps', note: 'Imported premium pistachio paste' },
      { name: 'Crushed Pistachios', type: 'Garnish', amount: 'Pinch', note: 'Freshly crushed on top' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '250 kcal', caffeine: '140mg', sugar: '18g', fat: '10g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 7, name: 'Hazelnut Hot Coffee', price: 'Rs 690',
    slug: 'hazelnut-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Nutty richness in warm harmony',
    description: 'Smooth espresso paired with aromatic hazelnut syrup and velvety steamed milk. A comforting, nutty coffee experience that wraps you in warmth from first sip to last.',
    flavorNotes: ['Roasted Hazelnut', 'Sweet Espresso', 'Creamy Milk', 'Warm Nuttiness'],
    tags: ['Nutty', 'Warm', 'Sweet'],
    strength: 3, rotation: -10,
    shapeBg: 'bg-[#8B5E3C]', bannerText: 'HAZELNUT', imgFilter: 'sepia(0.4) saturate(1.1)',
    servingStyle: 'Hot in ceramic mug',
    ingredients: [
      ...espressoBase(), milkFoam,
      { name: 'Premium Hazelnut Syrup', type: 'Syrup', amount: '2 Pumps', note: 'Real hazelnut extract blend' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '195 kcal', caffeine: '140mg', sugar: '16g', fat: '7g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 8, name: 'Flat White Hot Coffee', price: 'Rs 550',
    slug: 'flat-white-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Barista craft at its purest',
    description: 'A perfectly proportioned flat white with a ristretto double shot and velvety microfoam poured with precision. Strong, smooth, and beautifully minimal — the coffee lover\'s choice.',
    flavorNotes: ['Intense Espresso', 'Silky Microfoam', 'Clean Finish', 'Subtle Sweet'],
    tags: ['Strong', 'Classic', 'Barista Craft'],
    strength: 4, rotation: 6,
    shapeBg: 'bg-[#6F4A35]', bannerText: 'FLATWHITE', imgFilter: 'brightness(0.9) contrast(1.1)',
    servingStyle: 'Hot in small ceramic cup',
    ingredients: [
      { name: 'Ristretto Double Shot', type: 'Coffee Bean', amount: '60ml', note: 'Short, intense extraction' },
      { name: 'Textured Whole Milk', type: 'Milk', amount: '120ml', note: 'Silky microfoam, no large bubbles' },
    ],
    preparation: [
      { step: 1, action: 'Pull a ristretto double shot — shorter extraction for sweeter, more intense espresso.' },
      { step: 2, action: 'Steam whole milk to exactly 65°C creating ultra-fine, silky microfoam.' },
      { step: 3, action: 'Pour the microfoam in one smooth movement from the jug, creating a thin white dot.' },
      { step: 4, action: 'Serve immediately in a 160ml ceramic cup.' },
    ],
    nutrition: { calories: '130 kcal', caffeine: '180mg', sugar: '10g', fat: '5g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 9, name: 'Popcorn Hot Coffee', price: 'Rs 690',
    slug: 'popcorn-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Buttery, bold, and irresistible',
    description: 'A warm aromatic coffee infused with buttery caramel popcorn notes topped with a smooth finish for a comforting indulgent sip. Unexpected. Unforgettable.',
    flavorNotes: ['Buttery Popcorn', 'Caramel Sweetness', 'Warm Espresso', 'Indulgent Finish'],
    tags: ['Unique', 'Indulgent', 'Signature'],
    strength: 3, rotation: -6,
    shapeBg: 'bg-[#C49A3A]', bannerText: 'POPCORN', imgFilter: 'sepia(0.35) saturate(1.3) brightness(1.05)',
    servingStyle: 'Hot with popcorn garnish',
    ingredients: [
      ...espressoBase(), milkFoam,
      { name: 'Popcorn Caramel Syrup', type: 'Syrup', amount: '2 Pumps', note: 'House-made buttery popcorn flavor' },
      { name: 'Caramel Popcorn Crumble', type: 'Garnish', amount: 'Pinch', note: 'Adds sweet crunch on top' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '210 kcal', caffeine: '140mg', sugar: '19g', fat: '7g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 10, name: 'N² Signature Hot Coffee', price: 'Rs 690',
    slug: 'n2-signature-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Our proudest creation',
    description: 'Signature hot coffee crafted with rich espresso and velvety milk blended with Kinder Bueno for an irresistibly creamy and chocolatey experience. The taste of N Squared.',
    flavorNotes: ['Kinder Bueno', 'Hazelnut Chocolate', 'Rich Espresso', 'Velvety Cream'],
    tags: ['Signature', 'House Special', 'Best Seller'],
    strength: 3, rotation: 12,
    shapeBg: 'bg-[#8B5E3C]', bannerText: 'SIGNATURE', imgFilter: 'sepia(0.3) contrast(1.1)',
    servingStyle: 'Hot with Kinder garnish',
    ingredients: [
      ...espressoBase(), milkFoam,
      { name: 'Kinder Bueno Sauce', type: 'Sauce', amount: '2 Pumps', note: 'Authentic hazelnut chocolate blend' },
      { name: 'Kinder Bueno Pieces', type: 'Garnish', amount: 'Crumbled', note: 'Real Kinder Bueno on top' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '260 kcal', caffeine: '140mg', sugar: '24g', fat: '11g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 11, name: 'Americano Hot Coffee', price: 'Rs 450',
    slug: 'americano-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Full-bodied, clean, and classic',
    description: 'Rich and bold espresso shots topped with hot water creating a smooth full-bodied coffee experience. The purist\'s choice — simple, timeless, and deeply satisfying.',
    flavorNotes: ['Bold Espresso', 'Clean Body', 'Slight Bitterness', 'Full Flavor'],
    tags: ['Classic', 'Bold', 'Pure'],
    strength: 4, rotation: -4,
    shapeBg: 'bg-[#4B3226]', bannerText: 'AMERICANO', imgFilter: 'brightness(0.85) contrast(1.15)',
    servingStyle: 'Hot in large mug',
    ingredients: [
      { name: 'Premium Arabica Espresso', type: 'Coffee Bean', amount: 'Double Shot', note: 'Strong extraction for full body' },
      { name: 'Hot Filtered Water', type: 'Water', amount: '150ml', note: 'Dilutes for perfect strength' },
    ],
    preparation: [
      { step: 1, action: 'Extract a double shot of premium espresso.' },
      { step: 2, action: 'Heat filtered water to just below boiling — 90-95°C.' },
      { step: 3, action: 'Pour the hot water first into the cup, then the espresso shot on top.' },
      { step: 4, action: 'Stir gently to blend. Serve immediately.' },
    ],
    nutrition: { calories: '10 kcal', caffeine: '140mg', sugar: '0g', fat: '0g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 12, name: 'Spanish Hot Coffee', price: 'Rs 690',
    slug: 'spanish-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Mediterranean café richness',
    description: 'A luxurious Spanish-style hot coffee combining bold espresso with sweetened condensed milk and a rich velvety texture. Inspired by the cafés of Barcelona and Madrid.',
    flavorNotes: ['Condensed Milk', 'Bold Espresso', 'Sweet Caramel', 'Mediterranean Warmth'],
    tags: ['Sweet', 'Rich', 'Mediterranean'],
    strength: 4, rotation: 9,
    shapeBg: 'bg-[#9E6340]', bannerText: 'SPANISH', imgFilter: 'sepia(0.35) saturate(1.2)',
    servingStyle: 'Hot in glass cup',
    ingredients: [
      ...espressoBase('Dark Roast'),
      { name: 'Sweetened Condensed Milk', type: 'Milk', amount: '30ml', note: 'Creates rich, sweet body' },
      { name: 'Steamed Milk Foam', type: 'Foam', amount: '50ml', note: 'Light foam on top' },
    ],
    preparation: genericPrep('condensed milk'),
    nutrition: { calories: '220 kcal', caffeine: '150mg', sugar: '28g', fat: '6g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 13, name: 'Latte Hot Coffee', price: 'Rs 590',
    slug: 'latte-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Smooth, creamy, and balanced',
    description: 'A beautifully balanced café latte with a double shot of smooth espresso topped with generous steamed milk and a thin layer of velvety microfoam. Coffee perfected.',
    flavorNotes: ['Smooth Espresso', 'Creamy Milk', 'Subtle Sweet', 'Balanced Body'],
    tags: ['Classic', 'Creamy', 'Balanced'],
    strength: 3, rotation: -7,
    shapeBg: 'bg-[#B9805D]', bannerText: 'LATTE', imgFilter: 'sepia(0.25) saturate(1.1)',
    servingStyle: 'Hot in large ceramic mug',
    ingredients: [
      ...espressoBase(), milkFoam,
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '170 kcal', caffeine: '140mg', sugar: '12g', fat: '6g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 14, name: 'Cortado Hot Coffee', price: 'Rs 550',
    slug: 'cortado-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Equal parts bold and gentle',
    description: 'A perfectly balanced espresso drink made with equal parts rich espresso and velvety steamed milk. The cortado cuts through the intensity of espresso with silky warmth.',
    flavorNotes: ['Intense Espresso', 'Silky Milk', 'Balanced', 'Clean Finish'],
    tags: ['Balanced', 'Strong', 'Minimal'],
    strength: 4, rotation: 6,
    shapeBg: 'bg-[#6F4A35]', bannerText: 'CORTADO', imgFilter: 'brightness(0.9) contrast(1.1)',
    servingStyle: 'Hot in small glass',
    ingredients: [
      { name: 'Espresso Double Shot', type: 'Coffee Bean', amount: '60ml', note: 'Full extraction, strong body' },
      { name: 'Warm Steamed Milk', type: 'Milk', amount: '60ml', note: 'Equal ratio to espresso' },
    ],
    preparation: [
      { step: 1, action: 'Pull a precise double espresso shot into a small glass.' },
      { step: 2, action: 'Steam milk to 65°C with minimal foam — just velvety texture.' },
      { step: 3, action: 'Pour equal amount of steamed milk directly into the espresso.' },
      { step: 4, action: 'Serve in a 120ml glass immediately.' },
    ],
    nutrition: { calories: '80 kcal', caffeine: '140mg', sugar: '6g', fat: '3g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 15, name: 'Tiramisu Hot Coffee', price: 'Rs 690',
    slug: 'tiramisu-hot-coffee', category: 'Hot Coffee',
    subtitle: 'Italian dessert in a cup',
    description: 'A dreamy hot coffee inspired by the classic Italian Tiramisu. Layered with rich espresso, mascarpone-style cream, cocoa dusting, and a hint of coffee liqueur flavor.',
    flavorNotes: ['Espresso', 'Mascarpone Cream', 'Cocoa Dust', 'Italian Elegance'],
    tags: ['Dessert', 'Italian', 'Indulgent'],
    strength: 4, rotation: -9,
    shapeBg: 'bg-[#6B4A30]', bannerText: 'TIRAMISU', imgFilter: 'sepia(0.4) brightness(0.9) contrast(1.1)',
    servingStyle: 'Hot with cocoa dusting',
    ingredients: [
      ...espressoBase('Dark Roast'), milkFoam,
      { name: 'Tiramisu Cream Sauce', type: 'Sauce', amount: '2 Pumps', note: 'Mascarpone and cocoa blend' },
      { name: 'Premium Cocoa Powder', type: 'Garnish', amount: 'Generous Dusting', note: 'Fine Italian cocoa' },
    ],
    preparation: genericPrep('hot milk'),
    nutrition: { calories: '245 kcal', caffeine: '155mg', sugar: '21g', fat: '9g' },
    gallery: ['/coffee.png'],
  },

  // ── SMOOTHIES ────────────────────────────────────────────────────────────────
  {
    id: 16, name: 'Strawberry Smoothie', price: 'Rs 960',
    slug: 'strawberry-smoothie', category: 'Smoothies',
    subtitle: 'Fresh berry bliss',
    description: 'A vibrant, thick strawberry smoothie blended with fresh strawberries, creamy milk, and a touch of vanilla. Naturally sweet, beautifully pink, and incredibly refreshing.',
    flavorNotes: ['Fresh Strawberry', 'Creamy Vanilla', 'Sweet Berry', 'Smooth Texture'],
    tags: ['Fruity', 'Fresh', 'No Coffee'],
    strength: 0, rotation: 5,
    shapeBg: 'bg-[#E8626F]', bannerText: 'STRAWBERRY', imgFilter: 'hue-rotate(-30deg) saturate(1.4)',
    servingStyle: 'Chilled in tall glass',
    ingredients: [
      { name: 'Fresh Strawberries', type: 'Fruit', amount: '150g', note: 'Locally sourced, ripe and sweet' },
      { name: 'Full Fat Milk', type: 'Milk', amount: '200ml', note: 'For rich creamy body' },
      { name: 'Vanilla Syrup', type: 'Syrup', amount: '1 Pump', note: 'Enhances natural sweetness' },
      { name: 'Ice Cubes', type: 'Cooling', amount: 'Full blend', note: 'For thick, chilled texture' },
    ],
    preparation: [
      { step: 1, action: 'Wash and hull fresh strawberries.' },
      { step: 2, action: 'Blend strawberries with milk, vanilla syrup, and ice until completely smooth.' },
      { step: 3, action: 'Pour into a tall chilled glass.' },
      { step: 4, action: 'Garnish with a fresh strawberry slice on the rim.' },
    ],
    nutrition: { calories: '210 kcal', caffeine: '0mg', sugar: '28g', fat: '5g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 17, name: 'Blueberry Smoothie', price: 'Rs 990',
    slug: 'blueberry-smoothie', category: 'Smoothies',
    subtitle: 'Antioxidant-rich berry blend',
    description: 'A stunning deep-purple blueberry smoothie packed with antioxidants. Blended with creamy milk and a hint of honey for a naturally sweet, nutrient-rich café treat.',
    flavorNotes: ['Wild Blueberry', 'Creamy Base', 'Honey Notes', 'Berry Depth'],
    tags: ['Healthy', 'Antioxidant', 'No Coffee'],
    strength: 0, rotation: -5,
    shapeBg: 'bg-[#5B4F9E]', bannerText: 'BLUEBERRY', imgFilter: 'hue-rotate(200deg) saturate(1.2)',
    servingStyle: 'Chilled in tall glass',
    ingredients: [
      { name: 'Wild Blueberries', type: 'Fruit', amount: '150g', note: 'Frozen or fresh, deep flavor' },
      { name: 'Full Fat Milk', type: 'Milk', amount: '200ml', note: 'Creamy body' },
      { name: 'Raw Honey', type: 'Sweetener', amount: '1 tsp', note: 'Natural sweetness' },
    ],
    preparation: [
      { step: 1, action: 'Add blueberries, milk, and honey to blender.' },
      { step: 2, action: 'Blend on high until completely smooth and frothy.' },
      { step: 3, action: 'Pour into chilled glass and serve.' },
    ],
    nutrition: { calories: '220 kcal', caffeine: '0mg', sugar: '26g', fat: '5g' },
    gallery: ['/coffee.png'],
  },

  // ── ICED TEA ─────────────────────────────────────────────────────────────────
  {
    id: 18, name: 'Peach Iced Tea', price: 'Rs 590',
    slug: 'peach-iced-tea', category: 'Iced Tea',
    subtitle: 'Summer in a glass',
    description: 'Refreshing peach iced tea brewed with premium tea leaves and natural peach flavors. Lightly sweetened and served over ice for the perfect warm-weather café escape.',
    flavorNotes: ['Fresh Peach', 'Premium Tea', 'Lightly Sweet', 'Refreshing Clean'],
    tags: ['Refreshing', 'Fruity', 'No Coffee'],
    strength: 0, rotation: 8,
    shapeBg: 'bg-[#E8A96A]', bannerText: 'PEACH', imgFilter: 'hue-rotate(20deg) saturate(1.3)',
    servingStyle: 'Iced in tall glass with peach slice',
    ingredients: [
      { name: 'Premium Black Tea', type: 'Tea', amount: '2 Bags', note: 'Brewed double strength' },
      { name: 'Natural Peach Syrup', type: 'Syrup', amount: '2 Pumps', note: 'Real peach flavor extract' },
      { name: 'Fresh Ice', type: 'Cooling', amount: 'Full glass', note: 'Keeps drink crisp and cold' },
      { name: 'Peach Slice', type: 'Garnish', amount: '1 slice', note: 'Fresh garnish on rim' },
    ],
    preparation: [
      { step: 1, action: 'Brew black tea double-strength and allow to cool completely.' },
      { step: 2, action: 'Fill glass with fresh ice cubes.' },
      { step: 3, action: 'Add peach syrup and pour chilled tea over ice.' },
      { step: 4, action: 'Stir gently and garnish with a peach slice.' },
    ],
    nutrition: { calories: '80 kcal', caffeine: '40mg', sugar: '18g', fat: '0g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 19, name: 'Passion Fruit Iced Tea', price: 'Rs 590',
    slug: 'passion-fruit-iced-tea', category: 'Iced Tea',
    subtitle: 'Tropical escape in every sip',
    description: 'A vibrant, tropical passion fruit iced tea with a perfect balance of tart and sweet. Brewed with premium tea and real passion fruit syrup, served ice-cold for ultimate refreshment.',
    flavorNotes: ['Passion Fruit Tart', 'Premium Tea', 'Tropical Sweet', 'Floral Notes'],
    tags: ['Tropical', 'Refreshing', 'No Coffee'],
    strength: 0, rotation: -8,
    shapeBg: 'bg-[#D4894A]', bannerText: 'PASSION', imgFilter: 'hue-rotate(15deg) saturate(1.4)',
    servingStyle: 'Iced in tall glass',
    ingredients: [
      { name: 'Premium Green Tea', type: 'Tea', amount: '2 Bags', note: 'Lighter body for tropical notes' },
      { name: 'Passion Fruit Syrup', type: 'Syrup', amount: '2 Pumps', note: 'Real passion fruit extract' },
      { name: 'Fresh Ice', type: 'Cooling', amount: 'Full glass', note: 'Perfectly chilled' },
    ],
    preparation: genericPrep('chilled tea'),
    nutrition: { calories: '85 kcal', caffeine: '30mg', sugar: '20g', fat: '0g' },
    gallery: ['/coffee.png'],
  },

  // ── MOCKTAILS ────────────────────────────────────────────────────────────────
  {
    id: 20, name: 'Mixed Berry Mocktail', price: 'Rs 690',
    slug: 'mixed-berry-mocktail', category: 'Mocktails',
    subtitle: 'A party of berries',
    description: 'A sophisticated mixed berry mocktail blending strawberry, blueberry, and raspberry flavors with sparkling water and fresh mint. Elegant, refreshing, and completely alcohol-free.',
    flavorNotes: ['Mixed Berries', 'Sparkling Fresh', 'Mint Accent', 'Sweet Tart'],
    tags: ['Refreshing', 'Elegant', 'Alcohol-Free'],
    strength: 0, rotation: 5,
    shapeBg: 'bg-[#8B4A7A]', bannerText: 'BERRIES', imgFilter: 'hue-rotate(280deg) saturate(1.2)',
    servingStyle: 'Served in mocktail glass with mint',
    ingredients: [
      { name: 'Mixed Berry Purée', type: 'Fruit', amount: '60ml', note: 'Strawberry, blueberry, raspberry blend' },
      { name: 'Sparkling Water', type: 'Liquid', amount: '150ml', note: 'For effervescent finish' },
      { name: 'Fresh Mint Leaves', type: 'Garnish', amount: 'Sprig', note: 'Muddled for aroma' },
      { name: 'Simple Syrup', type: 'Sweetener', amount: '15ml', note: 'Balance tartness' },
    ],
    preparation: genericPrep('sparkling base'),
    nutrition: { calories: '95 kcal', caffeine: '0mg', sugar: '22g', fat: '0g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 21, name: 'Strawberry Mocktail', price: 'Rs 690',
    slug: 'strawberry-mocktail', category: 'Mocktails',
    subtitle: 'Fresh, fizzy, and fabulous',
    description: 'A beautiful strawberry mocktail with fresh strawberry purée, sparkling water, and a squeeze of lime. Bright, refreshing, and as elegant as any cocktail.',
    flavorNotes: ['Fresh Strawberry', 'Citrus Lime', 'Sparkling Finish', 'Sweet Floral'],
    tags: ['Fruity', 'Fizzy', 'Alcohol-Free'],
    strength: 0, rotation: -5,
    shapeBg: 'bg-[#E8626F]', bannerText: 'STRAWBERRY', imgFilter: 'hue-rotate(-30deg) saturate(1.4)',
    servingStyle: 'Served in mocktail glass',
    ingredients: [
      { name: 'Fresh Strawberry Purée', type: 'Fruit', amount: '60ml', note: 'Blended fresh strawberries' },
      { name: 'Sparkling Water', type: 'Liquid', amount: '150ml', note: 'Natural carbonation' },
      { name: 'Fresh Lime Juice', type: 'Citrus', amount: '15ml', note: 'Brightens flavors' },
    ],
    preparation: genericPrep('sparkling base'),
    nutrition: { calories: '90 kcal', caffeine: '0mg', sugar: '20g', fat: '0g' },
    gallery: ['/coffee.png'],
  },

  // ── ICED COFFEE ──────────────────────────────────────────────────────────────
  {
    id: 22, name: 'Iced Shaken Espresso Brown Sugar', price: 'Rs 790',
    slug: 'iced-shaken-espresso-brown-sugar', category: 'Iced Coffee',
    subtitle: 'Shaken to perfection',
    description: 'Smooth espresso shaken with brown sugar syrup and a dash of cinnamon. The shaking process creates a beautiful froth and perfectly melds flavors for an irresistible iced treat.',
    flavorNotes: ['Brown Sugar', 'Cinnamon Spice', 'Shaken Espresso', 'Smooth Froth'],
    tags: ['Shaken', 'Spiced', 'Signature'],
    strength: 4, rotation: 10,
    shapeBg: 'bg-[#8B5E3C]', bannerText: 'BROWN SUGAR', imgFilter: 'sepia(0.4) saturate(1.2)',
    servingStyle: 'Shaken, served over ice',
    ingredients: [
      ...espressoBase(), ice,
      { name: 'Brown Sugar Syrup', type: 'Syrup', amount: '2 Pumps', note: 'Molasses-rich dark sugar' },
      { name: 'Ground Cinnamon', type: 'Spice', amount: 'Pinch', note: 'Aromatic warm spice' },
    ],
    preparation: [
      { step: 1, action: 'Pull a double espresso shot and let cool briefly.' },
      { step: 2, action: 'Add espresso, brown sugar syrup, and cinnamon into a cocktail shaker with ice.' },
      { step: 3, action: 'Shake vigorously for 15-20 seconds to create a frothy texture.' },
      { step: 4, action: 'Strain into a glass filled with fresh ice and serve.' },
    ],
    nutrition: { calories: '150 kcal', caffeine: '150mg', sugar: '24g', fat: '0g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 23, name: 'Americano Iced Coffee', price: 'Rs 550',
    slug: 'americano-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Bold and refreshingly cold',
    description: 'Refreshing iced Americano made with bold espresso shots diluted with chilled water and served over ice. Clean, pure, and deeply satisfying on a warm day.',
    flavorNotes: ['Bold Espresso', 'Clean Body', 'Refreshing', 'Crisp Finish'],
    tags: ['Classic', 'Bold', 'Simple'],
    strength: 4, rotation: -6,
    shapeBg: 'bg-[#4B3226]', bannerText: 'AMERICANO', imgFilter: 'brightness(0.8) contrast(1.2)',
    servingStyle: 'Iced in tall glass',
    ingredients: [
      { name: 'Premium Arabica Espresso', type: 'Coffee Bean', amount: 'Double Shot', note: 'Strong, full body' },
      { name: 'Chilled Filtered Water', type: 'Water', amount: '150ml', note: 'Cold for iced dilution' },
      ice,
    ],
    preparation: genericPrep('iced water'),
    nutrition: { calories: '10 kcal', caffeine: '140mg', sugar: '0g', fat: '0g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 24, name: 'Popcorn Iced Coffee', price: 'Rs 790',
    slug: 'popcorn-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Sweet cinema in a glass',
    description: 'Smooth chilled coffee blended with creamy popcorn flavoring topped with cold foam and caramel popcorn. An unexpected café adventure you\'ll keep coming back for.',
    flavorNotes: ['Buttery Popcorn', 'Caramel Sweetness', 'Cold Brew Coffee', 'Sweet Foam'],
    tags: ['Unique', 'Indulgent', 'Signature'],
    strength: 3, rotation: 8,
    shapeBg: 'bg-[#C49A3A]', bannerText: 'POPCORN', imgFilter: 'sepia(0.35) saturate(1.3)',
    servingStyle: 'Iced with cold foam and popcorn',
    ingredients: [
      ...espressoBase(), ice, coldFoam,
      { name: 'Popcorn Caramel Syrup', type: 'Syrup', amount: '2 Pumps', note: 'Buttery caramel popcorn essence' },
      { name: 'Caramel Popcorn Pieces', type: 'Garnish', amount: 'Top garnish', note: 'Crunchy sweet garnish' },
    ],
    preparation: genericPrep('iced milk'),
    nutrition: { calories: '230 kcal', caffeine: '140mg', sugar: '28g', fat: '8g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 25, name: 'Lotus Iced Coffee', price: 'Rs 950',
    slug: 'lotus-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Biscoff royalty on ice',
    description: 'Smooth refreshing iced coffee infused with delicate lotus flavor topped with cold foam and lotus shavings. Premium, distinctive, and deeply satisfying.',
    flavorNotes: ['Lotus Biscoff', 'Caramel Spice', 'Cold Espresso', 'Silky Foam'],
    tags: ['Premium', 'Signature', 'Biscoff'],
    strength: 3, rotation: -10,
    shapeBg: 'bg-[#C47E44]', bannerText: 'LOTUS', imgFilter: 'sepia(0.4) saturate(1.3)',
    servingStyle: 'Iced with lotus cold foam',
    ingredients: [
      ...espressoBase(), ice, coldFoam,
      { name: 'Lotus Biscoff Sauce', type: 'Sauce', amount: '2 Pumps', note: 'Imported caramelized biscuit sauce' },
      { name: 'Lotus Shavings', type: 'Garnish', amount: 'Garnish', note: 'Crushed Lotus cookies on top' },
    ],
    preparation: genericPrep('iced milk'),
    nutrition: { calories: '260 kcal', caffeine: '140mg', sugar: '30g', fat: '9g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 26, name: 'Latte Iced Coffee', price: 'Rs 650',
    slug: 'latte-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Cool, creamy, classic',
    description: 'A refreshing iced latte with smooth espresso and cold milk poured over ice. Beautifully layered, perfectly balanced, and endlessly drinkable.',
    flavorNotes: ['Smooth Espresso', 'Cold Creamy Milk', 'Subtle Sweet', 'Clean Finish'],
    tags: ['Classic', 'Creamy', 'Refreshing'],
    strength: 3, rotation: 6,
    shapeBg: 'bg-[#B9805D]', bannerText: 'LATTE', imgFilter: 'sepia(0.2) saturate(1.1)',
    servingStyle: 'Iced in tall glass',
    ingredients: [
      ...espressoBase(), ice,
      { name: 'Cold Fresh Milk', type: 'Milk', amount: '200ml', note: 'Poured over ice for layering' },
    ],
    preparation: genericPrep('cold milk'),
    nutrition: { calories: '140 kcal', caffeine: '140mg', sugar: '10g', fat: '5g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 27, name: 'Caramel Iced Coffee', price: 'Rs 750',
    slug: 'caramel-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Liquid gold on ice',
    description: 'Smooth chilled coffee blended with rich caramel syrup and creamy milk served over ice. An indulgent yet refreshing iced coffee with deep caramel sweetness.',
    flavorNotes: ['Rich Caramel', 'Cold Espresso', 'Creamy Milk', 'Sweet Finish'],
    tags: ['Sweet', 'Caramel', 'Refreshing'],
    strength: 3, rotation: -7,
    shapeBg: 'bg-[#B9805D]', bannerText: 'CARAMEL', imgFilter: 'sepia(0.35) saturate(1.3) hue-rotate(10deg)',
    servingStyle: 'Iced with caramel drizzle',
    ingredients: [
      ...espressoBase(), ice,
      { name: 'Cold Milk', type: 'Milk', amount: '150ml', note: 'Creamy base' },
      { name: 'House Caramel Sauce', type: 'Sauce', amount: '2 Pumps + Drizzle', note: 'Sea-salted in-house caramel' },
    ],
    preparation: genericPrep('cold milk'),
    nutrition: { calories: '195 kcal', caffeine: '140mg', sugar: '26g', fat: '5g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 28, name: 'Strawberry Iced Coffee', price: 'Rs 790',
    slug: 'strawberry-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Berry meets brew',
    description: 'Refreshing strawberry iced coffee blending smooth cold brew with fresh strawberry flavors and cream. A beautiful pink-hued coffee experience unlike anything else.',
    flavorNotes: ['Fresh Strawberry', 'Cold Brew Coffee', 'Sweet Berry', 'Creamy Finish'],
    tags: ['Fruity', 'Unique', 'Instagram Worthy'],
    strength: 3, rotation: 9,
    shapeBg: 'bg-[#E8626F]', bannerText: 'STRAWBERRY', imgFilter: 'hue-rotate(-20deg) saturate(1.3)',
    servingStyle: 'Iced in tall glass',
    ingredients: [
      ...espressoBase(), ice,
      { name: 'Strawberry Sauce', type: 'Sauce', amount: '2 Pumps', note: 'House-made fresh strawberry sauce' },
      { name: 'Cold Cream', type: 'Milk', amount: '100ml', note: 'Light whipping cream' },
    ],
    preparation: genericPrep('cold milk'),
    nutrition: { calories: '210 kcal', caffeine: '140mg', sugar: '28g', fat: '7g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 29, name: 'Tiramisu Iced Coffee', price: 'Rs 750',
    slug: 'tiramisu-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Italian dessert meets cold brew',
    description: 'Smooth iced coffee infused with rich tiramisu flavors featuring espresso and cocoa topped with cold foam. The elegance of Italy\'s finest dessert, in a glass.',
    flavorNotes: ['Tiramisu Cream', 'Cold Espresso', 'Cocoa Notes', 'Sweet Cold Foam'],
    tags: ['Dessert', 'Elegant', 'Italian'],
    strength: 4, rotation: -8,
    shapeBg: 'bg-[#6B4A30]', bannerText: 'TIRAMISU', imgFilter: 'sepia(0.4) brightness(0.9)',
    servingStyle: 'Iced with cold foam and cocoa',
    ingredients: [
      ...espressoBase('Dark Roast'), ice, coldFoam,
      { name: 'Tiramisu Syrup', type: 'Syrup', amount: '2 Pumps', note: 'Mascarpone and espresso essence' },
      { name: 'Cocoa Powder', type: 'Garnish', amount: 'Dusting', note: 'Fine Italian cocoa on foam' },
    ],
    preparation: genericPrep('iced milk'),
    nutrition: { calories: '235 kcal', caffeine: '155mg', sugar: '26g', fat: '8g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 30, name: 'Mocha Latte Iced Coffee', price: 'Rs 790',
    slug: 'mocha-latte-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Chocolate dreams on ice',
    description: 'Smooth blend of rich espresso and velvety milk with mocha chocolate flavoring served ice cold. A decadent cold coffee for true chocolate lovers.',
    flavorNotes: ['Dark Mocha', 'Cold Espresso', 'Velvety Milk', 'Chocolate Depth'],
    tags: ['Chocolate', 'Rich', 'Indulgent'],
    strength: 4, rotation: 7,
    shapeBg: 'bg-[#4E3629]', bannerText: 'MOCHA', imgFilter: 'brightness(0.85) saturate(1.2)',
    servingStyle: 'Iced in tall glass',
    ingredients: [
      ...espressoBase('Dark Roast'), ice,
      { name: 'Cold Milk', type: 'Milk', amount: '150ml', note: 'Full fat for richness' },
      { name: 'Belgian Mocha Sauce', type: 'Sauce', amount: '2 Pumps', note: '72% dark chocolate blend' },
    ],
    preparation: genericPrep('cold milk'),
    nutrition: { calories: '230 kcal', caffeine: '150mg', sugar: '28g', fat: '8g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 31, name: 'N² Signature Iced Coffee', price: 'Rs 890',
    slug: 'n2-signature-iced-coffee', category: 'Iced Coffee',
    subtitle: 'The pinnacle of cold craft',
    description: 'Rich indulgent blend infused with Kinder Bueno topped with silky cold foam. Our most iconic creation — the drink that defines N Squared café experience.',
    flavorNotes: ['Kinder Bueno', 'Hazelnut Chocolate', 'Cold Espresso', 'Silky Cold Foam'],
    tags: ['House Special', 'Signature', 'Best Seller'],
    strength: 3, rotation: -11,
    shapeBg: 'bg-[#8B5E3C]', bannerText: 'N²', imgFilter: 'sepia(0.3) contrast(1.1)',
    servingStyle: 'Iced with signature cold foam',
    ingredients: [
      ...espressoBase(), ice, coldFoam,
      { name: 'Kinder Bueno Sauce', type: 'Sauce', amount: '2 Pumps', note: 'Authentic hazelnut chocolate' },
      { name: 'Kinder Bueno', type: 'Garnish', amount: 'Crumbled on top', note: 'Real Kinder Bueno garnish' },
    ],
    preparation: genericPrep('iced milk'),
    nutrition: { calories: '280 kcal', caffeine: '140mg', sugar: '30g', fat: '12g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 32, name: 'Hazelnut Iced Coffee', price: 'Rs 750',
    slug: 'hazelnut-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Nutty richness, served cold',
    description: 'Smooth refreshing hazelnut iced coffee brewed with premium beans and creamy milk. The warm, nutty richness of hazelnut perfectly complements the cold espresso base.',
    flavorNotes: ['Roasted Hazelnut', 'Cold Espresso', 'Creamy Milk', 'Smooth Nuttiness'],
    tags: ['Nutty', 'Refreshing', 'Classic'],
    strength: 3, rotation: 6,
    shapeBg: 'bg-[#8B5E3C]', bannerText: 'HAZELNUT', imgFilter: 'sepia(0.35) saturate(1.1)',
    servingStyle: 'Iced in tall glass',
    ingredients: [
      ...espressoBase(), ice,
      { name: 'Cold Milk', type: 'Milk', amount: '150ml', note: 'Creamy base' },
      { name: 'Hazelnut Syrup', type: 'Syrup', amount: '2 Pumps', note: 'Real hazelnut extract' },
    ],
    preparation: genericPrep('cold milk'),
    nutrition: { calories: '180 kcal', caffeine: '140mg', sugar: '20g', fat: '5g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 33, name: 'Pistachio Iced Coffee', price: 'Rs 950',
    slug: 'pistachio-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Luxury nut in liquid form',
    description: 'Rich espresso blended with chilled milk and smooth pistachio cream. Topped with a dusting of crushed pistachios for a truly premium iced coffee experience.',
    flavorNotes: ['Premium Pistachio', 'Cold Espresso', 'Creamy Milk', 'Nutty Elegance'],
    tags: ['Premium', 'Luxury', 'Nutty'],
    strength: 3, rotation: -9,
    shapeBg: 'bg-[#7A9E6F]', bannerText: 'PISTACHIO', imgFilter: 'hue-rotate(80deg) saturate(0.85)',
    servingStyle: 'Iced with pistachio dust',
    ingredients: [
      ...espressoBase(), ice,
      { name: 'Cold Milk', type: 'Milk', amount: '150ml', note: 'Full fat for richness' },
      { name: 'Pistachio Cream', type: 'Sauce', amount: '2 Pumps', note: 'Imported pistachio paste' },
      { name: 'Crushed Pistachios', type: 'Garnish', amount: 'Pinch', note: 'Freshly crushed garnish' },
    ],
    preparation: genericPrep('cold milk'),
    nutrition: { calories: '270 kcal', caffeine: '140mg', sugar: '22g', fat: '12g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 34, name: 'Spanish Iced Coffee', price: 'Rs 700',
    slug: 'spanish-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Mediterranean cool',
    description: 'The iced version of our beloved Spanish hot coffee. Condensed milk, bold espresso, and cold milk poured over ice for a sweet, indulgent, authentically Spanish experience.',
    flavorNotes: ['Condensed Milk Sweet', 'Bold Espresso', 'Cold Milk', 'Rich Body'],
    tags: ['Sweet', 'Rich', 'Mediterranean'],
    strength: 4, rotation: 7,
    shapeBg: 'bg-[#9E6340]', bannerText: 'SPANISH', imgFilter: 'sepia(0.3) saturate(1.2)',
    servingStyle: 'Iced in glass',
    ingredients: [
      ...espressoBase('Dark Roast'), ice,
      { name: 'Sweetened Condensed Milk', type: 'Milk', amount: '30ml', note: 'Sweet, rich base layer' },
      { name: 'Cold Whole Milk', type: 'Milk', amount: '100ml', note: 'Poured over for layers' },
    ],
    preparation: genericPrep('cold condensed milk'),
    nutrition: { calories: '215 kcal', caffeine: '150mg', sugar: '30g', fat: '6g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 35, name: 'French Vanilla Iced Coffee', price: 'Rs 790',
    slug: 'french-vanilla-iced-coffee', category: 'Iced Coffee',
    subtitle: 'Vanilla elegance on ice',
    description: 'Smooth refreshing iced coffee infused with rich French vanilla flavor. Classic, comforting, and beautifully balanced over a bed of fresh ice.',
    flavorNotes: ['French Vanilla', 'Cold Espresso', 'Creamy Milk', 'Sweet Warmth'],
    tags: ['Classic', 'Sweet', 'Refreshing'],
    strength: 3, rotation: -5,
    shapeBg: 'bg-[#C4A96A]', bannerText: 'VANILLA', imgFilter: 'sepia(0.3) saturate(1.2) brightness(1.05)',
    servingStyle: 'Iced in tall glass',
    ingredients: [
      ...espressoBase(), ice,
      { name: 'Cold Milk', type: 'Milk', amount: '150ml', note: 'Smooth, creamy base' },
      { name: 'French Vanilla Syrup', type: 'Syrup', amount: '2 Pumps', note: 'Real vanilla bean extract' },
    ],
    preparation: genericPrep('cold milk'),
    nutrition: { calories: '185 kcal', caffeine: '140mg', sugar: '22g', fat: '5g' },
    gallery: ['/coffee.png'],
  },

  // ── MATCHA ───────────────────────────────────────────────────────────────────
  {
    id: 36, name: 'Original Matcha', price: 'Rs 790',
    slug: 'original-matcha', category: 'Matcha',
    subtitle: 'Ceremonial purity',
    description: 'Premium ceremonial-grade matcha whisked to a smooth, vibrant green perfection. Served with cold milk over ice or steamed — a pure, grassy, and umami-rich matcha experience.',
    flavorNotes: ['Ceremonial Matcha', 'Umami Depth', 'Grassy Notes', 'Clean Finish'],
    tags: ['Pure', 'Premium', 'Ceremonial'],
    strength: 2, rotation: 8,
    shapeBg: 'bg-[#5D8A66]', bannerText: 'MATCHA', imgFilter: 'hue-rotate(100deg) saturate(1.4)',
    servingStyle: 'Iced or hot matcha',
    ingredients: [
      { name: 'Ceremonial Grade Matcha', type: 'Tea', amount: '3g', note: 'Premium Japanese ceremonial grade' },
      { name: 'Cold Oat Milk', type: 'Milk', amount: '200ml', note: 'Creamy plant base' },
      ice,
    ],
    preparation: [
      { step: 1, action: 'Sift 3g of ceremonial matcha into a bowl to remove clumps.' },
      { step: 2, action: 'Whisk with 60ml of 80°C water using a bamboo whisk in a W motion until frothy.' },
      { step: 3, action: 'Fill glass with fresh ice and pour cold oat milk.' },
      { step: 4, action: 'Pour whisked matcha over the milk for a beautiful ombre effect.' },
    ],
    nutrition: { calories: '130 kcal', caffeine: '70mg', sugar: '12g', fat: '4g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 37, name: 'Strawberry Matcha', price: 'Rs 890',
    slug: 'strawberry-matcha', category: 'Matcha',
    subtitle: 'Berry meets green serenity',
    description: 'A stunning layered drink with fresh strawberry sauce at the base, creamy milk in the middle, and vibrant ceremonial matcha on top. A feast for the eyes and the palate.',
    flavorNotes: ['Fresh Strawberry', 'Ceremonial Matcha', 'Sweet Berry', 'Grassy Balance'],
    tags: ['Beautiful', 'Fruity', 'Instagram Worthy'],
    strength: 2, rotation: -6,
    shapeBg: 'bg-[#C4A0A0]', bannerText: 'STRAWMATCHA', imgFilter: 'hue-rotate(330deg) saturate(1.2)',
    servingStyle: 'Iced layered glass',
    ingredients: [
      { name: 'Ceremonial Grade Matcha', type: 'Tea', amount: '3g', note: 'Whisked fresh' },
      { name: 'Cold Oat Milk', type: 'Milk', amount: '150ml', note: 'Smooth plant milk' },
      { name: 'Fresh Strawberry Sauce', type: 'Sauce', amount: '40ml', note: 'House-made base layer' },
      ice,
    ],
    preparation: [
      { step: 1, action: 'Add fresh strawberry sauce to the bottom of a glass.' },
      { step: 2, action: 'Fill with ice cubes and pour cold oat milk gently over.' },
      { step: 3, action: 'Whisk matcha separately and pour slowly over the back of a spoon on top.' },
      { step: 4, action: 'Serve without stirring to maintain the beautiful layers.' },
    ],
    nutrition: { calories: '180 kcal', caffeine: '70mg', sugar: '24g', fat: '4g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 38, name: 'Vanilla Matcha', price: 'Rs 850',
    slug: 'vanilla-matcha', category: 'Matcha',
    subtitle: 'Softness in every layer',
    description: 'Smooth matcha infused with sweet vanilla topped with silky cold foam. The gentle sweetness of vanilla perfectly balances the earthy depth of ceremonial matcha.',
    flavorNotes: ['Ceremonial Matcha', 'Sweet Vanilla', 'Silky Cold Foam', 'Earthy Balance'],
    tags: ['Sweet', 'Soft', 'Premium'],
    strength: 2, rotation: 6,
    shapeBg: 'bg-[#7A9E7A]', bannerText: 'VANILLA', imgFilter: 'hue-rotate(90deg) saturate(1.2)',
    servingStyle: 'Iced with vanilla cold foam',
    ingredients: [
      { name: 'Ceremonial Grade Matcha', type: 'Tea', amount: '3g', note: 'Whisked to smooth paste' },
      { name: 'Cold Oat Milk', type: 'Milk', amount: '150ml', note: 'Creamy plant base' },
      { name: 'French Vanilla Syrup', type: 'Syrup', amount: '1 Pump', note: 'Subtle sweetness' },
      { ...coldFoam, note: 'Silky cold-whipped vanilla cream' },
      ice,
    ],
    preparation: genericPrep('iced matcha'),
    nutrition: { calories: '200 kcal', caffeine: '70mg', sugar: '22g', fat: '6g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 39, name: 'Blueberry Matcha', price: 'Rs 900',
    slug: 'blueberry-matcha', category: 'Matcha',
    subtitle: 'Antioxidant bliss in layers',
    description: 'Smooth ceremonial matcha layered with sweet blueberry notes finished with silky cold foam. A stunning purple-and-green layered drink packed with natural goodness.',
    flavorNotes: ['Blueberry Sweet', 'Ceremonial Matcha', 'Silky Cold Foam', 'Earthy Berry'],
    tags: ['Antioxidant', 'Beautiful', 'Healthy'],
    strength: 2, rotation: -8,
    shapeBg: 'bg-[#5B6E9E]', bannerText: 'BLUEBERRY', imgFilter: 'hue-rotate(200deg) saturate(1.1)',
    servingStyle: 'Iced layered with cold foam',
    ingredients: [
      { name: 'Ceremonial Grade Matcha', type: 'Tea', amount: '3g', note: 'Premium whisked matcha' },
      { name: 'Cold Oat Milk', type: 'Milk', amount: '150ml', note: 'Smooth plant base' },
      { name: 'Blueberry Sauce', type: 'Sauce', amount: '40ml', note: 'House-made blueberry compote' },
      { ...coldFoam },
      ice,
    ],
    preparation: genericPrep('iced matcha layered'),
    nutrition: { calories: '210 kcal', caffeine: '70mg', sugar: '26g', fat: '6g' },
    gallery: ['/coffee.png'],
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    id: 40, name: 'Basque Cheesecake', price: 'Rs 890',
    slug: 'basque-cheesecake', category: 'Desserts',
    subtitle: 'The burnt beauty of San Sebastián',
    description: 'A rich, creamy Basque-style cheesecake with a beautifully caramelized top and a jiggly, custard-like center. Baked fresh daily. A masterpiece of simple luxury.',
    flavorNotes: ['Rich Cream Cheese', 'Caramelized Top', 'Custard Center', 'Sweet Warmth'],
    tags: ['Dessert', 'Baked Fresh', 'Premium'],
    strength: 0, rotation: 0,
    shapeBg: 'bg-[#C49A3A]', bannerText: 'CHEESECAKE', imgFilter: 'sepia(0.5) saturate(1.3)',
    servingStyle: 'Served at room temperature',
    ingredients: [
      { name: 'Premium Cream Cheese', type: 'Dairy', amount: '500g', note: 'Full-fat Philadelphia cream cheese' },
      { name: 'Free-Range Eggs', type: 'Binding', amount: '5 large', note: 'For custard texture' },
      { name: 'Heavy Cream', type: 'Dairy', amount: '250ml', note: 'Creates silky richness' },
      { name: 'Raw Sugar', type: 'Sweetener', amount: '200g', note: 'Caramelizes the top perfectly' },
    ],
    preparation: [
      { step: 1, action: 'Beat cream cheese and sugar until completely smooth and fluffy.' },
      { step: 2, action: 'Add eggs one by one, mixing gently after each addition.' },
      { step: 3, action: 'Fold in heavy cream and pour into parchment-lined tin.' },
      { step: 4, action: 'Bake at 220°C for 28-30 minutes until top is deeply caramelized.' },
    ],
    nutrition: { calories: '380 kcal', caffeine: '0mg', sugar: '32g', fat: '26g' },
    gallery: ['/coffee.png'],
  },

  // ── BAKERY ITEMS ─────────────────────────────────────────────────────────────
  {
    id: 41, name: 'Lotus Brownie', price: 'Rs 600',
    slug: 'lotus-brownie', category: 'Bakery Items',
    subtitle: 'Fudgy meets Biscoff',
    description: 'A rich, dense chocolate brownie swirled with Lotus Biscoff spread. Fudgy in the center, crispy on top, and absolutely irresistible alongside your favorite coffee.',
    flavorNotes: ['Dark Chocolate', 'Lotus Biscoff', 'Fudgy Center', 'Caramel Swirl'],
    tags: ['Biscoff', 'Chocolate', 'Baked Fresh'],
    strength: 0, rotation: 5,
    shapeBg: 'bg-[#6B4A30]', bannerText: 'BROWNIE', imgFilter: 'sepia(0.5) brightness(0.85)',
    servingStyle: 'Served at room temperature',
    ingredients: [
      { name: 'Dark Belgian Chocolate', type: 'Chocolate', amount: '200g', note: '72% cocoa rich chocolate' },
      { name: 'Lotus Biscoff Spread', type: 'Filling', amount: '100g', note: 'Swirled through batter' },
      { name: 'Free-Range Eggs', type: 'Binding', amount: '3 large', note: 'Creates fudgy texture' },
      { name: 'Unsalted Butter', type: 'Fat', amount: '150g', note: 'For moisture and richness' },
    ],
    preparation: genericPrep('baking'),
    nutrition: { calories: '340 kcal', caffeine: '15mg', sugar: '30g', fat: '18g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 42, name: 'Butter Croissant', price: 'Rs 590',
    slug: 'butter-croissant', category: 'Bakery Items',
    subtitle: 'French perfection, daily baked',
    description: 'A perfectly laminated French butter croissant with 27 flaky layers. Golden, buttery, and impossibly light — baked fresh every morning to pair with your morning coffee.',
    flavorNotes: ['Rich Butter', 'Flaky Layers', 'Light Yeast', 'Golden Crisp'],
    tags: ['French', 'Classic', 'Baked Fresh'],
    strength: 0, rotation: -5,
    shapeBg: 'bg-[#C49A3A]', bannerText: 'CROISSANT', imgFilter: 'sepia(0.4) brightness(1.05)',
    servingStyle: 'Served warm',
    ingredients: [
      { name: 'Premium Unsalted Butter', type: 'Fat', amount: '250g', note: '83% fat French-style butter' },
      { name: 'Artisanal Flour', type: 'Base', amount: '500g', note: 'High-protein baker\'s flour' },
      { name: 'Active Dry Yeast', type: 'Leavening', amount: '7g', note: 'For perfect rise' },
    ],
    preparation: genericPrep('baking'),
    nutrition: { calories: '290 kcal', caffeine: '0mg', sugar: '8g', fat: '16g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 43, name: 'Pistachio Croissant', price: 'Rs 850',
    slug: 'pistachio-croissant', category: 'Bakery Items',
    subtitle: 'Green luxury on flaky pastry',
    description: 'Our classic butter croissant filled and topped with luxurious pistachio frangipane cream and crushed pistachios. The ultimate premium bakery item.',
    flavorNotes: ['Premium Pistachio', 'Buttery Flaky', 'Sweet Frangipane', 'Nutty Crust'],
    tags: ['Premium', 'Pistachio', 'Luxury Bake'],
    strength: 0, rotation: 6,
    shapeBg: 'bg-[#7A9E6F]', bannerText: 'PISTACHIO', imgFilter: 'hue-rotate(80deg) saturate(0.9)',
    servingStyle: 'Served warm',
    ingredients: [
      { name: 'Butter Croissant Base', type: 'Pastry', amount: '1 whole', note: 'Laminated French croissant' },
      { name: 'Pistachio Frangipane', type: 'Filling', amount: '80g', note: 'Cream almond-pistachio filling' },
      { name: 'Crushed Pistachios', type: 'Topping', amount: 'Generous', note: 'Fresh crushed on top' },
    ],
    preparation: genericPrep('baking'),
    nutrition: { calories: '410 kcal', caffeine: '0mg', sugar: '18g', fat: '24g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 44, name: 'Simple Brownie', price: 'Rs 550',
    slug: 'simple-brownie', category: 'Bakery Items',
    subtitle: 'Classic chocolate perfection',
    description: 'A timeless, fudgy dark chocolate brownie. No frills, no gimmicks — just pure, rich, dense chocolate goodness baked to perfection. Pairs beautifully with any coffee.',
    flavorNotes: ['Pure Dark Chocolate', 'Fudgy Dense', 'Subtle Bitter', 'Classic Cocoa'],
    tags: ['Classic', 'Chocolate', 'Baked Fresh'],
    strength: 0, rotation: -6,
    shapeBg: 'bg-[#4E3629]', bannerText: 'BROWNIE', imgFilter: 'sepia(0.5) brightness(0.8)',
    servingStyle: 'Served at room temperature',
    ingredients: [
      { name: 'Dark Chocolate 70%', type: 'Chocolate', amount: '200g', note: 'Rich, intense cocoa' },
      { name: 'Eggs', type: 'Binding', amount: '3 large', note: 'For density and structure' },
      { name: 'Unsalted Butter', type: 'Fat', amount: '130g', note: 'Creates the fudgy core' },
    ],
    preparation: genericPrep('baking'),
    nutrition: { calories: '310 kcal', caffeine: '12mg', sugar: '28g', fat: '16g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 45, name: 'Almond Croissant', price: 'Rs 790',
    slug: 'almond-croissant', category: 'Bakery Items',
    subtitle: 'French bakery royalty',
    description: 'A twice-baked butter croissant filled with almond frangipane cream and topped with sliced toasted almonds and powdered sugar. The sophisticated bakery lover\'s choice.',
    flavorNotes: ['Toasted Almond', 'Sweet Frangipane', 'Buttery Flaky', 'Powdered Sugar Finish'],
    tags: ['Classic', 'Almond', 'French Baked'],
    strength: 0, rotation: 8,
    shapeBg: 'bg-[#C4A96A]', bannerText: 'ALMOND', imgFilter: 'sepia(0.3) brightness(1.05)',
    servingStyle: 'Served warm',
    ingredients: [
      { name: 'Butter Croissant Base', type: 'Pastry', amount: '1 whole', note: 'Twice-baked for crispy exterior' },
      { name: 'Almond Frangipane', type: 'Filling', amount: '80g', note: 'Sweet almond cream filling' },
      { name: 'Sliced Almonds', type: 'Topping', amount: 'Generous', note: 'Toasted for crunch' },
      { name: 'Powdered Sugar', type: 'Garnish', amount: 'Dusting', note: 'Final dusting on top' },
    ],
    preparation: genericPrep('baking'),
    nutrition: { calories: '380 kcal', caffeine: '0mg', sugar: '20g', fat: '22g' },
    gallery: ['/coffee.png'],
  },

  // ── SANDWICHES ───────────────────────────────────────────────────────────────
  {
    id: 46, name: 'Chicken Garlic Sandwich', price: 'Rs 1,050',
    slug: 'chicken-garlic-sandwich', category: 'Sandwiches',
    subtitle: 'Bold garlic, tender chicken',
    description: 'Juicy grilled chicken breast marinated in roasted garlic and herbs, served in a toasted artisan bun with fresh lettuce, tomato, and our house garlic aioli.',
    flavorNotes: ['Roasted Garlic', 'Herb Chicken', 'Fresh Crisp Veg', 'Garlic Aioli'],
    tags: ['Savory', 'Hearty', 'Grilled'],
    strength: 0, rotation: 0,
    shapeBg: 'bg-[#C49A3A]', bannerText: 'GARLIC', imgFilter: 'sepia(0.35) saturate(1.2)',
    servingStyle: 'Toasted artisan bun',
    ingredients: [
      { name: 'Grilled Chicken Breast', type: 'Protein', amount: '150g', note: 'Marinated in roasted garlic and herbs' },
      { name: 'Artisan Burger Bun', type: 'Bread', amount: '1 bun', note: 'Toasted for crispy texture' },
      { name: 'House Garlic Aioli', type: 'Sauce', amount: '30ml', note: 'Made with roasted garlic' },
      { name: 'Fresh Lettuce & Tomato', type: 'Vegetables', amount: 'Fresh', note: 'Crisp and fresh daily' },
    ],
    preparation: genericPrep('grilling'),
    nutrition: { calories: '520 kcal', caffeine: '0mg', sugar: '6g', fat: '18g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 47, name: 'Chicken Korean Sandwich', price: 'Rs 1,090',
    slug: 'chicken-korean-sandwich', category: 'Sandwiches',
    subtitle: 'Seoul street food meets café dining',
    description: 'Crispy Korean fried chicken with gochujang glaze, tangy slaw, and pickled daikon on a soft brioche bun. A bold, spicy, and utterly addictive café sandwich.',
    flavorNotes: ['Gochujang Spice', 'Crispy Chicken', 'Tangy Slaw', 'Sweet Pickled'],
    tags: ['Spicy', 'Korean', 'Crispy'],
    strength: 0, rotation: 0,
    shapeBg: 'bg-[#B05030]', bannerText: 'KOREAN', imgFilter: 'hue-rotate(15deg) saturate(1.3)',
    servingStyle: 'Soft brioche bun',
    ingredients: [
      { name: 'Crispy Fried Chicken', type: 'Protein', amount: '150g', note: 'Korean battered and fried' },
      { name: 'Gochujang Sauce', type: 'Sauce', amount: '30ml', note: 'Authentic Korean chili paste glaze' },
      { name: 'Asian Slaw', type: 'Vegetables', amount: '60g', note: 'Cabbage, carrot, and sesame' },
      { name: 'Brioche Bun', type: 'Bread', amount: '1 bun', note: 'Soft, pillowy brioche' },
    ],
    preparation: genericPrep('frying and assembly'),
    nutrition: { calories: '590 kcal', caffeine: '0mg', sugar: '12g', fat: '22g' },
    gallery: ['/coffee.png'],
  },
  {
    id: 48, name: 'Chicken Tuscan Sandwich', price: 'Rs 1,150',
    slug: 'chicken-tuscan-sandwich', category: 'Sandwiches',
    subtitle: 'Italian countryside, between bread',
    description: 'Sun-dried tomato marinated grilled chicken, fresh basil, mozzarella, and arugula on toasted ciabatta with a drizzle of extra virgin olive oil. Tuscan elegance in every bite.',
    flavorNotes: ['Sun-Dried Tomato', 'Fresh Basil', 'Creamy Mozzarella', 'Olive Oil Finish'],
    tags: ['Italian', 'Elegant', 'Premium'],
    strength: 0, rotation: 0,
    shapeBg: 'bg-[#9E6340]', bannerText: 'TUSCAN', imgFilter: 'sepia(0.3) saturate(1.2)',
    servingStyle: 'Toasted ciabatta',
    ingredients: [
      { name: 'Tuscan Marinated Chicken', type: 'Protein', amount: '150g', note: 'Sun-dried tomato & herb marinade' },
      { name: 'Fresh Mozzarella', type: 'Cheese', amount: '60g', note: 'Creamy, rich Italian mozzarella' },
      { name: 'Toasted Ciabatta', type: 'Bread', amount: '1 piece', note: 'Crispy Italian bread' },
      { name: 'Fresh Basil & Arugula', type: 'Vegetables', amount: 'Fresh', note: 'Italian herbs and peppery arugula' },
      { name: 'Extra Virgin Olive Oil', type: 'Sauce', amount: 'Drizzle', note: 'Premium Italian olive oil' },
    ],
    preparation: genericPrep('grilling and toasting'),
    nutrition: { calories: '610 kcal', caffeine: '0mg', sugar: '8g', fat: '24g' },
    gallery: ['/coffee.png'],
  },
];

// ─── DEFAULT BLOG POSTS ───────────────────────────────────────────────────────
const DEFAULT_BLOG_POSTS = [
  {
    id: 1,
    title: 'The N² Story: Why We Started a Specialty Café',
    slug: 'the-n2-story',
    description: 'How N Squared was born from a shared passion for premium coffee culture, a desire to bring specialty café experiences to local communities.',
    author: 'N² Team',
    role: 'Founders',
    date: 'May 20, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    content: [
      { type: 'paragraph', text: 'N Squared (N²) was born from a simple obsession — finding the perfect cup of coffee in our own city. After years of traveling and tasting specialty coffees across different cafés around the world, we came back home with one goal: to recreate that elevated café experience right here.' },
      { type: 'quote', text: 'We didn\'t want to open just another café. We wanted to build a place where every item on the menu has a story, a craft, and a reason to exist.', author: 'N² Founders' },
      { type: 'paragraph', text: 'From the very beginning, we obsessed over every detail — the temperature of our espresso extraction, the sourcing of our Lotus Biscoff sauce, the balance in our signature Kinder Bueno-infused drinks. N² was never about volume; it was always about depth and quality.' },
      { type: 'paragraph', text: 'Today, our menu spans over 48 items across 9 carefully curated categories. Each item was developed through months of testing, tasting, and refinement. We hope every visit to N Squared feels like a little luxury — a moment carved out from the rush of daily life.' },
    ],
    tags: ['Story', 'Brand', 'Café Culture'],
  },
  {
    id: 2,
    title: 'What Makes Our N² Signature Drink So Special?',
    slug: 'n2-signature-drink-story',
    description: 'Behind the scenes of our most iconic drink — the N² Signature Coffee with Kinder Bueno. How it was developed, why it became our hero item.',
    author: 'N² Barista Team',
    role: 'Head of Drinks Development',
    date: 'May 14, 2026',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=800&auto=format&fit=crop',
    content: [
      { type: 'paragraph', text: 'Some drinks take weeks to develop. The N² Signature took us three months. The challenge was simple but elusive: how do you capture the unmistakable taste of Kinder Bueno — that perfect hazelnut chocolate wafer — inside a premium iced coffee without losing either element\'s identity?' },
      { type: 'quote', text: 'The Kinder Bueno flavor is so specific and beloved. Getting it right required three separate sauce development attempts before we found the perfect ratio.', author: 'N² Barista Team' },
      { type: 'paragraph', text: 'The final recipe uses our premium double-shot espresso base, a specially formulated Kinder Bueno-inspired sauce, cold milk over ice, and our signature vanilla cold foam on top — with real crumbled Kinder Bueno as a garnish. The result is an indulgent, creamy, coffee-forward drink that somehow tastes like both dessert and a serious coffee at once.' },
    ],
    tags: ['Signature', 'Recipe Story', 'Development'],
  },
  {
    id: 3,
    title: 'The Art of Cold Foam: Why Every N² Iced Coffee Is Crowned',
    slug: 'cold-foam-art',
    description: 'Cold foam has taken specialty coffee by storm. Here\'s exactly how we make ours at N², and why it elevates every single iced drink.',
    author: 'N² Barista Team',
    role: 'Barista Craft',
    date: 'May 7, 2026',
    readTime: '3 min read',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    content: [
      { type: 'paragraph', text: 'Cold foam is not just a trend — it\'s a textural revolution in iced coffee. Unlike hot steamed foam that dissolves quickly, cold foam sits as a distinct, creamy layer on top of your iced drink, slowly incorporating with each sip for an evolving flavor experience.' },
      { type: 'quote', text: 'We whip our cold foam at exactly 3°C using a specific ratio of cream to milk to achieve the perfect density — thick enough to sit proud on the drink, but light enough to dissolve beautifully as you sip.', author: 'N² Barista Team' },
      { type: 'paragraph', text: 'Every N² iced drink that calls for cold foam goes through our three-stage preparation: (1) perfectly extracted espresso over ice, (2) the flavored base — whether it\'s Lotus, Pistachio, or Caramel — and (3) the cold foam crown. This ensures every sip delivers three different taste experiences in one glass.' },
    ],
    tags: ['Technique', 'Cold Foam', 'Craft'],
  },
];

// ─── Auth helpers ─────────────────────────────────────────────────────────────
const ADMIN_CREDENTIALS = { username: 'nsquared_admin', password: 'cafe2026' };

export const adminLogin = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    return true;
  }
  return false;
};

export const adminLogout = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

// ─── DB init ──────────────────────────────────────────────────────────────────
const initDb = () => {
  if (!localStorage.getItem(MENU_STORAGE_KEY)) {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(DEFAULT_MENU_ITEMS));
  }
  if (!localStorage.getItem(BLOG_STORAGE_KEY)) {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
  }
};

// Force-reset if version key doesn't exist (handles migration from old data)
export const resetToDefaults = () => {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(DEFAULT_MENU_ITEMS));
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
  window.dispatchEvent(new Event('coffee_db_update'));
};

// ─── CRUD: Menu ───────────────────────────────────────────────────────────────
export const getMenuItems = () => {
  initDb();
  try {
    return JSON.parse(localStorage.getItem(MENU_STORAGE_KEY)) || DEFAULT_MENU_ITEMS;
  } catch { return DEFAULT_MENU_ITEMS; }
};

export const getCategories = () => {
  const items = getMenuItems();
  return ['All', ...new Set(items.map(i => i.category))];
};

export const getMenuItemBySlug = (slug) => {
  return getMenuItems().find(item => item.slug === slug);
};

export const saveMenuItem = (menuItem) => {
  const items = getMenuItems();
  const index = items.findIndex(i => i.slug === menuItem.slug || i.id === menuItem.id);
  if (index > -1) {
    items[index] = { ...items[index], ...menuItem };
  } else {
    const nextId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    items.push({
      id: nextId,
      gallery: ['/coffee.png'],
      rotation: 0,
      shapeBg: 'bg-[#8B5E3C]',
      bannerText: 'BREW',
      imgFilter: '',
      strength: 3,
      ...menuItem,
      slug: menuItem.slug || slugify(menuItem.name),
    });
  }
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('coffee_db_update'));
  return true;
};

export const deleteMenuItem = (slug) => {
  const items = getMenuItems().filter(i => i.slug !== slug);
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('coffee_db_update'));
  return true;
};

// ─── CRUD: Blog ───────────────────────────────────────────────────────────────
export const getBlogPosts = () => {
  initDb();
  try {
    return JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY)) || DEFAULT_BLOG_POSTS;
  } catch { return DEFAULT_BLOG_POSTS; }
};

export const getBlogPostBySlug = (slug) => {
  return getBlogPosts().find(p => p.slug === slug);
};

export const saveBlogPost = (blogPost) => {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.slug === blogPost.slug || p.id === blogPost.id);
  if (index > -1) {
    posts[index] = { ...posts[index], ...blogPost };
  } else {
    const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    posts.push({
      id: nextId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      ...blogPost,
    });
  }
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event('coffee_db_update'));
  return true;
};

export const deleteBlogPost = (slug) => {
  const posts = getBlogPosts().filter(p => p.slug !== slug);
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event('coffee_db_update'));
  return true;
};
