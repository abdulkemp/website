<!-- src/components/UI/Modal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        :class="overlayClass"
        @click="handleOverlayClick"
      >
        <Transition name="modal-zoom">
          <div
            v-if="modelValue"
            class="flex max-h-[90vh] w-1/2 flex-col overflow-hidden rounded-lg bg-white shadow-xl"
            :class="[resolvedSizeClass, panelClass]"
            @click.stop
          >
            <div class="flex justify-between items-center p-4 border-b border-gray-200">
              <slot name="header">
                <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
              </slot>
              <button v-if="dismissible" @click="close" class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div class="flex-1 overflow-y-auto p-4" :class="contentClass">
              <slot />
            </div>
            
            <div v-if="$slots.footer" class="p-4 border-t border-gray-200 flex justify-end gap-2">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'fullscreen'].includes(value)
  },
  panelClass: {
    type: [String, Array, Object],
    default: ''
  },
  contentClass: {
    type: [String, Array, Object],
    default: ''
  },
  overlayClass: {
    type: [String, Array, Object],
    default: 'bg-black/50 backdrop-blur-sm'
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const modalSizeMap = {
  sm: 'w-[400px]',
  md: 'w-[600px]',
  lg: 'w-[800px]',
  xl: 'w-[1140px]',
  fullscreen: 'h-[95vh] w-[95vw]'
}

const resolvedSizeClass = computed(() => modalSizeMap[props.size] || modalSizeMap.md)

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    close()
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-zoom-enter-from,
.modal-zoom-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>