import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
const controls = new OrbitControls( camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.innerHTML = ""
document.body.appendChild(renderer.domElement);

//spheres
const sunSphere = new THREE.SphereGeometry(15,15,15);
const sunTexture = new THREE.TextureLoader().load("./Images/sunUV.jpg");
const sunMaterial = new THREE.MeshBasicMaterial( {map: sunTexture} );
const sun = new THREE.Mesh(sunSphere,sunMaterial);

const mercShpere = new THREE.SphereGeometry(15,15,15);
mercShpere.translate(35,0,0)
const mercTexture = new THREE.TextureLoader().load("./Images/mercuryUV.jpg")
const mercMaterial = new THREE.MeshBasicMaterial({map: mercTexture})
const mercury = new THREE.Mesh(mercShpere,mercMaterial);

scene.add(sun,mercury);

camera.position.set(10,40,200);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

animate();