import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // initially setting aspect ratio to 1

    camera.position.z = 1.5;

    const canvas = document.getElementById('contact3d');
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

    const size = Math.min(window.innerWidth / 2, window.innerHeight / 2);
    renderer.setSize(size, size); // set renderer size to be square

    const loader = new GLTFLoader();

    let model;
    let mixer;

    loader.load('models/stylized_planet.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });

    }, undefined, function (error) {
        console.error(error);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (mixer) {
            mixer.update(clock.getDelta());
        }

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        const size = Math.min(window.innerWidth / 2, window.innerHeight / 2);
        renderer.setSize(size, size); // adjust renderer size on window resize
        camera.aspect = 1; // adjust camera aspect ratio on window resize
        camera.updateProjectionMatrix();
    }
});
