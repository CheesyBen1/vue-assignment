<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex'
const store = useStore()



const { jobItemKey } = defineProps(['jobItemKey']);

const jobItem = computed(() => store.state.todoList.find(item => item.taskID == jobItemKey) ?? {});

const createdAt = computed(() => {
    const date = new Date(jobItem.value.createdAt);
    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
})
const deleteModalActive = ref(false);

const updateStatus = (status) => {
    if (status == null) return;
    store.dispatch('updateTodoListItemStatus', { taskID: jobItemKey, taskStatus: status });
}

const deleteTaskClick = () => {
    deleteModalActive.value = false;
    store.dispatch('deleteTodoListItem', jobItemKey);
}

</script>

<template>
    <div class="todo-card">
        <div class="todo-card-image p-1 w-100" v-if="jobItem.image">
            <img :src="jobItem.image" alt="">
        </div>
        <div class="px-3 pb-3 d-flex flex-column h-100">
            <div class="fs-4 my-2 fw-semibold">{{ jobItem.title }}</div>
            <div v-if=jobItem.description>Task description</div>
            <span class="todo-desc mb-1" :title="jobItem.description">
                {{ jobItem.description }}
            </span>

            <div class="todo-desc">Created at: {{ createdAt }}</div>
            <div class="mt-auto pt-3">
                <div class="d-flex gap-1" v-if="jobItem.taskStatus == 0">
                    <div class="todo-btn btn btn-primary" @click="updateStatus(1)">Start</div>
                    <div class="todo-btn btn btn-danger" @click="deleteModalActive = true">Remove</div>
                </div>
                <div class="d-flex gap-1" v-else-if="jobItem.taskStatus == 1">
                    <div class="todo-btn btn btn-success" @click="updateStatus(2)">In Progress</div>
                    <div class="todo-btn btn btn-secondary" @click="updateStatus(0)">Cancel</div>
                </div>
                <div class="d-flex gap-1" v-else-if="jobItem.taskStatus == 2">
                    <div class="todo-btn btn btn-primary">Completed</div>
                    <div class="todo-btn btn btn-secondary" @click="updateStatus(1)">Reopen</div>
                </div>
            </div>

        </div>

        <div class="modal" tabindex="-1" v-if="deleteModalActive">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete Task</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="deleteModalActive = false"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this task?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="deleteModalActive = false">Close</button>
                        <button type="button" class="btn btn-danger" @click="deleteTaskClick">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped lang="scss">
.todo-card {
    border: 1px solid lightgray;
    border-radius: 0.25rem;
    height: 100%;

    min-height: 26rem;


    display: flex;
    flex-direction: column;

    .todo-card-image {
        >img {
            aspect-ratio: 8/5;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }


    .todo-desc {
        font-size: 0.9rem;
        line-height: 1.15;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .todo-btn {
        min-width: 5rem;
    }
}
</style>