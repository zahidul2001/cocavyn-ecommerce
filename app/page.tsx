import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSellers from "@/components/home/BestSellers";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <BestSellers />
      <Newsletter />
    </main>
  );
}