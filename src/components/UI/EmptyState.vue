<!-- src/components/UI/EmptyState.vue -->
<template>
  <div class="text-center py-12 px-4">
    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
      <svg v-if="icon" class="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <use :href="`#icon-${icon}`" />
      </svg>
      <svg v-else class="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-sm text-gray-500 mb-6">{{ description }}</p>
    <slot name="action">
      <button
        v-if="actionLabel"
        @click="$emit('action')"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {{ actionLabel }}
      </button>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'No data found'
  },
  description: {
    type: String,
    default: 'Try adjusting your search or filter to find what you\'re looking for.'
  },
  icon: String,
  actionLabel: String
})

defineEmits(['action'])
</script>