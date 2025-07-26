// ===============================
// GOLDEN HUNT JEWELRY - LUXURY ANIMATIONS
// ===============================

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to day mode
const savedTheme = localStorage.getItem('theme') || 'day';
body.classList.toggle('night-mode', savedTheme === 'night');

// Initialize navbar theme on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarTheme();
});

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('night-mode');
    const currentTheme = body.classList.contains('night-mode') ? 'night' : 'day';
    localStorage.setItem('theme', currentTheme);
    
    // Update navbar theme immediately after toggle
    updateNavbarTheme();
    
    // Add smooth transition effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

// Initialize scroll to top button as hidden
scrollToTopBtn.classList.remove('visible');

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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

// Function to update navbar theme colors
function updateNavbarTheme() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isNightMode = body.classList.contains('night-mode');
    
    // Remove any inline styles that might interfere with CSS
    navbar.style.background = '';
    navbar.style.boxShadow = '';
    
    // Add/remove classes for scrolled state instead of inline styles
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update navbar theme classes
    updateNavbarTheme();
    
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

// Enhanced mobile video handling
function setupMobileVideo() {
    const video = document.querySelector('.hero-video-bg video');
    if (!video) return;
    
    // Remove any controls attributes that might appear
    video.removeAttribute('controls');
    video.controls = false;
    
    // Force playsinline for mobile devices (except Firefox)
    if (!navigator.userAgent.includes('Firefox')) {
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
    }
    
    // Disable context menu on video
    video.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Prevent video from being clicked/tapped
    video.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    // Prevent touch events on video
    video.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    // Ensure video plays on mobile
    video.addEventListener('loadedmetadata', () => {
        video.muted = true;
        video.play().catch(err => {
            console.log('Video autoplay was prevented:', err);
            // Create fallback static background if video fails
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.background = 'linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 50%, #0A0A0A 100%)';
            }
        });
    });
    
    // Monitor for any unwanted control appearances
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'controls') {
                video.removeAttribute('controls');
                video.controls = false;
            }
        });
    });
    
    observer.observe(video, { attributes: true, attributeFilter: ['controls'] });
}

// Initialize mobile video setup when DOM is loaded
document.addEventListener('DOMContentLoaded', setupMobileVideo);

// Additional mobile detection and handling
if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.addEventListener('DOMContentLoaded', () => {
        const video = document.querySelector('.hero-video-bg video');
        if (video) {
            // Additional mobile-specific attributes
            video.style.pointerEvents = 'none';
            video.style.touchAction = 'none';
            
            // Ensure video container doesn't interfere
            const videoContainer = document.querySelector('.hero-video-bg');
            if (videoContainer) {
                videoContainer.style.pointerEvents = 'none';
                videoContainer.style.touchAction = 'none';
            }
        }
    });
}

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
        case 'goldbars':
            content = `
                <div class="popup-header">
                    <h2>Gold Bars</h2>
                    <p>Premium investment-grade gold bullion bars and ingots</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>1 oz Gold Bars</h3>
                        <p>Perfect for smaller investments and gifts</p>
                    </div>
                    <div class="popup-item">
                        <h3>10 oz Gold Bars</h3>
                        <p>Mid-range investment with excellent liquidity</p>
                    </div>
                    <div class="popup-item">
                        <h3>1 kg Gold Bars</h3>
                        <p>Large investment bars with certified purity</p>
                    </div>
                    <div class="popup-item">
                        <h3>PAMP Suisse & Credit Suisse</h3>
                        <p>World-renowned Swiss refiners with assay cards</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Invest in Physical Gold Today</h3>
                </div>
            `;
            break;
        case 'gemstones':
            content = `
                <div class="popup-header">
                    <h2>Precious Gemstones</h2>
                    <p>Exquisite collection of certified precious and semi-precious stones</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Rubies & Sapphires</h3>
                        <p>Natural and heated stones with certification</p>
                    </div>
                    <div class="popup-item">
                        <h3>Emeralds</h3>
                        <p>Colombian, Zambian, and Brazilian emeralds</p>
                    </div>
                    <div class="popup-item">
                        <h3>Tanzanite & Tourmaline</h3>
                        <p>Rare and exotic gemstones for collectors</p>
                    </div>
                    <div class="popup-item">
                        <h3>Pearls</h3>
                        <p>Natural saltwater and freshwater pearls</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Explore Our Gemstone Collection</h3>
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
        closeServicePopup();
    }
});

// Service card popup functionality
function openServicePopup(service) {
    const popup = document.getElementById('servicePopup');
    const popupBody = document.getElementById('servicePopupBody');
    
    let content = '';
    
    switch(service) {
        case 'diamonds':
            content = `
                <div class="popup-header">
                    <h2>💎 Diamonds & Gemstones</h2>
                    <p>GIA certified appraisals, fair market pricing, immediate cash offers</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>All Carat Sizes</h3>
                        <p>From small accent stones to large statement pieces</p>
                    </div>
                    <div class="popup-item">
                        <h3>Certified & Uncertified</h3>
                        <p>We evaluate both certified and uncertified diamonds</p>
                    </div>
                    <div class="popup-item">
                        <h3>Loose or Mounted</h3>
                        <p>Whether your diamonds are set in jewelry or loose stones</p>
                    </div>
                    <div class="popup-item">
                        <h3>Expert Evaluation</h3>
                        <p>Professional grading using industry standard methods</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Get Your Diamond Appraised Today</h3>
                    <p>Visit our store for a professional evaluation</p>
                </div>
            `;
            break;
        case 'gold':
            content = `
                <div class="popup-header">
                    <h2>🏆 Gold & Platinum</h2>
                    <p>Current market rates, professional testing, transparent pricing</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>10K, 14K, 18K, 24K</h3>
                        <p>All karat weights accepted with accurate testing</p>
                    </div>
                    <div class="popup-item">
                        <h3>Broken or Unwanted Pieces</h3>
                        <p>Even damaged jewelry has value - we buy it all</p>
                    </div>
                    <div class="popup-item">
                        <h3>Coins & Bullion</h3>
                        <p>Gold and silver coins, bars, and investment pieces</p>
                    </div>
                    <div class="popup-item">
                        <h3>Platinum Jewelry</h3>
                        <p>Premium prices for platinum pieces and settings</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Get Current Market Value</h3>
                    <p>Bring your gold and platinum for immediate evaluation</p>
                </div>
            `;
            break;
        case 'watches':
            content = `
                <div class="popup-header">
                    <h2>⌚ Luxury Watches</h2>
                    <p>Rolex, Cartier, Omega specialists with authenticated valuations</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Swiss Luxury Brands</h3>
                        <p>Rolex, Patek Philippe, Audemars Piguet, and more</p>
                    </div>
                    <div class="popup-item">
                        <h3>Vintage Timepieces</h3>
                        <p>Collectible and rare vintage watches of all eras</p>
                    </div>
                    <div class="popup-item">
                        <h3>Working or Non-Working</h3>
                        <p>We buy luxury watches in any condition</p>
                    </div>
                    <div class="popup-item">
                        <h3>Authentication Service</h3>
                        <p>Expert authentication and valuation services</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Watch Appraisal Experts</h3>
                    <p>Get your luxury timepiece professionally evaluated</p>
                </div>
            `;
            break;
        case 'goldbars-buy':
            content = `
                <div class="popup-header">
                    <h2>🏆 We Buy Gold Bars</h2>
                    <p>Top prices for all sizes of gold bullion bars and ingots</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>All Sizes Accepted</h3>
                        <p>From 1 gram to 1 kilogram bars - we buy them all</p>
                    </div>
                    <div class="popup-item">
                        <h3>Certified & Assayed</h3>
                        <p>PAMP, Credit Suisse, Royal Canadian Mint, and more</p>
                    </div>
                    <div class="popup-item">
                        <h3>Current Market Rates</h3>
                        <p>Fair pricing based on live gold spot prices</p>
                    </div>
                    <div class="popup-item">
                        <h3>Immediate Payment</h3>
                        <p>Cash on the spot for verified gold bars</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Get Your Gold Bars Appraised</h3>
                    <p>Bring your gold bars for professional evaluation</p>
                </div>
            `;
            break;
        case 'gemstones-buy':
            content = `
                <div class="popup-header">
                    <h2>💎 We Buy Gemstones</h2>
                    <p>Expert evaluation and fair pricing for all precious and semi-precious stones</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Precious Stones</h3>
                        <p>Rubies, sapphires, emeralds - certified and uncertified</p>
                    </div>
                    <div class="popup-item">
                        <h3>Semi-Precious Stones</h3>
                        <p>Tanzanite, tourmaline, garnet, and more</p>
                    </div>
                    <div class="popup-item">
                        <h3>Pearls</h3>
                        <p>Natural and cultured pearls of all varieties</p>
                    </div>
                    <div class="popup-item">
                        <h3>Estate Gemstone Jewelry</h3>
                        <p>Vintage and antique pieces with gemstones</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Gemstone Appraisal Service</h3>
                    <p>Bring your gemstones for professional evaluation</p>
                </div>
            `;
            break;
    }
    
    popupBody.innerHTML = content;
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeServicePopup() {
    const popup = document.getElementById('servicePopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close service popup when clicking outside
document.getElementById('servicePopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closeServicePopup();
    }
});

// ===============================
// INTELLIGENT CHATBOT SYSTEM
// ===============================

class GoldenHuntChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.conversationStage = 'greeting';
        this.userIntent = null;
        this.userName = null;
        
        this.initializeElements();
        this.bindEvents();
        this.initializeKnowledgeBase();
    }
    
    initializeElements() {
        this.chatToggle = document.getElementById('chatToggle');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.chatMinimize = document.getElementById('chatMinimize');
        this.quickActions = document.querySelectorAll('.quick-action');
    }
    
    bindEvents() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.chatMinimize.addEventListener('click', () => this.toggleChat());
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        this.quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const actionType = action.getAttribute('data-action');
                this.handleQuickAction(actionType);
            });
        });
    }
    
    initializeKnowledgeBase() {
        this.businessInfo = {
            name: "Golden Hunt Jewelry",
            locations: {
                colorado: {
                    address: "123 Luxury Lane, Colorado Springs, CO 80901",
                    phone: "(719) 555-0123",
                    hours: {
                        weekday: "Monday - Friday: 9:00 AM - 7:00 PM",
                        saturday: "Saturday: 9:00 AM - 6:00 PM", 
                        sunday: "Sunday: 11:00 AM - 5:00 PM"
                    }
                },
                edinburgh: {
                    address: "45 Royal Mile, Edinburgh, Scotland EH1 1RE",
                    phone: "+44 131 555-0789",
                    hours: {
                        weekday: "Monday - Friday: 10:00 AM - 6:00 PM",
                        saturday: "Saturday: 10:00 AM - 5:00 PM",
                        sunday: "Sunday: 12:00 PM - 4:00 PM"
                    }
                }
            },
            services: {
                buying: ["diamonds", "gemstones", "gold", "platinum", "luxury watches", "gold bars", "coins", "jewelry"],
                selling: ["fine jewelry", "engagement rings", "bridal sets", "wedding bands", "gold bars", "precious gemstones", "collectible coins", "luxury timepieces"],
                specialties: ["GIA certified appraisals", "custom jewelry design", "watch authentication", "estate jewelry", "investment grade bullion"]
            },
            experience: "25+ years",
            stats: {
                experience: "25+ Years",
                purchased: "$10M+ Jewelry Purchased",
                clients: "5000+ Happy Clients",
                rating: "A+ BBB Rating"
            }
        };
        
        this.conversationPatterns = {
            greetings: [
                "Hello! Welcome to Golden Hunt Jewelry. How can I help you today?",
                "Hi there! I'm here to assist you with any questions about our jewelry services.",
                "Welcome! I'd be happy to help you with information about buying or selling jewelry."
            ],
            responses: {
                buying: {
                    general: "We buy all types of jewelry and precious items! We specialize in diamonds, gold, platinum, luxury watches, gemstones, and gold bars. Our expert appraisers provide fair market pricing with immediate cash offers.",
                    process: "Our buying process is simple: bring your items to either of our locations, we'll provide a professional appraisal, and you'll receive an immediate cash offer. No appointment necessary!",
                    items: "We purchase diamonds (certified & uncertified), gold jewelry (10K-24K), platinum pieces, luxury watches (Rolex, Cartier, Omega), gemstones, gold bars, collectible coins, and estate jewelry."
                },
                selling: {
                    general: "Our collection includes fine jewelry, engagement rings, bridal sets, gold bars, precious gemstones, and collectible coins. We also offer custom design services for unique pieces.",
                    engagement: "We have a stunning selection of engagement rings and bridal sets. Our certified diamonds come in various cuts and settings, and we offer custom design services for your perfect ring.",
                    custom: "Our skilled craftsmen can create custom pieces to your exact specifications. From engagement rings to anniversary gifts, we'll bring your vision to life."
                },
                hours: "Our Colorado Springs store is open Monday-Friday 9AM-7PM, Saturday 9AM-6PM, and Sunday 11AM-5PM. Our Edinburgh location is open Monday-Friday 10AM-6PM, Saturday 10AM-5PM, and Sunday 12PM-4PM.",
                locations: "We have two convenient locations: our flagship store in Colorado Springs at 123 Luxury Lane, and our UK branch in Edinburgh at 45 Royal Mile.",
                contact: "You can reach our Colorado Springs store at (719) 555-0123 or visit our Edinburgh location at +44 131 555-0789. We're also happy to answer questions via email."
            }
        };
        
        this.keywordMap = {
            // Buying related
            'buy': 'buying', 'sell my': 'buying', 'selling': 'buying', 'appraisal': 'buying', 
            'gold': 'buying', 'diamond': 'buying', 'watch': 'buying', 'jewelry': 'buying',
            'platinum': 'buying', 'gemstone': 'buying', 'coin': 'buying', 'bar': 'buying',
            
            // Selling/Products related  
            'engagement': 'selling', 'wedding': 'selling', 'ring': 'selling', 'purchase': 'selling',
            'collection': 'selling', 'custom': 'selling', 'design': 'selling',
            
            // Information related
            'hours': 'hours', 'open': 'hours', 'time': 'hours', 'when': 'hours',
            'location': 'locations', 'address': 'locations', 'where': 'locations',
            'phone': 'contact', 'email': 'contact', 'contact': 'contact', 'call': 'contact',
            
            // Greetings
            'hello': 'greeting', 'hi': 'greeting', 'hey': 'greeting', 'good': 'greeting'
        };
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatToggle.classList.toggle('active', this.isOpen);
        this.chatContainer.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.chatInput.focus();
        }
    }
    
    async sendMessage() {
        const userInput = this.chatInput.value.trim();
        if (!userInput || this.isTyping) return;
        
        this.addMessage(userInput, 'user');
        this.chatInput.value = '';
        
        await this.processUserMessage(userInput);
    }
    
    addMessage(content, sender = 'bot', isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '👨‍💼' : '👤';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (isHTML) {
            messageContent.innerHTML = content;
        } else {
            const paragraphs = content.split('\n').filter(p => p.trim());
            paragraphs.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                messageContent.appendChild(p);
            });
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
    }
    
    async processUserMessage(userInput) {
        this.showTyping();
        
        // Detect user intent
        const intent = this.detectIntent(userInput.toLowerCase());
        
        // Generate contextual response
        const response = await this.generateResponse(userInput, intent);
        
        // Simulate thinking time
        await this.delay(1000 + Math.random() * 1000);
        
        this.hideTyping();
        this.addMessage(response.text, 'bot', response.isHTML);
        
        // Follow up if needed
        if (response.followUp) {
            await this.delay(1500);
            this.showTyping();
            await this.delay(800);
            this.hideTyping();
            this.addMessage(response.followUp, 'bot');
        }
    }
    
    detectIntent(input) {
        // Check for name introduction
        if (input.includes('my name is') || input.includes("i'm ") || input.includes('call me')) {
            const nameMatch = input.match(/(?:my name is|i'm|call me)\s+([a-zA-Z]+)/);
            if (nameMatch) {
                this.userName = nameMatch[1];
                return 'introduction';
            }
        }
        
        // Check keywords for intent
        for (const [keyword, intent] of Object.entries(this.keywordMap)) {
            if (input.includes(keyword)) {
                return intent;
            }
        }
        
        // Check for questions
        if (input.includes('?') || input.startsWith('how') || input.startsWith('what') || 
            input.startsWith('where') || input.startsWith('when') || input.startsWith('can')) {
            return 'question';
        }
        
        return 'general';
    }
    
    async generateResponse(userInput, intent) {
        const input = userInput.toLowerCase();
        
        switch (intent) {
            case 'introduction':
                return {
                    text: `Nice to meet you, ${this.userName}! I'm here to help you with any questions about Golden Hunt Jewelry. Are you interested in buying or selling jewelry today?`
                };
                
            case 'buying':
                if (input.includes('diamond')) {
                    return {
                        text: "We're diamond specialists! We buy certified and uncertified diamonds of all sizes, whether they're loose stones or set in jewelry. Our GIA certified gemologists provide expert evaluations.",
                        followUp: "Would you like to know about our appraisal process or get information about visiting one of our stores?"
                    };
                } else if (input.includes('gold')) {
                    return {
                        text: "We purchase all types of gold jewelry - 10K, 14K, 18K, and 24K. Even broken or unwanted pieces have value! We also buy gold coins and bars at current market rates.",
                        followUp: "Bring your gold items to either of our locations for immediate evaluation and cash offers."
                    };
                } else if (input.includes('watch')) {
                    return {
                        text: "We specialize in luxury timepieces! Rolex, Cartier, Omega, Patek Philippe - we buy them all, whether working or non-working. Our watch experts provide authenticated valuations.",
                        followUp: "Do you have a specific brand or model you'd like to sell?"
                    };
                } else {
                    return {
                        text: this.conversationPatterns.responses.buying.general,
                        followUp: "What type of item are you looking to sell? I can provide specific information about our buying process."
                    };
                }
                
            case 'selling':
                if (input.includes('engagement') || input.includes('ring')) {
                    return {
                        text: this.conversationPatterns.responses.selling.engagement,
                        followUp: "I'd recommend visiting our stores to see our collection in person. Would you like our location details?"
                    };
                } else if (input.includes('custom')) {
                    return {
                        text: this.conversationPatterns.responses.selling.custom,
                        followUp: "Our design consultations are complimentary. Would you like to schedule a visit to discuss your custom piece?"
                    };
                } else {
                    return {
                        text: this.conversationPatterns.responses.selling.general,
                        followUp: "What type of jewelry interests you most? I can provide more specific information."
                    };
                }
                
            case 'hours':
                return {
                    text: this.conversationPatterns.responses.hours,
                    followUp: "Which location would you prefer to visit? I can provide directions and additional details."
                };
                
            case 'locations':
                return {
                    text: this.conversationPatterns.responses.locations,
                    followUp: "Both locations offer the same expert services and fair pricing. Would you like specific contact information for either store?"
                };
                
            case 'contact':
                return {
                    text: `<p><strong>Colorado Springs:</strong> ${this.businessInfo.locations.colorado.phone}</p>
                           <p><strong>Edinburgh:</strong> ${this.businessInfo.locations.edinburgh.phone}</p>
                           <p>Our expert staff is available during business hours to assist with appraisals, purchases, and consultations.</p>`,
                    isHTML: true,
                    followUp: "Feel free to call ahead if you're planning a visit or have specific questions about items you'd like to sell."
                };
                
            case 'greeting':
                return {
                    text: this.getRandomGreeting() + " Are you interested in buying jewelry, selling items, or do you have questions about our services?"
                };
                
            case 'question':
                return this.handleQuestionIntent(input);
                
            default:
                return {
                    text: "I'd be happy to help you with information about Golden Hunt Jewelry! We're specialists in buying and selling luxury jewelry, diamonds, gold, and timepieces.",
                    followUp: "What specifically would you like to know about? Our services, locations, or perhaps you have items to sell?"
                };
        }
    }
    
    handleQuestionIntent(input) {
        if (input.includes('experience') || input.includes('long')) {
            return {
                text: `We've been serving clients for over ${this.businessInfo.experience} with locations in both Colorado Springs and Edinburgh. We've purchased over $10M in jewelry and served 5000+ satisfied clients.`,
                followUp: "Our expertise and reputation are backed by our A+ BBB rating and GIA certified staff."
            };
        } else if (input.includes('authentic') || input.includes('real')) {
            return {
                text: "Absolutely! We use professional testing methods and have GIA certified gemologists on staff. All our evaluations follow industry standards for authenticity and valuation.",
                followUp: "We're fully licensed, insured, and maintain transparent pricing based on current market values."
            };
        } else if (input.includes('appointment')) {
            return {
                text: "No appointment necessary! You can visit either of our locations during business hours with your items. Our expert staff will provide immediate evaluations.",
                followUp: "However, if you prefer to call ahead or have questions about specific items, we're always happy to chat: (719) 555-0123 or +44 131 555-0789."
            };
        } else {
            return {
                text: "I'm here to help answer any questions about Golden Hunt Jewelry! We specialize in buying and selling luxury jewelry with expert appraisals and fair pricing.",
                followUp: "What would you like to know more about? Our services, locations, or the buying/selling process?"
            };
        }
    }
    
    handleQuickAction(actionType) {
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            
            switch (actionType) {
                case 'hours':
                    this.addMessage(`<p><strong>Store Hours:</strong></p>
                                   <p><strong>Colorado Springs:</strong><br>
                                   ${this.businessInfo.locations.colorado.hours.weekday}<br>
                                   ${this.businessInfo.locations.colorado.hours.saturday}<br>
                                   ${this.businessInfo.locations.colorado.hours.sunday}</p>
                                   
                                   <p><strong>Edinburgh:</strong><br>
                                   ${this.businessInfo.locations.edinburgh.hours.weekday}<br>
                                   ${this.businessInfo.locations.edinburgh.hours.saturday}<br>
                                   ${this.businessInfo.locations.edinburgh.hours.sunday}</p>`, 'bot', true);
                    break;
                    
                case 'services':
                    this.addMessage(`<p><strong>Our Services:</strong></p>
                                   <p><strong>We Buy:</strong> Diamonds, Gold, Platinum, Luxury Watches, Gemstones, Gold Bars, Collectible Coins</p>
                                   <p><strong>We Sell:</strong> Fine Jewelry, Engagement Rings, Wedding Bands, Gold Bars, Precious Gemstones</p>
                                   <p><strong>Specialties:</strong> GIA Certified Appraisals, Custom Design, Watch Authentication, Estate Jewelry</p>`, 'bot', true);
                    break;
                    
                case 'contact':
                    this.addMessage(`<p><strong>Contact Information:</strong></p>
                                   <p><strong>Colorado Springs:</strong><br>
                                   📍 ${this.businessInfo.locations.colorado.address}<br>
                                   📞 ${this.businessInfo.locations.colorado.phone}</p>
                                   
                                   <p><strong>Edinburgh:</strong><br>
                                   📍 ${this.businessInfo.locations.edinburgh.address}<br>
                                   📞 ${this.businessInfo.locations.edinburgh.phone}</p>`, 'bot', true);
                    break;
            }
            
            setTimeout(() => {
                this.addMessage("Is there anything specific you'd like to know more about? I'm here to help!");
            }, 1000);
            
        }, 800);
    }
    
    getRandomGreeting() {
        return this.conversationPatterns.greetings[Math.floor(Math.random() * this.conversationPatterns.greetings.length)];
    }
    
    showTyping() {
        if (this.isTyping) return;
        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">👨‍💼</div>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.isTyping = false;
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.goldenHuntChatbot = new GoldenHuntChatbot();
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
    
    body.night-mode .nav-links.active {
        background: rgba(26, 26, 26, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    body.night-mode .nav-links.active a {
        color: #FFFFFF !important;
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