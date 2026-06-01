<template>
  <div class="block w-full">
    <label v-if="label" class="mb-1 block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="ml-1 text-red-500">*</span>
    </label>

    <div class="relative w-full">
      <input
        :value="modelValue"
        type="time"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="minTime"
        :max="maxTime"
        :step="step"
        class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="inputClass"
        @input="handleTimeInput"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <div
        v-if="showIcon"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="9"></circle>
          <polyline points="12 7 12 12 15 15"></polyline>
        </svg>
      </div>

      <button
        v-if="modelValue && showClearButton && !disabled"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        @click="clearTime"
      >
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <span v-if="error" class="mt-1 block text-xs text-red-500">{{ error }}</span>
    <span v-else-if="hint" class="mt-1 block text-xs text-gray-500">{{ hint }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select time',
  },
  minTime: {
    type: String,
    default: '',
  },
  maxTime: {
    type: String,
    default: '',
  },
  step: {
    type: [String, Number],
    default: 60,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  showClearButton: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus', 'clear'])

const inputClass = computed(() => ({
  'border-red-500 focus:ring-red-500': props.error,
  'bg-gray-100 cursor-not-allowed': props.disabled,
  'pl-10': props.showIcon,
}))

function handleTimeInput(event) {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('change', value)
}

function clearTime() {
  emit('update:modelValue', '')
  emit('clear')
  emit('change', '')
}
</script>
