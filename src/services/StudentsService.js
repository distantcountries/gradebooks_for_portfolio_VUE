import axios from 'axios'

export default class StudentsService {
    constructor() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
    }

    getAll() {
        return axios.get('students')
    }

    get(id) {
        return axios.get('students/' + id)
    }

    add(newStudent) {
        return axios.post('students/', newStudent)
    }
}

export const studentsService = new StudentsService()