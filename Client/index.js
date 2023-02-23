const addBtn = document.querySelector('.add-name-btn');


function fetchData(){
  const URL = 'http://localhost:3001/api/getAll'
  fetch(URL)
  .then(response => response.json())
  .then(data => loadData(data['data']));
};


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
        tableHtml += `<td>${date_added }</td>`
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`
      tableHtml += `</tr>`
    });

    table.innerHTML = tableHtml;
  }
}

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
}



function insertRowIntoTable(data){

}



addBtn.addEventListener('click', addNameToDB);
document.addEventListener('DOMContentLoaded', fetchData());