import { showGroundView } from "./views/groundView.js";
import {
  showPlanetView,
  changeCamera,
  goToPlanet,
} from "./views/planetView.js";
import { slipspace } from "./views/slipspace.js";
import { solarView, goToPlanet2 } from '/views/solarsystem.js'

// showPlanetView('pluto');
// slipspace();
// solarView();

function buttonAction(buttonSelected) {
  let oldButton = document.getElementsByClassName("btn");
  Array.prototype.forEach.call(oldButton, function (el) {
    el.setAttribute("class", "btn btn-outline-light");
  });

  let button = document.getElementById(buttonSelected);
  button.setAttribute("class", "btn btn-light");
}

let currentPlanet = "solar";
let lastPlanet = "";
let animating = false;
const allowedPlanets = ['earth', 'mercury', 'venus', 'mars', 'moon', 'pluto'];

window.onload = solarView();

const changePlanet = (planet) => {
  if (currentPlanet === planet || animating) return;
  lastPlanet = currentPlanet;
  currentPlanet = planet;
  animating = true;
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      if (lastPlanet == 'solar') {
        goToPlanet2();
      } else {
        changeCamera();
      }
     }, 20 * i);
  }
  setTimeout(() => slipspace(), 800);
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

const changeToSolar = () => {
  if (currentPlanet === 'solar' || animating) return;
  currentPlanet = 'solar';
  animating = true;
  for (let i = 0; i < 40; i++) {
    setTimeout(() => changeCamera(), 20 * i);
  }
  setTimeout(() => slipspace(), 800);
  setTimeout(() => {
    solarView();
    animating = false;
  }, 5000);
}
window.changeToSolar = changeToSolar;
