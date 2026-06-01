<!-- src/components/UI/Alert.vue -->
<template>
  <Transition name="alert-fade">
    <div v-if="visible" class="rounded-lg p-4 mb-4 flex items-start" :class="alertStyles">
      <div class="flex-shrink-0 mr-3">
        <svg v-if="type === 'success'" class="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <svg v-else-if="type === 'error'" class="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <svg v-else-if="type === 'warning'" class="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
        </svg>
        <svg v-else class="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="12" x2="12" y2="16"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="flex-1">
        <div v-if="title" class="font-semibold mb-1" :class="titleColor">{{ title }}</div>
        <div class="text-sm" :class="messageColor">
          <slot>{{ message }}</slot>
        </div>
      </div>
      <button v-if="dismissible" @click="close" class="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: String,
  message: String,
  dismissible: {
    type: Boolean,
    default: true
  },
  show: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:show', 'close'])

const visible = ref(props.show)

const alertStyles = computed(() => ({
  success: 'bg-green-50 border border-green-200',
  error: 'bg-red-50 border border-red-200',
  warning: 'bg-yellow-50 border border-yellow-200',
  info: 'bg-blue-50 border border-blue-200'
}[props.type]))

const titleColor = computed(() => ({
  success: 'text-green-800',
  error: 'text-red-800',
  warning: 'text-yellow-800',
  info: 'text-blue-800'
}[props.type]))

const messageColor = computed(() => ({
  success: 'text-green-700',
  error: 'text-red-700',
  warning: 'text-yellow-700',
  info: 'text-blue-700'
}[props.type]))

let timer = null

watch(() => props.show, (newVal) => {
  visible.value = newVal
  if (newVal && props.autoClose > 0) {
    startTimer()
  }
})

const close = () => {
  visible.value = false
  emit('update:show', false)
  emit('close')
  if (timer) clearTimeout(timer)
}

const startTimer = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    close()
  }, props.autoClose)
}

if (props.show && props.autoClose > 0) {
  startTimer()
}
</script>

<style scoped>
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: opacity 0.3s ease;
}

.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
}
</style>