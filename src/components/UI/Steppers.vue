<template>
  <div
    class="w-full"
    :class="vertical ? 'flex flex-col gap-4' : 'flex items-start justify-between gap-4'"
  >
    <div
      v-for="(step, index) in steps"
      :key="step.id"
      class="relative flex-1"
    >
      <!-- Connector -->
      <div
        v-if="index !== steps.length - 1"
        class="absolute bg-slate-300 dark:bg-slate-700 transition-all duration-300"
        :class="vertical
          ? 'left-5 top-12 w-[2px] h-full'
          : 'top-5 left-1/2 h-[2px] w-full'"
      >
        <div
          class="bg-secondary dark:bg-secondary transition-all duration-500"
          :class="[
            vertical ? 'w-full' : 'h-full',
            index < currentStep
              ? vertical
                ? 'h-full'
                : 'w-full'
              : vertical
                ? 'h-0'
                : 'w-0'
          ]"
        />
      </div>

      <!-- Step -->
      <button
        type="button"
        :disabled="step.disabled"
        @click="selectStep(index, step.disabled)"
        class="group relative z-10 flex items-start gap-3 text-left transition-all"
        :class="[
          vertical ? 'w-full' : 'flex-col items-center text-center mx-auto',
          clickable && !step.disabled
            ? 'cursor-pointer'
            : 'cursor-default'
        ]"
      >
        <!-- Circle -->
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300"
          :class="{
            'bg-secondary border-secondary text-black shadow-lg shadow-secondary/30':
              getStepStatus(index) === 'active',

            'bg-green-500 border-green-500 text-white':
              getStepStatus(index) === 'completed',

            'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-secondary':
              getStepStatus(index) === 'upcoming',

            'opacity-50':
              step.disabled
          }"
        >
          <!-- Completed -->
          <svg
            v-if="getStepStatus(index) === 'completed'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>

          <!-- Icon -->
          <span
            v-else-if="step.icon"
            class="text-lg"
          >
            {{ step.icon }}
          </span>

          <!-- Number -->
          <span v-else>
            {{ index + 1 }}
          </span>
        </div>

        <!-- Content -->
        <div class="flex flex-col">
          <span
            class="text-sm font-semibold transition-colors"
            :class="{
              'text-black text-black':
                getStepStatus(index) === 'active',

              'text-slate-900 dark:text-white':
                getStepStatus(index) !== 'active',

              'opacity-50':
                step.disabled
            }"
          >
            {{ step.title }}
          </span>

          <span
            v-if="step.description"
            class="mt-1 text-xs text-slate-500 dark:text-slate-400"
          >
            {{ step.description }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface StepItem {
  id: number | string
  title: string
  description?: string
  icon?: string
  disabled?: boolean
}

const props = defineProps<{
  steps: StepItem[]
  modelValue: number
  vertical?: boolean
  clickable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const currentStep = computed(() => props.modelValue)

function selectStep(index: number, disabled?: boolean) {
  if (disabled) return
  if (!props.clickable) return

  emit('update:modelValue', index)
  emit('change', index)
}

function getStepStatus(index: number) {
  if (index < currentStep.value) return 'completed'
  if (index === currentStep.value) return 'active'
  return 'upcoming'
}
</script>