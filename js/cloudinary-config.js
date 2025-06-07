/**
 * Cloudinary Configuration for Ramones Capulong Portfolio
 * 
 * Cloud Name: drlifoeqc
 * API Key: 189424161113223
 * 
 * Note: API Secret should never be exposed in client-side code
 * This file is for client-side image delivery only
 */

// Cloudinary Configuration
const CLOUDINARY_CONFIG = {
    cloudName: 'drlifoeqc',
    baseUrl: 'https://res.cloudinary.com/drlifoeqc',
    
    // Image transformation presets
    transformations: {
        // For project thumbnails in grid view
        thumbnail: 'c_fill,w_400,h_300,q_auto,f_auto',
        
        // For project hero images
        hero: 'c_fill,w_800,h_600,q_auto,f_auto',
        
        // For full-size project images
        fullsize: 'c_limit,w_1200,h_900,q_auto,f_auto',
        
        // For mobile optimized images
        mobile: 'c_fill,w_600,h_400,q_auto,f_auto',
        
        // For featured project on homepage
        featured: 'c_fill,w_600,h_400,q_auto,f_auto'
    }
};

/**
 * Generate Cloudinary URL with transformations
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {string} transformation - The transformation preset to apply
 * @returns {string} Complete Cloudinary URL
 */
function getCloudinaryUrl(publicId, transformation = 'thumbnail') {
    const transformationString = CLOUDINARY_CONFIG.transformations[transformation];
    return `${CLOUDINARY_CONFIG.baseUrl}/image/upload/${transformationString}/${publicId}`;
}

/**
 * Generate responsive image set for different screen sizes
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @returns {object} Object with URLs for different screen sizes
 */
function getResponsiveImages(publicId) {
    return {
        mobile: getCloudinaryUrl(publicId, 'mobile'),
        tablet: getCloudinaryUrl(publicId, 'thumbnail'),
        desktop: getCloudinaryUrl(publicId, 'hero'),
        fullsize: getCloudinaryUrl(publicId, 'fullsize')
    };
}

/**
 * Generate gallery HTML for a project
 * @param {string} projectKey - The key for the project in PROJECT_IMAGES
 * @returns {string} HTML string for the gallery
 */
function generateProjectGallery(projectKey) {
    const project = PROJECT_IMAGES[projectKey];
    if (!project || !project.gallery) return '';
    
    return project.gallery.map(image => {
        const thumbnailUrl = getCloudinaryUrl(image.id, 'thumbnail');
        const fullsizeUrl = getCloudinaryUrl(image.id, 'fullsize');
        
        return `
            <div class="gallery-item" data-image="${fullsizeUrl}" data-description="${image.description}">
                <img 
                    src="${thumbnailUrl}" 
                    alt="${image.alt}"
                    loading="lazy"
                >
                <div class="gallery-overlay">
                    <svg class="zoom-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                    </svg>
                </div>
            </div>
        `;
    }).join('');
}

// Project Images Registry
const PROJECT_IMAGES = {    grindTheory: {
        // Main thumbnail for project grid and homepage - using the mockup image
        thumbnail: 'Mockup-one-web_uysett.webp',
        
        // Project gallery images from Cloudinary - Real images from Grind Theory project
        gallery: [
            {
                id: 'Mockup-one-web_uysett.webp',
                alt: 'Grind Theory - Project Mockup',
                description: 'Professional mockup showcasing the Grind Theory apparel design project with comprehensive brand presentation.'
            },
            {
                id: 'shirt-designs-themes-web_ogfkah.webp',
                alt: 'Grind Theory - Shirt Design Themes',
                description: 'Creative shirt design concepts showcasing various themes and artistic approaches for the Grind Theory brand identity.'
            },
            {
                id: 'pre-order-ad-web_ejhliu.webp',
                alt: 'Grind Theory - Pre-order Advertisement',
                description: 'Marketing advertisement design for product pre-orders, featuring compelling visuals and clear call-to-action elements.'
            },
            {
                id: 'shirt2-combo-web_blj8st.webp',
                alt: 'Grind Theory - Shirt Design Combo 2',
                description: 'Second combination of shirt designs demonstrating versatility and range of the Grind Theory collection.'
            },
            {
                id: 'shirt1-combo-web_bkd6ep.webp',
                alt: 'Grind Theory - Shirt Design Combo 1',
                description: 'First combination of shirt designs showing the creative direction and aesthetic consistency of the brand.'
            }
        ]
    }
    
    // Add more projects here as you create them
    // example: {
    //     thumbnail: 'project-thumbnail.webp',
    //     gallery: [
    //         { id: 'image1.webp', alt: 'Description', description: 'Detailed description' }
    //     ]
    // }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLOUDINARY_CONFIG, getCloudinaryUrl, getResponsiveImages, PROJECT_IMAGES };
}
