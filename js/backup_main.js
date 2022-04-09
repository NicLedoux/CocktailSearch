//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector("button").addEventListener("click", getDrink); //run function getDrink when button is clicked
const input = document.getElementById("cocktailSearch");
const iframe = document.querySelector("iframe");

//Press enter to searhc instead of clicking button
input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getDrink();
  }
});

//The Main Event

function getDrink() {
  let search = document.querySelector("#cocktailSearch").value;
  const drink = search.replace(/ /g, "%20");
  // const iframe = document.querySelector("iframe");

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      /*This removes hidden classes from DOM tags. It helps if someone searches for a new
      cocktail after already receiving search results */
      document.querySelector("h3").classList.remove("hidden");
      document.querySelector("a").classList.remove("hidden");
      document.querySelector("img").classList.remove("hidden");
      document.querySelector("iframe").classList.remove("hidden");
      document.getElementById("list").innerHTML = "";
      const drinkArr = data.drinks; //Sets the array from the drinks API
      if (drinkArr === null) {
        document.querySelector("h2").classList.remove("hidden");
        document.querySelector("h2").innerText =
          "Sorry, no cocktails found. Please try again.";
        document.querySelector("h3").classList.add("hidden");
        document.querySelector("a").classList.add("hidden");
        document.querySelector("iframe").classList.add("hidden");
        document.querySelector("img").classList.add("hidden");
      } else {
        console.log(data.drinks);
        const url = data.drinks[0].strVideo;
        console.log(url);
        if (url == null) {
          iframe.classList.add("hidden");
          console.log("no video");
        } else {
          const embed = url.replace("watch?v=", "embed/");
          console.log(`video found at ${embed}`);
          document.querySelector("iframe").src = embed;
        }
        document.querySelector("img").src = data.message;
        document.querySelector("h2").innerText = data.drinks[0].strDrink;
        document.querySelector("img").src = data.drinks[0].strDrinkThumb;
        document.querySelector("h3").innerText = data.drinks[0].strInstructions;
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
