const { response } = require("express");

document.addEventListener('DOMContentLoaded', function(){
  fetch('http/localhost:3001/getAll')
  .then(response => response.json()
  .then(data => console.log(data));
  )
  loadData([]);
});


function loadData(data){
  const table = document.querySelector('table tbody');
  // let tableHtml = '';
  if(data.length === 0){
    // add a tr into table that will say no data if no data is found
    // also colspan=5 is to say no data over the whole length of the table
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
  }
}