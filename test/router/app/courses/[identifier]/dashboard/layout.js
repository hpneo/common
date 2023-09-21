function Layout({ children }) {
  return (
    <details style={{ border: "solid", padding: 8, marginLeft: 16 }}>
      <summary>Course Dashboard</summary>
      {children}
    </details>
  );
}

export default Layout;
