<template>
    <sui-segment color="green">
        <h2>Novo Aluno</h2>
        <sui-form @submit.prevent="handleSubmit" :loading="loading">
            <sui-form-fields :inline="false" :fields="4">
                <sui-form-field :width="6" required>
                    <label>Nome</label>
                    <input type="text" v-model="student.name" required>
                </sui-form-field>
                <sui-form-field :width="4" required :error="invalidFields.birthdate">
                    <label>Data de nascimento</label>
                    <input type="text" v-mask="'##/##/####'" v-model="student.birthdate" @focusout="calcAge" required>
                    <error :invalid="invalidFields.birthdate">Data inválida</error>
                </sui-form-field>
                <sui-form-field :width="2">
                    <label>Idade</label>
                    <input type="number" v-model="student.age" disabled>
                </sui-form-field>
                <sui-form-field :width="4">
                    <label>Camisa</label>
                    <sui-dropdown
                        placeholder="Selecione"
                        selection
                        :options="options.shirt_size"
                        v-model="student.shirt_size"/>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field required>
                    <label>Nome do pai</label>
                    <input type="text" v-model="student.father" required>
                </sui-form-field>
                <sui-form-field required>
                    <label>Nome da mãe</label>
                    <input type="text" v-model="student.mother" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field :width="4" required>
                    <label>Telefone</label>
                    <input type="text" v-model="student.phone" v-mask="'(##) #####-####'" required>
                </sui-form-field>
                <sui-form-field :width="12" required>
                    <label>Endereço</label>
                    <input type="text" v-model="student.address" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>Mora com quem?</label>
                    <input type="text" v-model="student.lives_with" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field :width="4">
                    <label>Responsável pela inscrição</label>
                    <sui-dropdown
                            placeholder="Selecione"
                            selection
                            :options="options.responsible"
                            v-model="student.responsible"/>
                </sui-form-field>
                <sui-form-field :width="12" required>
                    <label>RG do responsável</label>
                    <input type="text" v-model="student.responsible_rg" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field required>
                    <label>Profissão do pai</label>
                    <input type="text" v-model="student.job_father" required>
                </sui-form-field>
                <sui-form-field required>
                    <label>Profissão da mãe</label>
                    <input type="text" v-model="student.job_mother" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field required>
                    <label>Religião do pai</label>
                    <input type="text" v-model="student.religion_father" required>
                </sui-form-field>
                <sui-form-field required>
                    <label>Religião da mãe</label>
                    <input type="text" v-model="student.religion_mother" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field :width="12" required>
                    <label>Escola em que está matriculado(a)</label>
                    <input type="text" v-model="student.school" required>
                </sui-form-field>
                <sui-form-field :width="4" required>
                    <label>Série</label>
                    <input type="text" v-model="student.grade" required>
                </sui-form-field>
            </sui-form-fields>

            <div class="checkboxes">
                <sui-form-fields inline :fields="2">
                    <sui-form-field>
                        <sui-checkbox
                            label="É repetente"
                            v-model="student.repeat_student"/>
                    </sui-form-field>
                    <sui-form-field>
                        <sui-checkbox
                            label="Já é aluno(a) do projeto"
                            v-model="student.prev_student"/>
                    </sui-form-field>
                </sui-form-fields>
            </div>

            <div class="checkboxes fit">
                <sui-form-fields inline :fields="1">
                    <sui-form-field>
                        <sui-checkbox
                            label="Tem algum problema de saúde"
                            v-model="student.health_issue"/>
                    </sui-form-field>
                </sui-form-fields>
            </div>

            <sui-form-fields>
                <sui-form-field :width="16" :required="student.health_issue">
                    <label>Qual?</label>
                    <input type="text" v-model="student.which_health_issue" :disabled="!student.health_issue" :required="student.health_issue">
                </sui-form-field>
            </sui-form-fields>

            <div class="checkboxes fit">
                <sui-form-fields inline :fields="1">
                    <sui-form-field>
                        <sui-checkbox
                                label="Faz uso contínuo de medicamento"
                                v-model="student.use_medicine"/>
                    </sui-form-field>
                </sui-form-fields>
            </div>

            <sui-form-fields>
                <sui-form-field :width="16" :required="student.use_medicine">
                    <label>Qual?</label>
                    <input type="text" v-model="student.which_medicine" :disabled="!student.use_medicine" :required="student.use_medicine">
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>Remédio a tomar em caso de febre</label>
                    <input type="text" v-model="student.fever_drug" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>Recomendação da família</label>
                    <input type="text" v-model="student.family_reco" required>
                </sui-form-field>
            </sui-form-fields>

            <div class="checkboxes fit">
                <sui-form-fields inline :fields="1">
                    <sui-form-field>
                        <sui-checkbox
                                label="Retornará sozinho para casa"
                                v-model="student.home_alone"/>
                    </sui-form-field>
                </sui-form-fields>
            </div>

            <sui-form-fields>
                <sui-form-field :width="16" :required="!student.home_alone">
                    <label>Quem levará a criança para casa?</label>
                    <input type="text" v-model="student.who_takes_home" :disabled="student.home_alone" :required="!student.home_alone">
                </sui-form-field>
            </sui-form-fields>

            <sui-button color="green">Salvar</sui-button>
        </sui-form>
    </sui-segment>
</template>

<script>
    var moment = require('moment');
    import FieldError from '../shared/fieldError/FieldError'

    export default {
        components: {
            'error': FieldError
        },
        mounted() {
            if (this.$route.name === 'edit-student') {
                this.student = this.$route.params.student;
                this.mode = 'edit';
            }
        },
        methods: {
            calcAge() {
                let splittedDate = this.student.birthdate.split('/');
                let date = moment(this.student.birthdate, "DD-MM-YYYY");
                let now = moment();
                if (date.isValid()) {
                    this.student.age = now.diff(date, 'years');
                    this.invalidFields.birthdate = false;
                } else {
                    this.invalidFields.birthdate = true;
                }
            },
            handleSubmit() {
                if (this.invalidFields.birthdate) {
                    return;
                }

                this.loading = true;

                if (this.mode === 'edit') {
                    this.$updateStudent(this.student, response => {
                        console.log(response);
                        this.$router.push('/students');
                    });
                } else {
                    this.$saveStudent(this.student, response => {
                        console.log(response);
                        this.$router.push('/students');
                    });
                }
            }
        },
        data() {
            return {
                mode: 'new',
                loading: false,
                student: {
                    name: '',
                    birthdate: '',
                    age: '',
                    shirt_size: 'P',
                    father: '',
                    mother: '',
                    phone: '',
                    address: '',
                    lives_with: '',
                    responsible: 'M',
                    responsible_rg: '',
                    job_father: '',
                    job_mother: '',
                    religion_father: '',
                    religion_mother: '',
                    school: '',
                    grade: '',
                    repeat_student: false,
                    prev_student: false,
                    health_issue: false,
                    which_health_issue: '',
                    use_medicine: false,
                    which_medicine: '',
                    fever_drug: '',
                    family_reco: '',
                    home_alone: false,
                    who_takes_home: ''
                },
                options: {
                    shirt_size: [
                        { text: 'P', value: 'P' },
                        { text: 'M', value: 'M' },
                        { text: 'G', value: 'G' }
                    ],
                    responsible: [
                        { text: 'Pai', value: 'F' },
                        { text: 'Mãe', value: 'M' }
                    ]
                },
                invalidFields: {
                    birthdate: false
                }
            }
        }
    }
</script>

<style scoped>
    .checkboxes {
        width: 40%;
        text-align: center;
        margin: auto;
    }

    .fit {
        width: fit-content;
    }
</style>