import { showGroundView } from '/views/groundView.js'
import { showPlanetView, changeCamera, goToPlanet } from '/views/planetView.js'
import { slipspace } from "./views/slipspace.js";
//import * as solar from '/views/solarsystem.js'

//showPlanetView('pluto');
//slipspace();

function buttonAction(buttonSelected) {
    let oldButton = document.getElementsByClassName("btn");
      Array.prototype.forEach.call(oldButton, function(el) {
        el.setAttribute("class", "btn btn-outline-light");
      });
     
     let button = document.getElementById(buttonSelected);
     button.setAttribute("class", "btn btn-light");

}

let currentPlanet = 'earth';

window.onload = showPlanetView(currentPlanet, true);


const changePlanet = (planet) => {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => changeCamera(), 20 * i);
    }
    setTimeout(() => slipspace(), 800);
    setTimeout(() => showPlanetView(planet, false), 5000);
}
window.changePlanet = changePlanet;

const visitPlanet = () => {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => goToPlanet(), 40 * i);
    };
    setTimeout(() => showGroundView(currentPlanet), 800);
}
window.visitPlanet = visitPlanet;

const backToOrbit = () => {
    showPlanetView(currentPlanet);
}
window.backToOrbit = backToOrbit;

