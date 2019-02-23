<template>
    <div id="wrapper">
        <sui-segment color="yellow">
            <h2>Login</h2>
            <sui-form>
                <sui-form-field required>
                    <label>Usuário</label>
                    <input type="text" v-model="user.name">
                </sui-form-field>
                <sui-form-field required>
                    <label>Senha</label>
                    <input type="password" v-model="user.password">
                </sui-form-field>
                <error :invalid="invalidFields">{{ fieldsError.text }}</error>
                <sui-button color="green" type="button" @click="login">Entrar</sui-button>
            </sui-form>
        </sui-segment>
    </div>
</template>

<script>
    import FieldError from '../shared/fieldError/FieldError'

    export default {
        components: {
            'error': FieldError
        },
        data() {
            return {
                user: {
                    name: '',
                    password: ''
                },
                fieldsError: {
                    value: false,
                    text: ''
                }
            }
        },
        computed: {
            emptyFields() {
                return this.user.name === '' || this.user.password === '';
            },
            invalidFields() {
                return this.fieldsError.value;
            }
        },
        methods: {
            login() {
                if (this.emptyFields) {
                    this.fieldsError.value = true;
                    this.fieldsError.text = 'Não podem haver campos vazios';
                } else {
                    this.fieldsError.value = false;

                    this.$http.post('/api/auth/login', this.user)
                        .then(response => {
                            console.log(response);
                            if (response.ok) {
                                this.$store.commit('login', {
                                    access_token: response.body.access_token,
                                    name: this.user.name
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            this.fieldsError.value = true;
                            this.fieldsError.text = 'Nome ou senha inválidos';
                        });
                }
            }
        }
    }
</script>

<style scoped>
    #wrapper {
        width: 35%;
    }
</style>