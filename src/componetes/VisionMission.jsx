import { motion } from "framer-motion";
import { Eye, Target, Star, Users, BookOpen, Heart } from "lucide-react";

export default function VisionMission() {
  return (
    <section className="py-20">
      <div className="">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vision & Mission
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our commitment to excellence in education and character development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 rounded-2xl p-8 h-full border border-gray-200 dark:border-gray-800 hover:border-blue-950 dark:hover:border-yellow-400 transition-colors">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 dark:from-yellow-400 dark:to-yellow-400 flex items-center justify-center mb-6 shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                To be the leading educational institution that produces
                visionary leaders who excel academically, uphold strong moral
                values, and contribute positively to society.
              </p>

              {/* Key Points */}
              <div className="space-y-3">
                {[
                  "Holistic development of students",
                  "Academic excellence with moral values",
                  "Innovation in education",
                  "Global leadership mindset",
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-950 dark:bg-yellow-400"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "Shaping minds that will shape tomorrow"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 rounded-2xl p-8 h-full border border-gray-200 dark:border-gray-800 hover:border-blue-950 dark:hover:border-yellow-400 transition-colors">
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 dark:from-yellow-400 dark:to-yellow-400 flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                To provide quality education that integrates academic excellence
                with strong moral values, fostering an environment where
                students develop critical thinking, creativity, and character.
              </p>

              {/* Key Points */}
              <div className="space-y-3">
                {[
                  "Quality education for all",
                  "Moral and ethical development",
                  "Modern teaching methods",
                  "Community engagement",
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-950 dark:bg-yellow-400"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "Educating today for a better tomorrow"
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Star,
                title: "Excellence",
                description:
                  "Striving for the highest standards in academics and character",
              },
              {
                icon: Users,
                title: "Integrity",
                description:
                  "Upholding honesty and ethical principles in all actions",
              },
              {
                icon: BookOpen,
                title: "Knowledge",
                description:
                  "Pursuing academic excellence and lifelong learning",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-950 dark:text-yellow-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
