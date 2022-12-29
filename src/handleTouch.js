// Handle touch
import * as THREE from "three";

function touchObject(e) {
    if (e.touches) {
        const x = (e.touches[0].clientX / canvas.clientWidth) * 2 - 1;
        const y = -(e.touches[0].clientY / canvas.clientHeight) * 2 + 1;
        // RAYCASTER
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            const object = intersects[0].object;
            console.log(`Touch intersected with object: ${object.name}`);
        }

        e.preventDefault();
    }
}

canvas.addEventListener("touchstart", touchObject);