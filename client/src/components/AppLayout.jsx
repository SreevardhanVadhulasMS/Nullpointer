import AppNavbar from "./HomeNavbar";

export default function AppLayout({ children }) {
  return (
    <>
      <AppNavbar />
      <div style={{ paddingTop: "110px" }}>
        {children}
      </div>
    </>
  );
}
