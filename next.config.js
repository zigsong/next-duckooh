const withImages = require('next-images')

module.exports = withImages({
  assetPrefix: '',
  dynamicAssetPrefix: true,
  webpack(config, options) {
    return config
  },
  env: {
    MONGO_URI: "mongodb+srv://zig:anthro@test-db.ctzxi.mongodb.net/myday6?retryWrites=true&w=majority",
  }
})