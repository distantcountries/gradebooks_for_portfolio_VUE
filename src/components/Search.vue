<template>
    <div id="searchForm">
        <form class="form-inline mr-auto" @submit.prevent="handleSearch">
            <input 
                class="form-control mr-sm-2" 
                type="text" 
                placeholder="Search..." 
                aria-label="Search" 
                v-model="term" >
            <button type="submit" class="btn btn-secondary">Search</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            term:'',
        }
    },

    methods: {
        handleSearch() {
            this.$emit('searchTermUpdated', this.term)
        },
    }
}
</script>

<style>
#searchForm {
    width:100%;
    display: flex;
}

/* ---------------------responsive--------------------- */
@media (min-width: 1200px){
    #searchForm {
        width:35%;
        justify-content: flex-end;
    }
}

@media (max-width: 1200px){
    #searchForm {
        width:40%;
    }
}

@media (max-width: 992px){
    #searchForm{
        width:100%;
    }

    #searchForm form {  
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        margin:0 0 0.5rem 0;
    }
    
    #searchForm input {
        width: 75%;
    }

    #searchForm button {
        width: 20%;
    }
}

@media (max-width: 480px) and (min-width:300px) {
    #searchForm form {  
        flex-direction: column;
        justify-content: center;
    }
    
    #searchForm input, #searchForm button {
        width: 100%;
        margin:0 0 0.5rem 0;
    }
}
</style>
