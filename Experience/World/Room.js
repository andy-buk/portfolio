import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;  
        
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
          };
        
        this.setModel();
        // this.setAnimation();
        this.onMouseMove();
    }

    setModel() {

        this.actualRoom.traverse((child) => {
            if (child.isMesh) {
                child.material.map = this.resources.items.screen;
                
                child.material.needsUpdate = true;
                child.castShadow = true;
                child.receiveShadow = true;
            } else if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    if (groupChild.isMesh) {
                        groupChild.material.map = this.resources.items.screen;
                        groupChild.material.needsUpdate = true;
                    }
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
            }
        });
    
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.5, 0.5, 0.5);
    }
    

    // setAnimation() {
    //     this.mixer = new THREE.AnimationMixer(this.actualRoom);

    //     // fix the animation number in the future
    //     this.chair = this.mixer.clipAction(this.room.animations[7]);
    //     this.chair.play();
    // }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}