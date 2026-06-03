import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function StaffCarousel({ managementStaff }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const visibleCards = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) =>
        prev + visibleCards >= managementStaff.length ? 0 : prev + visibleCards
      );
    }, 9000);

    return () => clearInterval(interval);
  }, [managementStaff.length])  ;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      setIndex((prev) =>
        prev + visibleCards >= managementStaff.length ? 0 : prev + visibleCards
      );
    } else {
      setIndex((prev) =>
        prev - visibleCards < 0
          ? managementStaff.length - visibleCards
          : prev - visibleCards
      );
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl  dark:bg-gray-950 ">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image Container */}
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-lg">
                  <img
                    src={managementStaff[index].image}
                    alt={managementStaff[index].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {managementStaff[index].name}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-950/10 dark:bg-gray-800 rounded-full">
                    <span className="w-2 h-2 bg-blue-950 dark:bg-yellow-400 rounded-full"></span>
                    <span className="text-lg font-medium text-blue-950 dark:text-yellow-400">
                      {managementStaff[index].position}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0">
                  Leading our team with vision and expertise. Dedicated to innovation
                  and excellence in every aspect of our operations.
                </p>

                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/profile">
                    <button className="group flex items-center gap-2 px-6 py-3 bg-blue-950 dark:bg-yellow-400 text-white dark:text-gray-800 font-semibold rounded-lg hover:bg-blue-950 dark:hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg">
                      View Full Profile
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link to="/contact">
                    <button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:border-blue-950 dark:hover:border-yellow-400 hover:text-blue-950 dark:hover:text-yellow-400 transition-all">
                    Contact
                  </button>
                  </Link>
                </div> */}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {managementStaff.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index
                  ? "w-8 bg-blue-950 dark:bg-yellow-400"
                  : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}