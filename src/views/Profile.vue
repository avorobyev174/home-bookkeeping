<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          v-model="name"
          type="text"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"

        >
        <label for="description">{{'ProfileName' | localize}}</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid">Введите имя</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский язык
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required} from 'vuelidate/src/validators'
  import {mapGetters, mapActions} from 'vuex'
  import localizeFilter from "../filters/localize.filter";

    export default {
      name: "Profile",
      metaInfo() {
        return {
          title: this.$title('ProfileTitle')
        }
      },
      data: () => ({
        name: '',
        isRuLocale: true
      }),
      validations: {
        name: {required}
      },
      mounted() {
        this.name = this.info.name
        this.isRuLocale = this.info.locale === 'ru-RU'
        setTimeout(() => {
          M.updateTextFields()
        }, 0)
      },
      computed: {
        ...mapGetters(['info'])
      },
      methods: {
        ...mapActions(['updateInfo']),

        async submitHandler() {
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }

          try {
            await this.updateInfo({
              name: this.name,
              locale: this.isRuLocale ? 'ru-RU' : 'en-US'
            })
          } catch (e) {
          }
        }
      }
    }
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
