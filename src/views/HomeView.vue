<template>
  <section
    class="relative isolate flex h-fit flex-row items-center overflow-hidden bg-white text-black sm:px-8 lg:px-10"
  >
    <div class="w-1/2 h-fit">
      <div class="w-fit flex flex-col gap-9">
        <div
          class="w-fit py-1 px-3 bg-gray-100 rounded-3xl flex items-center gap-2"
        >
          <span class="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
          <h2>Web Development Agency</h2>
        </div>
        <h1 class="text-6xl">
          We build fast, responsive and scalable websites.
        </h1>
        <p class="text-lg text-gray-600 w-3/4">
          We help businesses grow online with custom websites that are modern,
          high-performing and built to scale.
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <BaseButton
            class="shadow-sm shadow-cyan-500/20 transition hover:bg-slate-500 cursor-pointer"
          >
            <RouterLink
              to="/contact"
              class="rounded-md px-3 py-1 text-sm font-bold text-white lg:inline-flex w-fit items-center gap-2"
            >
              View Our Work <PhArrowRight :size="16" />
            </RouterLink>
          </BaseButton>

          <BaseButton
            variant="ghost"
            class="cursor-pointer border-0"
          >
            <RouterLink
              to="/contact"
              class="rounded-md px-3 py-1 text-sm font-bold text-black lg:inline-flex w-fit items-center gap-2"
            >
              Explore Services <PhArrowRight :size="16" />
            </RouterLink>
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="p-4 w-1/2">
      <img
        src="/src/assets/dashboard1.png"
        alt=""
        class="w-full object-contain drop-shadow-[0_10px_10px_rgba(15,23,42,0.28)]"
      />
    </div>
  </section>
  <section>
    
  </section>
</template>

<script setup>
import { BaseButton } from "@/components/UI";
import { PhArrowRight } from "@phosphor-icons/vue";
import { RouterLink } from "vue-router";
</script>
