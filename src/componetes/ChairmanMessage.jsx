import { motion } from "framer-motion";
import chairman from "../assets/chairman.jpg";

const ChairmanMessage = () => {
  return (
    <section className="bg-white dark:bg-gray-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Message from the Chairman
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Leadership, vision, and commitment to academic excellence
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="border-l-4 border-blue-950 dark:border-yellow-400 pl-6">
              <img
                src={chairman}
                alt="Chairman"
                className="w-full aspect-square object-cover rounded-xl shadow-lg mb-6"
              />

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Abubakar Farouk Abdullahi
              </h3>
              <p className="text-blue-950 dark:text-yellow-400 font-semibold">
                Chairman
              </p>

              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                “Strive for Excellence” is not just our motto, it is our
                commitment to shaping future leaders.
              </p>
            </div>
          </motion.aside>

          {/* MESSAGE BODY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <article className="prose prose-lg dark:prose-invert max-w-none">

              <p>
                Dear Parents, Students, and Esteemed Community Members,
              </p>

              <p>
                It is my great pleasure to welcome you to the official website
                of <strong>Dr. Kabiru Gwarzo Academy & Tahfeez</strong>.
                Our institution stands as a beacon of academic integrity,
                moral values, and educational innovation.
              </p>

              <p>
                Since our founding, we have remained dedicated to providing a
                balanced education that nurtures intellectual growth,
                discipline, and character.
              </p>

              <blockquote>
                Education is not merely the transfer of knowledge,
                but the cultivation of purpose, discipline, and vision.
              </blockquote>

              <p>
                We continuously embrace modern technologies, including digital
                student identification systems and online admissions,
                to ensure efficiency, security, and accessibility.
              </p>

              <p>
                Our success is reflected in the achievements of our students
                and the trust of parents who believe in our mission.
              </p>

              <p>
                I invite you to explore our website, engage with our community,
                and join us in shaping a brighter future for the next
                generation.
              </p>

              <p className="font-semibold">
                Together, we strive for excellence.
              </p>

              <p className="mt-10 font-bold">
                Abubakar Farouk Abdullahi<br />
                <span className="text-gray-600 dark:text-gray-400 font-normal">
                  Chairman, Dr. Kabiru Gwarzo Academy & Tahfeez
                </span>
              </p>

            </article>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ChairmanMessage;
