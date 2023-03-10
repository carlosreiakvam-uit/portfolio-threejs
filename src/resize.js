export function resize(sizes, camera, canvas) {

    window.addEventListener('resize', () => {
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

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
}