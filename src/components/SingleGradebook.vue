<template>
    <div class="container">
        <div class="pageHeaderSingleGradebook">
            <h3>{{ gradebook.name }}</h3>
            <button class="btn btn-danger" @click="deleteGradebook" id="deleteGradebookButton">Delete gradebook</button>
        </div>
        <hr />
        <div v-if="gradebook && gradebook.user">
            <span class="boldText">Professor:</span>
            <router-link :to="singleProfessor(gradebook.user.id)" style="color:#eebd30; font-size:1.2rem;"> {{gradebook.user.firstName}} {{gradebook.user.lastName}}</router-link>
        </div>
        <div v-else>
            <p>This gradebook is waiting for professor</p>
        </div>
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
        <button type="button" class="btn btn-warning" @click="addStudent" id="addStudentToGradebook">Add student</button><br />
        <h5 style="text-align:center; font-weight:bold;">Comments:</h5>
        <hr>
        <div v-if="comments">
            <li v-for="(comment, index) in comments" :key="index" class="commentsList">
                {{ comment.content }}
                <br />
                <span style="font-style:italic;color:#727272;">
                    Posted by: 
                    <router-link :to="singleProfessor(comment.user.id)">{{ comment.user.firstName }} {{ comment.user.lastName }}</router-link>, 
                    {{ comment.created_at }}
                    <hr>
                </span>
            </li>
        </div>
        <form @submit.prevent="addComment" class="addCommentForm">
            <textarea 
                placeholder="Comment..." 
                v-model="newComment.content" 
                pattern=".{1,1000}" 
                required 
                title="Min 1 characters, max 1000 characters" 
                class="form-control">
            </textarea>
            <div id="addCommentButton">
                <button type="submit" class="btn btn-info" style="margin-top:0.5rem;">Add comment</button>
            </div>
        </form>
    </div>
</template>

<script>
import { gardebooksService } from '../services/GardebooksService'
export default {
    data() {
        return {
            gradebook:'', 
            newComment: {
                content:''
            },
            id:null,
            currentUser:JSON.parse(localStorage.getItem('user'))
        }
    },

    beforeRouteEnter (to, from, next) {
        next(vm => {
            gardebooksService.get(vm.$route.params.id)
                .then(response => {
                    vm.gradebook = response.data;
                })
                .catch(error => {
                    alert('Error with getting gradebook!');
                })
        })
    },

    computed: {
        students() {
            return this.gradebook.students
        }, 

        user() {
            return this.gradebook.user.firstName
        }, 

        comments() {
            return this.gradebook.comments
        }
    },

    methods: {
        addStudent() {
            this.$router.push({name: "add-student"})
        },

        singleProfessor(id) {
            return  `/teachers/${id}`;
        },

        getDefaults () {
            return {
                content: '',
            }
        },

        addComment() {
            gardebooksService.addComment(this.newComment, this.id)
                .then( response => {
                    this.newComment = this.getDefaults();
                    window.location.reload()
                })
                .catch(error => {
                    alert('Error with adding comment!');
                });
        },

        deleteGradebook() {
            if ( window.confirm('Are you sure you want to delete this gradeboo?') ) {
                let id = this.$route.params.id
                gardebooksService.delete(id)
                this.$router.push({ name: "gradebooks" });
            }
            return  
        }
    },

    created(){
       this.id = this.$router.currentRoute.params.id;
    },
}
</script>

<style>
.linkTittle a {
    font-size: 1.5rem;
    color: #eebd30;
    font-weight: bold;
}

.linkTittle a:hover, .linkElement a:hover {
    color:#9F9F9F;
    text-decoration: none;
}

.linkElement a {
    color:#494949;
    font-size: 1.2rem;
    font-weight: bold;
}

.timeElement {
    color: #727272;
    font-style: italic;
}

h2 {
    width:70%;
}

.pageHeaderSingleGradebook {
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 0.5rem;
}

#deleteGradebookButton {
    margin-top: 1rem;
}

.container {
    padding: 3rem;
}

.boldText {
    font-weight: bold;
}

.commentsList {
    margin-bottom: 1rem;
}

.commentsList a {
    color:black;
    text-decoration: underline;
}

.commentsList a:hover {
    color:black;
    text-decoration: underline;
    font-weight: bold;
}

.addCommentForm {
    width: 100%;
}

#addCommentButton {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

/* ---------------------responsive--------------------- */
@media (max-width: 480px) and (min-width:300px) {
    #deleteGradebookButton, #addStudentToGradebook {
        width:100%;
    }

    #addStudentToGradebook {
        margin-bottom: 1rem;
    }
}
</style>
