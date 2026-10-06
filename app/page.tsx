import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSellers from "@/components/home/BestSellers";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <BestSellers />
    </main>
  );
}