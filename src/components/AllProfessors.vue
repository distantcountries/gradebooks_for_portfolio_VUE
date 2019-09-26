<template>
    <div class="container">
        <div class="pageHeader">
            <h2>
                Professors
            </h2>
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
                        <div class="click-zoom">
                            <label>
                                <input type="checkbox">
                                <img :src="image.image" alt="Professor image" >
                            </label>
                        </div>
                    </div>
                </div>
                <br />
                <div v-if="professor && professor.gradebook">
                    {{ professor.gradebook.name }}
                </div>
                <div v-else>
                    <p>This professor is avilable</p>
                </div>
                <!-- <hr> -->
            </li>
        </ul>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import ProfessorSearch from './Search'
export default {
    components: {
        ProfessorSearch
    },

    data() {
        return {
            professors:[],
            name:''
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
        setSearchTerm(term) {
            this.name = term;
        },

        singleProfessor(id) {
            return  `teachers/${id}`;
        }, 

        // zoomImage() {
        //     console.log('test')
        // }
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
}

.professorName a {
    font-size: 1.2rem;
    color: #eebd30;
}

.professorName a:hover {
    color: #494949;
    text-decoration: none;
}

h2 {
    width:70%;
}

.pageHeader {
    width: 100%;
    display: flex;
    flex-wrap:wrap;
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

.click-zoom {
    width: 25%;
}

img {
    /* margin:0.5rem;
    height: 100px;
    width: 25%; */
    border-radius: 0.5rem;
    width: 100%;
    /* display: inline-block; */
}

img:hover {
    opacity: 0.5;
    filter: alpha(opacity=40);
}  

.click-zoom input[type=checkbox] {
  display: none;
}

.click-zoom img {
  transition: transform 0.25s ease;
  cursor: zoom-in;
}

.click-zoom input[type=checkbox]:checked~img {
  transform: scale(2);
  cursor: zoom-out;
  opacity: 1;
}



</style>
