# Deploy to Vercel

Your EDB website is now ready for deployment! Here are the steps:

## Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   cd /Users/apple/Documents/EDB/EDB-website
   git init
   git add .
   git commit -m "Initial commit - EDB Website"
   git branch -M main
   git remote add origin https://github.com/yourusername/edb-website.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite app
   - Set these settings:
     - **Framework**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

## Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory:**
   ```bash
   cd /Users/apple/Documents/EDB/EDB-website/frontend
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? No
   - What's your project's name? `edb-website`
   - In which directory is your code located? `./`
   - Want to override settings? No

## Configuration Files Created

- ✅ `vercel.json` - Vercel deployment configuration
- ✅ Build scripts in `package.json` are properly set up
- ✅ All TypeScript errors fixed
- ✅ Production build tested successfully

## Features Deployed

Your website includes:
- 🎨 Responsive design with Editorial Board branding
- ✨ Particle animations on all pages
- 📖 Publications with PDF viewer
- 👥 Team pages with navigation
- 🎓 Alumni section with typing effects
- 📞 Contact form
- 🖼️ Gallery and Events pages
- 📱 Mobile-optimized interface

## Domain Setup (Optional)

After deployment, you can:
1. Add a custom domain in Vercel dashboard
2. Vercel provides free SSL certificates
3. Auto-deploys on every git push

## Environment Variables

If you need environment variables later:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add variables like `VITE_API_URL`, etc.

Your website is production-ready! 🚀