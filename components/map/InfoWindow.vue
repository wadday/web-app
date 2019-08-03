<template>
  <div id="marker_info" class="absolute top-0 left-0 w-full bg-dim h-full z-50 mt-12">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Add Missing Place</h1>
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

        <select name="district" v-model="form.district" class="block border border-grey-light w-full p-3 rounded mb-4">
          <option v-for="(district, index) in districts" :key="'district-'+index" :value="district">{{ district }}</option>
        </select>

        <select name="marker_type_id" v-model.number="form.marker_type_id" class="block border border-grey-light w-full p-3 rounded mb-4">
          <option v-for="type in types" :key="'marker-type-'+type.id" :value="type.id">{{ type.name }}</option>
        </select>


        <button
          @click="saveLocation"
          type="button"
          class="w-full text-center py-3 rounded bg-blue-light text-white hover:bg-green-dark focus:outline-none my-1"
        >Add Location</button>

        <div class="text-center text-sm text-grey-dark mt-4">
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
</template>

<script>
  export default {
      name: 'InfoWindow',

      props: {
          position: {
              type: Object,
              required: true
          }
      },
      data() {
          return {
              form: {
                  name: null,
                  address: null,
                  district: null,
                  marker_type_id: null,
                  lat: this.position.lat,
                  long: this.position.lng
              },
              types: [],
              districts: [
                  'Dhadimagu', 'Dhiguvaandu', 'Hoadhadu', 'Maadhadu', 'Miskiymagu', 'Malegan', 'Funaadu', 'Dhoodigan'
              ],
              tags: ['Food', 'Attractions', 'Shops', 'Mosques', 'Stay', 'Services']
          }
      },

      methods: {
          fetch() {
              this.$axios.$get('/api/marker-types')
                  .then(result => {
                      console.log(result);
                      this.types = result;
                  })
                  .catch(() => {

                  });
          },

          saveLocation() {
              if (!this.isInValid) {
                  alert('lets do')
              } else {
                  alert('dorry')
              }
          }
      },

      computed: {
          isInValid() {
             let invalid = false;
               Object.keys(this.form).forEach(key => {
                   invalid += this.form[key] === null;
               })
             return invalid;
         }
      },
      mounted() {
          this.fetch();
      }
  }
</script>