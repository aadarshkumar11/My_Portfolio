import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const navLinks = [
	{ label: 'Home', href: '#hero' },
	{ label: 'About', href: '#about' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Skills', href: '#skills' },
	{ label: 'Testimonials', href: '#testimonials' },
	{ label: 'Contact', href: '#contact' },
];

const Navbar: React.FC<{ setTheme: (t: 'light' | 'dark') => void; theme: 'light' | 'dark' }> = ({ setTheme, theme }) => {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [active, setActive] = useState(navLinks[0].href);

	// Prevent background scroll when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	}, [menuOpen]);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
			let current = navLinks[0].href;
			for (const link of navLinks) {
				const section = document.querySelector(link.href);
				if (section && section instanceof HTMLElement) {
					const { top } = section.getBoundingClientRect();
					if (top <= window.innerHeight / 4) {
						current = link.href;
					}
				}
			}
			setActive(current);
		};
		window.addEventListener('scroll', handleScroll);
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleNavClick = (href: string) => {
		setActive(href);
		const el = document.querySelector(href);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
		// Add a slight delay for smoothness before closing menu
		setTimeout(() => setMenuOpen(false), 200);
	};

	return (
		<motion.header
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.38, ease: 'easeOut' }} // Faster
			className={`navbar-header${scrolled ? ' navbar-scrolled' : ''}`}
			style={{ willChange: 'transform, opacity' }}
		>
			<nav className="navbar-nav">
				<a href="#hero" className="navbar-logo">
					Aadarsh
				</a>
				<ul className="navbar-links">
					{navLinks.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className={`navbar-link${active === link.href ? ' active' : ''}`}
								onClick={(e) => {
									e.preventDefault();
									handleNavClick(link.href);
								}}
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>
				<div className="navbar-actions">
					{/* Desktop Theme Toggle */}
					<motion.button
						className="navbar-theme-toggle"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						aria-label="Toggle theme"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon />}
					</motion.button>
					
					{/* Mobile Hamburger */}
					<motion.button
						className={`navbar-hamburger${menuOpen ? ' active' : ''}`}
						onClick={() => setMenuOpen((o) => !o)}
						aria-label="Toggle menu"
						animate={menuOpen ? { rotate: 90, scale: 1.1 } : { rotate: 0, scale: 1 }}
						transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</motion.button>
				</div>
			</nav>
			<AnimatePresence>
				{menuOpen && (
					<>
						{/* Backdrop for mobile menu */}
						<motion.div
							className={`navbar-mobile-backdrop${menuOpen ? ' active' : ''}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							onClick={() => setMenuOpen(false)}
						/>
						<motion.div
							key="mobile-menu"
							initial={{ opacity: 0, scale: 0.9, y: -10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: -10 }}
							transition={{ 
								duration: 0.2,
								ease: "easeOut"
							}}
							className={`navbar-mobile-glass${menuOpen ? ' active' : ''}`}
						>
							<motion.ul
								className="navbar-mobile-list"
								initial="hidden"
								animate="visible"
								exit="exit"
								variants={{
									hidden: { opacity: 0 },
									visible: { 
										opacity: 1,
										transition: { 
											staggerChildren: 0.05,
											delayChildren: 0.1
										} 
									},
									exit: { 
										opacity: 0,
										transition: { 
											staggerChildren: 0.02,
											staggerDirection: -1
										}
									},
								}}
							>
								{navLinks.map((link) => (
									<motion.li
										key={link.href}
										variants={{
											hidden: { 
												opacity: 0, 
												x: -20
											},
											visible: { 
												opacity: 1, 
												x: 0,
												transition: { 
													duration: 0.3,
													ease: "easeOut"
												} 
											},
											exit: {
												opacity: 0,
												x: -20,
												transition: { duration: 0.2 }
											}
										}}
									>
										<motion.a
											href={link.href}
											className={`navbar-mobile-link${active === link.href ? ' active' : ''}`}
											onClick={e => {
												e.preventDefault();
												handleNavClick(link.href);
											}}
											whileHover={{ x: 8 }}
											whileTap={{ scale: 0.98 }}
										>
											{link.label}
										</motion.a>
									</motion.li>
								))}
							</motion.ul>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</motion.header>
	);
};

export default Navbar;
