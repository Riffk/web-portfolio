import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const projectDetails = {
  'project-1': {
    title: 'AMCS (Automated Monitoring & Control System)',
    description: 'An IoT system to monitor and control temperature and humidity using ESP32 and MQTT.',
    media: [
      { type: 'image', src: process.env.PUBLIC_URL + '/Fotobrin.jpg' }
    ],
    paragraphs: [
      'This project focuses on creating a real-time monitoring and automation system for environmental conditions using ESP32 and BME280.',
      'We used MQTT to transmit data between sensors and the cloud, and ESP-NOW for efficient local communication.',
      'A web interface was built to visualize data and trigger automatic or manual control of devices.'
    ]
  },
  'project-2': {
    title: 'Car Robotic Obstacle Avoidance',
    description: 'An Arduino-based autonomous car that avoids obstacles using ultrasonic sensors.',
    media: [
      { type: 'image', src: process.env.PUBLIC_URL + '/Robot.jpg' },
      { type: 'video', src: process.env.PUBLIC_URL + '/Carperfect.mp4' }
    ],
    paragraphs: [
      'This robotic vehicle uses ultrasonic sensors to detect and avoid obstacles in real time. It is powered by an Arduino UNO and motor driver with optimized sensor placement. Useful for learning embedded system logic and real-time decision-making.'
    ]
  },
  'project-3': {
    title: 'CRUD Showroom Car Seller App (Java NetBeans)',
    description: 'A desktop-based CRUD application built using Java NetBeans to manage car listings, including input for model number, brand, engine type, year, quantity, and price.',
    media: [
      { type: 'image', src: process.env.PUBLIC_URL + '/Crud1.jpg' },
      { type: 'image', src: process.env.PUBLIC_URL + '/Crud2.jpg' }
    ],
    paragraphs: [
      'I made this project during my second semester using NetBeans. It was one of my first experiences building a full desktop app. The app supports Create, Read, Update, and Delete (CRUD) operations for managing car listings in a showroom. The interface is built using Java Swing, and the user can input details like car number, brand, engine capacity, year, stock quantity, and price. This project helped me understand Java basics, form-based logic, and user interaction handling.'
    ]
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectDetails[id];
  const [current, setCurrent] = useState(0);

  if (!project) return <p className="text-white text-center mt-32">Project not found.</p>;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % project.media.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + project.media.length) % project.media.length);

  const handleNavClick = (section) => {
    navigate(`/#${section.toLowerCase()}`);
  };

  return (
    <section className="min-h-screen bg-black text-white pt-28 pb-16 px-6">
      {/* Glass Navbar */}
      <header className="fixed top-0 left-0 right-0 backdrop-blur-lg bg-black/30 z-50 shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold tracking-wide">PROTOFILO.</Link>
          <nav className="hidden md:flex space-x-6 text-sm font-semibold tracking-wide">
            {['Home', 'Skills', 'Works', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                {item.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-6 mt-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {project.title}
      </motion.h1>

      <p className="text-center text-gray-400 text-md mb-10 max-w-3xl mx-auto">
        {project.description}
      </p>

      {project.media.length > 0 && (
        <motion.div
          className="relative w-full max-w-4xl mx-auto h-64 md:h-96 bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {project.media[current].type === 'image' ? (
            <img
              src={project.media[current].src}
              alt="Project screenshot"
              className="w-full h-full object-cover transition duration-300 ease-in-out"
            />
          ) : (
            <video
              controls
              className="w-full h-full object-cover"
            >
              <source src={project.media[current].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-3 rounded-full hover:bg-opacity-70"
            onClick={prevSlide}
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-3 rounded-full hover:bg-opacity-70"
            onClick={nextSlide}
          >
            <FaArrowRight size={20} />
          </button>
        </motion.div>
      )}

      <div className="mt-8 space-y-8 max-w-3xl mx-auto px-4">
        {project.paragraphs.map((text, index) => (
          <motion.p
            key={index}
            className="text-gray-300 text-base leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
