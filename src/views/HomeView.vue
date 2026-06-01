<template>
  <section class="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-950 px-5 pt-28 text-white sm:px-8 lg:px-10">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.28),transparent_34%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)]"></div>
    <div class="absolute bottom-0 left-0 right-0 -z-10 h-36 bg-gradient-to-t from-white to-transparent"></div>

    <div class="mx-auto grid w-full max-w-7xl items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p class="mb-5 inline-flex rounded-md border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
          Web strategy, design, and development
        </p>
        <h1 class="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
          Websites that turn attention into action.
        </h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
          We build fast, memorable websites for ambitious teams who need more than a pretty homepage.
          Strategy, interface design, development, and launch support live under one roof.
        </p>
        <div class="mt-10 flex flex-col gap-3 sm:flex-row">
          <RouterLink to="/contact" class="rounded-md bg-cyan-400 px-6 py-4 text-center text-sm font-black text-slate-950 transition hover:bg-cyan-300">
            Book a discovery call
          </RouterLink>
          <RouterLink to="/work" class="rounded-md border border-white/20 px-6 py-4 text-center text-sm font-black text-white transition hover:bg-white/10">
            View our work
          </RouterLink>
        </div>
      </div>

      <div class="grid gap-4 rounded-lg border border-white/10 bg-white/10 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur">
        <div class="rounded-md bg-white p-5 text-slate-950">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <p class="text-xs font-black uppercase text-slate-400">Launch dashboard</p>
              <h2 class="text-2xl font-black">Client site build</h2>
            </div>
            <span class="rounded-md bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">Live</span>
          </div>
          <div class="grid gap-3 sm:grid-cols-3">
            <div class="rounded-md bg-slate-100 p-4">
              <p class="text-3xl font-black">94</p>
              <p class="text-sm font-bold text-slate-500">Performance</p>
            </div>
            <div class="rounded-md bg-slate-100 p-4">
              <p class="text-3xl font-black">38%</p>
              <p class="text-sm font-bold text-slate-500">More leads</p>
            </div>
            <div class="rounded-md bg-slate-100 p-4">
              <p class="text-3xl font-black">21d</p>
              <p class="text-sm font-bold text-slate-500">To launch</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-md bg-cyan-400 p-5 text-slate-950">
            <p class="text-sm font-black uppercase">Focus</p>
            <p class="mt-8 text-2xl font-black">Conversion-first UX</p>
          </div>
          <div class="rounded-md border border-white/10 bg-slate-900 p-5">
            <p class="text-sm font-black uppercase text-slate-400">Stack</p>
            <p class="mt-8 text-2xl font-black">Vue, Tailwind, APIs</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
