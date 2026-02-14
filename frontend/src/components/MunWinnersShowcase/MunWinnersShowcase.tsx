import React from 'react';
import { Gavel, Mic, FileText, Scroll, PenTool, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const MunWinnersShowcase = () => {
  // Data structure for MUN Awards
  const awards = [
    {
      id: "delegate",
      title: "Best Delegate",
      icon: <Gavel className="w-6 h-6" />,
      description: "Demonstrated exceptional diplomacy and leadership.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
      color: "bg-amber-600",
      winners: [
        { name: "Aditya Pandey", dept: "EE, 1st Year" },
        { name: "Vedansh Tiwari", dept: "IT, 1st Year" },
        { name: "Shreyash Ranjan Thakur", dept: "ECE, 1st Year" }
      ]
    },
    {
      id: "orator",
      title: "Best Orator",
      icon: <Mic className="w-5 h-5" />,
      description: "Captivated the committee with powerful speeches.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
      color: "bg-amber-600",
      winners: [
        { name: "Parul Tiwari", dept: "IT, 1st Year" },
        { name: "Ananaya Kumar", dept: "EE, 1st Year" },
        { name: "Lungshen Ailly", dept: "CE, 1st Year" }
      ]
    },
    {
      id: "paper",
      title: "Best Position Paper",
      icon: <FileText className="w-5 h-5" />,
      description: "Exhibited outstanding research and policy analysis.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      color: "bg-amber-600",
      winners: [
        { name: "Shaurya Kumar", dept: "ECE, 1st Year" },
        { name: "Ananya Prasad", dept: "ECE, 1st Year" }
      ]
    },
    {
      id: "resolution",
      title: "Best Resolution",
      icon: <Scroll className="w-5 h-5" />,
      description: "Crafted the most comprehensive solutions.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      color: "bg-amber-600",
      winners: [
        { name: "Vivekanand Tiwari", dept: "IT, 1st Year" }
      ]
    },
    {
      id: "journalist",
      title: "Best Journalist",
      icon: <PenTool className="w-5 h-5" />,
      description: "Reported committee proceedings with flair.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      color: "bg-amber-600",
      winners: [
        { name: "Kaushiki Kesarwani", dept: "CSE, 1st Year" }
      ]
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 text-stone-900 py-8 px-4 sm:px-6 lg:px-8">

      {/* --- HEADER --- */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
          <span>Malaviya Model United Nations</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
          Awards of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700">Diplomacy</span>
        </h1>

        <p className="text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Honoring the delegates who shaped the debate, drafted the solutions, and led the committees with distinction.
        </p>
      </div>

      {/* --- AWARDS --- */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-6">

        {/* Best Delegate - Full Width Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative group overflow-hidden bg-white border border-stone-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={awards[0].image}
              alt=""
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80"></div>
            {/* Dot Pattern */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            ></div>
          </div>

          <div className="relative p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 flex items-center justify-center bg-amber-600 text-white shadow-lg">
                {awards[0].icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-stone-900">{awards[0].title}</h3>
                <p className="text-sm mt-1 text-stone-600">{awards[0].description}</p>
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {awards[0].winners.map((winner, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white/80 border border-stone-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-600"></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-stone-900">{winner.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-3 h-3 text-stone-400" />
                      <p className="text-xs text-stone-500">{winner.dept}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lower Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {awards.slice(1).map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden bg-white border border-stone-200 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={award.image}
                  alt=""
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85"></div>
                {/* Dot Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: 'radial-gradient(#78716c 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                ></div>
              </div>

              <div className="relative p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 flex items-center justify-center ${award.color} text-white shadow-md`}>
                    {award.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-stone-900">{award.title}</h3>
                    <p className="text-xs mt-0.5 text-stone-600">{award.description}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {award.winners.map((winner, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/70 border border-stone-200 hover:bg-white/90 transition-all">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-stone-900">{winner.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <GraduationCap className="w-3 h-3 text-stone-400" />
                          <p className="text-xs text-stone-500">{winner.dept}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MunWinnersShowcase;
