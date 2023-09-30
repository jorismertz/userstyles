import { format } from "prettier";
import { variants, labels } from "@catppuccin/palette";
import { variants as rp_variants } from "@rose-pine/palette";

const color_template = (name: string, value: string) => `@${name}: #${value};`;
const variant_template = (name: string) => `@${name}:`;

const target_color_type: ColorFormats = "hex";

const catppuccin_keys = Object.keys(labels) as Array<keyof typeof labels>;
type CatppuccinKeys = (typeof catppuccin_keys)[number];

const rosepine_color_keys = Object.keys(rp_variants.dawn.colors) as Array<
  keyof typeof rp_variants.dawn.colors
>;
type RosePineColorKeys = (typeof rosepine_color_keys)[number];

const rosepine_variant_keys = Object.keys(rp_variants) as Array<
  keyof typeof rp_variants
>;
type ColorFormats = "hex" | "rgb" | "hsl";
type ColorMap = Record<CatppuccinKeys, RosePineColorKeys>;

const colorMap: ColorMap = {
  rosewater: "rose",
  flamingo: "rose",
  pink: "love",
  mauve: "iris",
  red: "love",
  maroon: "love",
  peach: "rose",
  yellow: "gold",
  green: "pine",
  teal: "pine",
  sky: "foam",
  sapphire: "foam",
  blue: "pine",
  lavender: "iris",
  text: "text",
  subtext1: "text",
  subtext0: "text",
  overlay2: "overlay",
  overlay1: "overlay",
  overlay0: "overlay",
  surface2: "surface",
  surface1: "surface",
  surface0: "surface",
  base: "base",
  mantle: "surface",
  crust: "highlightHigh",
};

const sourceFile = await Bun.file("../proton/rose-pine.user.css").text();
let result = sourceFile;

for (let [key, value] of Object.entries(colorMap)) {
  result = result.replaceAll(key, colorMap[key as CatppuccinKeys]);
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
  result = result.replaceAll(
    capitalizedKey,
    colorMap[key as CatppuccinKeys].charAt(0).toUpperCase() +
      colorMap[key as CatppuccinKeys].slice(1)
  );
}

result = result.replaceAll("catppuccin", "rose-pine");

await Bun.write("../proton/output.less", result);

// console.log(result);
