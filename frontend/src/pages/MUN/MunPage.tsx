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
      name: "UN Human Rights Council",
      abbr: "UNHRC",
      description: "Promoting and protecting human rights around the globe. The UNHRC addresses situations of human rights violations and makes recommendations on them.",
    },
    {
      name: "International Press",
      abbr: "IP",
      description: "Report on committee proceedings, interview delegates, and produce news articles capturing the essence of diplomatic discussions.",
    },
  ];

  const awards = [
    { title: "Best Delegate", description: "Outstanding overall performance" },
    { title: "Best Position Paper", description: "Excellence in research" },
    { title: "Best Orator", description: "Exceptional public speaking" },
    { title: "Best Resolution", description: "Well-drafted resolution" },
    { title: "Best Journalist", description: "Outstanding reporting" },
  ];

  return (
    <div className="bg-stone-50 min-h-screen relative overflow-x-hidden font-sans">
      <ParticlesBackground />

      {/* Background Shapes */}
      <div className="absolute top-20 right-0 w-125 h-125 bg-amber-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] left-0 w-100 h-100 bg-orange-100/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 pt-20">
        <motion.div 
          className="text-center max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-amber-700 font-medium tracking-widest uppercase text-xs mb-6"
          >
            The Editorial Board Presents
          </motion.p>

          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-stone-900 leading-[0.9] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Model
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-500">
              United Nations
            </span>
          </motion.h1>

          <motion.p 
            className="text-stone-500 text-lg md:text-xl max-w-lg mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Step into the shoes of world leaders. Debate. Negotiate. Make history.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to={isAuthenticated ? "/mun/dashboard" : "/mun/register"}
              className="px-8 py-4 bg-stone-900 text-white font-medium rounded-full hover:bg-stone-800 transition-colors"
            >
              {isAuthenticated ? "Go to Dashboard" : "Register Now"} →
            </Link>
            <a href="#about" className="px-8 py-4 text-stone-600 font-medium hover:text-stone-900 transition-colors">
              Learn more ↓
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* What is MUN */}
        <section id="about" className="py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">About</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-2 mb-6">
                What is MUN?
              </h2>
              <div className="space-y-4 text-stone-600">
                <p>
                  Model United Nations (MUN) is a simulation of the United Nations where participants, 
                  called delegates, represent countries or organizations in discussions on global issues.
                </p>
                <p>
                  It helps students to dive deep into the nuances of world building while they are in 
                  their formative years.
                </p>
                <p>
                  Delegates debate, negotiate, and work together to solve problems such as human rights, 
                  climate change, or international security.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-3 bg-amber-100 rounded-2xl -rotate-2" />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/UN_General_Assembly_hall.jpg/1280px-UN_General_Assembly_hall.jpg" 
                alt="UN General Assembly" 
                className="relative rounded-xl w-full h-64 object-cover shadow-lg"
              />
              <div className="absolute -bottom-3 -right-3 bg-white px-5 py-2.5 rounded-lg shadow-md">
                <p className="font-bold text-stone-900">Jan 18, 2026</p>
                <p className="text-stone-500 text-sm">Conference begins</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Agenda */}
        <section className="py-20">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Conference Topic</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-2">The Agenda</h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-amber-500 via-orange-500 to-red-500" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }} />
            </div>
            
            <div className="relative p-8 md:p-12 lg:p-16">
              {/* UNHRC Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span className="text-white font-semibold text-sm uppercase tracking-wider">UN Human Rights Council</span>
                </div>
              </div>
              
              {/* Agenda Text */}
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-white/80 text-sm uppercase tracking-widest mb-4">Official Agenda</p>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-white leading-relaxed font-medium">
                  "Deliberation on the Human Rights Situation in and around Nagorno-Karabakh, with 
                  Special Emphasis on Alleged Human Rights Violations against the Armenian Population, 
                  the Impact of Military Operations by the Republic of Azerbaijan, and the Role of 
                  External Support, Including That of the Republic of Turkey"
                </h3>
              </div>
              
              {/* Decorative elements */}
              <div className="flex justify-center mt-8 gap-2">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Resources */}
        <section className="py-20">
          <div className="mb-10">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Resources</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-2">Prepare for MUN</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Rules of Procedure</h3>
              <p className="text-stone-500 text-sm mb-4">
                Download our PDF guide covering debate formats, motions, and procedures.
              </p>
              <a href="/mun-guide.pdf" target="_blank" className="text-red-600 font-medium text-sm hover:underline">
                Download PDF ↓
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100"
            >
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/BYYwBLJ9q5E?rel=0&modestbranding=1"
                  title="MUN Guide"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-stone-900">Video Guide</h3>
                <p className="text-stone-500 text-sm">Learn MUN procedures visually</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Committees */}
        <section className="py-20">
          <div className="mb-10">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">This Year</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-2">Committees</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.abbr}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${index === 0 ? 'bg-blue-50' : 'bg-amber-50'}`}>
                  {index === 0 ? (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-1">{committee.name}</h3>
                <span className="text-amber-600 font-medium text-sm">{committee.abbr}</span>
                <p className="text-stone-500 text-sm mt-3">{committee.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="py-20">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Recognition</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-2">Awards</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100"
              >
                <span className="text-2xl mb-2 block">{['🏆', '📜', '🎤', '📋', '🗞️'][index]}</span>
                <h4 className="font-bold text-stone-900 text-sm">{award.title}</h4>
                <p className="text-stone-500 text-xs mt-1">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-2">How to Participate</h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { num: "1", title: "Register" },
              { num: "2", title: "Profile" },
              { num: "3", title: "Apply" },
              { num: "4", title: "Allotment" },
              { num: "5", title: "Prepare" },
              { num: "6", title: "Debate" },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="w-10 h-10 bg-white border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-amber-600 font-bold text-sm">{step.num}</span>
                </div>
                <p className="font-medium text-stone-900 text-sm">{step.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Events */}
        {!loading && events.length > 0 && (
          <section className="py-20">
            <div className="mb-10">
              <span className="text-amber-600 font-medium text-sm uppercase tracking-wider">Upcoming</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-2">Events</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div key={event._id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{event.title}</h3>
                  <p className="text-stone-500 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex gap-4 text-sm text-stone-400 mb-4">
                    <span>📅 {new Date(event.startDate).toLocaleDateString()}</span>
                    <span>📍 {event.venue}</span>
                  </div>
                  <Link
                    to={isAuthenticated ? `/mun/apply/${event._id}` : "/mun/login"}
                    className="text-amber-600 font-medium text-sm hover:underline"
                  >
                    Apply now →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20">
          <div className="bg-stone-900 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 to-orange-500/10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Ready to represent your nation?
              </h2>
              <p className="text-stone-400 mb-8 max-w-md mx-auto">
                Join hundreds of delegates in shaping diplomatic discourse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuthenticated ? (
                  <Link to="/mun/dashboard" className="px-8 py-4 bg-white text-stone-900 font-semibold rounded-full hover:bg-stone-100 transition-colors">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/mun/register" className="px-8 py-4 bg-white text-stone-900 font-semibold rounded-full hover:bg-stone-100 transition-colors">
                      Register Now
                    </Link>
                    <Link to="/mun/login" className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="h-16" />
      </div>
    </div>
  );
};

export default MunPage;
