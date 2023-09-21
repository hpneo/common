import clsx from "clsx";

export default function Textarea({
  label,
  hint,
  error,
  disabled,
  leadingIcon,
  trailingIcon,
  rootClassName,
  wrapperClassName,
  hintClassName,
  ...props
}) {
  return (
    <div class={clsx("input", rootClassName)}>
      {label ? <label className="input-label">{label}</label> : null}
      <div
        class={clsx(
          "input-wrapper border border-gray-300",
          wrapperClassName,
          disabled ? "disabled" : null
        )}
      >
        {leadingIcon}
        <textarea disabled={disabled} {...props} />
        {trailingIcon}
      </div>
      {hint ? <span className="input-hint">{hint}</span> : null}
      {error ? <span className="input-error">{error}</span> : null}
    </div>
  );
}
