/**
 * Public Design Portfolio Directory Script
 * Queries the Supabase 'gallery' table to display custom dress creations, bridal setups & stitching portfolios.
 * Incorporates elegant local offline fallbacks with high-fidelity illustration cards.
 */

import { supabase } from './supabase-config.js';
import { getCurrentLang } from './language.js';

// High-fidelity fallback portfolio items
const fallbackGallery = [
  {
    id: 'gal-1',
    image_url: '../assets/teal_lehenga.jpg', // Teal Designer Lehenga
    caption_en: 'Premium Teal Hand-Embroidered Lehenga Set',
    caption_pa: 'ਪ੍ਰੀਮੀਅਮ ਨੀਲੀ ਕਢਾਈ ਵਾਲਾ ਡਿਜ਼ਾਈਨਰ ਲਹਿੰਗਾ'
  },
  {
    id: 'gal-2',
    image_url: '../assets/green_saree.jpg', // Green Floral Saree
    caption_en: 'Elegant Mint-Green Floral Organza Saree',
    caption_pa: 'ਸੁੰਦਰ ਮਿੰਟ-ਹਰਾ ਫੁੱਲਾਂ ਵਾਲੀ ਓਰਗੈਂਜ਼ਾ ਸਾੜ੍ਹੀ'
  },
  {
    id: 'gal-3',
    image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60', // Sewing Machine Focus
    caption_en: 'Custom Boutique Suit Pleat Crafting',
    caption_pa: 'ਬੁਟੀਕ ਲੇਡੀਜ਼ ਸੂਟ ਪਲੇਟਸ ਫਿਟਿੰਗ'
  },
  {
    id: 'gal-4',
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop&q=60', // Silk Fabric Pattern
    caption_en: 'Royal Banarasi Silk Bridal Gher Lehenga',
    caption_pa: 'ਸ਼ਾਹੀ ਪਟਿਆਲਾ ਬਨਾਰਸੀ ਸਿਲਕ ਲਹਿੰਗਾ'
  },
  {
    id: 'gal-5',
    image_url: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=500&auto=format&fit=crop&q=60', // Vibrant colors thread
    caption_en: 'Multicolor Resham Shaded Threads Selection',
    caption_pa: 'ਮਲਟੀਕਲਰ ਰੇਸ਼ਮ ਕਢਾਈ ਧਾਗੇ'
  },
  {
    id: 'gal-6',
    image_url: '../assets/peacock_salwar.jpg', // Peacock embroidered salwar
    caption_en: 'Traditional Peacock Handwork Patiala Salwar Suit',
    caption_pa: 'ਰਵਾਇਤੀ ਮੋਰ ਕਢਾਈ ਪਟਿਆਲਾ ਸਲਵਾਰ ਸੂਟ'
  }
];

export async function fetchGalleryItems() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data && data.length > 0) ? data : fallbackGallery;
  } catch (err) {
    console.warn("Supabase gallery load failed. Fetching premium offline templates: ", err.message);
    return fallbackGallery;
  }
}

function renderGalleryList(items) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const activeLang = getCurrentLang();

  items.forEach(item => {
    const caption = activeLang === 'en' ? item.caption_en : item.caption_pa;
    
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.id = `gallery-card-${item.id}`;
    
    card.innerHTML = `
      <div class="gallery-photo-wrapper">
        <img class="gallery-photo" src="${item.image_url}" alt="${caption}" referrerPolicy="no-referrer" />
      </div>
      <div class="gallery-footer">
        <h4>${caption}</h4>
      </div>
    `;
    
    grid.appendChild(card);
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  const items = await fetchGalleryItems();
  renderGalleryList(items);

  // Reload lists if language swaps
  document.addEventListener('languageChanged', () => {
    renderGalleryList(items);
  });
});
