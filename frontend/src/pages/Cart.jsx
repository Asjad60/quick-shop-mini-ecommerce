import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { removeFromCart } from "../redux/slices/cartSlice";
import Checkout from "../components/cart/Checkout";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div className="w-full">
      {cart?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold my-10 text-white">Cart</h2>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-4">
            {cart?.map((item) => (
              <ProductCard
                key={item.id}
                title={item.title}
                imageUrl={item.imageURL}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                id={item.id}
                onClick={() => dispatch(removeFromCart(item.id))}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Checkout cart={cart} />
          </div>
        </div>
      ) : (
        <div className="text-white text-xl">
          <p className="text-center">
            No Products, Please add products to cart
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
