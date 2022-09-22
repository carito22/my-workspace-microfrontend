const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "microfrontend02",
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
      name: "microfrontend02",
      filename: "remoteEntry.js",
      exposes: {
        './Module': './projects/microfrontend02/src/main',
      },

      // For hosts (please adjust)
      // remotes: {
      //     "microfrontend01": "microfrontend01@http://localhost:4000/remoteEntry.js",
      //     "contenedor": "contenedor@http://localhost:4200/remoteEntry.js",

      // },

      shared: {
       /* "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/common/http": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },*/

        ...sharedMappings.getDescriptors()
      }

    }),
    sharedMappings.getPlugin()
  ],
};
