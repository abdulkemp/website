<!-- src/components/UI/Select.vue -->
<template>
  <div class="mb-4 w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
        :class="{
          'border-red-500 focus:ring-red-500': error,
          'bg-gray-100 cursor-not-allowed': disabled
        }"
        @change="handleChange"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    <span v-if="error" class="text-xs text-red-500 mt-1 block">{{ error }}</span>
    <span v-if="hint && !error" class="text-xs text-gray-500 mt-1 block">{{ hint }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: String,
  placeholder: String,
  options: {
    type: Array,
    required: true,
    validator: (value) => value.every(item => 'value' in item && 'label' in item)
  },
  disabled: Boolean,
  required: Boolean,
  error: String,
  hint: String
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const id = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>