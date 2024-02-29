"use client";
type props = {
  mapAttrInfo: {
    width: string;
    height: string;
    lon: string;
    lat: string;
    iconType: string;
  };
};
export default function staticMapLoader({ mapAttrInfo }: props) {
  return `${process.env.GEOAPIFT_MAP_STATIC_API}&width=${mapAttrInfo.width}&height=${mapAttrInfo.height}&center=lonlat:${mapAttrInfo.lon},${mapAttrInfo.lat}&zoom=14&scaleFactor=2&marker=${mapAttrInfo.lon},${mapAttrInfo.lat};type:awesome;color:%236acc7b;icon:${mapAttrInfo.iconType}&apiKey=${process.env.GEOAPIFY_API_KEY}`;
}
