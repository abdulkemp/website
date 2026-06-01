<!-- src/components/UI/Breadcrumb.vue -->
<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
          <svg class="w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H9v8H4a2 2 0 0 1-2-2z"></path>
          </svg>
          Home
        </a>
      </li>
      <li v-for="(item, index) in items" :key="index">
        <div class="flex items-center">
          <svg class="w-3 h-3 text-gray-400 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <a
            v-if="index < items.length - 1"
            :href="item.path"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors md:ml-2"
          >
            {{ item.label }}
          </a>
          <span v-else class="ml-1 text-sm font-medium text-gray-500 md:ml-2">
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => value.every(item => 'label' in item)
  }
})
</script>