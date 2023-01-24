import * as THREE from "three";
import { config } from "../config";

export class Pearl {
  constructor(geometry, shader) {
    this.geometry = geometry;
    this.material = shader;
    this.instance = new THREE.Mesh(this.geometry, this.material);
    this.instance.position.set(
      (Math.random() - 0.5) * config.PEARL_RADIUS,
      (Math.random() - 0.5) * config.PEARL_RADIUS,
      (Math.random() - 0.5) * config.PEARL_RADIUS
    );
  }
}
