

function scrollbtn(clickedbtn){
    var btn = clickedbtn;
    if (btn == 'scroll_left'){
        document.getElementById('groupscroller').scrollLeft -= 100;
    }
    else{
        document.getElementById('groupscroller').scrollLeft += 100;
        //document.getElementById('groupscroller').animate({scrollLeftpx: "-= 100px"}, "slow");
    }
}


function filtertable(){
    var newinput = document.getElementById("inputtext");
    var filter = newinput.value.toUpperCase();

    var tablevalue = document.getElementById("group_table");
    var rows = tablevalue.getElementsByTagName("tr");
    var td,txtValue;


    for (i =1; i < rows.length; i++)
    {
        td = rows[i].getElementsByTagName("td")[1];
        
        txtValue = td.textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1)
        {   
            rows[i].style.display = "table";
        }
        else{            
            rows[i].style.display = "none";
        }        
    }
}


function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
const processChange = debounce(() => filtertable());






function sortTableByGroupName(table, column, asc = true) {
  // checking if asc or not
  const dirModifier = asc ? 1 : -1;
  // single tbody in case we have many tbody in a table
  const tBody = table.tBodies[0];
  // converts the data into arry form list
  const rows = Array.from(tBody.querySelectorAll("tr"));
  // sort each row
  console.log(rows);


  const sortedRows = rows.sort((a, b) => {
    const aColText = a.querySelectorAll("td")[1].textContent.trim();
    const bColText = b.querySelectorAll("td")[1].textContent.trim();
    // if td1 > td2 then multiply by 1 to dirModifier to remain as it is and if not then multiply by -1 for desending
    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  //   remove all the existing trs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  //   Now adding trs back in the table after sorting
  tBody.append(...sortedRows);

  table
  .querySelectorAll("th")
  .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
//   toggle between the sort classes
table.querySelector("th").classList.toggle("th-sort-asc", asc);
table.querySelector("th").classList.toggle("th-sort-desc", !asc);
}




let whichSort = document.getElementById("sorting");
// calling the function on click to trigger the sorting
whichSort.addEventListener("click", function () {
  // gets the element to check which class is implemented on it
  
  let tableElement = document.getElementById("group_table");

  let checkOrder = tableElement.getElementsByTagName("th")[0];
  let currentIsAscending = checkOrder.classList.contains("th-sort-asc");
  console.log(currentIsAscending);
  sortTableByGroupName(tableElement, 1, !currentIsAscending);

});


function toggleNavbar(){
    let checkClass = document.getElementById("side-navbar");
    console.log(checkClass);
    if (checkClass.className === "parent_side_navbar")
    {
        checkClass.className += "closeNavbar";
    }
    else
    {
        checkClass.className = "parent_side_navbar"; 
    } 
}
