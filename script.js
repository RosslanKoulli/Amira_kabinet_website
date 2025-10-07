// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form submission
document.getElementById('quickBooking').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    
    // Here you would integrate with Superdoc.bg API
    // For demo purposes, we'll show a success message
    alert('Appointment request received! We will contact you shortly to confirm.\n\nIntegration Note: This form would connect to Superdoc.bg API for real-time booking.');
    
    // Reset form
    this.reset();
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.service-card, .feature, .team-member, .tech-item').forEach(el => {
    observer.observe(el);
});

// Dynamic date for minimum booking date (tomorrow)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    dateInput.min = tomorrow.toISOString().split('T')[0];
    
    // Set max date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];
}

// Add loading state to buttons
document.querySelectorAll('.cta-button, .btn-primary, .submit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.type !== 'submit') {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }
    });
});

// Simulated Superdoc.bg Integration
class SuperdocIntegration {
    constructor() {
        this.apiEndpoint = 'https://api.superdoc.bg/v1/';
        this.clinicId = 'DEMO_CLINIC_ID';
        this.apiKey = 'DEMO_API_KEY';
    }

    async checkAvailability(date, service) {
        // This would make actual API call to Superdoc.bg
        console.log('Checking availability with Superdoc.bg:', { date, service });
        
        // Simulated response
        return {
            available: true,
            slots: ['09:00', '10:30', '14:00', '15:30', '17:00'],
            message: 'Available slots fetched from Superdoc.bg'
        };
    }

    async bookAppointment(patientData) {
        // This would send booking request to Superdoc.bg
        console.log('Sending booking request to Superdoc.bg:', patientData);
        
        // Simulated response
        return {
            success: true,
            confirmationNumber: 'SD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            message: 'Appointment confirmed via Superdoc.bg'
        };
    }

    async syncPatientRecords(patientId) {
        // This would sync patient records with Superdoc.bg
        console.log('Syncing patient records with Superdoc.bg:', patientId);
        
        return {
            success: true,
            message: 'Patient records synced successfully'
        };
    }

    async getUpcomingAppointments(patientId) {
        // Fetch upcoming appointments from Superdoc.bg
        console.log('Fetching appointments from Superdoc.bg for patient:', patientId);
        
        return {
            appointments: [
                {
                    date: '2024-01-15',
                    time: '14:00',
                    doctor: 'Dr. Petrov',
                    service: 'General Checkup'
                }
            ]
        };
    }

    async cancelAppointment(appointmentId) {
        // Cancel appointment through Superdoc.bg
        console.log('Cancelling appointment:', appointmentId);
        
        return {
            success: true,
            message: 'Appointment cancelled successfully'
        };
    }

    async updatePatientInfo(patientId, data) {
        // Update patient information in Superdoc.bg
        console.log('Updating patient info:', { patientId, data });
        
        return {
            success: true,
            message: 'Patient information updated'
        };
    }
}

// Initialize Superdoc integration
const superdoc = new SuperdocIntegration();

// Example: Check availability when date is selected
const dateField = document.querySelector('input[type="date"]');
if (dateField) {
    dateField.addEventListener('change', async function() {
        const service = document.querySelector('select').value;
        if (service && this.value) {
            const availability = await superdoc.checkAvailability(this.value, service);
            console.log('Superdoc.bg Availability:', availability);
        }
    });
}

// Console messages for developers
console.log('%c🦷 DentalCare Pro - Connected to Superdoc.bg', 'color: #0891B2; font-size: 16px; font-weight: bold;');
console.log('%cFor production integration with Superdoc.bg, you would need:', 'color: #666;');
console.log('%c- Valid API credentials from Superdoc.bg', 'color: #666;');
console.log('%c- OAuth 2.0 authentication setup', 'color: #666;');
console.log('%c- Webhook endpoints for real-time updates', 'color: #666;');
console.log('%c- HIPAA-compliant data handling', 'color: #666;');
console.log('%c- SSL certificate for secure data transmission', 'color: #666;');

