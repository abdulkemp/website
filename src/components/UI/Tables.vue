<template>
  <div :class="wrapperClass">
    <div v-if="$slots.filters" class="p-4 border-b bg-gray-50">
      <slot name="filters"></slot>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-3 text-left"
            >
              <slot :name="`header-${col.key}`">
                {{ col.label }}
              </slot>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr
            v-for="(row, rowIndex) in data"
            :key="row.id || rowIndex"
            class="hover:bg-gray-50 transition"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4"
            >
              <slot
                :name="`cell-${col.key}`"
                :row="row"
                :value="row[col.key]"
                :index="rowIndex"
              >
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="$slots.footer" class="border-t">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  wrapperClass: {
    type: String,
    default: 'bg-white rounded-xl shadow ',
  },
})
</script>
