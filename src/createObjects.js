import * as THREE from "three";


export function createObjects(scene) {
// Create a new TextureLoader
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
        'textures/bird.png',
        texture => {
            const material = new THREE.MeshBasicMaterial({map: texture});
            const welcomePlane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), material);
            welcomePlane.position.y = 3 / 2 + 1.5;
            scene.add(welcomePlane)
        }
    );

    const material = new THREE.MeshStandardMaterial({
        color: '#ffffaf'
    });
    const material2 = new THREE.MeshStandardMaterial({
        color: '#ffaaaa'
    });

    const box1 = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5), material2);
    box1.name = "box1";
    box1.translateX(box1.geometry.parameters.width / 2 - 1);
    box1.translateY(-0.2)
    scene.add(box1)


    // Player
    const player = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1, 10),
        material
    );
    player.name = "player";
    player.position.y = 0.5;
    scene.add(player)
}
