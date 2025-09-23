import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import Testimonials from "@/components/sections/Testimonials";
import HostCTA from "@/components/sections/HostCTA";
import Footer from "@/components/sections/Footer";
import { getDictionary } from "./dictionaries";
import { FAQSection } from "@/components/sections/faq-section";
import { listPropertis } from "@/actions/properties";
import { AIAssistanceBot } from "@/components/ai-assistance-bot";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" | "fr" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang); // en
  const properties = await listPropertis();
  return (
    <main className="min-h-screen relative">
      <Header data={dict.header} currentLang={lang} />
      <Hero data={dict.hero} currentLang={lang}/>
      <FeaturedProperties data={dict.featuredProperties} lang={lang} properties={properties}/>
      <HowItWorks data={dict.howItWorks} />
      <Testimonials data={dict.testimonials} />
      <HostCTA data={dict.hostCTA} />
      <FAQSection data={dict.faqData}/>
      <Footer data={dict.footer} />
       <AIAssistanceBot />
    </main>
  );
}
