import * as THREE from 'https://cdn.skypack.dev/three';
import './solarsystem.css';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.webGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene,cam);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true} );
const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

animate();