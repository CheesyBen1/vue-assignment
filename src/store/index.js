import { createStore } from 'vuex'
import { sampleData } from './sampleData'

const api = {
    get: (path) => fetch(`http://localhost:3001${path}`).then(r => r.json()),
    post: (path, body) => fetch(`http://localhost:3001${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(r => r.json()),
    patch: (path, body) => fetch(`http://localhost:3001${path}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(r => r.json()),
    delete: (path) => fetch(`http://localhost:3001${path}`, { method: 'DELETE' })
}

export default createStore({
    state: {
        activeUserName: '',
        todoList: [],
    },
    mutations: {
        setActiveUserName(state, name) {
            state.activeUserName = name
        },
        setTodoList(state, list) {
            state.todoList = list
        },
        unshiftTodoListItem(state, item) {
            state.todoList.unshift(item)
        },
        deleteTodoListItem(state, taskID) {
            const index = state.todoList.findIndex(item => item.taskID == taskID);
            if (index == -1) return;
            state.todoList.splice(index, 1);
        },
        updateTodoListItemStatus(state, { taskID, taskStatus }) {
            const item = state.todoList.find(item => item.taskID == taskID);
            if (!item) return;
            item.taskStatus = taskStatus;
        }
    },
    actions: {
        async fetchTodoList({ commit, dispatch }) {
            const data = await api.get('/todoList')
            if (data.length === 0) {
                for (const item of sampleData) await dispatch('addTodoListItem', item)
                return;
            }
            commit('setTodoList', data.map(item => ({ ...item, taskID: item.id })))
        },
        async addTodoListItem({ commit }, item) {
            const data = await api.post('/todoList', {
                ...item,
                createdAt: new Date().toString(),
                taskStatus: 0
            })
            commit('unshiftTodoListItem', { ...data, taskID: data.id })
        },
        async deleteTodoListItem({ commit }, taskID) {
            await api.delete(`/todoList/${taskID}`)
            commit('deleteTodoListItem', taskID)
        },
        async updateTodoListItemStatus({ commit }, { taskID, taskStatus }) {
            await api.patch(`/todoList/${taskID}`, { taskStatus })
            commit('updateTodoListItemStatus', { taskID, taskStatus })
        }
    }
})