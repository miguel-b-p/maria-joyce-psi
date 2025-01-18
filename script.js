document.addEventListener('DOMContentLoaded', () => {
	// Smooth scrolling for navigation links
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
	});

	// Navbar scroll effect
	const header = document.querySelector('header');
	let lastScroll = 0;

	window.addEventListener('scroll', () => {
		const currentScroll = window.pageYOffset;
		
		// Add/remove scrolled class for style changes
		if (currentScroll > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
		
		// Hide/show navbar on scroll
		if (currentScroll > lastScroll && currentScroll > 100) {
			header.style.transform = 'translateY(-100%)';
		} else {
			header.style.transform = 'translateY(0)';
		}
		
		lastScroll = currentScroll;
	});

	// Active link highlighting
	const sections = document.querySelectorAll('section[id]');
	
	window.addEventListener('scroll', () => {
		const scrollY = window.pageYOffset;
		
		sections.forEach(section => {
			const sectionHeight = section.offsetHeight;
			const sectionTop = section.offsetTop - 100;
			const sectionId = section.getAttribute('id');
			const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
			
			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				navLink?.classList.add('active');
			} else {
				navLink?.classList.remove('active');
			}
		});
	});

	// Animate service cards on scroll
	const observerOptions = {
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	document.querySelectorAll('.service-card').forEach(card => {
		card.style.opacity = '0';
		card.style.transform = 'translateY(20px)';
		card.style.transition = 'all 0.5s ease-out';
		observer.observe(card);
	});
});