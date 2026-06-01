<!-- src/components/UI/Loader.vue -->
<template>
  <div v-if="loading" class="fixed inset-0 bg-white/90 flex items-center justify-center z-50" :class="{ 'relative bg-transparent': inline }">
    <div class="flex flex-col items-center gap-3">
      <div class="animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"
        :class="loaderSize"
      ></div>
      <p v-if="text" class="text-sm text-gray-600">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  text: String,
  inline: {
    type: Boolean,
    default: false
  }
})

const loaderSize = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10',
  lg: 'w-14 h-14'
}
</script>