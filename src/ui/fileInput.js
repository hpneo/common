import { forwardRef } from "preact/compat";
import { useRef } from "preact/hooks";
import UploadCloud from "lucide-preact/dist/esm/icons/upload-cloud";
import Loader2 from "lucide-preact/dist/esm/icons/loader-2";
import clsx from "clsx";
import getFileTypeIcon from "helpers/getFileTypeIcon";

function FileInput(
  { label, multiple, value, onChange, rootClassName, ...props },
  ref
) {
  const inputRef = useRef(null);
  let files = [];

  if (value) {
    files = Array.isArray(value) ? value : [value];
  }

  const uploader = (
    <article
      class={clsx(
        "flex flex-col items-center justify-center py-4 px-6 bg-white border border-gray-200 rounded-lg text-gray-500",
        value
          ? null
          : "hover:text-accent-600 hover:border-accent-300 hover:bg-accent-50 cursor-pointer"
      )}
    >
      <UploadCloud size={20} />
      <p class="text-sm mt-3 mb-1">
        <button
          type="button"
          class="text-accent-700 font-medium"
          onClick={() => inputRef.current.click()}
        >
          Click to upload
        </button>{" "}
        or drag and drop
      </p>
      <p class="text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
    </article>
  );

  return (
    <div class={clsx("input", rootClassName)}>
      {label ? <label className="input-label">{label}</label> : null}
      <div class="space-y-4">
        {multiple || !value ? uploader : null}
        <div class="space-y-3">
          {files.map((file) => {
            const FileTypeIcon = getFileTypeIcon(file.type);

            return (
              <article
                class="flex justify-between gap-4 bg-white border border-gray-200 rounded-lg text-gray-500 p-4"
                key={`${file.name}.${file.lastModified}`}
              >
                <FileTypeIcon size={16} class="mt-1.5" />
                <aside class="flex-1 truncate">
                  <p class="text-gray-700 font-medium text-sm truncate">
                    {file.name}
                  </p>
                  <p class="text-gray-500 text-sm">
                    {new Intl.NumberFormat("en-US", {
                      style: "unit",
                      unit: "kilobyte",
                    }).format(file.size)}
                  </p>
                </aside>
                <span class="text-gray-500 animate-spin w-5 h-5">
                  {/* <Loader2 size={20} /> */}
                </span>
              </article>
            );
          })}
        </div>

        <input
          type="file"
          class="hidden"
          multiple={multiple}
          ref={(element) => {
            inputRef.current = element;

            if (typeof ref === "function") {
              ref(element);
            }
          }}
          value={value}
          onChange={(event) => {
            if (multiple) {
              onChange([...event.target.files]);
            } else {
              onChange(event.target.files[0]);
            }
          }}
          {...props}
        />
      </div>
    </div>
  );
}

export default forwardRef(FileInput);
