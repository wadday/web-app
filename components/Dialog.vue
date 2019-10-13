<template>
  <transition name="modal">
  <div class="modal-mask" v-show="show">
    <div class="modal-wrapper">
      <div class="container max-w-sm mx-auto mt-5 flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-white w-full rounded-lg shadow-md">
          <button class="absolute z-40 rounded-full p-2">
            <icon icon="close" class="text-red-500"></icon>
          </button>
          <div v-if="title" class="rounded-lg shadow-md rounded-b-none text-center font-light w-full bg-gray-100 text-gray-800 px-2 py-2">
            <h2 class="text-2xl">{{ title }}</h2>
          </div>

          <div class="px-6 py-8 text-gray-700 overflow-auto text-center" style="max-height: calc(100vh - 150px);">
            {{ message }}
          </div>

          <div class="flex justify-between border-t text-gray-700">
            <button class="rounded-bl-lg bg-white p-3 w-full hover:bg-gray-200" @click="cancelClicked">{{ cancelText }}</button>
            <button class="rounded-br-lg bg-white border-l p-3 w-full hover:bg-gray-200" @click="okClicked">{{ okText }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
  import Icon from "./Icon";
  export default {
    name: 'Dialog',
    components: {Icon},
    props: {
      okText: {
        type: String,
        default: 'OK'
      },
      cancelText: {
        type: String,
        default: 'CANCEL'
      },
      show: {
        type: Boolean,
        required: true,
        default: false
      },
      message: {
        required: true,
        default: 'Are you sure?'
      },
      title: {
        type: String,
        default: 'title'
      }
    },
    methods: {
      okClicked() {
        this.$emit('ok')
      },
      cancelClicked() {
        this.$emit('cancel')
      }
    }
  }
</script>


<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 250px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    max-width: 100%;
    box-sizing: border-box;
  }
  .modal-container:after{
    content: '';
    display: inline-block;
    height: 0;
    width: 0;
    clear: both;
  }
  .modal-header {
    padding: 10px 20px 0;
    text-align: center;
    font-size: 16px;
  }
  .modal-body {
    padding: 20px;
    text-align: center;
    font-size: 14px;
  }
  .modal-footer {
    border-top: 1px solid #cdc7c7;
    display: -webkit-box;
    display: -moz-box;
    display: flex;
    width: 100%;
  }
  .modal-footer button {
    -moz-box-flex: 1;
    box-flex: 1;
    -webkit-box-flex: 1;
    display: block;
    color: #999;
    text-align: center;
    padding: 15px 0px;
    text-decoration: none;
    border: none;
  }
  .modal-footer button:first-child {
    color: #ff8903;
    border-right: 1px solid #cdc7c7;
  }
  .border-none{
    border: none !important;
  }
  /*
   * the following styles are auto-applied to elements with
   * v-transition="modal" when their visiblity is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
  .modal-enter, .modal-leave {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
