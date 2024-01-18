

export const AutoCompleteLocation = async (place: string | any) => {
  const res = await fetch(`
          ${process.env.GEOAPIFY_AUTOCOMPLETE_API}?text=${place}&limit=5&type=city&filter=countrycode:ph&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}
          `);
  const suggestedPlaces: any = await res.json();
  return suggestedPlaces;
};


export const GetListOfPlaces = async (place:string, categories:string) => {
  const res = await fetch(`
    ${process.env.GEOAPIFY_PLACES_API}?categories=${categories}&filter=place:${place}&limit=100&apiKey=${process.env.GEOAPIFY_API_KEY}
  `)
  const ListOfPlaces = await res.json();
  return ListOfPlaces;
}