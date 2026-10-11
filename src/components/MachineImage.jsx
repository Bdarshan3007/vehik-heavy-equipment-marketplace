import { useState } from "react";
export const MACHINE_IMAGE_MAP = {
  "eq-01": "/images/crane_liebherr_50t.jpg",
  "eq-02": "/images/excavator_cat_22t.jpg",
  "eq-03": "/images/trailer_volvo_120t.jpg",
  "eq-04": "/images/backhoe_jcb_3dx.jpg",
  "eq-05": "/images/crane_sany_250t.jpg",
  "eq-06": "/images/excavator_komatsu_21t.jpg",
  "eq-07": "/images/trailer_tata_60t.jpg",
  "eq-08": "/images/crane_hydra_25t.jpg",
  "eq-09": "/images/excavator_komatsu_21t.jpg",
  "eq-10": "/images/excavator_cat_22t.jpg",
  "eq-11": "/images/trailer_tata_60t.jpg",
  "eq-12": "/images/trailer_volvo_120t.jpg"
};
export const CATEGORY_FALLBACK_IMAGES = {
  cranes: "/images/crane_liebherr_50t.jpg",
  excavators: "/images/excavator_cat_22t.jpg",
  trailers: "/images/trailer_volvo_120t.jpg",
  backhoes: "/images/backhoe_jcb_3dx.jpg",
  tippers: "/images/excavator_komatsu_21t.jpg",
  prime_movers: "/images/trailer_tata_60t.jpg"
};
export function getMachineImageUrl(id, category) {
  if (id && MACHINE_IMAGE_MAP[id]) {
    return MACHINE_IMAGE_MAP[id];
  }
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }
  return "/images/crane_liebherr_50t.jpg";
}
export const MachineImage = ({
  id,
  category,
  title,
  className = "",
  showOverlay = true
}) => {
  const [hasError, setHasError] = useState(false);
  const imageUrl = hasError ? CATEGORY_FALLBACK_IMAGES[category] || "/images/crane_liebherr_50t.jpg" : getMachineImageUrl(id, category);
  return <div className={`relative w-full h-full overflow-hidden bg-[#1E293B] group ${className}`}>
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {showOverlay && <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />}
    </div>;
};
