<template>
  <section class="w-full h-fit py-10 px-10 flex flex-col gap-5 scroll-mt-20">
    <div
      class="w-full h-full flex flex-col items-start justify-center px-10 gap-5"
    >
      <div class="mb-16">
        <p
          class="text-xs font-bold uppercase tracking-widest text-purple-800"
          style="font-weight: 600"
        >
          What Our Clients Say
        </p>
        <h2
          class="mt-2 text-lg tracking-tight text-slate-600"
          style="font-weight: 600"
        >
          Trusted by great businesses
        </h2>
      </div>

      <div class="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-10">
        <BaseCard
          v-for="review in reviews"
          :key="review.author"
          padding="lg"
          variant="elevated"
          class="relative flex h-full flex-col items-start"
        >
          <div class="flex w-full h-fit flex-col gap-3">
            <div class="z-10 flex items-start gap-3">
              <component
                :is="review.icon"
                class="mt-1 shrink-0 rotate-180 text-purple-800"
                :size="26"
                weight="bold"
              />

              <p class="text-sm leading-relaxed text-slate-500">
                {{ review.copy }}
              </p>
            </div>

            <div class="relative z-10 mt-8 flex items-center gap-3">
              <component
                :is="review.avatar"
                class="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <p class="text-sm text-slate-900" style="font-weight: 600">
                  {{ review.author }}
                </p>
                <h3 class="text-xs text-slate-500" style="font-weight: 600">
                  {{ review.title }}
                </h3>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
  <section class="w-full h-fit py-10 px-30 flex flex-col gap-5 scroll-mt-20">
    <div
      class="w-full h-fit py-10 px-10 rounded-2xl flex flex-col gap-5 scroll-mt-20 bg-gray-100"
    >
      <div class="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 px-10">
        <article
          v-for="(step, index) in steps"
          :key="step.title"
          class="relative flex flex-col items-start"
        >
          <div
            v-if="index !== steps.length - 1"
            class="absolute -right-4 top-1/2 z-0 hidden h-12 w-px -translate-y-1/2 bg-slate-300 lg:block"
          ></div>
          <div class="w-full h-fit flex gap-7">
            <div
              class="relative z-10 mb-6 flex h-15 w-15 items-center justify-center rounded-full text-purple-800 mix-blend-multiply"
            >
              <component
                :is="step.icon"
                class="h-12 w-12 text-purple-800"
                :size="32"
                weight="bold"
              />
            </div>

            <div class="z-10 flex flex-col items-start gap-1">
              <h3 class="text-xl font-bold text-black" style="font-weight: 600">
                {{ step.number }}
              </h3>
              <p
                class="mt-1 text-xs font-bold text-slate-600"
                style="font-weight: 600"
              >
                {{ step.title }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BaseCard } from "@/components/UI";
import { PhQuotes, PhUserCircleCheck, PhGlobe, PhSmiley, PhClockClockwise, PhUsers } from "@phosphor-icons/vue";

const reviews = [
  {
    author: "John Doe",
    title: "Exceptional Service",
    copy: "The team was fantastic to work with and delivered exactly what we needed.",
    avatar: PhUserCircleCheck,
    icon: PhQuotes,
  },
  {
    author: "Jane Smith",
    title: "Incredible Results",
    copy: "Our website traffic and conversions have skyrocketed since working with them.",
    avatar: PhUserCircleCheck,
    icon: PhQuotes,
  },
  {
    author: "Bob Johnson",
    title: "Professional and Responsive",
    copy: "They were always available to answer our questions and provided great support throughout the project.",
    avatar: PhUserCircleCheck,
    icon: PhQuotes,
  },
];

const steps = [
  {
    number: "150+",
    title: "Projects Completed",
    icon: PhGlobe,
  },
  {
    number: "98%",
    title: "Client Satisfaction",
    icon: PhSmiley,
  },
  {
    number: "5+",
    title: "Years of Experience",
    icon: PhClockClockwise,
  },
  {
    number: "50+",
    title: "Happy Clients",
    icon: PhUsers,
  },
];
</script>
