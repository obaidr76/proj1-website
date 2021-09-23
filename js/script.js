

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



function sorttable() {
    var tablevalue, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    tablevalue = document.getElementById("group_table");

    switching = true;
    dir = "asc";
    while (switching) {

    switching = false;
    rows = tablevalue.getElementsByTagName("tr");


    for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[1];
        y = rows[i+1].getElementsByTagName("td")[1];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }