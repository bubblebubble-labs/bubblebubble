const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {}
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   async rewrites() {
//     return [
//       {
//         source: "/:path*",
//         destination: "(전달받은 API 주소)/:path*",
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

//module.exports = withContentlayer(nextConfig)

module.exports = {
	swcMinify: false,
  };