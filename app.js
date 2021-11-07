import { showGroundView } from "./views/groundView.js";
import {
  showPlanetView,
  changeCamera,
  goToPlanet,
} from "./views/planetView.js";
import { slipspace } from "./views/slipspace.js";
//import * as solar from '/views/solarsystem.js'

//showPlanetView('pluto');
//slipspace();

function buttonAction(buttonSelected) {
  let oldButton = document.getElementsByClassName("btn");
  Array.prototype.forEach.call(oldButton, function (el) {
    el.setAttribute("class", "btn btn-outline-light");
  });

  let button = document.getElementById(buttonSelected);
  button.setAttribute("class", "btn btn-light");
}

let currentPlanet = "earth";
let animating = false;
const allowedPlanets = ['earth', 'mercury', 'venus', 'mars', 'moon', 'pluto'];

window.onload = showPlanetView(currentPlanet, true);

const changePlanet = (planet) => {
  if (currentPlanet === planet || animating) return;
  currentPlanet = planet;
  animating = true;
  for (let i = 0; i < 40; i++) {
    setTimeout(() => changeCamera(), 20 * i);
  }
  setTimeout(() => slipspace(), 800);
  console.log(planet);
  setTimeout(() => {
    showPlanetView(planet, false);
    animating = false;
  }, 5000);
};
window.changePlanet = changePlanet;

const visitPlanet = () => {
    if (!allowedPlanets.includes(currentPlanet)) {
        // error
        return;
    }
    const menu = document.getElementById('planetControls');
    menu.hidden = true;
    for (let i = 0; i < 20; i++) {
        setTimeout(() => goToPlanet(), 40 * i);
    };
    setTimeout(() => {
        const menu2 = document.getElementById('planetControls2');
        menu2.hidden = false;
        showGroundView(currentPlanet);
    }, 800);
}
window.visitPlanet = visitPlanet;

const backToOrbit = () => {
  const menu = document.getElementById("planetControls");
  menu.hidden = false;
  const menu2 = document.getElementById("planetControls2");
  menu2.hidden = true;
  showPlanetView(currentPlanet, true);
};
window.backToOrbit = backToOrbit;

const animation = () => {
 let alertDiv = document.getElementById("alertCard");

 alertDiv.classList.toggle("fadein");
 alertDiv.classList.toggle("fadeout");
 
}
window.animation = animation;

