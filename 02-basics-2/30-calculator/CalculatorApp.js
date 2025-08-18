import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    let firstNumber = ref(0);
    let secondNumber = ref(0);
    let totalValue = ref(0);
    let operator = ref('sum');

    function mathMagic (){
      if(operator.value === 'sum'){
        totalValue.value = firstNumber.value + secondNumber.value
      }
      if(operator.value === 'subtract'){
        totalValue.value = firstNumber.value - secondNumber.value
      }
      if(operator.value === 'multiply'){
        totalValue.value = firstNumber.value * secondNumber.value
      }
      if(operator.value === 'divide'){
        totalValue.value = firstNumber.value / secondNumber.value
      }
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
      <input type="number" aria-label="First operand" v-model="firstNumber" @change="mathMagic"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" v-model="operator" value="sum" @change="mathMagic"/>➕</label>
        <label><input type="radio" name="operator" v-model="operator" value="subtract" @change="mathMagic"/>➖</label>
        <label><input type="radio" name="operator" v-model="operator" value="multiply" @change="mathMagic"/>✖</label>
        <label><input type="radio" name="operator" v-model="operator" value="divide" @change="mathMagic"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondNumber" @change="mathMagic"/>

      <div>=</div>

      <output> {{ totalValue }}</output>
    </div>
  `,
})
