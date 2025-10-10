/**
 * FitLog Transport Icons - JavaScript Controller
 * Gerencia os ícones animados de transportadora
 * 
 * @version 1.0.0
 * @author FitLog Design Team
 */

class TransportIcons {
    constructor() {
        this.icons = {
            truck: this.createTruckIcon(),
            package: this.createPackageIcon(),
            route: this.createRouteIcon(),
            delivery: this.createDeliveryIcon(),
            tracking: this.createTrackingIcon(),
            warehouse: this.createWarehouseIcon(),
            logistics: this.createLogisticsIcon()
        };
        
        this.init();
    }
    
    init() {
        this.injectIcons();
        this.setupAnimations();
        this.setupInteractions();
    }
    
    // ========================================
    // ICON CREATORS
    // ========================================
    
    createTruckIcon() {
        return `
            <svg viewBox="0 0 100 100" class="truck-icon">
                <!-- Truck Body -->
                <rect x="15" y="35" width="50" height="25" rx="3" fill="currentColor" class="truck-body"/>
                <!-- Truck Cab -->
                <rect x="65" y="30" width="20" height="30" rx="3" fill="currentColor"/>
                <!-- Wheels -->
                <circle cx="25" cy="70" r="8" fill="#333" class="truck-wheel"/>
                <circle cx="70" cy="70" r="8" fill="#333" class="truck-wheel"/>
                <!-- Wheel Centers -->
                <circle cx="25" cy="70" r="4" fill="#666"/>
                <circle cx="70" cy="70" r="4" fill="#666"/>
                <!-- Headlights -->
                <circle cx="85" cy="35" r="3" fill="#FFD700"/>
                <circle cx="85" cy="45" r="3" fill="#FFD700"/>
                <!-- Windshield -->
                <rect x="67" y="32" width="16" height="12" rx="2" fill="#87CEEB" opacity="0.7"/>
            </svg>
        `;
    }
    
    createPackageIcon() {
        return `
            <svg viewBox="0 0 100 100" class="package-icon">
                <!-- Package Box -->
                <rect x="20" y="30" width="60" height="40" rx="5" fill="currentColor"/>
                <!-- Package Tape -->
                <rect x="20" y="45" width="60" height="8" fill="#FFD700" opacity="0.8"/>
                <rect x="45" y="30" width="8" height="40" fill="#FFD700" opacity="0.8"/>
                <!-- Package Label -->
                <rect x="30" y="35" width="40" height="8" rx="2" fill="#FFF" opacity="0.9"/>
                <!-- Package Handle -->
                <path d="M 30 25 Q 50 15 70 25" stroke="#333" stroke-width="3" fill="none"/>
            </svg>
        `;
    }
    
    createRouteIcon() {
        return `
            <svg viewBox="0 0 100 100" class="route-icon">
                <!-- Route Line -->
                <path d="M 20 20 Q 30 10 40 20 Q 50 30 60 20 Q 70 10 80 20" 
                      stroke="currentColor" stroke-width="4" fill="none" 
                      stroke-dasharray="5,5" class="route-draw"/>
                <!-- Start Point -->
                <circle cx="20" cy="20" r="6" fill="#25D366"/>
                <!-- End Point -->
                <circle cx="80" cy="20" r="6" fill="#E31E24"/>
                <!-- Waypoints -->
                <circle cx="40" cy="20" r="4" fill="#FF6B35"/>
                <circle cx="60" cy="20" r="4" fill="#FF6B35"/>
                <!-- Direction Arrow -->
                <path d="M 75 15 L 80 20 L 75 25" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
        `;
    }
    
    createDeliveryIcon() {
        return `
            <svg viewBox="0 0 100 100" class="delivery-icon">
                <!-- Delivery Van -->
                <rect x="10" y="40" width="60" height="20" rx="3" fill="currentColor"/>
                <!-- Van Cab -->
                <rect x="70" y="35" width="20" height="25" rx="3" fill="currentColor"/>
                <!-- Wheels -->
                <circle cx="25" cy="70" r="6" fill="#333"/>
                <circle cx="75" cy="70" r="6" fill="#333"/>
                <!-- Delivery Box -->
                <rect x="20" y="30" width="15" height="15" rx="2" fill="#FF6B35"/>
                <!-- Delivery Person -->
                <circle cx="85" cy="25" r="4" fill="#FFD700"/>
                <rect x="82" y="29" width="6" height="8" fill="#1B365D"/>
                <!-- Speed Lines -->
                <path d="M 5 50 L 8 50" stroke="#FFD700" stroke-width="2"/>
                <path d="M 5 55 L 10 55" stroke="#FFD700" stroke-width="2"/>
                <path d="M 5 60 L 7 60" stroke="#FFD700" stroke-width="2"/>
            </svg>
        `;
    }
    
    createTrackingIcon() {
        return `
            <svg viewBox="0 0 100 100" class="tracking-icon">
                <!-- GPS Device -->
                <rect x="30" y="30" width="40" height="25" rx="5" fill="currentColor"/>
                <!-- Screen -->
                <rect x="35" y="35" width="30" height="15" rx="2" fill="#000"/>
                <!-- GPS Signal -->
                <path d="M 50 20 Q 50 10 60 20 Q 50 30 40 20 Q 50 10 50 20" 
                      stroke="#25D366" stroke-width="2" fill="none"/>
                <!-- Location Pin -->
                <path d="M 50 50 L 50 70 L 45 65 L 50 70 L 55 65 Z" fill="#E31E24"/>
                <circle cx="50" cy="50" r="4" fill="#E31E24"/>
                <!-- Signal Waves -->
                <circle cx="50" cy="50" r="15" stroke="#25D366" stroke-width="1" fill="none" opacity="0.5"/>
                <circle cx="50" cy="50" r="25" stroke="#25D366" stroke-width="1" fill="none" opacity="0.3"/>
            </svg>
        `;
    }
    
    createWarehouseIcon() {
        return `
            <svg viewBox="0 0 100 100" class="warehouse-icon">
                <!-- Warehouse Building -->
                <rect x="20" y="40" width="60" height="40" fill="currentColor"/>
                <!-- Roof -->
                <polygon points="15,40 50,20 85,40" fill="#FF6B35"/>
                <!-- Doors -->
                <rect x="35" y="60" width="15" height="20" fill="#333"/>
                <rect x="50" y="60" width="15" height="20" fill="#333"/>
                <!-- Windows -->
                <rect x="25" y="50" width="8" height="8" fill="#87CEEB"/>
                <rect x="67" y="50" width="8" height="8" fill="#87CEEB"/>
                <!-- Loading Dock -->
                <rect x="15" y="75" width="70" height="5" fill="#666"/>
                <!-- Trucks -->
                <rect x="10" y="70" width="8" height="5" fill="#1B365D"/>
                <rect x="82" y="70" width="8" height="5" fill="#1B365D"/>
            </svg>
        `;
    }
    
    createLogisticsIcon() {
        return `
            <svg viewBox="0 0 100 100" class="logistics-icon">
                <!-- Central Hub -->
                <circle cx="50" cy="50" r="15" fill="currentColor"/>
                <!-- Connection Lines -->
                <line x1="50" y1="35" x2="50" y2="20" stroke="#25D366" stroke-width="3"/>
                <line x1="65" y1="50" x2="80" y2="50" stroke="#25D366" stroke-width="3"/>
                <line x1="50" y1="65" x2="50" y2="80" stroke="#25D366" stroke-width="3"/>
                <line x1="35" y1="50" x2="20" y2="50" stroke="#25D366" stroke-width="3"/>
                <!-- Connection Points -->
                <circle cx="50" cy="20" r="6" fill="#FF6B35"/>
                <circle cx="80" cy="50" r="6" fill="#FF6B35"/>
                <circle cx="50" cy="80" r="6" fill="#FF6B35"/>
                <circle cx="20" cy="50" r="6" fill="#FF6B35"/>
                <!-- Data Flow -->
                <circle cx="50" cy="30" r="2" fill="#FFD700">
                    <animate attributeName="cy" values="30;20;30" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="60" cy="50" r="2" fill="#FFD700">
                    <animate attributeName="cx" values="60;80;60" dur="2s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
    }
    
    // ========================================
    // INJECTION AND SETUP
    // ========================================
    
    injectIcons() {
        // Inject truck logo
        const truckLogo = document.querySelector('.truck-logo');
        if (truckLogo) {
            truckLogo.innerHTML = this.icons.truck;
        }
        
        // Inject service icons
        const serviceIcons = document.querySelectorAll('.transport-icon');
        serviceIcons.forEach((icon, index) => {
            const iconTypes = ['truck', 'package', 'route', 'delivery', 'tracking', 'warehouse', 'logistics'];
            const iconType = iconTypes[index % iconTypes.length];
            icon.innerHTML = this.icons[iconType];
        });
    }
    
    setupAnimations() {
        // Add intersection observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            });
        });
        
        // Observe all transport icons
        document.querySelectorAll('.transport-icon, .truck-logo').forEach(icon => {
            observer.observe(icon);
        });
    }
    
    setupInteractions() {
        // Add click interactions
        document.querySelectorAll('.transport-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                this.animateIcon(icon);
            });
            
            icon.addEventListener('mouseenter', () => {
                this.highlightIcon(icon);
            });
            
            icon.addEventListener('mouseleave', () => {
                this.unhighlightIcon(icon);
            });
        });
    }
    
    // ========================================
    // ANIMATION METHODS
    // ========================================
    
    animateIcon(icon) {
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    }
    
    highlightIcon(icon) {
        icon.style.filter = 'brightness(1.2) saturate(1.3)';
        icon.style.transform = 'scale(1.05)';
    }
    
    unhighlightIcon(icon) {
        icon.style.filter = 'brightness(1) saturate(1)';
        icon.style.transform = 'scale(1)';
    }
    
    // ========================================
    // UTILITY METHODS
    // ========================================
    
    getIcon(iconType) {
        return this.icons[iconType] || this.icons.truck;
    }
    
    createCustomIcon(svgContent) {
        return `<svg viewBox="0 0 100 100">${svgContent}</svg>`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.transportIcons = new TransportIcons();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TransportIcons;
}
