<template>
  <section
    class="w-full h-fit py-10 px-10 flex flex-col gap-5 scroll-mt-20 bg-gray-100"
  >
    <div class="w-full h-full flex flex-col items-center justify-center">
      <h3 class="text-purple-600" style="font-weight: 600">GET IN TOUCH</h3>
    </div>
    <div class="flex h-160 w-full items-stretch gap-10 px-20">
      <div class="flex h-full w-full flex-col gap-3 px-15">
        <div class="w-full h-fit flex flex-col items-start gap-5">
          <h3
            class="text-start text-black mt-2"
            style="font-size: 3rem; font-weight: 600"
          >
            Let's build something amazing together.
          </h3>
        </div>
        <div class="w-full h-fit flex items-start flex-col pb-5">
          <p class="text-start text-gray-600 w-[80%]">
            Have a project in mind or want to learn more about our services?
            Send us a message and we'll get back to you as soon as possible. We
            look forward to hearing from you!
          </p>
        </div>

        <div class="flex min-h-0 w-full flex-1 flex-col items-start gap-5">
          <div class="w-full h-fit flex items-start gap-5">
            <div class="w-fit h-fit flex items-center gap-2">
              <div
                class="w-fit h-fit p-3 bg-gray-200 rounded-xl text-purple-600"
              >
                <PhEnvelopeSimple :size="20" weight="bold" />
              </div>
            </div>
            <div>
              <h4 class="text-sm text-gray-500">Email</h4>
              <p class="text-sm text-gray-600">hello@codepeak.com</p>
            </div>
          </div>
          <div class="w-full h-fit flex items-start gap-5">
            <div class="w-fit h-fit flex items-center gap-2">
              <div
                class="w-fit h-fit p-3 bg-gray-200 rounded-xl text-purple-600"
              >
                <PhPhone :size="20" weight="bold" />
              </div>
            </div>
            <div>
              <h4 class="text-sm text-gray-500">Phone</h4>
              <p class="text-sm text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
          <div class="w-full h-fit flex items-start gap-5">
            <div class="w-fit h-fit flex items-center gap-2">
              <div
                class="w-fit h-fit p-3 bg-gray-200 rounded-xl text-purple-600"
              >
                <PhMapPinArea :size="20" weight="bold" />
              </div>
            </div>
            <div>
              <h4 class="text-sm text-gray-500">Office</h4>
              <p class="text-sm text-gray-600">
                123 Main Street, City, State 12345
              </p>
            </div>
          </div>
          <div class="w-full h-fit flex items-start gap-5">
            <div class="w-fit h-fit flex items-center gap-2">
              <div
                class="w-fit h-fit p-3 bg-gray-200 rounded-xl text-purple-600"
              >
                <PhClock :size="20" weight="bold" />
              </div>
            </div>
            <div>
              <h4 class="text-sm text-gray-500">Business Hours</h4>
              <p class="text-sm text-gray-600">
                Monday - Friday, 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>

          <div class="w-fit h-fit flex gap-5 justify-between items-center pt-5">
            <p class="p-2 bg-gray-200 rounded-xl">
              <PhInstagramLogo :size="20" weight="bold" />
            </p>
            <p class="p-2 bg-gray-200 rounded-xl">
              <PhLinkedinLogo :size="20" weight="bold" />
            </p>
            <p class="p-2 bg-gray-200 rounded-xl">
              <PhFacebookLogo :size="20" weight="bold" />
            </p>
            <p class="p-2 bg-gray-200 rounded-xl">
              <PhXLogo :size="20" weight="bold" />
            </p>
          </div>
        </div>
      </div>
      <div class="h-full w-full">
        <form
          class="mx-auto flex h-full w-full flex-col gap-6 overflow-hidden rounded-2xl bg-white p-8 shadow-md"
          @submit.prevent
        >
          <h3 class="text-start text-black" style="font-weight: 600">
            Send us a message
          </h3>
          <div class="flex-1 w-full h-full flex flex-col gap-5 overflow-y-auto">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="grid gap-3">
                <label class="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <BaseInput
                  v-model="form.fullName"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div class="grid gap-3">
                <label class="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <BaseInput
                  v-model="form.email"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>
            <div class="grid gap-3">
              <label class="block text-sm font-medium text-gray-700">
                Company (optional)
              </label>
              <BaseInput
                v-model="form.company"
                type="company"
                placeholder="Your company name"
                required
              />
            </div>

            <div class="grid gap-3">
              <label class="block text-sm font-medium text-gray-700">
                Project Type
              </label>
              <BaseDropdown
                v-model="form.projectType"
                :options="projectTypes"
                placeholder="Select a project type"
                :full-width="true"
                trigger-class="py-2.5"
              />
            </div>

            <div class="grid gap-3">
              <label class="block text-sm font-medium text-gray-700">
                Message
              </label>
              <BaseTextarea
                v-model="form.message"
                placeholder="Tell us what you want to build"
                rows="3"
                required
              />
            </div>
            <div class="flex justify-start">
              <BaseButton
                variant="primary"
                class="cursor-pointer border-0"
                type="submit"
              >
                <p
                  class="rounded-md px-3 py-1 text-sm font-bold text-white lg:inline-flex w-fit items-center gap-2"
                >
                  Send Messages <PhArrowRight :size="20" />
                </p>
              </BaseButton>
            </div>
          </div>
          <p
            class="py-1 text-xs text-slate-500 lg:inline-flex w-fit items-center gap-2"
          >
            <PhShieldCheck :size="16" /> We respect your privacy. Your
            information will not be shared with any third parties.
          </p>
        </form>
      </div>
    </div>
  </section>
  <section class="w-full h-fit py-10 px-30 flex flex-col gap-5 scroll-mt-20 bg-gray-100">
    <div
      class="w-full h-fit py-10 rounded-2xl flex flex-col gap-5 scroll-mt-20 bg-white"
    >
      <div class="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(step, index) in steps"
          :key="step.title"
          class="relative flex flex-col items-start"
        >
          <div
            v-if="index !== steps.length - 1"
            class="absolute -right-4 top-1/2 z-0 hidden h-12 w-px -translate-y-1/2 bg-slate-300 lg:block"
          ></div>
          <div class="w-full h-fit flex gap-7 justify-center items-center">
            <div
              class="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 text-purple-800 mix-blend-multiply"
            >
              <component
                :is="step.icon"
                class=" text-purple-800"
                :size="20"
                weight="bold"
              />
            </div>

            <div class="z-10 w-50 flex flex-col items-start gap-1">
              <h3 class="text-md font-bold text-black" style="font-weight: 600">
                {{ step.number }}
              </h3>
              <p
                class="mt-1 font-bold text-slate-600"
                style="font-weight: 600; font-size: 10px;"
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
import {
  PhArrowRight,
  PhShieldCheck,
  PhPhone,
  PhEnvelopeSimple,
  PhMapPinArea,
  PhClock,
  PhInstagramLogo,
  PhLinkedinLogo,
  PhFacebookLogo,
  PhXLogo,
  PhLightning,
  PhMedal,
  PhLock,
  PhUsers
} from "@phosphor-icons/vue";
import { reactive } from "vue";
import {
  BaseButton,
  BaseDropdown,
  BaseInput,
  BaseTextarea,
} from "@/components/UI";

const form = reactive({
  fullName: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
});

const projectTypes = [
  { label: "New website", value: "new-website" },
  { label: "Website redesign", value: "website-redesign" },
  { label: "Landing page", value: "landing-page" },
  { label: "Ongoing support", value: "ongoing-support" },
];
const steps = [
  {
    number: "Quick Response",
    title: "We reply within 24 hours to all enquiries.",
    icon: PhLightning,
  },
  {
    number: "Tailored Solutions",
    title: "We create custom solutions that fit your unique needs.",
    icon: PhMedal,
  },
  {
    number: "Confidential & Secure",
    title: "Your information is protected with industry-standard security measures.",
    icon: PhLock,
  },
  {
    number: "Long-term Partnerships",
    title: "We're committed to building lasting relationships with our clients.",
    icon: PhUsers,
  },
];
</script>
