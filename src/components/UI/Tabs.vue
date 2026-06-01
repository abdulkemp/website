<!-- src/components/UI/Tabs.vue -->
<template>
  <div class="w-full">
    <div class="flex gap-1 border-b border-gray-200 mb-4">
      <button
        v-for="(tab, index) in tabItems"
        :key="index"
        class="px-4 py-2 text-sm font-medium transition-all relative"
        :class="{
          'text-blue-600 border-b-2 border-blue-600': activeTab === index,
          'text-gray-600 hover:text-gray-800 hover:bg-gray-50': activeTab !== index
        }"
        @click="setActiveTab(index)"
      >
        {{ tab.props.label }}
        <span v-if="tab.props.count !== undefined" class="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
          {{ tab.props.count }}
        </span>
      </button>
    </div>
    <div class="tabs-content">
      <!-- Render the active tab content -->
      <div v-for="(tab, index) in tabItems" :key="index" v-show="activeTab === index">
        <slot :name="`tab-${index}`">
          <!-- Fallback to default slot if no named slot exists -->
          <component :is="tab" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useSlots, onMounted } from 'vue'

const props = defineProps({
  defaultTab: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:activeTab', 'change'])

const activeTab = ref(props.defaultTab)
const tabItems = ref([])

const slots = useSlots()

onMounted(() => {
  // Get all TabItem components from default slot
  const defaultSlot = slots.default?.()
  if (defaultSlot) {
    tabItems.value = defaultSlot
      .filter(vnode => vnode.type?.name === 'BaseTabItem' || vnode.type?.__name === 'TabItem')
      .map(vnode => vnode)
  }
})

const setActiveTab = (index) => {
  activeTab.value = index
  emit('update:activeTab', index)
  emit('change', index)
}
</script>