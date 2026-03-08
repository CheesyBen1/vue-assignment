<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const modalOpen = ref(false)
defineExpose({
    open: () => {
        resetFields()
        modalOpen.value = true
    }
})

const resetFields = () => {
    title.value = ''
    description.value = ''
    image.value = null
    titleError.value = ''
    imageError.value = '';
}

const closeModal = () => {
    modalOpen.value = false;
}

const title = ref('')
const description = ref('')
const image = ref(null)

const titleError = ref('')
const imageError = ref('')


const createTask = async () => {

    titleError.value = '';
    imageError.value = '';

    let error = false;
    if (!title.value) {
        titleError.value = 'Title is required';
        error = true;
    }

    if (image.value && image.value.size > 100 * 1024) {
        imageError.value = 'Image must be under 100KB';
        error = true;
    }
    if (error) return;

    let imageData = null

    if (image.value) {
        imageData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result)
            reader.readAsDataURL(image.value)
        })
    }

    store.dispatch('addTodoListItem', {
        title: title.value,
        description: description.value,
        image: imageData
    })
    closeModal();
}

</script>


<template>
    <div class="modal" tabindex="-1" v-if=modalOpen>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body d-flex flex-column gap-3">
                    <div>
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control" placeholder="Task title" maxlength="40" v-model="title"
                            :class="{ 'is-invalid': titleError }" />
                        <div class="invalid-feedback" v-if=titleError>
                            {{ titleError }}
                        </div>
                    </div>
                    <div>
                        <label class="form-label">Image</label>
                        <input type="file" class="form-control" accept="image/*"
                            @change="image = $event.target.files[0]" :class="{ 'is-invalid': imageError }" />
                        <div class="invalid-feedback" v-if=imageError>
                            {{ imageError }}
                        </div>
                    </div>
                    <div>
                        <label class="form-label">Description</label>
                        <textarea class="form-control" placeholder="Task description" rows="4"
                            v-model="description"></textarea>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click="closeModal">Cancel</button>
                    <button type="button" class="btn btn-success" @click=createTask()>Create</button>
                </div>
            </div>
        </div>
    </div>
</template>