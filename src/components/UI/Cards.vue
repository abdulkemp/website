<!-- src/components/ui/BaseCard.vue -->
<template>
  <div :class="cardClasses">
    <!-- Header -->
    <div v-if="$slots.header || title" class="mb-4">
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ title }}
        </h3>
      </slot>
    </div>

    <!-- Body -->
    <div class="text-sm text-gray-600">
      <slot></slot>
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="mt-4 flex justify-end gap-2">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'md' // sm | md | lg
  },
  variant: {
    type: String,
    default: 'default' // default | outlined | elevated
  }
})

const paddingClasses = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6'
}

const variantClasses = {
  default: 'bg-white border border-gray-200',
  outlined: 'border border-gray-300 bg-transparent',
  elevated: 'bg-white shadow-md'
}

const cardClasses = computed(() => [
  'rounded-xl transition-all duration-200',
  paddingClasses[props.padding],
  variantClasses[props.variant],
  props.hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''
])
</script>