import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

export function showPlanetView(planet) {
    const scene = new THREE.Scene();
    const camera = new THREE.
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
    document.body.innerHTML = ""
    document.body.appendChild(renderer.domElement);

    // sphere
    const sphere = new THREE
        .Mesh(new THREE.SphereGeometry(3, 50, 50),
        new THREE.MeshBasicMaterial({
            //color: 0xFF0000
            map: new THREE.TextureLoader().load('./Images/earthUV.jpeg')
        })
    );


    scene.add(sphere);
    camera.position.z = 15;
    const controls = new OrbitControls(camera, renderer.domElement);

    function addStar() {
        const geometry = new THREE.SphereGeometry(0.1, 24, 24);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff})
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
        //if (x < 20 && y < 20 && z < 20) return;
        star.position.set(x, y, z);
        scene.add(star);
    }

    // const background = new THREE.TextureLoader().load('./views/assets/background.png');
    // scene.background = background;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += .005;
        controls.update();
        renderer.render(scene, camera);
    }

    Array(400).fill().forEach(addStar);
    animate();
}


