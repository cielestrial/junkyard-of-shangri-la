<script setup lang="ts">
  import { inject } from 'vue-demi';
  import MyAnimations from '../effects/MyAnimations.vue';
  import BIcons from '../icons/BIcons.vue';
  import type { theme } from '~/pages/index.vue';

  const { darkTheme, changeTheme } = inject('theme') as theme;

  function keyboardHandler(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (!event.repeat) changeTheme();
      event.preventDefault();
    }
  }

  const outer =
    'relative flex border-4 box-content rounded-full w-14 h-8 ' +
    'cursor-pointer transition bg-sky-300 border-gray-600 ' +
    'dark:bg-gray-900 dark:border-gray-400 ';

  const inner =
    'rounded-full box-content w-6 h-6 flex self-center my-auto ' +
    'border-2 transition bg-white border-gray-700 translate-x-[0.1rem] ' +
    'dark:bg-sky-700 dark:border-gray-300 dark:translate-x-[1.65rem] ' +
    'text-black dark:text-white ';
</script>

<template>
  <div
    role="switch"
    tabindex="0"
    aria-label="Dark Theme"
    :aria-checked="darkTheme"
    :class="outer"
    @click="changeTheme"
    @keydown="keyboardHandler"
  >
    <div :class="inner">
      <ClientOnly>
        <MyAnimations name="switch">
          <span v-if="darkTheme" class="m-auto">
            <BIcons icon="moon-stars-fill" size="0.8rem" />
          </span>
          <span v-else class="m-auto">
            <BIcons icon="cloud-sun" size="1.1rem" />
          </span>
        </MyAnimations>
      </ClientOnly>
    </div>
  </div>
</template>
