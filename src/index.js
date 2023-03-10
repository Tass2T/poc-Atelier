import GUI from "lil-gui";
import * as THREE from "three";
import { config } from "../config";

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
    this.camera.position.set(-0.5, 0, 150);

    if (config.DEBOG_MODE) this.setDebug();

    this.pearlGeometry = new THREE.SphereGeometry(4, 10, 10);
    this.pearlShader = new THREE.MeshBasicMaterial();
    this.scrollY = 0;
    this.setPearls();
    this.axis = new THREE.Vector3(0.2, 1, 0);
    this.setEvents();
    this.update();
  }

  setPearls = () => {
    if (this.pearls) {
      this.scene.remove(this.pearls);
      this.pearls = null;
    }

    this.pearls = new THREE.InstancedMesh(
      this.pearlGeometry,
      this.pearlShader,
      config.PEARL_NUMBERS
    );
    this.pearls.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < this.pearls.count; i++) {
      const color = new THREE.Color(
        `rgb(${
          config.ATELIER_COLORS[
            Math.floor(Math.random() * config.ATELIER_COLORS.length)
          ]
        })`
      );
      const dummy = new THREE.Object3D();
      dummy.position.set(
        (Math.random() - 0.5) * config.PEARL_RADIUS,
        (Math.random() - 0.5) * config.PEARL_RADIUS,
        (Math.random() - 0.5) * config.PEARL_RADIUS
      );
      dummy.scale.setScalar(Math.random() * 1.5);
      dummy.updateMatrix();
      this.pearls.setMatrixAt(i, dummy.matrix);
      this.pearls.setColorAt(i, color);
    }

    this.pearls.instanceColor.needsUpdate = true;

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

  handleScroll() {
    this.scrollY = window.scrollY;
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
      .add(config, "ROTATION_SPEED", 0.001, 0.5, 0.005)
      .name("vitesse rotation");
  }

  updatePearlPositions() {
    this.pearls.rotateOnAxis(
      this.axis,
      (this.scrollY + 20) * config.ROTATION_SPEED
    );
    this.pearls.instanceMatrix.needsUpdate = true;
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.updatePearlPositions();
    this.renderer.render(this.scene, this.camera);
  };
}
