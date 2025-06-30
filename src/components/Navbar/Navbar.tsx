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
		setMenuOpen(false);
		setActive(href);
		const el = document.querySelector(href);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
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
				<div className="flex items-center gap-2">
					<button
						className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition hidden md:block"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						aria-label="Toggle theme"
					>
						{theme === 'dark' ? (
							<FaSun className="text-yellow-400" />
						) : (
							<FaMoon className="text-gray-700" />
						)}
					</button>
					<motion.button
						className="md:hidden p-2 rounded-full focus:outline-none text-2xl text-indigo-600 dark:text-indigo-400 navbar-animated-hamburger"
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
					<motion.div
						key="mobile-menu"
						initial={{ scale: 0, opacity: 0, clipPath: 'circle(0% at 90% 0%)' }}
						animate={{ scale: 1, opacity: 1, clipPath: 'circle(150% at 90% 0%)' }}
						exit={{ scale: 0.8, opacity: 0, clipPath: 'circle(0% at 90% 0%)' }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="navbar-mobile-glass"
					>
						<motion.ul
							className="navbar-mobile-list"
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={{
								hidden: {},
								visible: { transition: { staggerChildren: 0.08 } },
								exit: {},
							}}
						>
							{navLinks.map((link) => (
								<motion.li
									key={link.href}
									variants={{
										hidden: { opacity: 0, y: 30 },
										visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
									}}
								>
									<a
										href={link.href}
										className={`navbar-mobile-link${active === link.href ? ' active' : ''}`}
										onClick={e => {
											e.preventDefault();
											handleNavClick(link.href);
										}}
									>
										{link.label}
									</a>
								</motion.li>
							))}
							<motion.li
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
								}}
							>
								<button
									className="w-full p-2 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
									onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
									aria-label="Toggle theme"
								>
									{theme === 'dark' ? (
										<FaSun className="text-yellow-400" />
									) : (
										<FaMoon className="text-gray-700" />
									)}
									{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
								</button>
							</motion.li>
						</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
};

export default Navbar;
