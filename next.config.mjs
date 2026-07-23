/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // cPanel's "Setup Node.js App" (Phusion Passenger) needs a plain
  // server script as its startup file — `next start` isn't invokable
  // that way. Standalone output produces .next/standalone/server.js,
  // which listens on process.env.PORT the way Passenger expects.
  output: "standalone",
};

export default nextConfig;
