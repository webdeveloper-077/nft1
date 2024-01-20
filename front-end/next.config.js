/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs");
        return config;
      },
      experimental: {
        appDir: true
      }
}

module.exports = nextConfig
