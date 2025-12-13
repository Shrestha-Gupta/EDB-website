import { motion } from 'framer-motion'
import TeamCard from '../components/TeamCard/TeamCard'
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground'

const finalYearTeam = [
  {
    id: 1,
    name: 'John Doe',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Content', 'Design'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Editorial', 'Writing'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 4,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 5,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 6,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 7,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 8,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 9,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 10,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 11,
    name: 'Mike Johnson',
    role: 'executive',
    department: 'Computer Science & Engineering',
    skills: ['Technical', 'Management'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  }
]

const preFinalTeam = [
  {
    id: 1,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641916/WhatsApp_Image_2025-12-13_at_21.34.40_ahne8s.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 2,
    name: 'Liam Brooks',
    role: 'executive',
    department: 'Electrical Engineering',
    skills: ['Operations', 'Coordination'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20251211-WA0000_-_Vaishnavi_Rai_jez32z.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 3,
    name: 'Sophia Patel',
    role: 'executive',
    department: 'Mechanical Engineering',
    skills: ['Content', 'Community'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20251211-WA0004_-_ASHMI_SINGH_dp8an0.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 4,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622863/IMG0250725_205903_WhatsApp_-_Pranav_Mishra_moxnqf.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 5,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20250301-WA0024_-_GAURAV_VISHWAKARMA_vep5e1.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 6,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 7,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 8,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 9,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 10,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 11,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 12,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 13,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 14,
    name: 'Ava Turner',
    role: 'executive',
    department: 'Information Technology',
    skills: ['Research', 'Strategy'],
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
]

const sophomoreTeam = [
  {
    id: 1,
    name: 'Ethan Lee',
    role: 'associate',
    department: 'Computer Science & Engineering',
    skills: ['Design', 'Illustration'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641663/44249_fvzbka.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 2,
    name: 'Maya Singh',
    role: 'associate',
    department: 'Electronics & Communication',
    skills: ['Social', 'Outreach'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621946/ritesh_f7iw3x.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
  {
    id: 3,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621857/20250625_133952_-_Kaustubh_Nigam_p5yl7v.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 4,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 5,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641689/Screenshot_20251213_164042_Gallery_-_ojashwani_singh_cb9jdj.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 6,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641690/1000070315-removebg-preview_-_Arpit_Tripathi_lovf7l.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 7,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 8,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 9,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 10,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 11,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 12,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 13,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 14,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  },
   {
    id: 15,
    name: 'Noah Kim',
    role: 'associate',
    department: 'Civil Engineering',
    skills: ['Logistics', 'Support'],
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://example.com'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export default function TeamPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background - warm golden undertones for editorial prestige */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-amber-50/20 to-brand-gold/5" />
      
      {/* Particles Background */}
      <div className="absolute inset-0">
        <ParticlesBackground />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Page Header - deep black for authority, golden accent */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-black mb-4 sm:mb-6 tracking-tight leading-tight">
            Our Team
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-brand-gold via-brand-orange to-brand-gold mx-auto rounded-full" />
        </motion.div>

        {/* Final Year Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Final Year Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {finalYearTeam.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                department={member.department}
                skills={member.skills}
                image={member.image}
                linkedin={member.linkedin}
                github={member.github}
                website={member.website}
              />
            ))}
          </div>
        </motion.div>

        {/* Pre-Final Year Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Pre-Final Year Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {preFinalTeam.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                department={member.department}
                skills={member.skills}
                image={member.image}
                linkedin={member.linkedin}
                github={member.github}
                website={member.website}
              />
            ))}
          </div>
        </motion.div>

        {/* Sophomore Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Sophomore Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {sophomoreTeam.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                department={member.department}
                skills={member.skills}
                image={member.image}
                linkedin={member.linkedin}
                github={member.github}
                website={member.website}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
