<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
    <nav class="mx-auto flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-10">
      <RouterLink to="/" class="flex items-center gap-3" aria-label="Go to home section">
        <span class="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
          W
        </span>
        <span class="text-lg font-black tracking-tight text-slate-950">WebForge</span>
      </RouterLink>

      <div class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="rounded-md px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          :class="{ 'bg-slate-950 text-white hover:bg-slate-950 hover:text-white': route.path === item.path }"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      

      <button
        type="button"
        class="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-950 md:hidden"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation"
        @click="isOpen = !isOpen"
      >
        <span v-if="!isOpen" class="text-2xl leading-none">+</span>
        <span v-else class="text-2xl leading-none">x</span>
      </button>
    </nav>

    <div v-if="isOpen" class="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
      <div class="mx-auto grid max-w-7xl gap-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="rounded-md px-4 py-3 text-sm font-bold text-slate-700"
          :class="{ 'bg-slate-950 text-white': route.path === item.path }"
          @click="isOpen = false"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isOpen = ref(false);

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Process", path: "/process" },
  { label: "Contact", path: "/contact" },
];
</script>
