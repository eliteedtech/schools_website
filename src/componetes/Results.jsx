import { useState } from 'react';
import { FiSearch, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
const Results = () => {
  const [searchData, setSearchData] = useState({
    studentId: '',
    examType: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    alert('Results will be displayed here');
  };
   const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  return (
    <div className="pt-16">
        {/* <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative text-black dark:text-white py-24 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-800 to-transparent dark:from-blue-800 transform -skew-y-3"></div>
          <div className="absolute bottom-0 right-0 w-full h-20 bg-gradient-to-l from-yellow-400 to-transparent dark:from-yellow-300 transform skew-y-3"></div>

          <div className="hidden md:flex absolute top-1/4 left-1/4 w-16 h-16 border border-blue-950 dark:border-white rounded-full animate-float"></div>
          <div
            className="hidden md:flex absolute bottom-1/4 right-1/4 w-12 h-12 border border-blue-950 dark:border-white rotate-45 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 ">Results Checker</h1>
          <p className="text-xl text-black dark:text-white">Check and download your examination results</p>
        </div>
      </motion.section> */}
     <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative overflow-hidden py-28 text-center
             bg-gradient-to-b from-blue-950 via-blue-800 to-blue-950
             text-white"
>
  {/* توهجات ذهبية */}
  <div className="absolute -top-32 -left-32 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
  <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl" />


  {/* المحتوى */}
  <div className="relative z-10 max-w-4xl mx-auto px-6">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-yellow-400">
      Results Checker
    </h1>

    <p className="text-lg md:text-xl text-blue-100">
      Check and download your examination results securely
    </p>
  </div>
</motion.section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Student ID</label>
              <input
                type="text"
                required
                placeholder="Enter your student ID"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                value={searchData.studentId}
                onChange={(e) => setSearchData({...searchData, studentId: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Exam Type</label>
              <select
                required
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                value={searchData.examType}
                onChange={(e) => setSearchData({...searchData, examType: e.target.value})}
              >
                <option value="">Select Exam Type</option>
                <option value="first-term">First Term</option>
                <option value="second-term">Second Term</option>
                <option value="third-term">Third Term</option>
                <option value="mock">Mock Exam</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-950 dark:bg-yellow-400 dark:text-blue-950 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              <FiSearch /> Check Results
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Results;
