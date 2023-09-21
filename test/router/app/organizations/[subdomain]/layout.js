import { Link } from "preact-router/match";

function Layout({ children, matches }) {
  const { subdomain } = matches;

  const url = `/organizations/${subdomain}`;

  return (
    <main class="grid grid-cols-[160px_auto] w-full h-full">
      <aside class="flex flex-col gap-2 p-2 border-r border-r-gray-200">
        <Link href={`${url}/courses`}>Courses</Link>
        <Link href={`${url}/users`}>Users</Link>
      </aside>
      <section class="py-2 px-4">{children}</section>
    </main>
  );
}

export default Layout;
