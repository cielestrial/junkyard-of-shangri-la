<script setup lang="ts">
  import CollapsedNav from './CollapsedNav.vue';
  import MySwitch from './MySwitch.vue';
  import CountrySelect from './country/CountrySelect.vue';
  import MembersButton from './members/MembersButton.vue';

  const nav =
    'w-full h-16 flex py-3 justify-end select-none z-20 ' +
    'transition shadow-md dark:shadow-gray-900/50 ';

  const title =
    'title w-fit h-fit text-center cursor-default mx-auto z-0 my-10 ' +
    'text-4xl leading-tight sm:text-6xl sm:leading-none md:text-8xl md:leading-none ' +
    'transition text-black/90 dark:text-white/90 hover:animate-hue-rotate ' +
    'hover:text-yellow-700 dark:hover:text-yellow-500 ';
</script>

<template>
  <div class="flex h-fit w-full flex-col self-start">
    <aside id="aside" aria-label="Settings" :class="nav">
      <div
        id="settingsBar"
        class="mx-10 hidden items-end justify-center gap-x-8 sm:flex"
      >
        <MembersButton />
        <MySwitch />
        <CountrySelect />
      </div>
      <CollapsedNav class="block sm:hidden" />
    </aside>
    <header id="header">
      <h1 :class="title">
        Junkyard of
        <br />
        Shangri-La
      </h1>
    </header>
  </div>
</template>
