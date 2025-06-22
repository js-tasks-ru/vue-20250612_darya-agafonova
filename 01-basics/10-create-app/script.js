import {defineComponent, createApp} from 'vue'

const dateApp = createApp({
  name: 'dateApp',
  setup() {
    function getFormatDate() {
      const date = new Date();
      let formatDate = date.toLocaleDateString("en-US", {dateStyle: 'long'});

      return 'Сегодня ' + formatDate;
    }

    return {
      getFormatDate,
    }
  },
  'template': '<div>{{ getFormatDate() }}</div>'
})

const vm = dateApp.mount("#app")
