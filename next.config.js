/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.geoapify.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://qqwhjzpdlzmhopmrzkvy.supabase.co",
    NEXT_PUBLIC_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxd2hqenBkbHptaG9wbXJ6a3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzNzExNDgsImV4cCI6MjAxMDk0NzE0OH0._Dbe8fGAFYIAwuvo3B78MewNNwRXrOeuSr9uyLqcQRM",
    NEXT_SUPABASE_LOGIN_TOKEN: "sbp_0aab344b2a70ce0e407cda3b030836861be452ce",
    NEXT_SECRET_KEY: "PhilipMathewDingcong",
    GEOAPIFY_API_KEY: "04e9680528d74bd98b842c63ae60eaa1",
    GEOAPIFY_AUTOCOMPLETE_API:
      "https://api.geoapify.com/v1/geocode/autocomplete",
    GEOAPIFY_PLACES_API: "https://api.geoapify.com/v2/places",
    GEOAPIFT_MAP_STATIC_API:
      "https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth",
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: "AIzaSyARmMbVSukKogbhCMTP10tcJQ1HMKukf_I",
    NEXT_DEV_URL: "http://localhost:3000/",
    NEXT_PROD_URL:"https://taskf.vercel.app/"
  },
};

module.exports = nextConfig;
