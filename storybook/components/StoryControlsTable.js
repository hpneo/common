import { h } from "preact";
import { StoryRendererContext } from "./StoryRenderer";
import { useContext } from "preact/hooks";

function StoryControlForEnum({ name, type, defaultValue, value }) {
  const { setArgs } = useContext(StoryRendererContext);

  const onChangeEnumValue = (event) => {
    setArgs((previousValue) => ({
      ...previousValue,
      [name]: event.target.value,
    }));
  };

  return (
    <ul>
      {type.value.map((option) => {
        const optionValue = JSON.parse(option.value ?? null);

        return (
          <li key={option.value}>
            <label class="flex gap-1 items-center">
              <input
                type="radio"
                name={name}
                value={optionValue}
                defaultChecked={optionValue === (value ?? defaultValue)}
                onChange={onChangeEnumValue}
              />
              {optionValue}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function StoryControlForBool({ name, defaultValue, value }) {
  const { setArgs } = useContext(StoryRendererContext);

  const onChangeBoolValue = (event) => {
    setArgs((previousValue) => ({
      ...previousValue,
      [name]: event.target.checked,
    }));
  };

  return (
    <label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={value ?? defaultValue}
        onChange={onChangeBoolValue}
      />
    </label>
  );
}

const STORY_CONTROLS = {
  enum: StoryControlForEnum,
  bool: StoryControlForBool,
};

function StoryControlsTable() {
  const { story, args } = useContext(StoryRendererContext);
  const docGenInfo = story.meta.component.__docgenInfo;

  console.log(docGenInfo);

  return (
    <table class="w-full">
      <thead>
        <tr>
          <th class="w-48 text-left">Name</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(docGenInfo.props).map(([propName, propDefinition]) => (
          <tr key={propName}>
            <td class="py-1">
              <pre class="text-sm">
                {propName}
                {propDefinition.required ? "*" : null}
              </pre>
            </td>
            <td class="py-1">
              {propDefinition.type &&
              STORY_CONTROLS[propDefinition.type.name] ? (
                h(STORY_CONTROLS[propDefinition.type.name], {
                  name: propName,
                  type: propDefinition.type,
                  defaultValue: JSON.parse(
                    propDefinition.defaultValue?.value ?? null
                  ),
                  value: args[propName],
                })
              ) : (
                <pre class="text-xs">
                  {args[propName] ||
                    JSON.parse(propDefinition.defaultValue?.value ?? null)}
                </pre>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StoryControlsTable;
