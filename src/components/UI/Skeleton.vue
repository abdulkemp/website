<!-- src/components/UI/Skeleton.vue -->
<template>
  <div class="animate-pulse" :class="{ 'w-full': !inline }">
    <div
      v-if="variant === 'text'"
      class="bg-gray-200 rounded"
      :class="{
        'h-3 w-full': size === 'sm',
        'h-4 w-full': size === 'md',
        'h-5 w-full': size === 'lg',
        'w-3/4': !fullWidth
      }"
    ></div>
    
    <div
      v-else-if="variant === 'circle'"
      class="rounded-full bg-gray-200"
      :class="{
        'w-6 h-6': size === 'sm',
        'w-10 h-10': size === 'md',
        'w-12 h-12': size === 'lg'
      }"
    ></div>
    
    <div
      v-else-if="variant === 'rectangle'"
      class="bg-gray-200 rounded"
      :class="{
        'w-32 h-20': size === 'sm',
        'w-48 h-32': size === 'md',
        'w-64 h-48': size === 'lg'
      }"
    ></div>
    
    <div v-else-if="variant === 'card'" class="bg-gray-200 rounded-lg p-4">
      <div class="flex items-center mb-4">
        <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        <div class="flex-1">
          <div class="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div class="h-2 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
      <div class="space-y-2">
        <div class="h-2 bg-gray-300 rounded w-full"></div>
        <div class="h-2 bg-gray-300 rounded w-5/6"></div>
        <div class="h-2 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
    
    <div v-else-if="variant === 'avatar'" class="flex items-center space-x-3">
      <div class="bg-gray-200 rounded-full" :class="{
        'w-6 h-6': size === 'sm',
        'w-8 h-8': size === 'md',
        'w-10 h-10': size === 'lg'
      }"></div>
      <div class="flex-1 space-y-2">
        <div class="h-3 bg-gray-200 rounded w-1/3"></div>
        <div class="h-2 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    
    <div v-else-if="variant === 'button'" class="bg-gray-200 rounded" :class="{
      'w-20 h-8': size === 'sm',
      'w-24 h-10': size === 'md',
      'w-32 h-12': size === 'lg'
    }"></div>
    
    <div v-else-if="variant === 'table'" class="w-full">
      <div class="h-8 bg-gray-200 rounded-t mb-2"></div>
      <div class="space-y-2">
        <div class="h-12 bg-gray-100 rounded"></div>
        <div class="h-12 bg-gray-100 rounded"></div>
        <div class="h-12 bg-gray-100 rounded"></div>
      </div>
    </div>
    
    <div v-else-if="variant === 'form'" class="space-y-2">
      <div class="h-3 bg-gray-200 rounded w-1/4"></div>
      <div class="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'circle', 'rectangle', 'card', 'avatar', 'button', 'table', 'form'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  }
})
</script>