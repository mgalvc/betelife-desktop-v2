<template>
    <div id="navbar-wrapper">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8">
                    <sui-container text-align="left">Olá, Jaciane</sui-container>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-menu :widths="Object.keys(items).length" pointing>
            <sui-menu-item
                    class="pointer"
                    v-for="(i, item) in items"
                    :key="item"
                    :active="isActive(item)"
                    @click="select(item)">
                {{ item }}
            </sui-menu-item>
        </sui-menu>
    </div>
</template>

<script>
    export default {
        mounted() {
          this.route();
        },
        data() {
            return {
                items: {
                    'Home': 'home',
                    'Alunos': 'students',
                    'Voluntários': 'volunteers'
                },
                active: 'Home'
            }
        },
        methods: {
            isActive(name) {
                return this.active == name;
            },
            select(item) {
                this.active = item;
                this.route();
            },
            route() {
                this.$router.push({ name: this.items[this.active] });
            },
            logout() {
                this.$http.get('/api/auth/logout', this.$store.getters.header)
                    .then(response => {
                        this.$store.commit('logout');
                    })
                    .catch(error => {
                        console.log(error);
                        if (error.status == 401) {
                            this.$store.commit('logout');
                            this.$router.replace('/login')
                        } else {
                            console.log(error);
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    #navbar-wrapper {
        margin-bottom: 20px;
    }

    .pointer {
        cursor: pointer;
    }
</style>