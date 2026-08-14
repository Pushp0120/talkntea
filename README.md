# TALK N TEA BILIMORA - Cafe Website

A premium cafe website built with Next.js, featuring menu browsing, gallery, reviews, and WhatsApp integration.

## 🚀 Deployment Instructions

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the project**
   ```bash
   cd talk-n-tea-cafe
   vercel
   ```

4. **Set Environment Variables**
   During deployment, set these environment variables in Vercel:
   - `DATABASE_URL`: For production, you'll need a cloud database (PostgreSQL recommended)
   - For now, the app will work without database using static data

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Manual Vercel Deployment via Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Click "Deploy"

## 📝 Important Notes for Production

### Database Configuration
The current setup uses SQLite for local development. For production:

1. **Recommended**: Use a cloud database like:
   - PostgreSQL (Vercel Postgres, Supabase, Neon)
   - MySQL (PlanetScale)
   - MongoDB (MongoDB Atlas)

2. **Update DATABASE_URL** in Vercel environment variables

3. **Run migrations** on your production database

### WhatsApp Integration
The WhatsApp number is set to: `+91 76002 30188`

## 🛠️ Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   ```

3. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📱 Features

- ✅ Premium UI with animations
- ✅ Menu section with categories
- ✅ Gallery with image display
- ✅ Review system
- ✅ Location with Google Maps
- ✅ WhatsApp integration
- ✅ Responsive design
- ✅ SEO optimized

## 🎨 Customization

- Update WhatsApp number in components
- Replace placeholder images with real cafe photos
- Modify menu items in database
- Customize colors in Tailwind classes

## 📞 Contact

- Phone: +91 76002 30188
- Location: Bilimora, Gujarat, India