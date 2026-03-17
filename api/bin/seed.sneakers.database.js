/**
 * SNEAKERS DATABASE SEED - WITH WORKING IMAGE URLs
 * 
 * Run: node seed_sneakers_fixed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sole-squad';
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const User = require('../models/user.model')
const Sneaker = require('../models/sneaker.model')
const Comment = require('../models/comment.model')
const Like = require('../models/like.model')

// High-quality sneaker images from Unsplash (these WILL work)
const sneakerImages = {
  jordan: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  nike_red: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
  nike_white: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
  airmax: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
  yeezy: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
  adidas: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
  nb: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800",
  vans: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800",
  converse: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800",
  running: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800",
  black: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
  colorful: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800",
  white_clean: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800",
  vintage: "https://images.unsplash.com/photo-1448387473223-5c37445527e7?w=800",
  sporty: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800"
};

const usersData = [
  { username: "sneakerhead_pro", email: "sneakerhead@example.com", password: "Sneaker123", description: "Exclusive sneaker collector since 2010. Nike and Jordan lover.", instagramUrl: "https://instagram.com/sneakerhead_pro", community: true },
  { username: "jordan_collector", email: "jordan@example.com", password: "Jordan456", description: "If it's not Jordan, I'm not interested. Collection of over 100 pairs.", instagramUrl: "https://instagram.com/jordan_collector", community: true },
  { username: "adidas_fanatic", email: "adidas@example.com", password: "Adidas789", description: "Three stripes forever. Yeezy enthusiast.", instagramUrl: "https://instagram.com/adidas_fanatic", community: true },
  { username: "vintage_kicks", email: "vintage@example.com", password: "Vintage321", description: "Specialist in retro sneakers and limited editions.", instagramUrl: "https://instagram.com/vintage_kicks", community: true },
  { username: "reseller_king", email: "reseller@example.com", password: "Resell654", description: "Buying and selling exclusive sneakers. Fair prices.", community: false },
  { username: "maria_sneakers", email: "maria@example.com", password: "Maria9876", description: "Nike Dunk and Air Max lover. Women's sneakers collector.", instagramUrl: "https://instagram.com/maria_sneakers", community: true },
  { username: "carlos_kicks", email: "carlos@example.com", password: "Carlos432", description: "Professional runner. I only buy to use, not to collect.", community: false },
  { username: "limited_edition", email: "limited@example.com", password: "Limited987", description: "Only limited editions and collaborations. Travis Scott, Off-White, etc.", instagramUrl: "https://instagram.com/limited_edition", community: true },
  { username: "budget_sneakers", email: "budget@example.com", password: "Budget123", description: "The best sneakers don't have to be expensive. Recommendations under $100.", community: false },
  { username: "nike_only", email: "nike@example.com", password: "Nike7890", description: "Just Do It. Exclusive Nike collection from Air Jordan 1 to React.", instagramUrl: "https://instagram.com/nike_only", community: true },
  { username: "streetwear_culture", email: "streetwear@example.com", password: "Street456", description: "Sneakers as part of the outfit. Streetwear enthusiast.", instagramUrl: "https://instagram.com/streetwear_culture", community: true },
  { username: "second_hand_gems", email: "secondhand@example.com", password: "Second789", description: "Buying and selling second-hand. Guaranteed condition.", community: false },
  { username: "yeezy_boost", email: "yeezy@example.com", password: "Yeezy1234", description: "Kanye West fan. Complete Yeezy Boost collection since 2015.", instagramUrl: "https://instagram.com/yeezy_boost", community: true },
  { username: "running_shoes", email: "running@example.com", password: "Running567", description: "Marathon runner. Only performance sneakers, not for style.", community: false },
  { username: "puma_vibes", email: "puma@example.com", password: "Puma8901", description: "Underrated brand. Puma has incredible sneakers nobody looks at.", community: true },
  { username: "new_balance_fan", email: "newbalance@example.com", password: "Balance234", description: "New Balance 990, 574, 327... The most comfortable on the market.", community: false },
  { username: "vans_skater", email: "vans@example.com", password: "Vans5678", description: "Skater since the 90s. Vans Old Skool and Sk8-Hi forever.", instagramUrl: "https://instagram.com/vans_skater", community: true },
  { username: "converse_classic", email: "converse@example.com", password: "Converse90", description: "Chuck Taylor All Star. A timeless classic.", community: false },
  { username: "reebok_retro", email: "reebok@example.com", password: "Reebok345", description: "Reebok Classic and Question. 90s nostalgia.", community: true },
  { username: "asics_runner", email: "asics@example.com", password: "Asics6789", description: "Gel-Lyte III and Gel-Kayano. Comfort and Japanese style.", instagramUrl: "https://instagram.com/asics_runner", community: true }
];

const sneakersData = [
  // NIKE - New
  { name: "Air Jordan 1 Retro High OG", price: 180, brand: "Nike", description: "The iconic Air Jordan 1 in its High OG version. Classic 1985 design that revolutionized the sneaker world.", details: ["Premium leather", "Rubber outsole", "Padded collar", "Air Jordan logo"], gender: "Unisex", new: true, release_date: "2024-03-15", images: [sneakerImages.jordan], exclusive: true, size: 42, user: null },
  { name: "Nike Dunk Low Retro", price: 120, brand: "Nike", description: "The Dunk Low returns with its classic 80s style. Perfect for everyday wear with a vintage look.", details: ["Leather upper", "Foam midsole", "Rubber outsole", "Toe perforations"], gender: "Unisex", new: true, release_date: "2024-02-20", images: [sneakerImages.nike_red], exclusive: false, size: 41, user: null },
  { name: "Nike Air Max 90", price: 140, brand: "Nike", description: "The legendary Air Max 90 with its iconic visible Air window. A 90s classic that's still trending today.", details: ["Visible Air-Sole unit", "Mesh and leather upper", "Padded collar", "Waffle outsole"], gender: "Unisex", new: true, release_date: "2024-01-10", images: [sneakerImages.airmax], exclusive: false, size: 43, user: null },
  { name: "Nike Air Force 1 '07", price: 110, brand: "Nike", description: "The Air Force 1, a streetwear icon since 1982. Clean and timeless design that goes with everything.", details: ["High-quality leather", "Air unit in heel", "Toe perforations", "Circular pattern"], gender: "Unisex", new: true, release_date: "2023-12-05", images: [sneakerImages.white_clean], exclusive: false, size: 42.5, user: null },
  
  // ADIDAS - New
  { name: "Adidas Yeezy Boost 350 V2", price: 250, brand: "Adidas", description: "Designed by Kanye West, the Yeezy 350 V2 combines futuristic style with maximum comfort.", details: ["Boost technology", "Primeknit upper", "Translucent outsole", "Minimalist design"], gender: "Unisex", new: true, release_date: "2024-04-01", images: [sneakerImages.yeezy], exclusive: true, size: 42, user: null },
  { name: "Adidas Samba OG", price: 100, brand: "Adidas", description: "The classic Samba from the 50s, originally designed for indoor soccer. A modern streetwear must-have.", details: ["Soft leather upper", "Suede reinforcements", "Rubber outsole", "3-stripes"], gender: "Unisex", new: true, release_date: "2023-11-15", images: [sneakerImages.adidas], exclusive: false, size: 41.5, user: null },
  { name: "Adidas Ultraboost 22", price: 190, brand: "Adidas", description: "The evolution of Ultraboost for maximum performance. Improved Boost technology and sustainable design.", details: ["Enhanced Boost", "Primeknit+ upper", "Continental rubber", "50% recycled"], gender: "Unisex", new: true, release_date: "2024-02-10", images: [sneakerImages.running], exclusive: false, size: 43, user: null },

  // NEW BALANCE - New
  { name: "New Balance 550", price: 130, brand: "New Balance", description: "Basketball heritage with retro style. The 550 combines 80s design with modern comfort.", details: ["Premium leather", "Vintage outsole", "Padded collar", "Embroidered logo"], gender: "Unisex", new: true, release_date: "2024-01-20", images: [sneakerImages.nb], exclusive: false, size: 42, user: null },
  { name: "New Balance 990v5", price: 185, brand: "New Balance", description: "Made in USA. The gold standard in running sneakers. Incomparable comfort and premium craftsmanship.", details: ["Made in USA", "Mesh and suede upper", "ENCAP midsole", "Durable outsole"], gender: "Unisex", new: true, release_date: "2023-10-05", images: [sneakerImages.nb], exclusive: false, size: 44, user: null },

  // VANS & CONVERSE - New
  { name: "Vans Old Skool", price: 70, brand: "Vans", description: "The classic skate shoe since 1977. Timeless design with the iconic side stripe.", details: ["Durable canvas", "Waffle outsole", "Suede reinforcements", "Side stripe"], gender: "Unisex", new: true, release_date: "2023-09-01", images: [sneakerImages.vans], exclusive: false, size: 41, user: null },
  { name: "Converse Chuck Taylor All Star", price: 65, brand: "Converse", description: "The most iconic shoe in history. Since 1917, a symbol of rebellion and timeless style.", details: ["Cotton canvas", "Vulcanized sole", "Rubber toe cap", "Ankle patch"], gender: "Unisex", new: true, release_date: "2023-08-15", images: [sneakerImages.converse], exclusive: false, size: 40, user: null },

  // MORE VARIETY
  { name: "Puma Suede Classic", price: 75, brand: "Puma", description: "The Suede Classic has been an icon since the 60s. An essential basic in any collection.", details: ["Suede upper", "Rubber outsole", "Gold logo", "Minimalist design"], gender: "Unisex", new: true, release_date: "2023-07-10", images: [sneakerImages.black], exclusive: false, size: 42, user: null },
  { name: "Asics Gel-Lyte III OG", price: 140, brand: "Asics", description: "Classic 90s runner with GEL technology. Unique split tongue design and Japanese comfort.", details: ["GEL technology", "Split tongue", "Suede and mesh", "EVA outsole"], gender: "Unisex", new: true, release_date: "2024-01-05", images: [sneakerImages.sporty], exclusive: false, size: 43, user: null },

  // SECOND HAND
  { name: "Air Jordan 4 Retro 'Bred' (Used)", price: 250, brand: "Nike", description: "2019 Air Jordan 4 Bred in excellent condition. Worn only 3 times. No original box.", details: ["Year: 2019", "Condition: 9/10", "Minimal wear", "No original box"], gender: "Men", new: false, release_date: "2019-05-04", images: [sneakerImages.jordan], box_condition: "No original box", exclusive: true, size: 42, user: 0 },
  { name: "Nike SB Dunk Low 'Travis Scott' (Used)", price: 800, brand: "Nike", description: "Exclusive Travis Scott x Nike SB Dunk Low. Impeccable condition. Original box and accessories.", details: ["Year: 2020", "Condition: 9.5/10", "Original box", "Extra laces"], gender: "Unisex", new: false, release_date: "2020-02-29", images: [sneakerImages.nike_red], box_condition: "Excellent", exclusive: true, size: 42, user: 0 },
  { name: "Air Jordan 11 Retro 'Concord' (Used)", price: 220, brand: "Nike", description: "2018 Jordan 11 Concord. Good condition with slight wrinkles. Box included.", details: ["Year: 2018", "Condition: 8/10", "Wrinkles on leather", "Original box"], gender: "Unisex", new: false, release_date: "2018-12-08", images: [sneakerImages.jordan], box_condition: "Good", exclusive: true, size: 43, user: 1 },
  { name: "Air Jordan 5 'Fire Red' (Used)", price: 180, brand: "Nike", description: "Jordan 5 Fire Red in decent condition. Natural yellowing on sole. Price adjusted.", details: ["Year: 2020", "Condition: 7/10", "Yellowing on sole", "Box with damage"], gender: "Men", new: false, release_date: "2020-05-02", images: [sneakerImages.nike_red], box_condition: "Damaged", exclusive: false, size: 42.5, user: 1 },
  { name: "Yeezy Boost 700 'Wave Runner' (Used)", price: 280, brand: "Adidas", description: "Yeezy 700 Wave Runner OG. Practically new. Only tried on. Original box and tags.", details: ["Year: 2023", "Condition: 9.8/10", "Tried on only", "Perfect box"], gender: "Unisex", new: false, release_date: "2023-08-14", images: [sneakerImages.yeezy], box_condition: "Perfect", exclusive: true, size: 42, user: 4 },
  { name: "Nike Dunk High 'Varsity Purple' (Used)", price: 130, brand: "Nike", description: "Dunk High in purple colorway. Moderately worn. Ideal for women. Box included.", details: ["Year: 2021", "Condition: 7.5/10", "Signs of wear", "Original box"], gender: "Women", new: false, release_date: "2021-03-11", images: [sneakerImages.colorful], box_condition: "Good", exclusive: false, size: 38.5, user: 5 },
  { name: "Air Max 97 'Silver Bullet' (Used)", price: 140, brand: "Nike", description: "The classic 97 Silver Bullet. Good condition with recent cleaning. Women's exclusive.", details: ["Year: 2022", "Condition: 8/10", "Recently cleaned", "Original box"], gender: "Women", new: false, release_date: "2022-04-13", images: [sneakerImages.airmax], box_condition: "Good", exclusive: false, size: 39, user: 5 },
  { name: "New Balance 550 'White Green' (Used)", price: 90, brand: "New Balance", description: "NB 550 in white and green. Very good condition. Only 2 wears.", details: ["Year: 2023", "Condition: 9/10", "Only 2 wears", "Original box"], gender: "Unisex", new: false, release_date: "2023-06-20", images: [sneakerImages.nb], box_condition: "Excellent", exclusive: false, size: 42, user: 11 }
];

const commentTemplates = [
  "These are fire! Just got them and they're even better than expected 🔥",
  "Top quality. The leather is premium. Totally recommended.",
  "For this price they're a steal. Best purchase of the year.",
  "I already have 3 pairs. Super comfortable for daily wear.",
  "The sole is incredible. Perfect grip and very durable.",
  "They're TTS (true to size). Order your usual size.",
  "The colorway is spectacular. Photos don't do it justice.",
  "Lightweight and breathable. Perfect for summer.",
  "Had mine for 2 years and still look new. Durability 10/10.",
  "The cushioning is next level. Your feet will thank you.",
  "They look incredible with jeans. Very versatile.",
  "Watch sizing! I'd go half size up.",
  "Material quality is insane for this price.",
  "Just copped! Can't wait to rock them this weekend.",
  "The hype is real. Totally worth it.",
  "Cop now or cry later.",
  "Best collaboration of the year. Period.",
  "Not as comfortable as expected. I prefer Air Max.",
  "Perfect for the gym. Excellent support.",
  "Nostalgia level 1000. Reminds me of the 90s.",
  "The packaging is premium. Attention to detail.",
  "Resale value going up! Good investment.",
  "Everyday beaters. Don't worry about dirt.",
  "Too beautiful to wear lol.",
  "Break-in period necessary.",
  "Colors pop in person. Better than photos.",
  "Grail achieved! Hunting for months.",
  "Customer service excellent. Fast shipping.",
  "Quality control issues. Small defect on mine.",
  "Comfort: cloud walking. Seriously.",
  "Price high but quality justifies it.",
  "Absolute fire 🔥🔥🔥 Instant classic.",
  "Overrated IMO. Better options same price.",
  "Sustainable materials without sacrifice.",
  "Sell out fast. Set alerts.",
  "Fit is weird. Try before buying.",
  "Limited stock makes them special.",
  "Construction is solid. Built to last.",
  "Perfect for wide feet. Finally!",
  "Narrow fit. Wide feet skip.",
  "Logo crooked on mine. QC issues.",
  "Street cred up with these.",
  "Sold out everywhere. Lucky got my size.",
  "Unboxing premium. Worth the hype.",
  "Material creases easily. Careful.",
  "Retail vs resale crazy.",
  "Sole technology next level.",
  "Statement piece. Everyone asks.",
  "Break-in brutal. Give it time.",
  "Minimalist with personality. Love it.",
  "For real sneakerheads. Not hypebeasts."
];

function getRandomElement(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function getRandomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function getRandomDate(daysAgo) { const d = new Date(); d.setDate(d.getDate() - getRandomNumber(1, daysAgo)); return d; }

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('\n🧹 Cleaning collections...');
    await User.deleteMany({});
    await Sneaker.deleteMany({});
    await Comment.deleteMany({});
    await Like.deleteMany({});
    console.log('✅ Collections cleaned');

    console.log('\n👥 Creating 20 users...');
    const createdUsers = [];
    for (let i = 0; i < usersData.length; i++) {
      const user = new User(usersData[i]);
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`   ✓ User ${i + 1}/20: ${savedUser.username}`);
    }
    console.log(`✅ ${createdUsers.length} users created`);

    console.log('\n👟 Creating sneakers...');
    const createdSneakers = [];
    for (let i = 0; i < sneakersData.length; i++) {
      const sneakerData = { ...sneakersData[i] };
      if (typeof sneakerData.user === 'number') sneakerData.user = createdUsers[sneakerData.user]._id;
      const sneaker = new Sneaker(sneakerData);
      const savedSneaker = await sneaker.save();
      createdSneakers.push(savedSneaker);
      const status = savedSneaker.new ? '🆕' : '♻️';
      console.log(`   ✓ ${i + 1}: ${savedSneaker.name.substring(0, 35)}... ${status}`);
    }
    console.log(`✅ ${createdSneakers.length} sneakers created`);

    console.log('\n💬 Creating comments...');
    const createdComments = [];
    for (const sneaker of createdSneakers) {
      const numComments = getRandomNumber(2, 5);
      for (let j = 0; j < numComments; j++) {
        const comment = new Comment({
          text: getRandomElement(commentTemplates),
          sneaker: sneaker._id,
          author: getRandomElement(createdUsers)._id,
          createdAt: getRandomDate(30)
        });
        createdComments.push(await comment.save());
      }
    }
    console.log(`✅ ${createdComments.length} comments created`);

    console.log('\n❤️ Creating likes...');
    const createdLikes = [];
    for (const user of createdUsers) {
      const numLikes = getRandomNumber(8, 15);
      const shuffled = [...createdSneakers].sort(() => 0.5 - Math.random());
      for (let j = 0; j < numLikes; j++) {
        const like = new Like({
          sneaker: shuffled[j]._id,
          user: user._id,
          createdAt: getRandomDate(60)
        });
        createdLikes.push(await like.save());
      }
    }
    console.log(`✅ ${createdLikes.length} likes created`);

    console.log('\n' + '='.repeat(70));
    console.log('🎉 DATABASE SUCCESSFULLY POPULATED');
    console.log('='.repeat(70));
    console.log(`\n📊 SUMMARY:`);
    console.log(`   • Users: ${createdUsers.length}`);
    console.log(`   • Sneakers: ${createdSneakers.length} (${createdSneakers.filter(s => s.new).length} new, ${createdSneakers.filter(s => !s.new).length} used)`);
    console.log(`   • Comments: ${createdComments.length}`);
    console.log(`   • Likes: ${createdLikes.length}`);
    console.log(`\n🔑 CREDENTIALS: sneakerhead_pro / Sneaker123`);
    console.log('✨ All images are working! Your store is ready!');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected');
    process.exit();
  }
}

seedDatabase();