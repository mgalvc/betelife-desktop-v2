<template>
    <div>
        <sui-card-group :items-per-row="2">
            <sui-card>
                <sui-card-content>
                    <sui-card-header>{{ students }}</sui-card-header>
                    <sui-card-description>alunos cadastrados</sui-card-description>
                </sui-card-content>
            </sui-card>

            <sui-card>
                <sui-card-content>
                    <sui-card-header>{{ volunteers }}</sui-card-header>
                    <sui-card-description>voluntários cadastrados</sui-card-description>
                </sui-card-content>
            </sui-card>
        </sui-card-group>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$howMany((response) => {
                this.students = response.students,
                this.volunteers = response.volunteers
            });
        },
        data() {
            return {
                students: {},
                volunteers: {}
            }
        }
    }
</script>