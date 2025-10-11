import ProductList from "@/components/ProductList";
import Image from "next/image";


// we need to passs category from the url params to the product list 
const Homepage = async({searchParams}:{searchParams:Promise<{category:string}>}) => {

  const category = (await searchParams).category;
  return (
    <div className="w-full">
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill />
      </div>
      <ProductList category={category}/>
    </div>
  );
};

export default Homepage;
