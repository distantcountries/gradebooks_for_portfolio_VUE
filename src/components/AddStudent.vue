<template>
    <div class="container">
        <form @submit.prevent="addStudent()" class="addProfessorForm">
            <div class="titleAndButton">
                <h3>Add student</h3>
                <!-- <button type="button" class="btn btn-warning" @click="callFormAgain">Add more students</button> -->
                <hr>
            </div>
            <div v-for="(form, index) in forms" :key="index">
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First name..." 
                    v-model="newStudent.firstName" 
                    class="form-control" 
                    required
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last name..." 
                    v-model="newStudent.lastName" 
                    class="form-control" 
                    required
                />
                <div class="add_image">
                    <button @click.prevent="showImageInput = true" class="btn btn-secondary" >Add Image</button>
                    <input 
                        type="text" 
                        name="image" 
                        placeholder="Image link..."
                        v-if="showImageInput" 
                        v-model="newStudent.image"
                        class="form-control" 
                    />
                </div>
            </div>
            <div id="submitStudent">
                <button type="submit" class="btn btn-info" >Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import { studentsService } from '../services/StudentsService'
import { gardebooksService } from '../services/GardebooksService'
import MyGradebook from './MyGradebook'
export default {
    components: {
        MyGradebook
    },
    data() {
        return {
            newStudent: {
                firstName:'',
                lastName:'',
                image:'',
            },
            // gradebookId:'',
            showImageInput: false, 
            forms:[1], 
            counter:'',
            user:JSON.parse(localStorage.getItem('user')), 
        }
    },

    methods:{
        // callFormAgain() {
        //     this.forms.push(this.counter++)
        // },

        getDefaults () {
            return {
                firstName:'',
                lastName:'',
                image:''
            }
        },

        addStudent() {
            this.newStudent.gradebook_id = this.$router.currentRoute.params.id;
            studentsService.add(this.newStudent)
                .then(response => {
                    this.newStudent = this.getDefaults();
                    this.$router.back();
                })
                .catch(error => {
                    alert('Error with adding student!');
                });
        }, 
        // sendGradebookId(gradebookId) {
        //     this.gradebookId = gradebookId
        // }
    }, 
}
</script>

<style>
.titleAndButton {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}

.titleAndButton h3 {
    width: 68%;
}

#submitStudent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.add_image {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.add_image button {
    width: 25%;
}

.add_image input {
    width: 75%;
}
</style>
