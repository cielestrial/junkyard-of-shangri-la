<script setup lang="ts">
  defineProps<{ size: string }>();
</script>

<template>
  <svg
    class="flag-ro"
    :width="size"
    viewBox="0 0 3 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g :clip-path="`url(#clip0_210_35)`">
      <path d="M1 0H0V2H1V0Z" fill="#002B7F" />
      <path d="M2 0H1V2H2V0Z" fill="#FCD116" />
      <path d="M3 0H2V2H3V0Z" fill="#CE1126" />
    </g>
    <defs>
      <clipPath :id="`clip0_210_35`">
        <rect width="3" height="2" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
