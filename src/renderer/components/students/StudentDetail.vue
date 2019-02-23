<template>
    <sui-modal v-model="open">
        <sui-modal-header>{{ student.name }}</sui-modal-header>
        <sui-modal-content scrolling>
            <sui-modal-description>
                <p><b>Data de nascimento</b>: {{ student.birthdate }}</p>
                <p><b>Idade</b>: {{ student.age }}</p>
                <p><b>Tamanho da camisa</b>: {{ student.shirt_size }}</p>
                <p><b>Pai</b>: {{ student.father }}</p>
                <p><b>Mãe</b>: {{ student.mother }}</p>
                <p><b>Telefone</b>: {{ student.phone }}</p>
                <p><b>Endereço</b>: {{ student.address }}</p>
                <p><b>Mora com</b>: {{ student.lives_with }}</p>
                <p><b>Responsável</b>: {{ student.responsible }}</p>
                <p><b>RG do responsável</b>: {{ student.responsible_rg }}</p>
                <p><b>Profissão do pai</b>: {{ student.job_father }}</p>
                <p><b>Profissão da mãe</b>: {{ student.job_mother }}</p>
                <p><b>Religião do pai</b>: {{ student.religion_father }}</p>
                <p><b>Religião da mãe</b>: {{ student.religion_mother }}</p>
                <p><b>Escola</b>: {{ student.school }}</p>
                <p><b>Série</b>: {{ student.grade }}</p>
                <p><b>É repetente</b>: {{ isRepeatingGrade }}</p>
                <p><b>Já é aluno do projeto</b>: {{ isPrevStudent }}</p>
                <p><b>Problema de saúde</b>: {{ healthIssue }}</p>
                <p><b>Medicamentos utilizados</b>: {{ medicine }}</p>
                <p><b>Remédio em caso de febre</b>: {{ student.fever_drug }}</p>
                <p><b>Recomendações</b>: {{ student.family_reco }}</p>
                <p><b>Quem leva para casa</b>: {{ whoTakesHome }}</p>
            </sui-modal-description>
        </sui-modal-content>
        <sui-modal-actions>
            <sui-button color="blue" @click="edit()">Editar</sui-button>
            <sui-button color="blue" @click="changeStatus()">Alterar Status</sui-button>
            <sui-button color="red" @click="remove()" inverted>Deletar</sui-button>
        </sui-modal-actions>
    </sui-modal>
</template>

<script>
    export default {
        props: {
            'open': Boolean,
            'student': Object
        },
        computed: {
            isRepeatingGrade() {
                return this.student.repeat_student ? 'Sim' : 'Não';
            },
            healthIssue() {
                return this.student.health_issue ? this.student.which_health_issue : 'Nenhum';
            },
            whoTakesHome() {
                return this.student.home_alone ? 'Vai sozinha' : this.student.who_takes_home;
            },
            isPrevStudent() {
                return this.student.prev_student ? 'Sim' : 'Não';
            },
            medicine() {
                return this.student.use_medicine ? this.student.which_medicine : 'Não utiliza';
            }
        },
        methods: {
            edit() {
                this.$router.push({ name: 'edit-student', params: { student: this.student } });
            },
            changeStatus() {
                let info = { id: this.student.id, active: !this.student.active };
                this.$updateStudentStatus(info, done => {
                    if (done) {
                        this.$emit('update');
                    }
                });
            },
            remove() {
                if (confirm('Deseja realmente deletar este aluno?')) {
                    this.$deleteStudent(this.student.id, done => {
                        if (done) {
                           this.$emit('update'); 
                        }
                    });
                }
            }
        }
    }
</script>