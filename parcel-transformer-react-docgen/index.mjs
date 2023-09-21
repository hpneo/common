import { Transformer } from "@parcel/plugin";
import ReactDocGen from "react-docgen";

export default new Transformer({
  async transform({ asset }) {
    try {
      const source = await asset.getCode();

      const code = ReactDocGen.parse(source);
      const output = source.replace(
        /export default ([a-zA-Z]*)/,
        (substring, group) => {
          return `${group}.__docgenInfo = ${JSON.stringify(
            code
          )};\n\n${substring}`;
        }
      );

      asset.type = "js";
      asset.setCode(output);
    } catch (error) {}

    return [asset];
  },
});
