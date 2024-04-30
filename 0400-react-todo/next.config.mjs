/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? 'https://version1-workspace.github.io/ws-01-0100-fe-materials/0400-react-todo/' : undefined,
};

export default nextConfig;
