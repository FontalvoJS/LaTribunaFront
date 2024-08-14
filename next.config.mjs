/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://localhost/beerclub_backend/public/api/auth/:path*",
      },
      {
        source: "/api/profile/:path*",
        destination:
          "http://localhost/beerclub_backend/public/api/profile/:path*",
      },
      {
        source: "/api/articles/:path*",
        destination:
          "http://localhost/beerclub_backend/public/api/articles/:path*",
      },
      {
        source: "/api/article-reactions/:path*",
        destination:
          "http://localhost/beerclub_backend/public/api/article-reactions/:path*",
      },
    ];
  },
};

export default nextConfig;
