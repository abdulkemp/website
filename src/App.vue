<template>
  <div class="h-screen w-full bg-white text-slate-950">
    <Navbar class="w-full h-fit flex flex-col justify-between items-center border border-black"/>

    <main class="w-full h-fit flex flex-col justify-center items-center">
      <HomeView id="home" class="w-full h-fit flex flex-col justify-center items-center" />
      <AboutView id="about" class="w-full h-fit flex flex-col justify-center items-center" />
      <ServicesView id="services" class="w-full h-fit flex flex-col justify-center items-center" />
      <WorkView id="work" class="w-full h-fit flex flex-col justify-center items-center" />
      <ProcessView id="process" class="w-full h-fit flex flex-col justify-center items-center" />
      <ReviewsView id="review" class="w-full h-fit flex flex-col justify-center items-center" />
      <ContactView id="contact" class="w-full h-fit flex flex-col justify-center items-center" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import AboutView from "./views/AboutView.vue";
import ContactView from "./views/ContactView.vue";
import HomeView from "./views/HomeView.vue";
import ProcessView from "./views/ProcessView.vue";
import ServicesView from "./views/ServicesView.vue";
import WorkView from "./views/WorkView.vue";
import ReviewsView from "./views/ReviewsView.vue";
import Footer from "./components/Footer.vue";
const route = useRoute();

const sectionByPath = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/work": "work",
  "/process": "process",
  "/contact": "contact",
  "/review": "review",
};

watch(
  () => route.path,
  async (path) => {
    await nextTick();

    const sectionId = sectionByPath[path] || "home";
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
  { immediate: true }
);
</script>
