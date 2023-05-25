import { EventEmitter } from "events";
import Experience from "./Experience.js";
import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const preloader = new Preloader();
});

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;

    this.loadingScreen = document.querySelector(".preloader");

      this.world.on("worldready", () => {
        this.hideLoadingScreen();
      });
  }

  hideLoadingScreen() {
    const timeline = gsap.timeline();
    timeline.to(".preloader", {
      opacity: 0,
      onComplete: () => {
        this.loadingScreen.classList.add("hidden");
      },
      duration: 0.2
    });
  }
}
