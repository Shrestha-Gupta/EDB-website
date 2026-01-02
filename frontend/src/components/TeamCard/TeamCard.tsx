import { User } from "lucide-react";
import TiltedCard from "../TiltedCard/TiltedCard";

interface TeamCardProps {
  name: string;
  department: string;
  image?: string;
  role?: string;
}

export default function TeamCard({ name, department, image }: TeamCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md md:hover:shadow-2xl transition-transform duration-300 h-full flex flex-col border border-gray-100 transform will-change-transform md:hover:-translate-y-1">
      {/* Top Gradient Bar - Deep Orange to Amber */}
      <div className="h-2 w-full bg-linear-to-r from-orange-800 via-orange-500 to-amber-400" />

      {/* Image Container */}
      <div className="relative pt-8 pb-4 px-6 flex justify-center">
        {/* Ring Gradient - Sunset Theme */}
        {/* Tilted Card Image */}
        <div className="relative w-32 h-32 z-10">
            {image ? (
              <TiltedCard
                imageSrc={image}
                altText={name}
                containerHeight="128px"
                containerWidth="128px"
                imageHeight="128px"
                imageWidth="128px"
                rotateAmplitude={12}
                scaleOnHover={1.15}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute inset-0 rounded-[15px] ring-1 ring-black/10 mix-blend-multiply" />
                }
              />
            ) : (
              <div className="w-full h-full rounded-[15px] flex items-center justify-center bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300">
                <User size={48} />
              </div>
            )}
            
          {/* Decorative Badge Icon - Deep Orange */}
           <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1.5 rounded-full shadow-md border-2 border-white z-20 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 text-center grow flex flex-col justify-between">
        <div>
          {/* Name turns Orange on Hover */}
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 group-hover:text-orange-700 transition-colors">
            {name}
          </h3>
          {/* Department in Mid-tone Orange */}
          <p className="text-sm font-medium text-orange-600 mb-2 uppercase tracking-wide">
            {department}
          </p>
        </div>

        {/* Decorative Divider - Turns Amber on Hover */}
        <div className="w-12 h-0.5 bg-gray-200 mx-auto my-3 group-hover:bg-amber-400 transition-colors duration-300" />
      </div>

      {/* Bottom accent on hover - Orange */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}
