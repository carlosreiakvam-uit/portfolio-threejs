import * as THREE from "three";


export function createObjects() {
    // const image = new Image();
    // const texture = new THREE.Texture(image);
    // image.onload = () => {
    //     console.log('image loaded')
    // }

    const image = new Image()
    const texture = new THREE.Texture(image)
    image.addEventListener('load', () => {
        texture.needsUpdate = true
    })
    image.src = '/textures/gradients/bird.png';

    const material = new THREE.MeshStandardMaterial({
        color: '#ffffaf'
    });
    const material2 = new THREE.MeshStandardMaterial({
        color: '#ffaaaa'
    });
    const welcomeMaterial = new THREE.MeshBasicMaterial({map: texture})

    const box1 = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5), material2);
    box1.name = "box1";
    // box1.rotateX(-Math.PI / 2);
    box1.translateX(box1.geometry.parameters.width / 2 - 1);
    box1.translateY(-0.2)

    const welcomePlane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), welcomeMaterial);
    welcomePlane.position.y = 3 / 2 + 1.5;

    const infoPlane1 = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), welcomeMaterial);
    infoPlane1.position.y = 3 / 2 + 1.5;
    infoPlane1.position.x = 5;


    const player = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1, 10),
        material
    );
    player.name = "player";
    player.position.y = 0.5;

    return {
        plane1: box1,
        welcomePlane,
        infoPlane1,
        player
    };
}
