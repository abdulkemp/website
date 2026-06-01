<!-- src/components/UI/Textarea.vue -->
<template>
  <div class="mb-4 w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :maxlength="maxlength"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
      :class="{
        'border-red-500 focus:ring-red-500': error,
        'bg-gray-100 cursor-not-allowed': disabled
      }"
      @input="handleInput"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <div class="flex justify-between mt-1">
      <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
      <span v-if="hint && !error" class="text-xs text-gray-500">{{ hint }}</span>
      <span v-if="maxlength" class="text-xs text-gray-400 ml-auto">
        {{ modelValue?.length || 0 }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: String,
  placeholder: String,
  rows: {
    type: [String, Number],
    default: 4
  },
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  error: String,
  hint: String,
  maxlength: [String, Number]
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const id = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>