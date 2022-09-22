const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "microfrontend01",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

      // For remotes (please adjust)
      name: "microfrontend01",
      filename: "remoteEntry.js",
      exposes: {
        './Module': './projects/microfrontend01/src/main'
      },

      // For hosts (please adjust)
      // remotes: {
      //     "microfrontend02": "microfrontend02@http://localhost:4200/remoteEntry.js",
      //     "contenedor": "contenedor@http://localhost:4200/remoteEntry.js",

      // },

      shared: {
        ...sharedMappings.getDescriptors()
      }

    }),
    sharedMappings.getPlugin()
  ],
};
