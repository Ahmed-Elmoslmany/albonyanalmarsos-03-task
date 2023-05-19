import { useState, useContext,useEffect } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Car.module.css";
import { IoAccessibility } from "react-icons/io5";
import { IoBag } from "react-icons/io5";
const Car = (props) => {
  
  const cartCtx = useContext(CartContext);
  
  // let [carsNumber, setCarsNumber] = useState(0);

  const item = cartCtx.items.find(item => item.id === props.id)

  let carsNumber = undefined;
  if(item){
    carsNumber = item.carsNumber
  }


  useEffect(() => {
    if(JSON.parse(localStorage.getItem("cartItems")) && JSON.parse(localStorage.getItem("cartItems")).length > 0){
      // console.log(JSON.parse(localStorage.getItem("cartItems")));
      cartCtx.items = JSON.parse(localStorage.getItem("cartItems"));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const carsIncrementHandler = () => {
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        title: props.title,
        img: props.img,
     
      })
      localStorage.setItem('cartItems', JSON.stringify(cartCtx.items))
      console.log(cartCtx.items);
  }

  const carsDecrementHandler = () => {
      cartCtx.removeItem(props.id)
      localStorage.setItem('cartItems', JSON.stringify(cartCtx.items))

  }
  // console.log(obj.carsNumber);

  useEffect(() => {
    if(cartCtx.items){
    localStorage.setItem('cartItems', JSON.stringify(cartCtx.items))
    }
  }, [cartCtx.items])
 
  return (
    <div className={classes.card}>
      <div className={classes.cardHead}>
        <img src={props.img} alt="fad" />

        <h2>{props.name}</h2>
        <p>{props.title}</p>
      </div>
      <p className={classes.carPara}>{props.description}</p>
      <div className={classes.cardBottom}>
        <div className={classes.cardIcons}>
          <div className={classes.cardIconPara}>
            <IoAccessibility className={classes.cardIcon} />
            <p>{props.seats}</p>
          </div>
          <div className={classes.cardIconPara}>
            <IoBag className={classes.cardIcon} />
            <p>{props.luggage}</p>
          </div>
        </div>
        <div className={classes.cardBtns}>
          <button 
          className={classes.cardBtnLeft}
          onClick={carsDecrementHandler}
          >
            -
          </button>
          
          <p>{carsNumber || 0}</p>
          <button
            className={classes.cardBtnRight}
            onClick={carsIncrementHandler}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Car;
