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
            {
                source: "/api/admin/:path*",
                destination: "http://localhost/beerclub_backend/public/api/admin/:path*",
            },
        ];
    }
};

export default nextConfig;
