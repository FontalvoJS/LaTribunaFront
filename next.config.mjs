/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: () => {
        return [
            {
                source: "/api/auth/:path*",
                destination: "http://localhost/beerclub_backend/public/api/auth/:path*",
            },
        ];
    }
};

export default nextConfig;
