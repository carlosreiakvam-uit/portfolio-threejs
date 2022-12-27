import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}


gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)
    })

// Canvas
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()


/**
 * Objects
 */

const material = new THREE.MeshBasicMaterial({
    color: '#ff00ff'
});

const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 10),
    material
);


// scene.add(mesh1)


// LIGHT
const light = new THREE.DirectionalLight('#ffffff');
light.position.set(1, 1, 0);
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
camera.position.z = 6
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

let scrollY = 0
addEventListener('wheel', (event) => {
    // console.log(event)
    scrollY = event.deltaY < 0 ? Math.max(scrollY - 1, 0) : scrollY + 1;
    document.getElementById('scrollCount').innerText = scrollY;
});


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate meshes
    // for (const mesh of sectionMeshes) {
    //     mesh.rotation.x = elapsedTime * 0.1
    //     mesh.rotation.y = elapsedTime * 0.12
    // }

    // Animate camera
    // camera.position.y = -scrollY / sizes.height * objectsDistance

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()