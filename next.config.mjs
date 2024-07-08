/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: () => {
        return [
            {
                source: "/api/auth/:path*",
                destination: "http://localhost/beerclub_backend/public/api/auth/:path*",
            },
            {
                source: "/api/profile/:path*",
                destination: "http://localhost/beerclub_backend/public/api/profile/:path*",
            },
        ];
    }
};

export default nextConfig;
