<template>
  <div class="w-full">
    <!-- TAB HEADERS -->
    <div
      class="flex border-b border-gray-200 overflow-x-auto"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        @click="selectTab(tab.value)"
        class="relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2"
        :class="
          modelValue === tab.value
            ? 'border-[#486148] text-black'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        "
      >
        <span class="flex items-center gap-2">
          {{ tab.label }}

          <!-- OPTIONAL COUNT -->
          <span
            v-if="tab.count !== undefined"
            class="rounded-full bg-gray-100 px-2 py-0.5 text-xs"
          >
            {{ tab.count }}
          </span>
        </span>
      </button>
    </div>

    <!-- TAB CONTENT -->
    <div class="mt-4">
      <slot
        :activeTab="modelValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabItems',

  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => [],
    },

    modelValue: {
      type: [String, Number],
      required: true,
    },
  },

  emits: [
    'update:modelValue',
    'change',
  ],

  methods: {
    selectTab(value) {
      this.$emit(
        'update:modelValue',
        value,
      )

      this.$emit('change', value)
    },
  },
}
</script>