import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    let counterValue = ref(0);

    function incrementBtn() {
      counterValue.value++
    }

    function decrementBtn() {
      counterValue.value--
    }

    return {
      counterValue,
      incrementBtn,
      decrementBtn,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="decrementBtn"
        :disabled="counterValue < 1"
      >➖
      </button>

      <span class="count" data-testid="count"> {{ counterValue }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="incrementBtn"
        :disabled="counterValue > 4"
      >➕
      </button>
    </div>
  `,
})
