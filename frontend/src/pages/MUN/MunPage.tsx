import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import { getEvents } from "../../services/munApi";
import type { MunEvent } from "../../services/munApi";
import { useAuth } from "../../context/AuthContext";

const MunPage = () => {
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState<MunEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const committees = [
    {
      name: "UN General Assembly",
      abbr: "UNGA",
      description: "The main deliberative organ of the UN, addressing global issues from peace to development.",
      icon: "🌍",
    },
    {
      name: "UN Security Council",
      abbr: "UNSC",
      description: "Primary responsibility for maintaining international peace and security.",
      icon: "🛡️",
    },
    {
      name: "World Health Organization",
      abbr: "WHO",
      description: "Directing and coordinating international health within the UN system.",
      icon: "🏥",
    },
    {
      name: "UN Human Rights Council",
      abbr: "UNHRC",
      description: "Promoting and protecting human rights around the globe.",
      icon: "⚖️",
    },
    {
      name: "Crisis Committee",
      abbr: "CC",
      description: "Fast-paced, dynamic committee simulating real-time international crises.",
      icon: "⚡",
    },
  ];

  const benefits = [
    { title: "Public Speaking", description: "Develop confidence and eloquence in formal settings", icon: "🎤" },
    { title: "Diplomacy", description: "Learn the art of negotiation and consensus building", icon: "🤝" },
    { title: "Research Skills", description: "Master comprehensive research on global issues", icon: "📚" },
    { title: "Critical Thinking", description: "Analyze complex problems from multiple perspectives", icon: "🧠" },
    { title: "Leadership", description: "Take initiative and guide discussions effectively", icon: "👑" },
    { title: "Global Awareness", description: "Understand international relations and world affairs", icon: "🌐" },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest uppercase text-sm"
          >
            <span className="h-px w-12 bg-amber-700/40"></span>
            The Editorial Board Presents
            <span className="h-px w-12 bg-amber-700/40"></span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-serif font-bold text-stone-900 mb-6 drop-shadow-sm">
            Model UN<span className="text-amber-600">.</span>
          </h1>

          <p className="text-xl md:text-2xl text-stone-600 font-serif italic max-w-3xl mx-auto leading-relaxed">
            "Where diplomacy meets discourse, and students become world leaders."
          </p>
        </motion.div>

        {/* What is MUN Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-xl shadow-stone-200/50">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6 text-center">
              What is <span className="text-amber-600">Model United Nations</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Model United Nations (MUN) is an academic simulation in which students role-play as
                  delegates representing different countries, committees, or organizations of the
                  United Nations.
                </p>
                <p>
                  Participants research their assigned agenda and country position, draft policy
                  statements, debate global issues, negotiate with other delegates, and work
                  collaboratively to pass resolutions—mirroring real UN procedures.
                </p>
                <p>
                  Beyond debate, MUN fosters global awareness, respect for diverse perspectives, and
                  the ability to articulate solutions to complex international problems in a formal,
                  structured environment.
                </p>
                <p>
                  <h1 className="font-bold text-xl">Agenda</h1>
                 Deliberation on the Human Rights Situation in and around Nagorno-Karabakh, with
Special Emphasis on Alleged Human Rights Violations against the Armenian
Population, the Impact of Military Operations by the Republic of Azerbaijan, and the
Role of External Support, Including That of the Republic of Turkey
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-linear-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-8xl">🇺🇳</span>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                    🎓
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Committees Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8 text-center">
            Common <span className="text-amber-600">Committees</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/50 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{committee.icon}</span>
                <h3 className="text-xl font-bold text-stone-900 mb-1">{committee.name}</h3>
                <span className="text-amber-600 font-semibold text-sm">({committee.abbr})</span>
                <p className="text-stone-600 mt-3 text-sm leading-relaxed">{committee.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills/Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8 text-center">
            Skills You'll <span className="text-amber-600">Develop</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/50"
              >
                <span className="text-4xl mb-3 block">{benefit.icon}</span>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{benefit.title}</h3>
                <p className="text-stone-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* MUN Flow Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8 text-center">
            How It <span className="text-amber-600">Works</span>
          </h2>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {[
                { step: "1", title: "Register", icon: "📝" },
                { step: "2", title: "Complete Profile", icon: "👤" },
                { step: "3", title: "Apply for Event", icon: "📋" },
                { step: "4", title: "Get Allotment", icon: "🎯" },
                { step: "5", title: "Submit Position Paper", icon: "📄" },
                { step: "6", title: "Participate!", icon: "🏆" },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <span className="text-amber-600 font-bold text-xs">Step {item.step}</span>
                    <p className="text-stone-900 font-semibold text-sm mt-1">{item.title}</p>
                  </div>
                  {index < 5 && (
                    <div className="hidden md:block text-amber-400 mx-2">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Active Events Section */}
        {!loading && events.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8 text-center">
              Upcoming <span className="text-amber-600">Events</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/50 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">{event.title}</h3>
                  <p className="text-stone-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-4">
                    <span className="flex items-center gap-1">
                      📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">📍 {event.venue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 font-semibold text-sm">
                      {event.committees.length} Committees
                    </span>
                    <Link
                      to={isAuthenticated ? `/mun/apply/${event._id}` : "/mun/login"}
                      className="px-4 py-2 bg-linear-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-full text-sm hover:shadow-lg transition-all"
                    >
                      Apply Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-3xl p-10 md:p-16 border border-stone-200 shadow-xl shadow-stone-200/50"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            Ready to Represent?
          </h2>
          <p className="text-stone-600 text-lg mb-8 max-w-2xl mx-auto">
            Join our Model United Nations and experience the thrill of international diplomacy.
            Register now to be part of something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/mun/dashboard"
                className="px-10 py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white text-lg font-bold rounded-full shadow-lg shadow-amber-900/20 hover:shadow-amber-900/30 transition-all duration-300"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/mun/register"
                  className="px-10 py-4 bg-linear-to-r from-amber-600 to-orange-600 text-white text-lg font-bold rounded-full shadow-lg shadow-amber-900/20 hover:shadow-amber-900/30 transition-all duration-300"
                >
                  Register Now 🚀
                </Link>
                <Link
                  to="/mun/login"
                  className="px-10 py-4 bg-white border-2 border-amber-600 text-amber-600 text-lg font-bold rounded-full hover:bg-amber-50 transition-all duration-300"
                >
                  Already Registered? Login
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MunPage;
