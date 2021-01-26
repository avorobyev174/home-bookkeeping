<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>
        <p class="center" v-if="categories.length === 0">Пока нет категорий</p>
        <CategoryEdit
          v-else
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategory"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '../components/CategoryCreate'
  import CategoryEdit from '../components/CategoryEdit'
    export default {
      name: "categories",
      components: {
        CategoryCreate, CategoryEdit
      },
      async mounted() {
        this.categories = await this.$store.dispatch('fetchCategories')
        this.loading = false
        console.log(this.categories)
      },
      data: () => ({
        categories: [],
        loading: true,
        updateCount: 0
      }),
      methods: {
        addNewCategory(category) {
          this.categories.push(category)
        },
        updateCategory(category) {
          const idx = this.categories.findIndex(c => c.id === category.id)
          this.categories[idx].title = category.title
          this.categories[idx].limit = category.limit
          this.updateCount++
        }
      }
    }
</script>

<style scoped>

</style>
