import { Transformer } from "@parcel/plugin";
import { loadCsf, enrichCsf, formatCsf } from "@storybook/csf-tools";

export default new Transformer({
  async transform({ asset }) {
    try {
      const source = await asset.getCode();
      const csf = loadCsf(source, {
        makeTitle: (userTitle) => userTitle || "default",
      }).parse();

      enrichCsf(csf);

      const { code } = formatCsf(csf, { sourceMaps: true });

      asset.setCode(code);
    } catch (error) {}

    return [asset];
  },
});
