import { ref, reactive, computed } from "vue"
import { defineStore } from "pinia"
import { allTasks } from '../http/task-api'

export const useTaskStore = defineStore('taskStore', () => {

    const tasks = ref([])

    const fetchAllTasks = async() => {
        const { data } = await allTasks()
        tasks.value = data.data
    }

    return { tasks, fetchAllTasks }
})