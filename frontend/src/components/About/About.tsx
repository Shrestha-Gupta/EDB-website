import { motion } from "framer-motion";
import { BookOpen, Users, Award, Sparkles, Target, Heart } from "lucide-react";

const stats = [
  { number: "60+", label: "Years of Excellence", icon: Award },
  { number: "100+", label: "Published Works", icon: BookOpen },
  { number: "100+", label: "Contributors", icon: Users },
  { number: "10K+", label: "Readers Worldwide", icon: Sparkles },
];

const features = [
  {
    icon: BookOpen,
    title: "Literary Excellence",
    description:
      "Curating the finest poetry, prose, essays, and creative works from talented writers.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Users,
    title: "Diverse Voices",
    description:
      "A platform celebrating perspectives from students, faculty, and global contributors.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Target,
    title: "Scholarly Discourse",
    description:
      "Fostering intellectual conversations and critical thinking through thoughtful content.",
    color: "from-orange-600 to-red-500",
  },
  {
    icon: Heart,
    title: "Cultural Expression",
    description:
      "Bridging tradition and innovation, celebrating the rich tapestry of human experience.",
    color: "from-red-500 to-orange-500",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-white px-6 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f97316_1px,transparent_1px),linear-gradient(to_bottom,#f97316_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
          >
            <div className="w-16 h-1 bg-linear-to-r from-orange-500 to-amber-500 rounded-full mx-auto"></div>
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-linear-to-r from-gray-900 via-orange-800 to-amber-700 bg-clip-text text-transparent">
              About The Editorial Board
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A premier literary journal at Madan Mohan Malaviya University of
            Technology, dedicated to nurturing creativity, fostering
            intellectual discourse, and celebrating the power of words.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <motion.div
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border border-orange-100 h-full"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(249, 115, 22, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="inline-block p-3 bg-linear-to-r from-orange-500 to-amber-500 rounded-xl mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.h3
                    className="text-4xl font-bold text-gray-900 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                  rotateY: 10,
                }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden h-full"
                  whileHover={{
                    boxShadow: "0 25px 50px rgba(249, 115, 22, 0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5`}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="flex items-center gap-4 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                    >
                      <motion.div
                        className={`p-3 rounded-xl bg-linear-to-br ${feature.color}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                    </motion.div>
                    <motion.p
                      className="text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="max-w-4xl mx-auto bg-linear-to-br from-orange-50 to-amber-50 rounded-3xl p-10 md:p-12 border border-orange-100 shadow-xl relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              className="text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed italic relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              "We believe every story deserves to be told, every voice deserves
              to be heard, and every word has the power to inspire change."
            </motion.p>
            <motion.div
              className="mt-6 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-12 h-1 bg-linear-to-r from-orange-500 to-amber-500 rounded-full"></div>
              <Sparkles className="w-5 h-5 text-orange-500" />
              <div className="w-12 h-1 bg-linear-to-r from-amber-500 to-orange-500 rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
