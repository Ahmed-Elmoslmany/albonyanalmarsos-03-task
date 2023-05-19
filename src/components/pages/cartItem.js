import { useContext, useEffect } from "react";
import classes from "./cartItem.module.css";
import classesBtn from "./Car.module.css";
import { IoTrashOutline } from "react-icons/io5";
import CartContext from "../../store/cart-context";
const CartItem = (props) => {

  // let [carsNumber, setCarsNumber] = useState(1);
  const cartCtx = useContext(CartContext)
  
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("cartItems")) && JSON.parse(localStorage.getItem("cartItems")).length > 0){
      // console.log(JSON.parse(localStorage.getItem("cartItems")));
      cartCtx.items = JSON.parse(localStorage.getItem("cartItems"));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const item = cartCtx.items.find(item => item.id === props.id)

  let carsNumber = undefined;
  if(item){
    carsNumber = item.carsNumber
  }

  const carsIncrementHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      title: props.title,
      img: props.img,
    })
  }

  const carsDecrementHandler = () => {
      cartCtx.removeItem(props.id)
      localStorage.setItem('cartItems', JSON.stringify(cartCtx.items))
  }

  const deleteCartItemHandler = () => {
    cartCtx.removeFromCart(props.id)
    localStorage.setItem('cartItems', JSON.stringify(cartCtx.items))

  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartCtx.items))

  }, [cartCtx.items])

  return (
    <div>
      
      <div className={classes.cartItem}>
        <div className={classes.cartItemText}>
          <h3>{props.name}</h3>
          <p>{props.title}</p>

          <div className={classes.btns}>
            <div className={classesBtn.cardBtns}>
              <button
                className={classesBtn.cardBtnLeft}
                onClick={carsDecrementHandler}
              >
                -
              </button>
          
              <p>{carsNumber || 0}</p>
              <button
                className={classesBtn.cardBtnRight}
                onClick={carsIncrementHandler}
              >
                +
              </button>
              <button className={classes.deleteBtn} 
              onClick={deleteCartItemHandler}>
                <IoTrashOutline className={classes.trashIc} />
                
              </button>
            </div>
          </div>
        </div>
        <div className={classes.cartItemImg}>
          <img src={props.img} alt={props.img} />
        </div>
      </div>
     
    </div>
  );
};

export default CartItem;
