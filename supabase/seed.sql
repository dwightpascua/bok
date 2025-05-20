-- Clear existing products
DELETE FROM products;

-- Insert laptop products
INSERT INTO products (id, name, description, price, image_url, image_url_2, image_url_3) VALUES
('laptop-1', 'MacBook Pro 16"', 'Powerful laptop with M2 Pro chip, perfect for professionals and creatives.', 2499.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'),
('laptop-2', 'Dell XPS 15', 'Premium ultrabook with stunning display and powerful performance.', 1999.99, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45'),
('laptop-3', 'Lenovo ThinkPad X1', 'Business laptop with legendary durability and security features.', 1799.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'),
('laptop-4', 'ASUS ROG Zephyrus', 'Gaming laptop with high refresh rate display and powerful GPU.', 2299.99, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302'),
('laptop-5', 'HP Spectre x360', 'Convertible laptop with premium design and all-day battery life.', 1599.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853');

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  role TEXT DEFAULT 'user',
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Insert a profile for your user (replace YOUR_USER_ID with your actual user ID)
INSERT INTO profiles (id, role)
VALUES ('3d5b782a-363c-4437-852a-f2494d46e707', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin'; 