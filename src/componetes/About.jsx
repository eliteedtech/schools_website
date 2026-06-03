import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiAward,
  FiChevronRight,
} from "react-icons/fi";
import { FaGraduationCap, FaBookOpen, FaPray } from "react-icons/fa";
import principal from "../assets/principal.png";

import image from "../assets/image copy 13.png";
import bursay from "../assets/bursay.png";
import officer from "../assets/officer.png";
import teacher from "../assets/teacher.png";
import officer2 from "../assets/officer2.png";
import imge from "../assets/image.png";
import CountUp from "../componetes/layout/CountUp";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import StaffCarousel from "../componetes/StaffCarousel";
import ChairmanMessage from "./ChairmanMessage";
import VisionMission from "./VisionMission";
const About = () => {
  const stats = [
    {
      icon: <FiUsers />,
      number: (
        <CountUp
          from={10}
          to={500}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
      ),
      label: "Students",
      description: "Enrolled across all programs",
    },
    {
      icon: <FiAward />,
      number: (
        <CountUp
          from={200}
          to={15}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
      ),
      label: "Years Experience",
      description: "Of educational excellence",
    },
    {
      icon: <FiClock />,
      number: (
        <CountUp
          from={100}
          to={6}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
      ),
      label: "Programs",
      description: "Comprehensive curriculum",
    },
    {
      icon: <FaGraduationCap />,
      number: (
        <CountUp
          from={0}
          to={50}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
      ),
      label: "Graduates",
      description: "Success stories annually",
    },
  ];

  const managementStaff = [
    {
      name: "Adamu Muhammad Alkali",
      position: "Principal",
      image: principal,
    },
    {
      name: "Ummi Abubakar",
      position: "School Bursary",
      image: bursay,
    },
    {
      name: "Faruk Hamza Adam",
      position: "Head Teacher",
      image: teacher,
    },
    {
      name: "Buhari Haruna Idris",
      position: "Examination Officer",
      image: officer,
    },
    {
      name: "Khadija Hamza Adam",
      position: "Asst. Examination Officer",
      image: officer2,
    },
    {
      name: "Imam Lawal Abubakar",
      position: "CEO A.I. Softwares Solutions",
      image: imge,
    },
  ];

  const programs = [
    {
      title: "Early Years",
      icon: "👶",
      color: "border-blue-950 dark:border-yellow-400",
      items: ["Pre-Nursery 1-2", "Primary 1-5", "JSS 1-3"],
      description: "Foundation building for young learners",
    },
    {
      title: "Science Stream",
      icon: "🔬",
      color: "border-blue-950 dark:border-yellow-400 ",
      items: ["SS 1 Science", "SS 2 Science", "SS 3 Science"],
      description: "Advanced scientific education with modern laboratories",
    },
    {
      title: "Arts Stream",
      icon: "🎨",
      color: " border-blue-950 dark:border-yellow-400",
      items: ["SS 1 Arts", "SS 2 Arts", "SS 3 Arts"],
      description: "Creative and humanities-focused curriculum",
    },
    {
      title: "Commercial Stream",
      icon: "💼",
      color: "border-blue-950 dark:border-yellow-400",
      items: ["SS 1 Commercial", "SS 2 Commercial", "SS 3 Commercial"],
      description: "Business and commerce education",
    },
    {
      title: "Islamic Studies",
      icon: "☪️",
      color: "border-blue-950 dark:border-yellow-400",
      items: ["Islamiyya (All Levels)", "Tahfeez Program"],
      description: "Comprehensive Islamic education",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="pt-16 dark:bg-gray-950">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden py-32 text-center
             bg-gradient-to-b from-blue-950 via-blue-800 to-blue-950
             text-white"
      >
        {/* توهجات ذهبية */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl" />

        {/* المحتوى */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome to <br />
            <span className="text-yellow-400">Our Academic Community</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-blue-100">
            Building knowledge, discipline, and excellence for a brighter
            future.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            {/* <Link to={"/about"}>
              <button className="px-8 py-3 rounded-full bg-yellow-400 text-blue-950 font-semibold hover:bg-yellow-300 transition">
                Explore More
              </button>
            </Link> */}
            <Link to="/gallery">
              <button className="px-8 py-3 font-bold rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-950 transition">
                View Gallery
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
      {/* about us*/}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-4xl font-semibold">
            <h1 className="mb-6">About Our School</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-5xl mx-auto">
            We are committed to nurturing the mind, body, and spirit of every
            student through holistic education.
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-28 pb-8">
            {/* Left side - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={image}
                  alt="School Campus"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold text-blue-950 dark:text-yellow-400">
                  15+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Years of Excellence
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold text-red-700 dark:text-yellow-400">
                  A+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Rated Institution
                </div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6 text-gray-700 dark:text-gray-300 pt-">
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Dr. Kabiru Gwarzo Academy & Tahfeez
                  </span>{" "}
                  is a reputable educational institution committed to nurturing
                  young minds through quality education, strong moral values,
                  and academic excellence.
                </p>

                <p className="text-lg leading-relaxed">
                  Founded with the vision of building future leaders, our school
                  provides a balanced and inclusive learning environment where
                  students grow intellectually, spiritually, and socially.
                </p>

                {/* Key Points */}
                <div className="space-y-4 my-8">
                  {[
                    "Quality Education with Moral Values",
                    "Comprehensive Academic Curriculum",
                    "Islamic & Moral Education Integration",
                    "Innovative Teaching Methods",
                    "Dedicated Qualified Teachers",
                    "Technology-Enhanced Learning",
                  ].map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <li className="text-gray-800 dark:text-gray-200">
                        {point}
                      </li>
                    </div>
                  ))}
                </div>

      
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/*vision and mission */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VisionMission />
        </div>
      </section>
      {/* Chairman's Message */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <ChairmanMessage />
        </div>
      </section>
      {/* Management Staff */}
      <section className="py-20  mb-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dedicated professionals guiding our institution towards excellence
            </p>
          </div>

          <div className="relative overflow-hidden">
            <StaffCarousel managementStaff={managementStaff} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              By The Numbers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our journey in numbers - a testament to our commitment to
              educational excellence
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-950 dark:bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 to-blue-700 dark:from-yellow-400 dark:to-yellow-400 flex items-center justify-center text-white dark:text-blue-950 text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Programs Overview */}
      <section className="py-20 bg-white dark:bg-gray-950 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Programs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tailored educational pathways for every student's success
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
              >
                <div
                  className={`h-full rounded-2xl border-2 ${program.color} text-gray-800 backdrop-blur-lg p-6 shadow-xl transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="text-4xl mb-3">{program.icon}</div>
                      <h3 className="text-xl dark:text-white font-bold text-blue-950 mb-2">
                        {program.title}
                      </h3>
                      <p className="text-blue-950 dark:text-white text-sm mb-4">
                        {program.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <ul className="space-y-2">
                        {program.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-blue-950 group-hover:text-blue-950 dark:text-white/90 dark:group-hover:text-white"
                          >
                            <div className="w-1.5 h-1.5 dark:bg-white bg-blue-950 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-4 border-t border-white/20">
                        <Link to="/Price">
                          <button className="w-full py-2 dark:bg-white/20 bg-blue-950/80 hover:bg-blue-950 dark:hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition-all duration-300 dark:group-hover:bg-white/40">
                            Learn More →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white dark:bg-gray-900 rounded-full shadow-lg">
              <FaBookOpen className="text-2xl text-blue-950 dark:text-yellow-300" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Complete curriculum with modern teaching methodologies
              </span>
              <FaPray className="text-2xl text-blue-950 dark:text-yellow-300" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
