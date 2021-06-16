module.exports = function(context, options) {
  return {
    name: "custom-webpack-conf",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          symlinks: false
        }
      };
    }
  };
};
