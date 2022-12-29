import './style.css'
import * as THREE from 'three'
import {createObjects} from './createObjects';
import {createLights} from "./createLights";
import {resize} from "./resize";
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const joystick = document.querySelector(".joystick");

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

console.log(isMobileDevice() ? "It's a mobile device!" : "It's not a mobile device!");
joystick.style.display = isMobileDevice() ? 'block' : 'none';


// Canvas
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Add Objects
const {plane1, welcomePlane, infoPlane1, player} = createObjects();
// const axesHelper = new THREE.AxesHelper(10);
scene.add(player, welcomePlane, infoPlane1, plane1)

// BUTTON INPUT
let movePlayerX = 0;

// LIGHT
let light = createLights()
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(0, 0, 20)
scene.add(camera)


// Handle touch input
let startX = 0;
let lastX = 0;
let movePlayerZ = 0;

joystick.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const x = touch.clientX;

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

// // Handle resize
resize(sizes, camera, canvas);

// Controller
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const scaleMovement = 0.1;

const tick = () => {
    // controls.update()

    if (movePlayerX > 0) {
        player.position.x += scaleMovement;
    } else if (movePlayerX < 0) {
        player.position.x -= scaleMovement;
    }


    camera.position.set(player.position.x, player.position.y + 2, 12)
    // camera.lookAt(player.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()