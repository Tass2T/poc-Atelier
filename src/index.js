import GUI from "lil-gui";
import * as THREE from "three";
import { Pearl } from "./Pearl";
import { config } from "../config";
import pearlFragment from "./shaders/pearlFragment.glsl";
import pearlVertex from "./shaders/pearlVertex.glsl";

export class App {
  constructor() {
    this.canvas = document.querySelector("#app");
    this.scene = new THREE.Scene();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setClearColor(config.MAIN_COLOR);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.set(-0.5, 0, 200);

    if (config.DEBOG_MODE) this.setDebug();

    this.pearlGeometry = new THREE.SphereGeometry(4, 10, 10);
    this.pearlShader = new THREE.ShaderMaterial({
      vertexShader: pearlVertex,
      fragmentShader: pearlFragment,
    });
    this.scrollY = 0;
    this.setPearls();
    this.setEvents();
    this.update();
  }

  setPearls = () => {
    if (this.pearls) {
      this.scene.remove(this.pearls);
      this.pearls.children.forEach((child) => {
        child.remove();
        this.pearls = null;
      });
    }
    this.pearls = new THREE.Group();

    for (let i = 0; i < config.PEARL_NUMBERS; i++) {
      this.pearls.add(new Pearl(this.pearlGeometry, this.pearlShader).instance);
    }

    this.scene.add(this.pearls);
  };

  handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  };

  handleScroll(e) {
    this.scrollY = window.scrollY;
    console.log(this.scrollY);
  }

  setEvents = () => {
    window.addEventListener("resize", () => this.handleResize());
    window.addEventListener("scroll", () => this.handleScroll());
  };

  setDebug() {
    this.gui = new GUI();
    this.gui
      .add(config, "PEARL_NUMBERS", 0, 10000, 5)
      .name("nb de perles")
      .onChange(this.setPearls);
    this.gui
      .add(config, "PEARL_RADIUS", 0, 2000, 10)
      .name("radius des perles")
      .onChange(this.setPearls);
    this.gui
      .add(config, "ROTATION_SPEED", 0, 0.00001, 0.000005)
      .name("vitesse rotation");
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.pearls.rotateY(config.ROTATION_SPEED * this.scrollY);
    this.renderer.render(this.scene, this.camera);
  };
}
