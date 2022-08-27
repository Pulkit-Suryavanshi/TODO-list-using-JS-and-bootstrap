addEventListener("DOMContentLoaded", function () {
  let retrievedTheme = localStorage.getItem("darkTheme");
  if (localStorage.getItem("darkTheme") != null) {
    let savedPreviousThemeState = JSON.parse(localStorage.getItem("darkTheme"))[
      "darkTheme"
    ];
    if (savedPreviousThemeState != 0) {
      //if 1 then dark
      console.log("retrievedObject: ", JSON.parse(retrievedTheme));
      DarkToggle(); //turn on the dark mode
      //now after this call the them will become 0 so change to 1
      let darkTheme = { darkTheme: 1 };
      localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
      document.getElementById("chk").checked = true;
    }
  }
  setStar(); //to set star using local storage
});
//window.onload = function() {
//JavaScript goes here
//}

function logClick() {
  let bttn = document.getElementById("chk");
  document.getElementById("chk").removeAttribute("checked");
  //bttn.checked = !bttn.checked;
  //let bttnVal=bttn.checked;
  console.log(bttn.checked);
  DarkToggle();
}

function DarkToggle() {
    //if dark toggle done first time then set the local storage to have darkTheme:1
    if (localStorage.getItem("darkTheme") == null) {
      let darkTheme = { darkTheme: 3 }; //set temporary number 3 for initialization
      localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
    }
    var element = document.body;
    var tableBody = document.getElementById("tableOfTask");
    element.classList.toggle("dark-mode");
    tableBody.classList.toggle("dark-mode-table");
    let themeNow = JSON.parse(localStorage.getItem("darkTheme"))[
      "darkTheme"
    ];
    if (themeNow == 3 || themeNow == 0) {
      let darkTheme = { darkTheme: 1 };
      localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
    } else if (themeNow == 1) {
      let darkTheme = { darkTheme: 0 };
      localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
    }
  }


  $(document).ready(function () {
    $(function () {
      $("#datepicker1").datepicker({
        minDate: 0,
        dateFormat: "dd-mm-yy",
        changeYear: true,
        onSelect: function (selected) {
          $("#datepicker2").datepicker("option", "minDate", selected);
        },
      });
      $("#datepicker2").datepicker({
        minDate: 0,
        dateFormat: "dd-mm-yy",
        changeYear: true,
        // onSelect: function(selected) {
        //     $("#datepicker1").datepicker("option","maxDate", selected)
        //     }
      });
    });
  });



  $(function () {
    $("#dialog-3").dialog({
      autoOpen: false,
      hide: "puff",
      show: "clip",
      height: 300,
      closeOnEscape: true,
      //following9 lines for having close button in 2nd modal
      // dialogClass: "no-close",
      buttons: [
        {
          text: "OK",
          click: function () {
            $(this).dialog("close");
          },
        },
      ],
    });
    $("#todaysTask").click(function () {
      $("#dialog-3").dialog("open");
    });
    /*$( "#opener-3" ).click(function() {
              $( "#dialog-3" ).dialog( "open" );
           });*/
  });
  $(function () {
    $("#dialog-4").dialog({
      //following9 lines for having close button in 2nd modal
      // dialogClass: "no-close",
      buttons: [
        {
          text: "OK",
          click: function () {
            $(this).dialog("close");
          },
        },
      ],
      closeOnEscape: true,
      autoOpen: false,
      hide: "clip",
      show: "slide",
      height: 300,
    });
    $("#starredTask").click(function () {
      $("#dialog-4").dialog("open");
    });
  });
  function starSound(elementIndex) {
    var audio = new Audio("starChecked.mp3");
    var audio2 = new Audio("starUnchecked.mp3");
    audio.oncanplay = function () {
      let id = ("st" + elementIndex).toString();
      if (document.getElementById(id).checked) this.play();
      else audio2.play();
    };
  }
  function myfunction(el) {    
            if (el.checked) {
            audio.load();
            }
          }
  //close modal on clicking outside
  // $('body').click(function (event)
  // {
  // if(!$(event.target).closest('#dialog-4').length && !$(event.target).is('#dialog-4') && !$(event.target).is('#starredTask')) {
  //     $("#dialog-4").hide();
  // }
  // });