import { Fragment } from "preact";
import { Link } from "preact-router";
import ChevronRight from "lucide-preact/dist/esm/icons/chevron-right";
import Home from "lucide-preact/dist/esm/icons/home";
import clsx from "clsx";

const DIVIDERS = {
  chevron: <ChevronRight size={16} />,
};

function renderSection(section, { isLast }) {
  const className = clsx(
    "py-1 px-2",
    isLast ? "text-accent-700 bg-accent-50 rounded-md" : "text-gray-500"
  );

  if (typeof section === "string") {
    return <span class={className}>{section}</span>;
  }

  return (
    <Link href={section.path} class={className}>
      {section.text}
    </Link>
  );
}

function Breadcrumbs({ divider = "chevron", sections }) {
  return (
    <nav class="flex gap-2 text-sm font-medium text-gray-300 items-center">
      <span class="text-gray-500">
        <Home size={20} />
      </span>
      {sections.map((section, index) => (
        <Fragment key={index}>
          {DIVIDERS[divider]}
          {renderSection(section, { isLast: index === sections.length - 1 })}
        </Fragment>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
