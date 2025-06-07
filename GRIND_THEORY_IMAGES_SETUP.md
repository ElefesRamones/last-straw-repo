# Grind Theory Project Images Setup Guide

## Understanding Cloudinary Folder Uploads

When you upload a folder named "Grind theory webp" to Cloudinary, the images inside get stored with the folder name as a prefix in their public ID. For example:

- **Folder name**: "Grind theory webp"
- **Image inside folder**: "homepage.jpg"
- **Cloudinary public ID**: "Grind theory webp/homepage"

## Step 1: Discover Your Actual Image Paths

I've created a discovery tool to help you find all images in your Cloudinary folder:

**Open this link:** `http://localhost:60829/discover-cloudinary-images.html`

This tool will:
1. Test common folder naming patterns
2. Try to load images with different path formats
3. Show you which images actually exist
4. Generate the correct configuration code for you

## Step 2: Common Cloudinary Folder Path Formats

Your images might be stored as:
- `Grind theory webp/image-name` (spaces preserved)
- `Grind_theory_webp/image-name` (spaces converted to underscores)  
- `grind-theory-webp/image-name` (converted to lowercase with dashes)

## Step 3: Update Configuration

Once you find the working image paths using the discovery tool:

1. Open `js/cloudinary-config.js`
2. Replace the placeholder image IDs in the `gallery` array
3. Use the exact paths that worked in the discovery tool

**Example:**
```javascript
gallery: [
    {
        id: 'Grind theory webp/your-actual-image-name',
        alt: 'Descriptive alt text',
        description: 'Detailed description for lightbox'
    },
    // ... more images
]
```

## Step 4: Test Your Changes

After updating the configuration:
1. Save the file
2. Refresh the Grind Theory project page: `http://localhost:60829/projects/grind-theory.html`
3. Check that all gallery images load correctly
4. Test the lightbox functionality

## Typical Image Types in Web Design Projects

Look for images that might be named:
- **Main designs**: homepage, landing, main-page, index
- **Additional pages**: about, contact, services, portfolio
- **Responsive views**: mobile, tablet, desktop, responsive
- **Brand elements**: logo, branding, colors, typography
- **Process work**: wireframes, sketches, mockups, prototype
- **Variations**: v1, v2, final, draft, concept

## Troubleshooting

**Images still not loading?**
1. Check the exact folder name in your Cloudinary account
2. Verify the image names within that folder
3. Use the manual test feature in the discovery tool
4. Remember that folder/image names are case-sensitive

**Need to add more images?**
1. Upload them to the same "Grind theory webp" folder in Cloudinary
2. Add them to the `gallery` array in the configuration
3. Follow the same format with `id`, `alt`, and `description`

## Quick Fix Instructions

If you want to quickly test with just the images that definitely exist:

1. Go to your Cloudinary Media Library
2. Navigate to the "Grind theory webp" folder  
3. Click on each image and copy its "Public ID"
4. Replace the placeholder IDs in the configuration with these real Public IDs

The gallery system will automatically adapt to however many images you provide.
