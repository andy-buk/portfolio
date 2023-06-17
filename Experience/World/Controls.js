import * as THREE from "three";
import Experience from "../Experience.js";
import { gsap } from "gsap";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 969px)", () => {
      this.room.scale.set(0.5, 0.5, 0.5);
    });
    
    mm.add("(max-width: 968px)", () => {
      this.room.scale.set(0.35, 0.35, 0.35);
    });
  }

  resize() {

  }

  update() {

  }
}