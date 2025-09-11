 
        // Typing effect for the hero section
        var typed = new Typed('.auto-type', {
            strings: ['Frontend Developer', 'Web Developer', 'Programmer'],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true
        });

        // "Tracing beam" on scroll
        window.addEventListener('scroll', () => {
            const tracingBeam = document.getElementById('tracingBeam');
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = (window.scrollY / totalHeight) * 100;
            tracingBeam.style.width = `${scrollProgress}%`;
        });

        // Set the current year in the footer
        document.getElementById("year").textContent = new Date().getFullYear();

        // Active link highlighting on scroll
        const sections = document.querySelectorAll('section[id]');
        function scrollActive() {
            const scrollY = window.pageYOffset;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.navbar ul li a[href*=' + sectionId + ']').classList.add('active');
                } else {
                    document.querySelector('.navbar ul li a[href*=' + sectionId + ']').classList.remove('active');
                }
            });
        }
        window.addEventListener('scroll', scrollActive);

        // Mobile navigation toggle
        const menuIcon = document.getElementById('menu-icon');
        const navLinks = document.getElementById('nav-links');

        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
   