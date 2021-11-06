import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

class Planet {
    constructor(url, size) {
        this.url = url;
        this.size = size;
    }
}

const planetImages = {
    'earth': new Planet('./Images/earthUV.jpeg', 3),
    'mercury': new Planet('/Images/2k_mercury.jpg', 1.14),
    'venus': new Planet('Images/2k_venus_surface.jpg', 2.85),
    'moon': new Planet('Images/2k_moon.jpg', 0.81),
    'mars': new Planet('Images/2k_mars.jpg', 1.56),
    'jupiter': new Planet('Images/2k_jupiter.jpg', 6),
    'saturn': new Planet('Images/2k_saturn.jpg', 5.5),
    'neptune': new Planet('Images/2k_neptune.jpg', 4.5),
    'uranus': new Planet('Images/2k_uranus.jpg', 4.3),
    'sun': new Planet('Images/sunUV.jpg', 7),
    'pluto': new Planet('Images/plutomap1k.jpg', .5),
};

let camera;
let controls;
let currentPlanet;

export function showPlanetView(planet, isFromPlanet) {
    currentPlanet = planetImages[planet];
    const scene = new THREE.Scene();
    const background = new THREE.TextureLoader().load('Images/isaacbackground.png');
    scene.background = background;
    camera = new THREE.
        PerspectiveCamera(
            75,
            innerWidth / innerHeight,
            0.1,
            1000
        );

    const renderer = new THREE.WebGLRenderer(
        {
            antialias: true
        }
    );
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.parentNode.removeChild(canvas);
    }
    document.body.appendChild(renderer.domElement);

    // sphere
    const sphere = new THREE
        .Mesh(new THREE.SphereGeometry(currentPlanet.size, 50, 50),
        new THREE.MeshBasicMaterial({
            //color: 0xFF0000
            map: new THREE.TextureLoader().load(currentPlanet.url)
        })
    );


    scene.add(sphere);
    camera.position.z = isFromPlanet ? 15 : 100;
    controls = new OrbitControls(camera, renderer.domElement);

    function addStar() {
        const geometry = new THREE.SphereGeometry(0.1, 24, 24);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff})
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
        //if (x < 20 && y < 20 && z < 20) return;
        star.position.set(x, y, z);
        scene.add(star);
    }

    function animate() {
        requestAnimationFrame(animate);
        if (planet !== 'sun') {
            sphere.rotation.y += .005;
        }
        
        controls.update();
        renderer.render(scene, camera);
        
        
    }

    Array(200).fill().forEach(addStar);
    if (!isFromPlanet) {
        for (let i = 0; i < 175; i++) {
            setTimeout(() => camera.position.z -= .5, 5 * i + i);
        }
    }
    animate();
}

var angle = 0;

export function changeCamera() {
    // camera.position.x = radius * Math.cos( angle );  
    // camera.position.z = radius * Math.sin( angle );
    // camera.position.z = radius * Math.sin( angle );
    controls.target.set(angle,angle,angle);

    angle += 1;
}


export function goToPlanet() {
    camera.position.x = Math.min(Math.abs(camera.position.x + (15 - currentPlanet.size) / 30),Math.abs(camera.position.x -(15 - currentPlanet.size) / 30))
    camera.position.y = Math.min(Math.abs(camera.position.y + (15 - currentPlanet.size) / 30),Math.abs(camera.position.y -(15 - currentPlanet.size) / 30))
    camera.position.z = Math.min(Math.abs(camera.position.z + (15 - currentPlanet.size) / 30),Math.abs(camera.position.z -(15 - currentPlanet.size) / 30))
}