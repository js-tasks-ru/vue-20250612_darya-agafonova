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

    function isDecrementDisable() {
      return +counterValue.value < 1
    }

    function isIncrementDisable() {
      return +counterValue.value > 4
    }

    function getCounterValue() {
      return counterValue.value
    }

    return {
      counterValue,
      incrementBtn,
      decrementBtn,
      isIncrementDisable,
      isDecrementDisable,
      getCounterValue
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="decrementBtn"
        :disabled="isDecrementDisable()"
      >➖
      </button>

      <span class="count" data-testid="count" v-html="getCounterValue()"></span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="incrementBtn"
        :disabled="isIncrementDisable()"
      >➕
      </button>
    </div>
  `,
})
