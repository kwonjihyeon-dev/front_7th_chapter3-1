import React from "react";
import { Header } from "./components/organisms";
import { ManagementPage } from "./pages/ManagementPage";

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7fafc" }}>
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
