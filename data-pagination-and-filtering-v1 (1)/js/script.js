/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
function filterResults(students) {
  // Get search query value
  const search = document.getElementById('search').value.toLowerCase();
  // Filter list by search query value
  return students.filter((student) => checkIfQueryInName(student,search));
}

function checkIfQueryInName(student,search) {
  return formatName(student.name).toLowerCase().indexOf(search) !== -1
              || student.email.toLowerCase().indexOf(search) !== -1;
}

function showThis(name) {
  document.getElementById('search').value = name;
  showPage(data,1);
}

function addAutoComplete(list) {
  const autocompleteContainer = document.getElementById('results');
  autocompleteContainer.innerHTML = '';
  list.forEach((el) => {

    autocompleteContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="autocomplete-item" onClick="showThis('${formatName(el.name)}')">
        <img src="${el.picture.thumbnail}" alt="${formatName(el.name)}" />
        <div class="info-container">
          <p>${formatName(el.name)}</p>
          <p>${el.email}</p>
        </div>
      </div>
    `
    );
  });
}

function formatName(name) {
  return `${name.title} ${name.first} ${name.last}`;
}

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
let searchBar = document.querySelector('.header');
let currentPage = 1;



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
// create two variables which will represent the index for the first and last student on the page

function createSearchField() {
  searchBar.insertAdjacentHTML(
    "beforeend",
    `
    <div class="search-bar">
      <label for="search" class="student-search">
        <span>Search by name</span>
        <input id="search" placeholder="Search by name...">
        <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
      <div id="results" class="autocomplete">
      </div>
    </div>
  `
  );
  const search = document.getElementById("search");
  search.addEventListener("input", _ => {
    filteredResults = showPage(data,currentPage).slice(0,5);
    const search = document.getElementById("search");
    if(search.value === '' || filteredResults.length === 0){
      document.getElementById('results').classList.remove('active');
    }
    else if(search.value !== '' && !document.getElementById('results').classList.contains('active'))
    {
      document.getElementById('results').classList.add('active');
    }
    // Add autocomplete
    addAutoComplete(filteredResults);
  });
  search.addEventListener("blur", _ => {
    setTimeout(_=>{
      document.getElementById('results').classList.remove('active');
    },400)
  });
 
}
createSearchField();

function showPage(list, page) {
  // Filter results
  const filteredLists = filterResults(list);
  // select the element with a class of `student-list` and assign it to a variable

  let ul = document.querySelector(".student-list");
  let noResults = document.querySelector(".no-results");
  // set the innerHTML property of the variable you just created to an empty string
  ul.innerHTML="";
  if(filteredLists.length === 0 && noResults.innerHTML === '') {
    noResults.insertAdjacentHTML('beforeend', `<div class="container"><div class="no-result"></div></div>`);
    return;
  }
  else {
    noResults.innerHTML = '';
  }
  // Add Pagination
  addPagination(filteredLists);
  const itemsPerpage = 9;
  const startIndex = (page*itemsPerpage)-itemsPerpage;
  const endIndex= page * itemsPerpage ;
 // loop over the length of the `list` parameter
 // inside the loop create a conditional to display the proper students
  for (let i=0; i <filteredLists.length ;i++){
    if(i >= startIndex && i < endIndex){
      // create the elements needed to display the student information
      let studentItem = `<li class="student-item cf">
      <div class="student-details">
      <img class="avatar" src="${filteredLists[i].picture.large}">
      <h3>${filteredLists[i].name.first} ${filteredLists[i].name.last}</h3>
      <span class="email">${filteredLists[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">${filteredLists[i].registered.date}</span>
      </div>`
       // insert the above elements
      ul.insertAdjacentHTML('beforeend', studentItem);
    };

  };

  return filteredLists;
};
 showPage(data, currentPage);





/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {

// create a variable to calculate the number of pages needed
   let numberOfItems = Math.ceil(list.length / 9);
// select the element with a class of `link-list` and assign it to a variable

  let linkList = document.querySelector('.link-list');
// set the innerHTML property of the variable you just created to an empty string
  linkList.innerHTML = '';
  // loop over the number of pages needed
  for (let i = 1; i <= numberOfItems; i++) {
     // create the elements needed to display the pagination button
    let button = `<li>
    <button type="button">${i}</button>
    </li>`;
    // insert the above elements
    linkList.insertAdjacentHTML('beforeend', button);
  };

  let buttonActive = document.querySelector('button');
  // give the first pagination button a class of "active"
  buttonActive.className = 'active';



// Call functions
// create an event listener on the `link-list` element
 linkList.addEventListener('click', event => {
   // if the click target is a button:
      if(event.target.tagName == 'BUTTON') {
        // remove the "active" class from the previous button
         document.querySelector('.active').className = '';
         event.target.className = 'active';
         currentPage = event.target.textContent;
         showPage(list, event.target.textContent);
      };
   });
};
