import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  Tag,
  Download,
  Eye,
} from "lucide-react";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground.tsx";
import PDFViewer from "../../components/PDFViewer/PDFViewer.tsx";

type TabType = "all" | "newsletter" | "magazine";

const newsletters = [
  {
    id: 1,
    title: "TIRESIA - Volume 16, Issue 3",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_2_gjepmx.jpg",
    description:
      "The June Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community.",
    pages: 150,
    contributors: 35,
    downloadUrl:
      "https://drive.google.com/file/d/1zVre8DDBha64ZGsHTC7TkfMCT3nRqWm6/view?usp=drive_link",
  },
  {
    id: 2,
    title: "TIRESIA - Volume 16, Issue 2",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_1_wzbldy.jpg",
    description:
      "The May Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community.",
    pages: 150,
    contributors: 32,
    downloadUrl:
      "https://drive.google.com/file/d/122oPKlmRyZJibPxUAig4UzrbfFrDe3eP/view?usp=drive_link",
  },
  {
    id: 3,
    title: "TIRESIA - Volume 16, Issue 1",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_ffabep.jpg",
    description:
      "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
    pages: 145,
    contributors: 30,
    downloadUrl:
      "https://drive.google.com/file/d/1rX0ZzGDEuG4OnCKS8kqDHjRBB2mpv3RU/view?usp=drive_link",
  },
  {
  id: 4,
  title: "TIRESIA - Volume 15, Issue 3",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766032938/Screenshot_2025-12-18_at_10.10.18_AM_haj0al.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1xtO0CAKjzEjXmhdyseaX01BiKVYom5q8/view?usp=drive_link",
},
{
  id: 5,
  title: "TIRESIA - Volume 15, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766032942/Screenshot_2025-12-18_at_10.10.38_AM_wrsht8.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1OXR8Qtk1ORsyBSwNZsV5fPIgNCRXW97u/view?usp=drive_link",
},
{
  id: 6,
  title: "TIRESIA - Volume 15, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766032949/Screenshot_2025-12-18_at_10.10.58_AM_ovdi7l.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1dmlw4e7MSwr9SCxdQ-dQhcw5ss5Jm8sy/view?usp=drive_link",
},
{
  id: 7,
  title: "TIRESIA - Volume 14, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766033474/Screenshot_2025-12-18_at_10.19.58_AM_pzawat.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1vYEEZkZpRzg9Kjj213EvWRSc49iAJf04/view?usp=drive_link",
},
{
  id: 8,
  title: "TIRESIA - Volume 14, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766033477/Screenshot_2025-12-18_at_10.19.46_AM_e60eg1.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1posMiq1Fmr7BVofn3nG82nAJhhMvcUZE/view?usp=drive_link",
},
{
  id: 9,
  title: "TIRESIA - Volume 13, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766033193/Screenshot_2025-12-18_at_10.16.07_AM_qegbnp.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1x52kyAKQS19JxvKaHTJ2JsRQokI_aXej/view?usp=drive_link",
},
{
  id: 10,
  title: "TIRESIA - Volume 13, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766033205/Screenshot_2025-12-18_at_10.15.38_AM_rp7ei1.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1_LlQ8k4iDNn9CPr3PE63wBXpSIm_kMtC/view?usp=drive_link",
},
{
  id: 11,
  title: "TIRESIA - Volume 12, Issue 4",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766034189/Screenshot_2025-12-18_at_10.32.08_AM_nueutk.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1RJ3dG1REChv07YpDuciBzXZtY8OUA1OY/view?usp=drive_link",
},
{
  id: 12,
  title: "TIRESIA - Volume 12, Issue 3",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766034179/Screenshot_2025-12-18_at_10.31.59_AM_q2utna.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1DoSQTuFEUjRFBZApThxsafVyKxDdYhaY/view?usp=drive_link",
},
{
  id: 13,
  title: "TIRESIA - Volume 12, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766034185/Screenshot_2025-12-18_at_10.31.48_AM_vr9lwz.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/1ojvtXLbxiXE9qEk0dpaAcYNwBUmEtbTn/view?usp=drive_link",
},
{
  id: 14,
  title: "TIRESIA - Volume 12, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766034190/Screenshot_2025-12-18_at_10.31.34_AM_vypj0j.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "https://drive.google.com/file/d/10-pXNUt5BqDCnft1G97T_N1AtvWpmabp/view?usp=drive_link",
},
{
  id: 15,
  title: "TIRESIA - Volume 11, Issue 3",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766034552/Screenshot_2025-12-18_at_10.38.57_AM_srctbq.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 16,
  title: "TIRESIA - Volume 11, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766034554/Screenshot_2025-12-18_at_10.38.43_AM_eudx7u.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 17,
  title: "TIRESIA - Volume 11, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766034556/Screenshot_2025-12-18_at_10.38.29_AM_soizmu.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 18,
  title: "TIRESIA - Volume 10, Issue 3",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766035201/Screenshot_2025-12-18_at_10.48.57_AM_anftkk.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 19,
  title: "TIRESIA - Volume 10, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766035230/Screenshot_2025-12-18_at_10.48.42_AM_nhjavj.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 20,
  title: "TIRESIA - Volume 10, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766035248/Screenshot_2025-12-18_at_10.48.30_AM_mip9wm.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 21,
  title: "TIRESIA - Volume 9, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980311/Screenshot_2025-12-17_at_7.34.12_PM_c0m7nd.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 22,
  title: "TIRESIA - Volume 9, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980310/Screenshot_2025-12-17_at_7.33.57_PM_eaefie.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},

{
  id: 23,
  title: "TIRESIA - Volume 8, Issue 5",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766035737/Screenshot_2025-12-18_at_10.56.57_AM_ajmzmr.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 24,
  title: "TIRESIA - Volume 8, Issue 4",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766035734/Screenshot_2025-12-18_at_10.56.43_AM_lz58xh.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 25,
  title: "TIRESIA - Volume 8, Issue 3",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766035720/Screenshot_2025-12-18_at_10.56.23_AM_ocqhqh.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 26,
  title: "TIRESIA - Volume 8, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766035679/Screenshot_2025-12-18_at_10.56.06_AM_dmom9x.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 27,
  title: "TIRESIA - Volume 8, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766035668/Screenshot_2025-12-18_at_10.55.49_AM_rgcocl.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 28,
  title: "TIRESIA - Volume 7, Issue 5",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037025/Screenshot_2025-12-18_at_11.19.39_AM_woit4s.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
},
{
  id: 29,
  title: "TIRESIA - Volume 7, Issue 4",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037047/Screenshot_2025-12-18_at_11.19.26_AM_lmknmq.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
  },
{
  id: 30,
  title: "TIRESIA - Volume 7, Issue 3",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037092/Screenshot_2025-12-18_at_11.19.14_AM_n3vfds.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
  },
{
  id: 31,
  title: "TIRESIA - Volume 7, Issue 2",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037146/Screenshot_2025-12-18_at_11.18.58_AM_scxpit.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
  },
{
  id: 32,
  title: "TIRESIA - Volume 7, Issue 1",
  type: "NEWSLETTER",
  year: "2025",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037240/Screenshot_2025-12-18_at_11.18.45_AM_skbwkp.png",
  description:
    "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  pages: 145,
  contributors: 30,
  downloadUrl: "",
  },
  {
  id: 33,
  title: "TIRESIA - Volume 6, Issue 7",
  type: "NEWSLETTER",
  year: "2024",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980123/Screenshot_2025-12-17_at_7.27.48_PM_ctzhki.png",
  description:
    "Exploring creative expression through student-led narratives, artwork, and academic reflections.",
  pages: 138,
  contributors: 28,
  downloadUrl: "",
},
{
  id: 34,
  title: "TIRESIA - Volume 6, Issue 6",
  type: "NEWSLETTER",
  year: "2024",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980124/Screenshot_2025-12-17_at_7.27.34_PM_h7eeir.png",
  description:
    "A blend of cultural commentary, poetry, and thought-provoking essays by emerging voices.",
  pages: 132,
  contributors: 27,
  downloadUrl: "",
},
{
  id: 35,
  title: "TIRESIA - Volume 6, Issue 5",
  type: "NEWSLETTER",
  year: "2024",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980124/Screenshot_2025-12-17_at_7.27.17_PM_mqjlln.png",
  description:
    "This issue highlights innovation, literature, and student perspectives on modern academia.",
  pages: 129,
  contributors: 26,
  downloadUrl: "",
},
{
  id: 36,
  title: "TIRESIA - Volume 6, Issue 4",
  type: "NEWSLETTER",
  year: "2024",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980124/Screenshot_2025-12-17_at_7.27.04_PM_yqvdmb.png",
  description:
    "An artistic compilation featuring poetry, short prose, and interdisciplinary ideas.",
  pages: 124,
  contributors: 25,
  downloadUrl: "",
},
{
  id: 37,
  title: "TIRESIA - Volume 6, Issue 3",
  type: "NEWSLETTER",
  year: "2024",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980124/Screenshot_2025-12-17_at_7.26.27_PM_c1rhna.png",
  description:
    "Capturing campus life, social reflections, and creative storytelling.",
  pages: 120,
  contributors: 24,
  downloadUrl: "",
},
{
  id: 38,
  title: "TIRESIA - Volume 6, Issue 2",
  type: "NEWSLETTER",
  year: "2024",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980124/Screenshot_2025-12-17_at_7.26.07_PM_pb0aum.png",
  description:
    "A thoughtful collection of student opinions, literature, and visual expression.",
  pages: 116,
  contributors: 23,
  downloadUrl: "",
},
{
  id: 39,
  title: "TIRESIA - Volume 6, Issue 1",
  type: "NEWSLETTER",
  year: "2024",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765980125/Screenshot_2025-12-17_at_7.25.44_PM_pjo4pi.png",
  description:
    "The opening issue of Volume 6, setting the tone with diverse academic and creative works.",
  pages: 110,
  contributors: 22,
  downloadUrl: "",
},
{
  id: 40,
  title: "TIRESIA - Volume 5, Issue 6",
  type: "NEWSLETTER",
  year: "2023",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037587/Screenshot_2025-12-18_at_11.28.47_AM_fdsk78.png",
  description:
    "A reflective edition featuring literary depth and evolving student perspectives.",
  pages: 105,
  contributors: 21,
  downloadUrl: "",
},
{
  id: 41,
  title: "TIRESIA - Volume 5, Issue 5",
  type: "NEWSLETTER",
  year: "2023",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037585/Screenshot_2025-12-18_at_11.28.36_AM_qwwmnk.png",
  description:
    "Showcasing campus creativity through essays, poems, and design pieces.",
  pages: 100,
  contributors: 20,
  downloadUrl: "",
},
{
  id: 42,
  title: "TIRESIA - Volume 5, Issue 4",
  type: "NEWSLETTER",
  year: "2023",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037560/Screenshot_2025-12-18_at_11.28.14_AM_bsjwqs.png",
  description:
    "An engaging mix of intellectual discourse and artistic exploration.",
  pages: 96,
  contributors: 19,
  downloadUrl: "",
},
{
  id: 43,
  title: "TIRESIA - Volume 5, Issue 3",
  type: "NEWSLETTER",
  year: "2023",
  coverImage: "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766037550/Screenshot_2025-12-18_at_11.27.59_AM_wjw7vi.png",
  description:
    "Continuing the legacy of TIRESIA with powerful voices and meaningful narratives.",
  pages: 92,
  contributors: 18,
  downloadUrl: "",
}



];

const magazines = [
  {
    id: 1,
    title: "Malvika - Annual Magazine 2025",
    type: "ANNUAL MAGAZINE",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg",
    description:
      "Our flagship annual publication featuring the finest poetry, prose, and essays from students and faculty.",
    pages: 240,
    contributors: 45,
    downloadUrl:
      "https://drive.google.com/file/d/1otl11ABJgRuG6QPzY0h4wXKWibV0wFkG/view?usp=drive_link",
  },
  {
    id: 2,
    title: "Malvika - Annual Magazine 2023",
    type: "ANNUAL MAGAZINE",
    year: "2023",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_1_soyehf.jpg",
    description:
      "A vibrant exploration of culture, arts, and heritage. Featuring stunning visual essays and interviews.",
    pages: 220,
    contributors: 42,
    downloadUrl:
      "https://drive.google.com/file/d/1ujW5ayrxj7mRdFZbabfg7Fs2nIrOpkdB/view?usp=drive_link",
  },
  {
    id: 3,
    title: "Malvika - Annual Magazine 2020",
    type: "ANNUAL MAGAZINE",
    year: "2020",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765945632/Screenshot_2025-12-17_at_2.06.20_AM_aerfwl.png",
    description:
      "Our flagship annual publication featuring the finest poetry, prose, and essays from students and faculty.",
    pages: 240,
    contributors: 45,
    downloadUrl:
      "https://drive.google.com/file/d/1Y3eH_YFvmsAPgL9YAKjMCEzS3VuCk_M1/view?usp=drive_link",
  },
  {
    id: 4,
    title: "Malvika - Annual Magazine 2019",
    type: "ANNUAL MAGAZINE",
    year: "2019",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766038752/Screenshot_2025-12-18_at_11.48.26_AM_hoqi9b.png",
    description:
      "Our flagship annual publication featuring the finest poetry, prose, and essays from students and faculty.",
    pages: 240,
    contributors: 45,
    downloadUrl:
      "https://drive.google.com/file/d/1Y3eH_YFvmsAPgL9YAKjMCEzS3VuCk_M1/view?usp=drive_link",
  },
  {
    id: 5,
    title: "Malvika - Annual Magazine 2018",
    type: "ANNUAL MAGAZINE",
    year: "2018",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766038747/Screenshot_2025-12-18_at_11.48.12_AM_x7lijs.png  ",
    description:
      "Our flagship annual publication featuring the finest poetry, prose, and essays from students and faculty.",
    pages: 240,
    contributors: 45,
    downloadUrl:
      "https://drive.google.com/file/d/1Y3eH_YFvmsAPgL9YAKjMCEzS3VuCk_M1/view?usp=drive_link",
  },
  {
    id: 6,
    title: "Malvika - Annual Magazine 2017",
    type: "ANNUAL MAGAZINE",
    year: "2017",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1766038748/Screenshot_2025-12-18_at_11.48.00_AM_xmf0dl.png",
    description:
      "Our flagship annual publication featuring the finest poetry, prose, and essays from students and faculty.",
    pages: 240,
    contributors: 45,
    downloadUrl:
      "https://drive.google.com/file/d/1Y3eH_YFvmsAPgL9YAKjMCEzS3VuCk_M1/view?usp=drive_link",
  },
];

const allPublications = [...newsletters, ...magazines];

export default function PublicationsPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [currentLatestIndex, setCurrentLatestIndex] = useState(0);

  const getPublications = () => {
    switch (activeTab) {
      case "newsletter":
        return newsletters;
      case "magazine":
        return magazines;
      default:
        return allPublications;
    }
  };

  const publications = getPublications();
  const latestIssue = newsletters[currentLatestIndex];

  const handlePrevLatest = () => {
    setCurrentLatestIndex((prev) =>
      prev === 0 ? newsletters.length - 1 : prev - 1
    );
  };

  const handleNextLatest = () => {
    setCurrentLatestIndex((prev) =>
      prev === newsletters.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background Particles (Pointer events none so you can click buttons) */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-linear-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6">
            Publications
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover our collection of literary works, journals, and
            anthologies.
          </p>
        </motion.div>

        {/* Latest Issue Carousel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              className="inline-block bg-orange-50 border-2 border-orange-500 text-orange-700 px-6 py-2.5 rounded-xl font-bold text-lg tracking-wider shadow-lg"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(249, 115, 22, 0)",
                  "0 0 15px rgba(249, 115, 22, 0.3)",
                  "0 0 0px rgba(249, 115, 22, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LATEST ISSUE
            </motion.div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Arrows with Hover Effects */}
            <motion.button
              onClick={handlePrevLatest}
              whileHover={{ scale: 1.1, backgroundColor: "#ea580c" }}
              whileTap={{ scale: 0.9 }}
              className="absolute -left-4 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white p-3 rounded-full shadow-xl transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={handleNextLatest}
              whileHover={{ scale: 1.1, backgroundColor: "#ea580c" }}
              whileTap={{ scale: 0.9 }}
              className="absolute -right-4 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white p-3 rounded-full shadow-xl transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLatestIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  whileHover={{ 
                    scale: 1.005, 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                  }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 gap-8 p-8"
                >
                  {/* Left: Image */}
                  <div className="relative h-100 md:h-auto">
                    <img
                      src={latestIssue.coverImage}
                      alt={latestIssue.title}
                      className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                  </div>

                  {/* Right: Info */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-gray-900">
                      {latestIssue.title}
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {latestIssue.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Published By
                          </p>
                          <p className="font-semibold text-gray-800">
                            The Editorial Board
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Release Date
                          </p>
                          <p className="font-semibold text-gray-800">
                            May 2024
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Category
                          </p>
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                            Magazine
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedPdf(latestIssue.downloadUrl);
                        setSelectedTitle(latestIssue.title);
                      }}
                      className="w-full bg-orange-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg cursor-pointer"
                    >
                      <Eye className="w-5 h-5" />
                      View Full Issue
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {newsletters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentLatestIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    currentLatestIndex === index
                      ? "bg-orange-500 w-8"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab("all")}
            className={`cursor-pointer px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
              activeTab === "all"
                ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-500"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("newsletter")}
            className={`cursor-pointer px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
              activeTab === "newsletter"
                ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-500"
            }`}
          >
            Newsletter
          </button>
          <button
            onClick={() => setActiveTab("magazine")}
            className={`cursor-pointer px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
              activeTab === "magazine"
                ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-500"
            }`}
          >
            Annual Magazine
          </button>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"
        >
          <AnimatePresence>
            {publications.map((pub) => (
              <motion.div
                key={pub.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image Container */}
                  <div
                    // UPDATED: Added onClick to the image container
                    onClick={() => {
                      setSelectedPdf(pub.downloadUrl);
                      setSelectedTitle(pub.title);
                    }}
                    className="h-64 relative overflow-hidden shrink-0 cursor-pointer"
                  >
                    <img
                      src={pub.coverImage}
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">
                      {pub.type === "ANNUAL MAGAZINE"
                        ? "Magazine"
                        : "Newsletter"}
                    </div>

                    {/* Hover Overlay (Still exists for desktop, but clicking image now works everywhere) */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent double trigger
                          setSelectedPdf(pub.downloadUrl);
                          setSelectedTitle(pub.title);
                        }}
                        className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <a
                        href={pub.downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent opening preview when downloading
                        className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2">
                      {pub.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 grow">
                      {pub.description}
                    </p>
                    <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 font-medium">
                      <span>{pub.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* PDF Viewer */}
        {selectedPdf && (
          <PDFViewer
            pdfUrl={selectedPdf}
            onClose={() => {
              setSelectedPdf(null);
              setSelectedTitle("");
            }}
            title={selectedTitle}
          />
        )}
      </motion.div>
    </div>
  );
}