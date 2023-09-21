import { Alert } from "../src/ui";

const meta = {
  title: "Components/Alert",
  component: Alert,
};

export const Info = {
  args: {
    children: "Info text",
  },
  render(props) {
    return <Alert {...props} />;
  },
};

export const Warning = {
  args: {
    children: "Warning text",
    type: "warning",
  },
  render(props) {
    return <Alert {...props} />;
  },
};

export default meta;
