import { forwardRef } from "preact/compat";
import clsx from "clsx";

function Input(
  {
    type = "text",
    label,
    hint,
    error,
    disabled,
    leadingIcon,
    trailingIcon,
    rootClassName,
    wrapperClassName,
    hintClassName,
    onChange,
    ...props
  },
  ref
) {
  return (
    <div class={clsx("input", rootClassName)}>
      {label ? (
        <label className="input-label">
          {label}
          {props.required ? <span aria-hidden="true">*</span> : null}
        </label>
      ) : null}
      <div
        class={clsx(
          "input-wrapper border border-gray-300",
          wrapperClassName,
          disabled ? "disabled" : null
        )}
      >
        {leadingIcon}
        <input
          type={type}
          disabled={disabled}
          ref={ref}
          onInput={onChange}
          class={clsx(
            "text-gray-900",
            props.class,
            trailingIcon ? "with-trailing-icon" : null
          )}
          {...props}
        />
        {trailingIcon}
      </div>
      {hint ? <span className="input-hint">{hint}</span> : null}
      {error ? <span className="input-error">{error}</span> : null}
    </div>
  );
}

export default forwardRef(Input);
