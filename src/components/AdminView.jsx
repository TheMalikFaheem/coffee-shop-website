import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Plus, Trash2, Edit, Save, X, Calendar, User, FileText, CheckCircle, Info } from 'lucide-react';
import { getMenuItems, saveMenuItem, deleteMenuItem, getBlogPosts, saveBlogPost, deleteBlogPost } from '../data/coffeeDb';

export default function AdminView() {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [toast, setToast] = useState(null);

  // Form states for MENU ITEM
  const [editingMenuSlug, setEditingMenuSlug] = useState(null);
  const [menuName, setMenuName] = useState('');
  const [menuSlug, setMenuSlug] = useState('');
  const [menuSubtitle, setMenuSubtitle] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [menuPrice, setMenuPrice] = useState('$8.50');
  const [menuCategory, setMenuCategory] = useState('Hot Coffees');
  const [menuOrigin, setMenuOrigin] = useState('');
  const [menuRoast, setMenuRoast] = useState('Medium Roast');
  const [menuStrength, setMenuStrength] = useState(3);
  const [menuServing, setMenuServing] = useState('');
  const [menuFlavors, setMenuFlavors] = useState('');
  const [menuCalories, setMenuCalories] = useState('150 kcal');
  const [menuSugar, setMenuSugar] = useState('12g');
  const [menuCaffeine, setMenuCaffeine] = useState('150mg');
  const [menuFat, setMenuFat] = useState('4g');
  const [menuIngredients, setMenuIngredients] = useState([{ name: '', type: 'Coffee Bean', amount: '', note: '' }]);
  const [menuPrepSteps, setMenuPrepSteps] = useState(['']);

  // Form states for BLOG POST
  const [editingBlogSlug, setEditingBlogSlug] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlugState, setBlogSlugState] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogRole, setBlogRole] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('5 min read');
  const [blogCover, setBlogCover] = useState('');
  const [blogContentText, setBlogContentText] = useState('');

  // Mode controllers
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);

  // Load database
  const loadData = () => {
    setMenuItems(getMenuItems());
    setBlogPosts(getBlogPosts());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('coffee_db_update', loadData);
    return () => window.removeEventListener('coffee_db_update', loadData);
  }, []);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Auto slug generator helper
  const handleNameChange = (nameVal, type) => {
    if (type === 'menu') {
      setMenuName(nameVal);
      if (!editingMenuSlug) {
        setMenuSlug(nameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      }
    } else {
      setBlogTitle(nameVal);
      if (!editingBlogSlug) {
        setBlogSlugState(nameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      }
    }
  };

  // Add/Remove dynamic ingredient rows
  const addIngredientRow = () => {
    setMenuIngredients([...menuIngredients, { name: '', type: 'Coffee Bean', amount: '', note: '' }]);
  };
  const removeIngredientRow = (idx) => {
    setMenuIngredients(menuIngredients.filter((_, i) => i !== idx));
  };
  const updateIngredientRow = (idx, field, val) => {
    const updated = [...menuIngredients];
    updated[idx][field] = val;
    setMenuIngredients(updated);
  };

  // Add/Remove dynamic preparation steps
  const addPrepStep = () => {
    setMenuPrepSteps([...menuPrepSteps, '']);
  };
  const removePrepStep = (idx) => {
    setMenuPrepSteps(menuPrepSteps.filter((_, i) => i !== idx));
  };
  const updatePrepStep = (idx, val) => {
    const updated = [...menuPrepSteps];
    updated[idx] = val;
    setMenuPrepSteps(updated);
  };

  // Save Menu Item
  const handleSaveMenu = (e) => {
    e.preventDefault();
    if (!menuName.trim() || !menuSlug.trim()) {
      triggerToast('Name and Slug are required.');
      return;
    }

    const itemData = {
      name: menuName,
      slug: menuSlug,
      subtitle: menuSubtitle || 'Crafted with premium quality',
      description: menuDescription,
      price: menuPrice || '$8.50',
      category: menuCategory,
      origin: menuOrigin || 'Sourced Highlands',
      roast: menuRoast,
      strength: Number(menuStrength),
      servingStyle: menuServing || 'Served in ceramic cup',
      flavorNotes: menuFlavors.split(',').map(f => f.trim()).filter(f => f !== ''),
      nutrition: {
        calories: menuCalories,
        sugar: menuSugar,
        caffeine: menuCaffeine,
        fat: menuFat
      },
      ingredients: menuIngredients.filter(ing => ing.name.trim() !== ''),
      preparation: menuPrepSteps.filter(step => step.trim() !== '').map((step, idx) => ({
        step: idx + 1,
        action: step
      }))
    };

    if (editingMenuSlug) {
      itemData.slug = editingMenuSlug; // Keep original slug
      saveMenuItem(itemData);
      triggerToast(`Drink "${menuName}" updated successfully!`);
    } else {
      saveMenuItem(itemData);
      triggerToast(`Drink "${menuName}" published successfully!`);
    }

    resetMenuForm();
  };

  const handleEditMenu = (item) => {
    setEditingMenuSlug(item.slug);
    setMenuName(item.name);
    setMenuSlug(item.slug);
    setMenuSubtitle(item.subtitle);
    setMenuDescription(item.description);
    setMenuPrice(item.price);
    setMenuCategory(item.category);
    setMenuOrigin(item.origin);
    setMenuRoast(item.roast);
    setMenuStrength(item.strength);
    setMenuServing(item.servingStyle);
    setMenuFlavors(item.flavorNotes ? item.flavorNotes.join(', ') : '');
    setMenuCalories(item.nutrition.calories);
    setMenuSugar(item.nutrition.sugar);
    setMenuCaffeine(item.nutrition.caffeine);
    setMenuFat(item.nutrition.fat);
    setMenuIngredients(item.ingredients.length > 0 ? item.ingredients : [{ name: '', type: 'Coffee Bean', amount: '', note: '' }]);
    setMenuPrepSteps(item.preparation.map(p => p.action));
    setShowMenuForm(true);
  };

  const handleDeleteMenu = (slug, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      deleteMenuItem(slug);
      triggerToast(`Deleted "${name}"`);
    }
  };

  const resetMenuForm = () => {
    setEditingMenuSlug(null);
    setMenuName('');
    setMenuSlug('');
    setMenuSubtitle('');
    setMenuDescription('');
    setMenuPrice('$8.50');
    setMenuCategory('Hot Coffees');
    setMenuOrigin('');
    setMenuRoast('Medium Roast');
    setMenuStrength(3);
    setMenuServing('');
    setMenuFlavors('');
    setMenuCalories('150 kcal');
    setMenuSugar('12g');
    setMenuCaffeine('150mg');
    setMenuFat('4g');
    setMenuIngredients([{ name: '', type: 'Coffee Bean', amount: '', note: '' }]);
    setMenuPrepSteps(['']);
    setShowMenuForm(false);
  };

  // Parser: converts double-newlines text into structural paragraphs and quote blocks
  const parseContentText = (text) => {
    return text.split('\n\n').filter(p => p.trim() !== '').map(p => {
      if (p.trim().startsWith('>')) {
        const quoteContent = p.trim().substring(1).trim();
        const parts = quoteContent.split('—');
        return {
          type: 'quote',
          text: parts[0]?.trim() || '',
          author: parts[1]?.trim() || ''
        };
      }
      return { type: 'paragraph', text: p.trim() };
    });
  };

  const formatContentForTextarea = (contentBlocks) => {
    if (!contentBlocks) return '';
    return contentBlocks.map(block => {
      if (block.type === 'quote') {
        return `>${block.text} — ${block.author}`;
      }
      return block.text;
    }).join('\n\n');
  };

  // Save Blog Post
  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogSlugState.trim()) {
      triggerToast('Title and Slug are required.');
      return;
    }

    const postData = {
      title: blogTitle,
      slug: blogSlugState,
      description: blogDescription,
      author: blogAuthor || 'Staff Barista',
      role: blogRole || 'Coffee Expert',
      readTime: blogReadTime || '5 min read',
      coverImage: blogCover || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      content: parseContentText(blogContentText),
      tags: ['Sourcing', 'Journal']
    };

    if (editingBlogSlug) {
      postData.slug = editingBlogSlug;
      saveBlogPost(postData);
      triggerToast(`Article "${blogTitle}" updated successfully!`);
    } else {
      saveBlogPost(postData);
      triggerToast(`Article "${blogTitle}" published successfully!`);
    }

    resetBlogForm();
  };

  const handleEditBlog = (post) => {
    setEditingBlogSlug(post.slug);
    setBlogTitle(post.title);
    setBlogSlugState(post.slug);
    setBlogDescription(post.description);
    setBlogAuthor(post.author);
    setBlogRole(post.role);
    setBlogReadTime(post.readTime);
    setBlogCover(post.coverImage);
    setBlogContentText(formatContentForTextarea(post.content));
    setShowBlogForm(true);
  };

  const handleDeleteBlog = (slug, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(slug);
      triggerToast(`Deleted "${title}"`);
    }
  };

  const resetBlogForm = () => {
    setEditingBlogSlug(null);
    setBlogTitle('');
    setBlogSlugState('');
    setBlogDescription('');
    setBlogAuthor('');
    setBlogRole('');
    setBlogReadTime('5 min read');
    setBlogCover('');
    setBlogContentText('');
    setShowBlogForm(false);
  };

  return (
    <div className="min-h-screen bg-[#032B2B] text-white pt-32 pb-24 px-4 select-none relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto w-full relative z-10 text-left">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-accent">
              <Database size={18} className="animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase font-montserrat">CMS Console</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-montserrat uppercase tracking-wider">
              Console Dashboard
            </h1>
            <p className="text-brand-textMuted text-xs font-poppins">
              Manage website catalog data in local memory. Changes reflect immediately on product & blog templates.
            </p>
          </div>

          {/* Console Tabs */}
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/15 self-start shrink-0">
            <button
              onClick={() => { setActiveTab('menu'); resetMenuForm(); resetBlogForm(); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold font-montserrat uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'menu' ? 'bg-brand-primary text-white' : 'text-brand-textMuted hover:text-white'
              }`}
            >
              Menu Items
            </button>
            <button
              onClick={() => { setActiveTab('blog'); resetMenuForm(); resetBlogForm(); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold font-montserrat uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'blog' ? 'bg-brand-primary text-white' : 'text-brand-textMuted hover:text-white'
              }`}
            >
              Journal Press
            </button>
          </div>
        </div>

        {/* 1. MENU CMS TAB */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {!showMenuForm ? (
              <div className="space-y-6">
                {/* Controls */}
                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-xs font-bold font-montserrat text-brand-textMuted uppercase tracking-wider">
                    Catalog Items Count: {menuItems.length}
                  </span>
                  <button
                    onClick={() => { resetMenuForm(); setShowMenuForm(true); }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-brand-primary hover:bg-brand-accent rounded-full text-xs font-bold font-montserrat uppercase tracking-widest text-white transition-all duration-300 shadow-md"
                  >
                    <Plus size={14} />
                    New Coffee Drink
                  </button>
                </div>

                {/* Drinks list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center justify-between hover:border-brand-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                          <img 
                            src="/coffee.png" 
                            alt={item.name} 
                            className="w-10 h-10 object-contain" 
                            style={{ filter: item.imgFilter }}
                          />
                        </div>
                        <div className="min-w-0 text-left">
                          <h3 className="font-montserrat font-bold text-white text-base leading-tight truncate">
                            {item.name}
                          </h3>
                          <span className="text-[10px] font-bold text-brand-accent font-montserrat uppercase tracking-wider block mt-0.5">
                            {item.category} • {item.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditMenu(item)}
                          className="p-2 bg-white/5 hover:bg-brand-primary border border-white/5 hover:border-brand-accent text-brand-textMuted hover:text-white rounded-lg transition-all duration-300"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteMenu(item.slug, item.name)}
                          className="p-2 bg-white/5 hover:bg-red-950 border border-white/5 hover:border-red-500 text-brand-textMuted hover:text-red-400 rounded-lg transition-all duration-300"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Add/Edit drink form
              <form onSubmit={handleSaveMenu} className="bg-white/5 border border-white/10 rounded-[35px] p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="font-montserrat font-bold text-lg text-white uppercase tracking-wider">
                    {editingMenuSlug ? 'Edit Drink Recipe' : 'Create Coffee Drink'}
                  </h3>
                  <button type="button" onClick={resetMenuForm} className="p-1.5 hover:bg-white/5 rounded-full text-brand-textMuted hover:text-white">
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Drink Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Hazelnut Cloud Macchiato"
                      value={menuName}
                      onChange={(e) => handleNameChange(e.target.value, 'menu')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Slug (URL Route)</label>
                    <input
                      type="text"
                      placeholder="e.g. hazelnut-cloud"
                      value={menuSlug}
                      onChange={(e) => setMenuSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                      disabled={!!editingMenuSlug}
                      required
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Headline Subtitle</label>
                    <input
                      type="text"
                      placeholder="e.g. A velvet sip of roasted nut"
                      value={menuSubtitle}
                      onChange={(e) => setMenuSubtitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Informational Price</label>
                    <input
                      type="text"
                      placeholder="e.g. $8.50"
                      value={menuPrice}
                      onChange={(e) => setMenuPrice(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Category</label>
                    <select
                      value={menuCategory}
                      onChange={(e) => setMenuCategory(e.target.value)}
                      className="w-full bg-[#021A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    >
                      <option value="Hot Coffees">Hot Coffees</option>
                      <option value="Cold Drinks">Cold Drinks</option>
                      <option value="Specials">Specials</option>
                    </select>
                  </div>

                  {/* Roast */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Roast Level</label>
                    <select
                      value={menuRoast}
                      onChange={(e) => setMenuRoast(e.target.value)}
                      className="w-full bg-[#021A1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    >
                      <option value="Light Roast">Light Roast</option>
                      <option value="Medium Roast">Medium Roast</option>
                      <option value="Dark Roast">Dark Roast</option>
                    </select>
                  </div>

                  {/* Origin */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Coffee Origin</label>
                    <input
                      type="text"
                      placeholder="e.g. Colombia (Huila Highlands)"
                      value={menuOrigin}
                      onChange={(e) => setMenuOrigin(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Strength */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Intensity Strength (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={menuStrength}
                      onChange={(e) => setMenuStrength(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Serving style */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Serving Presentation</label>
                    <input
                      type="text"
                      placeholder="e.g. Iced in glass tumbler"
                      value={menuServing}
                      onChange={(e) => setMenuServing(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Flavor Notes */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Flavor Profiles (Comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Hazelnut, Nutty, Sweet Cream"
                      value={menuFlavors}
                      onChange={(e) => setMenuFlavors(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Description</label>
                  <textarea
                    placeholder="Provide a detailed sensory description of the coffee drink..."
                    value={menuDescription}
                    onChange={(e) => setMenuDescription(e.target.value)}
                    rows="3"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors resize-none"
                    required
                  />
                </div>

                {/* Nutrition Row */}
                <div className="border-t border-white/5 pt-4 space-y-3">
                  <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-brand-accent text-left">Nutrition Metrics</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold font-montserrat uppercase text-brand-textMuted">Calories</label>
                      <input type="text" value={menuCalories} onChange={e => setMenuCalories(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold font-montserrat uppercase text-brand-textMuted">Sugar</label>
                      <input type="text" value={menuSugar} onChange={e => setMenuSugar(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold font-montserrat uppercase text-brand-textMuted">Caffeine</label>
                      <input type="text" value={menuCaffeine} onChange={e => setMenuCaffeine(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold font-montserrat uppercase text-brand-textMuted">Fat</label>
                      <input type="text" value={menuFat} onChange={e => setMenuFat(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs text-white" />
                    </div>
                  </div>
                </div>

                {/* Ingredients CMS */}
                <div className="border-t border-white/5 pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-brand-accent text-left">Ingredients Catalog</h4>
                    <button
                      type="button"
                      onClick={addIngredientRow}
                      className="flex items-center gap-1 text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-lg font-bold font-montserrat uppercase text-white hover:bg-white/10 transition-colors"
                    >
                      <Plus size={10} /> Add Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {menuIngredients.map((ing, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="Ingredient Name"
                            value={ing.name}
                            onChange={(e) => updateIngredientRow(index, 'name', e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            required
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <select
                            value={ing.type}
                            onChange={(e) => updateIngredientRow(index, 'type', e.target.value)}
                            className="w-full bg-[#021A1A] border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          >
                            <option value="Coffee Bean">Coffee Bean</option>
                            <option value="Milk">Milk</option>
                            <option value="Syrup">Syrup</option>
                            <option value="Toppings">Toppings</option>
                            <option value="Equipment">Equipment</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            placeholder="Amount"
                            value={ing.amount}
                            onChange={(e) => updateIngredientRow(index, 'amount', e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            placeholder="Detail/Note"
                            value={ing.note}
                            onChange={(e) => updateIngredientRow(index, 'note', e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div className="sm:col-span-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => removeIngredientRow(index)}
                            disabled={menuIngredients.length === 1}
                            className="p-1.5 bg-red-950/20 border border-transparent hover:border-red-900/50 hover:bg-red-950 text-red-400 rounded disabled:opacity-30"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preparation Steps CMS */}
                <div className="border-t border-white/5 pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-brand-accent text-left">Preparation Brew Guide</h4>
                    <button
                      type="button"
                      onClick={addPrepStep}
                      className="flex items-center gap-1 text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-lg font-bold font-montserrat uppercase text-white hover:bg-white/10 transition-colors"
                    >
                      <Plus size={10} /> Add Step
                    </button>
                  </div>

                  <div className="space-y-3">
                    {menuPrepSteps.map((step, index) => (
                      <div key={index} className="flex gap-2 items-center bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
                        <span className="w-6 h-6 rounded-full bg-brand-primary/20 border border-brand-primary flex items-center justify-center font-montserrat font-bold text-xs text-brand-accent shrink-0">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          placeholder="Action step description..."
                          value={step}
                          onChange={(e) => updatePrepStep(index, e.target.value)}
                          className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removePrepStep(index)}
                          disabled={menuPrepSteps.length === 1}
                          className="p-1.5 bg-red-950/20 border border-transparent hover:border-red-900/50 hover:bg-red-950 text-red-400 rounded disabled:opacity-30 shrink-0"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={resetMenuForm}
                    className="px-6 py-2.5 rounded-full border border-white/10 text-brand-textMuted hover:text-white hover:bg-white/5 text-xs font-bold font-montserrat tracking-widest uppercase transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-brand-primary hover:bg-brand-accent rounded-full text-xs font-bold font-montserrat tracking-widest text-white transition-all duration-300 shadow-md"
                  >
                    <Save size={14} />
                    Save Drink
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 2. BLOG CMS TAB */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            {!showBlogForm ? (
              <div className="space-y-6">
                {/* Controls */}
                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-xs font-bold font-montserrat text-brand-textMuted uppercase tracking-wider">
                    Published Articles: {blogPosts.length}
                  </span>
                  <button
                    onClick={() => { resetBlogForm(); setShowBlogForm(true); }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-brand-primary hover:bg-brand-accent rounded-full text-xs font-bold font-montserrat uppercase tracking-widest text-white transition-all duration-300 shadow-md"
                  >
                    <Plus size={14} />
                    Create New Story
                  </button>
                </div>

                {/* Articles list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogPosts.map((post) => (
                    <div 
                      key={post.id}
                      className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center justify-between hover:border-brand-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-10 rounded bg-brand-dark overflow-hidden shrink-0 border border-white/5">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 text-left">
                          <h3 className="font-montserrat font-bold text-white text-base leading-tight truncate">
                            {post.title}
                          </h3>
                          <span className="text-[10px] font-bold text-brand-accent font-montserrat uppercase tracking-wider block mt-0.5">
                            By {post.author} • {post.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBlog(post)}
                          className="p-2 bg-white/5 hover:bg-brand-primary border border-white/5 hover:border-brand-accent text-brand-textMuted hover:text-white rounded-lg transition-all duration-300"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.slug, post.title)}
                          className="p-2 bg-white/5 hover:bg-red-950 border border-white/5 hover:border-red-500 text-brand-textMuted hover:text-red-400 rounded-lg transition-all duration-300"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Add/Edit blog form
              <form onSubmit={handleSaveBlog} className="bg-white/5 border border-white/10 rounded-[35px] p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="font-montserrat font-bold text-lg text-white uppercase tracking-wider">
                    {editingBlogSlug ? 'Edit Article Story' : 'Write Journal Article'}
                  </h3>
                  <button type="button" onClick={resetBlogForm} className="p-1.5 hover:bg-white/5 rounded-full text-brand-textMuted hover:text-white">
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Article Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Sourcing Colombian Anaerobic Coffee"
                      value={blogTitle}
                      onChange={(e) => handleNameChange(e.target.value, 'blog')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Slug (URL Path)</label>
                    <input
                      type="text"
                      placeholder="e.g. sourcing-colombian-coffee"
                      value={blogSlugState}
                      onChange={(e) => setBlogSlugState(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                      disabled={!!editingBlogSlug}
                      required
                    />
                  </div>

                  {/* Author */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Author Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sienna Brooks"
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Author Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Roaster & Quality Analyst"
                      value={blogRole}
                      onChange={(e) => setBlogRole(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Read Time */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Reading Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 6 min read"
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>

                  {/* Cover Image URL */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Cover Image URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://images.unsplash.com/photo-1514432324607..."
                      value={blogCover}
                      onChange={(e) => setBlogCover(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Short Summary</label>
                  <input
                    type="text"
                    placeholder="Provide a quick editorial highlight sentence for card summaries..."
                    value={blogDescription}
                    onChange={(e) => setBlogDescription(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
                    required
                  />
                </div>

                {/* Content Textarea */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold font-montserrat uppercase tracking-wider text-brand-textMuted block">Article Markdown Content</label>
                    <span className="text-[9px] font-medium text-brand-textMuted uppercase font-poppins">
                      Tip: Double enter for paragraphs. Start line with `&gt;` for quotes.
                    </span>
                  </div>
                  <textarea
                    placeholder="Write your story content blocks. E.g.&#10;&#10;The journey begins at high altitudes...&#10;&#10;&gt;Knowing the farmers creates connection — Elena Rostova&#10;&#10;Then we roast the beans..."
                    value={blogContentText}
                    onChange={(e) => setBlogContentText(e.target.value)}
                    rows="8"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors font-poppins resize-y"
                    required
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                  <button
                    type="button"
                    onClick={resetBlogForm}
                    className="px-6 py-2.5 rounded-full border border-white/10 text-brand-textMuted hover:text-white hover:bg-white/5 text-xs font-bold font-montserrat tracking-widest uppercase transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-brand-primary hover:bg-brand-accent rounded-full text-xs font-bold font-montserrat tracking-widest text-white transition-all duration-300 shadow-md"
                  >
                    <Save size={14} />
                    Save Story
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>

      {/* Admin Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-brand-primary border border-brand-accent/20 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle size={16} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold font-montserrat uppercase tracking-wider text-brand-light">CMS Action</p>
              <p className="text-xs font-semibold font-poppins text-white mt-0.5">
                {toast}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
