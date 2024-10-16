<template>
  <div class="scroll-container">
    <!-- 3D Model Section (Fixed in the background) -->
    <div class="three-container" ref="threeContainer"></div>

    <!-- Custom Portfolio Sections -->
    <section class="intro-section">
     <h1 class="Myname">
      I'm <span :class="{'sparkle': isSparkling, 'heroic': heroicEffect}" id="batman-name">{{ displayName }}</span>.
    </h1>
    </section>

    <section class="about-section">
      <h2>About Me</h2>
      <p>I'm a web developer who loves building 3D experiences. This portfolio showcases my skills and projects.</p>
    </section>

    <section class="projects-section">
      <h2>Projects</h2>
      <p>Here are some of the projects I've worked on, combining both 3D and frontend development.</p>
    </section>

    <section class="contact-section">
      <h2>Contact Me</h2>
      <p>If you'd like to work with me, feel free to reach out!</p>
    </section>
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import GLTFLoader for GLB models
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'SmoothScroll',
  data(){
    return{
      displayName:"Batman"
    }
  }
,  mounted() {
    this.initThree();
    setTimeout(()=>{
      this.displayName="Dhanush"
    },2000)
  },
  methods: {
    // initThree() {
    //   // Three.js setup
    //   this.scene = new THREE.Scene();
    //   this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); // Adjust FOV for zoom
    //   this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   this.$refs.threeContainer.appendChild(this.renderer.domElement);

    //   // Lighting for the 3D model
    //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    //   this.scene.add(ambientLight);

    //   const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    //   directionalLight.position.set(5, 10, 7.5).normalize();
    //   this.scene.add(directionalLight);

    //   // Load the GLB model using GLTFLoader
    //   const loader = new GLTFLoader();
    //   loader.load('/bat.glb', (gltf) => {
    //     this.model = gltf.scene; // Get the 3D model from the loaded file
    //     this.model.position.y = -1; // Adjust Y position to focus on the head
    //     this.model.scale.set(1.5, 1.5, 1.5); // Scale up the model for a better view
    //     this.scene.add(this.model); // Add the model to the scene

    //     // Adjust the camera's position to focus on the head
    //     this.camera.position.set(0, 0.5, 3); // Camera zoom to focus on the head

    //     // Start the animation loop (no continuous rotation, only on scroll)
    //     this.animate();

    //     // Initialize the scroll animations after the model is loaded
    //     this.initScrollAnimations();
    //   });
    // },

    initThree() {
  // Three.js setup
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); // Adjust FOV for zoom
  this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.$refs.threeContainer.appendChild(this.renderer.domElement);

  // Lighting for the 3D model
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  this.scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5).normalize();
  this.scene.add(directionalLight);

  // Load the GLB model using GLTFLoader
  const loader = new GLTFLoader();
  loader.load('/bat.glb', (gltf) => {
    this.model = gltf.scene; // Get the 3D model from the loaded file
    this.model.position.set(0, -5, 0); // Initial position (top of the screen)
    this.model.scale.set(4, 4, 4); // Scale up the model for a better view
    this.scene.add(this.model); // Add the model to the scene

    // Adjust the camera's position to focus on the model initially
    this.camera.position.set(0, 1, 5); // Focus on the model's initial position

    // Start the animation loop (no continuous rotation, only on scroll)
    this.animate();

    // Initialize the scroll animations after the model is loaded
    this.initScrollAnimations();
  });
}
,
initScrollAnimations() {
  const cameraStartY = 3; // Starting position of the camera (focusing on the head)
  const cameraEndY = -3; // Ending position of the camera (focusing on the legs)

  // Animate the camera's Y position to simulate scrolling down the model (head to legs)
  gsap.to(this.camera.position, {
    y: cameraEndY, // Move the camera down to focus on the legs
    scrollTrigger: {
      trigger: ".scroll-container", // The container for scrolling
      start: "top top", // Animation starts when the scroll container reaches the top
      end: "bottom bottom", // Animation ends when the scroll container reaches the bottom
      scrub: true, // Smooth animation with scroll
    },
  });

  // Animate the 3D model's rotation when scrolling (if desired)
  gsap.to(this.model.rotation, {
    y: 2 * Math.PI, // Rotate the model 360 degrees as you scroll
    scrollTrigger: {
      trigger: ".scroll-container", // Same scroll container trigger
      start: "top top", // Start when the scroll container reaches the top
      end: "bottom bottom", // End when the scroll container reaches the bottom
      scrub: true, // Smooth rotation based on scroll position
    },
  });
}



,
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    // initScrollAnimations() {
    //   const model = this.model;

    //   // Only initialize GSAP ScrollTrigger after model is loaded
    //   if (model) {
    //     gsap.to(model.rotation, {
    //       scrollTrigger: {
    //         trigger: ".scroll-container",
    //         start: "top top",
    //         end: "bottom bottom",
    //         scrub: true, // Make the rotation based on scroll position
    //         onUpdate: (self) => {
    //           const direction = self.direction;
    //           if (direction === 1) {
    //             // Scrolling down - clockwise rotation
    //             model.rotation.y += 0.05;
    //           } else {
    //             // Scrolling up - counterclockwise rotation
    //             model.rotation.y -= 0.05;
    //           }
    //         },
    //       },
    //     });
    //   }

    //   // Text animations (optional)
    //   gsap.from('.intro-section h1', {
    //     scrollTrigger: {
    //       trigger: '.intro-section',
    //       start: 'top 75%',
    //       scrub: true,
    //     },
    //     opacity: 0,
    //     y: 100,
    //     duration: 1,
    //   });

    //   gsap.from('.about-section h2', {
    //     scrollTrigger: {
    //       trigger: '.about-section',
    //       start: 'top 75%',
    //       scrub: true,
    //     },
    //     opacity: 0,
    //     y: 100,
    //     duration: 1,
    //   });

    //   gsap.from('.projects-section h2', {
    //     scrollTrigger: {
    //       trigger: '.projects-section',
    //       start: 'top 75%',
    //       scrub: true,
    //     },
    //     opacity: 0,
    //     y: 100,
    //     duration: 1,
    //   });

    //   gsap.from('.contact-section h2', {
    //     scrollTrigger: {
    //       trigger: '.contact-section',
    //       start: 'top 75%',
    //       scrub: true,
    //     },
    //     opacity: 0,
    //     y: 100,
    //     duration: 1,
    //   });
    // },
  },
};
</script>

<style scoped>
.scroll-container {
  position: relative;
  z-index: 5; /* Ensures that the text sections are on top of the 3D model */
}

.three-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0; /* The 3D model stays in the background */
  pointer-events: none; /* Prevents interaction with the 3D model */
  opacity: 1; /* The 3D model is always visible */
}

section {
  height: 100vh; /* Fullscreen sections */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  padding: 2rem;
  z-index: 10; /* Text is on top of the 3D model */
}

.intro-section {
  background-color: #f4f4f4;
}

.about-section {
  background-color: #ddd;
}

.projects-section {
  background-color: #ccc;
}

.contact-section {
  background-color: #bbb;
}

h1, h2, p {
  margin: 0;
  padding: 20px;
  text-align: center;
  font-size: 2rem;
  color: #333;
  z-index: 10;
}
</style>
