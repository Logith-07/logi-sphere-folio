import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Logith S T — Full Stack Developer | AI Enthusiast | CSE Student" },
      {
        name: "description",
        content:
          "Portfolio of Logith S T — Full Stack Developer, AI Enthusiast and Computer Science Engineering student crafting modern, immersive digital experiences.",
      },
      { property: "og:title", content: "Logith S T — Full Stack Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Futuristic portfolio showcasing projects, skills, articles and coding profiles of Logith S T.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/portfolio.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#05060f" }}>
      <iframe
        src="/portfolio.html"
        title="Logith S T Portfolio"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          border: 0,
        }}
      />
    </div>
  );
}
