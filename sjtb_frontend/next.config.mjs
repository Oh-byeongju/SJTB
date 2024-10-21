/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    experimental: {
      staleTimes: {
        dynamic: 0,
        static: 0,
      },
    },
  };
  
  export default nextConfig;
  