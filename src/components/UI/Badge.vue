<!-- src/components/UI/Badge.vue -->
<template>
  <span
    class="inline-flex items-center rounded-full font-medium"
    :class="[badgeSize, badgeColor, { 'cursor-pointer': clickable }]"
    @click="handleClick"
  >
    <svg v-if="icon" class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <use :href="`#icon-${icon}`" />
    </svg>
    <slot>{{ text }}</slot>
    <button
      v-if="removable"
      @click.stop="handleRemove"
      class="ml-1 hover:opacity-75 focus:outline-none"
    >
      <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </span>
</template>

<script setup>
const props = defineProps({
  text: String,
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  icon: String,
  removable: Boolean,
  clickable: Boolean
})

const emit = defineEmits(['click', 'remove'])

const badgeSize = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base'
}

const badgeColor = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-purple-100 text-purple-800'
}

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}

const handleRemove = () => {
  emit('remove')
}
</script>