import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBook,
  FiCalendar,
  FiMapPin,
  FiEdit2,
  FiCheck,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Apply = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    gender: "",
    dob: "",
    guardianName: "",
    guardianPhone: "",
    address: "",
    previousSchool: "",
    medicalInfo: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          level: "",
          gender: "",
          dob: "",
          guardianName: "",
          guardianPhone: "",
          address: "",
          previousSchool: "",
          medicalInfo: "",
          notes: "",
        });
      }, 3000);
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="pt-16">
      {/* Hero Section - Matching your style */}

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
            Apply Now{" "}
          </h1>

          <p className="text-lg md:text-xl text-blue-100">
            Begin your journey to excellence at Dr. Kabiru Gwarzo Academy &
            Tahfeez
          </p>
        </div>
      </motion.section>

      {/* Form Section */}
      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-950 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 dark:bg-gray-900 rounded-2xl  overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Form Header */}
            <div className=" px-6 py-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-400/10 backdrop-blur-sm flex items-center justify-center">
                  <FiEdit2 className="text-blue-950 text-xl dark:text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white">
                    Application Form
                  </h2>
                  <p className="text-black dark:text-gray-300">
                    Fill in the required information below
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              {submitSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <FiCheck className="text-green-600 dark:text-green-400 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for your application. We'll contact you shortly.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Redirecting you back to the form...
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Student Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Full Name *
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="Student's full name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Date of Birth *
                        </label>
                        <div className="relative">
                          <FiCalendar className="absolute left-3 top-3.5 text-gray-400 " />
                          <input
                            type="date"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all"
                            value={formData.dob}
                            onChange={(e) =>
                              setFormData({ ...formData, dob: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Gender *
                        </label>
                        <div className="relative">
                          <select
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all"
                            value={formData.gender}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                gender: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>

                      {/* Level */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Applying for *
                        </label>
                        <div className="relative">
                          <FiBook className="absolute left-3 top-3.5 text-gray-400" />
                          <select
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all appearance-none"
                            value={formData.level}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                level: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Level</option>
                            <option value="pre-nursery">Pre-Nursery</option>
                            <option value="nursery">Nursery</option>
                            <option value="primary">Primary School</option>
                            <option value="jss">Junior Secondary</option>
                            <option value="islamiyya">Islamiyya Only</option>
                            <option value="academy-islamiyya">
                              Academy with Islamiyyah
                            </option>
                            <option value="tahfeez">Tahfeez Program</option>
                          </select>
                        </div>
                      </div>

                      {/* Previous School */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Previous School
                        </label>
                        <input
                          type="text"
                          placeholder="Name of previous school attended"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all"
                          value={formData.previousSchool}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              previousSchool: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guardian Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-900">
                      Guardian Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Guardian Name */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Guardian Name *
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="Guardian's full name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all"
                            value={formData.guardianName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                guardianName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {/* Guardian Phone */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Guardian Phone *
                        </label>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                          <input
                            type="tel"
                            required
                            placeholder="0800 000 0000"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all"
                            value={formData.guardianPhone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                guardianPhone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Email Address *
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                          <input
                            type="email"
                            required
                            placeholder="guardian@email.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Residential Address *
                        </label>
                        <div className="relative">
                          <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="Full residential address"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Additional Information
                    </h3>
                    <div className="space-y-4">
                      {/* Medical Information */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Medical Information (Optional)
                        </label>
                        <textarea
                          placeholder="Any medical conditions, allergies, or special needs we should know about"
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all resize-none"
                          value={formData.medicalInfo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              medicalInfo: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          placeholder="Any additional information you'd like to share"
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 transition-all resize-none"
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        * Required fields
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 bg-blue-950 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-gray-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px] flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Apply;
