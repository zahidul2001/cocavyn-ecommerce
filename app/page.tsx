import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}