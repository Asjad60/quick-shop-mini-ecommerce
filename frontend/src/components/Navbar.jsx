import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Quick Shop
          </span>
        </Link>

        <Link to={"/cart"}>
          <div className="relative">
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-2 text-white bg-amber-800 w-4 h-4 text-xs flex justify-center items-center rounded-full">
                {cart?.length}
              </span>
            )}
            <span>
              <ShoppingCart size={25} color="white" />
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
