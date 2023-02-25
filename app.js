// load data by name
const loadDataByName = (foodName) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("show-all").addEventListener("click", function () {
        if (data.meals.length < 7) {
          window.alert("No more food is available in this name!!!");
        }
        showData(data.meals);
      });
      showData(data.meals.slice(0, 6));
    })
    .catch((error) => {
      window.alert("No food available in this name!!");
    });
};

// show food data on card
const showData = (meals) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  meals.forEach((meal) => {
    console.log(meal);
    const foodDiv = document.createElement("div");
    foodDiv.innerHTML = `
    <div class="mx-auto bg-white border rounded-md shadow-md overflow-hidden md:flex">
    <div class="md:w-1/2">
      <img src=${meal.strMealThumb} alt="Product Image" class="w-full h-64 object-cover">
    </div>
    <div class="md:w-1/2 p-6">
      <h2 class="text-lg md:text-2xl font-bold mb-4">${meal.strMeal}</h2>
      <p class="text-gray-700 mb-10">There are many variations of passages of available, but the majority have suffered</p>
      <div class="text-center md:text-start">
      <label onclick="loadDetails(${meal.idMeal})" for="foodDetails" class="bg-amber-400  hover:bg-white text-black border hover:border-amber-400 font-bold py-2 px-4 rounded">View Details</label></div>
    </div>
  </div>
  
    `;
    foodContainer.appendChild(foodDiv);
  });
};

// get search input value and send value for search
document.getElementById("search-btn").addEventListener("click", function () {
  const searchInputField = document.getElementById("search-field");
  const searchValue = searchInputField.value;
  console.log(searchValue);
  searchInputField.value = "";
  loadDataByName(searchValue);
});

// load details of a food by id
const loadDetails = (mealId) => {
  const foodDetailsContainer = document.getElementById("food-details-container");
  foodDetailsContainer.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => showDetails(data.meals[0]));
};
// show details of a specific food by id
const showDetails = (meal) => {
  const instructionText = meal.strInstructions;
  var instruction = "";
  if (instructionText.length > 100) {
    const firstHalf = instructionText.substring(0, 100);
    const secondHalf = instructionText.substring(100, instructionText.length);
    var instruction = `<span>${firstHalf} <span id="see-more" onclick=getFullText() class="text-blue-600">...See more</span> <span id="more-text" class="hidden"><span>${secondHalf}</span><span id="see-less" onclick=hideSecondHalf() class="text-blue-600 ">...See less</span></span></span>`;
  } else {
    instruction = instructionText;
  }
  console.log(meal.strInstructions.length);
  const foodDetailsContainer = document.getElementById("food-details-container");
  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box", "space-y-2");
  modalBox.innerHTML = `
    <div class="flex justify-between mt-0 mb-4 pb-4 border-b-2">
                          <h3 class="text-2xl font-bold ">${meal.strMeal}</h3>
                          <label for="foodDetails" class=" text-2xl font-medium ">✕</label>
                      </div>
                      <img src=${meal.strMealThumb} alt="Product Image" class="w-full h-64 object-cover">
                      <h4 class="text-md"><span class="font-bold">Category:</span> ${meal.strCategory}</h4>
                      <h4 class="text-md"><span class="font-bold">Area:</span> ${meal.strArea}</h4>
                      <h4 id="instruction" class="text-md"><span class="font-bold">Instructions:</span> ${instruction}</h4>
                      <h4 class="text-md"><span class="font-bold">Youtube:</span> ${meal.strYoutube}</h4>
                      
                      <div class="text-right ">
                          <label for="foodDetails" class="btn bg-red-600 mt-2 w-1/4 px-10">close</label>
                      </div>
    `;

  foodDetailsContainer.appendChild(modalBox);
};
// get full text of instruction
const getFullText = () => {
  const moreText = document.getElementById("more-text");
  const seeMore = document.getElementById("see-more");
  seeMore.style.display = "none";
  moreText.style.display = "block";
};
// hide more than 100 character text
const hideSecondHalf = () => {
  const secondHalf = document.getElementById("more-text");
  const seeMore = document.getElementById("see-more");
  seeMore.style.display = "block";
  secondHalf.style.display = "none";
};

// initially call a function for load data by name
loadDataByName("chicken");
