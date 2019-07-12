window.onload = function () {
  if (localStorage.notes) {
    let notes = JSON.parse(localStorage.notes);
    for (i = 0; i < notes.length; i++) {
      new_stikr(notes[i]);
    }
  }

  document.querySelector("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    let fill = document.querySelector(".fill_sticker").value;
    let new_dte = document.querySelector(".new_date").value;

    if (
        fill.innerText != "" &&
        new_dte.match(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
      ) {
    
    let new_tme = document.querySelector(".new_time").value;
    let note = {
      text: fill,
      date: new_dte,
      time: new_tme,
    };
    new_stikr(note);
    addNoteToLocalStorage(note);
    document.querySelector("#error_alert").style = "display:none;";
  
  
  } else {
    document.querySelector("#error_alert").style = "display:block;";
  }


  });
}

function new_stikr(note) {
  let new_div_obj = document.createElement("div");
  new_div_obj.classList.add("col-md-3");
  new_div_obj.classList.add("note");
  new_div_obj.classList.add("stkr");

  let spn_obj = document.createElement("button");
  spn_obj.innerHTML = '<i class="fas fa-trash-alt"></i>';

  let fill = document.createElement("p");
  fill.classList.add("inpt_txt");
  fill.innerText = note.text;

  let new_dte = document.createElement("p");
  new_dte.classList.add("stkdte");
  new_dte.innerText = note.date;

  // if (
  //   fill.innerText != "" &&
  //   new_dte.innerHTML.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/i)
  // ) {
  let new_tme = document.createElement("p");
  new_tme.classList.add("stktme");
  new_tme.innerText = note.time;

  (new_div_obj.innerHTML = spn_obj.value),
    fill.value,
    new_dte.value,
    new_tme.value;
  document.querySelector("#stkrs").appendChild(new_div_obj);

  new_div_obj.appendChild(spn_obj);
  new_div_obj.appendChild(fill);
  new_div_obj.appendChild(new_dte);
  new_div_obj.appendChild(new_tme);

  

  // document.querySelector("#error_alert").style = "display:none;";
  // } else {
  //   document.querySelector("#error_alert").style = "display:block;";
  // }

  spn_obj.addEventListener("click", function () {
    const allStickers = document.querySelector("#stkrs");
    let index = Array.prototype.indexOf.call(allStickers.children, new_div_obj);

    deleteNoteFromLocalStorage(index);
    new_div_obj.classList.remove("visible");

    new_div_obj.addEventListener("transitionend", function (e) {
      allStickers.removeChild(new_div_obj);
    });

    // allStickers.removeChild(new_div_obj);
  });
  setTimeout(function () {
      new_div_obj.classList.add("visible");},100);
}
//
function addNoteToLocalStorage(note) {
  // Read notes from local storage
  let notes = [];
  if (localStorage.notes) {
    notes = JSON.parse(localStorage.notes);
  }
  // Add the new note
  notes.push(note);
  // Write back to local storage change notes to string and add to localstorage
  localStorage.notes = JSON.stringify(notes);
}

function deleteNoteFromLocalStorage(index) {
  // Read notes from local storage
  let notes = [];
  if (localStorage.notes) {
    notes = JSON.parse(localStorage.notes);
  }
  // Remove the note with the specified index
  notes.splice(index, 1);
  // Write back to local storage change notes to string and add to localstorage
  localStorage.notes = JSON.stringify(notes);
}
