import PropTypes from "prop-types";
import clsx from "clsx";
import Info from "lucide-preact/dist/esm/icons/info";
import AlertCircle from "lucide-preact/dist/esm/icons/alert-circle";
import AlertTriangle from "lucide-preact/dist/esm/icons/alert-triangle";
import CheckCircle from "lucide-preact/dist/esm/icons/check-circle";
import X from "lucide-preact/dist/esm/icons/x";

const ICONS = {
  info: Info,
  error: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle,
};

const CLASS_NAMES_BY_TYPE = {
  info: "border-gray-300 bg-gray-25 text-gray-600",
  error: "border-error-300 bg-error-25 text-error-600",
  warning: "border-warning-300 bg-warning-25 text-warning-600",
  success: "border-success-300 bg-success-25 text-success-600",
};

const CLASS_NAMES_BY_SIZE = {
  md: "is-md",
  sm: "is-sm",
};

const ICON_SIZE_BY_SIZE = {
  md: 20,
  sm: 16,
};

function Alert({ className, type = "info", size = "md", onClose, children }) {
  const Icon = ICONS[type];

  return (
    <div
      class={clsx(
        "alert",
        CLASS_NAMES_BY_TYPE[type],
        CLASS_NAMES_BY_SIZE[size],
        className
      )}
    >
      {Icon ? <Icon size={ICON_SIZE_BY_SIZE[size]} /> : null}
      <aside class="alert-supporting-text prose prose-sm max-w-full">
        {children}
      </aside>
      {onClose ? (
        <button
          onMouseDown={onClose}
          class="alert-close-button button is-sm icon-only shadow-none"
        >
          <X size={20} />
        </button>
      ) : null}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(Object.keys(ICONS)),
  size: PropTypes.oneOf(["md", "sm"]),
};

export default Alert;
