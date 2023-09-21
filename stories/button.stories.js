import { Button } from "../src/ui";

const meta = {
  title: "Components/Button",
  component: Button,
};

export const Basic = {
  args: {
    variant: "primary",
    children: "Click Me!",
    loading: false,
  },
  render(props) {
    return <Button {...props} />;
  },
};

export default meta;
