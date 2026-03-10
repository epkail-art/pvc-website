import Navbar       from "@/components/sections/navbar";
import HeroSection  from "@/components/sections/hero";
import WhatIsPVC    from "@/components/sections/what-is-pvc";
import History      from "@/components/sections/history";
import Types        from "@/components/sections/types";
import Manufacturing from "@/components/sections/manufacturing";
import Applications from "@/components/sections/applications";
import Advantages   from "@/components/sections/advantages";
import Environment  from "@/components/sections/environment";
import Footer       from "@/components/sections/footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <WhatIsPVC />
      <History />
      <Types />
      <Manufacturing />
      <Applications />
      <Advantages />
      <Environment />
      <Footer />
    </main>
  );
}
