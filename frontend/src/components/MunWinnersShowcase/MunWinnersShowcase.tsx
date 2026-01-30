import React from 'react';
import { Gavel, Mic, FileText, Scroll, PenTool, Star, Crown, GraduationCap, Quote, Globe } from 'lucide-react';

const MunWinnersShowcase = () => {
  // Data structure for MUN Awards
  const awards = [
    {
      id: "delegate",
      title: "Best Delegate",
      icon: <Gavel className="w-6 h-6" />,
      description: "Demonstrated exceptional diplomacy and leadership.",
      highlight: true, // Special full-width styling
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
      winners: [
        { name: "Vivekanand Tiwari", dept: "IT, 1st Year" }
      ]
    },
    {
      id: "journalist",
      title: "Best Journalist",
      icon: <PenTool className="w-5 h-5" />,
      description: "Reported committee proceedings with flair.",
      winners: [
        { name: "Kaushiki Kesarwani", dept: "CSE, 1st Year" }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-amber-100/50 blur-3xl rounded-full opacity-60" />
        <div className="absolute inset-0 opacity-[0.1]" 
             style={{ backgroundImage: 'radial-gradient(#a8a29e 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>
        <Globe className="absolute top-10 right-10 w-64 h-64 text-stone-200/40 -rotate-12" />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
          <span>Malaviya Model United Nations</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6 font-serif">
          Awards of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Diplomacy</span>
        </h1>
        
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Honoring the delegates who shaped the debate, drafted the solutions, and led the committees with distinction.
        </p>
      </div>

      {/* --- AWARDS GRID --- */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        
        {/* Render Awards */}
        {/* Best Delegate - Highlight Card */}
        <div className="relative group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-amber-100/90 backdrop-blur-md shadow-2xl ring-4 ring-amber-100/50 border border-amber-200/50 mb-6">
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <Crown className="w-32 h-32 rotate-12 text-amber-900" />
            </div>
            
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl flex items-center justify-center bg-amber-500 text-stone-900 shadow-lg shadow-amber-500/20">
                            {awards[0].icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900">{awards[0].title}</h3>
                            <p className="text-sm mt-1 text-stone-600">{awards[0].description}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-3">
                    {awards[0].winners.map((winner, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl transition-colors bg-white/60 hover:bg-white/80 border border-amber-100/50 shadow-sm">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-amber-500 text-stone-900">
                                {idx + 1}
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold truncate text-stone-900">{winner.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <GraduationCap className="w-3 h-3 text-stone-400" />
                                    <p className="text-xs truncate text-stone-500">{winner.dept}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Lower Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Col 1: Best Orator */}
            <div className="bg-white/60 backdrop-blur-md border border-stone-200 shadow-sm hover:shadow-lg hover:border-amber-200 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 h-full">
                <AwardHeader award={awards[1]} />
                <WinnersList award={awards[1]} />
            </div>

            {/* Col 2: Best Position Paper */}
            <div className="bg-white/60 backdrop-blur-md border border-stone-200 shadow-sm hover:shadow-lg hover:border-amber-200 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 h-full">
                 <AwardHeader award={awards[2]} />
                 <WinnersList award={awards[2]} />
            </div>

            {/* Col 3: Stacked (Resolution + Journalist) */}
            <div className="flex flex-col gap-4 h-full">
                {/* Top Half: Best Resolution */}
                 <div className="bg-white/60 backdrop-blur-md border border-stone-200 shadow-sm hover:shadow-lg hover:border-amber-200 rounded-2xl p-6 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1 flex-1">
                    <AwardHeader award={awards[3]} />
                    <WinnersList award={awards[3]} />
                </div>

                {/* Bottom Half: Best Journalist */}
                 <div className="bg-white/60 backdrop-blur-md border border-stone-200 shadow-sm hover:shadow-lg hover:border-amber-200 rounded-2xl p-6 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1 flex-1">
                    <AwardHeader award={awards[4]} />
                    <WinnersList award={awards[4]} />
                </div>
            </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="mt-20 text-center border-t border-stone-200 pt-8">
        <div className="flex items-center justify-center gap-2 text-stone-400 text-sm font-medium">
          <Quote className="w-4 h-4" />
          <span>Diplomacy is the art of letting someone else have your way.</span>
        </div>
      </div>

    </div>
  );
};

// Helper Components for Cleaner Layout
const AwardHeader = ({ award }: { award: any }) => (
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl flex items-center justify-center bg-stone-100/50 text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
        {award.icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-stone-800">{award.title}</h3>
        <p className="text-sm mt-1 text-stone-500">{award.description}</p>
      </div>
    </div>
  </div>
);

const WinnersList = ({ award }: { award: any }) => (
  <div className="mt-4 grid gap-3 grid-cols-1 md:grid-cols-1">
    {award.winners.map((winner: any, idx: number) => (
      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl transition-colors bg-stone-50/50 hover:bg-amber-50/80 border border-stone-100/50">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-600">
          {idx + 1}
        </div>
        <div className="min-w-0">
          <p className="font-semibold truncate text-stone-900">{winner.name}</p>
           {winner.dept && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <GraduationCap className="w-3 h-3 text-stone-400" />
                <p className="text-xs truncate text-stone-500">{winner.dept}</p>
              </div>
           )}
        </div>
      </div>
    ))}
  </div>
);

export default MunWinnersShowcase;
