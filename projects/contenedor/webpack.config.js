const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "contenedor",
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
      //name: "contenedor",
      //filename: "remoteEntry.js",
      //exposes: {
      //  './Component': './projects/contenedor/src/app/app.component.ts',
      //},

      // For hosts (please adjust)
      remotes: {
        "microfrontend01": "microfrontend01@http://localhost:4000/remoteEntry.js",
        "microfrontend02": "microfrontend02@http://localhost:4100/remoteEntry.js",
      },

      shared: {


        ...sharedMappings.getDescriptors()
      }

    }),
    sharedMappings.getPlugin()
  ],
};
