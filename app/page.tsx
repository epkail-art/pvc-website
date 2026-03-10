import Navbar            from "@/components/sections/navbar";
import HeroSection       from "@/components/sections/hero";
import WhatIsPVC         from "@/components/sections/what-is-pvc";
import History           from "@/components/sections/history";
import Structure         from "@/components/sections/structure";
import PolymerizationScroll from "@/components/sections/polymerization";
import Types             from "@/components/sections/types";
import Manufacturing     from "@/components/sections/manufacturing";
import Applications      from "@/components/sections/applications";
import Comparison        from "@/components/sections/comparison";
import Advantages        from "@/components/sections/advantages";
import Environment       from "@/components/sections/environment";
import Footer            from "@/components/sections/footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <WhatIsPVC />
      <History />
      <Structure />
      <PolymerizationScroll />
      <Types />
      <Manufacturing />
      <Applications />
      <Comparison />
      <Advantages />
      <Environment />
      <Footer />
    </main>
  );
}
