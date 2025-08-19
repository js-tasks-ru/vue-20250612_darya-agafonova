import {defineComponent, onMounted, ref, watch} from 'vue'
import {getMeetup} from './meetupsService.ts'
import {get} from "@vueuse/core";


export default defineComponent({
  name: 'SelectedMeetupApp',
  setup() {
    const meetupId = ref(1);
    const meetupTitle = ref('');
    getTitle(meetupId.value);
    function getTitle(selectMeetupId){
      getMeetup(selectMeetupId).then(function (result) {
        meetupTitle.value = result.title;
      })
    }

    function nextMeetup() {
      meetupId.value++
    }
    function prevMeetup() {
      meetupId.value--
    }

    watch(meetupId, (selectMeetupId) => {
      getTitle(selectMeetupId)
    })

    return {
      meetupId,
      meetupTitle,
      nextMeetup,
      prevMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="meetupId === 1" @click="prevMeetup">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="1"
              v-model="meetupId"
              @change="getTitle(1)"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="meetupId"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="meetupId"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="meetupId"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="meetupId"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="meetupId > 4"  @click="nextMeetup">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title"> {{meetupTitle}} </h1>
        </div>
      </div>

    </div>
  `,
})
