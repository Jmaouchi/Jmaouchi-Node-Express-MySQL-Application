const addBtn = document.querySelector('.add-name-btn');
const table = document.querySelector('table tbody');
const updateDocument = document.querySelector('#update-row');
const updateDocumentInput = document.querySelector('#update-name-input');
const updateDocumentButton = document.querySelector('#update-row-btn')
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search_input');

// function to get all data from database
function fetchData(){
  const URL = 'http://localhost:3001/api/getAll'
  fetch(URL)
  .then(response => response.json())
  .then(data => loadData(data['data']));
};

// function that will post a name to the database (POST)
function addNameToDB(){
  const nameInput = document.querySelector('#name-input')
  const name = nameInput.value;
  // after we send the value into database, then empty the field
  nameInput.value = '';

 
  fetch('http://localhost:3001/api/insert', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({name: name})
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert('Error: ' + response.statusText);
    })
    loadUpdatedData()
}


// delete row or update name in a row 
function deleteOrUpdateSingleData(event){
  // get the className of the clicked element
  const e = event.target.className;
  // get the dataSet of the clicked element
  const datasetId = event.target.dataset;
    if(e==="delete-row-btn"){
      //  we will call this funcion and set a data-id attribute = to the id of the edit button, we this it will be easy to update the data by id
      deleteRowById(datasetId.id);
    }else if(e==="edit-row-btn"){
      //  we will call this funcion and set a data-id attribute = to the id of the edit button, we this it will be easy to update the data by id
      handleEditRow(datasetId.id)
    }

    event.preventDefault();
}


// this function will be called whenever a user try to delete a name
function deleteRowById(id){
  fetch('http://localhost:3001/api/delete/' + id,{
    method:'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      loadUpdatedData()
  });
}


// this function will be called whenever a user try to edit a name
function handleEditRow(id){
  updateDocument.hidden = false;
  // add an id into the button
  updateDocumentInput.dataset.id = id;
  console.log(updateDocumentButton.dataset.id);
}



// update a name
function updateName(){
  // we will get the data-id attribute that is on the input field
  idInput = updateDocumentInput.dataset.id

  fetch(`http://localhost:3001/api/update/` + idInput,{
    method:'PUT',
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      id: idInput,
      name: updateDocumentInput.value
    })
  })
  .then(response => response.json())
  .then(data => {
      loadUpdatedData()
  });
}



// find by name
function searchByName(){
  const searchInputValue = searchInput.value;
  fetch('http://localhost:3001/api/search/'+ searchInputValue)
  .then(response => response.json())
  .then(data => loadData(data['data']));
}

// function to display all data that we got back from out fetch (GET)
function loadData(data){
  const table = document.querySelector('table tbody');
  let tableHtml = '';
  if(data.length === 0){
    // add a tr into table that will say no data if no data is found
    // also colspan=5 is to say no data over the whole length of the table
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
  }else{
    console.log(data);
    // for(let i = 0; i<data.length ; i++){
    //   table.innerHTML = `<tr><td class='no-data' colspan='5'>${data[i].name}</td></tr>`;
    // }
    data.forEach(function({id, name, date_added }) {
      tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`
        tableHtml += `<td>${name}</td>`
        tableHtml += `<td>${new Date(date_added).toISOString()}</td>`
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`
      tableHtml += `</tr>`
    });

    table.innerHTML = tableHtml;
  }
}

// function that will load the data again after it is deleted or updated 
function loadUpdatedData(){
  const URL = 'http://localhost:3001/api/getAll'
  fetch(URL)
  .then(response => response.json())
  .then(data => loadData(data['data']));
}




addBtn.addEventListener('click', addNameToDB);
table.addEventListener('click', deleteOrUpdateSingleData);
updateDocumentButton.addEventListener('click', updateName);
searchBtn.addEventListener('click', searchByName);
document.addEventListener('DOMContentLoaded', fetchData);

