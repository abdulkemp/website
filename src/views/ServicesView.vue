<template>
  <section class="w-full h-fit py-10 px-20 flex flex-col gap-5 scroll-mt-20 bg-gray-100">
    <div class="w-full h-full flex flex-col items-center justify-center">
      <h1 class="text-xs text-purple-800 pb-3" style="font-weight: 600">
        WHAT WE DO
      </h1>
      <p class="text-lg text-gray-700" style="font-weight: 600">
        End-to-end web solutions
      </p>
      <p class="text-lg text-gray-700" style="font-weight: 600">
        that drive results
      </p>
    </div>

    <div class="grid gap-5 md:grid-cols-1 lg:grid-cols-4">
      <BaseCard
        v-for="service in services"
        :key="service.title"
        padding="lg"
        variant="elevated"
        class="h-full flex flex-col gap-2 p-5"
      >
        <template #header>
          <div
            class="mb-8 grid h-12 w-12 place-items-center rounded-md border border-gray-100 bg-white text-purple-800"
          >
            <component :is="service.icon" :size="26" weight="bold" />
          </div>
          <h3 class="text-xl font-black text-slate-950 pt-2">
            {{ service.title }}
          </h3>
        </template>
        <p class="mt-4 leading-7 text-slate-600">{{ service.copy }}</p>
      </BaseCard>
    </div>
  </section>
</template>

<script setup>
import { BaseCard } from "@/components/UI";
import {
  PhCode,
  PhDevices,
  PhRocketLaunch,
  PhShield,
} from "@phosphor-icons/vue";

const services = [
  {
    icon: PhCode,
    title: "Custom Web development",
    copy: "We build tailor-made websites that are fast, responsive, and designed to convert visitors into customers.",
  },
  {
    icon: PhDevices,
    title: "Responsive Design",
    copy: "Our websites are optimized for all devices, ensuring a seamless user experience whether on desktop, tablet, or mobile.",
  },
  {
    icon: PhRocketLaunch,
    title: "Performance Optimization",
    copy: "We focus on speed and performance, ensuring your website loads quickly and runs smoothly to keep visitors engaged.",
  },
  {
    icon: PhShield,
    title: "Maintenance & Support",
    copy: "We provide ongoing maintenance and support to ensure your website remains up-to-date and performs at its best.",
  },
];
</script>
