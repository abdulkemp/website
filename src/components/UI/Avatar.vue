<!-- src/components/UI/Avatar.vue -->
<template>
  <div class="relative inline-block">
    <div
      class="relative bg-secondary rounded-full overflow-hidden flex items-center justify-center"
      :class="avatarSize"
      :style="{ padding: pd }"
    >
    <PhUser 
    :size="18"
    weight="bold"
    class="text-black"
    />
      <!-- <img
        v-if="src"
        :src="src"
        :alt="alt"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <span v-else-if="initials" class="font-medium text-white">
        {{ initials }}
      </span>
      <svg v-else class="w-1/2 h-1/2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg> -->
    </div>
    <span
      v-if="status"
      class="absolute bottom-0 right-0 block rounded-full ring-2 ring-white"
      :class="statusColor"
    ></span>
  </div>
</template>

<script setup>
import { PhUser } from '@phosphor-icons/vue'
import { computed, ref } from 'vue'

const props = defineProps({
  src: String,
  alt: String,
  name: String,
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  status: {
    type: String,
    default: null,
    validator: (value) => ['online', 'offline', 'away', 'busy'].includes(value)
  },
  bgColor: {
    type: String,
    default: '#4299e1'
  },
  pd: {
    type: String,
    default: '.5rem'
  }
})

const imageError = ref(false)

const avatarSize = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl'
}

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const statusColor = {
  online: 'bg-green-500 w-2.5 h-2.5',
  offline: 'bg-gray-400 w-2.5 h-2.5',
  away: 'bg-yellow-500 w-2.5 h-2.5',
  busy: 'bg-red-500 w-2.5 h-2.5'
}

const handleImageError = () => {
  imageError.value = true
}
</script>