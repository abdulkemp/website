<!-- src/components/UI/Progress.vue -->
<template>
  <div class="w-full">
    <div v-if="showLabel" class="flex justify-between mb-1">
      <span class="text-sm font-medium text-gray-700">{{ label }}</span>
      <span class="text-sm font-medium text-gray-700">{{ percentage }}%</span>
    </div>
    <div class="relative" :class="{ 'h-2': size === 'sm', 'h-3': size === 'md', 'h-4': size === 'lg' }">
      <div class="absolute inset-0 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-300 ease-out"
          :class="progressColor"
          :style="{ width: `${percentage}%` }"
        >
          <div v-if="showPercentage && size !== 'sm'" class="h-full flex items-center justify-center text-xs text-white font-medium">
            {{ percentage }}%
          </div>
        </div>
      </div>
    </div>
    <p v-if="helperText" class="mt-1 text-xs text-gray-500">{{ helperText }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  label: String,
  helperText: String,
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  showPercentage: {
    type: Boolean,
    default: false
  }
})

const progressColor = {
  primary: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-purple-500'
}
</script>