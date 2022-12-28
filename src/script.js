import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Debug
 */
// const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}


// gui
//     .addColor(parameters, 'materialColor')
//     .onChange(() => {
//         material.color.set(parameters.materialColor)
//     })

// Canvas
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

function fitCanvasToScreen() {
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}

window.addEventListener("resize", fitCanvasToScreen);
fitCanvasToScreen();

// Handle touch

function handleStart(e) {
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

// canvas.addEventListener("touchstart", handleStart);


/**
 * Objects
 */


const material = new THREE.MeshStandardMaterial({
    color: '#ffffaf'
});
const material2 = new THREE.MeshStandardMaterial({
    color: '#000ff0'
});


const player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 10),
    material,
);
player.name = "boksen"
player.position.y = 0.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 5), material2)
plane.name = "plane"
plane.rotateX(-Math.PI / 2)

scene.add(player, plane)

// BUTTON INPUT
const joystick = document.querySelector(".joystick");

let startX = 0;
let lastX = 0;
let movePlayerX = 0;
let movePlayerZ = 0;

joystick.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    let dx = x - lastX;
    console.log(dx)

    if (dx < 0) {
        console.log('move left')
        movePlayerX = -1;
    } else if (dx > 0) {
        console.log('move right')
        movePlayerX = 1;
    }
    lastX = x;

    e.preventDefault()
});

joystick.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
    joystick.style.background = '#0000aa'
    console.log('startX: ', startX)
    console.log('touches: ', e.touches[0])


})
joystick.addEventListener("touchend", (e) => {
    movePlayerX = 0;
    movePlayerZ = 0;
    joystick.style.background = '#222222'

})

joystick.addEventListener("touchcancel", (e) => {
    movePlayerX = 0;
    movePlayerZ = 0;
})


// LIGHT
const light = new THREE.DirectionalLight('#ffffff');
light.position.set(4, 5, 10);
light.lookAt(0, 0, 0)
scene.add(light)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 25
camera.position.x = 1
camera.position.y = 10
camera.lookAt(0, 0, 0)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// let scrollY = 0
// addEventListener('wheel', (event) => {
//     // console.log(event)
//     scrollY = event.deltaY < 0 ? Math.max(scrollY - 1, 0) : scrollY + 1;
//     document.getElementById('scrollCount').innerText = scrollY;
// });


/**
 * Animate
 */
const outerEdge = 3;
const clock = new THREE.Clock()
const scaleMovement = 0.3;
const tick = () => {
    const elapsedTime = clock.getElapsedTime()


    player.position.x += movePlayerX * scaleMovement;
    player.position.z += movePlayerZ * scaleMovement;

    if (player.position.x > outerEdge) {
        player.position.x = outerEdge;
    } else if (player.position.x < -outerEdge) {
        player.position.x = -outerEdge;
    }


    // Animate camera
    // camera.position.y = -scrollY / sizes.height * objectsDistance

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()