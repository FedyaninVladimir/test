<template>
  <div id="app">
    <div class="container">
      <h1>Рейтинг участников</h1>
      <select name="" id="" v-model="sort_value">
        <option value="none" disabled>Сортировать по</option>
        <option value="age" >Возрасту</option>
        <option value="rating" >Рейтингу</option>
      </select>
      <br>
      <input type="text" placeholder="Поиск" v-model="filter_value">
      <div class="content">
        <div class="col" v-for="(tab,index) in tabs" :key="index">
          <h4>{{tab.title}}</h4>
          <div class="item" v-for="(user, index) in sortUsers" :key="index">
            <div v-if="tab.value === 'index'">{{index + 1}}</div>
            <div v-if="tab.value === 'name'">{{user.name}}</div>
            <div v-if="tab.value === 'secondName'">{{user.secondName}}</div>
            <div v-if="tab.value === 'age'">{{user.age}}</div>
            <div v-if="tab.value === 'rating'">{{user.rating}} баллов</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  data: () => {
    return {
      filter_value: '',
      sort_value: 'none',
      tabs: [
        {
          value: "index",
          title: "№"
        },
        {
          value: "name",
          title: "Имя"
        },
        {
          value: "secondName",
          title: "Фамилия"
        },
        {
          value: "age",
          title: "Возраст"
        },
        {
          value: "rating",
          title: "Рейтинг"
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      getUsers: 'getUsers'
    }),
  },
  computed: {
    ...mapGetters({
      users: 'users'
    }),
    sortUsers () {                                                                // Функция сортировки и фильтра игровков
      const self = this
      let result = this.users
              .filter((user) => {
                let full_name = `${user.name} ${user.secondName}`
                return full_name.indexOf(self.filter_value) !== -1
              })
              .sort((a, b) => {
       return  b[self.sort_value] - a[self.sort_value]
      })
      return result
    }
  },
  mounted() {
    this.getUsers()
  }

}
</script>

<style>
  @font-face {
    font-family: 'Open Sans';
    src: local('Open Sans'), local('OpenSans'), url('./assets/fonts/opensans.woff2') format('woff2'), url('./assets/fonts/opensans.woff') format('woff'), url('./assets/fonts/opensans.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  h1, h4, .item,  input, select {
    font-family: "Open Sans";
  }
  .item, input, select{
    font-size: 16px;
  }
  input, select {
    background-color: #FFFFFF;
    margin-bottom: 5px;
    padding: 5px 25px;
    outline:none;
  }
  .container {
    padding-top: 50px;
    padding-left: 50px;
  }
  .col {
    display: flex;
    flex-direction: column;
    padding-right: 50px;
  }
  .item {
    padding-bottom: 15px ;
  }
  .content {
    display: flex;
  }
</style>
