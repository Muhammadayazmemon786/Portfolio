// --- 1. Typing Animation Logic ---
        const roles = ["Mern Stack Web Developer", "WordPress Developer", "Graphic Designer"];
        const typingElement = document.querySelector('.typing-text');
        let roleIndex = 0, charIndex = 0, isDeleting = false;
        const typingSpeed = 100, deletingSpeed = 50, delayAfterDelete = 500, delayAfterComplete = 2000;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            let typeDelay = isDeleting ? deletingSpeed : typingSpeed;
            if (!isDeleting && charIndex === currentRole.length) {
                typeDelay = delayAfterComplete; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typeDelay = delayAfterDelete;
            }
            setTimeout(type, typeDelay);
        }
        document.addEventListener('DOMContentLoaded', type);

        // --- 2. Theme Toggle (Tailwind Dark Mode) ---
        const themeToggleBtn = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement; 
        const iconMoon = themeToggleBtn.querySelector('.dark-icon');
        const iconSun = themeToggleBtn.querySelector('.light-icon');

        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark'); 
            
            if (htmlElement.classList.contains('dark')) {
                // Switch to Dark Mode
                htmlElement.classList.remove('bg-white', 'text-black');
                htmlElement.classList.add('bg-[#0c0c0c]', 'text-[#e6f1ff]');
                
                iconMoon.classList.remove('hidden');
                iconSun.classList.add('hidden');
            } else {
                // Switch to Light Mode
                htmlElement.classList.remove('bg-[#0c0c0c]', 'text-[#e6f1ff]');
                htmlElement.classList.add('bg-white', 'text-black');

                iconMoon.classList.add('hidden');
                iconSun.classList.remove('hidden');
            }
        });

        // --- 3. Resume Modal Logic ---
        const resumeBtn = document.getElementById('resume-btn');
        const resumeOverlay = document.getElementById('resume-overlay');
        const closeResumeBtn = document.getElementById('close-resume');
        const resumeCard = document.querySelector('.resume-card');

        function openModal() {
            resumeOverlay.classList.remove('pointer-events-none', 'opacity-0');
            resumeCard.classList.remove('scale-90');
            resumeCard.classList.add('scale-100');
        }

        function closeModal() {
            resumeOverlay.classList.add('opacity-0');
            resumeCard.classList.remove('scale-100');
            resumeCard.classList.add('scale-90');
            setTimeout(() => {
                resumeOverlay.classList.add('pointer-events-none');
            }, 300);
        }

        resumeBtn.addEventListener('click', openModal);
        closeResumeBtn.addEventListener('click', closeModal);
        
        resumeOverlay.addEventListener('click', (e) => {
            if (e.target === resumeOverlay) closeModal();
        });

        // --- 4. RESUME DOWNLOAD LOGIC ---
        const downloadBtn = document.getElementById('download-pdf-btn');

        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const element = document.querySelector('.resume-card');
            const closeBtn = document.querySelector('.close-btn');
            const dlBtn = document.querySelector('.download-btn');

            closeBtn.style.opacity = '0';
            dlBtn.style.opacity = '0';

            const opt = {
                margin:       0,
                filename:     'Madiha_Noor_Resume.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(element).save().then(() => {
                setTimeout(() => {
                    closeBtn.style.opacity = '1';
                    dlBtn.style.opacity = '1';
                }, 1000);
            });
        });

        // --- 5. PROJECTS FILTER LOGIC ---
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('bg-brand', 'text-black', 'shadow-[0_0_15px_#00ff00]');
                    b.classList.add('border-brand', 'text-brand');
                });
                // Add active class to clicked button
                btn.classList.remove('border-brand', 'text-brand');
                btn.classList.add('bg-brand', 'text-black', 'shadow-[0_0_15px_#00ff00]');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hidden');
                        // Small animation reset
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });

        // --- 6. TESTIMONIAL SLIDER LOGIC (Auto Infinite Slider) ---
        const track = document.getElementById('testimonial-track');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        const totalSlides = dots.length;

        function updateSlider() {
            // Move track
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.remove('bg-gray-600');
                    dot.classList.add('bg-brand', 'shadow-[0_0_10px_#00ff00]');
                } else {
                    dot.classList.add('bg-gray-600');
                    dot.classList.remove('bg-brand', 'shadow-[0_0_10px_#00ff00]');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        // Auto Play every 4 seconds
        let autoSlideInterval = setInterval(nextSlide, 4000);

        // Click on Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoSlideInterval);
                currentSlide = index;
                updateSlider();
                autoSlideInterval = setInterval(nextSlide, 4000);
            });
        });

        // --- 7. SCROLL REVEAL ANIMATION (For Services & Contact) ---
        const revealElements = document.querySelectorAll('.reveal');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // --- 8. SMOOTH SCROLL LOGIC (For Anchor Links) ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });