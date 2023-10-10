<script setup lang="ts">
  import { optionsArrayT, optionsList } from '../optionsList';
  import { api } from '../schemas';
  import SearchOptions from './SearchOptions.vue';
  import MyAnimations from '~/components/effects/MyAnimations.vue';
  import MyOverlay from '~/components/effects/MyOverlay.vue';
  import { cookieOptions } from '~/components/effects/effectUtils';
  import BIcons from '~/components/icons/BIcons.vue';
  import { consent } from '~/pages/index.vue';

  const { getSearchResults } = inject('api') as api;

  const searchBarRef = ref<HTMLInputElement | null>(null);
  const searchButtonRef = ref<HTMLButtonElement | null>(null);
  const optionsButtonRef = ref<HTMLButtonElement | null>(null);

  const searchItem = ref('');
  const opened = ref(false);

  const searchError = ref<string | null>(null);
  const optionsError = ref<string | null>(null);

  const searchOptions = ref<optionsArrayT>(optionsList);
  const _selectedOptions = ref<optionsArrayT | []>(searchOptions.value);
  const { hasConsent } = inject('consent') as consent;
  const selectedOptionsCookie = useCookie<any>(
    'selectedOptions',
    cookieOptions
  );

  if (
    hasConsent.value &&
    selectedOptionsCookie.value !== null &&
    selectedOptionsCookie.value instanceof Array
  ) {
    let flag = true;
    for (let i = 0, len = selectedOptionsCookie.value.length; i < len; i++) {
      flag = optionsList.includes(selectedOptionsCookie.value[i]);
      if (!flag) break;
    }
    if (flag) _selectedOptions.value = selectedOptionsCookie.value;
  }

  const selectedOptions = readonly(_selectedOptions);

  watch([searchItem, opened], ([newString, newValue]) => {
    if (newValue === false) validate('option');
    if (newString !== '') validate('search');
  });

  watch(_selectedOptions, (newVal) => {
    if (newVal.length > 0 && hasConsent.value)
      selectedOptionsCookie.value = newVal;
  });

  function setSelectedOptions(selected: optionsArrayT | []) {
    _selectedOptions.value = selected;
  }

  function submitForm(event: Event) {
    event.preventDefault();
    if (searchBarRef.value !== null) searchBarRef.value.blur();
    checkForm();
  }

  function checkForm() {
    validate('both');
    if (!searchError.value && !optionsError.value)
      getSearchResults(searchItem.value, _selectedOptions.value);
    else if (searchError.value && searchBarRef.value !== null)
      searchBarRef.value.focus();
    else if (optionsError.value && optionsButtonRef.value !== null)
      optionsButtonRef.value.focus();
  }

  function validate(form: 'search' | 'option' | 'both') {
    if (form === 'both' || form === 'search') {
      if (searchItem.value !== '') {
        const re = /^(?:\w+[-+']?\w* ?)+$/gi;
        const isValid = re.test(searchItem.value);
        if (!isValid) searchError.value = 'Invalid product name.';
        else searchError.value = null;
      } else searchError.value = 'Enter product name.';
    }

    if (form === 'both' || form === 'option') {
      if (_selectedOptions.value.length === 0)
        optionsError.value = 'At least one category must be selected.';
      else optionsError.value = null;
    }
  }

  function close() {
    opened.value = false;
    optionsButtonRef.value?.focus();
  }

  provide('options', { selectedOptions, setSelectedOptions });

  /*
  function updateText() {
    if (inputRef.value !== null) searchItem.value = inputRef.value.value;
  }
  */

  const border = 'border-4 rounded transition ';
  const searchGroup =
    'w-fit h-fit flex flex-wrap justify-center gap-2 px-2 sm:px-5 mx-auto mb-4 ';
  const searchBar = computed(
    () =>
      'w-64 sm:w-[20rem] lg:w-[35rem] h-14 font-bold text-black/90 bg-white ' +
      'dark:text-white/90 dark:bg-gray-800 shadow dark:shadow-gray-900/50 ' +
      'bg-no-repeat bg-[0.5rem] pl-10 pr-2 ' +
      'bg-search-light dark:bg-search-dark ' +
      (searchError.value
        ? 'border-red-400 '
        : 'border-gray-700 dark:border-gray-400 ') +
      border
  );
  const _button =
    'w-fit h-14 shadow dark:shadow-gray-900/50 p-2 ' +
    'active:scale-95 active:bg-gray-400 hover:bg-gray-300 ' +
    //  'focus-visible:bg-gray-300 ' +
    'text-black/90 bg-white dark:text-white/90 dark:bg-gray-800 ' +
    border;
  const searchButton =
    _button + 'font-bold border-gray-700 dark:border-gray-400 ';
  const optionsButton = computed(
    () =>
      _button +
      (optionsError.value
        ? 'border-red-400 '
        : 'border-gray-700 dark:border-gray-400 ')
  );
</script>

<template>
  <form
    id="search"
    role="search"
    class="relative mx-auto mb-12 mt-5 h-fit w-full"
    action="/"
    method="post"
    novalidate
    @sumbit.prevent
  >
    <div :class="searchGroup">
      <!-- v-model doesn't work with IME languages like Japanese -->
      <!--  incase:     @compositionupdate="updateText" -->
      <input
        id="searchBar"
        ref="searchBarRef"
        v-model.lazy.trim="searchItem"
        name="searchBar"
        type="search"
        :class="searchBar"
        maxlength="100"
        autocomplete="off"
        required
        aria-autocomplete="none"
        :aria-invalid="searchError !== null"
        aria-describedby="searchError"
        @keydown.enter="submitForm"
      />
      <span class="flex flex-nowrap gap-2">
        <button
          id="searchButton"
          ref="searchButtonRef"
          name="searchButton"
          type="submit"
          :class="searchButton"
          @click="submitForm"
        >
          Search
        </button>

        <button
          id="optionsButton"
          ref="optionsButtonRef"
          name="optionsButton"
          type="button"
          :class="optionsButton"
          aria-label="Search Options"
          aria-required="true"
          :aria-invalid="optionsError !== null"
          aria-describedby="optionsError"
          @click="opened = !opened"
        >
          <BIcons
            class="mx-2 -rotate-45 rounded-full"
            icon="gear-fill"
            size="1.5rem"
          />
        </button>
      </span>

      <Teleport to="body">
        <MyAnimations name="fade">
          <MyOverlay v-if="opened" z="z-20" />
        </MyAnimations>
        <MyAnimations name="scale">
          <SearchOptions v-if="opened" @close="close" />
        </MyAnimations>
      </Teleport>
    </div>
    <div class="flex h-fit w-full text-red-400">
      <span class="min-h-40 mx-auto w-40 sm:w-80 md:w-[30rem]">
        <ul class="flex list-outside list-disc flex-col gap-2">
          <li v-if="searchError">
            <p id="searchError">{{ searchError }}</p>
          </li>
          <li v-if="optionsError">
            <p id="optionsError">{{ optionsError }}</p>
          </li>
        </ul>
      </span>
    </div>
  </form>
</template>