const addBtn = document.querySelector('.add-name-btn');
const table = document.querySelector('table tbody');


// function to get all data from database
function fetchData(){
  const URL = 'http://localhost:3001/api/getAll'
  fetch(URL)
  .then(response => response.json())
  .then(data => loadData(data['data']));
};

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


// function that will post name to database (POST)
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
    window.location.reload();
}




// // function that will 
// function insertRowIntoTable(data){
//     const table = document.querySelector('table tbody');
//     const isTableExist = table.querySelector('.no-data');

//     let tableHtml = "<tr>";

//     data.forEach(function ({id, name, date_added}){
//       tableHtml += `<td>${id}</td>`
//       tableHtml += `<td>${name}</td>`
//       tableHtml += `<td>${new Date(date_added).toISOString()}</td>`
//       tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`
//       tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`
//     })

//     tableHtml += "</tr>"


//     if(isTableExist){
//       table.innerHTML = tableHtml;
//     }else{
//       const newRow = table.insertRowIntoTable();
//       newRow.innerHTML = tableHtml;
//     }
//   }


// delete row data
function deleteSingleData(event){
  const e = event.target.className;
    if(e==="delete-row-btn"){
      
    }else{
      console.log('no');
    }
    event.preventDefault();
}



addBtn.addEventListener('click', addNameToDB);
table.addEventListener('click', deleteSingleData);
document.addEventListener('DOMContentLoaded', fetchData);
