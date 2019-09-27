<template>
  <div v-bind:style="{ width: imageWidth + 'px', height: imageHeight + 'px' }" v-on:click="toggleZoom" class="zoomedImage" >
    <Frame :pose="pose" class="frame" />
    <ZoomImage :pose="pose" :src="src" />
  </div>
</template>

<script>
import posed from 'vue-pose';

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99]
};

export default {
    props: ['imageWidth', 'imageHeight', 'src'],

    data() {
        return {
            isZoomed: false
        }
    },

    computed: {
        pose() {
            return this.isZoomed ? 'zoomedIn' : 'zoomedOut'
        },
        toggleZoom() {
            return this.isZoomed ? this.zoomOut : this.zoomIn;
        }
    },

    methods: {
        zoomIn() {
            window.addEventListener('scroll', this.zoomOut);
            this.isZoomed = true;
        },
        zoomOut() {
            window.removeEventListener('scroll', this.zoomOut);
            this.isZoomed = false;
        }
    },
    components: {
        Frame: posed.div({
            zoomedOut: {
                applyAtEnd: { display: 'none' },
                opacity: 0
            },
            zoomedIn: {
                applyAtStart: { display: 'block' },
                opacity: 1
            }
        }),
        ZoomImage: posed.img({
            zoomedOut: {
                position: 'static',
                width: 'auto',
                height: 'auto',
                transition,
                flip: true
            },
            zoomedIn: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transition,
                flip: true
            }
        })
    }
}
</script>

<style>
.zoomedImage img {
  cursor: zoom-in;
  display: block;
  max-width: 100%;
  margin: auto;
}

.zoomedImage img.zoomed {
  cursor: zoom-out;
}

.frame {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.9);
  transform: translateZ(0);
}
</style>