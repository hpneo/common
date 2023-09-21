import clsx from "clsx";

export default function InputGroup({
  label,
  leadingItem,
  hint,
  error,
  rootClassName,
  wrapperClassName,
  disabled,
  children,
}) {
  return (
    <div class={clsx("input-group", rootClassName)}>
      {label ? <label className="input-label">{label}</label> : null}
      <div class="input-group-wrapper">
        {leadingItem}
        <div
          class={clsx(
            "input-group-items",
            wrapperClassName,
            disabled ? "disabled" : null
          )}
        >
          {children}
        </div>
      </div>
      {hint ? <span className="input-hint">{hint}</span> : null}
      {error ? <span className="input-error">{error}</span> : null}
    </div>
  );
}
