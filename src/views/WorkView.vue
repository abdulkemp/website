<template>
  <section
    class="w-full h-fit py-10 px-20 flex flex-col gap-5 scroll-mt-20"
  >
    <div class="w-full h-full flex items-center justify-between gap-2">
      <div>
        <h1 class="text-xs text-purple-800" style="font-weight: 600">
          Our Work
        </h1>
        <p class="text-lg text-gray-700" style="font-weight: 600">
          Some of our recent projects
        </p>
      </div>
      <div>
        <RouterLink
          to="/"
          class="rounded-md px-3 py-1 text-sm font-bold text-black lg:inline-flex w-fit items-center gap-2"
          style="font-weight: 500"
        >
          View All Projects <PhArrowRight :size="18" />
        </RouterLink>
      </div>
    </div>

    <div class="grid w-full auto-rows-fr gap-5 md:grid-cols-1 lg:grid-cols-3">
      <BaseCard
        v-for="service in services"
        :key="service.title"
        variant="elevated"
        class="flex h-full min-h-85 flex-col overflow-hidden"
      >
        <template #header>
          <div
            class="aspect-16/10 w-full overflow-hidden rounded-xl bg-slate-100"
          >
            <img
              :src="service.image"
              alt="Project Image"
              class="h-full w-full object-cover"
            />
          </div>
        </template>
        <div class="flex h-full w-full flex-1 flex-col p-5">
          <h3 class="text-xl font-black text-slate-950" style="font-weight: 600;">
            {{ service.title }}
          </h3>
          <p class="mt-3 leading-7 text-slate-600 w-full flex items-center justify-between">{{ service.copy }} <PhArrowRight :size="18" /></p>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<script setup>
import { BaseCard } from "@/components/UI";
import { PhArrowRight } from "@phosphor-icons/vue";
import project1 from "@/assets/project1.png";
import project2 from "@/assets/project2.png";
import project3 from "@/assets/project3.png";

const services = [
  {
    image: project1,
    title: "Arche",
    copy: "Web Development",
  },
  {
    image: project2,
    title: "Nourish",
    copy: "Web Design & Development",
  },
  {
    image: project3,
    title: "StudioX",
    copy: "Web Development",
  },
];
</script>
