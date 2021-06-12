<template>
  <client-only>
    <div class="border-[50px] border-green-400 h-full w-full p-12 font-body flex flex-col justify-center">
      <div>
        <div class="flex items-center">
          <div class="mr-4 w-24 h-24 rounded-full flex items-center justify-center bg-green-300">
            <Logo class="w-20" />
          </div>

          <h1 class="text-[40px] font-extrabold text-gray-800">
            The Plant Master
          </h1>
        </div>
      </div>

      <div class="flex-grow w-2/3 py-12 flex items-center">
        <div>
          <h2 class="font-extrabold text-gray-900 text-[90px] leading-none">
            {{ $route.query.title }}
          </h2>

          <div class="mt-8 flex items-center">
            <div v-if="$route.query.authorImage" class="h-20 w-20 rounded-full overflow-hidden mr-6">
              <img class="w-full h-full object-cover" :src="$route.query.authorImage" alt="Avatar">
            </div>

            <div>
              <p v-if="$route.query.authorName" class="text-4xl text-gray-700 font-medium">
                {{ $route.query.authorName }}
              </p>
              <p v-if="$route.query.date" class="text-3xl text-gray-500">
                {{ $route.query.date }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex text-gray-500">
        <p class="text-4xl mr-12">
          https://www.theplantmaster.com
        </p>
        <p class="text-4xl">
          @plantmaster
        </p>
      </div>
    </div>
  </client-only>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
