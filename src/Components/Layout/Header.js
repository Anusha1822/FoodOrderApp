import { Fragment } from "react";
import mealsImage from "../../assets/IndianMeal.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton.js";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>IndianFoodStore</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
