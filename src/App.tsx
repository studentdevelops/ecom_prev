import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';
import {
  ShoppingBag, Search, User, Menu, X, ChevronRight, ChevronLeft, Star, Heart,
  ArrowRight, Check, Plus, Minus, Trash2, Edit3, Copy, Eye, Settings,
  LayoutDashboard, BarChart3, Package, Layers, Archive, ShoppingCart, Truck,
  Users, Percent, Palette, Image, Globe, FileText, Navigation, CreditCard,
  Receipt, RotateCcw, TrendingUp, Shield, Activity, Bell, Sun, Moon,
  ExternalLink, Sparkles, SlidersHorizontal, Grid, List, AlertTriangle,
  CheckCircle2, Clock, RefreshCw, Download, Filter, ArrowUpRight, ArrowDownRight,
  Building2, Link2, Unlink, HelpCircle, Lock, Info, ChevronDown, Store,
  Monitor, Smartphone, Share2, Tag, MapPin, Phone, Mail, Calendar
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// ============================================================================
// 1. DETERMINISTIC MOCK DATA & TYPES (INR CURRENCY, INDIAN FORMATTING)
// ============================================================================

const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Curated Unsplash Photography (Tech, Audio, Workspace, Lifestyle)
const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
];

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=80',
];

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Audio & Acoustics', slug: 'audio-acoustics', description: 'Studio-grade headphones, wireless earbuds, and desktop monitors.', count: 6, image: PRODUCT_IMAGES[0], featured: true, metaTitle: 'Premium Audio & Headphones | Aether Goods', metaDesc: 'Shop studio-grade headphones and wireless audio gear.' },
  { id: 'cat-2', name: 'Wearable Tech', slug: 'wearable-tech', description: 'Minimalist smartwatches and health tracking instruments.', count: 5, image: PRODUCT_IMAGES[4], featured: true, metaTitle: 'Smartwatches & Wearables | Aether Goods', metaDesc: 'Precision crafted smartwatches for everyday performance.' },
  { id: 'cat-3', name: 'Workspace & Desk', slug: 'workspace-desk', description: 'Mechanical keyboards, ergonomic stands, and anodized desk mats.', count: 6, image: PRODUCT_IMAGES[11], featured: true, metaTitle: 'Modern Workspace Essentials | Aether Goods', metaDesc: 'Elevate your desk setup with tactile mechanical keyboards and accessories.' },
  { id: 'cat-4', name: 'Photography & Optics', slug: 'photography-optics', description: 'Instant cameras, prime lenses, and optical eyewear.', count: 5, image: PRODUCT_IMAGES[2], featured: true, metaTitle: 'Cameras & Optics | Aether Goods', metaDesc: 'Capture every moment with precision optical gear.' },
  { id: 'cat-5', name: 'Everyday Carry', slug: 'everyday-carry', description: 'Weatherproof backpacks, leather folios, and modular organizers.', count: 5, image: PRODUCT_IMAGES[6], featured: false, metaTitle: 'Everyday Carry & Bags | Aether Goods', metaDesc: 'Durable, minimalist carry solutions for modern commuters.' },
  { id: 'cat-6', name: 'Footwear & Apparel', slug: 'footwear-apparel', description: 'Engineered knit runners and breathable technical outerwear.', count: 5, image: PRODUCT_IMAGES[8], featured: false, metaTitle: 'Technical Footwear | Aether Goods', metaDesc: 'Lightweight, all-day comfort engineered for movement.' },
  { id: 'cat-7', name: 'Home & Ambience', slug: 'home-ambience', description: 'Architectural task lamps, diffusers, and acoustic panels.', count: 4, image: PRODUCT_IMAGES[9], featured: false, metaTitle: 'Modern Home Objects | Aether Goods', metaDesc: 'Thoughtfully designed objects for serene living spaces.' },
  { id: 'cat-8', name: 'Power & Charging', slug: 'power-charging', description: 'GaN fast chargers, magnetic docks, and braided cables.', count: 4, image: PRODUCT_IMAGES[1], featured: false, metaTitle: 'GaN Chargers & Docks | Aether Goods', metaDesc: 'High-speed charging stations crafted from solid aluminum.' },
];

const BRANDS = ['Aether Studio', 'KronoLab', 'Vanguard Acoustics', 'Monolith Gear', 'NordicForm'];

// Generate 40 deterministic products
const generateInitialProducts = () => {
  const specsTemplates = [
    { name: 'Aether Studio ANC Pro Headphones', cat: 'Audio & Acoustics', price: 24999, salePrice: 21499, brand: 'Vanguard Acoustics', badge: 'Best Seller', stock: 42 },
    { name: 'Krono Series 8 Titanium Smartwatch', cat: 'Wearable Tech', price: 32999, salePrice: 29999, brand: 'KronoLab', badge: 'Trending', stock: 18 },
    { name: 'Monolith Keychron Q1 Custom Mechanical Keyboard', cat: 'Workspace & Desk', price: 16499, salePrice: null, brand: 'Monolith Gear', badge: 'New Arrival', stock: 27 },
    { name: 'Lumix Analog-Digital Hybrid Camera', cat: 'Photography & Optics', price: 45999, salePrice: 41999, brand: 'NordicForm', badge: 'Limited', stock: 6 },
    { name: 'Solstice Polarized Aviator Frames', cat: 'Photography & Optics', price: 8999, salePrice: 7499, brand: 'Aether Studio', badge: null, stock: 54 },
    { name: 'Vanguard Pulse Wireless Earbuds', cat: 'Audio & Acoustics', price: 12999, salePrice: 10999, brand: 'Vanguard Acoustics', badge: 'Best Seller', stock: 65 },
    { name: 'Botanica Minimalist Eau de Parfum 100ml', cat: 'Everyday Carry', price: 6499, salePrice: null, brand: 'NordicForm', badge: null, stock: 31 },
    { name: 'AeroKnit Cloud Runner Sneakers', cat: 'Footwear & Apparel', price: 11999, salePrice: 9499, brand: 'Aether Studio', badge: 'Trending', stock: 4 },
    { name: 'Velocity Carbon Plate Track Trainers', cat: 'Footwear & Apparel', price: 15999, salePrice: null, brand: 'Aether Studio', badge: 'New Arrival', stock: 19 },
    { name: 'Nordic Ceramic Pour-Over Carafe Set', cat: 'Home & Ambience', price: 4299, salePrice: 3699, brand: 'NordicForm', badge: null, stock: 38 },
    { name: 'Eclipse Tortoiseshell Optical Glasses', cat: 'Photography & Optics', price: 7999, salePrice: null, brand: 'KronoLab', badge: null, stock: 22 },
    { name: 'Tactile 75% Aluminum Wireless Keyboard', cat: 'Workspace & Desk', price: 14999, salePrice: 13499, brand: 'Monolith Gear', badge: 'Best Seller', stock: 14 },
  ];

  const extraAdjectives = ['Pro', 'Max', 'Lite', 'Ultra', 'SE', 'Edition II', 'Studio', 'Compact', 'Core', 'Prime'];
  const extraItems = [
    { base: 'Reference Studio Monitors (Pair)', cat: 'Audio & Acoustics', price: 28999 },
    { base: 'Sapphire Minimalist Dress Watch', cat: 'Wearable Tech', price: 19499 },
    { base: 'Anodized Aluminum Laptop Riser', cat: 'Workspace & Desk', price: 4999 },
    { base: '35mm Prime F1.4 Manual Lens', cat: 'Photography & Optics', price: 34999 },
    { base: 'Ballistic Nylon 24L Commuter Pack', cat: 'Everyday Carry', price: 13999 },
    { base: 'Merino Wool Travel Slip-Ons', cat: 'Footwear & Apparel', price: 8999 },
    { base: 'Architectural Brass Desk Lamp', cat: 'Home & Ambience', price: 9499 },
    { base: '140W 4-Port GaN Desktop Charger', cat: 'Power & Charging', price: 6999 },
    { base: 'Magnetic 3-in-1 Qi2 Charging Stand', cat: 'Power & Charging', price: 8499 },
    { base: 'Open-Back Planar Magnetic Headphones', cat: 'Audio & Acoustics', price: 38999 },
    { base: 'Titanium Milanese Watch Band', cat: 'Wearable Tech', price: 5499 },
    { base: 'Full-Grain Vegetable Tanned Desk Mat', cat: 'Workspace & Desk', price: 3999 },
    { base: 'Carbon Fiber Travel Tripod', cat: 'Photography & Optics', price: 17999 },
    { base: 'Modular Tech Pouch Organizer', cat: 'Everyday Carry', price: 3499 },
    { base: 'Waterproof Shell Commuter Jacket', cat: 'Footwear & Apparel', price: 18999 },
    { base: 'Ultrasonic Essential Oil Diffuser', cat: 'Home & Ambience', price: 5299 },
    { base: '20,000mAh Airline-Safe Power Bank', cat: 'Power & Charging', price: 7499 },
    { base: 'Desktop DAC & Headphone Amplifier', cat: 'Audio & Acoustics', price: 16999 },
    { base: 'Biometric Smart Fitness Ring', cat: 'Wearable Tech', price: 22999 },
    { base: 'Ergonomic Vertical Wireless Mouse', cat: 'Workspace & Desk', price: 6499 },
    { base: 'ND Variable Camera Filter Kit', cat: 'Photography & Optics', price: 5999 },
    { base: 'RFID-Blocking Aluminum Cardholder', cat: 'Everyday Carry', price: 2999 },
    { base: 'Suede Court Minimalist Sneakers', cat: 'Footwear & Apparel', price: 10499 },
    { base: 'Acoustic Felt Wall Tile Set (6-Pack)', cat: 'Home & Ambience', price: 4799 },
    { base: 'Braided Thunderbolt 4 Pro Cable 2m', cat: 'Power & Charging', price: 3299 },
    { base: 'Portable Bluetooth Hi-Fi Speaker', cat: 'Audio & Acoustics', price: 14499 },
    { base: 'Sport Silicone & Titanium Band Kit', cat: 'Wearable Tech', price: 4199 },
    { base: 'CNC Machined Rotary Macro Pad', cat: 'Workspace & Desk', price: 5799 },
  ];

  const products = [];

  specsTemplates.forEach((item, idx) => {
    products.push({
      id: `prod-${101 + idx}`,
      sku: `ATH-${1001 + idx}`,
      name: item.name,
      slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: item.cat,
      brand: item.brand,
      price: item.price,
      salePrice: item.salePrice,
      stock: item.stock,
      status: item.stock > 0 ? 'Active' : 'Out of Stock',
      rating: Number((4.5 + ((idx * 7) % 5) * 0.1).toFixed(1)),
      reviewCount: 24 + ((idx * 19) % 140),
      salesCount: 110 + ((idx * 37) % 450),
      badge: item.badge,
      image: PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length],
      gallery: [
        PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length],
        PRODUCT_IMAGES[(idx + 3) % PRODUCT_IMAGES.length],
        PRODUCT_IMAGES[(idx + 7) % PRODUCT_IMAGES.length],
      ],
      colors: ['Obsidian Black', 'Raw Titanium', 'Sandstone'],
      sizes: item.cat === 'Footwear & Apparel' ? ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'] : ['Standard', 'Pro Bundle'],
      description: `Engineered with precision-milled aerospace materials and acoustic damping. The ${item.name} delivers uncompromising daily reliability, clean industrial aesthetics, and seamless integration into your modern workflow.`,
      specs: [
        { label: 'Material', value: 'CNC Anodized 6061 Aluminum & Matte Polymer' },
        { label: 'Warranty', value: '2 Years Indian Manufacturer Warranty' },
        { label: 'Origin', value: 'Designed in Bengaluru, Assembled with Global Components' },
        { label: 'Weight', value: `${220 + (idx * 35) % 600}g` },
      ],
      metaTitle: `${item.name} | Buy Online at Aether Goods India`,
      metaDescription: `Shop ${item.name} by ${item.brand}. Free express shipping across India and 2-year warranty.`,
      createdAt: `2026-${String((idx % 9) + 1).padStart(2, '0')}-12`,
    });
  });

  extraItems.forEach((item, idx) => {
    const fullIdx = idx + specsTemplates.length;
    const adj = extraAdjectives[idx % extraAdjectives.length];
    const fullName = `${item.base} (${adj})`;
    const hasSale = idx % 3 === 0;
    const stock = idx === 4 || idx === 13 ? 3 : idx === 19 ? 0 : 12 + ((idx * 11) % 65);

    products.push({
      id: `prod-${101 + fullIdx}`,
      sku: `ATH-${1001 + fullIdx}`,
      name: fullName,
      slug: fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: item.cat,
      brand: BRANDS[fullIdx % BRANDS.length],
      price: item.price,
      salePrice: hasSale ? Math.round(item.price * 0.85) : null,
      stock,
      status: stock === 0 ? 'Out of Stock' : idx === 22 ? 'Draft' : 'Active',
      rating: Number((4.3 + ((fullIdx * 3) % 7) * 0.1).toFixed(1)),
      reviewCount: 12 + ((fullIdx * 13) % 95),
      salesCount: 45 + ((fullIdx * 29) % 320),
      badge: idx % 5 === 0 ? 'Trending' : idx % 7 === 0 ? 'New Arrival' : null,
      image: PRODUCT_IMAGES[fullIdx % PRODUCT_IMAGES.length],
      gallery: [
        PRODUCT_IMAGES[fullIdx % PRODUCT_IMAGES.length],
        PRODUCT_IMAGES[(fullIdx + 2) % PRODUCT_IMAGES.length],
        PRODUCT_IMAGES[(fullIdx + 5) % PRODUCT_IMAGES.length],
      ],
      colors: ['Matte Black', 'Silver Mist'],
      sizes: item.cat === 'Footwear & Apparel' ? ['UK 7', 'UK 8', 'UK 9', 'UK 10'] : ['Standard'],
      description: `Crafted for discerning professionals and enthusiasts, the ${fullName} balances minimalist form with enduring utility.`,
      specs: [
        { label: 'Finish', value: 'Bead-Blasted Matte Texture' },
        { label: 'Warranty', value: '1 Year Replacement Warranty' },
        { label: 'In the Box', value: `${fullName}, Quick Start Guide, Microfiber Cloth` },
      ],
      metaTitle: `${fullName} | Aether Goods`,
      metaDescription: `Discover ${fullName} in ${item.cat}. Fast pan-India delivery.`,
      createdAt: `2026-${String(((fullIdx + 2) % 10) + 1).padStart(2, '0')}-18`,
    });
  });

  return products;
};

// Generate 100 deterministic Indian customers
const generateInitialCustomers = () => {
  const firstNames = ['Aarav', 'Ananya', 'Rohan', 'Diya', 'Vikram', 'Priya', 'Kabir', 'Meera', 'Arjun', 'Kavya', 'Siddharth', 'Neha', 'Aditya', 'Ishita', 'Karan', 'Pooja', 'Nikhil', 'Riya', 'Dev', 'Sneha'];
  const lastNames = ['Sharma', 'Patel', 'Deshmukh', 'Nair', 'Kulkarni', 'Reddy', 'Mehta', 'Iyer', 'Verma', 'Joshi', 'Malhotra', 'Banerjee', 'Menon', 'Rao', 'Kapoor'];
  const cities = [
    { city: 'Mumbai', state: 'Maharashtra', pin: '400050' },
    { city: 'Bengaluru', state: 'Karnataka', pin: '560038' },
    { city: 'Pune', state: 'Maharashtra', pin: '411004' },
    { city: 'New Delhi', state: 'Delhi', pin: '110016' },
    { city: 'Hyderabad', state: 'Telangana', pin: '500081' },
    { city: 'Chennai', state: 'Tamil Nadu', pin: '600028' },
    { city: 'Ahmedabad', state: 'Gujarat', pin: '380015' },
    { city: 'Kolkata', state: 'West Bengal', pin: '700019' },
  ];
  const segments = ['VIP', 'Repeat Buyer', 'New', 'At Risk'];

  return Array.from({ length: 100 }, (_, i) => {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const loc = cities[i % cities.length];
    const ordersCount = 1 + ((i * 7) % 12);
    const totalSpent = ordersCount * (6500 + ((i * 1350) % 18500));
    return {
      id: `cust-${1001 + i}`,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i + 1}@example.in`,
      phone: `+91 98${String(10000000 + ((i * 7919) % 89999999))}`,
      city: loc.city,
      state: loc.state,
      pincode: loc.pin,
      address: `${12 + (i % 180)}, Palm Grove Residency, ${loc.city}`,
      ordersCount,
      totalSpent,
      segment: totalSpent > 85000 ? 'VIP' : ordersCount > 2 ? 'Repeat Buyer' : segments[i % segments.length],
      status: i % 17 === 0 ? 'Inactive' : 'Active',
      joinedAt: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
    };
  });
};

// Generate 150 deterministic historical orders + 200 transactions
const generateInitialOrdersAndTransactions = (products, customers) => {
  const statuses = ['Delivered', 'Delivered', 'Delivered', 'Shipped', 'Processing', 'Confirmed', 'Pending', 'Cancelled', 'Refunded'];
  const gateways = ['Razorpay', 'Stripe', 'PayPal', 'Cashfree'];
  const orders = [];
  const transactions = [];

  for (let i = 0; i < 150; i++) {
    const cust = customers[i % customers.length];
    const prod1 = products[(i * 3) % products.length];
    const prod2 = i % 3 === 0 ? products[(i * 5 + 1) % products.length] : null;
    const qty1 = 1 + (i % 2);
    const qty2 = prod2 ? 1 : 0;

    const p1Price = prod1.salePrice || prod1.price;
    const p2Price = prod2 ? (prod2.salePrice || prod2.price) : 0;
    const subtotal = p1Price * qty1 + p2Price * qty2;
    const discount = i % 5 === 0 ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal > 5000 ? 0 : 199;
    const total = subtotal - discount + shipping;
    const status = i < 6 ? ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Delivered'][i] : statuses[i % statuses.length];
    const gateway = gateways[i % gateways.length];

    const month = ((10 - Math.floor(i / 14) + 12) % 12) + 1;
    const day = 1 + ((i * 3) % 27);
    const dateStr = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const orderNum = `ORD-2026-${8450 - i}`;

    const items = [
      { productId: prod1.id, name: prod1.name, sku: prod1.sku, price: p1Price, quantity: qty1, image: prod1.image, variant: 'Obsidian Black / Standard' },
    ];
    if (prod2) {
      items.push({ productId: prod2.id, name: prod2.name, sku: prod2.sku, price: p2Price, quantity: qty2, image: prod2.image, variant: 'Raw Titanium / Standard' });
    }

    orders.push({
      id: `ord-${i + 1}`,
      orderNumber: orderNum,
      customerId: cust.id,
      customerName: cust.name,
      customerEmail: cust.email,
      shippingAddress: `${cust.address}, ${cust.city}, ${cust.state} - ${cust.pincode}`,
      items,
      subtotal,
      discount,
      shipping,
      total,
      status,
      paymentMethod: gateway,
      paymentStatus: status === 'Refunded' ? 'Refunded' : status === 'Cancelled' ? 'Failed' : 'Paid',
      date: dateStr,
      zohoSynced: i % 4 !== 0,
    });

    transactions.push({
      id: `TXN-${99400 - i}`,
      orderNumber: orderNum,
      customerName: cust.name,
      gateway,
      amount: total,
      fee: Math.round(total * 0.02),
      net: total - Math.round(total * 0.02),
      status: status === 'Refunded' ? 'Refunded' : status === 'Cancelled' ? 'Failed' : 'Captured',
      methodDetail: gateway === 'Razorpay' ? 'UPI / RuPay' : gateway === 'Cashfree' ? 'NetBanking HDFC' : 'Visa •••• 4242',
      date: dateStr,
    });
  }

  // Add 50 extra historical/settlement transactions to reach 200
  for (let j = 0; j < 50; j++) {
    const cust = customers[(j * 2) % customers.length];
    const gateway = gateways[j % gateways.length];
    const amount = 4500 + ((j * 1230) % 24000);
    transactions.push({
      id: `TXN-${99250 - j}`,
      orderNumber: `ORD-2025-${7100 - j}`,
      customerName: cust.name,
      gateway,
      amount,
      fee: Math.round(amount * 0.02),
      net: amount - Math.round(amount * 0.02),
      status: j % 9 === 0 ? 'Failed' : 'Captured',
      methodDetail: gateway === 'Razorpay' ? 'UPI Intent' : 'Mastercard •••• 8819',
      date: `2025-12-${String((j % 28) + 1).padStart(2, '0')}`,
    });
  }

  return { orders, transactions };
};

// Generate 30 deterministic Purchase Orders
const generateInitialPurchases = (products) => {
  const suppliers = [
    'Shenzhen Acoustic Components Ltd.',
    'Bengaluru Precision CNC Works',
    'Tokyo Micro-Optics Corp.',
    'Nordic Textile & Tannery AB',
    'Mumbai GaN Power Systems Pvt. Ltd.',
  ];
  const statuses = ['Received', 'Received', 'In Transit', 'Ordered', 'Partial'];

  return Array.from({ length: 30 }, (_, i) => {
    const prod = products[i % products.length];
    const qty = 25 + ((i * 15) % 100);
    const unitCost = Math.round(prod.price * 0.48);
    return {
      id: `po-${i + 1}`,
      poNumber: `PO-2026-${410 - i}`,
      supplier: suppliers[i % suppliers.length],
      productName: prod.name,
      sku: prod.sku,
      quantity: qty,
      unitCost,
      totalCost: qty * unitCost,
      status: statuses[i % statuses.length],
      expectedDate: `2026-11-${String((i % 27) + 1).padStart(2, '0')}`,
    };
  });
};

// Generate 20 deterministic Discount Codes
const generateInitialDiscounts = () => {
  const baseCodes = [
    { code: 'WELCOME10', type: 'Percentage', value: 10, minOrder: 2999, usage: 342, limit: 1000, status: 'Active', expiry: '2026-12-31' },
    { code: 'AETHER2000', type: 'Fixed', value: 2000, minOrder: 14999, usage: 128, limit: 500, status: 'Active', expiry: '2026-12-15' },
    { code: 'FESTIVE15', type: 'Percentage', value: 15, minOrder: 7999, usage: 510, limit: 600, status: 'Active', expiry: '2026-11-30' },
    { code: 'STUDIO500', type: 'Fixed', value: 500, minOrder: 3999, usage: 89, limit: 250, status: 'Active', expiry: '2026-12-31' },
    { code: 'VIP20', type: 'Percentage', value: 20, minOrder: 19999, usage: 64, limit: 100, status: 'Active', expiry: '2026-12-31' },
  ];

  const extra = Array.from({ length: 15 }, (_, i) => ({
    code: `SAVE${(i + 1) * 5}${i % 2 === 0 ? 'PCT' : 'INR'}`,
    type: i % 2 === 0 ? 'Percentage' : 'Fixed',
    value: i % 2 === 0 ? 5 + (i % 15) : 500 + i * 250,
    minOrder: 2500 + i * 1000,
    usage: 15 + ((i * 17) % 180),
    limit: 200 + i * 50,
    status: i % 4 === 0 ? 'Expired' : 'Active',
    expiry: i % 4 === 0 ? '2026-09-30' : '2026-12-31',
  }));

  return [...baseCodes, ...extra].map((d, idx) => ({ id: `disc-${idx + 1}`, ...d }));
};

const MONTHLY_SALES_ANALYTICS = [
  { month: 'Dec 25', revenue: 1840000, orders: 142, aov: 12957 },
  { month: 'Jan 26', revenue: 1620000, orders: 128, aov: 12656 },
  { month: 'Feb 26', revenue: 1790000, orders: 139, aov: 12877 },
  { month: 'Mar 26', revenue: 2150000, orders: 164, aov: 13109 },
  { month: 'Apr 26', revenue: 2040000, orders: 156, aov: 13076 },
  { month: 'May 26', revenue: 2380000, orders: 179, aov: 13296 },
  { month: 'Jun 26', revenue: 2290000, orders: 171, aov: 13391 },
  { month: 'Jul 26', revenue: 2560000, orders: 192, aov: 13333 },
  { month: 'Aug 26', revenue: 2810000, orders: 208, aov: 13509 },
  { month: 'Sep 26', revenue: 2690000, orders: 198, aov: 13585 },
  { month: 'Oct 26', revenue: 3420000, orders: 248, aov: 13790 },
  { month: 'Nov 26', revenue: 3890000, orders: 276, aov: 14094 },
];

const INITIAL_STORE_CONFIG = {
  announcementBar: 'Complimentary Express Shipping across India on orders above ₹4,999 • Use code WELCOME10 for 10% off',
  navigationItems: [
    { id: 'nav-1', label: 'Home', action: 'home', category: 'All', visible: true },
    { id: 'nav-2', label: 'Shop All', action: 'catalog', category: 'All', visible: true },
    { id: 'nav-3', label: 'Audio', action: 'catalog', category: 'Audio & Acoustics', visible: true },
    { id: 'nav-4', label: 'Wearables', action: 'catalog', category: 'Wearable Tech', visible: true },
    { id: 'nav-5', label: 'Workspace', action: 'catalog', category: 'Workspace & Desk', visible: true },
    { id: 'nav-6', label: 'Photography', action: 'catalog', category: 'Photography & Optics', visible: true },
  ],
  hero: {
    eyebrow: 'AUTUMN / WINTER COLLECTION 2026',
    title: 'Precision Objects for Modern Living.',
    subtitle: 'Discover acoustic engineering, minimalist timepieces, and tactile workspace instruments crafted from aerospace-grade materials.',
    ctaText: 'Explore Collection',
    ctaLink: 'catalog',
    secondaryCtaText: 'View Flagship Audio',
    image: HERO_IMAGES[0],
  },
  promoBanners: [
    {
      id: 'promo-1',
      title: 'The Studio Desk Upgrade',
      subtitle: 'Save up to ₹3,500 when pairing any mechanical keyboard with a CNC aluminum riser.',
      ctaText: 'Shop Workspace',
      badge: 'BUNDLE OFFER',
      image: HERO_IMAGES[1],
      active: true,
    },
    {
      id: 'promo-2',
      title: 'Flagship Acoustic Series',
      subtitle: 'Adaptive hybrid active noise cancellation with 45-hour battery endurance.',
      ctaText: 'Discover Audio',
      badge: 'NEW RELEASE',
      image: HERO_IMAGES[2],
      active: true,
    },
  ],
  sections: [
    { id: 'sec-hero', label: 'Hero Showcase', visible: true },
    { id: 'sec-categories', label: 'Featured Categories', visible: true },
    { id: 'sec-trending', label: 'Trending Products', visible: true },
    { id: 'sec-promos', label: 'Promotional Banners', visible: true },
    { id: 'sec-bestsellers', label: 'Best-Selling Products', visible: true },
    { id: 'sec-new', label: 'New Arrivals', visible: true },
    { id: 'sec-testimonials', label: 'Customer Testimonials', visible: true },
    { id: 'sec-newsletter', label: 'Newsletter Signup', visible: true },
  ],
  theme: {
    preset: 'Minimal Modern',
    primaryColor: '#0f172a',
    secondaryColor: '#f8fafc',
    accentColor: '#2563eb',
    fontFamily: 'Inter, system-ui, sans-serif',
    buttonStyle: 'rounded', // 'pill' | 'rounded' | 'sharp'
    borderRadius: '12px',
    headerLayout: 'centered', // 'left' | 'centered'
    footerStyle: 'columns', // 'columns' | 'minimal'
    storeDarkMode: false,
    cardStyle: 'elevated', // 'elevated' | 'bordered' | 'minimal'
    density: 'comfortable', // 'comfortable' | 'compact'
  },
  seo: {
    siteTitle: 'AETHER GOODS — Precision Hardware & Modern Lifestyle Store',
    siteDescription: 'Curated minimalist tech, studio audio, mechanical keyboards, and everyday carry designed for modern living. Free pan-India shipping.',
    canonicalBase: 'https://aethergoods.in',
    ogTitle: 'AETHER GOODS | Engineered for Everyday Excellence',
    ogImage: HERO_IMAGES[0],
    sitemapEnabled: true,
    robotsTxt: 'User-agent: *\nAllow: /store\nDisallow: /admin\nSitemap: https://aethergoods.in/sitemap.xml',
    redirects: [
      { id: 'red-1', from: '/headphones', to: '/store?category=Audio+%26+Acoustics', code: '301' },
      { id: 'red-2', from: '/watches', to: '/store?category=Wearable+Tech', code: '301' },
    ],
  },
  gateways: [
    {
      id: 'razorpay',
      name: 'Razorpay',
      tagline: 'UPI, RuPay, Indian Credit/Debit Cards & NetBanking',
      enabled: true,
      mode: 'Test',
      keyId: 'rzp_test_98a76b54c32d10',
      methods: ['UPI', 'Cards', 'NetBanking', 'Wallets'],
      lastTested: '2 mins ago • 142ms',
      status: 'Connected',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      tagline: 'Global Cards, Apple Pay & International Checkout',
      enabled: true,
      mode: 'Test',
      keyId: 'pk_test_51P9xDemoKeySimulated99',
      methods: ['Visa', 'Mastercard', 'Amex', 'Apple Pay'],
      lastTested: '14 mins ago • 189ms',
      status: 'Connected',
    },
    {
      id: 'cashfree',
      name: 'Cashfree Payments',
      tagline: 'Instant Settlements, UPI AutoPay & EMI Options',
      enabled: true,
      mode: 'Test',
      keyId: 'cf_test_demo_app_77412',
      methods: ['UPI', 'No-Cost EMI', 'PayLater'],
      lastTested: '1 hour ago • 165ms',
      status: 'Connected',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      tagline: 'Express International Buyer Protection Checkout',
      enabled: false,
      mode: 'Test',
      keyId: 'sb-demo-client-id-8821',
      methods: ['PayPal Balance', 'International Cards'],
      lastTested: 'Not tested recently',
      status: 'Disconnected',
    },
  ],
  zohoBooks: {
    connected: true,
    orgName: 'Aether Retail Pvt. Ltd. (GSTIN: 27AABCA8921F1Z5)',
    orgId: '60028491024',
    syncCustomers: true,
    syncInvoices: true,
    syncPayments: true,
    syncSalesOrders: true,
    lastSync: 'Today, 08:15 PM IST',
    logs: [
      { id: 'zlog-1', time: 'Today, 08:15 PM', entity: 'Invoices & Payments', count: 14, status: 'Success', message: '14 GST tax invoices synced to Zoho Books.' },
      { id: 'zlog-2', time: 'Today, 02:30 PM', entity: 'Customer Contacts', count: 6, status: 'Success', message: '6 new customer ledgers created with state tax codes.' },
      { id: 'zlog-3', time: 'Yesterday, 09:00 PM', entity: 'Sales Orders', count: 1, status: 'Warning', message: 'ORD-2026-8444 skipped: Missing customer HSN code mapping (Demo).' },
      { id: 'zlog-4', time: 'Yesterday, 06:00 PM', entity: 'Full Ledger Sync', count: 42, status: 'Success', message: 'Batch reconciliation completed without discrepancies.' },
    ],
  },
  storeSettings: {
    storeName: 'Aether Goods India',
    supportEmail: 'concierge@aethergoods.in',
    supportPhone: '+91 22 4890 1120',
    currency: 'INR (₹)',
    gstRate: 18,
    freeShippingThreshold: 4999,
    address: 'Level 4, Maker Maxity, Bandra Kurla Complex, Mumbai 400051',
  },
};

const THEME_PRESETS = {
  'Minimal Modern': {
    preset: 'Minimal Modern',
    primaryColor: '#0f172a',
    secondaryColor: '#f8fafc',
    accentColor: '#2563eb',
    fontFamily: 'Inter, system-ui, sans-serif',
    buttonStyle: 'rounded',
    borderRadius: '12px',
    headerLayout: 'centered',
    footerStyle: 'columns',
    storeDarkMode: false,
    cardStyle: 'elevated',
    density: 'comfortable',
  },
  'Premium Luxury': {
    preset: 'Premium Luxury',
    primaryColor: '#1c1917',
    secondaryColor: '#fafaf9',
    accentColor: '#b45309',
    fontFamily: 'Georgia, serif',
    buttonStyle: 'sharp',
    borderRadius: '4px',
    headerLayout: 'centered',
    footerStyle: 'minimal',
    storeDarkMode: true,
    cardStyle: 'bordered',
    density: 'comfortable',
  },
  'Bold Commerce': {
    preset: 'Bold Commerce',
    primaryColor: '#111827',
    secondaryColor: '#f3f4f6',
    accentColor: '#e11d48',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    buttonStyle: 'pill',
    borderRadius: '20px',
    headerLayout: 'left',
    footerStyle: 'columns',
    storeDarkMode: false,
    cardStyle: 'elevated',
    density: 'compact',
  },
};

// ============================================================================
// 2. SHARED CLIENT STATE & LOCALSTORAGE PERSISTENCE
// ============================================================================

const STORAGE_KEY = 'aether_ecommerce_demo_v1';

const AppStateContext = createContext(null);

const useStore = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useStore must be used inside AppStateProvider');
  return ctx;
};

const AppStateProvider = ({ children }) => {
  const [hydrated, setHydrated] = useState(false);

  // Route state: starts directly on '/store' so the e-commerce storefront is immediately live & interactive
  const [route, setRoute] = useState('/store');
  const [adminSubPage, setAdminSubPage] = useState('dashboard');
  const [storeSubView, setStoreSubView] = useState('home'); // 'home' | 'catalog' | 'product' | 'checkout' | 'confirmation'
  const [selectedProductId, setSelectedProductId] = useState('prod-101');
  const [quickViewProductId, setQuickViewProductId] = useState(null);
  const [wishlist, setWishlist] = useState(['prod-101', 'prod-102']);
  const [orderLookupOpen, setOrderLookupOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState(null);
  const [catalogFilters, setCatalogFilters] = useState({
    category: 'All',
    brand: 'All',
    maxPrice: 50000,
    search: '',
    sort: 'featured',
  });

  // Core Commerce Entities
  const [products, setProducts] = useState(() => generateInitialProducts());
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [customers, setCustomers] = useState(() => generateInitialCustomers());
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [discounts, setDiscounts] = useState(() => generateInitialDiscounts());
  const [config, setConfig] = useState(INITIAL_STORE_CONFIG);

  // Cart & UI State
  const [cart, setCart] = useState([
    { productId: 'prod-101', quantity: 1, color: 'Obsidian Black', size: 'Standard' },
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [adminDarkMode, setAdminDarkMode] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, description = '', type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  // Initialize deterministic data & hydrate from localStorage safely
  useEffect(() => {
    const initProds = generateInitialProducts();
    const initCusts = generateInitialCustomers();
    const { orders: initOrders, transactions: initTxns } = generateInitialOrdersAndTransactions(initProds, initCusts);
    const initPurch = generateInitialPurchases(initProds);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProducts(parsed.products || initProds);
        setCategories(parsed.categories || INITIAL_CATEGORIES);
        setCustomers(parsed.customers || initCusts);
        setOrders(parsed.orders || initOrders);
        setTransactions(parsed.transactions || initTxns);
        setPurchases(parsed.purchases || initPurch);
        setDiscounts(parsed.discounts || generateInitialDiscounts());
        setConfig({
          ...INITIAL_STORE_CONFIG,
          ...(parsed.config || {}),
          navigationItems: parsed.config?.navigationItems || INITIAL_STORE_CONFIG.navigationItems,
        });
        setCart(parsed.cart || []);
        setWishlist(parsed.wishlist || ['prod-101', 'prod-102']);
      } else {
        setOrders(initOrders);
        setTransactions(initTxns);
        setPurchases(initPurch);
      }
    } catch (e) {
      setOrders(initOrders);
      setTransactions(initTxns);
      setPurchases(initPurch);
    }
    setHydrated(true);
  }, []);

  // Persist changes to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          products,
          categories,
          customers,
          orders,
          transactions,
          purchases,
          discounts,
          config,
          cart,
          wishlist,
        })
      );
    } catch (e) {
      // Ignore quota errors in sandboxed iframes
    }
  }, [hydrated, products, categories, customers, orders, transactions, purchases, discounts, config, cart, wishlist]);
  // Document Title & Meta reflection from SEO Manager
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = config.seo.siteTitle;
    }
  }, [config.seo.siteTitle]);

  const resetDemoData = () => {
    const initProds = generateInitialProducts();
    const initCusts = generateInitialCustomers();
    const { orders: initOrders, transactions: initTxns } = generateInitialOrdersAndTransactions(initProds, initCusts);
    const initPurch = generateInitialPurchases(initProds);

    setProducts(initProds);
    setCategories(INITIAL_CATEGORIES);
    setCustomers(initCusts);
    setOrders(initOrders);
    setTransactions(initTxns);
    setPurchases(initPurch);
    setDiscounts(generateInitialDiscounts());
    setConfig(INITIAL_STORE_CONFIG);
    setCart([{ productId: 'prod-101', quantity: 1, color: 'Obsidian Black', size: 'Standard' }]);
    setWishlist(['prod-101', 'prod-102']);
    setAppliedCoupon(null);
    localStorage.removeItem(STORAGE_KEY);
    addToast('Demo Data Restored', 'All products, orders, themes, and settings reset to factory state.');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      addToast(exists ? 'Removed from Saved' : 'Saved to Wishlist', exists ? 'Item removed from your saved list.' : 'Item saved for quick access.');
      return next;
    });
  };

  // Cart Actions
  const addToCart = (productId, quantity = 1, color = 'Obsidian Black', size = 'Standard', openDrawer = true) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === productId && item.color === color && item.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { productId, quantity, color, size }];
    });
    const prod = products.find((p) => p.id === productId);
    addToast('Added to Bag', `${prod?.name || 'Item'} added to your shopping bag.`);
    if (openDrawer) setCartOpen(true);
  };

  const updateCartQty = (index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      const nextQty = updated[index].quantity + delta;
      if (nextQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = nextQty;
      }
      return updated;
    });
  };

  const removeCartItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Simulated Checkout Action
  const placeSimulatedOrder = ({ customerDetails, shippingMethod, paymentGateway }) => {
    const cartDetails = cart
      .map((item) => {
        const p = products.find((prod) => prod.id === item.productId);
        if (!p) return null;
        return {
          productId: p.id,
          name: p.name,
          sku: p.sku,
          price: p.salePrice || p.price,
          quantity: item.quantity,
          image: p.image,
          variant: `${item.color} / ${item.size}`,
        };
      })
      .filter(Boolean);

    const subtotal = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = appliedCoupon
      ? appliedCoupon.type === 'Percentage'
        ? Math.round((subtotal * appliedCoupon.value) / 100)
        : appliedCoupon.value
      : 0;
    const shippingCost = shippingMethod === 'express' ? 299 : subtotal >= config.storeSettings.freeShippingThreshold ? 0 : 149;
    const total = Math.max(0, subtotal - discountAmount + shippingCost);

    const orderNumber = `ORD-2026-${8451 + orders.length}`;
    const today = '2026-11-20';

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerId: 'cust-demo-live',
      customerName: customerDetails.fullName,
      customerEmail: customerDetails.email,
      shippingAddress: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.pincode}`,
      items: cartDetails,
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total,
      status: 'Confirmed',
      paymentMethod: paymentGateway,
      paymentStatus: 'Paid (Demo)',
      date: today,
      zohoSynced: config.zohoBooks.connected && config.zohoBooks.syncSalesOrders,
    };

    const newTxn = {
      id: `TXN-${99401 + transactions.length}`,
      orderNumber,
      customerName: customerDetails.fullName,
      gateway: paymentGateway,
      amount: total,
      fee: Math.round(total * 0.02),
      net: total - Math.round(total * 0.02),
      status: 'Captured',
      methodDetail: `${paymentGateway} Simulated Checkout`,
      date: today,
    };

    // Decrement product stock
    setProducts((prev) =>
      prev.map((p) => {
        const ordered = cartDetails.find((c) => c.productId === p.id);
        if (!ordered) return p;
        const nextStock = Math.max(0, p.stock - ordered.quantity);
        return {
          ...p,
          stock: nextStock,
          salesCount: p.salesCount + ordered.quantity,
          status: nextStock === 0 ? 'Out of Stock' : p.status,
        };
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setTransactions((prev) => [newTxn, ...prev]);
    setLastPlacedOrder(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setStoreSubView('confirmation');
    addToast('Order Confirmed!', `Simulated order ${orderNumber} recorded in Admin Dashboard.`);
  };

  const value = {
    hydrated,
    route,
    setRoute,
    adminSubPage,
    setAdminSubPage,
    storeSubView,
    setStoreSubView,
    selectedProductId,
    setSelectedProductId,
    quickViewProductId,
    setQuickViewProductId,
    wishlist,
    toggleWishlist,
    orderLookupOpen,
    setOrderLookupOpen,
    activeInfoModal,
    setActiveInfoModal,
    catalogFilters,
    setCatalogFilters,
    products,
    setProducts,
    categories,
    setCategories,
    customers,
    setCustomers,
    orders,
    setOrders,
    transactions,
    setTransactions,
    purchases,
    setPurchases,
    discounts,
    setDiscounts,
    config,
    setConfig,
    cart,
    addToCart,
    updateCartQty,
    removeCartItem,
    appliedCoupon,
    setAppliedCoupon,
    cartOpen,
    setCartOpen,
    lastPlacedOrder,
    placeSimulatedOrder,
    adminDarkMode,
    setAdminDarkMode,
    toasts,
    addToast,
    resetDemoData,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

// ============================================================================
// 3. REUSABLE UI PRIMITIVES (BADGES, MODALS, TOASTS, DEMO RIBBON)
// ============================================================================

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Connected: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Delivered: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Captured: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Received: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    VIP: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    Confirmed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    Shipped: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    'In Transit': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    'Repeat Buyer': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    Processing: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Ordered: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Partial: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Draft: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    New: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    Inactive: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    Disconnected: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    'Out of Stock': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Cancelled: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Failed: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Expired: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    'At Risk': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    Refunded: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.Draft}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
};

const ToastContainer = () => {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl rounded-xl p-3.5 border border-slate-800 dark:border-slate-200 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">{t.title}</p>
            {t.description && <p className="text-xs opacity-80 mt-0.5">{t.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

const Modal = ({ open, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col overflow-hidden`}>
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. LANDING PORTAL (/)
// ============================================================================

const LandingPortal = () => {
  const { setRoute, setStoreSubView, setAdminSubPage, products, orders } = useStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Subtle architectural grid background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg tracking-tight">
            Æ
          </div>
          <div>
            <span className="font-semibold tracking-tight text-lg">AETHER COMMERCE</span>
            <span className="ml-2.5 text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
              Interactive Frontend Demo
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
          <span>Zero Backend • LocalStorage Synced • INR (₹)</span>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl w-full mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Full-Stack Experience Simulated Client-Side • Real-Time Storefront & Admin Sync</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          Modern E-Commerce Platform &amp; Merchant Operating System
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Explore an interconnected storefront and commerce control center. Place simulated orders, customize live themes and hero banners, manage inventory, configure Indian &amp; global payment gateways, and test Zoho Books ledger synchronization.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setStoreSubView('home');
              setRoute('/store');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-950 font-semibold text-base hover:bg-slate-100 transition flex items-center justify-center gap-2.5 shadow-lg shadow-white/10"
          >
            <Store className="w-5 h-5" />
            <span>View Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setAdminSubPage('dashboard');
              setRoute('/admin');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-500 transition flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/25"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Open Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          {[
            { label: 'Catalog Products', value: `${products.length} SKUs`, sub: 'Live editable variants & stock' },
            { label: 'Simulated Orders', value: `${orders.length} Orders`, sub: 'End-to-end checkout sync' },
            { label: 'Visual Editors', value: 'Theme & Banner', sub: 'Live split-screen preview' },
            { label: 'Integrations', value: '4 Gateways + Zoho', sub: 'Razorpay, Stripe, Cashfree' },
          ].map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90">
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
              <p className="text-[11px] text-slate-500 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-800/80 py-5 px-6 text-center text-xs text-slate-500">
        Frontend-Only Interactive Demonstration • All product data, customer profiles, and transactions are fictional.
      </footer>
    </div>
  );
};

// ============================================================================
// 5. CUSTOMER STOREFRONT (/store)
// ============================================================================

const StorefrontExperience = ({ embeddedPreview = false }) => {
  const {
    setRoute,
    setAdminSubPage,
    storeSubView,
    setStoreSubView,
    selectedProductId,
    setSelectedProductId,
    quickViewProductId,
    setQuickViewProductId,
    wishlist,
    toggleWishlist,
    orderLookupOpen,
    setOrderLookupOpen,
    activeInfoModal,
    setActiveInfoModal,
    catalogFilters,
    setCatalogFilters,
    products,
    categories,
    orders,
    config,
    cart,
    addToCart,
    updateCartQty,
    removeCartItem,
    appliedCoupon,
    setAppliedCoupon,
    discounts,
    cartOpen,
    setCartOpen,
    lastPlacedOrder,
    placeSimulatedOrder,
    addToast,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [trackOrderInput, setTrackOrderInput] = useState('');

  const theme = config.theme;
  const isDark = theme.storeDarkMode;

  const btnRadiusClass =
    theme.buttonStyle === 'pill'
      ? 'rounded-full'
      : theme.buttonStyle === 'sharp'
      ? 'rounded-none'
      : 'rounded-xl';

  const cardStyleClass =
    theme.cardStyle === 'bordered'
      ? isDark
        ? 'bg-neutral-900 border border-neutral-800'
        : 'bg-white border border-slate-200'
      : theme.cardStyle === 'minimal'
      ? 'bg-transparent'
      : isDark
      ? 'bg-neutral-900/90 border border-neutral-800/80 shadow-lg'
      : 'bg-white border border-slate-100 shadow-sm hover:shadow-md';

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const openProductDetail = (productId) => {
    setSelectedProductId(productId);
    setStoreSubView('product');
    if (!embeddedPreview) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateCatalog = (category = 'All') => {
    setCatalogFilters((prev) => ({ ...prev, category }));
    setStoreSubView('catalog');
    setMobileMenuOpen(false);
    if (!embeddedPreview) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCatalogFilters((prev) => ({ ...prev, search: searchInput }));
    setStoreSubView('catalog');
  };

  // Product Card Sub-component
  const ProductCard = ({ product, listView = false }) => {
    const discountPct = product.salePrice
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;
    const isSaved = wishlist.includes(product.id);

    return (
      <div
        style={{ borderRadius: theme.borderRadius }}
        className={`group overflow-hidden transition-all duration-200 flex ${
          listView ? 'flex-col sm:flex-row gap-5 p-4' : 'flex-col'
        } ${cardStyleClass}`}
      >
        <div
          className={`relative overflow-hidden bg-slate-100 dark:bg-neutral-800 ${
            listView ? 'w-full sm:w-56 h-52 shrink-0 rounded-lg' : 'aspect-square w-full'
          }`}
        >
          <img
            onClick={() => openProductDetail(product.id)}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            {product.badge && (
              <span
                style={{ backgroundColor: theme.accentColor }}
                className="px-2.5 py-0.5 text-[11px] font-semibold text-white rounded-full shadow-xs"
              >
                {product.badge}
              </span>
            )}
            {discountPct > 0 && (
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-600 text-white rounded-full">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Quick Action Buttons (Wishlist & Quick View) */}
          {!embeddedPreview && (
            <div className="absolute top-3 right-3 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="w-8 h-8 rounded-full bg-white/90 text-slate-900 shadow-sm flex items-center justify-center hover:scale-105 transition"
                title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickViewProductId(product.id);
                }}
                className="w-8 h-8 rounded-full bg-white/90 text-slate-900 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-105 transition"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          )}

          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 text-[10px] font-medium bg-amber-500 text-white rounded-md">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className={`flex flex-col justify-between flex-1 ${listView ? 'py-1' : theme.density === 'compact' ? 'p-3.5' : 'p-4'}`}>
          <div>
            <div className="flex items-center justify-between text-xs opacity-60 mb-1">
              <span>{product.category} • {product.brand}</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating} ({product.reviewCount})
              </span>
            </div>
            <h3
              onClick={() => openProductDetail(product.id)}
              className="font-semibold text-base leading-snug cursor-pointer hover:underline line-clamp-2"
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((col, idx) => (
                <span
                  key={idx}
                  title={col}
                  className="text-[10px] px-2 py-0.5 rounded bg-current/5 opacity-75"
                >
                  {col}
                </span>
              ))}
            </div>
            {listView && (
              <p className="text-sm opacity-75 mt-2 line-clamp-2">{product.description}</p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between gap-2">
            <div>
              {product.salePrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-base">{formatINR(product.salePrice)}</span>
                  <span className="text-xs line-through opacity-50">{formatINR(product.price)}</span>
                </div>
              ) : (
                <span className="font-bold text-base">{formatINR(product.price)}</span>
              )}
              <span className="text-[10px] opacity-55 block">Free Express Delivery</span>
            </div>

            <button
              disabled={product.stock === 0}
              onClick={() => addToCart(product.id, 1, product.colors[0], product.sizes[0], !embeddedPreview)}
              style={{
                backgroundColor: product.stock === 0 ? '#94a3b8' : theme.accentColor,
              }}
              className={`px-3.5 py-2 text-xs font-semibold text-white transition opacity-95 hover:opacity-100 disabled:cursor-not-allowed flex items-center gap-1.5 ${btnRadiusClass}`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Storefront Sub-View: Homepage ---
  const renderHomepage = () => {
    const activeProducts = products.filter((p) => p.status !== 'Draft');
    const trendingProducts = activeProducts.filter((p) => p.badge === 'Trending' || p.rating >= 4.7).slice(0, 4);
    const bestSellers = [...activeProducts].sort((a, b) => b.salesCount - a.salesCount).slice(0, 4);
    const newArrivals = activeProducts.slice(-4);
    const featuredCats = categories.filter((c) => c.featured);

    return (
      <div className="space-y-14 pb-16">
        {/* Interactive Category Quick-Filter Ribbon directly under Header */}
        <div className="border-b border-current/10 py-3 px-4 sm:px-6 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigateCatalog('All')}
                style={{ backgroundColor: theme.accentColor }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white"
              >
                All {activeProducts.length} Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => navigateCatalog(cat.name)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-current/15 hover:border-current/40 transition shrink-0"
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="hidden xl:flex items-center gap-4 text-xs opacity-70 shrink-0">
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> 24–48h Metro Dispatch</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> GST Invoice Ready</span>
            </div>
          </div>
        </div>

        {config.sections.map((section) => {
          if (!section.visible) return null;

          if (section.id === 'sec-hero') {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Main Hero Banner */}
                  <div
                    style={{ borderRadius: theme.borderRadius }}
                    className="lg:col-span-8 relative overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-center bg-slate-900 text-white"
                  >
                    <img
                      src={config.hero.image}
                      alt="Hero showcase"
                      className="absolute inset-0 w-full h-full object-cover opacity-55"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                    <div className="relative z-10 max-w-xl px-6 sm:px-10 py-10">
                      <span
                        style={{ backgroundColor: theme.accentColor }}
                        className="inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full mb-4"
                      >
                        {config.hero.eyebrow}
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
                        {config.hero.title}
                      </h1>
                      <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                        {config.hero.subtitle}
                      </p>
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => navigateCatalog('All')}
                          style={{ backgroundColor: theme.accentColor }}
                          className={`px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition flex items-center gap-2 ${btnRadiusClass}`}
                        >
                          <span>{config.hero.ctaText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigateCatalog('Audio & Acoustics')}
                          className={`px-5 py-3 text-sm font-semibold bg-white/15 backdrop-blur-md text-white border border-white/25 hover:bg-white/25 transition ${btnRadiusClass}`}
                        >
                          {config.hero.secondaryCtaText}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Spotlight Product Card beside Hero */}
                  {activeProducts[0] && (
                    <div
                      style={{ borderRadius: theme.borderRadius }}
                      className={`lg:col-span-4 p-6 flex flex-col justify-between ${cardStyleClass}`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-60 mb-3">
                          <span>Flagship Spotlight</span>
                          <span className="text-emerald-600">● In Stock ({activeProducts[0].stock})</span>
                        </div>
                        <div
                          onClick={() => openProductDetail(activeProducts[0].id)}
                          className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-neutral-800 cursor-pointer mb-4"
                        >
                          <img
                            src={activeProducts[0].image}
                            alt={activeProducts[0].name}
                            className="w-full h-full object-cover hover:scale-105 transition duration-500"
                          />
                        </div>
                        <h3
                          onClick={() => openProductDetail(activeProducts[0].id)}
                          className="font-bold text-lg cursor-pointer hover:underline"
                        >
                          {activeProducts[0].name}
                        </h3>
                        <p className="text-xs opacity-70 mt-1 line-clamp-2">
                          {activeProducts[0].description}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-current/10 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-xl font-bold">
                            {formatINR(activeProducts[0].salePrice || activeProducts[0].price)}
                          </span>
                          {activeProducts[0].salePrice && (
                            <span className="text-xs line-through opacity-50 ml-2">
                              {formatINR(activeProducts[0].price)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            addToCart(
                              activeProducts[0].id,
                              1,
                              activeProducts[0].colors[0],
                              activeProducts[0].sizes[0],
                              !embeddedPreview
                            )
                          }
                          style={{ backgroundColor: theme.accentColor }}
                          className={`px-4 py-2.5 text-xs font-bold text-white flex items-center gap-1.5 ${btnRadiusClass}`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Store Trust & Value Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {[
                    { icon: Truck, title: 'Free Express Shipping', desc: `On all orders above ${formatINR(config.storeSettings.freeShippingThreshold)}` },
                    { icon: Shield, title: '2-Year Indian Warranty', desc: 'Direct doorstep replacement coverage' },
                    { icon: RotateCcw, title: '30-Day Easy Returns', desc: 'No-questions-asked pickup from your home' },
                    { icon: CreditCard, title: 'UPI, Cards & No-Cost EMI', desc: 'Powered by Razorpay, Stripe & Cashfree' },
                  ].map((perk, idx) => {
                    const Icon = perk.icon;
                    return (
                      <div
                        key={idx}
                        style={{ borderRadius: theme.borderRadius }}
                        className={`p-4 flex items-start gap-3 ${cardStyleClass}`}
                      >
                        <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold">{perk.title}</h4>
                          <p className="text-[11px] opacity-65 mt-0.5">{perk.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }

          if (section.id === 'sec-categories') {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
                    <p className="text-sm opacity-65 mt-1">Curated collections engineered for your daily ritual.</p>
                  </div>
                  <button
                    onClick={() => navigateCatalog('All')}
                    className="text-sm font-semibold flex items-center gap-1 hover:underline"
                    style={{ color: theme.accentColor }}
                  >
                    All Categories <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {featuredCats.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => navigateCatalog(cat.name)}
                      style={{ borderRadius: theme.borderRadius }}
                      className="group relative h-60 overflow-hidden cursor-pointer bg-slate-900"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-bold text-lg">{cat.name}</h3>
                        <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{cat.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'sec-trending') {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
                    <p className="text-sm opacity-65 mt-1">Most coveted hardware across Bengaluru, Mumbai &amp; Delhi.</p>
                  </div>
                  <button
                    onClick={() => navigateCatalog('All')}
                    className="text-sm font-semibold flex items-center gap-1 hover:underline"
                    style={{ color: theme.accentColor }}
                  >
                    View Catalog <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'sec-promos') {
            const activeBanners = config.promoBanners.filter((b) => b.active);
            if (!activeBanners.length) return null;
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeBanners.map((banner) => (
                    <div
                      key={banner.id}
                      style={{ borderRadius: theme.borderRadius }}
                      className="relative overflow-hidden min-h-[260px] flex items-end p-7 bg-slate-900 text-white"
                    >
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                      <div className="relative z-10 max-w-md">
                        <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-xs rounded-full">
                          {banner.badge}
                        </span>
                        <h3 className="text-2xl font-bold mt-2.5">{banner.title}</h3>
                        <p className="text-sm text-slate-200 mt-1.5">{banner.subtitle}</p>
                        <button
                          onClick={() => navigateCatalog('All')}
                          className={`mt-4 px-5 py-2.5 bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition ${btnRadiusClass}`}
                        >
                          {banner.ctaText}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'sec-bestsellers') {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Best-Selling Essentials</h2>
                    <p className="text-sm opacity-65 mt-1">Highest rated staples verified by thousands of buyers.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'sec-new') {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
                    <p className="text-sm opacity-65 mt-1">Freshly unboxed additions to the Aether catalog.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {newArrivals.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'sec-testimonials') {
            const reviews = [
              { name: 'Siddharth Kulkarni', city: 'Pune', product: 'Aether Studio ANC Pro', text: 'The noise cancellation on Mumbai-Bengaluru flights is remarkable. Build quality rivals headphones twice the price.' },
              { name: 'Ananya Menon', city: 'Bengaluru', product: 'Monolith Keychron Q1', text: 'Tactile acoustics right out of the box. Delivered within 24 hours in Indiranagar with immaculate packaging.' },
              { name: 'Vikramaditya Rao', city: 'Hyderabad', product: 'Krono Series 8 Titanium', text: '12-day battery life and zero bloatware. Finally a smartwatch that looks like a classic horological piece.' },
            ];
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl font-bold tracking-tight mb-6">Verified Collector Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {reviews.map((r, i) => (
                    <div
                      key={i}
                      style={{ borderRadius: theme.borderRadius }}
                      className={`p-6 ${cardStyleClass}`}
                    >
                      <div className="flex items-center gap-1 text-amber-400 mb-3">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed opacity-85">“{r.text}”</p>
                      <div className="mt-4 pt-4 border-t border-current/10 flex items-center justify-between text-xs">
                        <span className="font-bold">{r.name} • {r.city}</span>
                        <span className="opacity-60">{r.product}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'sec-newsletter') {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6">
                <div
                  style={{
                    borderRadius: theme.borderRadius,
                    backgroundColor: isDark ? '#171717' : theme.primaryColor,
                  }}
                  className="p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8"
                >
                  <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-3xl font-bold">Join the Aether Dispatch</h2>
                    <p className="text-sm text-slate-300 mt-2">
                      Receive early access to limited-run hardware drops, industrial design notes, and an instant ₹1,000 welcome voucher.
                    </p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newsletterEmail) return;
                      addToast('Subscribed!', 'Check your inbox for code WELCOME10.');
                      setNewsletterEmail('');
                    }}
                    className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="you@domain.in"
                      className={`px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm min-w-[260px] focus:outline-none ${btnRadiusClass}`}
                    />
                    <button
                      type="submit"
                      style={{ backgroundColor: theme.accentColor }}
                      className={`px-6 py-3 text-sm font-semibold text-white hover:brightness-110 transition ${btnRadiusClass}`}
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    );
  };

  // --- Storefront Sub-View: Product Listing / Catalog ---
  const renderCatalog = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [page, setPage] = useState(1);
    const pageSize = 12;

    const filtered = useMemo(() => {
      return products
        .filter((p) => p.status !== 'Draft')
        .filter((p) => catalogFilters.category === 'All' || p.category === catalogFilters.category)
        .filter((p) => catalogFilters.brand === 'All' || p.brand === catalogFilters.brand)
        .filter((p) => (p.salePrice || p.price) <= catalogFilters.maxPrice)
        .filter(
          (p) =>
            !catalogFilters.search ||
            p.name.toLowerCase().includes(catalogFilters.search.toLowerCase()) ||
            p.category.toLowerCase().includes(catalogFilters.search.toLowerCase())
        )
        .sort((a, b) => {
          const pa = a.salePrice || a.price;
          const pb = b.salePrice || b.price;
          if (catalogFilters.sort === 'price-asc') return pa - pb;
          if (catalogFilters.sort === 'price-desc') return pb - pa;
          if (catalogFilters.sort === 'rating') return b.rating - a.rating;
          if (catalogFilters.sort === 'popular') return b.salesCount - a.salesCount;
          return 0;
        });
    }, [products, catalogFilters]);

    const visibleProducts = filtered.slice(0, page * pageSize);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-current/10">
          <div>
            <div className="flex items-center gap-2 text-xs opacity-60 mb-1">
              <button onClick={() => setStoreSubView('home')} className="hover:underline">Home</button>
              <span>/</span>
              <span>{catalogFilters.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {catalogFilters.category === 'All' ? 'All Products' : catalogFilters.category}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={catalogFilters.sort}
              onChange={(e) => setCatalogFilters((prev) => ({ ...prev, sort: e.target.value }))}
              className={`px-3.5 py-2 text-sm border rounded-xl ${
                isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-slate-200'
              }`}
            >
              <option value="featured">Sort: Featured</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            <div className="flex items-center border border-current/15 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'opacity-60'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'opacity-60'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3">Categories</h3>
              <div className="space-y-1.5">
                {['All', ...categories.map((c) => c.name)].map((catName) => (
                  <button
                    key={catName}
                    onClick={() => {
                      setCatalogFilters((prev) => ({ ...prev, category: catName }));
                      setPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center justify-between ${
                      catalogFilters.category === catName
                        ? 'font-semibold text-white'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                    style={
                      catalogFilters.category === catName
                        ? { backgroundColor: theme.accentColor }
                        : undefined
                    }
                  >
                    <span>{catName}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3">Brand</h3>
              <select
                value={catalogFilters.brand}
                onChange={(e) => setCatalogFilters((prev) => ({ ...prev, brand: e.target.value }))}
                className={`w-full px-3 py-2 text-sm border rounded-xl ${
                  isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-slate-200'
                }`}
              >
                <option value="All">All Brands</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-60 mb-2">
                <span>Max Price</span>
                <span>{formatINR(catalogFilters.maxPrice)}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={50000}
                step={1000}
                value={catalogFilters.maxPrice}
                onChange={(e) => setCatalogFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[11px] opacity-50 mt-1">
                <span>₹2,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            <button
              onClick={() =>
                setCatalogFilters({ category: 'All', brand: 'All', maxPrice: 50000, search: '', sort: 'featured' })
              }
              className="w-full py-2.5 text-xs font-semibold border border-current/20 rounded-xl hover:bg-current/5"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <p className="text-xs opacity-60 mb-4">
              Showing {visibleProducts.length} of {filtered.length} products
            </p>

            {visibleProducts.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-current/20 rounded-2xl">
                <Package className="w-10 h-10 mx-auto opacity-40 mb-3" />
                <h3 className="font-semibold text-lg">No matching products</h3>
                <p className="text-sm opacity-65 mt-1">Try broadening your price ceiling or clearing search keywords.</p>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'flex flex-col gap-4'
                  }
                >
                  {visibleProducts.map((p) => (
                    <ProductCard key={p.id} product={p} listView={viewMode === 'list'} />
                  ))}
                </div>

                {visibleProducts.length < filtered.length && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      style={{ backgroundColor: theme.accentColor }}
                      className={`px-7 py-3 text-sm font-semibold text-white ${btnRadiusClass}`}
                    >
                      Load More Products ({filtered.length - visibleProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- Storefront Sub-View: Product Detail Page ---
  const renderProductDetail = () => {
    const product = products.find((p) => p.id === selectedProductId) || products[0];
    const [activeImg, setActiveImg] = useState(product.image);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [qty, setQty] = useState(1);

    useEffect(() => {
      setActiveImg(product.image);
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setQty(1);
    }, [product]);

    const related = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => setStoreSubView('catalog')}
          className="inline-flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100 mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div
              style={{ borderRadius: theme.borderRadius }}
              className="aspect-square overflow-hidden bg-slate-100 dark:bg-neutral-800"
            >
              <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(img)}
                  style={{ borderRadius: theme.borderRadius }}
                  className={`aspect-square overflow-hidden border-2 transition ${
                    activeImg === img ? 'border-blue-600' : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-60">
                <span>{product.brand}</span>
                <span>•</span>
                <span>SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold mt-2">{product.name}</h1>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating}</span>
                  <span className="opacity-60 font-normal">({product.reviewCount} reviews)</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-medium">
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="py-4 border-y border-current/10">
              {product.salePrice ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">{formatINR(product.salePrice)}</span>
                  <span className="text-lg line-through opacity-50">{formatINR(product.price)}</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-emerald-600 text-white rounded-md">
                    Save {formatINR(product.price - product.salePrice)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold">{formatINR(product.price)}</span>
              )}
              <p className="text-xs opacity-60 mt-1">Inclusive of 18% GST • Free Express Delivery</p>
            </div>

            <p className="text-sm leading-relaxed opacity-80">{product.description}</p>

            {/* Variants */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-2">
                  Finish: {selectedColor}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 text-xs font-medium border transition ${btnRadiusClass} ${
                        selectedColor === c
                          ? 'border-blue-600 bg-blue-600/10 font-bold'
                          : 'border-current/20 opacity-75'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-2">
                  Configuration / Size: {selectedSize}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs font-medium border transition ${btnRadiusClass} ${
                        selectedSize === s
                          ? 'border-blue-600 bg-blue-600/10 font-bold'
                          : 'border-current/20 opacity-75'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className={`flex items-center border border-current/20 ${btnRadiusClass}`}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-current/5"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-semibold text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock || 10, q + 1))}
                  className="p-3 hover:bg-current/5"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                disabled={product.stock === 0}
                onClick={() => addToCart(product.id, qty, selectedColor, selectedSize, true)}
                style={{ backgroundColor: theme.accentColor }}
                className={`flex-1 py-3.5 px-6 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-50 ${btnRadiusClass}`}
              >
                Add to Shopping Bag
              </button>

              <button
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product.id, qty, selectedColor, selectedSize, false);
                  setStoreSubView('checkout');
                }}
                className={`py-3.5 px-6 text-sm font-semibold border border-current/25 hover:bg-current/5 transition disabled:opacity-50 ${btnRadiusClass}`}
              >
                Buy Now
              </button>
            </div>

            {/* Specifications */}
            <div className="pt-6 border-t border-current/10">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">Technical Specifications</h3>
              <dl className="divide-y divide-current/10 text-sm">
                {product.specs.map((sp, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <dt className="opacity-60">{sp.label}</dt>
                    <dd className="font-medium text-right">{sp.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-current/10">
            <h2 className="text-2xl font-bold mb-6">Complete Your Setup</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- Storefront Sub-View: Simulated Checkout ---
  const renderCheckout = () => {
    const enabledGateways = config.gateways.filter((g) => g.enabled);
    const [selectedGateway, setSelectedGateway] = useState(enabledGateways[0]?.name || 'Razorpay');
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [customerDetails, setCustomerDetails] = useState({
      fullName: 'Rohan Deshmukh',
      email: 'rohan.deshmukh@example.in',
      phone: '+91 98201 44510',
      address: '402, Skylark Towers, Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    });

    const cartItems = cart
      .map((item) => {
        const prod = products.find((p) => p.id === item.productId);
        return prod ? { ...item, product: prod } : null;
      })
      .filter(Boolean);

    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
      0
    );
    const discountAmt = appliedCoupon
      ? appliedCoupon.type === 'Percentage'
        ? Math.round((subtotal * appliedCoupon.value) / 100)
        : appliedCoupon.value
      : 0;
    const shippingCost =
      shippingMethod === 'express'
        ? 299
        : subtotal >= config.storeSettings.freeShippingThreshold
        ? 0
        : 149;
    const total = Math.max(0, subtotal - discountAmt + shippingCost);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (cartItems.length === 0) return;
      placeSimulatedOrder({
        customerDetails,
        shippingMethod,
        paymentGateway: selectedGateway,
      });
    };

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-700 dark:text-amber-300">
          <Lock className="w-4 h-4 shrink-0" />
          <span>
            <strong>Demo Mode Checkout:</strong> No real payment is processed or authorized. Submitting places a simulated order directly into the Admin Dashboard.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            {/* Shipping Form */}
            <div style={{ borderRadius: theme.borderRadius }} className={`p-6 ${cardStyleClass}`}>
              <h2 className="text-lg font-bold mb-4">1. Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium opacity-70 mb-1">Full Name</label>
                  <input
                    required
                    value={customerDetails.fullName}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-current/20 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium opacity-70 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-current/20 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium opacity-70 mb-1">Mobile Number</label>
                  <input
                    required
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-current/20 bg-transparent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium opacity-70 mb-1">Street Address</label>
                  <input
                    required
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-current/20 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium opacity-70 mb-1">City</label>
                  <input
                    required
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-current/20 bg-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium opacity-70 mb-1">State</label>
                    <input
                      required
                      value={customerDetails.state}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-current/20 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium opacity-70 mb-1">PIN Code</label>
                    <input
                      required
                      value={customerDetails.pincode}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-current/20 bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div style={{ borderRadius: theme.borderRadius }} className={`p-6 ${cardStyleClass}`}>
              <h2 className="text-lg font-bold mb-4">2. Delivery Speed</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-xl border text-left transition ${
                    shippingMethod === 'standard' ? 'border-blue-600 bg-blue-600/10' : 'border-current/20'
                  }`}
                >
                  <div className="flex justify-between font-bold">
                    <span>Standard Courier</span>
                    <span>{subtotal >= config.storeSettings.freeShippingThreshold ? 'FREE' : formatINR(149)}</span>
                  </div>
                  <p className="text-xs opacity-65 mt-1">3–5 Business Days via BlueDart</p>
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-xl border text-left transition ${
                    shippingMethod === 'express' ? 'border-blue-600 bg-blue-600/10' : 'border-current/20'
                  }`}
                >
                  <div className="flex justify-between font-bold">
                    <span>Priority Air Express</span>
                    <span>{formatINR(299)}</span>
                  </div>
                  <p className="text-xs opacity-65 mt-1">1–2 Business Days insured delivery</p>
                </button>
              </div>
            </div>

            {/* Payment Gateway Selection */}
            <div style={{ borderRadius: theme.borderRadius }} className={`p-6 ${cardStyleClass}`}>
              <h2 className="text-lg font-bold mb-1">3. Simulated Payment Method</h2>
              <p className="text-xs opacity-65 mb-4">
                Active gateways are controlled live from Admin → Integrations → Payment Gateways.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.gateways.map((gw) => (
                  <button
                    key={gw.id}
                    type="button"
                    disabled={!gw.enabled}
                    onClick={() => setSelectedGateway(gw.name)}
                    className={`p-4 rounded-xl border text-left transition ${
                      !gw.enabled
                        ? 'opacity-40 cursor-not-allowed border-current/15'
                        : selectedGateway === gw.name
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-current/20 hover:border-current/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{gw.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-current/10">
                        {gw.enabled ? `${gw.mode} Mode` : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-xs opacity-65 mt-1">{gw.tagline}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div style={{ borderRadius: theme.borderRadius }} className={`p-6 sticky top-24 ${cardStyleClass}`}>
              <h2 className="text-lg font-bold mb-4">Order Summary ({cartItems.length})</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.product.name}</p>
                      <p className="text-xs opacity-60">Qty {item.quantity} • {item.color}</p>
                    </div>
                    <span className="font-semibold">
                      {formatINR((item.product.salePrice || item.product.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-current/10 space-y-2 text-sm">
                <div className="flex justify-between opacity-75">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discountAmt > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatINR(discountAmt)}</span>
                  </div>
                )}
                <div className="flex justify-between opacity-75">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatINR(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-current/10">
                  <span>Total Payable (incl. GST)</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0}
                style={{ backgroundColor: theme.accentColor }}
                className={`w-full mt-6 py-4 text-sm font-bold text-white shadow-lg hover:brightness-110 transition ${btnRadiusClass}`}
              >
                Simulate Payment via {selectedGateway} • {formatINR(total)}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  // --- Storefront Sub-View: Order Confirmation ---
  const renderConfirmation = () => {
    const order = lastPlacedOrder || orders[0];
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Simulated Order Confirmed
        </span>
        <h1 className="text-3xl font-bold mt-2">Thank you, {order?.customerName}!</h1>
        <p className="text-sm opacity-70 mt-2">
          Your simulated order <strong>{order?.orderNumber}</strong> has been created and synced with the Admin Dashboard &amp; Inventory ledger.
        </p>

        <div style={{ borderRadius: theme.borderRadius }} className={`mt-8 p-6 text-left ${cardStyleClass}`}>
          <div className="grid grid-cols-2 gap-4 text-sm pb-4 border-b border-current/10">
            <div>
              <span className="text-xs opacity-60 block">Order Reference</span>
              <span className="font-bold">{order?.orderNumber}</span>
            </div>
            <div>
              <span className="text-xs opacity-60 block">Payment Gateway</span>
              <span className="font-bold">{order?.paymentMethod} (Simulated)</span>
            </div>
            <div>
              <span className="text-xs opacity-60 block">Delivery Destination</span>
              <span className="font-medium text-xs">{order?.shippingAddress}</span>
            </div>
            <div>
              <span className="text-xs opacity-60 block">Total Paid</span>
              <span className="font-bold text-base">{formatINR(order?.total || 0)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setStoreSubView('home')}
              style={{ backgroundColor: theme.accentColor }}
              className={`flex-1 py-3 text-sm font-semibold text-white ${btnRadiusClass}`}
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                setAdminSubPage('orders');
                setRoute('/admin');
              }}
              className={`flex-1 py-3 text-sm font-semibold border border-current/25 hover:bg-current/5 ${btnRadiusClass}`}
            >
              Inspect Order in Admin →
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        backgroundColor: isDark ? '#0a0a0a' : theme.secondaryColor,
        color: isDark ? '#f5f5f5' : '#0f172a',
      }}
      className="min-h-screen flex flex-col transition-colors duration-200"
    >
      {/* Top Demo Switcher Strip (hidden when embedded inside Theme/Banner live preview) */}
      {!embeddedPreview && (
        <div className="bg-slate-950 text-slate-300 text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[10px]">
              LIVE STOREFRONT
            </span>
            <span className="hidden md:inline opacity-80">
              Theme: <strong>{theme.preset}</strong> • {products.length} Live SKUs
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOrderLookupOpen(true)}
              className="hover:text-white flex items-center gap-1 text-slate-300"
            >
              <Package className="w-3.5 h-3.5" /> Track Orders ({orders.length})
            </button>
            <button
              onClick={() => {
                setAdminSubPage('theme-customizer');
                setRoute('/admin');
              }}
              className="hidden sm:flex items-center gap-1 hover:text-white text-slate-300"
            >
              <Palette className="w-3.5 h-3.5" /> Customize Theme
            </button>
            <button
              onClick={() => {
                setAdminSubPage('dashboard');
                setRoute('/admin');
              }}
              className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 flex items-center gap-1.5 shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Admin Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Announcement Bar */}
      <div
        style={{ backgroundColor: theme.primaryColor }}
        className="text-white text-xs text-center py-2.5 px-4 font-medium"
      >
        {config.announcementBar}
      </div>

      {/* Storefront Header */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md ${
          isDark ? 'bg-neutral-950/90 border-neutral-800' : 'bg-white/90 border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-current/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setStoreSubView('home')}
              className="flex items-center gap-2.5 font-bold text-xl tracking-tight"
            >
              <span
                style={{ backgroundColor: theme.accentColor }}
                className="w-8 h-8 rounded-lg text-white flex items-center justify-center text-sm font-black"
              >
                Æ
              </span>
              <span>{config.storeSettings.storeName.split(' ')[0].toUpperCase()}</span>
            </button>
          </div>

          {/* Desktop Navigation (Synced with Admin Navigation Menus) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {(config.navigationItems || [])
              .filter((n) => n.visible)
              .map((nav) => (
                <button
                  key={nav.id}
                  onClick={() =>
                    nav.action === 'home' ? setStoreSubView('home') : navigateCatalog(nav.category)
                  }
                  className="hover:opacity-70 transition"
                >
                  {nav.label}
                </button>
              ))}
          </nav>

          {/* Search, Wishlist, Orders & Cart */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
              <Search className="w-4 h-4 absolute left-3 opacity-50" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search 40+ items..."
                className={`pl-9 pr-3 py-1.5 text-sm rounded-full border w-44 focus:w-56 transition-all ${
                  isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-slate-100 border-transparent focus:bg-white focus:border-slate-300'
                }`}
              />
            </form>

            {!embeddedPreview && (
              <button
                onClick={() => setWishlistDrawerOpen(true)}
                className="relative p-2.5 rounded-full hover:bg-current/5 transition"
                title="Saved Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-current/5 transition"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  style={{ backgroundColor: theme.accentColor }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Category Strip */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-4 border-t border-current/10 space-y-2">
            <button onClick={() => { setStoreSubView('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">
              Home
            </button>
            <button onClick={() => navigateCatalog('All')} className="block w-full text-left py-2 font-medium">
              All Products
            </button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => navigateCatalog(c.name)} className="block w-full text-left py-1.5 text-sm opacity-80">
                {c.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {storeSubView === 'home' && renderHomepage()}
        {storeSubView === 'catalog' && renderCatalog()}
        {storeSubView === 'product' && renderProductDetail()}
        {storeSubView === 'checkout' && renderCheckout()}
        {storeSubView === 'confirmation' && renderConfirmation()}
      </main>

      {/* Footer */}
      <footer
        style={{ backgroundColor: isDark ? '#050505' : theme.primaryColor }}
        className="text-slate-300 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {theme.footerStyle === 'columns' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10 text-sm">
              <div>
                <div className="font-bold text-white text-lg tracking-tight mb-3">AETHER GOODS</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Architectural hardware, studio audio, and minimalist everyday objects designed for longevity.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Collections</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  {categories.slice(0, 4).map((c) => (
                    <li key={c.id}>
                      <button onClick={() => navigateCatalog(c.name)} className="hover:text-white">
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Client Care</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li>
                    <button onClick={() => setOrderLookupOpen(true)} className="hover:text-white">
                      Track Your Order
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveInfoModal('shipping')} className="hover:text-white">
                      Pan-India Insured Shipping
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveInfoModal('warranty')} className="hover:text-white">
                      2-Year Hardware Warranty
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveInfoModal('returns')} className="hover:text-white">
                      30-Day Hassle-Free Returns
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Flagship Studio</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {config.storeSettings.address}
                  <br />
                  {config.storeSettings.supportEmail}
                  <br />
                  {config.storeSettings.supportPhone}
                </p>
              </div>
            </div>
          ) : null}

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>© 2026 {config.storeSettings.storeName}. Frontend Interactive Demo.</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setRoute('/admin')} className="hover:text-white underline">
                Merchant Admin Portal
              </button>
              <span>•</span>
              <span>Razorpay</span>
              <span>Stripe</span>
              <span>Cashfree</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-Over Shopping Cart Drawer */}
      {cartOpen && !embeddedPreview && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setStoreSubView('checkout');
          }}
        />
      )}

      {/* Quick View Product Modal */}
      {!embeddedPreview && quickViewProductId && (
        <QuickViewModal
          productId={quickViewProductId}
          onClose={() => setQuickViewProductId(null)}
          onFullDetails={(id) => {
            setQuickViewProductId(null);
            openProductDetail(id);
          }}
        />
      )}

      {/* Wishlist Modal */}
      {!embeddedPreview && (
        <Modal
          open={wishlistDrawerOpen}
          onClose={() => setWishlistDrawerOpen(false)}
          title={`Saved Wishlist (${wishlist.length})`}
          subtitle="Persisted locally in your browser."
          maxWidth="max-w-lg"
        >
          {wishlist.length === 0 ? (
            <p className="text-sm text-slate-500 py-8 text-center">No saved items yet. Click the heart icon on any product.</p>
          ) : (
            <div className="space-y-3">
              {wishlist.map((id) => {
                const p = products.find((item) => item.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{p.name}</p>
                        <p className="text-xs font-bold text-blue-600">{formatINR(p.salePrice || p.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          addToCart(p.id, 1, p.colors[0], p.sizes[0], true);
                          setWishlistDrawerOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                      >
                        Move to Bag
                      </button>
                      <button onClick={() => toggleWishlist(p.id)} className="p-1.5 text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Modal>
      )}

      {/* Live Order Tracking & History Modal */}
      {!embeddedPreview && (
        <Modal
          open={orderLookupOpen}
          onClose={() => setOrderLookupOpen(false)}
          title="Order History & Live Tracker"
          subtitle="Inspect recent simulated storefront orders and fulfillment statuses."
        >
          <div className="space-y-4 text-sm">
            <input
              value={trackOrderInput}
              onChange={(e) => setTrackOrderInput(e.target.value)}
              placeholder="Filter by Order # (e.g. ORD-2026) or Customer Name..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
            />
            <div className="space-y-2.5 max-h-80 overflow-y-auto">
              {orders
                .filter(
                  (o) =>
                    !trackOrderInput ||
                    o.orderNumber.toLowerCase().includes(trackOrderInput.toLowerCase()) ||
                    o.customerName.toLowerCase().includes(trackOrderInput.toLowerCase())
                )
                .slice(0, 10)
                .map((o) => (
                  <div key={o.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{o.orderNumber}</span>
                        <span className="text-xs text-slate-400">• {o.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {o.customerName} • {o.items.length} item(s) • {formatINR(o.total)}
                      </p>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Store Policy Info Modal */}
      {!embeddedPreview && (
        <Modal
          open={Boolean(activeInfoModal)}
          onClose={() => setActiveInfoModal(null)}
          title={
            activeInfoModal === 'shipping'
              ? 'Pan-India Insured Shipping'
              : activeInfoModal === 'warranty'
              ? '2-Year Hardware Warranty'
              : '30-Day Hassle-Free Returns'
          }
          maxWidth="max-w-md"
        >
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {activeInfoModal === 'shipping' &&
              `All orders above ${formatINR(config.storeSettings.freeShippingThreshold)} qualify for complimentary insured express air delivery across 19,000+ Indian PIN codes via BlueDart and Delhivery.`}
            {activeInfoModal === 'warranty' &&
              'Every Aether Goods product includes a 24-month manufacturer warranty covering hardware defects, battery endurance, and acoustic drivers with doorstep pickup.'}
            {activeInfoModal === 'returns' &&
              'Not completely satisfied? Initiate an instant return within 30 days of delivery for a full refund to your original UPI, Card, or NetBanking method.'}
          </p>
        </Modal>
      )}
    </div>
  );
};

const QuickViewModal = ({ productId, onClose, onFullDetails }) => {
  const { products, addToCart } = useStore();
  const product = products.find((p) => p.id === productId);
  const [color, setColor] = useState(product?.colors[0] || 'Obsidian Black');
  const [size, setSize] = useState(product?.sizes[0] || 'Standard');

  if (!product) return null;

  return (
    <Modal open={true} onClose={onClose} title={product.name} subtitle={`${product.brand} • SKU ${product.sku}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-xl" />
        <div className="space-y-4">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-bold">{formatINR(product.salePrice || product.price)}</span>
            {product.salePrice && (
              <span className="text-sm line-through opacity-50">{formatINR(product.price)}</span>
            )}
          </div>
          <p className="text-xs opacity-75 leading-relaxed">{product.description}</p>
          <div>
            <span className="text-xs font-bold block mb-1.5">Finish</span>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1.5 rounded-lg border text-xs ${
                    color === c ? 'border-blue-600 bg-blue-600/10 font-bold' : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold block mb-1.5">Variant</span>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 rounded-lg border text-xs ${
                    size === s ? 'border-blue-600 bg-blue-600/10 font-bold' : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2 space-y-2">
            <button
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product.id, 1, color, size, true);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 disabled:opacity-50"
            >
              Add to Shopping Bag
            </button>
            <button
              onClick={() => onFullDetails(product.id)}
              className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
            >
              View Full Specifications &amp; Reviews →
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const CartDrawer = ({ onClose, onCheckout }) => {
  const {
    cart,
    products,
    updateCartQty,
    removeCartItem,
    appliedCoupon,
    setAppliedCoupon,
    discounts,
    addToast,
  } = useStore();
  const [couponInput, setCouponInput] = useState('');

  const items = cart
    .map((c, idx) => {
      const prod = products.find((p) => p.id === c.productId);
      return prod ? { ...c, index: idx, product: prod } : null;
    })
    .filter(Boolean);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  const discountAmt = appliedCoupon
    ? appliedCoupon.type === 'Percentage'
      ? Math.round((subtotal * appliedCoupon.value) / 100)
      : appliedCoupon.value
    : 0;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const found = discounts.find(
      (d) => d.code.toUpperCase() === couponInput.trim().toUpperCase() && d.status === 'Active'
    );
    if (!found) {
      addToast('Invalid Coupon', 'Try WELCOME10 or AETHER2000', 'error');
      return;
    }
    if (subtotal < found.minOrder) {
      addToast('Minimum Order Not Met', `Add items worth ${formatINR(found.minOrder)} to use ${found.code}`);
      return;
    }
    setAppliedCoupon(found);
    setCouponInput('');
    addToast('Coupon Applied', `${found.code} discount applied to your bag.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-full flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Shopping Bag ({items.length})
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="font-semibold">Your bag is empty</p>
              <p className="text-xs text-slate-500 mt-1">Explore our catalog to add precision gear.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.index}
                className="flex gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <img src={item.product.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.color} • {item.size}
                  </p>
                  <p className="font-bold text-sm mt-1.5">
                    {formatINR((item.product.salePrice || item.product.price) * item.quantity)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                      <button onClick={() => updateCartQty(item.index, -1)} className="px-2 py-1">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.index, 1)} className="px-2 py-1">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeCartItem(item.index)}
                      className="text-rose-500 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-4">
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Promo code (e.g. WELCOME10)"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs bg-emerald-500/10 text-emerald-600 px-3 py-2 rounded-lg">
                <span>
                  Applied: <strong>{appliedCoupon.code}</strong>
                </span>
                <button onClick={() => setAppliedCoupon(null)} className="underline">
                  Remove
                </button>
              </div>
            )}

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-{formatINR(discountAmt)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Estimated Total</span>
                <span>{formatINR(Math.max(0, subtotal - discountAmt))}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 6. ADMINISTRATION DASHBOARD (/admin)
// ============================================================================

const SIDEBAR_GROUPS = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Commerce',
    items: [
      { id: 'products', label: 'Products', icon: Package },
      { id: 'categories', label: 'Categories', icon: Layers },
      { id: 'inventory', label: 'Inventory', icon: Archive },
      { id: 'orders', label: 'Orders', icon: ShoppingCart },
      { id: 'purchases', label: 'Purchases', icon: Truck },
      { id: 'customers', label: 'Customers', icon: Users },
      { id: 'discounts', label: 'Discounts', icon: Percent },
    ],
  },
  {
    title: 'Content & Design',
    items: [
      { id: 'website-editor', label: 'Website Editor', icon: Monitor },
      { id: 'hero-banners', label: 'Hero Banners', icon: Image },
      { id: 'theme-customizer', label: 'Theme Customization', icon: Palette },
      { id: 'seo-manager', label: 'SEO Manager', icon: Globe },
      { id: 'pages', label: 'Pages', icon: FileText },
      { id: 'navigation', label: 'Navigation Menus', icon: Navigation },
    ],
  },
  {
    title: 'Finance',
    items: [
      { id: 'payments', label: 'Payments', icon: CreditCard },
      { id: 'transactions', label: 'Transactions', icon: Receipt },
      { id: 'refunds', label: 'Refunds', icon: RotateCcw },
      { id: 'sales-reports', label: 'Sales Reports', icon: TrendingUp },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { id: 'payment-gateways', label: 'Payment Gateways', icon: Shield },
      { id: 'zoho-books', label: 'Zoho Books', icon: Building2 },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'store-settings', label: 'Store Settings', icon: Settings },
      { id: 'staff-roles', label: 'Staff & Roles', icon: Users },
      { id: 'activity-logs', label: 'Activity Logs', icon: Activity },
    ],
  },
];

const AdminDashboardExperience = () => {
  const {
    setRoute,
    adminSubPage,
    setAdminSubPage,
    adminDarkMode,
    setAdminDarkMode,
    resetDemoData,
    orders,
    products,
  } = useStore();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;

  const currentNavLabel = useMemo(() => {
    for (const g of SIDEBAR_GROUPS) {
      const found = g.items.find((i) => i.id === adminSubPage);
      if (found) return { group: g.title, label: found.label };
    }
    return { group: 'Overview', label: 'Dashboard' };
  }, [adminSubPage]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
        <button
          onClick={() => setRoute('/')}
          className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-black shrink-0">
            Æ
          </div>
          {!sidebarCollapsed && <span className="tracking-tight">AETHER OS</span>}
        </button>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {SIDEBAR_GROUPS.map((group) => (
          <div key={group.title}>
            {!sidebarCollapsed && (
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {group.title}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = adminSubPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAdminSubPage(item.id);
                      setMobileNavOpen(false);
                    }}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition ${
                      active
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-4 h-4 shrink-0" />
                      {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && item.id === 'inventory' && lowStockCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-500">
                        {lowStockCount}
                      </span>
                    )}
                    {!sidebarCollapsed && item.id === 'orders' && pendingOrdersCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/20 text-blue-400">
                        {pendingOrdersCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!sidebarCollapsed && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={resetDemoData}
            className="w-full py-2 px-3 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Demo Data
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={adminDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:block shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="sticky top-0 h-screen">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex bg-black/50">
            <div className="w-64 bg-white dark:bg-slate-900 h-full">
              <SidebarContent />
            </div>
            <div className="flex-1" onClick={() => setMobileNavOpen(false)} />
          </div>
        )}

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 hidden sm:inline">{currentNavLabel.group}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:inline" />
                <span className="font-semibold">{currentNavLabel.label}</span>
              </div>
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                Demo Mode
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="hidden md:flex items-center relative">
                <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && globalSearch.trim()) {
                      setAdminSubPage('products');
                    }
                  }}
                  placeholder="Jump to SKU, order..."
                  className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 w-48"
                />
              </div>

              <button
                onClick={() => setRoute('/store')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Preview Storefront</span>
              </button>

              <button
                onClick={() => setAdminDarkMode(!adminDarkMode)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Toggle Dark Mode"
              >
                {adminDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                AD
              </div>
            </div>
          </header>

          {/* Dynamic Admin Module Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            <AdminModuleRouter />
          </main>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. ADMIN MODULES IMPLEMENTATION
// ============================================================================

const AdminModuleRouter = () => {
  const { adminSubPage } = useStore();

  switch (adminSubPage) {
    case 'dashboard':
      return <AdminOverviewModule />;
    case 'analytics':
      return <AdminAnalyticsModule />;
    case 'products':
      return <AdminProductsModule />;
    case 'categories':
      return <AdminCategoriesModule />;
    case 'inventory':
      return <AdminInventoryModule />;
    case 'orders':
      return <AdminOrdersModule />;
    case 'purchases':
      return <AdminPurchasesModule />;
    case 'customers':
      return <AdminCustomersModule />;
    case 'discounts':
      return <AdminDiscountsModule />;
    case 'website-editor':
    case 'hero-banners':
      return <AdminWebsiteBannerEditorModule initialTab={adminSubPage === 'hero-banners' ? 'banners' : 'sections'} />;
    case 'theme-customizer':
      return <AdminThemeCustomizerModule />;
    case 'seo-manager':
      return <AdminSeoManagerModule />;
    case 'pages':
      return <AdminPagesModule />;
    case 'navigation':
      return <AdminNavigationModule />;
    case 'payments':
    case 'payment-gateways':
      return <AdminPaymentGatewaysModule />;
    case 'transactions':
      return <AdminTransactionsModule />;
    case 'refunds':
      return <AdminRefundsModule />;
    case 'sales-reports':
      return <AdminSalesReportsModule />;
    case 'zoho-books':
      return <AdminZohoBooksModule />;
    case 'store-settings':
      return <AdminStoreSettingsModule />;
    case 'staff-roles':
      return <AdminStaffRolesModule />;
    case 'activity-logs':
      return <AdminActivityLogsModule />;
    default:
      return <AdminOverviewModule />;
  }
};

// --- MODULE 1: Dashboard Overview ---
const AdminOverviewModule = () => {
  const { orders, products, customers, transactions, setAdminSubPage } = useStore();
  const [dateRange, setDateRange] = useState('30d');

  const multiplier = dateRange === 'today' ? 0.04 : dateRange === '7d' ? 0.26 : dateRange === '30d' ? 1 : 2.8;

  const baseRevenue = orders.reduce((s, o) => s + o.total, 0);
  const displayRevenue = Math.round(baseRevenue * multiplier);
  const displayOrders = Math.max(1, Math.round(orders.length * multiplier));
  const displayAov = Math.round(displayRevenue / displayOrders);

  const chartData = useMemo(() => {
    const sliceCount = dateRange === 'today' ? 4 : dateRange === '7d' ? 6 : 12;
    return MONTHLY_SALES_ANALYTICS.slice(-sliceCount).map((m) => ({
      ...m,
      revenue: Math.round(m.revenue * (dateRange === 'today' ? 0.05 : 1)),
    }));
  }, [dateRange]);

  const categoryBreakdown = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + p.salesCount * (p.salePrice || p.price);
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name: name.split(' ')[0], value }))
      .slice(0, 6);
  }, [products]);

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
  const topProducts = [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);
  const lowStock = products.filter((p) => p.stock <= 6).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Overview</h1>
          <p className="text-sm text-slate-500">Real-time store performance, inventory alerts, and settlement activity.</p>
        </div>

        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {[
            { id: 'today', label: 'Today' },
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: 'Last 30 Days' },
            { id: 'custom', label: 'FY 2026' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setDateRange(r.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                dateRange === r.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Gross Revenue', value: formatINR(displayRevenue), delta: '+14.2%', up: true, icon: TrendingUp },
          { label: 'Total Orders', value: displayOrders.toLocaleString('en-IN'), delta: '+8.7%', up: true, icon: ShoppingCart },
          { label: 'Average Order Value', value: formatINR(displayAov), delta: '+4.1%', up: true, icon: Receipt },
          { label: 'Active Customers', value: customers.length.toLocaleString('en-IN'), delta: '+12.4%', up: true, icon: Users },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs"
            >
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-medium">{kpi.label}</span>
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{kpi.value}</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {kpi.delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base">Revenue Trend (INR)</h3>
              <p className="text-xs text-slate-500">Gross merchandise value across selected window</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => formatINR(val)} />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-base mb-1">Sales by Category</h3>
          <p className="text-xs text-slate-500 mb-4">Share of catalog revenue</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {categoryBreakdown.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatINR(v)} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Operational Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base">Recent Orders</h3>
            <button onClick={() => setAdminSubPage('orders')} className="text-xs font-semibold text-blue-600 hover:underline">
              View All Orders →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="pb-2.5">Order</th>
                  <th className="pb-2.5">Customer</th>
                  <th className="pb-2.5">Gateway</th>
                  <th className="pb-2.5">Total</th>
                  <th className="pb-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 font-semibold">{o.orderNumber}</td>
                    <td className="py-3">{o.customerName}</td>
                    <td className="py-3 text-xs text-slate-500">{o.paymentMethod}</td>
                    <td className="py-3 font-medium">{formatINR(o.total)}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Warnings */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Low Stock Alerts
            </h3>
            <button onClick={() => setAdminSubPage('inventory')} className="text-xs font-semibold text-blue-600 hover:underline">
              Restock
            </button>
          </div>
          <div className="space-y-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{p.name}</p>
                  <p className="text-[11px] text-slate-500">{p.sku}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold shrink-0 ${p.stock === 0 ? 'bg-rose-500/15 text-rose-500' : 'bg-amber-500/15 text-amber-600'}`}>
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 2: Analytics ---
const AdminAnalyticsModule = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Commerce Analytics</h1>
        <p className="text-sm text-slate-500">12-month order volume, conversion velocity, and average order value trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold mb-4">Monthly Order Volume</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_SALES_ANALYTICS}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold mb-4">Average Order Value Progression (INR)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_SALES_ANALYTICS}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[12000, 14500]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => formatINR(v)} />
                <Line type="monotone" dataKey="aov" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 3: Product Management (CRUD + Storefront Sync) ---
const AdminProductsModule = () => {
  const { products, setProducts, categories, addToast } = useStore();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const emptyForm = {
    name: '',
    sku: `ATH-${1100 + products.length}`,
    category: categories[0]?.name || 'Audio & Acoustics',
    brand: 'Aether Studio',
    price: 9999,
    salePrice: '',
    stock: 25,
    status: 'Active',
    badge: 'New Arrival',
    image: PRODUCT_IMAGES[0],
    description: 'Precision engineered product designed for daily performance.',
    metaTitle: '',
    metaDescription: '',
  };

  const [form, setForm] = useState(emptyForm);

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({ ...emptyForm, sku: `ATH-${1100 + products.length}` });
    setModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setForm({
      ...prod,
      salePrice: prod.salePrice || '',
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const numericPrice = Number(form.price);
    const numericSale = form.salePrice ? Number(form.salePrice) : null;
    const numericStock = Number(form.stock);

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...form,
                price: numericPrice,
                salePrice: numericSale,
                stock: numericStock,
                status: numericStock === 0 ? 'Out of Stock' : form.status,
              }
            : p
        )
      );
      addToast('Product Updated', `${form.name} changes are live on the storefront.`);
    } else {
      const newProd = {
        ...form,
        id: `prod-${Date.now()}`,
        slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        price: numericPrice,
        salePrice: numericSale,
        stock: numericStock,
        rating: 4.8,
        reviewCount: 1,
        salesCount: 0,
        gallery: [form.image, PRODUCT_IMAGES[1], PRODUCT_IMAGES[2]],
        colors: ['Obsidian Black', 'Raw Titanium'],
        sizes: ['Standard'],
        specs: [{ label: 'Warranty', value: '2 Years Manufacturer Warranty' }],
        createdAt: '2026-11-20',
      };
      setProducts((prev) => [newProd, ...prev]);
      addToast('Product Created', `${form.name} added to catalog and storefront.`);
    }
    setModalOpen(false);
  };

  const handleDuplicate = (prod) => {
    const dup = {
      ...prod,
      id: `prod-${Date.now()}`,
      name: `${prod.name} (Copy)`,
      sku: `${prod.sku}-COPY`,
      salesCount: 0,
    };
    setProducts((prev) => [dup, ...prev]);
    addToast('Product Duplicated', `Created copy of ${prod.name}`);
  };

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteConfirmId));
    setDeleteConfirmId(null);
    addToast('Product Deleted', 'Removed from catalog and storefront.');
  };

  const filtered = products.filter(
    (p) =>
      (catFilter === 'All' || p.category === catFilter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products Catalog ({products.length})</h1>
          <p className="text-sm text-slate-500">Add, edit, or duplicate products. Updates reflect immediately on /store.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Product Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3.5">Product</th>
                <th className="px-4 py-3.5">SKU</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Price</th>
                <th className="px-4 py-3.5">Stock</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <p className="font-semibold line-clamp-1">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs">{p.sku}</td>
                  <td className="px-4 py-3.5 text-xs">{p.category}</td>
                  <td className="px-4 py-3.5">
                    {p.salePrice ? (
                      <div>
                        <span className="font-bold">{formatINR(p.salePrice)}</span>
                        <span className="text-xs line-through text-slate-400 ml-1.5">{formatINR(p.price)}</span>
                      </div>
                    ) : (
                      <span className="font-semibold">{formatINR(p.price)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-medium">{p.stock}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(p)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-500"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        subtitle="Changes automatically synchronize with the customer storefront."
      >
        <form onSubmit={handleSave} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Product Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">SKU</label>
              <input
                required
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Regular Price (INR)</label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Sale Price (Optional INR)</label>
              <input
                type="number"
                value={form.salePrice}
                onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                placeholder="Leave blank if no discount"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Stock Quantity</label>
              <input
                type="number"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1.5">Demo Asset Picker</label>
              <div className="grid grid-cols-6 gap-2">
                {PRODUCT_IMAGES.slice(0, 6).map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, image: img })}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      form.image === img ? 'border-blue-600' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold">
              Save Product
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal
        open={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        maxWidth="max-w-md"
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete this product? It will immediately be removed from the customer storefront.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm">
            Cancel
          </button>
          <button onClick={confirmDelete} className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold">
            Delete Product
          </button>
        </div>
      </Modal>
    </div>
  );
};

// --- MODULE 4: Categories ---
const AdminCategoriesModule = () => {
  const { categories, setCategories, addToast } = useStore();
  const [newName, setNewName] = useState('');

  const toggleFeatured = (id) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c)));
    addToast('Category Updated', 'Homepage featured categories updated.');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCategories((prev) => [
      ...prev,
      {
        id: `cat-${Date.now()}`,
        name: newName,
        slug: newName.toLowerCase().replace(/\s+/g, '-'),
        description: 'Curated storefront collection.',
        count: 0,
        image: PRODUCT_IMAGES[3],
        featured: true,
        metaTitle: `${newName} | Aether Goods`,
        metaDesc: `Explore ${newName} products.`,
      },
    ]);
    setNewName('');
    addToast('Category Created', `${newName} is now available.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Product Categories</h1>
          <p className="text-sm text-slate-500">Organize taxonomy and toggle homepage featured collections.</p>
        </div>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category name..."
            className="px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold">
            Add Category
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <img src={cat.image} alt="" className="h-36 w-full object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{cat.name}</h3>
                  <span className="text-xs text-slate-500">{cat.count} SKUs</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-medium">Featured on Home</span>
                <button
                  onClick={() => toggleFeatured(cat.id)}
                  className={`w-10 h-5 rounded-full transition p-0.5 ${cat.featured ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${cat.featured ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MODULE 5: Inventory Management ---
const AdminInventoryModule = () => {
  const { products, setProducts, addToast } = useStore();

  const adjustStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const next = Math.max(0, p.stock + delta);
        return { ...p, stock: next, status: next === 0 ? 'Out of Stock' : 'Active' };
      })
    );
    addToast('Inventory Adjusted', 'Stock ledger updated across storefront & admin.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inventory &amp; Stock Control</h1>
        <p className="text-sm text-slate-500">Monitor warehouse stock levels and perform instant stock adjustments.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3.5">SKU</th>
                <th className="px-4 py-3.5">Product</th>
                <th className="px-4 py-3.5">Stock Health</th>
                <th className="px-4 py-3.5">Available</th>
                <th className="px-4 py-3.5 text-right">Quick Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">
                    {p.stock === 0 ? (
                      <StatusBadge status="Out of Stock" />
                    ) : p.stock <= 6 ? (
                      <StatusBadge status="Warning" />
                    ) : (
                      <StatusBadge status="Active" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold">{p.stock} units</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => adjustStock(p.id, -1)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => adjustStock(p.id, 10)}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                      >
                        +10 Restock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 6: Orders Management ---
const AdminOrdersModule = () => {
  const { orders, setOrders, addToast } = useStore();
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const allStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];

  const updateOrderStatus = (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: nextStatus, paymentStatus: nextStatus === 'Refunded' ? 'Refunded' : o.paymentStatus }
          : o
      )
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: nextStatus }));
    }
    addToast('Order Status Updated', `Order marked as ${nextStatus}.`);
  };

  const filtered = orders.filter((o) => statusFilter === 'All' || o.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders ({orders.length})</h1>
          <p className="text-sm text-slate-500">Manage fulfillment pipelines and inspect simulated storefront checkouts.</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['All', ...allStatuses].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3.5">Order #</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Gateway</th>
                <th className="px-4 py-3.5">Total</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.slice(0, 35).map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3.5 font-bold">{o.orderNumber}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-500">{o.date}</td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium">{o.customerName}</p>
                    <p className="text-xs text-slate-500">{o.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs">{o.paymentMethod}</td>
                  <td className="px-4 py-3.5 font-semibold">{formatINR(o.total)}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Modal
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        title={`Order ${selectedOrder?.orderNumber || ''}`}
        subtitle={`Placed on ${selectedOrder?.date} via ${selectedOrder?.paymentMethod}`}
      >
        {selectedOrder && (
          <div className="space-y-5 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="text-xs text-slate-500 block">Update Fulfillment Status</span>
                <div className="mt-1"><StatusBadge status={selectedOrder.status} /></div>
              </div>
              <select
                value={selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
              >
                {allStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-1">Shipping Destination</h4>
              <p className="font-medium">{selectedOrder.customerName}</p>
              <p className="text-xs text-slate-500">{selectedOrder.shippingAddress}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Line Items</h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-slate-500">Qty: {item.quantity} • {item.variant}</p>
                      </div>
                    </div>
                    <span className="font-semibold">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-right pt-2">
              <p className="text-xs text-slate-500">Subtotal: {formatINR(selectedOrder.subtotal)}</p>
              <p className="text-xs text-slate-500">Discount: -{formatINR(selectedOrder.discount)}</p>
              <p className="text-base font-bold">Total: {formatINR(selectedOrder.total)}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// --- MODULE 7: Purchases ---
const AdminPurchasesModule = () => {
  const { purchases, setPurchases, addToast } = useStore();

  const markReceived = (id) => {
    setPurchases((prev) => prev.map((po) => (po.id === id ? { ...po, status: 'Received' } : po)));
    addToast('Purchase Order Received', 'Supplier shipment marked as received.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Supplier Purchase Orders ({purchases.length})</h1>
        <p className="text-sm text-slate-500">Track inbound vendor procurement, unit landing costs, and warehouse receipts.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3.5">PO Number</th>
                <th className="px-4 py-3.5">Supplier</th>
                <th className="px-4 py-3.5">Item</th>
                <th className="px-4 py-3.5">Qty</th>
                <th className="px-4 py-3.5">Total Cost</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {purchases.map((po) => (
                <tr key={po.id}>
                  <td className="px-4 py-3 font-bold">{po.poNumber}</td>
                  <td className="px-4 py-3 text-xs">{po.supplier}</td>
                  <td className="px-4 py-3">{po.productName}</td>
                  <td className="px-4 py-3">{po.quantity}</td>
                  <td className="px-4 py-3 font-semibold">{formatINR(po.totalCost)}</td>
                  <td className="px-4 py-3"><StatusBadge status={po.status} /></td>
                  <td className="px-4 py-3 text-right">
                    {po.status !== 'Received' && (
                      <button
                        onClick={() => markReceived(po.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                      >
                        Receive Stock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 8: Customers ---
const AdminCustomersModule = () => {
  const { customers } = useStore();
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState('All');

  const filtered = customers.filter(
    (c) =>
      (segment === 'All' || c.segment === segment) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customer Directory ({customers.length})</h1>
          <p className="text-sm text-slate-500">Customer lifetime value, Indian regional distribution, and retention segments.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'VIP', 'Repeat Buyer', 'New', 'At Risk'].map((seg) => (
            <button
              key={seg}
              onClick={() => setSegment(seg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                segment === seg ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search customers by name or city..."
        className="w-full max-w-md px-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Orders</th>
                <th className="px-4 py-3.5">Lifetime Spent</th>
                <th className="px-4 py-3.5">Segment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.slice(0, 30).map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.email} • {c.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-xs">{c.city}, {c.state}</td>
                  <td className="px-4 py-3 font-medium">{c.ordersCount}</td>
                  <td className="px-4 py-3 font-bold">{formatINR(c.totalSpent)}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.segment} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 9: Discounts ---
const AdminDiscountsModule = () => {
  const { discounts, setDiscounts, addToast } = useStore();
  const [code, setCode] = useState('');
  const [value, setValue] = useState(15);

  const createCoupon = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setDiscounts((prev) => [
      {
        id: `disc-${Date.now()}`,
        code: code.toUpperCase(),
        type: 'Percentage',
        value: Number(value),
        minOrder: 2500,
        usage: 0,
        limit: 500,
        status: 'Active',
        expiry: '2026-12-31',
      },
      ...prev,
    ]);
    setCode('');
    addToast('Discount Created', `Code ${code.toUpperCase()} is now active at checkout.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Discount Codes ({discounts.length})</h1>
          <p className="text-sm text-slate-500">Create promotional coupons usable immediately in the storefront shopping bag.</p>
        </div>
        <form onSubmit={createCoupon} className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="CODE (e.g. DIWALI25)"
            className="px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 uppercase"
          />
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-20 px-3 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold">
            Create % Off
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3.5">Code</th>
              <th className="px-4 py-3.5">Discount</th>
              <th className="px-4 py-3.5">Min Spend</th>
              <th className="px-4 py-3.5">Redemptions</th>
              <th className="px-4 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {discounts.map((d) => (
              <tr key={d.id}>
                <td className="px-4 py-3 font-mono font-bold text-blue-600">{d.code}</td>
                <td className="px-4 py-3 font-semibold">
                  {d.type === 'Percentage' ? `${d.value}% OFF` : `${formatINR(d.value)} OFF`}
                </td>
                <td className="px-4 py-3">{formatINR(d.minOrder)}</td>
                <td className="px-4 py-3 text-xs">{d.usage} / {d.limit}</td>
                <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- MODULE 10: Website & Hero Banner Visual Editor with Live Preview ---
const AdminWebsiteBannerEditorModule = ({ initialTab = 'sections' }) => {
  const { config, setConfig, addToast, setRoute } = useStore();
  const [tab, setTab] = useState(initialTab);

  const moveSection = (index, dir) => {
    const next = [...config.sections];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setConfig((prev) => ({ ...prev, sections: next }));
  };

  const toggleSection = (id) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
    }));
  };

  const addPromoBanner = () => {
    setConfig((prev) => ({
      ...prev,
      promoBanners: [
        ...prev.promoBanners,
        {
          id: `promo-${Date.now()}`,
          title: 'Limited Titanium Drop',
          subtitle: 'Precision-milled accessories available in small batches.',
          ctaText: 'Shop Drop',
          badge: 'EXCLUSIVE',
          image: HERO_IMAGES[2],
          active: true,
        },
      ],
    }));
    addToast('Banner Added', 'New promotional banner appended to storefront.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Visual Website &amp; Hero Banner Editor</h1>
          <p className="text-sm text-slate-500">Customize hero banners, promotional slots, and homepage layout order with live preview.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast('Layout Published', 'Storefront configuration persisted to localStorage.')}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Save &amp; Publish
          </button>
          <button
            onClick={() => setRoute('/store')}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
          >
            Open Full Store
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="xl:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-5">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            {[
              { id: 'sections', label: 'Hero & Sections' },
              { id: 'banners', label: 'Promo Banners' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                  tab === t.id ? 'bg-blue-600 text-white' : 'text-slate-500'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'sections' ? (
            <div className="space-y-5 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Announcement Bar</label>
                <input
                  value={config.announcementBar}
                  onChange={(e) => setConfig({ ...config, announcementBar: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                />
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase text-slate-500">Hero Banner Content</h3>
                <div>
                  <label className="block text-xs mb-1">Eyebrow Tag</label>
                  <input
                    value={config.hero.eyebrow}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, eyebrow: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Hero Headline</label>
                  <input
                    value={config.hero.title}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={config.hero.subtitle}
                    onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subtitle: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs mb-1">Primary CTA Text</label>
                    <input
                      value={config.hero.ctaText}
                      onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaText: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Hero Background</label>
                    <div className="flex gap-1.5">
                      {HERO_IMAGES.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setConfig({ ...config, hero: { ...config.hero, image: img } })}
                          className={`h-8 flex-1 rounded-lg overflow-hidden border-2 ${
                            config.hero.image === img ? 'border-blue-600' : 'border-transparent opacity-60'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Homepage Section Order &amp; Visibility</h3>
                <div className="space-y-1.5">
                  {config.sections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs"
                    >
                      <span className={!sec.visible ? 'line-through opacity-50' : 'font-medium'}>{sec.label}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => moveSection(idx, -1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">↑</button>
                        <button onClick={() => moveSection(idx, 1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">↓</button>
                        <button
                          onClick={() => toggleSection(sec.id)}
                          className={`ml-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            sec.visible ? 'bg-emerald-500/15 text-emerald-600' : 'bg-slate-300 text-slate-700'
                          }`}
                        >
                          {sec.visible ? 'Shown' : 'Hidden'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase text-slate-500">Promotional Cards</span>
                <button onClick={addPromoBanner} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold">
                  + Add Banner
                </button>
              </div>
              {config.promoBanners.map((b, idx) => (
                <div key={b.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Banner #{idx + 1}</span>
                    <button
                      onClick={() =>
                        setConfig({
                          ...config,
                          promoBanners: config.promoBanners.filter((item) => item.id !== b.id),
                        })
                      }
                      className="text-rose-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    value={b.title}
                    onChange={(e) => {
                      const updated = [...config.promoBanners];
                      updated[idx].title = e.target.value;
                      setConfig({ ...config, promoBanners: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent font-semibold"
                  />
                  <input
                    value={b.subtitle}
                    onChange={(e) => {
                      const updated = [...config.promoBanners];
                      updated[idx].subtitle = e.target.value;
                      setConfig({ ...config, promoBanners: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Storefront Preview Frame */}
        <div className="xl:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-slate-500">aethergoods.in/store (Live Preview)</span>
            </div>
            <span className="text-emerald-600 font-semibold">● Instant Sync</span>
          </div>
          <div className="h-[680px] overflow-y-auto">
            <StorefrontExperience embeddedPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 11: Theme Customizer with Presets & Live Storefront Preview ---
const AdminThemeCustomizerModule = () => {
  const { config, setConfig, addToast } = useStore();
  const theme = config.theme;

  const applyPreset = (presetName) => {
    setConfig((prev) => ({
      ...prev,
      theme: { ...THEME_PRESETS[presetName] },
    }));
    addToast('Theme Preset Applied', `Switched storefront to ${presetName}.`);
  };

  const updateToken = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, [key]: value },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Theme &amp; Design Token Studio</h1>
        <p className="text-sm text-slate-500">Switch curated presets or fine-tune brand colors, typography, radii, and dark mode.</p>
      </div>

      {/* Presets Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(THEME_PRESETS).map((name) => {
          const p = THEME_PRESETS[name];
          const active = theme.preset === name;
          return (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              className={`p-4 rounded-2xl border text-left transition ${
                active
                  ? 'border-blue-600 bg-blue-600/5 ring-2 ring-blue-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{name}</span>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: p.primaryColor }} />
                  <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: p.accentColor }} />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {p.storeDarkMode ? 'Dark Storefront' : 'Light Storefront'} • {p.buttonStyle} buttons
              </p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Token Controls */}
        <div className="xl:col-span-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-sm">Design Tokens</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-medium">Primary Brand</label>
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => updateToken('primaryColor', e.target.value)}
                className="w-full h-9 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Accent CTA Color</label>
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => updateToken('accentColor', e.target.value)}
                className="w-full h-9 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Typography Family</label>
            <select
              value={theme.fontFamily}
              onChange={(e) => updateToken('fontFamily', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <option value="Inter, system-ui, sans-serif">Modern Sans (Inter)</option>
              <option value="Georgia, serif">Editorial Serif (Georgia)</option>
              <option value="ui-monospace, SFMono-Regular, monospace">Technical Mono</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Button Geometry</label>
            <div className="grid grid-cols-3 gap-2">
              {['rounded', 'pill', 'sharp'].map((bs) => (
                <button
                  key={bs}
                  onClick={() => updateToken('buttonStyle', bs)}
                  className={`py-2 border rounded-lg capitalize font-semibold ${
                    theme.buttonStyle === bs ? 'border-blue-600 bg-blue-600/10 text-blue-600' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {bs}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Card Surface Style</label>
            <div className="grid grid-cols-3 gap-2">
              {['elevated', 'bordered', 'minimal'].map((cs) => (
                <button
                  key={cs}
                  onClick={() => updateToken('cardStyle', cs)}
                  className={`py-2 border rounded-lg capitalize font-semibold ${
                    theme.cardStyle === cs ? 'border-blue-600 bg-blue-600/10 text-blue-600' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cs}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold">Storefront Dark Mode</span>
            <button
              onClick={() => updateToken('storeDarkMode', !theme.storeDarkMode)}
              className={`w-11 h-6 rounded-full p-0.5 transition ${theme.storeDarkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${theme.storeDarkMode ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-medium flex justify-between">
            <span>Live Theme Preview</span>
            <span className="text-blue-600 font-semibold">{theme.preset}</span>
          </div>
          <div className="h-[620px] overflow-y-auto">
            <StorefrontExperience embeddedPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 12: SEO Manager ---
const AdminSeoManagerModule = () => {
  const { config, setConfig, products, addToast } = useStore();
  const seo = config.seo;

  // Heuristic SEO Health Score calculation
  const auditChecks = useMemo(() => {
    const checks = [
      { label: 'Global Meta Title length (30–65 chars)', pass: seo.siteTitle.length >= 30 && seo.siteTitle.length <= 65 },
      { label: 'Global Meta Description present (80–160 chars)', pass: seo.siteDescription.length >= 80 && seo.siteDescription.length <= 165 },
      { label: 'Canonical Base URL configured with HTTPS', pass: seo.canonicalBase.startsWith('https://') },
      { label: 'XML Sitemap generation enabled', pass: seo.sitemapEnabled },
      { label: 'All catalog products have meta descriptions', pass: products.every((p) => Boolean(p.metaDescription)) },
    ];
    const score = Math.round((checks.filter((c) => c.pass).length / checks.length) * 100);
    return { checks, score };
  }, [seo, products]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">SEO &amp; Search Visibility Manager</h1>
          <p className="text-sm text-slate-500">Configure metadata, Open Graph previews, robots.txt, and URL redirects.</p>
        </div>
        <button
          onClick={() => addToast('SEO Settings Saved', 'Storefront metadata updated.')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Save SEO Metadata
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold mb-1">Global Site Title ({seo.siteTitle.length} chars)</label>
            <input
              value={seo.siteTitle}
              onChange={(e) => setConfig({ ...config, seo: { ...seo, siteTitle: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Global Meta Description ({seo.siteDescription.length} chars)</label>
            <textarea
              rows={3}
              value={seo.siteDescription}
              onChange={(e) => setConfig({ ...config, seo: { ...seo, siteDescription: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Canonical Domain</label>
              <input
                value={seo.canonicalBase}
                onChange={(e) => setConfig({ ...config, seo: { ...seo, canonicalBase: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Open Graph Share Title</label>
              <input
                value={seo.ogTitle}
                onChange={(e) => setConfig({ ...config, seo: { ...seo, ogTitle: e.target.value } })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
            </div>
          </div>

          {/* Search Engine Result Preview */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400">Google Search Snippet Preview</span>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">{seo.canonicalBase}/store</p>
            <h4 className="text-base font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer">
              {seo.siteTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{seo.siteDescription}</p>
          </div>
        </div>

        {/* Heuristic Health Panel */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">SEO Health Score</h3>
            <span className="px-2 py-0.5 text-[10px] rounded bg-amber-500/15 text-amber-600 font-semibold">
              Demo Heuristic
            </span>
          </div>
          <div className="text-4xl font-black text-emerald-600">{auditChecks.score}/100</div>
          <div className="space-y-2.5 pt-2">
            {auditChecks.checks.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                {c.pass ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>{c.label}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-bold mb-1">robots.txt Rules</label>
            <textarea
              rows={4}
              value={seo.robotsTxt}
              onChange={(e) => setConfig({ ...config, seo: { ...seo, robotsTxt: e.target.value } })}
              className="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 13: Payment Gateways Integration ---
const AdminPaymentGatewaysModule = () => {
  const { config, setConfig, addToast } = useStore();
  const [configuringId, setConfiguringId] = useState(null);

  const toggleGateway = (id) => {
    setConfig((prev) => ({
      ...prev,
      gateways: prev.gateways.map((g) =>
        g.id === id ? { ...g, enabled: !g.enabled, status: !g.enabled ? 'Connected' : 'Disconnected' } : g
      ),
    }));
    addToast('Gateway Updated', 'Checkout payment methods synchronized.');
  };

  const testConnection = (gw) => {
    addToast(`${gw.name} Ping Successful`, `Simulated sandbox handshake completed in 138ms (${gw.mode} Mode).`);
  };

  const activeGw = config.gateways.find((g) => g.id === configuringId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payment Gateways</h1>
        <p className="text-sm text-slate-500">
          Enable or configure simulated payment providers. Enabled gateways immediately appear at Storefront Checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.gateways.map((gw) => (
          <div key={gw.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold">{gw.name}</h3>
                    <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-slate-100 dark:bg-slate-800">
                      {gw.mode} Mode
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{gw.tagline}</p>
                </div>
                <StatusBadge status={gw.enabled ? 'Connected' : 'Disconnected'} />
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {gw.methods.map((m) => (
                  <span key={m} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfiguringId(gw.id)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Configure
                </button>
                <button
                  onClick={() => testConnection(gw)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 hover:bg-blue-500/10"
                >
                  Test Ping
                </button>
              </div>

              <button
                onClick={() => toggleGateway(gw.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white ${
                  gw.enabled ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-600 hover:bg-blue-500'
                }`}
              >
                {gw.enabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={Boolean(activeGw)}
        onClose={() => setConfiguringId(null)}
        title={`Configure ${activeGw?.name || ''}`}
        subtitle="Demo credentials only — never enter real production API keys."
        maxWidth="max-w-lg"
      >
        {activeGw && (
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold mb-1">Simulated Public / Merchant Key ID</label>
              <input
                value={activeGw.keyId}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gateways: config.gateways.map((g) => (g.id === activeGw.id ? { ...g, keyId: e.target.value } : g)),
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Environment Mode</label>
              <select
                value={activeGw.mode}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gateways: config.gateways.map((g) => (g.id === activeGw.id ? { ...g, mode: e.target.value } : g)),
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value="Test">Sandbox / Test Mode</option>
                <option value="Live">Simulated Live Mode</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => {
                  setConfiguringId(null);
                  addToast('Configuration Saved', `${activeGw.name} settings updated.`);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// --- MODULE 14: Transactions ---
const AdminTransactionsModule = () => {
  const { transactions } = useStore();
  const [gatewayFilter, setGatewayFilter] = useState('All');

  const filtered = transactions.filter((t) => gatewayFilter === 'All' || t.gateway === gatewayFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payment Transactions ({transactions.length})</h1>
          <p className="text-sm text-slate-500">Ledger of simulated gateway captures, MDR fees, and net settlements.</p>
        </div>
        <div className="flex gap-1.5">
          {['All', 'Razorpay', 'Stripe', 'Cashfree', 'PayPal'].map((g) => (
            <button
              key={g}
              onClick={() => setGatewayFilter(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                gatewayFilter === g ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3.5">Transaction ID</th>
                <th className="px-4 py-3.5">Order</th>
                <th className="px-4 py-3.5">Gateway</th>
                <th className="px-4 py-3.5">Gross</th>
                <th className="px-4 py-3.5">Fee (2%)</th>
                <th className="px-4 py-3.5">Net Settlement</th>
                <th className="px-4 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.slice(0, 40).map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3 font-mono text-xs font-semibold">{t.id}</td>
                  <td className="px-4 py-3 text-xs">{t.orderNumber}</td>
                  <td className="px-4 py-3 text-xs">{t.gateway} • {t.methodDetail}</td>
                  <td className="px-4 py-3 font-medium">{formatINR(t.amount)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">-{formatINR(t.fee)}</td>
                  <td className="px-4 py-3 font-bold">{formatINR(t.net)}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MODULE 15: Zoho Books Accounting Integration ---
const AdminZohoBooksModule = () => {
  const { config, setConfig, orders, addToast } = useStore();
  const zb = config.zohoBooks;
  const sampleOrder = orders[0];

  const triggerManualSync = () => {
    if (!zb.connected) {
      addToast('Zoho Books Disconnected', 'Connect your organization before running sync.', 'error');
      return;
    }
    const newLog = {
      id: `zlog-${Date.now()}`,
      time: 'Just now',
      entity: 'Manual Full Sync',
      count: orders.length,
      status: 'Success',
      message: `Synchronized ${orders.length} GST invoices and customer ledgers to Zoho Books.`,
    };
    setConfig((prev) => ({
      ...prev,
      zohoBooks: {
        ...prev.zohoBooks,
        lastSync: 'Just now',
        logs: [newLog, ...prev.zohoBooks.logs],
      },
    }));
    addToast('Zoho Books Synced', 'All recent storefront orders mapped to Zoho GST invoices.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Zoho Books Accounting Integration</h1>
          <p className="text-sm text-slate-500">Automated GST tax-invoice generation, customer ledger mapping, and payment reconciliation.</p>
        </div>
        <button
          onClick={triggerManualSync}
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-2 self-start"
        >
          <RefreshCw className="w-4 h-4" /> Sync Now
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection & Toggles */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-base">Organization Link</h3>
              <p className="text-xs text-slate-500 mt-1">{zb.orgName}</p>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">Org ID: {zb.orgId}</p>
            </div>
            <StatusBadge status={zb.connected ? 'Connected' : 'Disconnected'} />
          </div>

          <button
            onClick={() =>
              setConfig({
                ...config,
                zohoBooks: { ...zb, connected: !zb.connected },
              })
            }
            className={`w-full py-2.5 rounded-xl text-xs font-semibold border ${
              zb.connected
                ? 'border-rose-500/30 text-rose-500 hover:bg-rose-500/10'
                : 'bg-emerald-600 text-white border-transparent'
            }`}
          >
            {zb.connected ? 'Disconnect Zoho Organization' : 'Connect Zoho Books (Simulated)'}
          </button>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <p className="font-bold uppercase text-slate-400">Automated Sync Rules</p>
            {[
              { key: 'syncCustomers', label: 'Sync Customer Contacts & GSTIN' },
              { key: 'syncInvoices', label: 'Auto-Create GST Tax Invoices' },
              { key: 'syncPayments', label: 'Record Gateway Settlements' },
              { key: 'syncSalesOrders', label: 'Mirror Storefront Sales Orders' },
            ].map((rule) => (
              <div key={rule.key} className="flex items-center justify-between">
                <span>{rule.label}</span>
                <button
                  onClick={() =>
                    setConfig({
                      ...config,
                      zohoBooks: { ...zb, [rule.key]: !zb[rule.key] },
                    })
                  }
                  className={`w-9 h-5 rounded-full p-0.5 transition ${zb[rule.key] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${zb[rule.key] ? 'translate-x-4' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Mapping Preview */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div>
            <h3 className="font-bold text-base">Live GST Invoice Mapping Preview</h3>
            <p className="text-xs text-slate-500">
              Previewing how latest order <strong>{sampleOrder?.orderNumber}</strong> transforms into a Zoho Books GST invoice.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Zoho Invoice #</span>
              <span className="font-mono font-bold">INV-{sampleOrder?.orderNumber?.replace('ORD-', '')}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Customer Ledger</span>
              <span className="font-semibold">{sampleOrder?.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Tax Treatment (IGST/CGST 18%)</span>
              <span className="font-semibold">{formatINR(Math.round((sampleOrder?.total || 0) * 0.18))}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Synchronization Activity Log</h4>
            <div className="space-y-2.5">
              {zb.logs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-semibold">{log.entity} • <span className="text-slate-400 font-normal">{log.time}</span></p>
                    <p className="text-slate-500 mt-0.5">{log.message}</p>
                  </div>
                  <StatusBadge status={log.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Remaining Admin Modules (Fully Implemented) ---
const AdminPagesModule = () => {
  const { addToast } = useStore();
  const [pages, setPages] = useState([
    { id: 'pg-1', title: 'About Aether Studio', slug: '/about', updated: '2026-11-12', status: 'Published' },
    { id: 'pg-2', title: 'Shipping & Pan-India Delivery', slug: '/shipping-policy', updated: '2026-11-04', status: 'Published' },
    { id: 'pg-3', title: '2-Year Hardware Warranty', slug: '/warranty', updated: '2026-10-28', status: 'Published' },
    { id: 'pg-4', title: 'Corporate Gifting & Bulk Orders', slug: '/corporate', updated: '2026-11-18', status: 'Draft' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Content Pages</h1>
          <p className="text-sm text-slate-500">Manage informational storefront pages and policy documents.</p>
        </div>
        <button
          onClick={() => {
            setPages((p) => [...p, { id: `pg-${Date.now()}`, title: 'New Custom Page', slug: '/custom-page', updated: 'Today', status: 'Draft' }]);
            addToast('Draft Page Created');
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          + New Page
        </button>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3.5">Page Title</th>
              <th className="px-4 py-3.5">URL Slug</th>
              <th className="px-4 py-3.5">Last Updated</th>
              <th className="px-4 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pages.map((pg) => (
              <tr key={pg.id}>
                <td className="px-4 py-3.5 font-semibold">{pg.title}</td>
                <td className="px-4 py-3.5 font-mono text-xs">{pg.slug}</td>
                <td className="px-4 py-3.5 text-xs text-slate-500">{pg.updated}</td>
                <td className="px-4 py-3.5"><StatusBadge status={pg.status === 'Published' ? 'Active' : 'Draft'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminNavigationModule = () => {
  const { config, setConfig, categories, addToast } = useStore();
  const navItems = config.navigationItems || [];
  const [newLabel, setNewLabel] = useState('');
  const [newCategory, setNewCategory] = useState('All');

  const toggleItem = (id) => {
    setConfig((prev) => ({
      ...prev,
      navigationItems: prev.navigationItems.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      ),
    }));
    addToast('Header Menu Updated', 'Changes are live on the customer storefront.');
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    setConfig((prev) => ({
      ...prev,
      navigationItems: [
        ...(prev.navigationItems || []),
        {
          id: `nav-${Date.now()}`,
          label: newLabel.trim(),
          action: 'catalog',
          category: newCategory,
          visible: true,
        },
      ],
    }));
    setNewLabel('');
    addToast('Menu Link Added', `${newLabel} added to storefront header.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Storefront Navigation Menus</h1>
          <p className="text-sm text-slate-500">Add, hide, or customize top header links. Persisted to localStorage and live on /store.</p>
        </div>
        <form onSubmit={addItem} className="flex flex-wrap gap-2">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Link label (e.g. Footwear)"
            className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <option value="All">All Products</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
            + Add Link
          </button>
        </form>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
        {navItems.map((item, idx) => (
          <div key={item.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm">
            <div>
              <span className={`font-semibold ${!item.visible ? 'line-through opacity-50' : ''}`}>{item.label}</span>
              <span className="text-xs text-slate-400 ml-2">→ {item.action === 'home' ? 'Homepage' : `Category: ${item.category}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleItem(item.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  item.visible ? 'bg-emerald-500/15 text-emerald-600' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {item.visible ? 'Visible' : 'Hidden'}
              </button>
              {idx > 1 && (
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      navigationItems: prev.navigationItems.filter((n) => n.id !== item.id),
                    }))
                  }
                  className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminRefundsModule = () => {
  const { orders, setOrders, addToast } = useStore();
  const refundable = orders.filter((o) => o.status === 'Refunded' || o.status === 'Cancelled' || o.status === 'Delivered').slice(0, 12);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Refunds &amp; Returns</h1>
        <p className="text-sm text-slate-500">Process simulated gateway refunds for returned or cancelled orders.</p>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3.5">Order</th>
              <th className="px-4 py-3.5">Customer</th>
              <th className="px-4 py-3.5">Amount</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {refundable.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-bold">{o.orderNumber}</td>
                <td className="px-4 py-3">{o.customerName}</td>
                <td className="px-4 py-3 font-semibold">{formatINR(o.total)}</td>
                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                <td className="px-4 py-3 text-right">
                  {o.status !== 'Refunded' && (
                    <button
                      onClick={() => {
                        setOrders((prev) => prev.map((item) => (item.id === o.id ? { ...item, status: 'Refunded' } : item)));
                        addToast('Simulated Refund Issued', `${formatINR(o.total)} credited back via ${o.paymentMethod}.`);
                      }}
                      className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold"
                    >
                      Issue Refund
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminSalesReportsModule = () => {
  const { addToast } = useStore();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Financial &amp; GST Sales Reports</h1>
          <p className="text-sm text-slate-500">Monthly revenue breakdown, taxable value, and output GST summary.</p>
        </div>
        <button
          onClick={() => addToast('CSV Export Ready', 'Simulated GST_Sales_Report_FY26.csv generated.')}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export GST CSV
        </button>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3.5">Period</th>
              <th className="px-4 py-3.5">Orders</th>
              <th className="px-4 py-3.5">Gross Sales</th>
              <th className="px-4 py-3.5">Output GST (18%)</th>
              <th className="px-4 py-3.5">Net Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {MONTHLY_SALES_ANALYTICS.map((m) => {
              const gst = Math.round(m.revenue * 0.18);
              return (
                <tr key={m.month}>
                  <td className="px-4 py-3 font-semibold">{m.month}</td>
                  <td className="px-4 py-3">{m.orders}</td>
                  <td className="px-4 py-3 font-medium">{formatINR(m.revenue)}</td>
                  <td className="px-4 py-3 text-slate-500">{formatINR(gst)}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">{formatINR(m.revenue - gst)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminStoreSettingsModule = () => {
  const { config, setConfig, addToast } = useStore();
  const s = config.storeSettings;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Store Settings</h1>
        <p className="text-sm text-slate-500">Configure brand contact details, free-shipping threshold, and GST defaults.</p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Store Legal Name</label>
            <input
              value={s.storeName}
              onChange={(e) => setConfig({ ...config, storeSettings: { ...s, storeName: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Support Email</label>
            <input
              value={s.supportEmail}
              onChange={(e) => setConfig({ ...config, storeSettings: { ...s, supportEmail: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Free Shipping Threshold (INR)</label>
            <input
              type="number"
              value={s.freeShippingThreshold}
              onChange={(e) => setConfig({ ...config, storeSettings: { ...s, freeShippingThreshold: Number(e.target.value) } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Default Currency</label>
            <input disabled value={s.currency} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold mb-1">Registered Office Address</label>
            <input
              value={s.address}
              onChange={(e) => setConfig({ ...config, storeSettings: { ...s, address: e.target.value } })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            />
          </div>
        </div>
        <button
          onClick={() => addToast('Settings Saved', 'Storefront configuration updated.')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Save Store Settings
        </button>
      </div>
    </div>
  );
};

const AdminStaffRolesModule = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Staff &amp; Role Permissions</h1>
      <p className="text-sm text-slate-500">Demo team access control matrix.</p>
    </div>
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 uppercase">
          <tr>
            <th className="px-4 py-3.5">Member</th>
            <th className="px-4 py-3.5">Role</th>
            <th className="px-4 py-3.5">2FA Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { name: 'Aarav Mehta (You)', email: 'aarav@aethergoods.in', role: 'Store Owner', status: 'Active' },
            { name: 'Priya Nair', email: 'priya.ops@aethergoods.in', role: 'Catalog & Merchandising', status: 'Active' },
            { name: 'Kabir Sharma', email: 'kabir.finance@aethergoods.in', role: 'Finance & Zoho Sync', status: 'Active' },
          ].map((m, i) => (
            <tr key={i}>
              <td className="px-4 py-3">
                <p className="font-semibold">{m.name}</p>
                <p className="text-xs text-slate-500">{m.email}</p>
              </td>
              <td className="px-4 py-3 text-xs font-medium">{m.role}</td>
              <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminActivityLogsModule = () => {
  const { orders } = useStore();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Activity &amp; Audit Logs</h1>
        <p className="text-sm text-slate-500">Chronological log of simulated storefront checkouts and admin actions.</p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
        {orders.slice(0, 8).map((o) => (
          <div key={o.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <span>
              <strong>{o.orderNumber}</strong> created by <strong>{o.customerName}</strong> ({formatINR(o.total)} via {o.paymentMethod})
            </span>
            <span className="text-slate-400">{o.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 8. ROOT APPLICATION SHELL
// ============================================================================

const MainRouter = () => {
  const { route, hydrated } = useStore();

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 mx-auto animate-pulse flex items-center justify-center font-bold">
            Æ
          </div>
          <p className="text-xs text-slate-400">Loading Aether Storefront...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {route === '/' && <StorefrontExperience />}
      {route === '/store' && <StorefrontExperience />}
      {route === '/admin' && <AdminDashboardExperience />}
      <ToastContainer />
    </>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <MainRouter />
    </AppStateProvider>
  );
}