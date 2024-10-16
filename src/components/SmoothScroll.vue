<template>
  <div class="scroll-container">
    <!-- 3D Model Section (Fixed in the background) -->
    <div class="three-container" ref="threeContainer"></div>

    <!-- Custom Portfolio Sections -->
    <section class="intro-section">
      <div class="firstdiv">
        <div class="wrapper">
          <h2> I'm</h2>
          <h1>
          <span :class="{ sparkle: isSparkling }" id="batman-name">{{
            displayName
          }}</span
          >.
        </h1>
        </div>
 
       </div>
    </section>

    <section class="about-section">
      <h2>About Me</h2>
      <p>
        I'm a web developer who loves building 3D experiences. This portfolio
        showcases my skills and projects.
      </p>
    </section>

    <section class="projects-section">
      <h2>Projects</h2>
      <p>
        Here are some of the projects I've worked on, combining both 3D and
        frontend development.
      </p>
    </section>

    <section class="contact-section">
      <h2>Contact Me</h2>
      <p>If you'd like to work with me, feel free to reach out!</p>
    </section>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Import GLTFLoader for GLB models
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import baffle from "baffle"; // Import Baffle.js

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "SmoothScroll",
  data() {
    return {
      displayName: "Batman", // Initial display name
      isSparkling: true,
    };
  },
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      // Three.js setup
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
      loader.load("/bat.glb", (gltf) => {
        this.model = gltf.scene;
        this.model.position.set(0, -5, 0);
        this.model.scale.set(4, 4, 4);
        this.scene.add(this.model);

        // Adjust the camera's position
        this.camera.position.set(0, 1, 5);

        // Start the animation loop
        this.animate();
        this.initTextReveal(); // Initialize the text reveal effect

        // Initialize scroll animations after model is loaded
        this.initScrollAnimations();
      });
    },
    initTextReveal() {
      const text = baffle("#batman-name"); // Initialize Baffle.js on the span
      text.set({
        characters: "░▒░ ░██░> ████▓ >█> ░/█>█ ██░░ █<▒ ▓██░ ░/░▒",
        speed: 120,
      });

      text.start(); // Start the glitch effect

      // Change the name after 3 seconds
      setTimeout(() => {
        this.isSparkling = false; // Remove sparkle effect
        text.reveal(500); // Reveal the text over 2 seconds
        setTimeout(() => {
          this.displayName = "Dhanush"; // Change the display name to Dhanush after reveal
        }, 500); // Wait until the reveal animation is finished
      }, 1000); // Wait for 3 seconds before the glitch starts
    },
    initScrollAnimations() {
      const cameraStartY = 3;
      const cameraEndY = -3;

      // Animate the camera's Y position
      gsap.to(this.camera.position, {
        y: cameraEndY,
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Animate the 3D model's rotation
      gsap.to(this.model.rotation, {
        y: 2 * Math.PI,
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
.scroll-container {
  position: relative;
  z-index: 5; /* Ensures that the text sections are on top of the 3D model */
}
.intro-section{
  background: rgb(0, 0, 0);
  background: linear-gradient(43deg, rgb(0, 0, 0) 50%, rgba(64,64,64,1) 100%);
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

h1,
h2,
p {
  margin: 0;
  padding: 20px;
  text-align: center;
  font-size: 2rem;
  color: #333;
  z-index: 10;
  font-family: 'Bruce Forever', sans-serif;

}
</style>
