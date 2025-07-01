import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

function renderStars(level) {
  const total = 5;
  return (
    <motion.div
      className="flex gap-1 text-yellow-400 text-lg mb-1"
      whileHover={{ rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.5 }}
    >
      {[...Array(total)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: i < level ? 1 : 0.8, opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          {i < level ? '★' : '☆'}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function Home() {
  const [backendMessage, setBackendMessage] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // State for custom cursor
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default' or 'hovered'

  const hardSkills = [
    { name: 'C++', level: 4, description: 'Strong in object-oriented programming, data structures, and algorithm design.' },
    { name: 'Network', level: 3, description: 'Good understanding of TCP/IP, DNS, subnetting, and Wireshark analysis.' },
    { name: 'Laravel', level: 3, description: 'Experience with REST APIs, Eloquent ORM, Blade, and MVC.' },
    { name: 'Python', level: 4, description: 'Comfortable in scripting, Flask web apps, and data analysis with Pandas.' },
    { name: 'Git', level: 5, description: 'Version control, branching, and collaborative workflows.' },
    { name: 'Database', level: 3, description: 'MySQL queries, joins, and database design.' },
  ];

  const softSkills = [
    { name: 'Teamwork', level: 4, description: 'Able to collaborate effectively in team environments.' },
    { name: 'Communication', level: 4, description: 'Clear communicator in written and verbal forms.' },
    { name: 'Problem Solving', level: 3, description: 'Quick to analyze and solve challenges.' },
    { name: 'Time Management', level: 5, description: 'Prioritizes tasks and manages deadlines well.' },
  ];

  const portfolioData = [
    {
      id: 'project-1',
      title: 'AMCS (Automated Monitoring & Control System)',
      description: 'An IoT system to monitor and control temperature and humidity using ESP32 and MQTT.',
      techUsed: ['ESP32', 'MQTT', 'Node-RED'],
    },
    {
      id: 'project-2',
      title: 'Car Robotic Obstacle Avoidance',
      description: 'An Arduino-based autonomous car that avoids obstacles using ultrasonic sensors.',
      techUsed: ['Arduino', 'Ultrasonic Sensor', 'Motor Driver'],
    },
    {
      id: 'project-3',
      title: 'CRUD Showroom Car Seller App (Java NetBeans)',
      description: 'A desktop-based CRUD application built using Java NetBeans to manage car listings, including input for model number, brand, engine type, year, quantity, and price.',
      techUsed: ['Java', 'NetBeans', 'Swing'],
    },
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
      .then(res => setBackendMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  // Effect for custom cursor movement
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Clean up the event listener
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // Functions to set cursor variant
  const cursorEnter = () => setCursorVariant('hovered');
  const cursorLeave = () => setCursorVariant('default');

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=ricardasebastian95@gmail.com&su=Portfolio%20Message%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink, '_blank');
  };

  // Define cursor variants for Framer Motion
  const cursorVariants = {
    default: {
      x: cursorX - 16, // Adjust for half width of cursor (32px / 2)
      y: cursorY - 16, // Adjust for half height of cursor (32px / 2)
      width: 32,
      height: 32,
      opacity: 1,
      backgroundColor: 'rgba(251, 191, 36, 0.8)', // yellow-400 with opacity
      mixBlendMode: 'difference', // Makes it visible on both light/dark backgrounds
    },
    hovered: {
      x: cursorX - 32, // Adjust for half width of cursor (64px / 2)
      y: cursorY - 32, // Adjust for half height of cursor (64px / 2)
      width: 64,
      height: 64,
      opacity: 0.6,
      backgroundColor: 'rgba(251, 191, 36, 0.6)', // yellow-400 with opacity
      mixBlendMode: 'difference',
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 scroll-smooth relative overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed z-[9999] rounded-full pointer-events-none transition-all duration-150 ease-out"
        variants={cursorVariants}
        animate={cursorVariant}
        style={{
          left: 0, // Initial position, will be overridden by x/y from variants
          top: 0,  // Initial position, will be overridden by x/y from variants
        }}
      />

      {/* Background Gradients/Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>


      <header className="fixed top-0 left-0 right-0 bg-[#0d1117]/80 backdrop-blur-md z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white text-2xl font-bold tracking-wide">HUTAGALUNG .</div>
          <nav className="hidden md:flex space-x-6 text-sm font-semibold tracking-wide">
            {['home', 'skills', 'works', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-white hover:text-yellow-400 transition-colors duration-300"
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-white text-2xl"
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
            >
              ☰
            </button>
          </div>
        </div>
        {showMenu && (
          <div className="md:hidden bg-[#0d1117] text-center py-4 space-y-4">
            {['home', 'skills', 'works', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setShowMenu(false)}
                className="block text-white hover:text-yellow-400 transition-colors duration-300"
                onMouseEnter={cursorEnter}
                onMouseLeave={cursorLeave}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero + About */}
      <div id="home" className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto pt-32 pb-32 px-4 min-h-screen">
        {/* Black Moving Circle Behind Image */}
        <motion.div
          className="absolute w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] rounded-full bg-black opacity-30 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow-reverse"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} // Center it relative to its parent container
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "easeInOut"
          }}
        ></motion.div>

        
<motion.img
  src={process.env.PUBLIC_URL + '/self.png'}
  alt="Ricarda"
  className="relative z-10 w-[280px] lg:w-[360px] object-cover rounded-full border-4 border-yellow-400 shadow-2xl hover:scale-105 transition-transform duration-500 transform rotate-3 hover:rotate-0"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
/>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-left max-w-xl space-y-5 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-gray-700 relative"
          onMouseEnter={cursorEnter}
          onMouseLeave={cursorLeave}
        >
          {/* Subtle background overlay for the text box */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-xl -z-10"></div>

          <p className="text-yellow-400 text-lg font-mono">HI, MY NAME IS</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight animate-fade-in-up">RICARDA</h1>
          <motion.p
            className="bg-yellow-400 text-gray-900 font-bold inline-block px-5 py-2 rounded-full shadow-lg text-sm md:text-base tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            PROGRAMMER & IOT DEVELOPER
          </motion.p>
          <p className="text-gray-300 leading-relaxed text-base">
            Hello, I’m <span className="text-white font-semibold">Ricarda</span>, a creative developer with a deep passion for IoT, UI design, and robotics. Ever since I was a kid, I’ve been inspired by Japanese robot anime and engineering. I specialize in developing user-friendly interfaces and smart embedded systems with a secure-by-design approach.
          </p>
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.div id="skills" className="relative z-10 pt-24 pb-32 max-w-7xl mx-auto px-4 min-h-screen" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2 className="text-4xl font-bold mb-12 text-center text-white relative">
          My Expertise
          <span className="block w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-semibold mb-8 text-yellow-400">Hard Skills</h3>
            <div className="grid grid-cols-1 gap-8">
              {hardSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-7 shadow-lg border border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  onMouseEnter={cursorEnter}
                  onMouseLeave={cursorLeave}
                >
                  <h4 className="text-xl font-semibold text-white mb-2">{skill.name}</h4>
                  {renderStars(skill.level)}
                  <p className="text-gray-300 text-sm leading-snug">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-semibold mb-8 text-yellow-400">Soft Skills</h3>
            <div className="grid grid-cols-1 gap-8">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-7 shadow-lg border border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  onMouseEnter={cursorEnter}
                  onMouseLeave={cursorLeave}
                >
                  <h4 className="text-xl font-semibold text-white mb-2">{skill.name}</h4>
                  {renderStars(skill.level)}
                  <p className="text-gray-300 text-sm leading-snug">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Works Section */}
      <motion.div id="works" className="relative z-10 pt-24 pb-32 max-w-7xl mx-auto px-4 min-h-screen" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2 className="text-4xl font-bold mb-12 text-center text-white relative">
          My Portfolio
          <span className="block w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></span>
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-7 shadow-xl border border-gray-700 hover:scale-105 transition duration-300 text-white flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-yellow-300">{project.title}</h3>
                <p className="text-gray-300 text-base mb-4">{project.description}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techUsed.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-yellow-500/30 text-yellow-200 px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/project/${project.id}`}
                  className="text-base text-blue-400 hover:underline hover:text-blue-300 transition-colors duration-200 flex items-center gap-1"
                  onMouseEnter={cursorEnter}
                  onMouseLeave={cursorLeave}
                >
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div id="contact" className="relative z-10 pt-24 pb-32 max-w-3xl mx-auto text-white text-center px-4 min-h-screen" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2 className="text-4xl font-bold mb-10">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col gap-5">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          />
          <textarea
            placeholder="Your Message"
            className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold tracking-wide transition-all duration-300 w-full md:w-2/3 mx-auto shadow-md hover:shadow-lg"
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            Send Message
          </button>
        </form>
        <div className="border border-blue-500 mt-12 rounded-lg p-6 flex flex-wrap justify-center gap-6 bg-gray-800/50 backdrop-blur-lg">
          <a
            href="https://www.linkedin.com/in/ricarda-sebastian-hutagalung-2b503b2b6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-lg font-medium flex items-center gap-2"
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/Riffk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:underline text-lg font-medium flex items-center gap-2"
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.733.084-.716.084-.716 1.205.086 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.493.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.333-5.466-5.93 0-1.312.465-2.387 1.223-3.224-.121-.303-.535-1.524.103-3.179 0 0 1.006-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.294-1.552 3.298-1.23 3.298-1.23.639 1.655.225 2.876.103 3.179.76.837 1.222 1.912 1.222 3.224 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.197-6.095 8.197-11.389 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://www.instagram.com/ricardasebastiann/"
            className="text-pink-400 hover:underline text-lg font-medium flex items-center gap-2"
            onMouseEnter={cursorEnter}
            onMouseLeave={cursorLeave}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.85-1.699 3.252-1.691 4.771-4.919 4.919-1.266.058-1.644.069-4.849.069-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.07-4.85 3.252-1.699 1.691-4.771 4.919-4.919 1.266-.058 1.644-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.782-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.44-.644-1.44-1.44s.644-1.44 1.44-1.44 1.44.644 1.44 1.44-.644 1.44-1.44 1.44z"/></svg>
            Instagram
          </a>
        </div>
      </motion.div>
    </section>
  );
}