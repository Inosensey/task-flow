interface supportedCategoriesType {
  key: string;
  Description: string | null;
  categories: Array<string>;
}

const supportedCategories: supportedCategoriesType[] = [
  {
    key: "accommodation",
    Description: "Place to stay or live",
    categories: [
      "accommodation.hotel",
      "accommodation.hut",
      "accommodation.apartment",
      "accommodation.chalet",
      "accommodation.guest_house",
      "accommodation.hostel",
      "accommodation.motel",
    ],
  },
  {
    key: "activity",
    Description: "Clubs, community centers",
    categories: ["activity.community_center", "activity.sport_club"],
  },
  {
    key: "commercial",
    Description: "Places where one can buy or sell things",
    categories: [
      "commercial.supermarket",
      "commercial.marketplace",
      "commercial.shopping_mall",
      "commercial.department_store",
      "commercial.electronics",
      "commercial.outdoor_and_sport",
      "commercial.vehicle",
      "commercial.hobby",
      "commercial.books",
      "commercial.gift_and_souvenir",
      "commercial.stationery",
      "commercial.newsagent",
      "commercial.tickets_and_lottery",
      "commercial.clothing",
      "commercial.bag",
      "commercial.baby_goods",
      "commercial.agrarian",
      "commercial.garden",
      "commercial.houseware_and_hardware",
      "commercial.florist",
      "commercial.furniture_and_interior",
      "commercial.chemist",
      "commercial.health_and_beauty",
      "commercial.toy_and_game",
      "commercial.pet",
      "commercial.food_and_drink",
      "commercial.convenience",
      "commercial.discount_store",
      "commercial.smoking",
      "commercial.second_hand",
      "commercial.gas",
      "commercial.weapons",
      "commercial.pyrotechnics",
      "commercial.energy",
      "commercial.wedding",
      "commercial.jewelry",
      "commercial.watches",
      "commercial.art",
      "commercial.antiques",
      "commercial.video_and_music",
      "commercial.erotic",
      "commercial.trade",
      "commercial.kiosk",
    ],
  },
  {
    key: "catering",
    Description: "Places of public catering: restaurants, cafes, bars, etc.",
    categories: [
      "catering.restaurant",
      "catering.fast_food",
      "catering.cafe",
      "catering.food_court",
      "catering.bar",
      "catering.pub",
      "catering.ice_cream",
      "catering.taproom",
    ],
  },
  {
    key: "education",
    Description:
      "Place that provides learning spaces and learning environments",
    categories: [
      "education.school",
      "education.driving_school",
      "education.music_school",
      "education.language_school",
      "education.library",
      "education.college",
      "education.university",
    ],
  },
  {
    key: "childcare",
    Description:
      "Place that provides care of children service while parents are working",
    categories: ["childcare.kindergarten"],
  },
  {
    key: "entertainment",
    Description: "Place that where one can spend free time with amusement",
    categories: [
      "entertainment.culture",
      "entertainment.zoo",
      "entertainment.aquarium",
      "entertainment.planetarium",
      "entertainment.museum",
      "entertainment.cinema",
      "entertainment.amusement_arcade",
      "entertainment.escape_game",
      "entertainment.miniature_golf",
      "entertainment.bowling_alley",
      "entertainment.flying_fox",
      "entertainment.theme_park",
      "entertainment.water_park",
      "entertainment.activity_park",
    ],
  },
  {
    key: "healthcare",
    Description:
      "Places that provides healthcare services: hospitals, clinics and more",
    categories: [
      "healthcare.clinic_or_praxis",
      "healthcare.dentist",
      "healthcare.hospital",
      "healthcare.pharmacy",
    ],
  },
  {
    key: "heritage",
    Description: null,
    categories: ["heritage.unesco"],
  },
  {
    key: "leisure",
    Description: "Places where one can relax and unwind",
    categories: [
      "leisure.picnic",
      "leisure.playground",
      "leisure.spa",
      "leisure.park",
    ],
  },
  {
    key: "man_made",
    Description:
      "The man-made category is used to identify anything that was constructed by humans",
    categories: [
      "man_made.pier",
      "man_made.breakwater",
      "man_made.tower",
      "man_made.water_tower",
      "man_made.bridge",
      "man_made.lighthouse",
      "man_made.windmill",
      "man_made.watermill",
    ],
  },
  {
    key: "natural",
    Description: "Places where one can enjoy nature, explore natural phenomena",
    categories: [
      "natural.forest",
      "natural.water",
      "natural.mountain",
      "natural.sand",
      "natural.protected_area",
    ],
  },
  {
    key: "national_park",
    Description: "National parks",
    categories: ["national_park"],
  },
  {
    key: "office",
    Description:
      "An office of a business, company, administration, or organization",
    categories: [
      "office.government",
      "office.company",
      "office.estate_agent",
      "office.insurance",
      "office.lawyer",
      "office.telecommunication",
      "office.educational_institution",
      "office.association",
      "office.non_profit",
      "office.diplomatic",
      "office.it",
      "office.accountant",
      "office.employment_agency",
      "office.religion",
      "office.research",
      "office.architect",
      "office.financial",
      "office.tax_advisor",
      "office.advertising_agency",
      "office.notary",
      "office.newspaper",
      "office.political_party",
      "office.logistics",
      "office.energy_supplier",
      "office.travel_agent",
      "office.financial_advisor",
      "office.consulting",
      "office.foundation",
      "office.coworking",
      "office.water_utility",
      "office.forestry",
      "office.charity",
      "office.security",
    ],
  },
  {
    key: "parking",
    Description: "Places where one can park a car",
    categories: [
      "parking.cars",
      "parking.surface",
      "parking.multistorey",
      "parking.underground",
      "parking.rooftop",
      "parking.motorcycle",
      "parking.bicycles",
    ],
  },
  {
    key: "pet",
    Description: "Places that can be interesting for pet owners",
    categories: ["pet.shop", "pet.veterinary", "pet.service", "pet.dog_park"],
  },
  {
    key: "rental",
    Description: "Places where one can rent things",
    categories: [
      "rental.car",
      "rental.storage",
      "rental.bicycle",
      "rental.boat",
      "rental.ski",
    ],
  },
  {
    key: "service",
    Description: "Places that provide services to the public",
    categories: [
      "service.financial",
      "service.cleaning",
      "service.travel_agency",
      "service.post",
      "service.police",
      "service.vehicle",
      "service.beauty",
      "service.tailor",
      "service.funeral_directors",
      "service.bookmaker",
      "service.estate_agent",
      "service.locksmith",
      "service.taxi",
      "service.social_facility",
      "service.recycling",
    ],
  },
  {
    key: "tourism",
    Description: "Places that can be interesting for tourists",
    categories: ["tourism.information", "tourism.attraction", "tourism.sights"],
  },
  {
    key: "religion",
    Description:
      "Places that are associated with a particular faith or religious institution.",
    categories: ["religion.place_of_worship"],
  },
  {
    key: "camping",
    Description:
      "Places that provide outdoor activity including overnight stay",
    categories: [
      "camping.camp_pitch",
      "camping.camp_site",
      "camping.summer_camp",
      "camping.caravan_site",
    ],
  },
  {
    key: "amenity",
    Description: "Small amenities that can be useful in different situations",
    categories: [
      "amenity.toilet",
      "amenity.drinking_water",
      "amenity.give_box",
    ],
  },
  {
    key: "beach",
    Description:
      "A shore of a body of water covered by sand, gravel, or larger rock fragments",
    categories: ["beach.beach_resort"],
  },
  {
    key: "adult",
    Description:
      "Places that provide entertainments for adults, sometimes with a sexual context",
    categories: [
      "adult.nightclub",
      "adult.stripclub",
      "adult.swingerclub",
      "adult.brothel",
      "adult.casino",
      "adult.adult_gaming_centre",
    ],
  },
  {
    key: "airport",
    Description: null,
    categories: ["airport.international"],
  },
  {
    key: "building",
    Description: "Stand-alone buildings and places",
    categories: [
      "building.residential",
      "building.commercial",
      "building.industrial",
      "building.office",
      "building.catering",
      "building.healthcare",
      "building.university",
      "building.college",
      "building.dormitory",
      "building.school",
      "building.driving_school",
      "building.kindergarten",
      "building.public_and_civil",
      "building.sport",
      "building.spa",
      "building.place_of_worship",
      "building.holiday_house",
      "building.accommodation",
      "building.tourism",
      "building.transportation",
      "building.military",
      "building.service",
      "building.facility",
      "building.garage",
      "building.parking",
      "building.toilet",
      "building.prison",
      "building.entertainment",
      "building.historic",
    ],
  },
  {
    key: "ski",
    Description:
      "Infrastructure objects related to downhill skiing sport kinds",
    categories: ["ski.lift"],
  },
  {
    key: "sport",
    Description: "Infrastructure objects related to different sport kinds",
    categories: [
      "sport.stadium",
      "sport.dive_centre",
      "sport.horse_riding",
      "sport.ice_rink",
      "sport.pitch",
      "sport.sports_centre",
      "sport.swimming_pool",
      "sport.track",
      "sport.fitness",
    ],
  },
  {
    key: "administrative",
    Description: "Administrative boundary",
    categories: [
      "administrative.continent_level",
      "administrative.country_level",
      "administrative.country_part_level",
      "administrative.state_level",
      "administrative.county_level",
      "administrative.city_level",
      "administrative.district_level",
      "administrative.suburb_level",
      "administrative.neighborhood_level",
    ],
  },
  {
    key: "postal_code",
    Description: "Postcode boundary",
    categories: [],
  },
  {
    key: "political",
    Description: "Political boundary",
    categories: [],
  },
  {
    key: "low_emission_zone",
    Description: "Low emission zone",
    categories: [],
  },
  {
    key: "populated_place",
    Description: "Place where people live",
    categories: [
      "populated_place.hamlet",
      "populated_place.village",
      "populated_place.neighborhood",
      "populated_place.suburb",
      "populated_place.town",
      "populated_place.city_block",
      "populated_place.quarter",
      "populated_place.city",
      "populated_place.allotments",
      "populated_place.county",
      "populated_place.municipality",
      "populated_place.district",
      "populated_place.region",
      "populated_place.state",
      "populated_place.borough",
      "populated_place.subdistrict",
      "populated_place.province",
      "populated_place.township",
    ],
  },
  {
    key: "production",
    Description: "Place that produces something",
    categories: [
      "production.factory",
      "production.winery",
      "production.brewery",
      "production.cheese",
      "production.pottery",
    ],
  },
];

export const formatCategoryKey = (key: string) => {
  const words = key.split("_");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};

export const formatPlacesType = (key: string) => {
  const words = key.split(".");
  // If there is at least one word after the period, capitalize each word
  if (words.length > 1) {
    const capitalizedWords = words[1]
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(" ");
  }
  return key;
};

export default supportedCategories;
