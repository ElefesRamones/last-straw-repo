# Assets Directory Structure

This directory contains all static assets for the Ramones Capulong portfolio website.

## 📁 Directory Organization

### `/images/`
- **`/logo/`** - Brand logos and site logos
  - Recommended formats: SVG (preferred), PNG with transparent background
  - Sizes: 32x32, 64x64, 128x128, 256x256 (for different use cases)
  - File naming: `logo.svg`, `logo-white.svg`, `logo-dark.svg`

- **`/projects/`** - Project showcase images and videos
  - Use descriptive naming: `brand-identity-hero.jpg`, `video-thumbnail.webp`
  - Optimize for web: WebP format preferred for photos

- **`/icons/`** - UI icons and small graphics
  - SVG format preferred for scalability
  - Include social media icons, UI elements

### `/css/`
- Custom CSS files (if needed beyond Tailwind)
- Component-specific styles

### `/fonts/`
- Custom web fonts (if not using Google Fonts CDN)
- WOFF2 format preferred for modern browsers

## 🎨 Logo Implementation

Your logo should be saved in `/assets/images/logo/` and can be implemented in navigation like this:

```html
<a href="/" class="flex items-center">
    <img src="/assets/images/logo/logo.svg" alt="Ramones Capulong" class="h-8 w-auto">
</a>
```

## 📱 Responsive Logo

Consider providing different logo variations:
- `logo.svg` - Full logo with text
- `logo-icon.svg` - Icon only (for mobile/small spaces)
- `logo-white.svg` - White version for dark backgrounds
- `logo-dark.svg` - Dark version for light backgrounds

## 🚀 Performance Tips

- Use SVG for logos when possible (scalable, small file size)
- Optimize images before uploading
- Consider lazy loading for project images
- Use WebP format for better compression
