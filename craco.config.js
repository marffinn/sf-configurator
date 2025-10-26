module.exports = {
  
  webpack: {
    configure: (config) => {
      const preRule = config.module.rules.find(
        (r) => r.enforce === 'pre' && r.use && r.use.some((u) => u.loader && u.loader.includes('source-map-loader'))
      );
      if (preRule) {
        preRule.exclude = [
          ...(preRule.exclude || []),
          /@mediapipe[\\/]tasks-vision[\\/]vision_bundle\.mjs$/,
        ];
      }
      return config;
    },
  },
};
