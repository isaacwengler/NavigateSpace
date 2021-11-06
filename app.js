import { showGroundView } from '/views/groundView.js'
import { showPlanetView, changeCamera, goToPlanet } from '/views/planetView.js'
import { slipspace, arrive, incSphere } from "./views/slipspace.js";
//import * as solar from '/views/solarsystem.js'

//showPlanetView('pluto');
//slipspace();
let currentPlanet = 'earth';

window.onload = showPlanetView(currentPlanet);


const changePlanet = (planet) => {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => changeCamera(), 20 * i);
    }
    setTimeout(() => slipspace(), 800);
    setTimeout(() => arrive(), 4800);
    setTimeout(() => showPlanetView(planet), 5000);
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

