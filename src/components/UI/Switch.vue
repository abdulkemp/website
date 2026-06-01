<!-- src/components/UI/Switch.vue -->
<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="sr-only"
      @change="handleChange"
    />
    <div class="relative w-11 h-6 rounded-full transition-colors"
      :class="{
        'bg-gray-300': !modelValue && !disabled,
        'bg-blue-500': modelValue && !disabled,
        'bg-gray-200 cursor-not-allowed': disabled
      }"
    >
      <div class="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform shadow-sm"
        :class="{
          'translate-x-5': modelValue,
          'translate-x-0': !modelValue
        }"
      ></div>
    </div>
    <span v-if="label" class="ml-2 text-sm text-gray-700 select-none">
      {{ label }}
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
  disabled: Boolean
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked)
  emit('change', event.target.checked)
}
</script>