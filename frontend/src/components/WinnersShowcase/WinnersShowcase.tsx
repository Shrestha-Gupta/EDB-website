import { Users, Award, TrendingUp, Pen, Mic, Feather } from 'lucide-react';

const WinnersShowcase = () => {
  // Arunoday team winners data
  const arunodayWinners = [
    {
      rank: 1,
      teamName: "There_are_days",
      prize: "1st Place",
      description: "Undefeated champions with a perfect record.",
      members: [
        { name: "Arpita Gupta (CSE, 1st Year)" },
        { name: "Anvesha Sonkar (CSE, 1st Year)" },
        { name: "Rimjhim Bhatnagar (CSE, 1st Year)" },
        { name: "Tanya Pal (ECE, 1st Year)" }
      ]
    },
    {
      rank: 2,
      teamName: "Aurora",
      prize: "2nd Place",
      description: "Exceptional strategy and consistent performance throughout.",
      members: [
        { name: "Aditi Vimal (EE, 1st Year)" },
        { name: "Varsha Tripathi (CE, 1st Year)" },
        { name: "Ishita Gupta (ECE-IoT, 1st Year)" },
        { name: "Anamika Arya (CSE, 1st Year)" }
      ]
    },
    {
      rank: 3,
      teamName: "Oppulent",
      prize: "3rd Place",
      description: "A surprise underdog story of the season.",
      members: [
        { name: "Dea Jayant (ME 1st Year)" },
        { name: "Christina Chisi (CE, 1st Year)" },
        { name: "Manyung Konyak (ECE, 1st Year)" },
        { name: "Lungshen Ailly (ECE, 1st Year)" }
      ]
    },
  ];

  // Individual event winners data
  const pralekhWinners = [
    { 
      rank: 1, 
      teamName: "Ink and Insight", 
      description: "Outstanding newsletter creativity and design",
      members: [
        "Annisha Pal (ME, 1st Year)",
        "Akshata Shivasaiana (ME, 1st Year)"
      ]
    },
    { 
      rank: 2, 
      teamName: "Pratekshan", 
      description: "Exceptional storytelling and journalistic excellence",
      members: [
        "Nishoo Yadav (ECE, 1st Year)",
        "Anushka Raj (ECE, 1st Year)",
        "Aditi Singh (EE, 1st Year)",
        "Jagriti Maurya (ECE, 1st Year)"
      ]
    },
    { 
      rank: 3, 
      teamName: "Farmaan", 
      description: "Creative presentation and engaging content",
      members: [
        "Atharv Rajpoot (CSE, 1st Year)",
        "Abhinn Rao (ECE-IoT, 1st Year)",
        "Kaushiki Kesarwani (CSE, 1st Year)",
        "Palak Rathore (BBA, 1st Year)"
      ]
    }
  ];

  const openMicWinners = [
    { rank: 1, name: "Manan Baranwal", details: "IT, 1st Year" },
    { rank: 2, name: "Divyanand Pandey", details: "CSE, 1st Year" },
    { rank: 3, name: "Vedansh Tiwari", details: "IT, 1st Year" }
  ];

  const plotlinesWinners = [
    { rank: 1, name: "Aryan Mathur", details: "CSE, 1st Year" },
    { rank: 2, name: "Ananya Prasad", details: "ECE, 1st Year" },
    { rank: 3, name: "Vishal Yadav", details: "ECE, 1st Year" }
  ];

  return (
    <div className="relative w-full py-8 px-4 sm:px-6 lg:px-8">

      {/* Arunoday Team Winners Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-1">
            Arunoday '26 Winners
          </h2>
          <p className="text-stone-600 text-sm">The teams that excelled in the main event</p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8">
          {arunodayWinners.map((team) => {
            const isFirst = team.rank === 1;
            const isSecond = team.rank === 2;
            const isThird = team.rank === 3;
            
            return (
              <div 
                key={team.teamName}
                className={`w-full lg:w-1/3 group`}
              >
                <div className="relative overflow-hidden h-full flex flex-col bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  
                  <div className={`h-1 ${
                    isFirst ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600' :
                    isSecond ? 'bg-gradient-to-r from-stone-400 via-stone-500 to-stone-400' :
                    'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700'
                  }`} />

                  <div className="relative overflow-hidden">
                    <img 
                      src={isFirst 
                        ? "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=1000&auto=format&fit=crop"
                        : isSecond
                        ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop"
                        : "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop"
                      }
                      alt={`Rank ${team.rank}`}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/85" />
                    
                    <div className="absolute top-5 right-5 z-10">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shadow-md ${
                        isFirst ? 'bg-amber-500 text-white' :
                        isSecond ? 'bg-stone-400 text-white' :
                        'bg-amber-700 text-white'
                      }`}>
                        {team.rank}
                      </div>
                    </div>
                    
                    <div className="relative z-10 px-6 pt-6 pb-5">
                      <div className="pr-14">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3 ${
                          isFirst ? 'bg-amber-100/80 text-amber-800' :
                          isSecond ? 'bg-stone-100/80 text-stone-700' :
                          'bg-amber-50/80 text-amber-900'
                        }`}>
                          <Award className="w-3.5 h-3.5" />
                          {team.rank === 1 ? 'Champion' : team.rank === 2 ? 'Runner Up' : 'Third Place'}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight mb-3">
                          {team.teamName}
                        </h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {team.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative flex-1 flex flex-col">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none" />
                    <div className={`absolute inset-0 pointer-events-none ${
                      isFirst ? 'bg-gradient-to-b from-amber-50/40 via-orange-50/30 to-white/50' :
                      isSecond ? 'bg-gradient-to-b from-stone-50/40 via-stone-50/30 to-white/50' :
                      'bg-gradient-to-b from-amber-50/30 via-amber-50/20 to-white/50'
                    }`} />

                    <div className="relative z-10 h-px bg-stone-200 mx-6 mt-1" />

                    <div className="relative z-10 px-6 py-6 flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-stone-500" />
                        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                          Team Members
                        </span>
                      </div>
                      
                      <div className="space-y-2.5">
                        {team.members.map((member, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm border border-stone-200 hover:border-stone-300 hover:bg-white/80 transition-all duration-200"
                          >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isFirst ? 'bg-amber-100 text-amber-800' :
                              isSecond ? 'bg-stone-100 text-stone-700' :
                              'bg-amber-50 text-amber-800'
                            }`}>
                              {idx + 1}
                            </div>
                            <span className="text-sm text-stone-700 font-medium leading-tight">
                              {member.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Events Winners Section */}
      <div className="max-w-7xl mx-auto">
        {/* Pralekh Winners */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-1">
              Pralekh Winners
            </h2>
            <p className="text-stone-600 text-sm">Newsletter Writing Excellence</p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-center gap-6 lg:gap-8">
            {pralekhWinners.map((team) => {
              const isFirst = team.rank === 1;
              const isSecond = team.rank === 2;
              const isThird = team.rank === 3;
              
              return (
                <div 
                  key={team.teamName}
                  className="w-full lg:w-1/3 group"
                >
                  <div className="relative overflow-hidden h-full flex flex-col bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    
                    <div className={`h-1 ${
                      isFirst ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600' :
                      isSecond ? 'bg-gradient-to-r from-stone-400 via-stone-500 to-stone-400' :
                      'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700'
                    }`} />

                    <div className="relative overflow-hidden">
                      <img 
                        src={
                          team.teamName === "Ink and Insight" 
                            ? "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop"
                            : team.teamName === "Pratekshan"
                            ? "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"
                            : "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop"
                        }
                        alt={team.teamName}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/80" />
                      
                      <div className="absolute top-5 right-5 z-10">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shadow-md ${
                          isFirst ? 'bg-amber-500 text-white' :
                          isSecond ? 'bg-stone-400 text-white' :
                          'bg-amber-700 text-white'
                        }`}>
                          {team.rank}
                        </div>
                      </div>
                      
                      <div className="relative z-10 px-6 pt-6 pb-5">
                        <div className="pr-14">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3 ${
                            isFirst ? 'bg-amber-100/80 text-amber-800' :
                            isSecond ? 'bg-stone-100/80 text-stone-700' :
                            'bg-amber-50/80 text-amber-900'
                          }`}>
                            <Pen className="w-3.5 h-3.5" />
                            Newsletter Writing
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight mb-3">
                            {team.teamName}
                          </h3>
                          <p className="text-stone-600 text-sm leading-relaxed">
                            {team.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative flex-1 flex flex-col">
                      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none" />
                      <div className={`absolute inset-0 pointer-events-none ${
                        isFirst ? 'bg-gradient-to-b from-amber-50/40 via-orange-50/30 to-white/50' :
                        isSecond ? 'bg-gradient-to-b from-stone-50/40 via-stone-50/30 to-white/50' :
                        'bg-gradient-to-b from-amber-50/30 via-amber-50/20 to-white/50'
                      }`} />

                      <div className="relative z-10 h-px bg-stone-200 mx-6 mt-1" />

                      <div className="relative z-10 px-6 py-6 flex-grow">
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="w-4 h-4 text-stone-500" />
                          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                            Team Members
                          </span>
                        </div>
                        
                        <div className="space-y-2.5">
                          {team.members.map((member, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm border border-stone-200 hover:border-stone-300 hover:bg-white/80 transition-all duration-200"
                            >
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                isFirst ? 'bg-amber-100 text-amber-800' :
                                isSecond ? 'bg-stone-100 text-stone-700' :
                                'bg-amber-50 text-amber-800'
                              }`}>
                                {idx + 1}
                              </div>
                              <span className="text-sm text-stone-700 font-medium leading-tight">
                                {member}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Mic and Plotlines */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Open Mic Winners */}
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-900 mb-1">
                Open Mic Winners
              </h2>
              <p className="text-stone-600 text-sm">Poetry & Performance</p>
            </div>
            
            <div className="relative overflow-hidden bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600" />

              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop"
                  alt="Open Mic"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/80" />
                
                <div className="absolute top-5 right-5 z-10">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-amber-500 text-white">
                    <Mic className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="relative z-10 px-6 pt-6 pb-5">
                  <div className="pr-14">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3 bg-amber-100/80 text-amber-800">
                      <Award className="w-3.5 h-3.5" />
                      Individual Event
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-stone-900 leading-tight mb-3">
                      Open Mic
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Voices that inspire and captivate
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-amber-50/40 via-orange-50/30 to-white/50" />

                <div className="relative z-10 h-px bg-stone-200 mx-6 mt-1" />

                <div className="relative z-10 px-6 py-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-stone-500" />
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Winners
                    </span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {openMicWinners.map((winner) => (
                      <div 
                        key={winner.rank}
                        className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm border border-stone-200 hover:border-amber-300 hover:bg-white/80 transition-all duration-200"
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          winner.rank === 1 ? 'bg-amber-100 text-amber-800' :
                          winner.rank === 2 ? 'bg-stone-100 text-stone-700' :
                          'bg-amber-50 text-amber-800'
                        }`}>
                          {winner.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-stone-900 font-bold leading-tight">
                            {winner.name}
                          </div>
                          <div className="text-xs text-stone-500">
                            {winner.details}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plotlines Winners */}
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-900 mb-1">
                Plotlines Winners
              </h2>
              <p className="text-stone-600 text-sm">Creative Writing</p>
            </div>
            
            <div className="relative overflow-hidden bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600" />

              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop"
                  alt="Plotlines"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/80" />
                
                <div className="absolute top-5 right-5 z-10">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-amber-500 text-white">
                    <Feather className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="relative z-10 px-6 pt-6 pb-5">
                  <div className="pr-14">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3 bg-amber-100/80 text-amber-800">
                      <Award className="w-3.5 h-3.5" />
                      Individual Event
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-stone-900 leading-tight mb-3">
                      Plotlines
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Crafting captivating narratives
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-amber-50/40 via-orange-50/30 to-white/50" />

                <div className="relative z-10 h-px bg-stone-200 mx-6 mt-1" />

                <div className="relative z-10 px-6 py-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-stone-500" />
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Winners
                    </span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {plotlinesWinners.map((winner) => (
                      <div 
                        key={winner.rank}
                        className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm border border-stone-200 hover:border-amber-300 hover:bg-white/80 transition-all duration-200"
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          winner.rank === 1 ? 'bg-amber-100 text-amber-800' :
                          winner.rank === 2 ? 'bg-stone-100 text-stone-700' :
                          'bg-amber-50 text-amber-800'
                        }`}>
                          {winner.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-stone-900 font-bold leading-tight">
                            {winner.name}
                          </div>
                          <div className="text-xs text-stone-500">
                            {winner.details}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      

    </div>
  );
};

export default WinnersShowcase;
