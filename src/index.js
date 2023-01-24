import * as THREE from "three";

export class App {
  constructor() {
    this.canvas = document.querySelector("#app");
    this.scene = new THREE.Scene();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setClearColor("#031E41");
    this.setRendererSize();
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.x = 30;

    this.update();
  }

  setRendererSize = () => {
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  };

  setEvents = () => {
    window.addEventListener("resize", this.setRendererSize);
  };

  update = () => {
    requestAnimationFrame(this.update);
    this.renderer.render(this.scene, this.camera);
  };
}
