import { supabase } from "@/integrations/supabase/client";

const laptopProducts = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop with M2 Pro chip, perfect for professionals and creatives.',
    price: 2499.99,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    image_url_2: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    image_url_3: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Dell XPS 15',
    description: 'Premium ultrabook with stunning display and powerful performance.',
    price: 1999.99,
    image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
    image_url_2: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
    image_url_3: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Lenovo ThinkPad X1',
    description: 'Business laptop with legendary durability and security features.',
    price: 1799.99,
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    image_url_2: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    image_url_3: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    name: 'ASUS ROG Zephyrus',
    description: 'Gaming laptop with high refresh rate display and powerful GPU.',
    price: 2299.99,
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302',
    image_url_2: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302',
    image_url_3: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    name: 'HP Spectre x360',
    description: 'Convertible laptop with premium design and all-day battery life.',
    price: 1599.99,
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    image_url_2: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    image_url_3: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'
  }
];

async function seedDatabase() {
  try {
    // First, delete all existing products
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .not('id', 'is', null);

    if (deleteError) {
      throw deleteError;
    }

    // Then, insert the new laptop products
    const { error: insertError } = await supabase
      .from('products')
      .insert(laptopProducts);

    if (insertError) {
      throw insertError;
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase(); 