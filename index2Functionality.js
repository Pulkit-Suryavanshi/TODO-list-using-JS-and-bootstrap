function getAndUpdate() {
  // console.log("Updating List...");
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;
  from = document.getElementById("datepicker1").value;
  to = document.getElementById("datepicker2").value;
  if (tit && desc != "") {
    //check if title or description not entered
    if (localStorage.getItem("itemsJson") == null) {
      itemJsonArray = [];
      itemJsonArray.push([tit, desc, from, to]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
      itemJsonArrayStr = localStorage.getItem("itemsJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
      itemJsonArray.push([tit, desc, from, to]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    update(); //update local storage
    setStar(); //set the stars after updating
    resetMinMaxDatePicker();
  } else {
    alert("Please enter a Title and Description");
  }
}
function resetMinMaxDatePicker() {
  $("#datepicker1").datepicker("option", "maxDate", null);
  $("#datepicker2").datepicker("option", "minDate", null);
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  // Populate the table
  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
                    <tr>
                    <td class="important" scope="row" style="padding: unset;padding-right: 1.5rem;padding-top: 0.2rem;">
                        <input class="starTask starTaskGet starTaskSave" type="checkbox" id="st${index}" value="1"  onchange="starSound(${index})" onclick="saveStar(${index})"/>
                        <label class="starTask" for="st${index}"></label>
                    </td>
                    <td class="th" scope="row">${index + 1}</td>
                    <td class="th titleName">${element[0]}</td>
                    <td class="th descName">${element[1]}</td>
                    <td class="th fromDate">${element[2]}</td>
                    <td class="th toDate">${element[3]}</td> 
                    <td class="th">
                        <button class="btn btn-sm btn-primary" title="Edit Description" onclick="edited(${index})">Edit</button>
                    </td> 
                    <td class="th">
                        <button class="btn btn-sm btn-primary" title="Delete This Task" onclick="deleted(${index})">Delete</button>
                    </td>
                    <td class="th" style="text-align:center;">
                        <input class="form-check-input taskDone" type="checkbox" style="position:relative;" value="" onclick="taskDone(${index})">
                    </td>
                    <td class="th" style="text-align:center;">
                        <button class="taskListen" type="button" style="position:relative;" onclick="taskListen(${index})">Speak</button>
                    </td>
                    </tr>`; //checkbox for text-decoration: line-through;
  });
  //<td><button class="btn btn-sm btn-primary" onclick="edited(${index})">Edit</button></td>
  tableBody.innerHTML = str;
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("datepicker1").value = "";
  document.getElementById("datepicker2").value = "";
  //code to clear after title ad description are submitted
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {
  // console.log("Delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  // Delete itemIndex element from the array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  //deleted items star index to be removed
  itemJsonArrayStr = localStorage.getItem("indexToStarJson");
  indexToStar = JSON.parse(itemJsonArrayStr);
  indexToStar.splice(itemIndex - 1, 1); //removing index-1
  // console.log(indexToStar);
  localStorage.setItem("indexToStarJson", JSON.stringify(indexToStar));

  update(); //update the list
  setStar(); //set star after delete
}
function edited(itemIndex) {
  tableListTitles = document.getElementsByClassName("titleName");
  title = tableListTitles[itemIndex];
  promptDefaultTitleText = title.innerText;
  tableListDesc = document.getElementsByClassName("descName");
  descri = tableListDesc[itemIndex];
  promptDefaultDescriptionText = descri.innerText;
  //console.log(promtDefaultDescriptionText);
  let newDescription = prompt(
    "You can ONLY Edit the description of: " + promptDefaultTitleText,
    promptDefaultDescriptionText
  );
  if (
    newDescription != "" &&
    newDescription != null &&
    newDescription != "null"
  ) {
    //if(newDescription != null){alert(newDescription);}
    //JSON.parse(itemJsonArrayStr)[itemIndex][1]=newDescription; //for changing the localstorage
    retrievedItemsJson = localStorage.getItem("itemsJson");
    arraysOfItems = JSON.parse(retrievedItemsJson);
    arraysOfItems[itemIndex][1] = newDescription; //points to the description of this index items and sets new
    const newArraysOfItems = JSON.stringify(arraysOfItems); // getting the whole itemsJson and stringify for read
    localStorage.setItem("itemsJson", newArraysOfItems);
    update(); //calling the update function
  } else {
    alert("Nothing Changed!");
  }
}
function taskDone(itemIndex) {
  checkboxVal = document.getElementsByClassName("taskDone");
  checkboxIndex = checkboxVal[itemIndex];
  tableListTitles = document.getElementsByClassName("titleName");
  tableListDesc = document.getElementsByClassName("descName");
  tableListFromDate = document.getElementsByClassName("fromDate");
  tableListToDate = document.getElementsByClassName("toDate");
  titles = tableListTitles[itemIndex];
  descri = tableListDesc[itemIndex];
  FromDateIndex = tableListFromDate[itemIndex];
  ToDateIndex = tableListToDate[itemIndex];
  if (checkboxIndex.checked) {
    titles.style.textDecoration = "line-through";
    titles.style.backgroundColor = "red";
    descri.style.textDecoration = "line-through";
    descri.style.backgroundColor = "red";
    FromDateIndex.style.textDecoration = "line-through";
    ToDateIndex.style.textDecoration = "line-through";
  } else {
    //setting background color on task done checked
    let savedPreviousThemeState = JSON.parse(localStorage.getItem("darkTheme"))[
      "darkTheme"
    ];
    if (savedPreviousThemeState == 1) {
      bckCOLOR = "black";
    } else {
      bckCOLOR = "white";
    }
    titles.style.textDecoration = "None";
    titles.style.backgroundColor = bckCOLOR;
    descri.style.textDecoration = "None";
    descri.style.backgroundColor = bckCOLOR;
    FromDateIndex.style.textDecoration = "None";
    ToDateIndex.style.textDecoration = "None";
  }
}
function GetStarredTask() {
  listCount = 0;
  let listStarredTaskAll = document.getElementsByClassName("starTaskGet");
  //console.log(starredTask[0].checked);
  let modalStarredTask = document.getElementById("dialog-4");
  modalStarredTask.innerHTML =
    "<strong>Starred Items Summary:</strong><br><ol>";
  for (let i = 0; i < listStarredTaskAll.length; i++) {
    if (listStarredTaskAll[i].checked) {
      listCount += 1;
      modalStarredTask.innerHTML +=
        "<li><strong>" +
        document.getElementsByClassName("titleName")[i].innerHTML +
        "</strong>:" +
        document.getElementsByClassName("descName")[i].innerHTML +
        "</li><br/>";
    }
  }
  modalStarredTask.innerHTML += "</ol>";
  if (listCount == 0) {
    modalStarredTask.innerHTML =
      "<strong>No </strong>⭐Starred task in list.<br/>This means you have either done it all! Or you're not being productive! 😂👌";
  }
}
function GettodaysTasks() {
  let listCountDate = 0;

  //todays date:
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "/" + mm + "/" + dd;
  // console.log(today);
  dateToday = new Date(today);

  let listfromDate = document.getElementsByClassName("fromDate");
  let modalTodaysTask = document.getElementById("dialog-3");
  modalTodaysTask.innerHTML = "<strong>Today's Tasks Summary:</strong><br><ol>";
  for (let i = 0; i < listfromDate.length; i++) {
    fromDate = listfromDate[i].innerHTML;
    ("16-02-2022");
    d = fromDate.slice(0, 2);
    m = fromDate.slice(3, 5);
    y = fromDate.slice(6);
    frmDate = new Date(y + "/" + m + "/" + d);
    if (
      frmDate != "" &&
      frmDate != null &&
      frmDate != "//" &&
      frmDate <= dateToday
    ) {
      listCountDate += 1;
      modalTodaysTask.innerHTML +=
        "<strong>" +
        listCountDate +
        ". " +
        document.getElementsByClassName("titleName")[i].innerHTML +
        "</strong>:" +
        document.getElementsByClassName("descName")[i].innerHTML +
        "<br/>";
    }
  }
  modalTodaysTask.innerHTML += "</ol>";
  if (listCountDate == 0) {
    modalTodaysTask.innerHTML =
      "<strong>No tasks for today.<br/>Take some time off.";
  }
}

function saveStar(starIndex) {
  if (localStorage.getItem("indexToStarJson") == null) {
    indexToStar = [];
  } else {
    itemJsonArrayStr = localStorage.getItem("indexToStarJson");
    indexToStar = JSON.parse(itemJsonArrayStr);
  }
  if (indexToStar.includes(starIndex)) {
    indexToStar = indexToStar.filter((item) => item !== starIndex);
    // console.log(indexToStar);
  } else {
    indexToStar.push(starIndex);
    // console.log(indexToStar);
  }
  //save this indexToStar in local storage
  localStorage.setItem("indexToStarJson", JSON.stringify(indexToStar));
}
//function to set star on reload saving
function setStar() {
  if (localStorage.getItem("indexToStarJson") != null) {
    itemJsonArrayStr = localStorage.getItem("indexToStarJson");
    indexToStar = JSON.parse(itemJsonArrayStr);
    let starringList = document.getElementsByClassName("starTaskSave");
    for (let i = 0; i <= starringList.length; i++) {
      if (itemJsonArrayStr.includes(i)) {
        starringList[i].checked = true;
      }
    }
  }
}
//function to save taskDone
// function saveTaskDone(starIndex){
//     if (localStorage.getItem('indexToStarJson')==null){
//         indexToStar = [];
//     }
//     else{
//         itemJsonArrayStr = localStorage.getItem('indexToStarJson');
//         indexToStar = JSON.parse(itemJsonArrayStr);
//     }
//     if(indexToStar.includes(starIndex)){indexToStar = indexToStar.filter(item => item !== starIndex);console.log(indexToStar);}
//     else{indexToStar.push(starIndex);console.log(indexToStar);}
//     //save this indexToStar in local storage
//     localStorage.setItem('indexToStarJson', JSON.stringify(indexToStar));

// }

//function to set taskDone
// function settaskDone(){
//     if (localStorage.getItem('indexToStarJson')!=null){
//         itemJsonArrayStr = localStorage.getItem('indexToStarJson');
//         indexToStar = JSON.parse(itemJsonArrayStr);
//         let starringList=document.getElementsByClassName("starTaskSave");
//         for(let i=0;i<=starringList.length;i++){
//             if(itemJsonArrayStr.includes(i)){
//             starringList[i].checked=true;}
//         }
//     }
// }

//             h1 {
//     font-size: 1rem;
// }

// @media (min-width: 400px) {
//     h1 {
//         font-size: 1.3rem;
//     }
// }

// @media (min-width: 600px) {
//     h1 {
//         font-size: 1.6rem;
//     }
// }

// @media (min-width: 800px) {
//     h1 {
//         font-size: 1.9rem;
//     }
// }

// @media (min-width: 1000px) {
//     h1 {
//         font-size: 2.2rem;
//     }
// }

function clearStorage() {
  if (confirm("Do you areally want to clear the list?")) {
    //console.log('Clearing the storage')
    localStorage.removeItem("itemsJson"); //removing list
    localStorage.removeItem("indexToStarJson"); //removing star
    //localStorage.clear(); //clearing entire storage
    update();
  }
}

function taskListen(listenIndex){
  tableListTitles = document.getElementsByClassName("titleName");
  tableListDesc = document.getElementsByClassName("descName");
  titles = tableListTitles[listenIndex].innerHTML;
  descri = tableListDesc[listenIndex].innerHTML;
  console.log(titles,descri);
  const text=`Item title is ${titles} , and the item description is ${descri}`;
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.pitch=1;
  window.speechSynthesis.speak(utterance);
}