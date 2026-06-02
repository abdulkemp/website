<template>
  <footer class="bg-gray-800 text-white py-10 px-30 h-fit ">
    <div class="flex w-full gap-12 justify-center items-start pb-5">
      <div class="w-[25%] h-fit">
        <div class="w-full h-fit flex flex-col gap-1">
          <div class="flex items-start gap-1 h-full">
            <PhCode class="w-6 h-6" weight="bold" />
            <span class="ml-2 text-lg" style="font-weight: 600">CodePeak</span>
          </div>
          <p class="w-[80%]">
            We build fast, responsive and scalable websites that help your
            business grow.
          </p>
          <div class="w-fit h-fit flex gap-5 justify-between items-center pt-5">
            <p class="p-2 bg-gray-700 rounded-xl">
              <PhInstagramLogo :size="20" weight="bold" />
            </p>
            <p class="p-2 bg-gray-700 rounded-xl">
              <PhLinkedinLogo :size="20" weight="bold" />
            </p>
            <p class="p-2 bg-gray-700 rounded-xl">
              <PhFacebookLogo :size="20" weight="bold" />
            </p>
            <p class="p-2 bg-gray-700 rounded-xl">
              <PhXLogo :size="20" weight="bold" />
            </p>
          </div>
        </div>
      </div>
      <div class="w-[50%] h-fit">
        <div class="w-full h-fit flex gap-10 justify-between items-start">
          <div class="w-fit h-fit flex flex-col gap-1">
            <h3 class="text-lg font-bold" style="font-weight: 600">Services</h3>
            <p>Development</p>
            <p>E-commerce</p>
            <p>SEO Optimization</p>
            <p>Maintenance & Support</p>
          </div>
          <div class="w-fit h-fit flex flex-col gap-1">
            <h3 class="text-lg font-bold" style="font-weight: 600">Company</h3>
            <p>About Us</p>
            <p>Our Work</p>
            <p>Careers</p>
            <p>Blog</p>
            <p>Contact</p>
          </div>
          <div class="w-fit h-fit flex flex-col gap-1">
            <h3 class="text-lg font-bold" style="font-weight: 600">
              Resources
            </h3>
            <p>Articles</p>
            <p>Case Studies</p>
            <p>FAQS</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </div>
      <div class="w-[25%] h-fit">
        <div class="w-full h-fit flex flex-col gap-4 justify-between items-start">
          <div class="w-fit h-fit flex flex-col gap-1 mb-4">
            <h3 class="text-lg font-bold" style="font-weight: 600">
              NEWSLETTER
            </h3>
            <p class="w-[80%]">Get the latest insights and updates delivered to your inbox.</p>
          </div>
          <BaseInput
            v-model="newsletterEmail"
            type="email"
            placeholder="Enter your email"
            wrapper-class="overflow-hidden rounded-xl bg-white p-1"
            input-class="border-0 bg-transparent px-3 py-2 focus:ring-0"
            append-class="border-0 bg-transparent p-0"
          >
            <template #append>
              <BaseButton
                type="button"
                size="sm"
                class="rounded-lg border-gray-700 bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
              >
                Subscribe
              </BaseButton>
            </template>
          </BaseInput>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-500"></div>
    <div class="w-full h-fit flex justify-between items-center pt-5">
        <p>&copy; 2023 CodePeak. All rights reserved.</p>
        <p>Designed by CodePeak Team</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { BaseButton, BaseInput } from "@/components/UI";
import {
  PhInstagramLogo,
  PhLinkedinLogo,
  PhFacebookLogo,
  PhXLogo,
  PhCode,
} from "@phosphor-icons/vue";

const newsletterEmail = ref("");
</script>
