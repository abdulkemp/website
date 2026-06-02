<template>
  <section
    class="w-full h-fit py-10 px-10 flex flex-col gap-5 scroll-mt-20 bg-gray-100"
  >
    <div
      class="w-full h-full flex flex-col items-start justify-center px-10 gap-5"
    >
      <div class="mb-16">
        <p
          class="text-xs font-bold uppercase tracking-widest text-purple-800"
          style="font-weight: 600"
        >
          How We Work
        </p>
        <h2
          class="mt-2 text-lg tracking-tight text-slate-600"
          style="font-weight: 600"
        >
          Our simple process
        </h2>
      </div>

      <div class="w-full h-full">
        <div class="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 px-10">
          <article
            v-for="(step, index) in steps"
            :key="step.title"
            class="relative flex flex-col items-start"
          >
            <div
              v-if="index !== steps.length - 1"
              class="hidden lg:block absolute left-20 top-10 right-0 h-0.5 border-t-2 border-dashed border-slate-200 z-0 translate-x-4"
            ></div>

            <div
              class="relative z-10 mb-6 flex h-15 w-15 items-center justify-center rounded-full bg-blue-50 text-purple-800 mix-blend-multiply"
            >
              <component
                :is="step.icon"
                class="h-8 w-8 text-purple-800"
                :size="26"
                weight="bold"
              />
            </div>

            <div class="z-10 flex flex-col items-start gap-1">
              <p class="text-xs font-bold text-purple-800">{{ step.number }}</p>
              <h3
                class="mt-1 text-lg font-bold text-slate-900"
                style="font-weight: 600"
              >
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-500">
                {{ step.copy }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  PhChatsCircle,
  PhPencil,
  PhCode,
  PhRocketLaunch,
  PhCheckCircle,
} from "@phosphor-icons/vue";

const steps = [
  {
    number: "01",
    title: "Discover",
    copy: "We learn about your goals, audience and requirements.",
    icon: PhChatsCircle,
  },
  {
    number: "02",
    title: "Plan & Design",
    copy: "We create wireframes and stunning UI/UX designs.",
    icon: PhPencil,
  },
  {
    number: "03",
    title: "Develop",
    copy: "We build clean, scalable and high-performing code.",
    icon: PhCode,
  },
  {
    number: "04",
    title: "Test & Optimize",
    copy: "We test across devices and optimize for speed.",
    icon: PhRocketLaunch,
  },
  {
    number: "05",
    title: "Launch & Support",
    copy: "We launch your website and provide ongoing support.",
    icon: PhCheckCircle,
  },
];
</script>
