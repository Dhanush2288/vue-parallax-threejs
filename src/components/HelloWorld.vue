<template>
  <div class="container max-w-[1000px] mx-auto px-4">
    <h2 class="poppins-light text-3xl mb-10">Selected Projects</h2>
    <div class="flex flex-wrap justify-center items-start w-full relative">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-item group mb-4"
        @mouseenter="showPreview(project.image)"
        @mouseleave="hidePreview"
      >
        <div class="project-content m-2">
          <div class="project-info d-flex justify-between align-items-center p-3">
            <p class="poppins-extralight text-2xl leading-none text-gray-700">0{{ index + 1 }}</p>
            <h1 class="khula-regular text-2xl tracking-[calc(3.75rem * 0.03)] text-gray-800">{{ project.name }}</h1>
          </div>
          <p class="poppins-extralight text-lg text-gray-500 px-3">{{ project.stack }}</p>
        </div>
        <!-- Display image directly on mobile -->
        <img
          v-if="isMobile"
          :src="project.image"
          alt="Project Preview"
          class="project-mobile-image"
        />
      </div>

      <div class="fixed cursor-preview-container" :style="cursorStyle">
        <transition name="slide-fade">
          <img v-if="!isMobile && currentImage" :src="currentImage" alt="Project Preview" class="cursor-preview-image" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedProjects",
  data() {
    return {
      projects: [
        { name: 'MeetMate', stack: 'Web Development / Design', image: require('../assets/meetmate/1.jpg') },
        // Add more projects as needed
        { name: 'Fishtrack', stack: 'iOS Development / Product Design', image: require('../assets/meetmate/1.jpg') },
        { name: 'TCG-Home', stack: 'Frontend Development', image: require('../assets/meetmate/1.jpg') },
        { name: 'Portfolio', stack: 'Web Development', image: require('../assets/meetmate/1.jpg') },
      ],
      cursorStyle: {
        left: '0px',
        top: '0px',
        opacity: 0,
        transform: 'scale(0)',
      },
      currentImage: '',
      isMobile: false, // Track if the device is mobile
    };
  },
  methods: {
    showPreview(image) {
      this.currentImage = image;
      this.cursorStyle.opacity = 1;
      this.cursorStyle.transform = 'scale(1)';
    },
    hidePreview() {
      this.currentImage = '';
      this.cursorStyle.opacity = 0;
      this.cursorStyle.transform = 'scale(0)';
    },
    handleMouseMove(event) {
      this.cursorStyle.left = `${event.clientX}px`;
      this.cursorStyle.top = `${event.clientY}px`;
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth < 768; // Adjust the width for your breakpoint
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove);
    this.checkIfMobile(); // Check if it's mobile on mount
    window.addEventListener('resize', this.checkIfMobile); // Check on resize
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.checkIfMobile);
  },
};
</script>

<style scoped>
.project-item {
  position: relative;
}

.khula-regular {
  font-family: Khula, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 3.75rem;
  line-height: 1;
}

.poppins-extralight {
  font-family: Poppins, sans-serif;
  font-weight: 200;
  font-style: normal;
}

.project-content {
  transition: transform 0.3s ease; /* Smooth transition for scaling */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #b1b1b1;
}

.project-item:hover .khula-regular,
.project-item:hover .poppins-extralight {
  transform: scale(1.05); /* Scale up on hover */
}

.cursor-preview-container {
  position: fixed;
  width: 300px; /* Adjust size as needed */
  pointer-events: none; /* Prevent interactions with the preview */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Smooth transition for opacity and scale */
  z-index: 50; /* Ensure it stays above other elements */
}

.cursor-preview-image {
  width: 100%; /* Fill the container */
  height: 100%; /* Fill the container */
  object-fit: cover; /* Maintain aspect ratio */
  border-radius: 8px; /* Optional: Add rounded corners */
}

/* Slide and fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* Move up when fading in */
}

.slide-fade-enter-active {
  transform: translateY(0); /* Ensure it starts at its original position */
}

/* Mobile image styling */
.project-mobile-image {
  width: 100%; /* Full width on mobile */
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px; /* Optional: Add rounded corners */
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .project-item {
    flex: 1 1 100%; /* Stack project items on mobile */
    max-width: 100%; /* Full width on mobile */
  }

  .project-content {
    flex-direction: column; /* Stack content vertically */
    align-items: flex-start; /* Align items to the start */
  }

  .cursor-preview-container {
    width: 80%; /* Adjust cursor preview size for mobile */
  }
}
</style>
