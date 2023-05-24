const esbuild = require("esbuild");
const path = require("path");

esbuild.build({
  entryPoints: [path.resolve(__dirname, "client/app.ts")],
  minify: true,
  bundle: true,
  platform: "browser",
  outfile: path.resolve(__dirname, "../dist/client.js"),
});
