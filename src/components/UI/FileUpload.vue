<!-- src/components/UI/BaseFileUpload.vue -->
<template>
  <div class="file-upload-wrapper" :class="{ 'w-full': fullWidth }">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

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

    <!-- Upload Area -->
    <div
      class="relative border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer"
      :class="{
        'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50': !disabled && !dragActive,
        'border-blue-500 bg-blue-50': dragActive && !disabled,
        'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60': disabled,
        'border-red-500 bg-red-50': error && !disabled
      }"
      @click="triggerFileUpload"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <!-- Upload Icon -->
      <div class="flex flex-col items-center justify-center text-center">
        <svg
          class="w-12 h-12 mb-3"
          :class="{
            'text-gray-400': !dragActive && !error,
            'text-blue-500': dragActive,
            'text-red-500': error
          }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        
        <p class="text-sm text-gray-600 mb-1">
          {{ dragActive ? 'Drop files here' : 'Click or drag files to upload' }}
        </p>
        
        <p v-if="hint && !error" class="text-xs text-gray-500">
          {{ hint }}
        </p>
        
        <p v-if="accept && !error" class="text-xs text-gray-400 mt-1">
          Accepted formats: {{ accept }}
        </p>
        
        <p v-if="maxSize && !error" class="text-xs text-gray-400">
          Max file size: {{ formatFileSize(maxSize) }}
        </p>
        
        <p v-if="maxFiles && multiple && !error" class="text-xs text-gray-400">
          Max {{ maxFiles }} files
        </p>
      </div>
    </div>

    <!-- Error Message -->
    <span v-if="error" class="text-xs text-red-500 mt-1 block">{{ error }}</span>

    <!-- File List -->
    <div v-if="fileList.length > 0 && showFileList" class="mt-4 space-y-2">
      <div class="text-sm font-medium text-gray-700 mb-2">
        Selected Files ({{ fileList.length }})
      </div>
      
      <div class="space-y-2 max-h-64 overflow-y-auto">
        <div
          v-for="(file, index) in fileList"
          :key="index"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <!-- File Icon -->
            <div class="flex-shrink-0">
              <svg v-if="file.type?.startsWith('image/')" class="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <svg v-else-if="file.type?.startsWith('video/')" class="w-8 h-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              <svg v-else-if="file.type?.startsWith('application/pdf')" class="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <svg v-else class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </div>
            
            <!-- File Info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
              <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
            </div>
            
            <!-- Upload Status -->
            <div v-if="uploading" class="flex-shrink-0">
              <div class="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500"></div>
            </div>
            
            <!-- Remove Button -->
            <button
              v-if="!disabled && removable"
              type="button"
              class="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
              @click.stop="removeFile(index)"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploading && uploadProgress > 0" class="mt-4">
      <div class="flex justify-between text-sm text-gray-600 mb-1">
        <span>Uploading...</span>
        <span>{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
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
  label: {
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
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  maxSize: {
    type: Number,
    default: null // in bytes
  },
  maxFiles: {
    type: Number,
    default: null
  },
  capture: {
    type: String,
    default: null // 'environment' or 'user' for camera
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  showFileList: {
    type: Boolean,
    default: true
  },
  removable: {
    type: Boolean,
    default: true
  },
  uploadUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'upload-start', 'upload-progress', 'upload-success', 'upload-error', 'file-remove'])

const fileInputRef = ref(null)
const dragActive = ref(false)
const fileList = ref([])
const uploading = ref(false)
const uploadProgress = ref(0)

// Format file size
const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Validate file
const validateFile = (file) => {
  // Check file size
  if (props.maxSize && file.size > props.maxSize) {
    throw new Error(`File ${file.name} exceeds maximum size of ${formatFileSize(props.maxSize)}`)
  }
  
  // Check file type
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
  
  // Check max files limit
  if (props.maxFiles && !props.multiple && files.length > 1) {
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
    emit('upload-error', errors)
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

// Handle file input change
const handleFileChange = (event) => {
  const files = Array.from(event.target.files || [])
  if (files.length > 0) {
    addFiles(files)
  }
  
  // Reset input value to allow selecting the same file again
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

// Trigger file upload dialog
const triggerFileUpload = () => {
  if (!props.disabled && fileInputRef.value) {
    fileInputRef.value.click()
  }
}

// Drag and drop handlers
const handleDragEnter = (event) => {
  event.preventDefault()
  event.stopPropagation()
  if (!props.disabled) {
    dragActive.value = true
  }
}

const handleDragLeave = (event) => {
  event.preventDefault()
  event.stopPropagation()
  dragActive.value = false
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.stopPropagation()
  if (!props.disabled) {
    dragActive.value = true
    event.dataTransfer.dropEffect = 'copy'
  }
}

const handleDrop = (event) => {
  event.preventDefault()
  event.stopPropagation()
  dragActive.value = false
  
  if (!props.disabled) {
    const files = Array.from(event.dataTransfer.files || [])
    if (files.length > 0) {
      addFiles(files)
    }
  }
}

// Remove file
const removeFile = (index) => {
  const removedFile = fileList.value[index]
  fileList.value.splice(index, 1)
  
  const returnValue = props.multiple ? fileList.value : (fileList.value[0] || null)
  emit('update:modelValue', returnValue)
  emit('file-remove', removedFile)
  emit('change', returnValue)
}

// Upload files to server
const uploadFiles = async () => {
  if (!props.uploadUrl || fileList.value.length === 0) return
  
  uploading.value = true
  uploadProgress.value = 0
  
  const formData = new FormData()
  fileList.value.forEach((file, index) => {
    formData.append(`file${index}`, file)
  })
  
  emit('upload-start', fileList.value)
  
  try {
    const xhr = new XMLHttpRequest()
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100
        uploadProgress.value = percentComplete
        emit('upload-progress', percentComplete)
      }
    })
    
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        uploading.value = false
        emit('upload-success', response)
      } else {
        throw new Error('Upload failed')
      }
    })
    
    xhr.addEventListener('error', () => {
      throw new Error('Upload failed')
    })
    
    xhr.open('POST', props.uploadUrl)
    xhr.send(formData)
  } catch (error) {
    uploading.value = false
    emit('upload-error', error.message)
    alert('Upload failed: ' + error.message)
  }
}

// Clear all files
const clearFiles = () => {
  fileList.value = []
  emit('update:modelValue', null)
  emit('change', null)
}

// Expose methods for parent components
defineExpose({
  clearFiles,
  uploadFiles,
  triggerFileUpload
})

// Watch for model value changes from parent
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