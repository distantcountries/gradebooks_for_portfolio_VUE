<template>
    <div class="container">
        <div class="pageHeaderAllProfessors">
            <h2>Professors</h2>
            <ProfessorSearch @searchTermUpdated="setSearchTerm" />
        </div>
        <hr>
        <ul>
            <li v-for="professor in filteredProfessors" :key="professor.id" class="professorsList">
                <span class="professorName">
                    <router-link :to="singleProfessor(professor.id)">{{ professor.firstName }} {{ professor.lastName }}</router-link>
                </span>
                <br />
                <div class="professorsImages">
                    <div v-for="image in professor.images" :key="image.id"  >
                        <ZoomImage imageWidth="200" imageHeight="auto" :src="image.image" alt="Professor image" class="thumbnailImage" />
                    </div>
                </div>
                <!-- <br /> -->
                <div v-if="professor && professor.gradebook">
                    <span>Gradebook: </span>
                    <span class="professorsGradebook">
                        <router-link :to="singleGardebook(professor.gradebook.id)">
                            {{ professor.gradebook.name }}
                        </router-link>
                    </span>
                </div>
                <div v-else>
                    <p>This professor is avilable</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import ProfessorSearch from './Search'
import ZoomImage from './ZoomImage';
export default {
    components: {
        ProfessorSearch,
        ZoomImage
    },

    data() {
        return {
            professors:[],
            name:''
        }
    },

    // created() {
    //     professorsService.getAll()
    //         .then(response => {
    //             this.professors = response.data
    //         })
    //         .catch(error => {
    //             alert('Error with getting professors!');
    //         });
    // },

    beforeRouteEnter (to, from, next) {
        next(vm => {
            professorsService.getAll()
            .then(response => { 
                vm.professors = response.data 
            })
            .catch(error => { 
                alert('Error with getting professors!')
            });
        })
    },

    methods: {
        setSearchTerm(term) {
            this.name = term;
        },

        singleProfessor(id) {
            return  `teachers/${id}`;
        }, 

        singleGardebook(id) {
            return  `gradebooks/${id}`;
        },
    },

    computed: {
        filteredProfessors() {
            return this.professors.filter(professor => {
                return professor.firstName.toLowerCase().includes(this.name.toLowerCase())
            })
        },
    }
}
</script>

<style>
.professorsList{
    border-bottom: 1px solid lightgray;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
}

.professorName a {
    font-size: 1.2rem;
    color: #eebd30;
}

.professorsGradebook a {
    color:#494949;
    font-weight: bold;
}

.professorsGradebook a:hover, .professorName a:hover  {
    color:#9F9F9F;
    text-decoration: none;
}

h2 {
    width:70%;
}

.pageHeaderAllProfessors {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
}
 
.container {
    padding: 3rem;
}

.professorsImages {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.professorsImages div {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.professorsImages div img {
    height: 100px;
    width: auto;
    border-radius: 0.5rem; 
    alt: "Professor's image";
}
</style>
