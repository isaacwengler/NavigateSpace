import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

export function solarView(){


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    const controls = new OrbitControls( camera, renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 1500;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    //spheres
    const sunSphere = new THREE.SphereGeometry(65,15,15);
    const sunTexture = new THREE.TextureLoader().load("./Images/2k_sun.jpg");
    const sunMaterial = new THREE.MeshBasicMaterial( {map: sunTexture} );
    const sun = new THREE.Mesh(sunSphere,sunMaterial);


    const mercShpere = new THREE.SphereGeometry(6,15,15);
    mercShpere.translate(100,0,0)
    const mercTexture = new THREE.TextureLoader().load("./Images/mercuryUV.jpg")
    const mercMaterial = new THREE.MeshBasicMaterial({map: mercTexture})
    const mercury = new THREE.Mesh(mercShpere,mercMaterial);


    const venusSphere = new THREE.SphereGeometry(14,15,15);
    venusSphere.translate(140,0,0);
    const venusTexture = new THREE.TextureLoader().load("./Images/2k_venus_surface.jpg");
    const venusMaterial = new THREE.MeshBasicMaterial({map: venusTexture});
    const venus = new THREE.Mesh(venusSphere,venusMaterial);

    const earthSphere = new THREE.SphereGeometry(14.5,15,15);
    earthSphere.translate(195,0,0);
    const earthTexture = new THREE.TextureLoader().load("./Images/earthUV.jpeg");
    const earthMaterial = new THREE.MeshBasicMaterial({map: earthTexture});
    const earth = new THREE.Mesh(earthSphere,earthMaterial);

    const marsSphere = new THREE.SphereGeometry(8,15,15);
    marsSphere.translate(230,0,0);
    const marsTexture = new THREE.TextureLoader().load("./Images/2k_mars.jpg");
    const marsMaterial = new THREE.MeshBasicMaterial({map: marsTexture});
    const mars = new THREE.Mesh(marsSphere,marsMaterial);

    const jupSphere = new THREE.SphereGeometry(35,15,15);
    jupSphere.translate(300,0,0);
    const jupTexture = new THREE.TextureLoader().load("./Images/2k_jupiter.jpg");
    const jupMaterial = new THREE.MeshBasicMaterial({map: jupTexture});
    const jupiter = new THREE.Mesh(jupSphere,jupMaterial);

    const satSphere = new THREE.SphereGeometry(30,15,15);
    satSphere.translate(390,0,0);
    const satTexture = new THREE.TextureLoader().load("./Images/2k_saturn.jpg");
    const satMaterial = new THREE.MeshBasicMaterial({map: satTexture});
    const saturn = new THREE.Mesh(satSphere,satMaterial);

    const uranSphere = new THREE.SphereGeometry(17,15,15);
    uranSphere.translate(460,0,0);
    const uranTexture = new THREE.TextureLoader().load("./Images/2k_uranus.jpg");
    const uranMaterial = new THREE.MeshBasicMaterial({map: uranTexture});
    const uranus = new THREE.Mesh(uranSphere,uranMaterial);

    const nepSphere = new THREE.SphereGeometry(17,15,15);
    nepSphere.translate(520,0,0);
    const nepTexture = new THREE.TextureLoader().load("./Images/2k_neptune.jpg");
    const nepMaterial = new THREE.MeshBasicMaterial({map: nepTexture});
    const neptune = new THREE.Mesh(nepSphere,nepMaterial);

    const plutoSphere = new THREE.SphereGeometry(5,15,15);
    plutoSphere.translate(570,0,0);
    const plutoTexture = new THREE.TextureLoader().load("./Images/plutomap1k.jpg");
    const plutoMaterial = new THREE.MeshBasicMaterial({map: plutoTexture});
    const pluto = new THREE.Mesh(plutoSphere,plutoMaterial);

    //orbit rings
    const mercRingGeometry = new THREE.TorusGeometry(100,0.5,2.5,100);
    const mercRing = new THREE.Mesh(mercRingGeometry,mercMaterial);
    mercRing.rotation.set(1.57079575,0,0);
    scene.add(mercRing);

    const venusRingGeometry = new THREE.TorusGeometry(140,0.5,2.5,100);
    const venusRing = new THREE.Mesh(venusRingGeometry,venusMaterial);
    venusRing.rotation.set(1.57079575,0,0);
    scene.add(venusRing);

    

    scene.add(sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,pluto);

    camera.position.set(350,800,400);
    controls.update();

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene,camera);
    }


    // function createOrbits() {
    //     var orbitWidth = 0.01;
    // }

    animate();
}