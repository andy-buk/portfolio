import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 1.5;

    const canvas = document.getElementById('contact3d');
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

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


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    }

    window.addEventListener('resize', onWindowResize);

    const clock = new THREE.Clock(); // for managing time

    function animate() {
        requestAnimationFrame(animate);

        // Run the animation mixer
        if (mixer) {
            mixer.update(clock.getDelta());
        }

        renderer.render(scene, camera);
    }
    animate();
});
