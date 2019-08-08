<template>
  <div id="marker_info" class="fixed top-0 left-0 w-full bg-dim h-full z-50 mt-10">
    <div class="container max-w-sm mx-auto mt-5 flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white w-full rounded shadow-md">
        <div class="flex justify-between rounded shadow-md rounded-b-none items-center w-full bg-gray-100 text-gray-800 px-5 py-2">
          <h2 class="text-xl">Add Place</h2>
          <button class="rounded-full p-2" @click="saveLocation" :disabled="isValid  !== 0">
            <icon icon="paper-plane" class="h-6" :class="{'text-gray-200': isValid !== 0, 'text-blue-light': isValid === 0}"></icon>
          </button>
        </div>
        <div class="px-6 py-8 text-black overflow-auto" style="max-height: calc(100vh - 150px);">
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            placeholder="Name" v-model="form.name" />

          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="address"
            placeholder="Address" v-model="form.address" />

          <select name="district" v-model="form.district" class="block border border-grey-light w-full p-3 rounded mb-4 bg-white">
            <option v-for="(district, index) in districts" :key="'district-'+index" :value="district">{{ district }}</option>
          </select>

          <select name="marker_type_id" v-model.number="form.marker_type_id" class="block border border-grey-light w-full p-3 rounded mb-4 bg-white">
            <option v-for="type in types" :key="'marker-type-'+type.id" :value="type.id">{{ type.name }}</option>
          </select>

          <vue-tags
            class="relative w-full"
            :active="form.tags"
            :all="tags"
            :tab-index="1"
            :tag-color-default="'lightseagreen'"
            tag-list-label="Tags"
            placeholder="Select an option"
            @on-tag-added="tagAdded"
            @on-tag-removed="tagRemoved"
          ></vue-tags>

          <div class="text-center text-sm text-grey-dark mt-10">
            By adding the location, you agree to the
            <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Terms of Service
            </a> and
            <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Icon from "../Icon";
  export default {
      name: 'InfoWindow',
      components: {Icon},
      props: {
          position: {
              type: Object,
              required: true
          }
      },
      data() {
          return {
              tags: [
                  { "id": 1, "name": "Food" },
                  { "id": 2, "name": "Attractions" },
                  { "id": 3, "name": "Shops" },
                  { "id": 4, "name": "Mosques" },
                  { "id": 5, "name": "Stay" },
                  { "id": 6, "name": "Services" },
              ],
              form: {
                  name: null,
                  address: null,
                  district: null,
                  marker_type_id: null,
                  lat: this.position.lat,
                  long: this.position.lng,
                  tags: []
              },
              types: [],
              districts: [
                  'Dhadimagu', 'Dhiguvaandu', 'Hoadhadu', 'Maadhadu', 'Miskiymagu', 'Malegan', 'Funaadu', 'Dhoodigan'
              ],
          }
      },

      methods: {
          fetch() {
              this.$axios.$get('/api/marker-types')
                  .then(result => {
                      this.types = result;
                  })
                  .catch(() => {

                  });
          },

          tagAdded(item) {
              this.form.tags.push(item)
          },
          tagRemoved(tag) {
              this.form.tags.splice(this.form.tags.indexOf(tag), 1);
          },

          saveLocation() {
              this.$axios.$post('/api/markers', this.form, {
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              })
                  .then(result => {
                      console.log(result)
                  })
                  .catch(error => {
                      console.log('error', error)
                  })
          }
      },

      computed: {
          //TODO:: validation
          isValid() {
             let invalid = false;
               Object.keys(this.form).forEach(key => {
                   invalid += this.form[key] === null || this.form[key] === '';
               })
              if (this.form.tags && this.form.tags.length <= 0) {
                  invalid += 1;
              }
             return invalid;
         }
      },
      mounted() {
          this.fetch();
      }
  }
</script>