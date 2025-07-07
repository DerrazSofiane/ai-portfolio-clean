# Ngrok Setup Guide

This guide will help you share your development server with anyone on the internet using ngrok.

## Step 1: Install ngrok

### Option A: Download from website (Recommended)
1. Go to [https://ngrok.com/download](https://ngrok.com/download)
2. Download the version for your OS (Windows/Mac/Linux)
3. Extract the zip file
4. Add ngrok to your PATH or note its location

### Option B: Using npm
```bash
npm install -g ngrok
```

### Option C: Using chocolatey (Windows)
```bash
choco install ngrok
```

## Step 2: Create a free ngrok account (Optional but recommended)

1. Sign up at [https://dashboard.ngrok.com/signup](https://dashboard.ngrok.com/signup)
2. Get your auth token from [https://dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)
3. Configure ngrok with your token:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

Benefits of having an account:
- Longer session times (free tier: 2 hours)
- Custom subdomains (paid feature)
- More simultaneous tunnels

## Step 3: Start your dev server

In your first terminal:
```bash
cd frontend
npm run dev
```

Your site should be running at `http://localhost:3000`

## Step 4: Start ngrok tunnel

In a second terminal:
```bash
ngrok http 3000
```

## Step 5: Share your URL

You'll see output like this:
```
ngrok                                                           (Ctrl+C to quit)

Session Status                online
Account                       your-email@example.com (Plan: Free)
Version                       3.5.0
Region                        United States (us)
Latency                       32ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://84c5-your-ip.ngrok-free.app -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0       0
```

**Your public URL**: `https://84c5-your-ip.ngrok-free.app`

Share this URL with anyone! They can access your portfolio from anywhere.

## Step 6: Monitor traffic (Optional)

Visit `http://127.0.0.1:4040` in your browser to see:
- All incoming requests
- Request/response details
- Request replay functionality

## Important Notes

### Free Tier Limitations
- Sessions expire after 2 hours
- Shows ngrok warning page on first visit
- Random URL each time (unless you pay for custom subdomain)

### Security Tips
- ✅ Great for demos and testing
- ✅ HTTPS encryption included
- ⚠️ Don't share sensitive data
- ⚠️ Close tunnel when done (Ctrl+C)
- ⚠️ Anyone with the URL can access your site

### Useful Commands

```bash
# Specify a different port
ngrok http 5173

# Use custom subdomain (paid feature)
ngrok http --subdomain=my-portfolio 3000

# Basic auth protection
ngrok http 3000 --auth="username:password"

# View all tunnels
ngrok tunnels
```

## Troubleshooting

### "Invalid Host Header" Error
If you see this error, update your `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    }
  },
  // ... rest
})
```

### Connection Refused
- Make sure your dev server is running
- Check the port number matches (3000)
- Try `http://localhost:3000` in your browser first

### Ngrok Warning Page
Free accounts show a warning page. Visitors need to click "Visit Site" to continue.

## Alternative: Quick One-Liner

If you have npx:
```bash
npx ngrok http 3000
```

This runs ngrok without installing it globally!

---

Remember: This is for temporary sharing only. For permanent hosting, deploy to Vercel or Netlify as described in DEPLOYMENT.md.