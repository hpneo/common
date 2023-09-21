import { Tab } from "@headlessui/react";
import clsx from "clsx";

function Tabs({ tabs, classNames = {} }) {
  return (
    <Tab.Group>
      <Tab.List className={clsx("flex items-center", classNames.tabs)}>
        {tabs.map((tab) => (
          <Tab
            key={tab.key || tab.id}
            className={({ selected }) =>
              clsx(
                selected ? "" : null,
                selected ? classNames.selectedTab : classNames.unselectedTab,
                classNames.tab
              )
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {tabs.map((tab) => (
          <Tab.Panel key={tab.key || tab.id}>{tab.panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default Tabs;
