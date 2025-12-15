import { motion } from 'framer-motion';
// Ensure these paths match your project structure
import TeamCard from '../components/TeamCard/TeamCard';
import ParticlesBackground from '../components/ParticlesBackground/ParticlesBackground';

// --- DATA ARRAYS ---
const finalYearTeam = [
  { id: 1, name: 'Aadrika Barnwal', department: 'Information Technology', image: '' },
  { id: 2, name: 'Aastha Singh', department: 'Civil Engineering', image: '' },
  { id: 3, name: 'Harshit Pandey', department: 'Mechanical Engineering', image: '' },
  { id: 4, name: 'Jayant Singh', department: 'Electronics and Communication Engineering', image: '' },
  { id: 5, name: 'Jyoti Singh', department: 'Bachelor of Pharmacy', image: '' },
  { id: 6, name: 'Nandini Mishra', department: 'Civil Engineering', image: '' },
  { id: 7, name: 'Shivam Pal', department: 'Computer Science & Engineering', image: '' },
  { id: 8, name: 'Shivam Rai', department: 'Computer Science & Engineering', image: '' },
  { id: 9, name: 'Vishal Kotak', department: 'Information Technology', image: '' },
  { id: 10, name: 'Vishwadeep Singh', department: 'Computer Science & Engineering', image: '' },
  { id: 11, name: 'Vivek Mani Tripathy', department: 'Information Technology', image: '' }
];

const preFinalTeam = [
  { id: 1, name: 'Aditi Sharma', department: 'Electronics and Communication Engineering', image: '' },
  { id: 2, name: 'Alok Kumar', department: 'Electronics and Communication Engineering', image: '' },
  { id: 3, name: 'Ashmi Singh', department: 'Electrical Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20251211-WA0004_-_ASHMI_SINGH_dp8an0.jpg' },
  { id: 4, name: 'Divyansh Singh Rathore', department: 'Electronics and Communication Engineering', image: '' },
  { id: 5, name: 'Gaurav Vishwakarma', department: 'Electronics and Communication Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20250301-WA0024_-_GAURAV_VISHWAKARMA_vep5e1.jpg' },
  { id: 6, name: 'Himanshu Mishra', department: 'Chemical Engineering', image: '' },
  { id: 7, name: 'Jagriti Singh', department: 'Civil Engineering', image: '' },
  { id: 8, name: 'Pragya Kumari', department: 'Electrical Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641916/WhatsApp_Image_2025-12-13_at_21.34.40_ahne8s.jpg' },
  { id: 9, name: 'Pranav Mishra', department: 'Information Technology', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622863/IMG0250725_205903_WhatsApp_-_Pranav_Mishra_moxnqf.jpg' },
  { id: 10, name: 'Shatakshi Srivastava', department: 'Electronics and Communication Engineering', image: '' },
  { id: 11, name: 'Vaishnavi Rai', department: 'Civil Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20251211-WA0000_-_Vaishnavi_Rai_jez32z.jpg' },
  { id: 12, name: 'Vinayak Yadav', department: 'Information Technology', image: '' },
  { id: 13, name: 'Yashvardhan Ojha', department: 'Computer Science and Engineering', image: '' },
  { id: 14, name: 'Shreshtha Gupta', department: 'Electronics and Communication Engineering', image: '' },
];

const sophomoreTeam = [
  { id: 1, name: 'Aditi Mishra', department: 'Electronics and Communication Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765646713/IMG_20251028_064513492_2_-_Akansha_Mishra_tmbqyz.jpg' },
  { id: 2, name: 'Anurag Banerjee', department: 'Computer Science and Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765646717/1000071523_-_Anurag_Banerjee_vsb06m.jpg' },
  { id: 3, name: 'Anushka Shukla', department: 'Civil Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765648279/1000140304_-_Anushka_Shukla_leluen.jpg' },
  { id: 4, name: 'Arpit Tripathi', department: 'Computer Science and Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641690/1000070315-removebg-preview_-_Arpit_Tripathi_lovf7l.png' },
  { id: 5, name: 'Gaurav', department: 'Electrical Engineering', image: '' },
  { id: 6, name: 'Kaustubh Nigam', department: 'Information Technology', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621857/20250625_133952_-_Kaustubh_Nigam_p5yl7v.jpg' },
  { id: 7, name: 'Mayank Sharma', department: 'Civil Engineering', image: '' },
  { id: 8, name: 'Ojashwani Singh Chauhan', department: 'Mechanical Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641689/Screenshot_20251213_164042_Gallery_-_ojashwani_singh_cb9jdj.jpg' },
  { id: 9, name: 'Prathit Mishra', department: 'Electrical Engineering', image: '' },
  { id: 10, name: 'Pratyaditya Singh', department: 'Electrical Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765785418/9610jk_-_Pratyaditya_Singh_qmwnbv.jpg' },
  { id: 11, name: 'Ritesh Yadav', department: 'Computer Science and Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621946/ritesh_f7iw3x.jpg' },
  { id: 12, name: 'Shambhavi', department: 'Information Technology', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765648259/IMG-20250724-WA0018_-_Shambhavi_wd2pe4.jpg' },
  { id: 13, name: 'Shlok', department: 'Computer Science and Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641663/44249_fvzbka.jpg' },
  { id: 14, name: 'Shivam Gupta', department: 'Electronics and Communication Engineering', image: 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png' },
  { id: 15, name: 'Tushit Shaurya', department: 'Electrical Engineering', image: '' },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 50, damping: 15 }
  }
};

// --- COMPONENT ---

export default function TeamPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 
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
      {/* Background: Orange/Gold Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-orange-50/30 to-amber-100/20" />
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header - Fixed: Using ONLY Orange/Amber shades (Removed Red) */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold bg-linear-to-r from-orange-800 via-orange-600 to-amber-500 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight leading-tight">
            Our Team
          </h1>
          {/* Decorative Line - Fixed Gradient */}
          <div className="w-24 h-1 bg-linear-to-r from-orange-800 via-orange-600 to-amber-500 mx-auto rounded-full" />
        </motion.div>

        {/* Navigation Buttons - Fixed: Orange Theme Only */}
        <motion.div
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Final Year: Deep Burnt Orange (Replaced Red) */}
          <motion.button
            onClick={() => scrollToSection('final-year')}
            className="bg-orange-800 hover:bg-orange-900 text-white font-serif font-bold py-3 px-8 rounded-xl text-base sm:text-lg shadow-lg transition-all duration-300 focus:outline-none border-2 border-orange-800"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Final Year
          </motion.button>
          
          {/* Pre-Final Year: Bright Sunset Orange */}
          <motion.button
            onClick={() => scrollToSection('pre-final')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-serif font-bold py-3 px-8 rounded-xl text-base sm:text-lg shadow-lg transition-all duration-300 focus:outline-none border-2 border-orange-600"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Pre-Final Year
          </motion.button>

          {/* Sophomore: White with Orange Accent */}
          <motion.button
            onClick={() => scrollToSection('sophomore')}
            className="bg-white border-2 border-orange-900 text-black hover:bg-orange-50 font-serif font-bold py-3 px-8 rounded-xl text-base sm:text-lg shadow-lg transition-all duration-300 focus:outline-none"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Sophomore
          </motion.button>
        </motion.div>

        {/* FINAL YEAR SECTION */}
        <motion.div
          id="final-year"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Final Year Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
            {finalYearTeam.map((member) => (
              <motion.div key={member.id} variants={cardVariants}>
                <TeamCard
                  name={member.name}
                  department={member.department}
                  image={member.image}
                  role="Final Year"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PRE-FINAL YEAR SECTION */}
        <motion.div
          id="pre-final"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Pre-Final Year Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {preFinalTeam.map((member) => (
              <motion.div key={member.id} variants={cardVariants}>
                <TeamCard
                  name={member.name}
                  department={member.department}
                  image={member.image}
                  role="Pre-Final Year"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SOPHOMORE TEAM SECTION */}
        <motion.div
          id="sophomore"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center mb-8 sm:mb-10 text-black tracking-tight">
            Sophomore Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {sophomoreTeam.map((member) => (
              <motion.div key={member.id} variants={cardVariants}>
                <TeamCard
                  name={member.name}
                  department={member.department}
                  image={member.image}
                  role="Sophomore"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}