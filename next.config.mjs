/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: () => {
        return [
            {
                source: "/api/:path*",
                destination: "http://Barrabrava.test/:path*",
            },
        ];
    }
};

export default nextConfig;
