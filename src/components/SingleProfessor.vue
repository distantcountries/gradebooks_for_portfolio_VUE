<template>
    <div class="container">
        <h2 class="pageHeader">{{ professor.firstName }} {{ professor.lastName }}</h2>
        <div class="professorImages">
            <div v-for="image in professor.images" :key="image.id" >
                <ZoomImage imageWidth="200" imageHeight="auto" :src="image.image" alt="Professor image" class="thumbnailImage" />
            </div>
        </div>
        <br />
        <div v-if="professor && professor.gradebook">
            <span class="professorName">
                <span class="boldText">Gradebook: </span><router-link :to="singleGradebook(professor.gradebook.id)">{{ professor.gradebook.name }}</router-link>
            </span>
            <br />
            <span class="boldText">Students in total: </span>{{ studentsInTotal }}
        </div>
        <div v-else>
            There is no students
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import ZoomImage from './ZoomImage';
export default {
    components: {
        ZoomImage
    },

    data() {
        return {
            professor:'',
        }
    },
    
    beforeRouteEnter (to, from, next) {
        next(vm => {
            professorsService.get(vm.$route.params.id)
                .then(response => {
                    vm.professor = response.data;
                }).
                catch(error => {
                    alert('Error with getting professor!');
                })
        })
    },

    methods: {
        singleGradebook(id) {
            return  `/gradebooks/${id}`;
        }
    }, 

    computed: {
        studentsInTotal() {
            return this.professor.gradebook.students.length
        }
    }
}
</script>

<style>
.professorImages {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.professorImages div {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.professorImages .thumbnailImage img {
    height: 100px;
    width: auto;
    border-radius: 0.5rem; 
    alt: "Professor's image";
}
</style>
