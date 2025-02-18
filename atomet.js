document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedId;
  let color;
  let active;
  let infoboks;

  // Hent JSON
  let jsondata = await fetch("info.json");
  let objekter = await jsondata.json();

  console.log(objekter);

  // 1. Load svg map
  //------------------------------------------------------------------------------------
  let mySvg = await fetch("atom.svg");
  let svg = await mySvg.text();

  document.querySelector("#map").innerHTML = svg;

  // 2. find infobokse og skjul dem
  //------------------------------------------------------------------------------

  // 3. Skift farve ved klik, og vis tekst
  //-----------------------------------------------------------------------
  document.querySelector("#map #poi").addEventListener("click", function (evt) {
    clicked(evt);
  });
  //function clicked
  //--------------------------------------------------------------------
  function clicked(obj) {
    document.querySelector("#info").style.visibility = "visible";
    objekter.forEach((objekt) => {
      // a. find det klikkede element
      //----------------------------------------------
      selected = obj.target;
      // b. find det klikkede elementets ID
      //---------------------------------------------
      selectedId = selected.getAttribute("id");

      // c. find  det klikkede elements fillfarve
      //---------------------------------------------
      color = selected.getAttribute("fill");

      // d. vis infobokse
      //--------------------------------------------

      if (selectedId === objekt.sted) {
        document.querySelector("#info p").textContent = objekt.tekst;
        document.querySelector("#info img").src = "/billeder/" + objekt.billede + ".jpeg";
        document.querySelector("#info").addEventListener("click", function () {
          document.querySelector("#info").style.visibility = "hidden";
          document.querySelector("#" + selectedId).setAttribute("fill", "#fbab37");
        });
      }
    });
    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------
    if (active != undefined) {
      active.setAttribute("fill", color);
    }

    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------
    active = selected;

    //skift farve på det valgte
    //-------------------------------------------------------------------------
    if (color === "#fbab37") {
      document.querySelector("#" + selectedId).setAttribute("fill", "#FFE995");
    }
    //reset farve og skjul tekst hvis valgt elementet allerede er aktivt
    //--------------------------------------------------------------------------
    else {
      document.querySelector("#" + selectedId).setAttribute("fill", "#FFE995");
    }
  }
}
