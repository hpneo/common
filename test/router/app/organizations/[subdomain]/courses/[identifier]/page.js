function Page({ matches }) {
  const { subdomain, identifier } = matches;

  return (
    <div class="p-4">
      <p>
        Welcome to /organizations/
        <code class="text-sm p-1 bg-slate-300 rounded-md">{subdomain}</code>
        /courses/
        <code class="text-sm p-1 bg-slate-300 rounded-md">{identifier}</code>
      </p>
    </div>
  );
}

export default Page;
