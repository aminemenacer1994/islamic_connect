<template>
  <div class="container py-4 text-center">
    <h3 class="fw-bold display-5 mb-3">Tasbeeh Counter</h3>
    <p class="lead mx-auto mb-3 description">
      A Tasbeeh Counter is a digital tool or application designed to help users keep track of their Dhikr during their
      spiritual practices, such as reciting specific supplications or praises
    </p>
    <strong class=" text-muted">Tap to recite:</strong>
    <div class="fw-bold display-6 text-success mb-3">{{ currentDhikr }}</div>

    <!-- Bead String -->
    <div class="bead-string mb-4">
      <span v-for="n in goal" :key="n" class="bead" :class="{ filled: n <= counter % goal, ripple: rippleBead === n }"
        @animationend="clearRipple(n)"></span>
    </div>

    <!-- Milestone Message -->
    <transition name="fade">
      <div v-if="showMilestone" class="milestone text-warning fw-bold mb-3">
        {{ milestoneMessage }}
      </div>
    </transition>

    <!-- Tap Gesture Area -->
    <div style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;"
      class="tap-area mb-3 container" @touchstart.prevent="handleClick" @click="handleClick">
      <b>Tap Bead +1</b>
    </div>

    <!-- Buttons -->
    <div class="d-flex justify-content-between align-items-center gap-2">
      <button class="btn d-flex align-items-center justify-content-center flex-grow-1" style="background: lightgray; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: black; height: 38px" @click="undoClick"><b>Undo Tap -1</b></button>
      <button class="btn d-flex align-items-center justify-content-center flex-grow-1" style="background: lightgrey; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: black; height: 38px" @click="resetAll"><b>Reset counter</b></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TasbeehBeadsCounter",
  data() {
    return {
      counter: 0,
      goal: 33,
      dhikrList: ["SubhanAllah", "Alhamdulillah", "Allahu Akbar"],
      rippleBead: null,
      showMilestone: false,
      milestoneMessage: "",
      audio: null
    };
  },
  computed: {
    currentDhikr() {
      const round = Math.floor(this.counter / this.goal) % this.dhikrList.length;
      return this.dhikrList[round];
    }
  },
  mounted() {
    const saved = localStorage.getItem("tasbeehCounter");
    if (saved) this.counter = parseInt(saved);
    this.audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
    this.audio.load();
  },
  watch: {
    counter(newVal) {
      localStorage.setItem("tasbeehCounter", newVal);
    }
  },
  methods: {
    handleClick() {
      this.playSound();
      this.counter++;
      this.playRipple();
      this.checkMilestone();
    },
    undoClick() {
      if (this.counter > 0) {
        this.playSound();
        this.counter--;
        this.playRipple();
      }
    },
    resetAll() {
      this.counter = 0;
    },
    playSound() {
      this.audio.currentTime = 0;
      this.audio.play();
    },
    playRipple() {
      const current = (this.counter % this.goal) || this.goal;
      this.rippleBead = current;
    },
    clearRipple(index) {
      if (this.rippleBead === index) this.rippleBead = null;
    },
    checkMilestone() {
      const milestones = [33, 66, 99];
      if (milestones.includes(this.counter)) {
        this.milestoneMessage = `You reached ${this.counter}! Keep going 🤲`;
        this.showMilestone = true;
        setTimeout(() => (this.showMilestone = false), 3000);
      }
    }
  }
};
</script>

<style scoped>
.bead-string {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 10px;
  padding: 8px;
  justify-content: flex-start;
  align-items: center;
  scrollbar-width: none;
  /* Firefox */
}

.bead-string::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Edge */
}

.bead {
  min-width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #dee2e6;
  border: 2px solid #00bfa6;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: background 0.3s;
}

.bead-string {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 8px;
}

.bead {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #dee2e6;
  border: 2px solid #00bfa6;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: background 0.3s;
}

.bead.filled {
  background: #198754;
  box-shadow: 0 0 8px #198754;
}

.bead.ripple::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(25, 135, 84, 0.5);
  transform: translate(-50%, -50%);
  animation: ripple 0.4s ease-out forwards;
}

@keyframes ripple {
  to {
    width: 35px;
    height: 35px;
    opacity: 0;
  }
}

.tap-area {
  font-size: 1.3rem;
  padding: 14px;
  background: linear-gradient(135deg, #198754, #28a745);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  user-select: none;
  transition: transform 0.1s;
}

.tap-area:active {
  transform: scale(0.95);
}

.milestone {
  animation: glowText 1s ease-in-out infinite alternate;
}

@keyframes glowText {
  from {
    text-shadow: 0 0 6px #ffc107;
  }

  to {
    text-shadow: 0 0 12px #ffc107;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
