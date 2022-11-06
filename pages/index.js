import { Body, Header, Meta } from "@components/web";
import { TypeAnimation } from 'react-type-animation';
import { styles } from "@styles/Home.module.css"


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
          <div className="text-5xl font-bold tracking-tighter pb-2 flex items-center gap-2 flex flex-wrap justify-center">
            Instantly share stunning{" "}
            <TypeAnimation
              sequence={[
                'notes.', 
                2000, 
                'latex.', 
                2000, 
                'markdown.',
                2000
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              
            />
          </div>
        </div>
      </Body>
    </div>
  );
}
