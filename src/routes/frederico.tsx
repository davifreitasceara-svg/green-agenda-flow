import { createFileRoute } from "@tanstack/react-router";
import PortfolioHero from "@/components/ui/portfolio-hero";

export const Route = createFileRoute("/frederico")({
  component: FredericoProfile,
});

function FredericoProfile() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />
      <div className="w-full">
        <PortfolioHero />
      </div>
    </>
  );
}
