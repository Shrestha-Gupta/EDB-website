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
    image: '',
  },
  {
    id: 2,
    name: 'Anurag Banerjee',
    department: 'Computer Science and Engineering',
    image: '',
  },
  {
    id: 3,
    name: 'Anushka Shukla',
    department: 'Civil Engineering',
    image: '',
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
    name: 'Ritesh',
    department: 'Computer Science and Engineering',
    image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621946/ritesh_f7iw3x.jpg',
  },
  {
    id: 12,
    name: 'Shambhavi',
    department: 'Information Technology',
    image: '',
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
