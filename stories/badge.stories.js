import { Badge } from "../src/ui";

const meta = {
  title: "Components/Badge",
  component: Badge,
};

export const Basic = {
  args: {
    color: "primary",
    label: "Gringuis",
  },
  render(props) {
    return <Badge {...props} />;
  },
};

export default meta;
