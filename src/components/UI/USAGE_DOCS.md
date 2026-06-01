# Usage Docs

- [alert](#alert)
- [avatar](#avatar)
- [badge](#badge)
- [barChart](#barChart)
- [breadcrumb](#breadcrumb)
- [button](#button)
- [card](#card)
- [checkbox](#checkbox)
- [datePicker](#datePicker)
- [dropdown](#dropdown)
- [emptyState](#emptyState)
- [fileButton](#fileButton)
- [fileUpload](#fileUpload)
- [input](#input)
- [lineChart](#lineChart)
- [loader](#loader)
- [modal](#modal)
- [pagination](#pagination)
- [progress](#progress)
- [search](#search)
- [select](#select)
- [skeleton](#skeleton)
- [switch](#switch)
- [table](#table)
- [tabs](#tabs)
- [tabItem](#tabItem)
- [textarea](#textarea)
- [timePicker](#timePicker)

<section id="alert">

## Alert

```vue
<template>
  <div class="space-y-4">
    <BaseAlert
      type="success"
      title="Saved"
      message="Changes were saved successfully."
      :dismissible="true"
      :show="showSuccess"
      @update:show="showSuccess = $event"
    />

    <BaseAlert
      type="error"
      title="Upload failed"
      message="The file could not be uploaded."
      :show="true"
    />

    <BaseAlert
      type="info"
      message="This alert closes automatically."
      :auto-close="3000"
      :show="showInfo"
      @update:show="showInfo = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showSuccess = ref(true)
const showInfo = ref(true)
</script>
```

</section>

<section id="timePicker">

## TimePicker

```vue
<template>
  <div class="grid gap-4 md:grid-cols-2">
    <BaseTimePicker v-model="incidentTime" label="Incident Time" placeholder="Select time" />

    <BaseTimePicker
      v-model="reminderTime"
      label="Reminder Time"
      :step="900"
      hint="15 minute intervals"
    />

    <BaseTimePicker
      v-model="restrictedTime"
      label="Business Hours"
      min-time="08:00"
      max-time="17:00"
    />

    <BaseTimePicker v-model="disabledTime" label="Disabled" :disabled="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const incidentTime = ref('09:30')
const reminderTime = ref('')
const restrictedTime = ref('10:00')
const disabledTime = ref('14:00')
</script>
```

</section>

<section id="avatar">

## Avatar

```vue
<template>
  <div class="flex gap-4 items-end flex-wrap">
    <BaseAvatar name="John Doe" size="sm" status="online" />
    <BaseAvatar name="Jane Smith" size="md" />
    <BaseAvatar src="https://i.pravatar.cc/100" alt="Profile" size="lg" />
    <BaseAvatar size="xl" status="busy" />
  </div>
</template>
```

</section>

<section id="badge">

## Badge

```vue
<template>
  <div class="space-y-4">
    <div class="flex gap-3 flex-wrap">
      <BaseBadge text="Default" />
      <BaseBadge text="Primary" variant="primary" />
      <BaseBadge text="Success" variant="success" />
      <BaseBadge text="Warning" variant="warning" />
      <BaseBadge text="Danger" variant="danger" />
      <BaseBadge text="Info" variant="info" />
    </div>

    <div class="flex gap-3 flex-wrap">
      <BaseBadge text="Small" size="sm" />
      <BaseBadge text="Medium" size="md" />
      <BaseBadge text="Large" size="lg" />
    </div>

    <div class="flex gap-3 flex-wrap">
      <BaseBadge text="Removable" variant="success" :removable="true" @remove="handleRemove" />
      <BaseBadge text="Clickable" variant="info" :clickable="true" @click="handleClick" />
    </div>
  </div>
</template>

<script setup>
const handleRemove = () => console.log('badge removed')
const handleClick = () => console.log('badge clicked')
</script>
```

</section>

<section id="barChart">

## BarChart

```vue
<template>
  <div class="space-y-6">
    <BaseBarChart
      :data="claimsData"
      title="Monthly Claims"
      subtitle="This year"
      :height="320"
      @barClick="handleBarClick"
    />

    <BaseBarChart
      :data="compactData"
      title="Compact Chart"
      :show-legend="false"
      :show-grid="false"
      :height="240"
    />
  </div>
</template>

<script setup>
const claimsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [{ label: 'Claims', data: [12, 19, 9, 14], backgroundColor: '#2563eb' }],
}

const compactData = {
  labels: ['Auto', 'Home', 'Life'],
  datasets: [
    {
      label: 'policyholders',
      data: [42, 27, 15],
      backgroundColor: ['#0ea5e9', '#22c55e', '#f59e0b'],
    },
  ],
}

const handleBarClick = (payload) => console.log(payload)
</script>
```

</section>

<section id="breadcrumb">

## Breadcrumb

```vue
<template>
  <div class="space-y-4">
    <BaseBreadcrumb :items="items" />
    <BaseBreadcrumb :items="simpleItems" />
  </div>
</template>

<script setup>
const items = [
  { label: 'Dashboard', path: '/' },
  { label: 'Claims', path: '/claims' },
  { label: 'Detail' },
]

const simpleItems = [{ label: 'Settings', path: '/settings' }, { label: 'Profile' }]
</script>
```

</section>

<section id="button">

## Button

```vue
<template>
  <div class="space-y-6">
    <div class="flex gap-3 flex-wrap">
      <BaseButton label="Primary" variant="primary" @click="handleClick" />
      <BaseButton label="Secondary" variant="secondary" />
      <BaseButton label="Success" variant="success" />
      <BaseButton label="Danger" variant="danger" />
    </div>

    <div class="flex gap-3 flex-wrap">
      <BaseButton label="Small" size="sm" />
      <BaseButton label="Medium" size="md" />
      <BaseButton label="Large" size="lg" />
    </div>

    <div class="flex gap-3 flex-wrap">
      <BaseButton :to="{ name: 'dashboard' }" label="Go Home" />
      <BaseButton href="https://vuejs.org" target="_blank" label="External Link" />
      <BaseButton :loading="true" label="Saving" />
      <BaseButton :disabled="true" label="Disabled" />
    </div>
  </div>
</template>

<script setup>
const handleClick = () => console.log('clicked')
</script>
```

</section>

<section id="card">

## Card

```vue
<template>
  <div class="grid gap-4 md:grid-cols-3">
    <BaseCard title="Default Card">
      <p>Simple content block.</p>
    </BaseCard>

    <BaseCard title="Hoverable" :hoverable="true" variant="outlined">
      <p>This card reacts on hover.</p>
    </BaseCard>

    <BaseCard title="Elevated" variant="elevated" padding="lg">
      <p>Use this for summary panels.</p>
    </BaseCard>
  </div>
</template>
```

</section>

<section id="checkbox">

## Checkbox

```vue
<template>
  <div class="space-y-3">
    <BaseCheckbox v-model="accepted" label="Accept terms and conditions" />
    <BaseCheckbox v-model="newsletter" label="Subscribe to newsletter" />
    <BaseCheckbox :model-value="true" label="Disabled selected" :disabled="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const accepted = ref(false)
const newsletter = ref(true)
</script>
```

</section>

<section id="datePicker">

## DatePicker

```vue
<template>
  <div class="grid gap-4 md:grid-cols-2">
    <!-- Full width date picker -->
    <BaseDatePicker v-model="date" :full-width="true" />

    <!-- Default width -->
    <BaseDatePicker v-model="date" />

    <!-- In a flex container with other elements -->
    <div class="flex gap-4">
      <div class="flex-1">
        <BaseDatePicker v-model="startDate" :full-width="true" />
      </div>
      <div class="flex-1">
        <BaseDatePicker v-model="endDate" :full-width="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dateFiled = ref('2026-04-17')
const monthValue = ref('2026-04')
const dateTimeValue = ref('2026-04-17T10:30')
</script>
```

</section>

<section id="dropdown">

## Dropdown

```vue
<template>
  <div class="flex gap-4">
    <!-- Full width dropdown -->
    <BaseDropdown v-model="value" :options="options" :full-width="true" />

    <!-- Default width dropdown -->
    <BaseDropdown v-model="value" :options="options" />

    <!-- Custom width via wrapper -->
    <div class="w-64">
      <BaseDropdown v-model="value" :options="options" :full-width="true" />
    </div>
  </div>
</template>
```

### Searchable Dropdown (opt-in)

You can enable a built-in search input on a per-dropdown basis with the `searchable` prop. This will render a small search field at the top of the menu and filter options by label. The component emits a `search` event with the current query when typing.

```vue
<template>
  <div class="w-80">
    <BaseDropdown
      v-model="selected"
      :options="options"
      :searchable="true"
      search-placeholder="Search products..."
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('')
const options = [
  { value: 1, label: 'Toyota Corolla' },
  { value: 2, label: 'Honda Civic' },
  { value: 3, label: 'Ford Ranger' },
]
</script>
```

</section>

<section id="emptyState">

## EmptyState

```vue
<template>
  <div class="space-y-6">
    <BaseEmptyState
      title="No claims found"
      description="Try adjusting your filters."
      action-label="Reset Filters"
      @action="handleAction"
    />

    <BaseEmptyState title="No documents uploaded" description="Upload a file to get started." />
  </div>
</template>

<script setup>
const handleAction = () => console.log('reset filters')
</script>
```

</section>

<section id="fileButton">

## FileButton

```vue
<template>
  <div class="p-8 space-y-6">
    <BaseFileButton v-model="selectedFile" text="Choose File" accept=".pdf,.doc,.docx" />

    <BaseFileButton
      v-model="multipleFiles"
      text="Choose Multiple Files"
      :multiple="true"
      :max-files="5"
      accept="image/*"
      variant="success"
    />

    <div class="flex gap-3 flex-wrap">
      <BaseFileButton text="Primary" variant="primary" />
      <BaseFileButton text="Secondary" variant="secondary" />
      <BaseFileButton text="Success" variant="success" />
      <BaseFileButton text="Danger" variant="danger" />
      <BaseFileButton text="Warning" variant="warning" />
      <BaseFileButton text="Outline" variant="outline" />
      <BaseFileButton text="Ghost" variant="ghost" />
    </div>

    <div class="flex gap-3 items-end">
      <BaseFileButton text="Small" size="sm" variant="primary" />
      <BaseFileButton text="Medium" size="md" variant="primary" />
      <BaseFileButton text="Large" size="lg" variant="primary" />
    </div>

    <BaseFileButton
      v-model="fileWithIcon"
      text="Upload Image"
      icon="image"
      accept="image/*"
      variant="primary"
    />

    <BaseFileButton
      v-model="noListFile"
      text="Upload (No List)"
      :show-file-list="false"
      variant="outline"
    />

    <BaseFileButton
      v-model="overlayFile"
      text=""
      icon="image"
      accept="image/*"
      variant="ghost"
      :show-badge="false"
      :show-file-list="false"
      :removable="false"
      :show-clear-all="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedFile = ref(null)
const multipleFiles = ref([])
const fileWithIcon = ref(null)
const noListFile = ref(null)
const overlayFile = ref(null)
</script>
```

</section>

<section id="fileUpload">

## FileUpload

```vue
<template>
  <div class="space-y-6">
    <BaseFileUpload
      v-model="files"
      label="Upload Supporting Documents"
      accept=".pdf,image/*"
      :multiple="true"
      :max-files="5"
    />

    <BaseFileUpload v-model="singleImage" label="Profile Image" accept="image/*" />

    <BaseFileUpload
      v-model="autoUploadFiles"
      label="Auto Upload"
      :auto-upload="true"
      upload-url="/api/upload"
      @upload-success="handleSuccess"
      @upload-error="handleError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
const singleImage = ref(null)
const autoUploadFiles = ref([])

const handleSuccess = (payload) => console.log(payload)
const handleError = (error) => console.error(error)
</script>
```

</section>

<section id="input">

## Input

```vue
<template>
  <div class="grid gap-4 md:grid-cols-2">
    <BaseInput
      v-model="email"
      label="Email Address"
      type="email"
      placeholder="user@example.com"
      hint="We will never share your email."
    />

    <BaseInput v-model="claimId" label="Claim ID" placeholder="CC-2026-0001" readonly />

    <BaseInput v-model="phone" label="Phone Number" type="tel" error="Phone number is required" />

    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      hint="Use at least 8 characters."
      password-toggle
    />

    <BaseInput
      v-model="confirmPassword"
      label="Confirm Password"
      type="password"
      placeholder="Confirm your password"
      password-toggle
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const claimId = ref('CC-2026-0001')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
</script>
```

</section>

<section id="lineChart">

## LineChart

```vue
<template>
  <div class="space-y-6">
    <BaseLineChart
      :data="claimsTrend"
      title="Claims Trend"
      subtitle="Last 6 months"
      @dataPointClick="handlePointClick"
    />

    <BaseLineChart
      :data="compactTrend"
      title="Compact Trend"
      :show-legend="false"
      :show-grid="false"
      :height="260"
    />
  </div>
</template>

<script setup>
const claimsTrend = {
  labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      label: 'Claims',
      data: [14, 18, 11, 22, 19, 24],
      borderColor: '#0f766e',
      backgroundColor: 'rgba(15,118,110,0.15)',
    },
  ],
}

const compactTrend = {
  labels: ['W1', 'W2', 'W3', 'W4'],
  datasets: [
    {
      label: 'Weekly',
      data: [4, 6, 3, 8],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37,99,235,0.12)',
    },
  ],
}

const handlePointClick = (payload) => console.log(payload)
</script>
```

</section>

<section id="loader">

## Loader

```vue
<template>
  <div class="space-y-4">
    <BaseLoader :loading="true" text="Loading claims..." />
    <BaseLoader :loading="true" size="sm" :inline="true" />
    <BaseLoader :loading="true" size="lg" text="Processing payment..." />
  </div>
</template>
```

</section>

<section id="modal">

## Modal

```vue
<template>
  <div class="flex gap-3">
    <BaseButton label="Open Modal" @click="showModal = true" />
    <BaseButton label="Fullscreen" @click="showFullscreen = true" />
  </div>

  <BaseModal v-model="showModal" title="Claim Details" size="md">
    <p>This is modal content.</p>
  </BaseModal>

  <BaseModal v-model="showFullscreen" title="Preview" size="fullscreen">
    <p>Fullscreen content.</p>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const showFullscreen = ref(false)
</script>
```

</section>

<section id="pagination">

## Pagination

```vue
<template>
  <div class="space-y-6">
    <BasePagination
      v-model:current-page="currentPage"
      :total-pages="12"
      :total-items="120"
      :page-size="10"
    />

    <BasePagination
      v-model:current-page="smallPage"
      :total-pages="3"
      :total-items="24"
      :page-size="8"
      :max-visible="3"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const smallPage = ref(1)
</script>
```

</section>

<section id="progress">

## Progress

```vue
<template>
  <div class="space-y-4">
    <BaseProgress :percentage="45" label="Upload Progress" variant="primary" />
    <BaseProgress :percentage="82" label="Claim Review" variant="success" :show-percentage="true" />
    <BaseProgress :percentage="25" label="Risk Score" variant="warning" size="sm" />
    <BaseProgress :percentage="100" label="Completed" variant="danger" size="lg" />
  </div>
</template>
```

</section>

<section id="search">

## Search

```vue
<template>
  <div class="space-y-6">
    <BaseSearch v-model="searchQuery" placeholder="Search claims..." @search="handleSearch" />

    <BaseSearch
      v-model="suggestionQuery"
      :suggestions="suggestions"
      :show-suggestions="true"
      :save-recent-searches="true"
      :search-on-type="true"
      @search="handleSearch"
    />

    <BaseSearch
      v-model="buttonQuery"
      :show-search-button="true"
      placeholder="Search with button..."
    />

    <BaseSearch v-model="darkQuery" :dark-mode="true" placeholder="Dark mode search..." />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const suggestionQuery = ref('')
const buttonQuery = ref('')
const darkQuery = ref('')
const suggestions = ['CC-2024-0482', 'John Smith', 'Auto', 'Pending']

const handleSearch = (query) => console.log(query)
</script>
```

</section>

<section id="select">

## Select

```vue
<template>
  <div class="grid gap-4 md:grid-cols-2">
    <BaseSelect
      v-model="policyType"
      label="Policy Type"
      placeholder="Choose a policy"
      :options="options"
    />

    <BaseSelect
      v-model="status"
      label="Status"
      :options="statusOptions"
      error="Please choose a status"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const policyType = ref('')
const status = ref('')

const options = [
  { value: 'auto', label: 'Auto' },
  { value: 'home', label: 'Home' },
  { value: 'life', label: 'Life' },
]

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]
</script>
```

</section>

<section id="skeleton">

## Skeleton

```vue
<template>
  <div class="space-y-4">
    <BaseSkeleton variant="text" />
    <BaseSkeleton variant="circle" />
    <BaseSkeleton variant="avatar" />
    <BaseSkeleton variant="button" />
    <BaseSkeleton variant="card" />
    <BaseSkeleton variant="table" />
    <BaseSkeleton variant="form" />
  </div>
</template>
```

</section>

<section id="switch">

## Switch

```vue
<template>
  <div class="space-y-3">
    <BaseSwitch v-model="notifications" label="Enable notifications" />
    <BaseSwitch v-model="autoAssign" label="Auto assign adjuster" />
    <BaseSwitch :model-value="true" label="Disabled switch" :disabled="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref(false)
const autoAssign = ref(true)
</script>
```

</section>

<section id="table">

## Table

```vue
<template>
  <BaseTable :columns="columns" :data="rows">
    <template #filters>
      <div class="flex justify-between">
        <h3 class="font-semibold">Recent Claims</h3>
        <BaseSearch v-model="query" placeholder="Search..." />
      </div>
    </template>

    <template #cell-status="{ value }">
      <span class="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
        {{ value }}
      </span>
    </template>

    <template #footer>
      <BasePagination
        v-model:current-page="page"
        :total-pages="3"
        :total-items="30"
        :page-size="10"
      />
    </template>
  </BaseTable>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const page = ref(1)

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'member', label: 'Member' },
  { key: 'status', label: 'Status' },
]

const rows = [
  { id: 'CC-001', member: 'John Smith', status: 'Pending' },
  { id: 'CC-002', member: 'Jane Doe', status: 'Approved' },
]
</script>
```

</section>

<section id="tabs">

## Tabs

```vue
<template>
  <BaseTabs :default-tab="0" @change="handleTabChange">
    <BaseTabItem label="Overview">
      <div>Overview content</div>
    </BaseTabItem>
    <BaseTabItem label="Documents" :count="3">
      <div>Documents content</div>
    </BaseTabItem>
    <BaseTabItem label="Activity" :count="12">
      <div>Activity content</div>
    </BaseTabItem>
  </BaseTabs>
</template>

<script setup>
const handleTabChange = (index) => console.log(index)
</script>
```

</section>

<section id="tabItem">

## TabItem

```vue
<template>
  <BaseTabs>
    <BaseTabItem label="Activity">
      <div>Activity content</div>
    </BaseTabItem>
    <BaseTabItem label="Files" :count="5">
      <div>Files content</div>
    </BaseTabItem>
  </BaseTabs>
</template>
```

</section>

<section id="textarea">

## Textarea

```vue
<template>
  <div class="space-y-4">
    <BaseTextarea
      v-model="description"
      label="Claim Description"
      placeholder="Describe what happened..."
      :rows="5"
      hint="Provide as much detail as possible."
    />

    <BaseTextarea
      v-model="internalNote"
      label="Internal Note"
      :rows="3"
      error="This note is required"
    />

    <BaseTextarea v-model="readonlyNote" label="Readonly" readonly />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const description = ref('')
const internalNote = ref('')
const readonlyNote = ref('Existing note')
</script>
```

</section>
