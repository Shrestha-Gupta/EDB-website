import { Trophy, Medal, Star, Crown, Users, ChevronRight, Share2, Sparkles, Zap, User } from 'lucide-react';

const WinnersShowcase = () => {
  // Mock data for the 3 winning teams
  const winners = [
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

  return (
    <div className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Header Section
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-amber-200 text-amber-700 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="tracking-wide">2026 Championship Finals</span>
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900 mb-6 drop-shadow-sm">
          Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">Victory</span>
        </h1>
        
        <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Celebrating the rising stars who outshined the competition.
          <br className="hidden md:block" /> Meet the legends forged in the heat of battle.
        </p>
      </div> */}

      {/* Podium Layout */}
      <div className="relative z-10 max-w-[90rem] mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8 pb-12">
          
          {winners.map((team) => {
            const isFirst = team.rank === 1;
            
            // Layout ordering
            const orderClass = isFirst ? 'lg:order-2' : team.rank === 2 ? 'lg:order-1' : 'lg:order-3';

            // Stepped podium margins
            const marginClass = isFirst ? 'lg:mt-0' : team.rank === 2 ? 'lg:mt-16' : 'lg:mt-32';
            
            return (
              <div 
                key={team.teamName}
                className={`w-full max-w-xl ${orderClass} ${marginClass} relative group transition-all duration-500 hover:-translate-y-2`}
              >
                {/* 1st Place Special: Crown Icon Floating Above */}
                {isFirst && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-500 animate-bounce" style={{ animationDuration: '3s' }}>
                        <Crown className="w-8 h-8 fill-amber-200" />
                    </div>
                )}

                {/* Glow Effect for First Place */}
                {isFirst && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                )}

                {/* Card Container */}
                <div className={`relative bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl ${isFirst ? 'border-0 ring-4 ring-amber-100/50 ring-offset-2 ring-offset-transparent' : 'border border-white/40'} flex flex-col h-full`}>
                  
                  {/* Decorative Corner Accents (1st Place Only) */}
                  {isFirst && (
                    <>
                      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rotate-45 transform pointer-events-none"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                    </>
                  )}

                  {/* Card Header / Banner */}
                  <div className="px-5 py-5 sm:px-6 sm:py-6 relative overflow-hidden bg-white/20 backdrop-blur-sm border-b border-white/20">
                    
                    {/* Background Pattern for Header */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>

                    <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start z-10 gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {isFirst ? <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" /> : <Medal className="w-4 h-4 text-amber-600 flex-shrink-0" />}
                          <span className="font-bold tracking-widest uppercase text-xs text-amber-700">
                            {team.rank === 1 ? 'Grand Champion' : `${team.rank === 2 ? 'Runner Up' : 'Third Place'}`}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight break-words text-stone-800">
                          {team.teamName}
                        </h3>
                      </div>
                      <div className="self-start sm:self-auto px-4 py-1.5 rounded-full font-bold shadow-sm whitespace-nowrap text-sm bg-white border border-stone-200 text-stone-600">
                        {team.prize}
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="p-5 sm:p-6 flex-grow bg-transparent relative">
                    {/* Subtle watermark */}
                    <div className="absolute bottom-4 right-4 opacity-[0.03] pointer-events-none">
                        <Trophy className="w-24 h-24 sm:w-32 sm:h-32" />
                    </div>

                    <p className="text-stone-600 text-sm mb-6 leading-relaxed border-l-2 border-amber-200 pl-3 italic">
                      "{team.description}"
                    </p>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
                        <Users className="w-3 h-3" />
                        <span>Squad Roster</span>
                        <div className="h-px bg-stone-100 flex-grow ml-2"></div>
                      </div>
                      
                      <div className="space-y-3">
                        {team.members.map((member, idx) => (
                          <div key={idx} className="relative group/player pl-2">
                             
                            {/* Connector Line Logic */}
                            {idx !== team.members.length - 1 && (
                                <div className={`absolute left-[26px] top-10 h-8 w-px ${isFirst ? 'bg-amber-200/40' : 'bg-stone-200/60'}`}></div>
                            )}

                            <div className={`relative flex items-center p-2 rounded-xl border transition-all duration-300
                                ${isFirst 
                                    ? 'bg-gradient-to-r from-amber-50/50 to-transparent border-amber-100/50 hover:border-amber-300 hover:shadow-md hover:from-amber-100/80 hover:-translate-x-1' 
                                    : 'bg-stone-50/30 border-stone-100 hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm hover:-translate-x-1'
                                }`}>
                                
                                <div className="flex items-center gap-3 w-full overflow-hidden">
                                    {/* Icon Container */}
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover/player:scale-110 flex-shrink-0
                                        ${isFirst 
                                            ? 'bg-amber-100 border-amber-200 text-amber-700' 
                                            : 'bg-white border-stone-200 text-stone-500 group-hover/player:text-stone-800'}`}>
                                        <User className="w-4 h-4" />
                                    </div>
                                    
                                    <div className="flex flex-col min-w-0">
                                        <span className={`text-sm font-bold tracking-tight truncate ${isFirst ? 'text-stone-900' : 'text-stone-700'}`}>
                                            {member.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
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
      
      

    </div>
  );
};

export default WinnersShowcase;
