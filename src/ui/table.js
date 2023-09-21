import clsx from "clsx";

const CLASS_NAME_BY_SIZE = {
  sm: "is-sm",
  md: "is-md",
};

function Table({ columns, items, size = "md" }) {
  return (
    <table class={clsx("table", CLASS_NAME_BY_SIZE[size])}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} class={column.class}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => {
              const value = column.render
                ? column.render({ [column]: item[column.key], item })
                : item[column.key];

              return (
                <td
                  key={`${item.id}.${column.key}`}
                  class={column.cellClassName}
                >
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
