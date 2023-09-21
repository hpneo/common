import PropTypes from "prop-types";
import clsx from "clsx";
import User from "lucide-preact/dist/esm/icons/user";

const CLASS_NAME_BY_SIZE = {
  xs: "is-xs",
  sm: "is-sm",
  md: "is-md",
  lg: "is-lg",
  xl: "is-xl",
  "2xl": "is-2xl",
};

function Avatar({ src, size = "md" }) {
  if (src) {
    return (
      <img
        src={src}
        class={clsx("avatar", CLASS_NAME_BY_SIZE[size], "rounded-full")}
      />
    );
  }

  return (
    <span
      class={clsx(
        "avatar",
        CLASS_NAME_BY_SIZE[size],
        "flex items-center justify-center rounded-full bg-gray-50 text-gray-600"
      )}
    >
      <User />
    </span>
  );
}

Avatar.propTypes = {
  size: PropTypes.oneOf(Object.keys(CLASS_NAME_BY_SIZE)),
};

export default Avatar;
