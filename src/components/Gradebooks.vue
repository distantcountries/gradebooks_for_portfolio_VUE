<template>
    <div class="container">
        <div class="pageHeaderGradebooks">
            <h2>Gradebooks</h2>
            <GradebookSearch @searchTermUpdated="setSearchTerm" class="searchEvent" />
        </div>
        <hr>
        <div class="sortButtons">
            <button type="button" class="btn btn-outline-secondary" style="margin:0.2rem;" @click="sortByNameAsc">Sort by Name asc</button>
            <button type="button" class="btn btn-outline-secondary" style="margin:0.2rem;" @click="sortByNameDesc">Sort by Name desc</button>
        </div>
        <ul class="gradebooksList">
            <li v-for="(gradebook, index) in visibleGradebooks" :key="index">
                <span class="linkTittle">
                    <router-link :to="singleGardebook(gradebook.id)">
                        {{ gradebook.name }}
                    </router-link>
                </span>
                <br/>
                <span class="linkElement" v-if="gradebook.user_id===null" style="color:#727272;">
                    This gradebook still doesn't have a professor
                </span>
                <span class="linkElement" v-else>
                    <router-link :to="mainProfessor(gradebook.user.id)">Professor {{ gradebook.user.firstName }} {{ gradebook.user.lastName }}</router-link>
                </span>
                <br />
                <span class="timeElement">Created at: {{ gradebook.created_at }}</span>
            </li>
            <li v-if="gradebooks.length === 0">
                There is no created gradebooks
            </li>
        </ul>
        <div v-if="gradebooks.length/10>counter && gradebooks.length>0" class="loadMoreButton">
            <button @click="encreaseShownGradebooks" type="button" class="btn btn-warning">Load more</button>
        </div>
    </div>
</template>

<script>
import { gardebooksService } from '../services/GardebooksService'
import GradebookSearch from './Search'
export default {
    components: {
        GradebookSearch
    },

    data() {
        return {
            gradebooks:[], 
            currentPage:1, 
            shownGradebooks:10, 
            counter:1, 
            term:''
        }
    }, 
    
    created() {
        gardebooksService.getAll()
            .then(response => {
                this.gradebooks = response.data
            })
            .catch(error => {
                alert('Error with getting gradebooks!');
            });
    },

    methods: {
        singleGardebook(id) {
            return  `gradebooks/${id}`;
        },

        mainProfessor(id) {
            return  `teachers/${id}`;
        },

        loadMore() {
            return this.visibleGradebooks++
        }, 

        encreaseShownGradebooks() {
            this.shownGradebooks+=10
            ++this.counter
        }, 
        
        setSearchTerm(term) {
            this.term = term;
            this.visibleGradebooks
        },

        sortByNameDesc() {
            this.gradebooks.sort((gradebook1, gradebook2) => {
                var name1 = gradebook1.name.toUpperCase();
                var name2 = gradebook2.name.toUpperCase(); 
                if (name1 < name2) {
                    return -1;
                }
                if (name1 > name2) {
                    return 1;
                }
                return 0;
            });
        },

        sortByNameAsc() {
            this.gradebooks.sort((gradebook1, gradebook2) => {
                var name1 = gradebook1.name.toUpperCase();
                var name2 = gradebook2.name.toUpperCase(); 
                if (name2 < name1) {
                    return -1;
                }
                if (name2 > name1) {
                    return 1;
                }
                return 0;
            });
        },
    },

    computed: {
        reversedGradebooks() {
            return this.gradebooks.filter(gradebook => {
                return gradebook.name.toLowerCase().includes(this.term.toLowerCase())
            }).reverse()
        },

        visibleGradebooks() {
            let bottomLimit = (this.currentPage - 1) * this.shownGradebooks;
            let topLimit = bottomLimit + this.shownGradebooks;
            return this.reversedGradebooks.filter((reversedGradebooks, index) => {
                return index >= bottomLimit && index < topLimit;
            })
        }, 
    },
}
</script>

<style>
.sortButtons {
    margin-top: 0.5rem;
}

.gradebooksList .linkTittle a  {
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

.pageHeaderGradebooks {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
}

.pageHeaderGradebooks h2 {
    width:60%;
}

.container {
    padding: 3rem;
}

.gradebooksList li {
    padding: 1rem 1rem 0;
    border-bottom: 1px solid lightgray;
}

.gradebooksList li:hover {
    box-shadow: 0 3px 2px -2px grey;
    background: linear-gradient(to right, rgba(255,0,0,0), #fdf8e7, rgba(255,0,0,0));
}

.loadMoreButton {
    display:flex;
    justify-content: center;
}

/* ---------------------responsive--------------------- */
@media (max-width: 480px) and (min-width:300px) {
    .gradebooksList {
        padding: 0 0.7rem;
    }

    .gradebooksList li {
        padding: 0 0 0.5rem 0;
    }

    .gradebooksList .linkTittle a {
        font-size: 1.3rem;
    }

    .gradebooksList .linkElement a {
        font-size: 1.1rem;
    }

    .gradebooksList .timeElement {
        font-size: 0.8rem;
    }

    .loadMoreButton {
        display: flex;
        justify-content: center;
        padding: 0;
    }

    .sortButtons {
        margin:0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
    }

    .sortButtons button {
        width: 45%;
        padding: 0.2rem;
    }
}
</style>

