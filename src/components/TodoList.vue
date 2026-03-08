<script setup>
import { computed, ref } from 'vue';
import TodoCard from './TodoCard.vue';
import TodoCreate from './TodoCreate.vue';
import { useStore } from 'vuex'
const store = useStore()
store.dispatch('fetchTodoList')

const { activeTab = 'Todo' } = defineProps(['activeTab']);

const statusMap = { 'Todo': 0, 'In Progress': 1, 'Completed': 2 }

const todoList = computed(() =>
    store.state.todoList
        .filter(item => statusMap[activeTab] == 0 || item.taskStatus == statusMap[activeTab])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
)

const todoCreateModal = ref(false);


</script>
<template>
    <div class="py-3">
        <div class="container">
            <div class="d-flex align-items-center gap-3 mb-3">
                <div class="fs-5 fw-semibold">{{ activeTab }}</div>
                <div class="btn create-btn btn-success" @click="todoCreateModal.open()">+ Create Task</div>
            </div>

            <div class="todo-list">
                <TodoCard v-for="item in todoList" :key="item.taskID" :jobItemKey="item.taskID" />
            </div>

            <div class="fs-5 text-secondary my-5" v-if="todoList.length <= 0">No items in this section</div>

        </div>

        <TodoCreate ref="todoCreateModal" />
    </div>
</template>

<style lang="scss" scoped>
.create-btn {
    --bs-btn-bg: rgb(57, 150, 20);
    --bs-btn-hover-bg: rgb(52, 139, 18);
    --bs-btn-active-bg: rgb(43, 100, 20);
}

.todo-list {
    --repeat-columns: 3;
    display: grid;
    grid-template-columns: repeat(var(--repeat-columns), 1fr);
    gap: 1rem;

    @media screen and (max-width: 992px) {
        --repeat-columns: 2;
    }

    @media screen and (max-width: 576px) {
        --repeat-columns: 1;
    }
}
</style>