import CardIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CardContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const [btnIsHighlighed, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CardContext);
  const { item } = cartCtx;

  const numberOfCartItems = item.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0); //this reduce method reduces array items to single number

  const btnClasses = `${classes.button} ${btnIsHighlighed ? classes.bump : ""}`;

  useEffect(() => {
    if (item.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [item]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
