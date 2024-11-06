<template>
  <div class="scroll-container">
    <section class="nav">
      <div>
        <div class="nav-toggle" @click="toggleNavbar">☰</div>

        <div class="nav-items-container"  :class="{ 'is-active': isNavbarOpen }">
          <div
      class="nav-item"
      :class="{ active: activeItem === 'home' }"
      @mouseover="setActive('home')"
      @mouseleave="setActive('')"

      :style="{ borderRadius: activeItem === 'home' ? '20px 5px 5px 20px' : '0' }"
    >
      <a href="/">Home</a>
    </div>
    <div
      class="nav-item"
      :class="{ active: activeItem === 'posts' }"
      @mouseover="setActive('posts')"
      @mouseleave="setActive('')"

      :style="{ borderRadius: activeItem === 'posts' ? 'px 0px 0px 0px' : '0' }"
    >
      <a href="/posts">Posts</a>
    </div>
    <div
      class="nav-item"
      :class="{ active: activeItem === 'about' }"
      @mouseover="setActive('about')"
      @mouseleave="setActive('')"

      :style="{ borderRadius: activeItem === 'about' ? '5px 20px 20px 5px' : '0' }"
    >
      <a href="/about">About</a>
    </div>
    <div class="nav-settings">
      <!-- Settings button here -->
    </div>
        </div>
      </div>
    </section>

    <div class="three-container" ref="threeContainer"></div>
    <section class="intro-section" v-parallax:scroll="0.5">
      <div class="firstdiv">
        <div class="wrapper">
          <h1>
            <span :class="{ sparkle: isSparkling }" id="batman-name">{{
              displayName
            }}</span>
          </h1>
          <p class="divp">
            Hi! I'm a <span>Full stack engineer</span> with a passion for
            creating engaging user experiences. Currently at<!-- -->
            <span> London</span>.
          </p>
        </div>
      </div>
    </section>
    <Parallaxy :speed="10">
      <section class="about-section" v-parallax:scroll="0.3">
      <h2>About Me</h2> 
      <p>
        I'm a web developer who loves building 3D experiences. This portfolio
        showcases my skills and projects.
      </p>
    </section>
    </Parallaxy>


    <section class="projects-section" v-parallax:scroll="0.5">
      <SelectedProjects />
    
    </section>

    <section class="contact-section" v-parallax:scroll="0.3">
      <h2>Contact Me</h2>
      <p>If you'd like to work with me, feel free to reach out!</p>
    </section>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import baffle from "baffle";
import SelectedProjects from './HelloWorld.vue'; // Adjust the path accordingly
import { Vector3 } from "three";
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "SmoothScroll",
  components: {
    SelectedProjects,
  },
  data() {
    return {
      displayName: "BATMAN",
      isSparkling: true,
      activeItem: 'home', // Default active item
      isNavbarOpen: false, // Track if navbar is open

    };
  },
  mounted() {
    this.initThree();
 
  },
  methods: {
    setActive(item) {
    this.activeItem = item;
  },
  initLenis() {
      this.lenis = new Lenis({
        lerp: 0.1,
        smooth: true,
        direction: 'vertical',
      });

      const animate = () => {
        this.lenis.raf();
        requestAnimationFrame(animate);
      };
      
     },
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen; // Toggle navbar visibility
  },

    initThree() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.$refs.threeContainer.appendChild(this.renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0x333333, 0.3);
      this.scene.add(ambientLight);

      const spotlight = new THREE.SpotLight(0xffffff, 1);
      spotlight.position.set(5, 20, 5);
      spotlight.angle = Math.PI / 6;
      spotlight.penumbra = 0.5;
      spotlight.castShadow = true;
      this.scene.add(spotlight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 20, 10);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 4096;
      directionalLight.shadow.mapSize.height = 4096;
      directionalLight.shadow.camera.near = 0.1;
      directionalLight.shadow.camera.far = 50;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;
      this.scene.add(directionalLight);

      const hemisphereLight = new THREE.HemisphereLight(
        0xaaaaaa,
        0x444444,
        0.6
      );
      hemisphereLight.position.set(0, 10, 0);
      this.scene.add(hemisphereLight);

      const dotGeometry = new THREE.SphereGeometry(0.03, 16, 16);
      const dotMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 1,
        metalness: 0.5,
        roughness: 0.3,
      });
      this.cursorDot = new THREE.Mesh(dotGeometry, dotMaterial);
      this.scene.add(this.cursorDot);

      const glowColors = [
        new THREE.Color(0x00c6ff),
        new THREE.Color(0x5f5fff),
        new THREE.Color(0xff0080),
      ];
      let currentColorIndex = 0;

      const updateGlowColor = () => {
        const nextColorIndex = (currentColorIndex + 1) % glowColors.length;
        const nextColor = glowColors[nextColorIndex];

        gsap.to(dotMaterial.emissive, {
          r: nextColor.r,
          g: nextColor.g,
          b: nextColor.b,
          duration: 2,
          onComplete: () => {
            currentColorIndex = nextColorIndex;
            updateGlowColor();
          },
        });
      };
      this.neonPointLight = new THREE.PointLight(0x9b30ff, 8, 5); // Neon purple light, range of 15 units
      this.neonPointLight.position.set(1, 2.25, 0.3); // Position to the side of the model
      //  this.neonPointLight.castShadow = true; // Enable shadow casting for depth
      this.scene.add(this.neonPointLight);
      // Add a helper to visualize the PointLight
      const neonLightHelper = new THREE.PointLightHelper(
        this.neonPointLight,
        0.5
      );
      //  this.scene.add(neonLightHelper)
      updateGlowColor();

      this.cursorLight = new THREE.PointLight(0x9b30ff, 2, 30);
      this.cursorLight.position.set(0, 0, 0);
      this.cursorLight.castShadow = true;
      this.scene.add(this.cursorLight);

      window.addEventListener("mousemove", this.handleMouseMove.bind(this));

      const loader = new GLTFLoader();
      loader.load("/bat.glb", (gltf) => {
        this.model = gltf.scene;
        this.model.position.set(0, -5, 0);
        this.model.scale.set(4, 4, 4);
        this.scene.add(this.model);

        // this.renderer.setClearColor(0x000000);
        this.camera.position.set(0, 1, 5);
        this.animate();
        this.initTextReveal();
        this.initScrollAnimations();
      });
    },
    handleMouseMove(event) {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      const mousePosition = new THREE.Vector3(mouseX, mouseY, 0.5);
      mousePosition.unproject(this.camera);
      const direction = mousePosition.sub(this.camera.position).normalize();
      const distance = 5;
      const newPosition = this.camera.position
        .clone()
        .add(direction.multiplyScalar(distance));

      // Smoothly move the cursor dot to the new position
      gsap.to(this.cursorDot.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 0.6,
        ease: "power2.out",
      });

      // Use gsap to smoothly animate the cursor-following light's movement
      gsap.to(this.cursorLight.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    initTextReveal() {
      const text = baffle("#batman-name");
      text.set({
        characters: "░▒░ ░██░> ████▓ >█> ░/█>█ ██░░ █<▒ ▓██░ ░/░▒",
        speed: 120,
      });
      text.start();

      setTimeout(() => {
        this.isSparkling = false;
        text.reveal(500);
        setTimeout(() => {
          this.displayName = "DHANUSH";
        }, 500);
      }, 1000);
    },
    initScrollAnimations() {
      const cameraEndY = -3;

      gsap.to(this.camera.position, {
        y: cameraEndY,
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      gsap.from(".contact-section a", {
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 80%", // Animation starts when the top of the section hits 80% of the viewport
    toggleActions: "play none none none"
  },
  y: 20, // start 20 pixels down
  opacity: 0,
  duration: 0.5,
  stagger: 0.2, // Delay between the animations of each button
  ease: "power2.out"
});

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
      requestAnimationFrame(this.animate.bind(this));
      const offset = new THREE.Vector3(0.5, 1, -4); // Adjust the offset as needed
      // this.neonPointLight.position.copy(
      //   this.camera.position.clone().add(offset)
      // );
      this.renderer.render(this.scene, this.camera);
    },
    
  },
  beforeUnmount() {
    if (this.lenis) {
      this.lenis.destroy(); // Clean up the Lenis instance
    }}
    ,watch: {
    // Ensure Lenis recalculates when necessary
    isNavbarOpen() {
      this.$nextTick(() => {
        this.lenis && this.lenis.resize();
      });
    }
  }
  
};
</script>

<style scoped>
.nav {
  border-radius: 30px;
  transform: translateX(-50%) translateY(0px) translateZ(0px);
  width: 300px;
  position: fixed;
  height: 34px;
  top: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  background-color: var(--color-dropdown-list);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  z-index: 999;
  border: 1px solid hsla(0, 0%, 100%, 0.04);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.188), 0 10px 10px rgba(0, 0, 0, 0.169),
    0 23px 14px rgba(0, 0, 0, 0.102), 0 41px 17px rgba(0, 0, 0, 0.031);
  transition: box-shadow 0.7s ease-in-out;
  padding: 10px;
}

.nav-items-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 33px;
  width: -moz-fit-content;
  width: fit-content;
  border-radius: 100px;
  padding: 2px 10px;
}

.nav-item {
  width: 100%;
  padding: 5px;
    transition: border-radius 0.4s ease; /* Smooth transition for border-radius */
}
.active {
  background: grey;
  border-radius: 20px 5px 5px 20px;
}

.nav-item a {
  /* color: var(--white); */
  cursor: pointer;
  color: white;
  font-size: 14px;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  padding: 10px 25px;
  width: 100%;
  height: 100%;
}

.nav-item:hover {
  background: grey;
  border-radius: 20px 5px 5px 20px;
}

.nav-settings {
  margin-left: auto; /* Align settings button to the right */
}
.nav-items-container.is-active {
  display: block; /* Show items when active */
}
.nav-toggle {
  display: none; /* Hidden by default */
  font-size: 24px;
  color: white;
  cursor: pointer;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 1.5em;
  transition: color 0.3s ease;
}
@media (max-width: 768px) {
  .nav-items-container {
    flex-direction: column;
    display: none; /* Hide items by default on mobile */
    position: absolute;
    top: 60px; /* Adjust based on navbar height */
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
  }

  .nav-toggle {
    display: block; /* Show toggle button on mobile */
  }

  .nav-items-container.is-active {
    display: flex; /* Show items when active */
  }
  .nav{
  width:150px
  }
} 

button:hover {
  color: #ffd700; /* Gold color on hover */
}

.firstdiv {
  height: 100vh;
  position: relative;
}

.firstdiv .wrapper {
  position: absolute;
  bottom: 30%;
  left: 10%;
  width: 40%;
}
@font-face {
    font-family: 'MyCustomFont';
    src: url('../assets/Dimensions.ttf') format('opentype'); /* Update the path as necessary */
    font-weight: 800;
    font-style: normal;
}
.wrapper h1 {
  font-family: MyCustomFont,sans-serif;
  color:white;
  font-size: 9rem;
  font-weight: 800;
  text-align: left;
  margin: 0px;
}
.wrapper p {
  word-wrap: break-word;
  text-align: left;
  color: #f1f1f1;
  font-family: ui-rounded;
}
.scroll-container {
  position: relative;
  z-index: 5;
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
  z-index: 0;
  pointer-events: none;
  opacity: 1;
}

section {
  height: 100vh;
  background-color: #f4f4f4;
  padding: 2rem;
  z-index: 10;
}

.intro-section {
  background-color: #181818;
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
</style>
