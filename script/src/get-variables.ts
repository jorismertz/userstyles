import { format } from "prettier";
import { variants, labels } from "@catppuccin/palette";
import { variants as rp_variants } from "@rose-pine/palette";

const color_template = (name: string, value: string) => `@${name}: #${value};`;
const variant_template = (name: string) => `@${name}:`;

const target_color_type: ColorFormats = "hex";

const catppuccin_keys = Object.keys(labels) as Array<keyof typeof labels>;

const rosepine_color_keys = Object.keys(rp_variants.dawn.colors) as Array<
  keyof typeof rp_variants.dawn.colors
>;

const rosepine_variant_keys = Object.keys(rp_variants) as Array<
  keyof typeof rp_variants
>;
type ColorFormats = "hex" | "rgb" | "hsl";

function pbcopy(data: string) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

let result = "";

for (const key of rosepine_variant_keys) {
  let variant_result = variant_template(key) + " {";
  for (const color_key of rosepine_color_keys) {
    variant_result += color_template(
      color_key,
      rp_variants[key].colors[color_key][target_color_type]
    );
  }
  variant_result += "}";
  result += await format(variant_result, { parser: "scss" });
}

pbcopy(result);
console.log("Copied to clipboard!");
