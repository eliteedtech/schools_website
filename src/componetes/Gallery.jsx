import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import students from "../assets/students.png";
import principal from "../assets/principal.png";
import image from "../assets/image copy.png";
import image2 from "../assets/image copy 2.png";
import image3 from "../assets/image copy 3.png";
import image4 from "../assets/image copy 4.png";
import image5 from "../assets/image copy 5.png";
import image6 from "../assets/image copy 6.png";
import image7 from "../assets/image copy 7.png";
import image9 from "../assets/image copy 9.png";
import image10 from "../assets/image copy 10.png";
import image12 from "../assets/image copy 12.png";
import { motion } from "framer-motion";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeeVideo, setActiveeVideo] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "photos", name: "Photos" },
    { id: "videos", name: "Videos" },
    { id: "events", name: "Events" },
    { id: "facilities", name: "Facilities" },
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Students in the Classroom",
      category: "photos",
      type: "image",
      image: students,
      description: "Active learning environment",
    },
    {
      id: 2,
      title: "The Principal",
      category: "photos",
      type: "image",
      image: principal,
      description: "School leadership",
    },
    {
      id: 3,
      title: "School Assembly Event",
      category: "videos",
      type: "video",
      image: "https://img.youtube.com/vi/aJxsTF9eWRk/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/aJxsTF9eWRk",
      description: "Morning assembly highlights",
    },
    {
      id: 4,
      title: "Cultural Day Celebration",
      category: "videos",
      type: "video",
      image: "https://img.youtube.com/vi/B8OSkSdo6R0/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/B8OSkSdo6R0",
      description: "Students in traditional attire",
    },
    {
      id: 5,
      title: "",
      category: "videos",
      type: "video",
      image: "https://img.youtube.com/vi/rfs-4HaRMnM/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/rfs-4HaRMnM",
      description: "",
    },
    {
      id: 6,
      title: "Pre-vocational Laboratory",
      category: "facilities",
      type: "image",
      image: image,
      description: "Science laboratory",
    },
    {
      id: 7,
      title: "Annual Cultural Day",
      category: "videos",
      type: "video",
      image: "https://img.youtube.com/vi/77l2Juo0Mws/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/77l2Juo0Mws",
      description: "Students in traditional attire",
    },
    {
      id: 8,
      title: "Graduation Ceremony",
      category: "events",
      type: "image",
      image: image2,
      description: "Students graduation day",
    },
    {
      id: 9,
      title: "Graduation Ceremony",
      category: "events",
      type: "image",
      image: image3,
      description: "Students graduation day",
    },
    {
      id: 10,
      title: "Pre-vocational Laboratory",
      category: "facilities",
      type: "image",
      image: image4,
      description: "Science laboratory",
    },
    {
      id: 11,
      title: "Ceremony ",
      category: "events",
      type: "image",
      image: image5,
      description: "Students for better things",
    },
    {
      id: 12,
      title: "Students in the Classroom",
      category: "photos",
      type: "image",
      image: image6,
      description: "Active learning environment",
    },
    {
      id: 13,
      title: "Graduation Ceremony",
      category: "events",
      type: "image",
      image: image7,
      description: "Students graduation day",
    },
    {
      id: 14,
      title: "Graduation Ceremony",
      category: "events",
      type: "image",
      image: image9,
      description: "students graduation day",
    },
    {
      id: 15,
      title: "Graduation Ceremony",
      category: "events",
      type: "image",
      image: image10,
      description: "students graduation day",
    },
    {
      id: 16,
      title: "In the Classroom",
      category: "facilities",
      type: "image",
      image: image12,
      description: "At quiz competition",
    },
  ];

  const eventsVideos = [
    {
      id: 1,
      title: "Annual Cultural Day",
      category: "videos",
      type: "video",
      image: "https://img.youtube.com/vi/77l2Juo0Mws/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/77l2Juo0Mws",
      description: "Students in traditional attire",
    },
    {
      id: 2,
      title: "Cultural Day Celebration",
      category: "videos",
      type: "video",
      image: "https://img.youtube.com/vi/B8OSkSdo6R0/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/B8OSkSdo6R0",
      description: "Students in traditional attire",
    },
    {
      id: 3,
      title: "School Assembly Event",
      category: "videos",
      type: "video",
      image: "https://img.youtube.com/vi/aJxsTF9eWRk/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/aJxsTF9eWRk",
      description: "Morning assembly highlights",
    },

    {
      id: 5,
      title: "",
      category: "videos",
      type: "video",
      image: "https://img.youtube.com/vi/rfs-4HaRMnM/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/rfs-4HaRMnM",
      description: "",
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

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : selectedCategory === "photos"
      ? galleryItems.filter((item) => item.type === "image")
      : selectedCategory === "videos"
      ? galleryItems.filter((item) => item.type === "video")
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="pt-16">
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
            <span className="text-yellow-400">Gallery Album</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-blue-100">
            Explore our vibrant school community through photos and videos
          </p>
        </div>
      </motion.section>
      {/* Filter Buttons */}
      <section className="py-8 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? " bg-gradient-to-b from-blue-950 via-blue-800 to-blue-950 dark:from-yellow-400 dark:to-yellow-300 dark:text-gray-950 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                key={item.id}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() =>
                    item.type === "video" && setActiveVideo(item.videoUrl)
                  }
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <div
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() => setActiveImage(item.image)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
                      {item.type === "image" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={() => setActiveImage(item.image)}
                            className="w-16 h-16 bg-white/80 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg"
                          >
                            <FaRegEye className="text-blue-950 dark:text-yellow-400 text-2xl" />
                          </button>
                        </div>
                      )}
                    </div>
                  </a>

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <FiPlay className="text-blue-950 dark:text-yellow-400 text-2xl ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-yellow-400  text-blue-600 dark:text-gray-800 text-xs rounded-full">
                      {item.type === "video" ? "Video" : "Photo"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {activeImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setActiveImage(null)}
          >
            <div className="relative">
              <img
                src={activeImage}
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-1 -right-0 w-10 h-10 flex text-black font-bold items-center justify-center text-2xl  hover:scale-110 transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 text-white text-2xl z-10"
            >
              ✕
            </button>

            <iframe
              src={activeVideo}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>
        </div>
      )}

      {/* Events Videos Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            School's Events Videos
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {eventsVideos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setActiveeVideo(video.videoUrl)}
              >
                <div className="relative">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 dark:bg-gray-900/10 flex items-center justify-center">
                    <FiPlay className="text-2xl text-gray-400 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">
                    {video.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Video Modal */}
        {activeeVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveeVideo(null)}
                className="absolute top-3 right-3 text-white text-2xl z-10"
              >
                ✕
              </button>
              <iframe
                src={activeeVideo}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Video Player"
              ></iframe>
            </div>
          </div>
        )}
      </section>
      {/* School Highlights */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            School Highlights
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-600">
                Modern Facilities
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  Well-equipped classrooms with modern teaching aids
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  Science laboratories for practical learning
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  Computer lab with internet connectivity
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  Library with extensive collection of books
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-red-600 dark:text-yellow-400">
                Student Activities
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-600 dark:bg-yellow-300 rounded-full mt-2"></span>
                  Academic competitions and quiz programs
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-600 dark:bg-yellow-300 rounded-full mt-2"></span>
                  Cultural events and celebrations
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-600 dark:bg-yellow-300 rounded-full mt-2"></span>
                  Sports and physical education activities
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-600 dark:bg-yellow-300 rounded-full mt-2"></span>
                  Islamic studies and Tahfeez programs
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery;
