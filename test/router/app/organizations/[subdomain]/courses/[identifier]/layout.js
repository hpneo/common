import { Link } from "preact-router/match";

function Layout({ children, matches }) {
  const { subdomain, identifier } = matches;

  const url = `/organizations/${subdomain}/courses/${identifier}`;

  const lessons = [
    { id: "intro", sectionId: "main-section", title: "Intro" },
    { id: "content", sectionId: "main-section", title: "Content" },
  ];

  return (
    <div class="h-[calc(100%_-_2.5rem)] grid grid-cols-[160px_auto]">
      <aside class="flex flex-col gap-2 border-r border-r-gray-200">
        {lessons.map((lesson) => (
          <Link
            href={`${url}/${lesson.sectionId}/${lesson.id}`}
            key={lesson.id}
            class="p-2"
            activeClassName="bg-gray-200"
          >
            {lesson.title}
          </Link>
        ))}
      </aside>
      {children}
    </div>
  );
}

export default Layout;
