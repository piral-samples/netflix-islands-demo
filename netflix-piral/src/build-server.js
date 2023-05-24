const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const copyStaticFiles = require('esbuild-copy-static-files');
const path = require("path");

esbuild.build({
  entryPoints: [path.resolve(__dirname, "server/app.ts")],
  minify: true,
  bundle: true,
  platform: "node",
  outfile: path.resolve(__dirname, "../dist/server.js"),
  plugins: [
    sassPlugin({
      type: "css-text",
    }),
    copyStaticFiles({
      src: path.resolve(__dirname, "server/static"),
      dest: path.resolve(__dirname, "../dist/wwwroot"),
    }),
  ],
});
