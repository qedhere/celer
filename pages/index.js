import { Body, Header, Meta } from "@components/web";
import Typical from "react-typical";

export default function Home() {
  return (
    <div>
      <Meta
        title="Celer"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        <div className="mt-[128px] sm:mt-[256px]">
          <div className="text-5xl font-bold tracking-tighter pb-2 flex items-center gap-2">
            Instantly share beautiful{" "}
            <Typical
              steps={["Notes", 2000, "Latex", 2000, "Markdown", 2000]}
              loop={Infinity}
              wrapper="p"
              style={{ color: "#00B87C" }}
            />
          </div>
        </div>
      </Body>
    </div>
  );
}
