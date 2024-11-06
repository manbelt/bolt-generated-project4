/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(extension => {
    // This ensures we only use one extension type per file
    return extension.startsWith('ts') || (!extension.startsWith('ts') && extension === 'js')
  }),
}

module.exports = nextConfig
