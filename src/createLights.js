import * as THREE from "three";

export function createLights() {
    const light = new THREE.DirectionalLight('#ffffff');
    light.position.set(4, 5, 10);
    light.lookAt(0, 0, 0)
    return light
}