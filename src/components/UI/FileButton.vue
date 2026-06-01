<!-- src/components/UI/BaseFileButton.vue -->
<template>
  <div class="file-button-wrapper" :class="{ 'w-full': fullWidth }">
    <!-- Hidden File Input -->
    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :capture="capture"
      class="hidden"
      @change="handleFileChange"
    />

    <!-- Button Trigger -->
    <button
      type="button"
      :disabled="disabled"
      class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
      :class="buttonClasses"
      @click="triggerFilePicker"
    >
      <!-- Icon -->
      <svg v-if="icon" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <use :href="`#icon-${icon}`" />
      </svg>
      <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      
      <!-- Loading Spinner -->
      <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
      
      <!-- Button Text -->
      <span>{{ loading ? uploadingText : text }}</span>
      
      <!-- Selected Count Badge -->
      <span v-if="showBadge && fileList.length > 0" class="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
        {{ fileList.length }}
      </span>
    </button>

    <!-- File List (Optional - can be shown below the button) -->
    <div v-if="showFileList && fileList.length > 0" class="mt-3 space-y-2">
      <div class="text-xs font-medium text-gray-700">
        Selected Files ({{ fileList.length }})
      </div>
      
      <div class="space-y-1 max-h-48 overflow-y-auto">
        <div
          v-for="(file, index) in fileList"
          :key="index"
          class="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
        >
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <!-- File Icon -->
            <svg class="w-4 h-4 flex-shrink-0" :class="getFileIconColor(file)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            
            <!-- File Name -->
            <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
            
            <!-- File Size -->
            <span class="text-xs text-gray-400 flex-shrink-0">{{ formatFileSize(file.size) }}</span>
          </div>
          
          <!-- Remove Button -->
          <button
            v-if="removable"
            type="button"
            class="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors ml-2"
            @click.stop="removeFile(index)"
          >
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Clear All Button -->
      <button
        v-if="showClearAll && fileList.length > 1"
        type="button"
        class="text-xs text-red-600 hover:text-red-700 mt-1"
        @click="clearAllFiles"
      >
        Clear all files
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [File, Array, Object],
    default: null
  },
  text: {
    type: String,
    default: 'Choose File'
  },
  uploadingText: {
    type: String,
    default: 'Uploading...'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: '*/*'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  capture: {
    type: String,
    default: null
  },
  maxSize: {
    type: Number,
    default: null
  },
  maxFiles: {
    type: Number,
    default: null
  },
  showBadge: {
    type: Boolean,
    default: true
  },
  showFileList: {
    type: Boolean,
    default: true
  },
  removable: {
    type: Boolean,
    default: true
  },
  showClearAll: {
    type: Boolean,
    default: true
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  uploadUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'file-remove', 'files-cleared', 'upload-start', 'upload-success', 'upload-error'])

const fileInputRef = ref(null)
const fileList = ref([])
const uploading = ref(false)

// Button classes based on variant and size
const buttonClasses = computed(() => {
  const baseClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 disabled:bg-yellow-400',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 disabled:opacity-50',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:opacity-50'
  }
  
  return [
    baseClasses[props.size],
    variantClasses[props.variant],
    props.fullWidth ? 'w-full justify-center' : ''
  ]
})

// Format file size
const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Get file icon color
const getFileIconColor = (file) => {
  if (file.type?.startsWith('image/')) return 'text-blue-500'
  if (file.type?.startsWith('video/')) return 'text-purple-500'
  if (file.type === 'application/pdf') return 'text-red-500'
  if (file.type?.startsWith('application/')) return 'text-orange-500'
  return 'text-gray-500'
}

// Validate file
const validateFile = (file) => {
  if (props.maxSize && file.size > props.maxSize) {
    throw new Error(`File ${file.name} exceeds maximum size of ${formatFileSize(props.maxSize)}`)
  }
  
  if (props.accept && props.accept !== '*/*') {
    const acceptedTypes = props.accept.split(',').map(type => type.trim())
    const fileType = file.type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    
    const isValid = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileExtension === type.toLowerCase()
      } else if (type.includes('/*')) {
        const mainType = type.split('/')[0]
        return fileType.startsWith(mainType)
      } else {
        return fileType === type
      }
    })
    
    if (!isValid) {
      throw new Error(`File ${file.name} has an invalid type. Accepted: ${props.accept}`)
    }
  }
  
  return true
}

// Add files to list
const addFiles = (files) => {
  const validFiles = []
  const errors = []
  
  if (props.maxFiles && files.length > props.maxFiles && !props.multiple) {
    errors.push(`Maximum ${props.maxFiles} file(s) allowed`)
    files = files.slice(0, props.maxFiles)
  }
  
  for (const file of files) {
    try {
      validateFile(file)
      validFiles.push(file)
    } catch (error) {
      errors.push(error.message)
    }
  }
  
  if (errors.length > 0) {
    alert(errors.join('\n'))
    return
  }
  
  if (props.multiple) {
    fileList.value = [...fileList.value, ...validFiles]
  } else {
    fileList.value = validFiles.slice(0, 1)
  }
  
  const returnValue = props.multiple ? fileList.value : (fileList.value[0] || null)
  emit('update:modelValue', returnValue)
  emit('change', returnValue)
  
  if (props.autoUpload && validFiles.length > 0) {
    uploadFiles()
  }
}

// Handle file selection
const handleFileChange = (event) => {
  const files = Array.from(event.target.files || [])
  if (files.length > 0) {
    addFiles(files)
  }
  
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

// Trigger file picker dialog
const triggerFilePicker = () => {
  if (!props.disabled && !props.loading && fileInputRef.value) {
    fileInputRef.value.click()
  }
}

// Remove a single file
const removeFile = (index) => {
  const removedFile = fileList.value[index]
  fileList.value.splice(index, 1)
  
  const returnValue = props.multiple ? fileList.value : (fileList.value[0] || null)
  emit('update:modelValue', returnValue)
  emit('file-remove', { file: removedFile, index })
  emit('change', returnValue)
}

// Clear all files
const clearAllFiles = () => {
  fileList.value = []
  emit('update:modelValue', null)
  emit('files-cleared')
  emit('change', null)
}

// Upload files to server
const uploadFiles = async () => {
  if (!props.uploadUrl || fileList.value.length === 0) return
  
  uploading.value = true
  
  const formData = new FormData()
  fileList.value.forEach((file, index) => {
    formData.append(`file${index}`, file)
  })
  
  emit('upload-start', fileList.value)
  
  try {
    const response = await fetch(props.uploadUrl, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) throw new Error('Upload failed')
    
    const result = await response.json()
    emit('upload-success', result)
  } catch (error) {
    emit('upload-error', error.message)
    alert('Upload failed: ' + error.message)
  } finally {
    uploading.value = false
  }
}

// Expose methods
defineExpose({
  clearAllFiles,
  uploadFiles,
  triggerFilePicker,
  fileList
})

// Watch for model value changes
watch(() => props.modelValue, (newValue) => {
  if (newValue === null || newValue === undefined) {
    fileList.value = []
  } else if (newValue instanceof File) {
    fileList.value = [newValue]
  } else if (Array.isArray(newValue)) {
    fileList.value = newValue
  }
}, { immediate: true })
</script>