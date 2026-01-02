import { motion } from "framer-motion";
// Ensure these paths match your project structure
import TeamCard from "../components/TeamCard/TeamCard";
import ParticlesBackground from "../components/ParticlesBackground/ParticlesBackground";
import PageHero from "../components/PageHero/PageHero";

// --- DATA ARRAYS ---
const finalYearTeam = [
  {
    id: 1,
    name: "Aadrika Barnwal",
    department: "Information Technology",
    image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767372705/2A6A5189_bg3hwo.jpg",
  },
  { id: 2, name: "Aastha Singh", department: "Civil Engineering", image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767371883/2A6A5128_nl5u4l.jpg" },
  {
    id: 3,
    name: "Harshit Pandey",
    department: "Mechanical Engineering",
    image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767371883/2A6A5192_pmqy9w.jpg",
  },
  {
    id: 4,
    name: "Jayant Singh",
    department: "Electronics and Communication Engineering",
    image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767371885/2A6A5211_kinkrq.jpg",
  },
  { id: 5, name: "Jyoti Singh", department: "Bachelor of Pharmacy", image: "" },
  { id: 6, name: "Nandini Mishra", department: "Civil Engineering", image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767371885/2A6A5089_yze2vt.jpg" },
  {
    id: 7,
    name: "Shivam Pal",
    department: "Computer Science & Engineering",
    image: "",
  },
  {
    id: 8,
    name: "Shivam Rai",
    department: "Computer Science & Engineering",
    image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767372709/2A6A5209_eux6u9.jpg",
  },
  {
    id: 9,
    name: "Vishal Kotak",
    department: "Information Technology",
    image: "",
  },
  {
    id: 10,
    name: "Vishwadeep Singh",
    department: "Computer Science & Engineering",
    image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767371886/2A6A5072_kntb2c.jpg",
  },
  {
    id: 11,
    name: "Vivek Mani Tripathy",
    department: "Information Technology",
    image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767372982/2A6A5071_yvsrug.jpg",
  },
];

const preFinalTeam = [
  {
    id: 1,
    name: "Aditi Sharma",
    department: "Electronics and Communication Engineering",
    image: "",
  },
  {
    id: 2,
    name: "Alok Kumar",
    department: "Electronics and Communication Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765916386/IMG-20250104-WA0012_-_Alok_kumar_dfczes.jpg",
  },
  {
    id: 3,
    name: "Ashmi Singh",
    department: "Electrical Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20251211-WA0004_-_ASHMI_SINGH_dp8an0.jpg",
  },
  {
    id: 4,
    name: "Divyansh Singh Rathore",
    department: "Electronics and Communication Engineering",
    image: "",
  },
  {
    id: 5,
    name: "Gaurav Vishwakarma",
    department: "Electronics and Communication Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20250301-WA0024_-_GAURAV_VISHWAKARMA_vep5e1.jpg",
  },
  {
    id: 6,
    name: "Himanshu Mishra",
    department: "Chemical Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765916434/Hm_-_Himanshu_mishra_wz4y3q.png",
  },
  {
    id: 7,
    name: "Jagriti Singh",
    department: "Civil Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765916387/IMG-20241228-WA0024_-_Jagriti_Thakur_mydoe1.jpg",
  },
  {
    id: 8,
    name: "Pragya Kumari",
    department: "Electrical Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641916/WhatsApp_Image_2025-12-13_at_21.34.40_ahne8s.jpg",
  },
  {
    id: 9,
    name: "Pranav Mishra",
    department: "Information Technology",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622863/IMG0250725_205903_WhatsApp_-_Pranav_Mishra_moxnqf.jpg",
  },
  {
    id: 10,
    name: "Shatakshi Srivastava",
    department: "Electronics and Communication Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765917159/WhatsApp_Image_2025-11-29_at_3.27.53_PM_-_Shatakshi_Srivastava_xyyyxa.jpg",
  },
  {
    id: 11,
    name: "Shreshtha Gupta",
    department: "Electronics and Communication Engineering",
    image: "",
  },
  {
    id: 12,
    name: "Vaishnavi Rai",
    department: "Civil Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765622862/IMG-20251211-WA0000_-_Vaishnavi_Rai_jez32z.jpg",
  },
  {
    id: 13,
    name: "Vinayak Yadav",
    department: "Information Technology",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765916386/IMG_20251126_185549_011_-_VINAYAK_YADAV_ehfish.webp",
  },
  {
    id: 14,
    name: "Yashvardhan Ojha",
    department: "Computer Science and Engineering",
    image: "",
  },
];

const sophomoreTeam = [
  {
    id: 1,
    name: "Aditi Mishra",
    department: "Electronics and Communication Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765646713/IMG_20251028_064513492_2_-_Akansha_Mishra_tmbqyz.jpg",
  },
  {
    id: 2,
    name: "Anurag Banerjee",
    department: "Computer Science and Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765646717/1000071523_-_Anurag_Banerjee_vsb06m.jpg",
  },
  {
    id: 3,
    name: "Anushka Shukla",
    department: "Civil Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765648279/1000140304_-_Anushka_Shukla_leluen.jpg",
  },
  {
    id: 4,
    name: "Arpit Tripathi",
    department: "Computer Science and Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641690/1000070315-removebg-preview_-_Arpit_Tripathi_lovf7l.png",
  },
  { id: 5, name: "Gaurav", department: "Electrical Engineering", image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767116368/WhatsApp_Image_2025-12-27_at_10.11.07_AM_hnonbt.jpg" },
  {
    id: 6,
    name: "Kaustubh Nigam",
    department: "Information Technology",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621857/20250625_133952_-_Kaustubh_Nigam_p5yl7v.jpg",
  },
  {
    id: 7,
    name: "Mayank Sharma",
    department: "Civil Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765916451/inbound5258959913854647297_2_-_Mayank_Sharma_cvimcl.jpg",
  },
  {
    id: 8,
    name: "Ojashwani Singh Chauhan",
    department: "Mechanical Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641689/Screenshot_20251213_164042_Gallery_-_ojashwani_singh_cb9jdj.jpg",
  },
  {
    id: 9,
    name: "Prathit Mishra",
    department: "Electrical Engineering",
    image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1767116519/WhatsApp_Image_2025-12-27_at_3.09.25_PM_ctrqdq.jpg",
  },
  {
    id: 10,
    name: "Pratyaditya Singh",
    department: "Electrical Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765785418/9610jk_-_Pratyaditya_Singh_qmwnbv.jpg",
  },
  {
    id: 11,
    name: "Ritesh Yadav",
    department: "Computer Science and Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621946/ritesh_f7iw3x.jpg",
  },
  {
    id: 12,
    name: "Shambhavi",
    department: "Information Technology",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765648259/IMG-20250724-WA0018_-_Shambhavi_wd2pe4.jpg",
  },
  {
    id: 13,
    name: "Shlok",
    department: "Computer Science and Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765641663/44249_fvzbka.jpg",
  },
  {
    id: 14,
    name: "Shivam Gupta",
    department: "Electronics and Communication Engineering",
    image:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765621947/Shivamgupta_-_Shivam_nggock.png",
  },
  {
    id: 15,
    name: "Tushit Shaurya",
    department: "Electrical Engineering",
    image: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1766607748/WhatsApp_Image_2025-12-25_at_1.44.58_AM_flck7n.jpg",
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 50, damping: 15 },
  },
};

// --- COMPONENT ---

export default function TeamPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 relative overflow-x-hidden font-sans text-stone-800">
      <ParticlesBackground />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header - Fixed: Using ONLY Orange/Amber shades (Removed Red) */}
        {/* Header */}
        <PageHero 
          title="Our Team" 
          subtitle="The Editorial Board"
          description="A group of passionate individuals dedicated to the art of expression and the power of words."
        />

        {/* Navigation Buttons - Fixed: Orange Theme Only */}
        <motion.div
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Final Year: Deep Burnt Orange (Replaced Red) */}
          <motion.button
            onClick={() => scrollToSection("final-year")}
            className="bg-orange-800 hover:bg-orange-900 text-white font-serif font-bold py-3 px-8 rounded-xl text-base sm:text-lg md:shadow-lg transition-all duration-300 focus:outline-none border-2 border-orange-800 transform-gpu md:hover:-translate-y-1"
            whileHover={
              typeof window !== "undefined" && window.innerWidth > 640
                ? { scale: 1.05, y: -2 }
                : undefined
            }
            whileTap={{ scale: 0.95 }}
          >
            Final Year
          </motion.button>

          {/* Pre-Final Year: Bright Sunset Orange */}
          <motion.button
            onClick={() => scrollToSection("pre-final")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-serif font-bold py-3 px-8 rounded-xl text-base sm:text-lg md:shadow-lg transition-all duration-300 focus:outline-none border-2 border-orange-600 transform-gpu md:hover:-translate-y-1"
            whileHover={
              typeof window !== "undefined" && window.innerWidth > 640
                ? { scale: 1.05, y: -2 }
                : undefined
            }
            whileTap={{ scale: 0.95 }}
          >
            Pre-Final Year
          </motion.button>

          {/* Sophomore: Yellowish Background */}
          <motion.button
            onClick={() => scrollToSection("sophomore")}
            className="bg-amber-300 hover:bg-amber-400 text-black font-serif font-bold py-3 px-8 rounded-xl text-base sm:text-lg md:shadow-lg transition-all duration-300 focus:outline-none border-2 border-amber-400 transform-gpu md:hover:-translate-y-1"
            whileHover={
              typeof window !== "undefined" && window.innerWidth > 640
                ? { scale: 1.05, y: -2 }
                : undefined
            }
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
