<template>
    <div class="container">
        <div class="pageHeader">
            <h3>{{professor.firstName}} {{professor.lastName}}</h3>
            <button class="btn btn-danger" @click="deleteGradebook" >Delete gradebook</button>
        </div>
        <hr />
        <div v-if=" professor.gradebook">
            <span class="boldText">Gradebook: </span>{{ professor.gradebook.name }}<br />
            <span class="boldText">Students:</span>
            <ul>
                <div v-if="students">
                    <li v-for="(student, index) in students" :key="index">
                        {{ student.firstName }} {{ student.lastName }}
                    </li>
                    <li v-if="students.length === 0">
                        This gradebook still doesn't have students.
                    </li>
                </div>
            </ul>
            <button type="button" class="btn btn-warning" @click="addStudent">Add student</button><br /><br />
        </div>
        <div v-else>
            You dont' have a gradebook
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import { gardebooksService } from '../services/GardebooksService'
import { authService } from '../services/Auth'
export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem('user')), 
            professor:'', 
        }
    },

    created() {
        professorsService.get(this.user.id)
            .then(response => {
                this.professor = response.data   
            })
            .catch(error => {
                alert('Error with getting professor!');
            })
    },

    methods: {
        addStudent(gradebookId) {
            gradebookId = this.professor.gradebook.id
            this.$router.push({name: "add-student" , params: { id: gradebookId }})
            // this.$emit("sendGradebookId", gradebookId);
        },

        deleteGradebook() {
            if ( window.confirm('Are you sure you want to delete your gradebook?') ) {
                let id = this.professor.gradebook.id
                gardebooksService.delete(id)
                this.$router.push({ name: "gradebooks" });
            }
            return  
        },
    },

    computed: {
        students() {
            return this.professor.gradebook.students
        }
    }
}
</script>

<style>

</style>
