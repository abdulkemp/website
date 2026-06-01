<template>
  <section class="scroll-mt-20 bg-white px-5 py-24 sm:px-8 lg:px-10">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="max-w-3xl">
          <p class="text-sm font-black uppercase text-cyan-600">Selected work</p>
          <h2 class="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Websites shaped around measurable business goals.
          </h2>
        </div>
        <p class="max-w-md text-lg leading-8 text-slate-600">
          Each project starts with positioning and ends with a site your team can proudly send traffic to.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <article v-for="project in projects" :key="project.name" class="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div class="grid aspect-[4/3] place-items-end bg-slate-950 p-5" :class="project.accent">
            <span class="rounded-md bg-white px-3 py-2 text-xs font-black uppercase text-slate-950">{{ project.type }}</span>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-black text-slate-950">{{ project.name }}</h3>
            <p class="mt-3 leading-7 text-slate-600">{{ project.copy }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    name: "Northline Studio",
    type: "SaaS",
    copy: "A conversion-focused product site with clearer pricing paths and faster page speed.",
    accent: "bg-[radial-gradient(circle_at_top_left,#22d3ee,transparent_38%),#0f172a]",
  },
  {
    name: "BrightLedger",
    type: "Finance",
    copy: "A trust-first services website that explains complex offers with simple user journeys.",
    accent: "bg-[radial-gradient(circle_at_top_right,#a78bfa,transparent_40%),#111827]",
  },
  {
    name: "Atlas Clinics",
    type: "Health",
    copy: "A mobile-friendly booking experience built around local search and patient confidence.",
    accent: "bg-[radial-gradient(circle_at_bottom_left,#34d399,transparent_42%),#0f172a]",
  },
];
</script>
