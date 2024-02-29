import Overlay from "./Overlay";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import React from "react";

type props = {
  mapAttrInfo: {
    width: string;
    height: string;
    lon: string;
    lat: string;
    iconType: string;
  };
  setMapToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const DisplayMap = ({ mapAttrInfo, setMapToggle }: props) => {
  const mapSrc = `${process.env.GEOAPIFT_MAP_STATIC_API}&width=${mapAttrInfo.width}&height=${mapAttrInfo.height}&center=lonlat:${mapAttrInfo.lon},${mapAttrInfo.lat}&zoom=16&scaleFactor=2&marker=lonlat:${mapAttrInfo.lon},${mapAttrInfo.lat};type:awesome;color:%236acc7b;icon:${mapAttrInfo.iconType}&apiKey=${process.env.GEOAPIFY_API_KEY}`;
  return (
    <Overlay>
      <motion.div
        className="absolute top-5 right-5"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMapToggle((prev) => !prev)}
      >
        <FontAwesomeIcon
          className="text-3xl text-LightPrimary"
          icon={faRectangleXmark}
        />
      </motion.div>
      <div className="flex items-center justify-center w-full h-max">
        <Image
          width={parseInt(mapAttrInfo.width)}
          height={parseInt(mapAttrInfo.height)}
          alt="static-map"
          src={mapSrc}
        />
      </div>
    </Overlay>
  );
};

export default DisplayMap;
