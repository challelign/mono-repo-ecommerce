import ProductList from "@/components/ProductList";
import Image from "next/image";

interface CategoryProps {
  category: string;
}

const Homepage = (category: CategoryProps, params:string) => {
  return (
    <div className="w-full">
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill />
      </div>
      <ProductList category={category} params="homepage" />
    </div>
  );
};

export default Homepage;
