<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Website Instructions for GitHub Copilot

This is a static portfolio website for Ramones Capulong, a creative professional specializing in graphic design, video editing, and social media management.

## Project Context

- **Static HTML/CSS/JS website** optimized for Netlify deployment
- **Tailwind CSS** for styling with utility-first approach
- **Semantic HTML** structure for accessibility and SEO
- **Cloudinary integration** ready for media optimization
- **Netlify Forms** for contact functionality

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements (`<main>`, `<section>`, `<nav>`, `<article>`, etc.)
- Include proper meta tags and descriptions
- Use meaningful class names and IDs
- Ensure accessibility with ARIA labels and alt text

### CSS (Tailwind)
- Use utility classes consistently
- Follow mobile-first responsive design
- Use consistent spacing scale (4, 6, 8, 12, 16, 20, etc.)
- Maintain consistent color palette (gray-50 to gray-900, purple-600, blue-600)

### JavaScript
- Write vanilla JavaScript for maximum compatibility
- Use modern ES6+ features appropriately
- Include proper error handling
- Comment complex functionality
- Follow performance best practices

## Design Patterns

### Layout
- Fixed navigation with backdrop blur
- Hero sections with gradient backgrounds
- Grid layouts for projects (md:grid-cols-2 lg:grid-cols-3)
- Consistent padding/margins (py-20, px-4 sm:px-6 lg:px-8)

### Components
- Project cards with hover effects
- Contact forms with validation
- FAQ sections with details/summary
- Filter buttons for project categories

### Colors
- Primary: Gray scale (50-900)
- Accent: Purple (purple-600), Blue (blue-600), Cyan (cyan-600)
- Gradients: from-purple-600 to-blue-600

## Media Integration

### Cloudinary
- Use Cloudinary URLs for all images and videos
- Implement responsive image loading
- Include proper alt text and lazy loading
- Optimize for different screen sizes

### Project Structure
- Individual project pages in `/projects/` directory
- Consistent project page layout
- Include project details, tools used, and results
- Link back to main projects page

## Form Handling

### Netlify Forms
- Use `netlify` attribute on forms
- Include hidden `form-name` input
- Provide proper validation
- Include success/error messaging

## Performance Considerations

- Minimize JavaScript for faster loading
- Use efficient CSS with Tailwind's utility classes
- Implement lazy loading for images
- Optimize for Core Web Vitals

## SEO Best Practices

- Include relevant meta descriptions
- Use proper heading hierarchy (h1, h2, h3)
- Implement Open Graph tags
- Ensure fast loading times
- Use semantic markup

## Content Guidelines

### Professional Tone
- Emphasize skills in graphic design, video editing, social media
- Highlight freelance availability
- Include clear calls-to-action
- Maintain professional but approachable language

### Portfolio Focus
- Showcase creative work prominently
- Include project details and results
- Demonstrate technical skills
- Show range of capabilities

## Deployment Notes

- Configured for Netlify with netlify.toml
- Static site - no build process required
- Forms handled automatically by Netlify
- Ready for custom domain configuration

When generating code, prioritize clean, semantic HTML, consistent Tailwind styling, and smooth user experience across all devices.
