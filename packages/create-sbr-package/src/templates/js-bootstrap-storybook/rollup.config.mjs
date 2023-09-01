import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.js",
    output: {
      file: packageJson.main,
      format: "esm",
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-react"],
        extensions: [".js", ".jsx"],
      }),
      commonjs(),
      postcss(),
      terser(),
    ],
  },
];
