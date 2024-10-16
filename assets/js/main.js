// Chatbot functionality




// Contact Form EmailJS Integration
(function() {
    emailjs.init({
        publicKey: "fRKYh4Zl-93Imlf9l", // Your Public Key
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.error(`Element with id "${targetId}" not found`);
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Generate a random contact number
            this.contact_number.value = Math.random() * 100000 | 0;

            const submitButton = this.querySelector('input[type="submit"]');
            const originalButtonText = submitButton.value;
            submitButton.value = 'Sending...';
            submitButton.disabled = true;

            emailjs.sendForm('service_7d9sqh9', 'template_5jzdyqt', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Your message has been sent successfully!', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showNotification('There was an error sending your message. Please try again.', 'error');
                })
                .finally(function() {
                    submitButton.value = originalButtonText;
                    submitButton.disabled = false;
                });
        });

        function showNotification(message, type) {
            const notification = document.getElementById('email-notification');
            if (notification) {
                notification.textContent = message;
                notification.className = type;
                notification.style.display = 'block';

                setTimeout(() => {
                    notification.style.display = 'none';
                }, 5000);
            } else {
                console.warn('Notification element not found');
                alert(message);
            }
        }
    } else {
        console.error('Contact form not found');
    }
});

// Close modal on overlay click (if modal exists in your project)
document.querySelector('.modal-overlay')?.addEventListener('click', function() {
    document.getElementById('contactModal')?.classList.remove('show');
    this.classList.remove('show');
});





// Toggle additional details on hover
document.querySelectorAll('.info-block').forEach(block => {
    block.addEventListener('mouseover', function() {
        const details = this.querySelector('p');
        if (details) {
            details.style.display = 'block'; // Show details on hover
        }
    });

    block.addEventListener('mouseout', function() {
        const details = this.querySelector('p');
        if (details) {
            details.style.display = 'none'; // Hide details on mouse out
        }
    });
});

// Optional: Add a button to collapse/expand sections if needed
document.querySelectorAll('.info-block h2').forEach(header => {
    header.addEventListener('click', function() {
        const details = this.nextElementSibling;
        if (details.style.display === 'none' || details.style.display === '') {
            details.style.display = 'block'; // Show details
        } else {
            details.style.display = 'none'; // Hide details
        }
    });
});
