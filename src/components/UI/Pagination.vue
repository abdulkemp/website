<!-- src/components/UI/Pagination.vue -->
<template>
  <nav
    class="flex items-center justify-between px-4 rounded-xl bg-white sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between w-full">
      <div class="w-[33.3%]">
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ startItem }}</span>
          to
          <span class="font-medium">{{ endItem }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>
      <div class="flex items-center justify-center py-3 w-[33.3%]">

        <nav class="flex items-center space-x-4 text-sm font-medium">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="flex items-center text-slate-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <ul class="flex items-center">
            <li v-for="(page, index) in visiblePages" :key="index" class="flex items-center">
              <span v-if="index > 0" class="mx-2 text-slate-300">|</span>

              <button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                  'min-w-[32px] h-8 flex items-center justify-center rounded transition-colors',
                  currentPage === page
                    ? 'bg-secondary text-black shadow-sm'
                    : 'text-slate-600 hover:bg-secondary',
                ]"
              >
                {{ page }}
              </button>

              <span v-else class="px-2 text-slate-400">...</span>
            </li>
          </ul>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="flex items-center text-slate-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <svg
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
      <div class="w-[33.3%]">

      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  maxVisible: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['update:currentPage', 'change'])

const startItem = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const endItem = computed(() => Math.min(props.currentPage * props.pageSize, props.totalItems))

const visiblePages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= props.totalPages; i++) {
    if (
      i === 1 ||
      i === props.totalPages ||
      (i >= props.currentPage - delta && i <= props.currentPage + delta)
    ) {
      range.push(i)
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
})

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
    emit('change', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
    emit('change', props.currentPage + 1)
  }
}

const goToPage = (page) => {
  if (page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('change', page)
  }
}
</script>
