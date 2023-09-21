function Layout({ children }) {
  return (
    <details style={{ border: "solid", padding: 8, marginLeft: 16 }}>
      <summary>Courses Layout</summary>
      {children}
    </details>
  );
}

export default Layout;
