

function scrollbtn(clickedbtn){
    let btn = clickedbtn;
    if (btn == 'scroll_left'){
        document.getElementById('groupscroller').scrollLeft -= 100;
    }
    else{
        document.getElementById('groupscroller').scrollLeft += 100;
        //document.getElementById('groupscroller').animate({scrollLeftpx: "-= 100px"}, "slow");
    }
}


function filtertable(){
    let newinput = document.getElementById("inputtext");
    let filter = newinput.value.toUpperCase();

    let tablevalue = document.getElementById("group_table");
    let rows = tablevalue.getElementsByTagName("tr");
    let td,txtValue;


    for (i = 1; i < rows.length; i++)
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
  sortTableByGroupName(tableElement, 1, !currentIsAscending);

});


function toggleNavbar(){
    let checkClass = document.getElementById("side-navbar");
    if (checkClass.className === "parent_side_navbar")
    {
        checkClass.className += "closeNavbar";
    }
    else
    {
        checkClass.className = "parent_side_navbar"; 
    } 
}


// pagination ///

//let tableElement = document.querySelector("group_table");
let tableElement = document.getElementById("group_table");
let tableBody = tableElement.tBodies[0];
let tr = Array.from(tableBody.querySelectorAll("tr"));
let ul = document.querySelector("ul");
var arrayTr = [];
for (let i = 0; i < tr.length; i++) {
  arrayTr.push(tr[i]);
}

let limit = 3;

function displayTable(limit) {
  tableBody.innerHTML = "";
  for (let i = 0; i < limit; i++) {
    tableBody.appendChild(arrayTr[i]);
  }
  buttonGereration(limit);
}

function buttonGereration(limit) {
  var noftr = arrayTr.length;
  if (noftr <= limit) {
    ul.style.display = "none";
  } else {
    ul.style.display = "flex";
    var nofPage = Math.ceil(noftr / limit);
    updatepage(1);     
    var updateflagpage=0;
    for (let i = 1; i <= nofPage; i++) {

      
      let li = document.createElement("li");
      li.className = "list";
      let a = document.createElement("a");
      a.href = "#";
      a.setAttribute("data-page", i);
      a.setAttribute("id", "datapage"+i);
      if (updateflagpage == 0){
        updateflagpage = 1;        
        a.setAttribute("class", "activepage");
      }
      li.appendChild(a);
      a.innerText = i;
      ul.insertBefore(li, ul.querySelector(".nextId"));
      ul.insertBefore(li, document.getElementById("tableList").childNodes[3]);

      a.onclick = (e) => {
        let x = e.target.getAttribute("data-page");
        updatepage(x);  
        tableBody.innerHTML = "";
        x--;
        let start = limit * x;
        let end = start + limit;
        let page = arrayTr.slice(start, end);

        for (let i = 0; i < page.length; i++) {
          let item = page[i];
          tableBody.appendChild(item);
        }
      };
    }
  }
  var z = 0, flag=0;
  function nextElement() {
    if (this.id == "nextId") {
      flag=1;
      console.log(z);
      z == arrayTr.length - limit ? (z = 0) : z/limit+1 == nofPage ? z : (z += limit);
      
      //console.log("next",z);
    }
    if (this.id == "prevId") {
      flag=1;
      console.log(z);
      z == 0 ? arrayTr.length - limit : (z -= limit);
      //console.log("prev", z);
    }
    updatepage(z/limit+1);  

    tableBody.innerHTML = "";
    for (let i = z; i < z+limit; i++) {
      if(arrayTr[i] != null){
        tableBody.appendChild(arrayTr[i]);
      }
      else{
        break;
      }
    }
  }

  document.getElementById("prevId").onclick = nextElement;
  document.getElementById("nextId").onclick = nextElement;
}

displayTable(3);

function selectall(source) {
  checkboxes = document.getElementsByName('cbox');
  for(var t=0, n=checkboxes.length;t<n;t++) {
    checkboxes[t].checked = source.checked;
  }
}

function onChangeGoToPage(go){
  var noftr = arrayTr.length;
  var nofPage = Math.ceil(noftr / limit);
  if(go <= nofPage && go >0){
    
    var goto = go - 1;    
    updatepage(go);  
    if(nofPage < goto){
      console.log("invalid go to");
      return;
    }
    let offset = (goto * limit);
    tableBody.innerHTML = "";
    for (let i = offset; i < (offset+limit); i++) {
      if(arrayTr[i] != null){
        tableBody.appendChild(arrayTr[i]);
      }
      else{
        break;
      }
    }
  }
}
const GoToPage = debounce((go) => onChangeGoToPage(go));

function updatepage(go){

  var spanvalue1 = document.getElementById("goto_lower");
  spanvalue1.textContent = (go*limit+1 - limit);
  
  var spanvalue2 = document.getElementById("goto_upper");
  spanvalue2.textContent = (go*limit);
  
  // var currentpageid = document.querySelectorAll('[id^="datapage"]');
  // let myArray = Array.from(currentpageid).reverse();
  // console.log(myArray[1].innerText);

  //currentpageid[go].classList.add("activepage");
}

