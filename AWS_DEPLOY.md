# InvoAIce Website — AWS Deployment Guide

## Overview
The React website builds to a static bundle (`dist/`) deployable to:
- **AWS S3 + CloudFront** (recommended — fastest, cheapest)
- **AWS Amplify** (easiest, CI/CD built-in)
- **Any static host** (Vercel, Netlify, GitHub Pages)

---

## Option A: AWS S3 + CloudFront (Recommended)

### Step 1: Build
```bash
cd invoaice-website
npm run build
# Output: dist/
```

### Step 2: Create S3 Bucket
```bash
aws s3 mb s3://invoaice-website --region us-east-1
aws s3 website s3://invoaice-website --index-document index.html --error-document index.html
```

### Step 3: Upload Build
```bash
aws s3 sync dist/ s3://invoaice-website --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html"

aws s3 cp dist/index.html s3://invoaice-website/index.html \
  --cache-control "public,max-age=0,must-revalidate"
```

### Step 4: Create CloudFront Distribution
```bash
aws cloudfront create-distribution \
  --origin-domain-name invoaice-website.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

> In the AWS Console → CloudFront → Error Pages:
> - 404 → /index.html → 200 (for React Router SPA support)
> - 403 → /index.html → 200

### Step 5: Point Domain (invoaice.io)
1. Note your CloudFront distribution domain (e.g. `d1234.cloudfront.net`)
2. In your DNS (Route 53 or registrar):
   - Create CNAME: `www.invoaice.io → d1234.cloudfront.net`
   - Create ALIAS: `invoaice.io → d1234.cloudfront.net` (Route 53 only)
3. Create ACM certificate for `invoaice.io` + `www.invoaice.io`
4. Attach certificate to CloudFront distribution

---

## Option B: AWS Amplify (Easiest — CI/CD Included)

### Step 1: Connect GitHub
1. AWS Console → Amplify → New App → Host Web App
2. Connect GitHub repo: `InvoiceIQ`
3. Select branch: `main`
4. Set build root: `invoaice-website`

### Step 2: Build Settings (auto-detected)
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands: [ npm ci ]
    build:
      commands: [ npm run build ]
  artifacts:
    baseDirectory: dist
    files: [ '**/*' ]
  cache:
    paths: [ node_modules/**/* ]
```

### Step 3: Connect Custom Domain
1. Amplify → App → Domain Management
2. Add domain: `invoaice.io`
3. Amplify provisions SSL + updates Route 53 automatically

Every push to `main` auto-deploys. Done.

---

## Local Development
```bash
cd invoaice-website
npm run dev        # http://localhost:5175
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

---

## Environment Variables
Create `invoaice-website/.env.production` for production:
```env
VITE_APP_URL=https://invoaice.io
VITE_CONTACT_EMAIL=hello@invoaice.io
VITE_DEMO_EMAIL=demo@invoaice.io
```

---

## Cost Estimate (AWS)
| Service | Monthly Cost |
|---------|-------------|
| S3 (5GB) | ~$0.12 |
| CloudFront (100GB transfer) | ~$8.50 |
| Route 53 (1 hosted zone) | $0.50 |
| ACM Certificate | FREE |
| **Total** | **~$9/month** |
