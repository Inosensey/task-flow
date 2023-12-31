/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://qqwhjzpdlzmhopmrzkvy.supabase.co',
    NEXT_PUBLIC_ANON_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxd2hqenBkbHptaG9wbXJ6a3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzNzExNDgsImV4cCI6MjAxMDk0NzE0OH0._Dbe8fGAFYIAwuvo3B78MewNNwRXrOeuSr9uyLqcQRM',
    NEXT_SUPABASE_LOGIN_TOKEN: 'sbp_0aab344b2a70ce0e407cda3b030836861be452ce',
    NEXT_SECRET_KEY:"PhilipMathewDingcong",
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:"AIzaSyARmMbVSukKogbhCMTP10tcJQ1HMKukf_I"
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
