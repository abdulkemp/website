<template>
  <component
    :is="componentType"
    v-bind="componentAttrs"
    :class="computedClasses"
    :disabled="componentType === 'button' ? isDisabled : undefined"
    @click="handleClick"
  >
    <span v-if="loading" class="flex items-center gap-2">
      <svg
        class="w-4 h-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span>Loading...</span>
    </span>

    <span v-else>
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark"
      ].includes(value)
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    default: null
  },
  href: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: "button"
  }
});

const emit = defineEmits(["click"]);

const isDisabled = computed(() => props.disabled || props.loading);

const componentType = computed(() => {
  if (props.to) return "router-link";
  if (props.href) return "a";
  return "button";
});

const componentAttrs = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) {
    return {
      href: props.href,
      target: "_blank",
      rel: "noopener noreferrer"
    };
  }
  return { type: props.type };
});

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses = {
  primary:
    "border border-primary bg-primary text-white shadow-sm hover:bg-gradient-to-r hover:from-primary hover:to-[#335233] hover:text-white focus:ring-primary focus:ring-offset-primary",
  secondary:
    "border border-secondary bg-secondary text-black shadow-sm hover:bg-gradient-to-r hover:from-secondary hover:to-[#b0a286] hover:text-black focus:ring-secondary focus:ring-offset-primary",
  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  warning:
    "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
  info:
    "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
  light:
    "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300",
  dark:
    "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700"
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs fold:text-sm",
  md: "px-4 py-2 text-sm fold:text-base",
  lg: "px-6 py-3 text-sm fold:text-base lg:text-lg"
};

const computedClasses = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  sizeClasses[props.size]
]);

const handleClick = (event) => {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }
  emit("click", event);
};
</script>
