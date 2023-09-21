import { forwardRef } from "preact/compat";

function Checkbox({ label, hint, error, disabled, ...props }, ref) {
  return (
    <div class="checkbox">
      <div class="checkbox-wrapper">
        <input
          type="checkbox"
          disabled={disabled}
          id={props.name}
          ref={ref}
          {...props}
        />
        {label ? (
          <label className="input-label" for={props.name}>
            {label}
          </label>
        ) : null}
      </div>
      {hint ? <span className="input-hint">{hint}</span> : null}
      {error ? <span className="input-error">{error}</span> : null}
    </div>
  );
}

export default forwardRef(Checkbox);
