import { motion } from 'framer-motion'
import TeamCard from '../components/TeamCard/TeamCard'
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground'

const finalYearTeam = [
  {
    id: 1,
    name: 'Aadrika Barnwal',
    department: 'Information Technology',
    image: '',
  },
  {
    id: 2,
    name: 'Aastha Singh',
    department: 'Civil Engineering',
    image: '',
  },
  {
    id: 3,
    name: 'Harshit Pandey',
    department: 'Mechanical Engineering',
    image: '',
  },
  {
    id: 4,
    name: 'Jayant Singh',
    department: 'Electronics and Communication Engineering',
    image: '',
  },
  {
    id: 5,
    name: 'Jyoti Singh',
    department: 'Bachelor of Pharmacy',
    image: '',
  },
  {
    id: 6,
    name: 'Nandini Mishra',
    department: 'Civil Engineering',
    image: '',
  },
  {
    id: 7,
    name: 'Shivam Pal',
    department: 'Computer Science & Engineering',
    image: '',
  },
  {
    id: 8,
    name: 'Shivam Rai',
    department: 'Computer Science & Engineering',
    image: '',
  },
  {
    id: 9,
    name: 'Vishal Kotak',
    department: 'Information Technology',
    image: '',
  },
  {
    id: 10,
    name: 'Vishwadeep Singh',
    department: 'Computer Science & Engineering',
    image: '',
  },
  {
    id: 11,
    name: 'Vivek Mani Tripathy',
    department: 'Information Technology',
    image: '',
  }
];

const preFinalTeam = [
  {
    id: 1,
    name: 'Aditi Sharma',
    department: 'Electronics and Communication Engineering',
    image: '',
  },
  {
    id: 2,
    name: 'Alok Kumar',
    department: 'Electronics and Communication Engineering',
    image: '',
  },
  {
    id: 3,
    name: 'Ashmi Singh',
    department: 'Electrical Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20251211-WA0004_-_ASHMI_SINGH_dp8an0.jpg',
  },
  {
    id: 4,
    name: 'Divyansh Singh Rathore',
    department: 'Electronics and Communication Engineering',
    image: '',
  },
  {
    id: 5,
    name: 'Gaurav Vishwakarma',
    department: 'Electronics and Communication Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20250301-WA0024_-_GAURAV_VISHWAKARMA_vep5e1.jpg',
  },
  {
    id: 6,
    name: 'Himanshu Mishra',
    department: 'Chemical Engineering',
    image: '',
  },
  {
    id: 7,
    name: 'Jagriti Singh',
    department: 'Civil Engineering',
    image: '',
  },
  {
    id: 8,
    name: 'Pragya Kumari',
    department: 'Electrical Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641916/WhatsApp_Image_2025-12-13_at_21.34.40_ahne8s.jpg',
  },
  {
    id: 9,
    name: 'Pranav Mishra',
    department: 'Information Technology',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622863/IMG0250725_205903_WhatsApp_-_Pranav_Mishra_moxnqf.jpg',
  },
  {
    id: 10,
    name: 'Shatakshi Srivastava',
    department: 'Electronics and Communication Engineering',
    image: '',
  },
  {
    id: 11,
    name: 'Vaishnavi Rai',
    department: 'Civil Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20251211-WA0000_-_Vaishnavi_Rai_jez32z.jpg',
  },
  {
    id: 12,
    name: 'Vinayak Yadav',
    department: 'Information Technology',
    image: '',
  },
  {
    id: 13,
    name: 'Yashvardhan Ojha',
    department: 'Computer Science and Engineering',
    image: '',
  },
  {
    id: 14,
    name: 'Shreshtha Gupta',
    department: 'Electronics and Communication Engineering',
    image: '',
  },
];


const sophomoreTeam = [
  {
    id: 1,
    name: 'Aditi Mishra',
    department: 'Electronics and Communication Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765646713/IMG_20251028_064513492_2_-_Akansha_Mishra_tmbqyz.jpg',
  },
  {
    id: 2,
    name: 'Anurag Banerjee',
    department: 'Computer Science and Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765646717/1000071523_-_Anurag_Banerjee_vsb06m.jpg',
  },
  {
    id: 3,
    name: 'Anushka Shukla',
    department: 'Civil Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765648279/1000140304_-_Anushka_Shukla_leluen.jpg',
  },
  {
    id: 4,
    name: 'Arpit Tripathi',
    department: 'Computer Science and Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641690/1000070315-removebg-preview_-_Arpit_Tripathi_lovf7l.png',
  },
  {
    id: 5,
    name: 'Gaurav',
    department: 'Electrical Engineering',
    image: '',
  },
  {
    id: 6,
    name: 'Kaustubh Nigam',
    department: 'Information Technology',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621857/20250625_133952_-_Kaustubh_Nigam_p5yl7v.jpg',
  },
  {
    id: 7,
    name: 'Mayank Sharma',
    department: 'Civil Engineering',
    image: '',
  },
  {
    id: 8,
    name: 'Ojashwani Singh Chauhan',
    department: 'Mechanical Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641689/Screenshot_20251213_164042_Gallery_-_ojashwani_singh_cb9jdj.jpg',
  },
  {
    id: 9,
    name: 'Prathit Mishra',
    department: 'Electrical Engineering',
    image: '',
  },
  {
    id: 10,
    name: 'Pratyaditya Singh',
    department: 'Electrical Engineering',
    image: '',
  },
  {
    id: 11,
    name: 'Ritesh Yadav',
    department: 'Computer Science and Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621946/ritesh_f7iw3x.jpg',
  },
  {
    id: 12,
    name: 'Shambhavi',
    department: 'Information Technology',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765648259/IMG-20250724-WA0018_-_Shambhavi_wd2pe4.jpg',
  },
  {
    id: 13,
    name: 'Shlok',
    department: 'Computer Science and Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641663/44249_fvzbka.jpg',
  },
  {
    id: 14,
    name: 'Shivam Gupta',
    department: 'Electronics and Communication Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png',
  },
  {
    id: 15,
    name: 'Tushit Shaurya',
    department: 'Electrical Engineering',
    image: '',
  },
];


export default function TeamPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

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

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => scrollToSection('final-year')}
            className="bg-linear-to-r from-brand-gold to-brand-orange hover:from-brand-orange hover:to-brand-gold active:from-brand-gold active:to-brand-orange focus:from-brand-gold focus:to-brand-orange text-white font-bold py-3 px-8 rounded-xl text-base sm:text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Final Year
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('pre-final')}
            className="bg-linear-to-r from-brand-cyan to-brand-teal hover:from-brand-teal hover:to-brand-cyan active:from-brand-cyan active:to-brand-teal focus:from-brand-cyan focus:to-brand-teal text-white font-bold py-3 px-8 rounded-xl text-base sm:text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Pre-Final Year
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('sophomore')}
            className="border-2 border-brand-gold text-black bg-white hover:bg-brand-gold/10 active:bg-brand-gold/10 focus:bg-white font-bold py-3 px-8 rounded-xl text-base sm:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Sophomore
          </motion.button>
        </motion.div>

        {/* Final Year Team Section */}
        <motion.div
          id="final-year"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Final Year Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-6">
            {finalYearTeam.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role=""
                department={member.department}
                skills={[]}
                image={member.image}
              />
            ))}
          </div>
        </motion.div>

        {/* Pre-Final Year Team Section */}
        <motion.div
          id="pre-final"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Pre-Final Year Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {preFinalTeam.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role=""
                department={member.department}
                skills={[]}
                image={member.image}
              />
            ))}
          </div>
        </motion.div>

        {/* Sophomore Team Section */}
        <motion.div
          id="sophomore"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Sophomore Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {sophomoreTeam.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role=""
                department={member.department}
                skills={[]}
                image={member.image}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
