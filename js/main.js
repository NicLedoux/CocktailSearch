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
      document.querySelector("p").classList.remove("hidden");
      document.querySelector("h2").classList.remove("hidden");
      document.querySelector("img").classList.remove("hidden");
      document.querySelector("h3.ingredients").classList.remove("hidden");
      document.querySelector("h3.instructions").classList.remove("hidden");
      document.querySelector("iframe").classList.remove("hidden");
      document.getElementById("list").innerHTML = "";

      // document.getElementById("ingredientsList").remove();

      const drinkArr = data.drinks; //Sets the array from the drinks API
      //If statment. if there are no results (null), return search again message
      if (drinkArr === null) {
        document.querySelector("h2").style.fontSize = "28px";
        document.querySelector("h2").classList.remove("hidden");
        document.querySelector("h2").innerText =
          "Sorry, no cocktails found. Please try again.";
        document.querySelector("h3.ingredients").classList.add("hidden");
        document.querySelector("h3.instructions").classList.add("hidden");
        document.querySelector("h3.video").classList.add("hidden");
        document.querySelector("p").classList.add("hidden");
        document.querySelector("a").classList.add("hidden");
        document.querySelector("iframe").classList.add("hidden");
        document.querySelector("img").classList.add("hidden");
      } else {
        const firstDrink = data.drinks[0];
        console.log(firstDrink);
        const url = firstDrink.strVideo; //grabs the video link from array

        if (url == null) {
          iframe.classList.add("hidden"); //no video, hide iframe
          document.querySelector("h3.video").classList.add("hidden"); //no video, hide h3
          console.log("no video");
        } else {
          const embed = url.replace("watch?v=", "embed/"); //converts url to embed-able url
          console.log(`Embed URL Video Found at ${embed}`);
          //adds new embed url to iframe, removes hidden class
          document.querySelector("iframe").src = embed;
          document.querySelector("iframe").classList.remove("hidden");
          document.querySelector("h3.video").classList.remove("hidden");
        }

        //Adds data to DOM. drink name, image, instructions.
        document.querySelector("h2").innerText = data.drinks[0].strDrink;
        document.querySelector("img").src = data.drinks[0].strDrinkThumb;
        document.querySelector("p").innerText = data.drinks[0].strInstructions;

        let ingredientsList = [];
        for (let i = 1; i < 15; i++) {
          if (data.drinks[0]["strIngredient" + i] != null) {
            console.log(data.drinks[0]["strIngredient" + i]);
            ingredientsList.push(data.drinks[0]["strIngredient" + i]);
          }
        }

        let measuresList = [];
        for (let i = 1; i < 15; i++) {
          if (data.drinks[0]["strMeasure" + i] == undefined) {
            measuresList.push("");
          } else if (data.drinks[0]["strMeasure" + i] !== null) {
            console.log(data.drinks[0]["strMeasure" + i]);
            measuresList.push(data.drinks[0]["strMeasure" + i]);
          }
        }
        let fullList = [];
        const list = document.getElementById("list");
        const ul = document.createElement("ul");
        for (let i = 0; i <= ingredientsList.length - 1; i++) {
          if (ingredientsList != undefined) {
            ul.setAttribute("style", "padding: 0; margin: 0;");
            ul.setAttribute("id", "ingredientsList");
            fullList = measuresList[i] + ingredientsList[i];
            const li = document.createElement("li");
            li.innerHTML = fullList;
            li.setAttribute("style", "display: block;");
            ul.appendChild(li);
            list.appendChild(ul);
          }
        }
        console.log(fullList);
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
