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
        destination: "http://18.207.127.28/LaTribunaBack/public/api/auth/:path*",
      },
      {
        source: "/api/profile/:path*",
        destination:
          "http://18.207.127.28/LaTribunaBack/public/api/profile/:path*",
      },
      {
        source: "/api/articles/:path*",
        destination:
          "http://18.207.127.28/LaTribunaBack/public/api/articles/:path*",
      },
      {
        source: "/api/article-reactions/:path*",
        destination:
          "http://18.207.127.28/LaTribunaBack/public/api/article-reactions/:path*",
      },
    ];
  },
};

export default nextConfig;
