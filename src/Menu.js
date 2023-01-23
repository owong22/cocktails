import { useState, useEffect } from "react";
import Loading from "./Loading";

const cocktailURL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

const Menu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cocktailData, setCocktailData] = useState([]);
  const [permanentList, setPermanentList] = useState([]);
  const [moreIngredients, setMoreIngredients] = useState(true);

  // Create a unique array of the cocktail categories
  let uniqueDrinkCategory = [
    ...new Set(permanentList.map((current) => current.strCategory)),
  ];

  // Get the cocktail data from a free API link
  const getCocktailData = async () => {
    setIsLoading(true);
    const response = await fetch(cocktailURL);
    const fetchedData = await response.json();
    setCocktailData(fetchedData.drinks);
    setPermanentList(fetchedData.drinks);
    setIsLoading(false);
  };

  // Filter function called when user clicks a button to filter by category. Passes in a new array of all the drinks that have the matching category
  const filterByCategory = (drinkCategory) => {
    if (drinkCategory == "All") {
      setCocktailData(permanentList);
      return;
    }
    const filteredList = permanentList.filter((current) => {
      return current.strCategory == drinkCategory;
    });
    setCocktailData(filteredList);
  };
  // Fetch the data on page load
  useEffect(() => {
    getCocktailData();
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <main>
      <section className="menu section">
        <div className="title ">
          <h3 className="box">Cocktails</h3>
        </div>
        <div className="btn-container">
          <button
            className="filter-btn"
            onClick={() => {
              filterByCategory("All");
            }}
          >
            All
          </button>
          {uniqueDrinkCategory.map((current, i) => {
            return (
              <button
                className="filter-btn"
                onClick={() => {
                  filterByCategory(current);
                }}
                key={i}
              >
                {current}
              </button>
            );
          })}
        </div>
        <div className="section-center">
          {cocktailData.map((currentCocktail) => {
            // Gets all the data to be displayed of the current cocktail
            const {
              idDrink,
              strDrink,
              strDrinkThumb,
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
              strIngredient6,
              strIngredient7,
              strCategory,
              strInstructions,
              strGlass,
            } = currentCocktail;

            return (
              <article key={idDrink} className="menu-item">
                <img src={strDrinkThumb} alt="" className="photo" />
                <div className="item-info">
                  <header>
                    <h3>{strDrink}</h3>
                  </header>

                  <p>
                    {strIngredient1 // Will keep displaying the next ingredient if it exists.
                      ? //If the ingredient does't exist, it will set moreIngredients to false to stop displaying any undefined value.
                        strIngredient1
                      : moreIngredients
                      ? setMoreIngredients(false)
                      : ""}
                  </p>
                  <p>
                    {strIngredient2
                      ? strIngredient2
                      : moreIngredients
                      ? setMoreIngredients(false)
                      : ""}
                  </p>
                  <p>
                    {strIngredient3
                      ? strIngredient3
                      : moreIngredients
                      ? setMoreIngredients(false)
                      : ""}
                  </p>
                  <p>
                    {strIngredient4
                      ? strIngredient4
                      : moreIngredients
                      ? setMoreIngredients(false)
                      : ""}
                  </p>
                  <p>
                    {strIngredient5
                      ? strIngredient5
                      : moreIngredients
                      ? setMoreIngredients(false)
                      : ""}
                  </p>
                  <p>
                    {strIngredient6
                      ? strIngredient6
                      : moreIngredients
                      ? setMoreIngredients(false)
                      : ""}
                  </p>
                  <p>
                    {strIngredient7
                      ? strIngredient7
                      : moreIngredients
                      ? setMoreIngredients(false)
                      : ""}
                  </p>
                  <p>{strGlass}</p>
                  <p>{strInstructions}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Menu;
