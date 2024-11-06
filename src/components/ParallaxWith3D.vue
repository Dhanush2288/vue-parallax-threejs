<template>
  <div class="post-preview-video-wrapper" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <div class="light-border-wrapper">
      <div class="video-container">
        <a :href="postLink">
          <div class="main-wrapper">
            <div class="gradient-overlay"></div> <!-- Radial gradient overlay -->
            <div class="main-player">
              <div
                class="image-cover"
                :style="{ backgroundImage: `url(${imageSrc})` }"
              >
                <span class="view-post">View Post</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  props: {
    postLink: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showOverlay: false, // Track whether to show the overlay
    };
  },
  methods: {
    handleMouseOver() {
      console.log("Mouse over event triggered"); // Log on mouse over
      this.showOverlay = true; // Show the overlay
    },
    handleMouseLeave() {
      console.log("Mouse leave event triggered"); // Log on mouse leave
      this.showOverlay = false; // Hide the overlay
    },
  },
};
</script>

<style scoped>
.post-preview-video-wrapper {
  position: relative;
  border-radius: 8px; /* Adjust as needed */
  overflow: hidden; /* Hide overflow */
  width: 100%; /* Full width */
  height: 400px; /* Set a fixed height for the component */
}

.light-border-wrapper {
  padding: 1px; /* Border effect */
  border-radius: inherit; /* Match border-radius */
  background-color: #ffffff; /* Light border color */
  height: 100%;
}

.video-container {
  position: relative;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  overflow: hidden;
}

.main-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 70%; /* Adjust width as needed */
  aspect-ratio: 1 / 1; /* Maintain aspect ratio */
  background: radial-gradient(
    closest-side,
    rgb(255, 255, 255) 50%,
    transparent 100%
  );
  opacity: 0.2; /* Set the opacity */
  pointer-events: none; /* Prevent interactions */
  z-index: -1; /* Behind other content */
}

.main-player {
  position: absolute;
  height: 100%;
  width: 100%;
}

.image-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover; /* Ensure image fits nicely */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  transition: opacity 0.3s ease; /* Smooth transition for cover image */
}

.view-post {
  opacity: 0;
  transition: opacity 0.3s ease; /* Smooth transition for "View Post" text */
}

.image-cover:hover .view-post {
  opacity: 1; /* Show "View Post" text on hover */
}
</style>
