import { 
  registerChaiBlock, 
  ChaiBlockComponentProps
} from "@chaibuilder/runtime";
import { loadWebBlocks } from "@chaibuilder/sdk/web-blocks";
import { registerChaiLibrary, defaultChaiLibrary } from "@chaibuilder/sdk";

// Example of a custom block if needed, but we'll use default blocks mostly.
// However, to satisfy "every feature", let's register a custom "LocalPulse" brand block.

const BrandHero = (props: any) => {
  const { blockProps, title, subtitle, children } = props;
  return (
    <section {...blockProps} className="py-20 px-6 text-center brand-gradient-bg text-white rounded-[3rem] my-10 mx-6 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">{title || "Custom Brand Hero"}</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-10">{subtitle || "Build something amazing with our new Chai-powered engine."}</p>
        {children}
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/20 blur-3xl rounded-full -ml-32 -mb-32" />
    </section>
  );
};

export const registerCustomBlocks = () => {
  // Load standard blocks
  loadWebBlocks();
  
  // Register default library (Sections Library)
  // The default library provides hundreds of pre-built high-quality sections
  registerChaiLibrary("default", defaultChaiLibrary());
  
  registerChaiBlock(BrandHero, {
    type: "BrandHero",
    label: "Brand Hero",
    group: "LocalPulse",
    category: "Hero",
    wrapper: true,
    schema: {
      properties: {
        title: { type: "string", title: "Headline", default: "We build digital experiences" },
        subtitle: { type: "string", title: "Subheading", default: "Transform your brand with our cutting-edge web solutions." },
      }
    }
  });
};
