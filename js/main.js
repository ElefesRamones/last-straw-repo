// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Project filtering functionality (for projects page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gray-900', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            this.classList.add('active', 'bg-gray-900', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.6s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });    // Enhanced Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (contactForm) {
        // Real-time form validation
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });        // Form submission handling
        contactForm.addEventListener('submit', function(e) {
            // Hide previous messages
            hideMessages();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showError('Please fix the errors above and try again.');
                return;
            }
            
            // Show loading state
            setLoadingState(true);
            
            // Check if we're in development mode (localhost)
            const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            
            if (isDevelopment) {
                // In development, prevent default and simulate
                e.preventDefault();
                setTimeout(() => {
                    showSuccess();
                    contactForm.reset();
                    clearFormData();
                    setLoadingState(false);
                }, 1500);
            } else {
                // In production, let Netlify handle the form submission naturally
                // Don't prevent default - let the form submit normally
                clearFormData();
            }
        });
          // Check for success parameter in URL (after form submission)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            showSuccess();
            // Clear form
            contactForm.reset();
            clearFormData();
            // Remove success parameter from URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 1000;
        messageField.setAttribute('maxlength', maxLength);
        
        // Create character counter
        const counterDiv = document.createElement('div');
        counterDiv.className = 'text-sm text-gray-500 mt-1 text-right';
        counterDiv.innerHTML = `<span id="char-count">0</span>/${maxLength} characters`;
        messageField.parentNode.appendChild(counterDiv);
        
        const charCount = document.getElementById('char-count');
        
        messageField.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            // Change color when approaching limit
            if (currentLength > maxLength * 0.9) {
                charCount.className = 'text-red-600 font-medium';
            } else if (currentLength > maxLength * 0.8) {
                charCount.className = 'text-yellow-600 font-medium';
            } else {
                charCount.className = '';
            }
        });
    }

    // Auto-save form data to localStorage
    function saveFormData() {
        if (contactForm) {
            const formData = new FormData(contactForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                if (key !== 'bot-field' && key !== 'form-name') {
                    data[key] = value;
                }
            }
            localStorage.setItem('contactFormData', JSON.stringify(data));
        }
    }

    function loadFormData() {
        if (contactForm) {
            const savedData = localStorage.getItem('contactFormData');
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    Object.entries(data).forEach(([key, value]) => {
                        const field = contactForm.querySelector(`[name="${key}"]`);
                        if (field && value) {
                            field.value = value;
                        }
                    });
                } catch (error) {
                    console.log('Could not load saved form data');
                }
            }
        }
    }

    function clearFormData() {
        localStorage.removeItem('contactFormData');
    }

    // Auto-save on input changes
    if (contactForm) {
        inputs.forEach(input => {
            input.addEventListener('input', saveFormData);
        });
        
        // Load saved data on page load
        loadFormData();
        
        // Clear saved data on successful submission
        contactForm.addEventListener('submit', function() {
            clearFormData();
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMsg = '';

        // Remove existing error styling
        field.classList.remove('error', 'border-red-300', 'focus:ring-red-500');
        const existingError = field.parentNode.querySelector('.error-text');
        if (existingError) {
            existingError.remove();
        }

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMsg = 'This field is required.';
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMsg = 'Please enter a valid email address.';
            }
        }
        
        // Name validation (minimum 2 characters)
        else if (field.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMsg = 'Name must be at least 2 characters long.';
        }
        
        // Message validation (minimum 10 characters)
        else if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMsg = 'Message must be at least 10 characters long.';
        }

        if (!isValid) {
            // Add error styling
            field.classList.add('error', 'border-red-300', 'focus:ring-red-500');
            
            // Add error message
            const errorElement = document.createElement('p');
            errorElement.className = 'error-text text-red-600 text-sm mt-1';
            errorElement.textContent = errorMsg;
            field.parentNode.appendChild(errorElement);
        }

        return isValid;
    }    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            submitText.textContent = 'Sending...';
            loadingSpinner.classList.remove('hidden');
        } else {
            submitButton.disabled = false;
            submitText.textContent = 'Send Message';
            loadingSpinner.classList.add('hidden');
        }
    }

    function showSuccess() {
        hideMessages();
        successMessage.classList.remove('hidden');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }

    function showError(message) {
        hideMessages();
        const errorText = errorMessage.querySelector('p');
        if (errorText) {
            errorText.textContent = message;
        }
        errorMessage.classList.remove('hidden');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide after 7 seconds
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 7000);
    }

    function hideMessages() {
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
    }

    // Add scroll effect to navigation
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Utility function for smooth transitions
function fadeIn(element, duration = 600) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        element.style.opacity = Math.min(progress / duration, 1);
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Performance optimization: Lazy loading for images (when implemented)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Dynamic subject line generation
    function updateSubjectLine() {
        const nameField = document.getElementById('name');
        const budgetField = document.getElementById('budget');
        const timelineField = document.getElementById('timeline');
        const subjectField = document.getElementById('dynamic-subject');
        
        if (nameField && subjectField) {
            let subject = 'New Portfolio Inquiry';
            const name = nameField.value.trim();
            
            if (name) {
                subject = `Portfolio Inquiry from ${name}`;
            }
            
            // Add budget info if selected
            if (budgetField && budgetField.value) {
                const budgetText = budgetField.options[budgetField.selectedIndex].text;
                subject += ` (Budget: ${budgetText})`;
            }
            
            // Add timeline info if selected
            if (timelineField && timelineField.value) {
                const timelineText = timelineField.options[timelineField.selectedIndex].text;
                subject += ` - ${timelineText}`;
            }
            
            subjectField.value = subject;
        }
    }

    // Update subject line when form fields change
    if (contactForm) {
        const nameField = document.getElementById('name');
        const budgetField = document.getElementById('budget');
        const timelineField = document.getElementById('timeline');
        
        [nameField, budgetField, timelineField].forEach(field => {
            if (field) {
                field.addEventListener('change', updateSubjectLine);
                field.addEventListener('blur', updateSubjectLine);
            }
        });
    }

    // Dynamic subject line generation for unique emails
        function updateDynamicSubject() {
            const nameField = document.getElementById('name');
            const budgetField = document.getElementById('budget');
            const timelineField = document.getElementById('timeline');
            const subjectField = document.getElementById('dynamic-subject');
            
            if (subjectField) {
                const name = nameField ? nameField.value.trim() : '';
                const budget = budgetField ? budgetField.value : '';
                const timeline = timelineField ? timelineField.value : '';
                
                // Create unique timestamp
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                
                // Build dynamic subject
                let subject = 'Portfolio Inquiry';
                
                if (name) {
                    subject += ` from ${name}`;
                }
                
                if (budget && budget !== '') {
                    const budgetLabels = {
                        'under-500': 'Under $500',
                        '500-1000': '$500-1K',
                        '1000-2500': '$1K-2.5K',
                        '2500-5000': '$2.5K-5K',
                        'over-5000': '$5K+',
                        'discuss': 'Budget TBD'
                    };
                    subject += ` [${budgetLabels[budget] || budget}]`;
                }
                
                if (timeline && timeline !== '') {
                    const timelineLabels = {
                        'asap': 'URGENT',
                        '1-week': '1 Week',
                        '2-weeks': '2 Weeks',
                        '1-month': '1 Month',
                        'flexible': 'Flexible'
                    };
                    subject += ` (${timelineLabels[timeline] || timeline})`;
                }
                
                // Add timestamp to ensure uniqueness
                subject += ` - ${timestamp}`;
                
                subjectField.value = subject;
            }
        }

        // Update subject when relevant fields change
        const subjectTriggerFields = ['name', 'budget', 'timeline'];
        subjectTriggerFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', updateDynamicSubject);
                field.addEventListener('change', updateDynamicSubject);
            }
        });        // Update subject before form submission
        contactForm.addEventListener('submit', function() {
            updateDynamicSubject();
            
            // Generate unique inquiry ID
            const inquiryIdField = document.getElementById('inquiry-id');
            const submissionTimeField = document.getElementById('submission-time');
            const timezoneField = document.getElementById('client-timezone');
            
            if (inquiryIdField) {
                const uniqueId = 'INQ-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                inquiryIdField.value = uniqueId;
            }
            
            if (submissionTimeField) {
                submissionTimeField.value = new Date().toISOString();
            }
            
            if (timezoneField) {
                timezoneField.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
            }
        });
