# Deployment Guide for GitHub Pages

This guide explains how to deploy your portfolio to GitHub Pages.
 
## Prerequisites

1. Ensure your repository is pushed to GitHub
2. Your GitHub repository should be named `ai-portfolio`

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar
   - Under "Build and deployment", select:
     - Source: "GitHub Actions"

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "feat: Enable GitHub Pages deployment"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to the "Actions" tab in your repository
   - You should see the "Deploy to GitHub Pages" workflow running
   - Once complete (usually 2-3 minutes), your site will be available at:
     ```
     https://derrazsofiane.github.io/ai-portfolio/
     ```

## Manual Deployment (Alternative)

If you prefer to deploy manually:

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Run the deploy script:**
   ```bash
   ./deploy.sh
   ```

## Troubleshooting

### If the site doesn't load:

1. **Check GitHub Pages is enabled:**
   - Repository Settings → Pages → Ensure it's enabled

2. **Check the workflow ran successfully:**
   - Repository → Actions tab → Check for any failed workflows

3. **Clear browser cache:**
   - The site might be cached, try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

4. **Check base URL:**
   - Ensure `vite.config.js` has the correct `base: '/ai-portfolio/'`

### If assets don't load:

- All asset paths should be relative or use the base path
- In your code, use paths like `/logo.png` which will be resolved to `/ai-portfolio/logo.png`

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `frontend/public` directory with your domain
2. Configure your domain's DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

## Updates

Every time you push to the main branch, the site will automatically redeploy with your latest changes.