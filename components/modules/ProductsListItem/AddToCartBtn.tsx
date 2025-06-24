import { IAddToCartBtnProps } from "@/types/goods";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddToCartBtn = ({ 
  handleAddToCart,
  addToCartSpinner,
  text,
  btnDisabled = false,
  className,
}: IAddToCartBtnProps) => {

  return (
    <button 
      type="button"
      className={`btn-reset ${className}`}
      disabled={btnDisabled}
      onClick={handleAddToCart}
    >
      {addToCartSpinner ? (
        <FontAwesomeIcon icon={faSpinner} spin color="#fff" />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default AddToCartBtn;
