<template>
<!--  <div class="w-screen h-screen bg-white flex ">-->
    <div class="absolute top-0 left-0  w-full bg-white h-full pt-10">
      <button class="absolute right-0 top-0 mt-2 mr-2 p-2 rounded-full h-10 w-10" @click="$emit('close')">
        <icon icon="close" class="text-gray-500"></icon>
      </button>
      <div class="relative w-5/6 mx-auto mb-6">
      <h4 class="text-xl font-bold leading-none text-gray-800">Explore</h4>
      <h1 class="font-sans text-4xl font-bold leading-none text-gray-800 tracking-wide">Fuvahmulah</h1>


      <flex-row class="flex-wrap">
        <dashboard-icon title="Food" id="foods" icon="cutlery" bg-color="bg-blue-light shadow-food" icon-color="text-white"></dashboard-icon>
        <dashboard-icon title="Attractions" id="attractions" icon="attraction" bg-color="bg-orange-light shadow-attraction" icon-color="text-white"></dashboard-icon>
        <dashboard-icon title="Shops" id="shops" icon="shop" bg-color="bg-red-500 shadow-shop" icon-color="text-white"></dashboard-icon>
        <dashboard-icon title="Mosques" id="mosques" icon="mosque" bg-color="bg-green-light shadow-masjid" icon-color="text-white"></dashboard-icon>
        <dashboard-icon title="Stay" id="stay" icon="accommodation" bg-color="bg-green-mid shadow-stay" icon-color="text-white"></dashboard-icon>
        <dashboard-icon title="Services" id="services" icon="telephone" bg-color="bg-pink-light shadow-service" icon-color="text-white"></dashboard-icon>
        <dashboard-icon title="Maps" id="maps" icon="direction" bg-color="bg-purple-600 shadow-map" icon-color="text-white"></dashboard-icon>
        <dashboard-icon title="Add Place" id="add-place" icon="marker" bg-color="bg-gray-400 shadow-place" icon-color="text-white" @add-place="$emit('add-place')"></dashboard-icon>
      </flex-row>

      <div class="mt-12">
        <h4 class="text-xl font-bold leading-none text-gray-800 mb-6">Popular this week</h4>

        <card></card>

      </div>

    </div>
    </div>
<!--  </div>-->
</template>

<script>
  import FlexRow from "./FlexRow";
  import Icon from "./Icon";
  import DashboardIcon from "./DashboardIcon";
  import Card from "./Card";
  export default {
    name: 'Explore',
    components: {Card, DashboardIcon, Icon, FlexRow}
  }
</script>
