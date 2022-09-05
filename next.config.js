/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      }, 
      {
        source: "/api/movies/:id", // ex) /api/movies/12345
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
      }, 
      
    ];
  }
}

module.exports = nextConfig
