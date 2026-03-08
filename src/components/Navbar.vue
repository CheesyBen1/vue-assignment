<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const activeUser = computed(() => store.state.activeUserName);

const todoList = computed(() => store.state.todoList);

const tabItems = computed(() => [
    { name: 'Todo', count: todoList.value.length },
    { name: 'In Progress', count: todoList.value.filter(item => item.taskStatus == 1).length },
    { name: 'Completed', count: todoList.value.filter(item => item.taskStatus == 2).length }
]);

const mobileActiveTab = ref(false);

const activeTab = ref('Todo')

const emit = defineEmits(['update:activeTab'])

function setActiveTab(tab) {
    activeTab.value = tab.name
    emit('update:activeTab', tab.name)
}

function mobileSetActiveTab(tab) {
    setActiveTab(tab)
    mobileActiveTab.value = false
}

</script>

<template>
    <div class="nav">
        <div class="nav-content container">
            <div class="tab me-4 px-0 ">Todo List</div>
            <div class="tab-items d-none d-md-flex">
                <div v-for="(item, index) in tabItems" :key="index" class="tab tab-btn"
                    :class="{ active: activeTab == item.name }" @click="setActiveTab(item)">
                    {{ item.name }} <span v-if="item.count > 0" class="badge rounded-pill bg-danger ">{{ item.count
                    }}</span>
                </div>
            </div>
            <div class="login-info ms-auto tab-items d-none d-md-flex">
                <div class="login-name tab">{{ activeUser }}</div>
                <div class="logout-btn tab tab-btn">Log Out</div>
            </div>
            <div class="menu-burger  d-flex align-items-center d-md-none ms-auto py-0 px-3"
                @click="mobileActiveTab = !mobileActiveTab">
                {{ mobileActiveTab ? '✕' : '☰' }}
            </div>
        </div>
        <div class="nav-mobile d-md-none w-100">
            <div class="mobile-dropdown" :class="[mobileActiveTab ? 'open' : '']">
                <div>
                    <div class="container">
                        <div v-for="(item, index) in tabItems" :key="index" class="py-1"
                            @click="mobileSetActiveTab(item)">
                            {{ item.name }} <span v-if="item.count > 0" class="badge rounded-pill bg-danger ">{{
                                item.count
                            }}</span>
                        </div>
                        <div class="my-2 py-2 d-flex border-top border-opacity-25">
                            <div>
                                {{ activeUser }}
                            </div>
                            <div class="ms-auto me-2">Log out</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nav {
    position: sticky;
    top: 0;
    background-color: rgb(41, 41, 41);
    color: lightgray;

    .nav-content {

        display: flex;
        align-items: center;
    }

    .tab-items {
        display: flex;
    }

    .tab {
        padding: 0.75rem 1rem;

        &.tab-btn {
            cursor: pointer;
            user-select: none;

            transition: background-color 0.1s ease;

            &:hover {
                background-color: rgb(255, 255, 255, 0.1);
            }

            &.active {
                background-color: black;
                color: white;
            }
        }
    }

    .menu-burger {
        font-size: 1.5rem;
        height: 100%;
    }

    .nav-mobile {
        position: absolute;
        top: 100%;

        background-color: rgb(41, 41, 41);
        color: lightgray;

        .mobile-dropdown {
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            transition: grid-template-rows 0.1s ease;

            >div {
                min-height: 0;
            }

            &.open {
                grid-template-rows: 1fr;
            }
        }

        .mobile-tab-items {
            display: flex;
            flex-direction: column;

        }
    }
}
</style>
