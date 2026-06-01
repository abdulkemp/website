<!-- src/components/UI/Checkbox.vue -->
<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :value="value"
      class="sr-only"
      @change="handleChange"
    />
    <div class="w-4 h-4 border-2 rounded transition-all flex items-center justify-center"
      :class="{
        'border-gray-300 bg-white': !modelValue && !disabled,
        'border-blue-500 bg-blue-500': modelValue && !disabled,
        'border-gray-200 bg-gray-100 cursor-not-allowed': disabled
      }"
    >
      <svg v-if="modelValue" class="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="ml-2 text-sm text-gray-700 select-none">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: String,
  value: [String, Number],
  disabled: Boolean
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked)
  emit('change', event.target.checked)
}
</script>