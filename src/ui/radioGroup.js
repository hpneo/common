import { useState } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import clsx from "clsx";

function defaultRenderItem({ item, disabled }) {
  return (
    <span
      className={clsx(disabled ? "text-opacity-50" : null, "block truncate")}
    >
      {item.label || item.name}
    </span>
  );
}

function RadioGroup({
  label,
  hint,
  error,
  items,
  renderItem,
  value,
  onChange,
  ...props
}) {
  const [selected, setSelected] = useState(value);
  const renderItemFunction = renderItem ? renderItem : defaultRenderItem;

  function handleChange(item) {
    setSelected(item);
    onChange(item);
  }

  return (
    <div>
      <HeadlessRadioGroup value={selected} onChange={handleChange}>
        {label ? (
          <HeadlessRadioGroup.Label>
            {label}
            {props.required ? <span aria-hidden="true">*</span> : null}
          </HeadlessRadioGroup.Label>
        ) : null}
        <div class="space-y-3">
          {items.map((item) => (
            <HeadlessRadioGroup.Option
              key={item.key}
              value={item.key}
              disabled={item.disabled}
            >
              {({ active, checked, disabled }) =>
                renderItemFunction({ item, active, checked, disabled })
              }
            </HeadlessRadioGroup.Option>
          ))}
        </div>
      </HeadlessRadioGroup>
    </div>
  );
}

export default forwardRef(RadioGroup);
