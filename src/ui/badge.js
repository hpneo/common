import PropTypes from "prop-types";
import clsx from "clsx";

const CLASS_NAMES_BY_COLOR = {
  gray: "bg-gray-100 text-gray-700",
  primary: "bg-accent-50 text-accent-700",
  error: "bg-error-50 text-error-700",
  warning: "bg-warning-50 text-warning-700",
  success: "bg-success-50 text-success-700",
};

function Badge({ color, icon, label }) {
  return (
    <span class={clsx("badge is-sm font-medium", CLASS_NAMES_BY_COLOR[color])}>
      {icon}
      {label}
    </span>
  );
}

Badge.propTypes = {
  color: PropTypes.oneOf(Object.keys(CLASS_NAMES_BY_COLOR)),
  label: PropTypes.node.isRequired,
};

export default Badge;
