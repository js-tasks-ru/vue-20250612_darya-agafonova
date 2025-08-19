import {computed, defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstNumber = ref(0);
    const secondNumber = ref(0);
    const operator = ref('sum');

    const totalValue = computed(() => mathMagic())

    function mathMagic() {
      let totalValue = 0;
      if (operator.value === 'sum') {
        totalValue = firstNumber.value + secondNumber.value
      }
      if (operator.value === 'subtract') {
        totalValue = firstNumber.value - secondNumber.value
      }
      if (operator.value === 'multiply') {
        totalValue = firstNumber.value * secondNumber.value
      }
      if (operator.value === 'divide') {
        totalValue = firstNumber.value / secondNumber.value
      }

      return totalValue
    }

    return {
      firstNumber,
      secondNumber,
      operator,
      totalValue,
      mathMagic
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstNumber"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" v-model="operator" value="sum"/>➕</label>
        <label><input type="radio" name="operator" v-model="operator" value="subtract"/>➖</label>
        <label><input type="radio" name="operator" v-model="operator" value="multiply"/>✖</label>
        <label><input type="radio" name="operator" v-model="operator" value="divide"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondNumber"/>

      <div>=</div>

      <output> {{ totalValue }}</output>
    </div>
  `,
})
