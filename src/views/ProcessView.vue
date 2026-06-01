<template>
  <section class="scroll-mt-20 bg-slate-950 px-5 py-24 text-white sm:px-8 lg:px-10">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 max-w-3xl">
        <p class="text-sm font-black uppercase text-cyan-300">Process</p>
        <h2 class="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          A clear path from idea to launch.
        </h2>
      </div>

      <div class="grid gap-4 lg:grid-cols-4">
        <article v-for="step in steps" :key="step.title" class="rounded-lg border border-white/10 bg-white/5 p-6">
          <p class="text-sm font-black text-cyan-300">{{ step.number }}</p>
          <h3 class="mt-8 text-2xl font-black">{{ step.title }}</h3>
          <p class="mt-4 leading-7 text-slate-300">{{ step.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { number: "01", title: "Discover", copy: "We define the audience, offer, site goals, and content priorities." },
  { number: "02", title: "Design", copy: "We create the page structure and interface system before writing code." },
  { number: "03", title: "Build", copy: "We develop responsive components, connect content, and tune performance." },
  { number: "04", title: "Launch", copy: "We QA, deploy, measure, and support your next round of improvements." },
];
</script>
