varying vec2 vUv;
varying vec3 vColor;

precision mediump float;

void main () {
    gl_FragColor = vec4(vColor.r, vColor.g, vColor.b, 1.0);
}