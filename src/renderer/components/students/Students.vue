<template>
    <div>
        <div>
            <router-link :to="{name: 'new-student'}">
                <sui-button color="green">Novo Aluno</sui-button>
            </router-link>
        </div>
        <sui-table>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>Nome</sui-table-header-cell>
                    <sui-table-header-cell>Idade</sui-table-header-cell>
                    <sui-table-header-cell>Mãe</sui-table-header-cell>
                    <sui-table-header-cell>Telefone</sui-table-header-cell>
                    <sui-table-header-cell>Status</sui-table-header-cell>
                    <sui-table-header-cell>Ações</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>
            <sui-table-body>
                <sui-table-row v-for="student in students" :key="student.id">
                    <sui-table-cell>{{ student.name }}</sui-table-cell>
                    <sui-table-cell>{{ student.age }}</sui-table-cell>
                    <sui-table-cell>{{ student.mother }}</sui-table-cell>
                    <sui-table-cell>{{ student.phone }}</sui-table-cell>
                    <sui-table-cell>
                        <sui-label :color="statusColor(student.active)">{{ status(student.active) }}</sui-label>
                    </sui-table-cell>
                    <sui-table-cell>
                        <sui-button inverted color="blue" @click="openModal(student.id)">
                            <v-icon name="info-circle" />
                        </sui-button>
                        <sui-button @click="printPDF(student.id)" inverted color="blue"><v-icon name="print" /></sui-button>
                    </sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>

        <modal :open="modal" :student="student" @update="update()"></modal>
    </div>
</template>

<script>
    import StudentDetail from './StudentDetail'
    const electron = require('electron')
    const BrowserWindow = electron.remote.BrowserWindow

    export default {
        components: {
            'modal': StudentDetail
        },
        mounted() {
            this.update();
        },
        data() {
            return {
                students: {},
                modal: false,
                student: {}
            }
        },
        methods: {
            status(value) {
                return value ? 'Ativo' : 'Inativo';
            },
            statusColor(value) {
                return value ? 'green' : 'red';
            },
            openModal(id) {
                this.$getStudent(id, response => {
                    this.student = response;
                    this.modal = true;
                });
            },
            update() {
                this.$getStudents((response) => {
                    this.students = response;
                    this.modal = false;
                });
            },
            printPDF(id) {
                this.$printStudent(id, html => {
                    let studentPage = new BrowserWindow()
                    studentPage.loadURL("data:text/html;charset=utf-8," + encodeURI(html))
                    
                    studentPage.webContents.on('did-finish-load', ()=>{
                        studentPage.show();
                        studentPage.focus();
                        
                        studentPage.webContents.print({}, success => {
                            console.log(success)
                        })
                    });
                })
            }
        }
    }
</script>