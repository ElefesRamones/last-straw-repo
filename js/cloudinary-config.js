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

// Project Images Registry
const PROJECT_IMAGES = {
    grindTheory: {
        // Main thumbnail for project grid and homepage
        thumbnail: 'Mockup-one-web_uysett.webp',
        
        // Additional project images (add as you upload more)
        gallery: [
            'Mockup-one-web_uysett.webp'
            // Add more images here as you upload them
        ]
    }
    
    // Add more projects here as you create them
    // example: {
    //     thumbnail: 'project-thumbnail.webp',
    //     gallery: ['image1.webp', 'image2.webp']
    // }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLOUDINARY_CONFIG, getCloudinaryUrl, getResponsiveImages, PROJECT_IMAGES };
}
