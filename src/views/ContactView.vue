<template>
  <section class="scroll-mt-20 bg-cyan-400 px-5 py-24 text-slate-950 sm:px-8 lg:px-10">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <p class="text-sm font-black uppercase">Contact</p>
        <h2 class="mt-4 text-4xl font-black leading-tight sm:text-6xl">
          Ready for a website people actually use?
        </h2>
        <p class="mt-6 max-w-xl text-lg font-semibold leading-8 text-slate-800">
          Tell us what you are building, what is stuck, or what needs to launch. We will reply with next steps within one business day.
        </p>
      </div>

      <form class="grid gap-4 rounded-lg bg-white p-6 shadow-xl shadow-cyan-700/20">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="grid gap-2 text-sm font-black">
            Name
            <input class="rounded-md border border-slate-300 px-4 py-3 font-semibold outline-none transition focus:border-slate-950" type="text" placeholder="Your name" />
          </label>
          <label class="grid gap-2 text-sm font-black">
            Email
            <input class="rounded-md border border-slate-300 px-4 py-3 font-semibold outline-none transition focus:border-slate-950" type="email" placeholder="you@example.com" />
          </label>
        </div>
        <label class="grid gap-2 text-sm font-black">
          Project type
          <select class="rounded-md border border-slate-300 px-4 py-3 font-semibold outline-none transition focus:border-slate-950">
            <option>New website</option>
            <option>Website redesign</option>
            <option>Landing page</option>
            <option>Ongoing support</option>
          </select>
        </label>
        <label class="grid gap-2 text-sm font-black">
          Message
          <textarea class="min-h-36 rounded-md border border-slate-300 px-4 py-3 font-semibold outline-none transition focus:border-slate-950" placeholder="What do you want this website to do?"></textarea>
        </label>
        <button type="submit" class="rounded-md bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-slate-800">
          Send message
        </button>
      </form>
    </div>
  </section>
</template>
