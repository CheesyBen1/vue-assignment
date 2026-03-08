<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import TodoList from './components/TodoList.vue';
import { useStore } from 'vuex'
import CompanyNews from './components/CompanyNews.vue';
const store = useStore()

const activeTab = ref('Todo');

store.commit('setActiveUserName', 'Bentley');

</script>

<template>
  <Navbar v-model:active-tab="activeTab" />
  <TodoList :active-tab="activeTab" />
  <CompanyNews />
</template>
