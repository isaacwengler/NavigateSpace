//import * as ground from '/views/groundView.js'
import { showPlanetView, changeCamera, goToPlanet } from '/views/planetView.js'
import { slipspace } from "./views/slipspace.js";
//import * as solar from '/views/solarsystem.js'

//showPlanetView('pluto');
//slipspace();

window.onload = showPlanetView('earth');



const changePlanet = (planet) => {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => changeCamera(), 20 * i);
    }
    setTimeout(() => slipspace(), 800);
    setTimeout(() => showPlanetView(planet), 5000);
}
window.changePlanet = changePlanet;

const visitPlanet = (current) => {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => goToPlanet(), 40 * i);
    }
}
window.visitPlanet = visitPlanet;