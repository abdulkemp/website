<!-- src/components/UI/Dropdown.vue -->
<template>
  <div ref="rootRef" class="relative" :class="{ 'w-full': fullWidth }">
    <button
      @click="toggleDropdown"
      @keydown.escape="closeDropdown"
      class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      :class="[fullWidth ? 'w-full justify-between' : '', triggerClass]"
      type="button"
    >
      <slot name="trigger">
        <span class="truncate">{{ triggerText }}</span>
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': isOpen }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </slot>
    </button>

    <Teleport to="body">
      <Transition name="dropdown">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          class="fixed z-[9999] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          :style="dropdownStyle"
        >
          <div class="max-h-60 overflow-y-auto">
            <!-- Optional search input -->
            <div v-if="props.searchable" class="px-3 pt-3 pb-1">
              <input
                ref="searchInputRef"
                v-model="searchTerm"
                @input="() => emit('search', searchTerm)"
                :placeholder="props.searchPlaceholder"
                type="search"
                class="w-full text-black rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div v-if="hasOptions" class="py-1">
              <button
                v-for="option in displayOptions"
                :key="option.value"
                type="button"
                class="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                :class="option.value === modelValue ? 'bg-blue-50 text-blue-700' : ''"
                @click="selectOption(option)"
              >
                <span>{{ option.label }}</span>
                <span v-if="option.value === modelValue" class="text-blue-600">✓</span>
              </button>
            </div>

            <div v-else class="py-1">
              <slot :close="closeDropdown" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object, null],
    default: '',
  },
  triggerLabel: {
    type: String,
    default: 'Filter',
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionLabelKey: {
    type: String,
    default: 'label',
  },
  optionValueKey: {
    type: String,
    default: 'value',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  triggerClass: {
    type: [String, Array, Object],
    default: '',
  },
  menuClass: {
    type: [String, Array, Object],
    default: '',
  },
  placement: {
    type: String,
    default: 'bottom-start',
    validator: (value) => ['top-start', 'top-end', 'bottom-start', 'bottom-end'].includes(value),
  },
  maxHeight: {
    type: String,
    default: '240px',
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
})

const emit = defineEmits(['open', 'close', 'update:modelValue', 'change', 'search'])

const isOpen = ref(false)
const dropdownRef = ref(null)
const rootRef = ref(null)
const dropdownStyle = ref({})

const hasOptions = computed(() => props.options.length > 0)

const normalizedOptions = computed(() =>
  props.options.map((option) => {
    if (typeof option === 'object' && option !== null) {
      return {
        label: option[props.optionLabelKey] ?? option.label ?? '',
        value: option[props.optionValueKey] ?? option.value ?? '',
      }
    }

    return {
      label: String(option),
      value: option,
    }
  }),
)

const searchTerm = ref('')

const filteredOptions = computed(() => {
  if (!props.searchable || !searchTerm.value) return normalizedOptions.value
  const q = String(searchTerm.value).toLowerCase()
  return normalizedOptions.value.filter((opt) => String(opt.label).toLowerCase().includes(q))
})

const displayOptions = computed(() =>
  props.searchable ? filteredOptions.value : normalizedOptions.value,
)

const selectedOption = computed(() =>
  normalizedOptions.value.find((option) => option.value === props.modelValue),
)

const triggerText = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value.label
  }

  return props.placeholder || props.triggerLabel
})

const updateDropdownPosition = async () => {
  await nextTick()

  if (!rootRef.value || !isOpen.value || !dropdownRef.value) return

  const rect = rootRef.value.getBoundingClientRect()
  const dropdownRect = dropdownRef.value.getBoundingClientRect()
  const dropdownWidth = props.fullWidth ? rect.width : dropdownRect.width
  const dropdownHeight = dropdownRect.height
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  let top, left

  // Calculate vertical position based on placement and available space
  if (props.placement === 'top-start' || props.placement === 'top-end') {
    top = rect.top - dropdownHeight - 5
    if (top < 0 && viewportHeight - rect.bottom > dropdownHeight + 5) {
      top = rect.bottom + 5
    }
  } else {
    top = rect.bottom + 5
    if (top + dropdownHeight > viewportHeight && rect.top > dropdownHeight + 5) {
      top = rect.top - dropdownHeight - 5
    }
  }

  // Horizontal alignment based on placement
  if (props.placement === 'top-end' || props.placement === 'bottom-end') {
    left = rect.right - dropdownWidth
  } else {
    left = rect.left
  }

  // Flip to the left side if the dropdown would overflow right
  if (left + dropdownWidth > viewportWidth) {
    left = rect.right - dropdownWidth
  }

  // Clamp left within viewport
  left = Math.max(10, Math.min(left, viewportWidth - dropdownWidth - 10))

  dropdownStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    minWidth: `${props.fullWidth ? rect.width : 200}px`,
    width: `${props.fullWidth ? rect.width : 'auto'}`,
    maxWidth: '400px',
  }
}

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await updateDropdownPosition()
    // focus search input if present
    await nextTick()
    if (props.searchable && searchInputRef?.value) searchInputRef.value.focus()
  }
  emit(isOpen.value ? 'open' : 'close')
}

const closeDropdown = () => {
  isOpen.value = false
  clearSearch()
  emit('close')
}

const selectOption = (option) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  closeDropdown()
}

const searchInputRef = ref(null)

// clear search when closing
const clearSearch = () => {
  searchTerm.value = ''
}

const handleClickOutside = (event) => {
  const clickedInsideTrigger = rootRef.value && rootRef.value.contains(event.target)
  const clickedInsideDropdown = dropdownRef.value && dropdownRef.value.contains(event.target)

  if (!clickedInsideTrigger && !clickedInsideDropdown) {
    closeDropdown()
  }
}

// Handle scroll and resize events
const handleScrollResize = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScrollResize, true)
  window.addEventListener('resize', handleScrollResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScrollResize, true)
  window.removeEventListener('resize', handleScrollResize)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.max-h-60 {
  max-height: 240px;
}
</style>
