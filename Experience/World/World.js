import * as THREE from "three";
import Experience from "../Experience.js";
import Room from "./Room.js"
import Floor from "./Floor.js"
import Controls from "./Controls.js"
import Environment from "./Environment.js";
import {EventEmitter} from "events";

export default class extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        
        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
            this.controls = new Controls();
            this.emit("worldready");
        });
    }


    resize() {

    }

    update() {
        if (this.room) {
            this.room.update();
        }
        if (this.controls) {
            this.controls.update();
        }
    }
}