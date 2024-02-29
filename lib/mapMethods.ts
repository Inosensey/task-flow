// GEOAPIFT_MAP_STATIC_API:
// "https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth",
// https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:125.4965129,9.78881229942819&zoom=14&scaleFactor=2&marker=lonlat:125.4965129,9.78881229942819;type:awesome;color:%236acc7b;icon:landmark&apiKey=04e9680528d74bd98b842c63ae60eaa1
type mapAttrInfo = {
  width: string;
  height: string;
  lon: string;
  lat: string;
  iconType: string;
};

export const getStaticMap = (mapAttrInfo: mapAttrInfo) => {
  const mapApi = `
      ${process.env.GEOAPIFT_MAP_STATIC_API}&&width=${mapAttrInfo.width}&height=${mapAttrInfo.height}&center=lonlat:${mapAttrInfo.lon},${mapAttrInfo.lat}&zoom=14&scaleFactor=2&marker=${mapAttrInfo.lon},${mapAttrInfo.lat};type:awesome;color:%236acc7b;icon:${mapAttrInfo.iconType}&apiKey=${process.env.GEOAPIFY_API_KEY}
  `;
};
