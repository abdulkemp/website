<template>
  <div
    class="relative w-full overflow-hidden py-8"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Carousel Track -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="carouselStyle"
    >
      <div
        v-for="(group, groupIndex) in groupedStats"
        :key="groupIndex"
        class="min-w-full grid gap-6 px-4"
        :class="gridClass"
      >
        <template v-for="(stat, index) in group" :key="index">
          <slot v-if="slots.default" name="default" :item="stat" :index="index" />
          <div
            v-else
            class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 hover:scale-105 transition-transform duration-300"
          >
          <!-- Icon -->
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
            :class="stat.iconBg || 'bg-blue-100 text-blue-600'"
          >
            {{ stat.icon }}
          </div>

          <!-- Value -->
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          >
            {{ stat.value }}
          </h2>

          <!-- Label -->
          <p
            class="mt-2 text-gray-500 dark:text-gray-400 text-sm md:text-base"
          >
            {{ stat.label }}
          </p>

          <!-- Growth -->
          <div
            v-if="stat.growth"
            class="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
            :class="
              stat.positive
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            "
          >
            <span>
              {{ stat.positive ? '▲' : '▼' }}
            </span>
            {{ stat.growth }}
          </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Navigation -->
    <!-- <button
      @click="prevSlide"
      class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
    >
      ❮
    </button>

    <button
      @click="nextSlide"
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
    >
      ❯
    </button> -->

    <!-- Dots -->
    <div class="flex justify-center mt-6 gap-2">
      <button
        v-for="(_, index) in groupedStats"
        :key="index"
        @click="goToSlide(index)"
        class="h-3 rounded-full transition-all duration-300"
        :class="
          currentIndex === index
            ? 'bg-blue-600 w-8'
            : 'bg-gray-300 w-3'
        "
      />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  useSlots,
} from 'vue'

const props = defineProps({
  stats: {
    type: Array,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
    default: 4000,
  },
})

const slots = useSlots()

const currentIndex = ref(0)
const itemsPerSlide = ref(3)

let autoplayInterval = null
const isHovered = ref(false)

const updateItemsPerSlide = () => {
  const width = window.innerWidth

  if (width < 640) {
    itemsPerSlide.value = 1
  } else if (width < 1024) {
    itemsPerSlide.value = 2
  } else {
    itemsPerSlide.value = 3
  }
}

const groupedStats = computed(() => {
  const groups = []

  for (
    let i = 0;
    i < props.stats.length;
    i += itemsPerSlide.value
  ) {
    groups.push(
      props.stats.slice(i, i + itemsPerSlide.value)
    )
  }

  return groups
})

const carouselStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
}))

const gridClass = computed(() => {
  if (itemsPerSlide.value === 1) {
    return 'grid-cols-1'
  }

  if (itemsPerSlide.value === 2) {
    return 'grid-cols-2'
  }

  return 'grid-cols-3'
})

// const nextSlide = () => {
//   currentIndex.value =
//     (currentIndex.value + 1) %
//     groupedStats.value.length
// }

// const prevSlide = () => {
//   currentIndex.value =
//     (currentIndex.value - 1 + groupedStats.value.length) %
//     groupedStats.value.length
// }

const goToSlide = (index) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  stopAutoplay()

  if (props.autoplay && groupedStats.value.length > 1) {
    autoplayInterval = setInterval(() => {
      nextSlide()
    }, props.interval)
  }
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
  startAutoplay()
}

const handleMouseLeave = () => {
  isHovered.value = false
  stopAutoplay()
}

onMounted(() => {
  updateItemsPerSlide()
  window.addEventListener('resize', updateItemsPerSlide)
})

onUnmounted(() => {
  stopAutoplay()
  window.removeEventListener(
    'resize',
    updateItemsPerSlide
  )
})
</script>
