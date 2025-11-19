// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/mission/'   // ← change this to match your real subfolder
    : '/',          // localhost keeps /
  
  // optional but recommended
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html'
}