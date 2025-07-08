import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateQuantity } from "../redux/slices/cartSlice";

const ProductCard = ({
  title,
  imageUrl,
  description,
  price,
  onClick,
  quantity = 1,
  id,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className=" border  rounded-lg shadow-sm bg-gray-800 border-gray-700">
      <img
        className="rounded-t-lg object-cover w-full h-[250px]"
        src={imageUrl}
        alt={title}
      />

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          {location.pathname === "/cart" && (
            <div>
              <select
                className="text-white border border-slate-600 rounded-md text-lg"
                name="quantity"
                defaultValue={quantity}
                onChange={(e) =>
                  dispatch(updateQuantity({ quantity: e.target.value, id }))
                }
              >
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <option className="bg-black" value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl text-slate-300 sm:text-2xl font-semibold">
            ${price}
          </span>

          <button onClick={onClick} className="btn">
            {location.pathname === "/" ? "Add to cart" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
