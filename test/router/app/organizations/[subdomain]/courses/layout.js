import { Link } from "preact-router";

function Layout({ children, matches }) {
  const { subdomain } = matches;

  const url = `/organizations/${subdomain}`;

  const courses = [
    { id: "backend", title: "Backend course" },
    { id: "frontend", title: "Frontend course" },
  ];

  return (
    <div class="h-[calc(100%_-_0.5rem)]">
      <aside class="flex gap-2 border-b border-b-gray-200 mb-2">
        {courses.map((course) => (
          <Link
            href={`${url}/courses/${course.id}`}
            key={course.id}
            class="p-2"
            activeClassName="bg-gray-200"
          >
            {course.title}
          </Link>
        ))}
      </aside>
      {children}
    </div>
  );
}

export default Layout;
