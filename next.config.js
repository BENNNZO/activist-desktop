/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        dangerouslyAllowSVG: true,
        domains: [
            "lh3.googleusercontent.com",
            "source.boringavatars.com"
        ],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        return config;
    },
};

module.exports = nextConfig
