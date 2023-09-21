import PropTypes from "prop-types";
import clsx from "clsx";
import Loader2 from "lucide-preact/dist/esm/icons/loader-2";

const CLASS_NAME_BY_SIZE = {
  xs: "is-xs",
  sm: "is-sm",
  md: "is-md",
  lg: "is-lg",
};

const ICON_SIZE_BY_SIZE = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
};

const CLASS_NAME_BY_VARIANT = {
  primary: "bg-accent-600 text-white font-medium border border-transparent",
  secondary:
    "text-gray-700 border border-gray-300 font-medium text-sm bg-white",
};

function Button({
  variant = "secondary",
  size = "md",
  children,
  type = "button",
  disabled,
  loading,
  onClick,
  ...props
}) {
  return (
    <button
      class={clsx(
        "button",
        CLASS_NAME_BY_SIZE[size],
        CLASS_NAME_BY_VARIANT[variant],
        props.class
      )}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span class="animate-spin">
          <Loader2 size={ICON_SIZE_BY_SIZE[size]} />
        </span>
      ) : null}
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  children: PropTypes.node,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
