<template>
  <div class="relative" ref="root">
    <div
      :class="[
        'flex items-center gap-2 rounded-lg border px-3 py-2 transition',
        darkMode ? 'border-slate-700 bg-[#f1e3c22b] text-white' : 'border-gray-200 bg-[#ffffff38] ',
      ]"
    >
      <!-- <span :class="darkMode ? 'text-slate-400' : 'text-gray-400'">🔍</span> -->
      <PhMagnifyingGlass />
      <input
        ref="inputRef"
        :value="modelValue"
        :placeholder="placeholder"
        type="search"
        class="w-full bg-transparent text-sm outline-none placeholder:text-gray-200 fold:text-base"
        @input="onInput"
        @keydown.enter="submitSearch"
        @focus="isOpen = true"
      />

      <button
        v-if="modelValue"
        type="button"
        :class="darkMode ? 'text-slate-400' : 'text-gray-400'"
        @click="clearSearch"
      >
        ✕
      </button>

      <!-- <button
        v-if="showSearchButton"
        type="button"
        class="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
        @click="submitSearch"
      >
        Search
      </button> -->
    </div>

    <div
      v-if="showSuggestionsPanel"
      :class="[
        'absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border shadow-lg',
        darkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white',
      ]"
    >
      <button
        v-for="suggestion in visibleSuggestions"
        :key="suggestion"
        type="button"
        :class="[
          'block w-full px-4 py-2 text-left text-sm transition fold:text-base',
          darkMode ? 'text-slate-100 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-50',
        ]"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search...',
  },
  suggestions: {
    type: Array,
    default: () => [],
  },
  showSuggestions: {
    type: Boolean,
    default: true,
  },
  saveRecentSearches: {
    type: Boolean,
    default: false,
  },
  searchOnType: {
    type: Boolean,
    default: false,
  },
  debounceTime: {
    type: Number,
    default: 300,
  },
  showSearchButton: {
    type: Boolean,
    default: false,
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  autoFocus: {
    type: Boolean,
    default: false,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'search', 'suggestion-select', 'clear'])

const root = ref(null)
const inputRef = ref(null)
const isOpen = ref(false)
const recentSearches = ref([])

let debounceTimer

const normalizedQuery = computed(() => props.modelValue.trim().toLowerCase())
const normalizedSuggestions = computed(() =>
  props.suggestions.map((item) => String(item || '').trim()).filter(Boolean),
)

const filteredSuggestions = computed(() => {
  if (!props.modelValue) {
    if (normalizedSuggestions.value.length > 0) {
      return normalizedSuggestions.value
    }

    if (props.saveRecentSearches) {
      return recentSearches.value
    }

    return []
  }

  const baseSuggestions = normalizedSuggestions.value.filter((item) =>
    item.toLowerCase().includes(normalizedQuery.value),
  )

  if (baseSuggestions.length > 0) {
    return baseSuggestions
  }

  if (props.saveRecentSearches) {
    return recentSearches.value.filter((item) =>
      String(item).toLowerCase().includes(normalizedQuery.value),
    )
  }

  return []
})

const visibleSuggestions = computed(() => filteredSuggestions.value.slice(0, 8))

const showSuggestionsPanel = computed(() => {
  return props.showSuggestions && isOpen.value && visibleSuggestions.value.length > 0
})

watch(
  () => props.modelValue,
  () => {
    if (props.searchOnType) {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        emit('search', props.modelValue)
      }, props.debounceTime)
    }
  },
)

function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function submitSearch() {
  saveRecentTerm(props.modelValue)
  isOpen.value = false
  emit('search', props.modelValue)
}

function selectSuggestion(suggestion) {
  emit('update:modelValue', suggestion)
  saveRecentTerm(suggestion)
  isOpen.value = false
  emit('suggestion-select', suggestion)
  emit('search', suggestion)
}

function clearSearch() {
  emit('update:modelValue', '')
  isOpen.value = false
  emit('clear')
}

function saveRecentTerm(value) {
  const term = String(value || '').trim()
  if (!props.saveRecentSearches || !term) return

  recentSearches.value = [term, ...recentSearches.value.filter((item) => item !== term)].slice(0, 5)
}

function handleClickOutside(event) {
  if (root.value && !root.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  if (props.autoFocus || props.expanded) {
    inputRef.value?.focus()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  clearTimeout(debounceTimer)
})
</script>
