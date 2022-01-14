/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

function createSearchField() {
  let header = document.querySelector("header");

}
createSearchField();

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
let searchBar = document.querySelector('.header');



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
// create two variables which will represent the index for the first and last student on the page

function showPage(list, page) {

  const itemsPerpage = 9;
  const startIndex = (page*itemsPerpage)-itemsPerpage;
  const endIndex= page * itemsPerpage ;
  // select the element with a class of `student-list` and assign it to a variable

  let ul = document.querySelector(".student-list");
  // set the innerHTML property of the variable you just created to an empty string
  ul.innerHTML="";
 // loop over the length of the `list` parameter
  for (let i=0; i <list.length ;i++){
// inside the loop create a conditional to display the proper students
    if(i >= startIndex && i < endIndex){
      // create the elements needed to display the student information
      let studentItem = `<li class="student-item cf">
      <div class="student-details">
      <img class="avatar" src="${data[i].picture.large}">
      <h3>${data[i].name.first} ${data[i].name.last}</h3>
      <span class="email">${data[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">${data[i].registered.date}</span>
      </div>`
       // insert the above elements
      ul.insertAdjacentHTML('beforeend', studentItem);
    };

  };

};
 showPage(data, 1);





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
         showPage(list, event.target.textContent);
      };
   });
};
addPagination(data);
