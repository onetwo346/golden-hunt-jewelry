// ===============================
// GOLDEN HUNT JEWELRY - LUXURY ANIMATIONS
// ===============================

// Page loaded - no loading screen

// Smooth scroll function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Enhanced navbar effects
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Background change
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .sell-category, .trust-item, .feature, .info-card').forEach(el => {
    observer.observe(el);
});

// Add staggered animation for sell categories
document.querySelectorAll('.sell-category').forEach((category, index) => {
    category.style.animationDelay = `${index * 0.2}s`;
});

// Counter animation for trust indicators
const animateCounters = () => {
    document.querySelectorAll('.trust-number').forEach(counter => {
        const target = counter.textContent;
        const isNumeric = target.match(/\d+/);
        
        if (isNumeric) {
            const number = parseInt(isNumeric[0]);
            const increment = number / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + target.replace(/\d+/, '');
                }
            }, 30);
        }
    });
};

// Trigger counter animation when trust section is visible
const trustSection = document.querySelector('.trust-indicators');
const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            trustObserver.unobserve(entry.target);
        }
    });
});

if (trustSection) {
    trustObserver.observe(trustSection);
}

// Simple contact - no form to handle

// Video background - no parallax needed for actual video

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Luxury cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #FFD700, #D4AF37);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(newCursor);
    }
    
    document.querySelector('.cursor').style.left = e.clientX - 10 + 'px';
    document.querySelector('.cursor').style.top = e.clientY - 10 + 'px';
});

// Popup functionality
function openPopup(category) {
    const popup = document.getElementById('categoryPopup');
    const popupBody = document.getElementById('popupBody');
    
    let content = '';
    
    switch(category) {
        case 'jewelry':
            content = `
                <div class="popup-header">
                    <h2>Fine Jewelry Collection</h2>
                    <p>Discover our exquisite selection of necklaces, bracelets, rings, and earrings</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Gold Jewelry</h3>
                        <p>14K, 18K, and 24K gold pieces in various styles</p>
                    </div>
                    <div class="popup-item">
                        <h3>Silver Jewelry</h3>
                        <p>Sterling silver and fine silver collections</p>
                    </div>
                    <div class="popup-item">
                        <h3>Gemstone Jewelry</h3>
                        <p>Precious and semi-precious stone jewelry</p>
                    </div>
                    <div class="popup-item">
                        <h3>Custom Design</h3>
                        <p>Bespoke jewelry created to your specifications</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Visit Our Store Today</h3>
                </div>
            `;
            break;
        case 'engagement':
            content = `
                <div class="popup-header">
                    <h2>Engagement & Bridal</h2>
                    <p>Make your special moment unforgettable with our stunning collection</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Diamond Rings</h3>
                        <p>Certified diamonds in classic and modern settings</p>
                    </div>
                    <div class="popup-item">
                        <h3>Wedding Bands</h3>
                        <p>Matching sets and individual wedding bands</p>
                    </div>
                    <div class="popup-item">
                        <h3>Bridal Sets</h3>
                        <p>Complete engagement and wedding ring sets</p>
                    </div>
                    <div class="popup-item">
                        <h3>Custom Proposals</h3>
                        <p>Design the perfect ring for your proposal</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Start Your Love Story</h3>
                </div>
            `;
            break;
        case 'coins':
            content = `
                <div class="popup-header">
                    <h2>Coins & Currency</h2>
                    <p>Rare collectibles, bullion, and historical currency pieces</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Gold Coins</h3>
                        <p>American Eagles, Krugerrands, and rare gold coins</p>
                    </div>
                    <div class="popup-item">
                        <h3>Silver Coins</h3>
                        <p>Morgan dollars, Peace dollars, and silver eagles</p>
                    </div>
                    <div class="popup-item">
                        <h3>Rare Currency</h3>
                        <p>Historical paper money and collectible bills</p>
                    </div>
                    <div class="popup-item">
                        <h3>Bullion</h3>
                        <p>Investment-grade precious metal bars and rounds</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Explore Our Collection</h3>
                </div>
            `;
            break;
    }
    
    popupBody.innerHTML = content;
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popup = document.getElementById('categoryPopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
document.getElementById('categoryPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// Close popup with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;
document.head.appendChild(style); 