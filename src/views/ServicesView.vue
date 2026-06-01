<template>
  <section class="scroll-mt-20 bg-slate-100 px-5 py-24 sm:px-8 lg:px-10">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 max-w-3xl">
        <p class="text-sm font-black uppercase text-cyan-600">Services</p>
        <h2 class="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
          Everything your website needs to work harder.
        </h2>
      </div>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="service in services" :key="service.title" class="rounded-lg bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <div class="mb-8 grid h-12 w-12 place-items-center rounded-md bg-slate-950 text-lg font-black text-cyan-300">
            {{ service.number }}
          </div>
          <h3 class="text-2xl font-black text-slate-950">{{ service.title }}</h3>
          <p class="mt-4 leading-7 text-slate-600">{{ service.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    number: "01",
    title: "Brand websites",
    copy: "Sharp marketing sites for teams that need trust, clarity, and a stronger first impression.",
  },
  {
    number: "02",
    title: "UI/UX design",
    copy: "User journeys, wireframes, and polished interfaces designed around real conversion goals.",
  },
  {
    number: "03",
    title: "Web development",
    copy: "Responsive Vue builds with TailwindCSS, clean components, and performance-minded delivery.",
  },
  {
    number: "04",
    title: "Landing pages",
    copy: "Campaign pages built to test offers, capture leads, and move fast without feeling temporary.",
  },
  {
    number: "05",
    title: "SEO foundations",
    copy: "Semantic structure, metadata, speed improvements, and launch basics for discoverability.",
  },
  {
    number: "06",
    title: "Care plans",
    copy: "Ongoing updates, improvements, analytics reviews, and technical support after launch.",
  },
];
</script>
