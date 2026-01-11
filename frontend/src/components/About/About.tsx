import { motion } from "framer-motion";
import { BookOpen, Users, Award, Globe, Target, Heart, Sparkles } from "lucide-react";
import { useIsMobile } from "../../hooks/useDevicePerformance";

const stats = [
  { number: "60+", label: "Years of Excellence", icon: Award },
  { number: "100+", label: "Published Works", icon: BookOpen },
  { number: "100+", label: "Contributors", icon: Users },
  { number: "10K+", label: "Readers Worldwide", icon: Globe },
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
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      className="relative bg-white px-6 lg:px-8 2xl:px-12 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f97316_1px,transparent_1px),linear-gradient(to_bottom,#f97316_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: isMobile ? 10 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: isMobile ? 0.4 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-linear-to-r from-orange-500 to-amber-500 rounded-full mx-auto"></div>
          </div>
          <h2 className="text-5xl md:text-6xl 2xl:text-7xl font-serif font-bold mb-6">
            <span className="bg-linear-to-r from-gray-900 via-orange-800 to-amber-700 bg-clip-text text-transparent">
              About The Editorial Board
            </span>
          </h2>
          <p className="text-xl 2xl:text-2xl text-gray-600 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed">
            A premier literary journal at Madan Mohan Malaviya University of
            Technology, dedicated to nurturing creativity, fostering
            intellectual discourse, and celebrating the power of words.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 2xl:gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: isMobile ? 0.3 : 0.6,
                  delay: isMobile ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-orange-100 h-full md:hover:shadow-xl md:hover:-translate-y-2 transition-all duration-300">
                  <div className="inline-block p-3 bg-linear-to-r from-orange-500 to-amber-500 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 2xl:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -30 : 30) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: isMobile ? 0.3 : 0.6,
                  delay: isMobile ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden h-full md:hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300">
                  {/* Gradient Background on Hover - desktop only */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 md:group-hover:opacity-5 transition-opacity duration-400`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-linear-to-br ${feature.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto bg-linear-to-br from-orange-50 to-amber-50 rounded-3xl p-10 md:p-12 2xl:p-16 border border-orange-100 shadow-xl relative overflow-hidden">
            {/* Static decorative elements instead of animated ones */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl" />
            <p className="text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed italic relative z-10">
              "We believe every story deserves to be told, every voice deserves
              to be heard, and every word has the power to inspire change."
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-12 h-1 bg-linear-to-r from-orange-500 to-amber-500 rounded-full"></div>
              <Sparkles className="w-5 h-5 text-orange-500" />
              <div className="w-12 h-1 bg-linear-to-r from-amber-500 to-orange-500 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
