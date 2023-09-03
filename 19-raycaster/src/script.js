import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * raycaster
 */
const raycaster = new THREE.Raycaster()







/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
 * Mouse
 */
 const  mouse = new THREE.Vector2()
 window.addEventListener('mouseover',(event)=>{


    // 将鼠标的坐标映射为y轴向上，x轴向上，range为-1到1的这个范围

     mouse.x = event.clientX/sizes.width * 2 -1
     mouse.y = -(event.clientY/sizes.height) * 2 + 1



 }) 







/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

// 这个tick函数的好处就是对于每一个browser 的行为都是一样的


let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Animate objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    const rayOrigin = new THREE.Vector3(-3,0,0)
    const rayDirection = new THREE.Vector3(10,0,0)

    // rayDirection.normalize()
    // raycaster.set(rayOrigin,rayDirection)

    // const objectsToTest = [object1,object2,object3]
    // const intersects = raycaster.intersectObjects(objectsToTest)
    // console.log(intersects)

    // // 在每一帧最开始的时候将每一个intersect 的物体重置为红色
    // for (const object of objectsToTest) {
    //     object.material.color.set('#ff0000')

        
    // }

    // for (const intersect of  intersects) {
    //     intersect.object.material.color.set('#0000ff')
        
    // }




     raycaster.setFromCamera(mouse,camera)

     const objectsToTest = [object1, object2, object3]
     const intersects = raycaster.intersectObjects(objectsToTest)
    //  console.log(intersects)
     
     for(const intersect of intersects)
     {
     intersect.object.material.color.set('#0000ff')
     }
     
     for(const object of objectsToTest)
     {
     if(!intersects.find(intersect => intersect.object === object))
     {
     object.material.color.set('#ff0000')
     }
     }


    if(intersects.length)
    {
        if(!currentIntersect)
        {
        console.log('mouse enter')
        }
    
         currentIntersect = intersects[0]
    }
    else
    {
            if(currentIntersect)
            {
            console.log('mouse leave')
    }
    
    currentIntersect = null
    }

     


    



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()