varying vec2 vUv;
varying vec3 vColor;

attribute vec3 color;

void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
    vColor = color;
}