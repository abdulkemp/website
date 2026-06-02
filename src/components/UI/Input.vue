<!-- src/components/UI/Input.vue -->
<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="mb-1 block text-xs font-medium text-gray-700 fold:text-sm"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative flex items-center" :class="wrapperClass">
      <!-- Prepend -->
      <span
        v-if="$slots.prepend"
        class="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md"
      >
        <slot name="prepend" />
      </span>

      <!-- Input -->
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 fold:text-base"
        :class="[
          inputClass,
          {
            'border-red-500 focus:ring-red-500': error,
            'rounded-l-none': $slots.prepend,
            'rounded-r': $slots.append || isPasswordField,
            'bg-gray-100 cursor-not-allowed': disabled,
            'pr-10': isPasswordField
          }
        ]"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />

      <!-- Password Toggle -->
      <button
        v-if="isPasswordField"
        type="button"
        tabindex="-1"
        class="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        @click="togglePassword"
      >
        <svg
          v-if="showPassword"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-10-7 1-3 5-7 10-7 1.05 0 2.06.18 3 .51M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>

      <!-- Append -->
      <span
        v-else-if="$slots.append"
        class="inline-flex items-center px-3 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md"
        :class="appendClass"
      >
        <slot name="append" />
      </span>
    </div>

    <span
      v-if="error"
      class="mt-1 block text-xs text-red-500 fold:text-sm"
    >
      {{ error }}
    </span>

    <span
      v-if="hint && !error"
      class="mt-1 block text-xs text-gray-500 fold:text-sm"
    >
      {{ hint }}
    </span>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  error: String,
  hint: String,
  maxlength: [String, Number],
  wrapperClass: {
    type: [String, Array, Object],
    default: ''
  },
  inputClass: {
    type: [String, Array, Object],
    default: ''
  },
  appendClass: {
    type: [String, Array, Object],
    default: ''
  }
})

const emit = defineEmits([
  'update:modelValue',
  'blur',
  'focus'
])

const showPassword = ref(false)

const isPasswordField = computed(() => props.type === 'password')

const inputType = computed(() => {
  if (isPasswordField.value) {
    return showPassword.value ? 'text' : 'password'
  }

  return props.type
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const id = computed(() =>
  `input-${Math.random().toString(36).substr(2, 9)}`
)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
