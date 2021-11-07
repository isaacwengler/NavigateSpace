import { showGroundView } from "./views/groundView.js";
import {
  showPlanetView,
  changeCamera,
  goToPlanet,
} from "./views/planetView.js";
import { slipspace } from "./views/slipspace.js";
import { solarView, goToPlanet2 } from "./views/solarsystem.js";

// showPlanetView('pluto');
// slipspace();
// solarView();

//  Sources for Facts
//https://www.universetoday.com/33415/interesting-facts-about-the-planets/
//https://space-facts.com/planets/

let alertFunFacts = {
    'mercurySpace' : ["Mercury is the smallest planet in our solar system", "Because of its rotation and speed it circles the sun, on Mercury there are only 2 days in a year!" ],
    'mercuryGround' : ["Mercury is hot, but not too hot for ice!", "Mercury’s craters are named after famous artists, musicians and authors" ],
    'venusSpace' : ["Venus doesn’t have any moons, and we aren’t sure why.", "Venus spins slowly in the opposite direction of most planets " ],
    'venusGround' : ["Venus is the hottest planet in the solar system", "A day on Venus is longer than a year " ],
    'earthSpace' : ["You can see Earth’s magnetic field at work during light shows", "The earth’s molten iron core creates a magnetic field. " ],
    'earthGround' : [" Earth is the only planet we know of so far that’s inhabited by living things", "Three Quarters of the Earth is covered by water! " ],
    'marsSpace' : ["There have been more missions to mars than any other planet!", " You can jump three times higher on Mars than you can on Earth!" ],
    'marsGround' : ["Mars is a dusty, cold, desert world", " Mars Is the home of the largest volcano in the solar system, triple the height of mount Everest!" ],
    'jupiterSpace' : ["Jupiter has more than double the mass of all the other planets combined!", " Jupiter is a great comet catcher" ],
    'saturnSpace' : ["No one knows how old Saturn’s rings are", "Saturn is the lightest planet!" ],
    'uranusSpace' : ["Uranus is the coldest planet in the solar System ", "Uranus orbits lying on its side! " ],
    'neptuneSpace' : ["Neptune has supersonic winds", "It takes more than 4 hours for light to reach Neptune from the sun " ],
    'plutoSpace' : ["Pluto is not considered a planet, instead a dwarf planet.", " Pluto’s orbit sometimes brings it closer to the Sun than Neptune!" ],
    'plutoGround' : ["Pluto’s haze extends 1,000 miles from the surface", "There are Mountains on Pluto!" ],
    'moonSpace' : ["The moon helps stabilize our planet’s wobble and moderate our climate", "The Moon has a very thin atmosphere called an exosphere" ],
    'moonGround' : ["The Moons surface is actually dark.", "The moon has earthquakes, too" ],
    'solarSystem' : ["The solar system is 4.6 Billion years old","Light from the sun takes 8 minutes before it reaches earth","The solar system is 2 Light- years across"]
}
let factState = 'solarSystem';

let alertDiv = document.getElementById("alertCard");
// animation for alerts
const animation = (message, isError, time) => {
    alertDiv.classList.toggle("fadeout");
     setTimeout(()=>{
     alertDiv.classList.toggle("fadein");
     alertDiv.innerHTML = message;
     },500);
     
    }
    window.animation = animation;

function alertLoops(index){
    if (factState === 'travel') return;
    const messages = alertFunFacts[factState]
    if (index > messages.length) {
        index = 0;
    }
    setTimeout(() => {
        animation(messages[index], true, 5000);
        alertLoops(index + 1);
    }
    , 5000 );
}

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
const allowedPlanets = ["earth", "mercury", "venus", "mars", "moon", "pluto"];

window.onload = solarView();
alertLoops(0);
const changePlanet = (planet) => {
  if (currentPlanet === planet || animating) return;
  lastPlanet = currentPlanet;
  currentPlanet = planet;
  animating = true;
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      if (lastPlanet == "solar") {
        goToPlanet2();
      } else {
        changeCamera();
      }
    }, 20 * i);
  }
  setTimeout(() => {
    const menu = document.getElementById("planetControls");
    menu.hidden = true;
    slipspace();
  }, 800);
  setTimeout(() => {
    const menu = document.getElementById("planetControls");
    menu.hidden = false;
    showPlanetView(planet, false);
    animating = false;
    buttonAction(currentPlanet);
  }, 5000);
};
window.changePlanet = changePlanet;

const visitPlanet = () => {
  if (!allowedPlanets.includes(currentPlanet)) {
    // error
    return;
  }
  const menu = document.getElementById("planetControls");
  menu.hidden = true;
  for (let i = 0; i < 20; i++) {
    setTimeout(() => goToPlanet(), 40 * i);
  }
  setTimeout(() => {
    const menu2 = document.getElementById("planetControls2");
    menu2.hidden = false;
    showGroundView(currentPlanet);
  }, 800);
};
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
  if (currentPlanet === "solar" || animating) return;
  currentPlanet = "solar";
  animating = true;
  for (let i = 0; i < 40; i++) {
    setTimeout(() => changeCamera(), 20 * i);
  }
  setTimeout(() => {
      slipspace();
      const menu = document.getElementById("planetControls");
    menu.hidden = true;}
    , 800);
  setTimeout(() => {
    solarView();
    animating = false;
    buttonAction('solar');
    const menu = document.getElementById("planetControls");
    menu.hidden = true;
  }, 5000);
};
window.changeToSolar = changeToSolar;





