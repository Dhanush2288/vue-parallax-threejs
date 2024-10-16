<template>
    <div class="scroll-container" data-scroll-container>
      <section class="content-section" data-scroll-section>
        <h1>Scroll Down for 3D Magic</h1>
      </section>
  
      <section class="three-section" data-scroll-section>
        <div class="three-container" ref="threeContainer"></div>
      </section>
  
      <section class="content-section" data-scroll-section>
        <h2>Keep scrolling...</h2>
      </section>
    </div>
  </template>
  
  <script>
  import LocomotiveScroll from 'locomotive-scroll';
  import 'locomotive-scroll/dist/locomotive-scroll.css';
  import * as THREE from 'three';
  import { gsap } from 'gsap';
  
  export default {
    name: 'SmoothScroll',
    mounted() {
      this.initSmoothScroll();
      this.initThree();
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      initSmoothScroll() {
        this.scroll = new LocomotiveScroll({
          el: document.querySelector('.scroll-container'),
          smooth: true,
        });
      },
      initThree() {
        // Initialize Three.js Scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.threeContainer.appendChild(this.renderer.domElement);
  
        // Create a simple cube (replaceable with more complex models)
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
  
        this.camera.position.z = 5;
        this.animate();
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
      },
      handleScroll() {
        const scrollY = window.scrollY;
        // Add custom scroll animations for 3D elements
      },
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  };
  </script>
  
  <style scoped>
  .scroll-container {
    position: relative;
  }
  
  .content-section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .three-section {
    height: 100vh;
  }
  
  .three-container {
    width: 100vw;
    height: 100vh;
  }
  </style>
  