import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import mockProducts from "../data/mockProducts";
import { addToCart } from "../redux/slices/cartSlice";

const Products = () => {
  const dispatch = useDispatch();
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white my-10">Products</h2>
      <div className=" grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-4">
        {mockProducts.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            imageUrl={item.imageURL}
            description={item.description}
            price={item.price}
            onClick={() => dispatch(addToCart(item))}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
