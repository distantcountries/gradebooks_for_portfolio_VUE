<template>
    <div class="container">
        <form @submit.prevent="login" class="loginForm">
            <h3>Login</h3>
            <input 
                type="email" 
                name="email" 
                placeholder="Email..." 
                v-model="email" 
                class="form-control" 
                required 
                title="Plese insert your email" 
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Password..." 
                v-model="password" 
                class="form-control" 
                required 
            />
            <div class="loginFormSubmit">
                <button type="submit" class="btn btn-info">Log in</button>
            </div>
            <p style="color:#ef5656;">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { authService } from '../services/Auth.js'
import { professorsService } from '../services/ProfessorsService'
export default {
    data() {
        return {
            email:'',
            password:'',
            errorMessage:'',
        }
    }, 

    created() {
        this.$bus.$emit('logged', 'user')
    },

    methods: {
        login() {
            authService.login(this.email, this.password)
            .then(() => {
                this.$bus.$emit('logged', 'user')
                this.$router.push({ name: "gradebooks" })
            })
            .catch(() => {
                this.errorMessage = 'Wrong credentials!';
            })
        }, 
    },
}
</script>

<style>
.loginForm {
    width:70%;
    margin: 0 auto;
    margin-top:1rem;
}

.loginFormSubmit {
    display: flex;
    justify-content: center;
    width:100%;
}

form input, form button {
    margin-bottom:0.5rem;
}

/* ---------------------responsive--------------------- */
@media (max-width: 992px)  {
  .loginForm {
        width:100%;
        padding: 0 2rem;
    }

    .loginForm .loginFormSubmit button {
        width: 100%;
        margin:0;
    }
}

@media (max-width: 480px) and (min-width:300px) {
    .loginForm {
        padding: 0;
    }
}
</style>

