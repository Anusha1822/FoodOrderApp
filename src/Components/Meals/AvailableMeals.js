import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
// import Image1 from "../../assets/FullMeal.jpg";
// import Image2 from "../../assets/Biryani.jpg";
// import Image3 from "../../assets/Parota.jpg";
// import Image4 from "../../assets/Dosa.jpg";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Full Meal",
//     description: "Finest veggies, rice and curd!",
//     price: 22.99,
//     imageName: Image1,
//   },
//   {
//     id: "m2",
//     name: "Chicken Biryani",
//     description: "Finest meat and healthy spices!",
//     price: 16.5,
//     imageName: Image2,
//   },
//   {
//     id: "m3",
//     name: "Mutton Parota",
//     description: "Made of finest meat and healthy wheat!",
//     price: 12.99,
//     imageName: Image3,
//   },
//   {
//     id: "m4",
//     name: "Dosa",
//     description: "Healthy...and Tasty...",
//     price: 18.99,
//     imageName: Image4,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://custom-hooks-2-975aa-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      //imageName={meal.imageName}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
