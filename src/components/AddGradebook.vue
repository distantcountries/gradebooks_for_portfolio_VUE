<template>
    <div class="container">
        <form @submit.prevent="addGradebook" class="addGradebookForm">
            <h3>Add Gradebook</h3>
            <input 
                type="text" 
                name="name" 
                placeholder="Name..." 
                v-model="newGradebook.name" 
                class="form-control" 
                pattern=".{2,255}" 
                required 
                title="Min 2 characters, max 255 characters" 
            />
            <select v-model="newGradebook.user_id" class="form-control">
                <option value="" disabled selected>
                    Choose professor...
                </option>
                <option v-for="(professor, index) in availableProfessors" :key="index" :value="professor.id" >
                    {{professor.firstName}} {{professor.lastName}}
                </option>
            </select>
            <div class="formButtons">
                <button type="submit" class="btn btn-info">Submit</button>
                <button type="button" class="btn btn-info" @click="cancel">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import { gardebooksService } from '../services/GardebooksService'
export default {
    data() {
        return {
            newGradebook: {
                name:'', 
                user_id:'',
            },
            professors:[],
        }
    },

    created() {
        professorsService.getAll()
            .then(response => {
                this.professors = response.data
            })
            .catch(error => {
                alert('Error with getting professors!');
            });
    },

    methods: {
        getDefaults () {
            return {
                name: '',
                user_id:''
            }
        },

        addGradebook() { 
            gardebooksService.add(this.newGradebook)
                .then( response => {
                    this.newGradebook = this.getDefaults();
                    this.$router.push({ name: "gradebooks" });
                })
                .catch(error => {
                        alert('Error with adding gradebook!');
                });
        },

        cancel() {
            this.$router.push({ name: "gradebooks" });
        }
    }, 

    computed: {
        availableProfessors() {
            return this.professors.filter(professor => 
                professor.gradebook === null
            )
        }
    }
}
</script>

<style>
.addGradebookForm {
    width:70%;
    margin: 0 auto;
    margin-top:1rem;
}

form button {
    margin-right: 1rem;
}

form select {
    margin-bottom: 0.5rem;
}

select:invalid { 
    color: gray; 
}

.formButtons {
    width: 100%;
    display: flex;
    justify-content: center;
}

/* ---------------------responsive--------------------- */
@media (max-width: 992px) {
    .addGradebookForm {
        width:100%;
        padding: 0;
    }

    .addGradebookForm .formButtons {
        justify-content: space-between;
    }

    .addGradebookForm .formButtons button {
        width: 48%;
        margin:0;
    }
}
</style>


