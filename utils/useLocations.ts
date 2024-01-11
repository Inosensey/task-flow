// https://api.geoapify.com/v1/geocode/autocomplete?text=YOUR_TEXT&limit=5&type=city&filter=countrycode:ph&format=json&apiKey=YOUR_API_KEY

export const AutoCompleteLocation = async (place: string | any) => {
  const res = await fetch(`
          ${process.env.GEOAPIFY_AUTOCOMPLETE_API}?text=${place}&limit=5&type=city&filter=countrycode:ph&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}
          `);
  const suggestedPlaces: any = await res.json();
  return suggestedPlaces;
};
