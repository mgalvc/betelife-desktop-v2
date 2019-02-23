<template>
    <sui-segment color="green">
        <h2>Novo Voluntário</h2>
        <sui-form @submit.prevent="handleSubmit" :loading="loading">
            <sui-form-fields :inline="false" :fields="3">
                <sui-form-field :width="10" required>
                    <label>Nome</label>
                    <input type="text" v-model="volunteer.name" required>
                </sui-form-field>
                <sui-form-field :width="4" required :error="invalidFields.birthdate">
                    <label>Data de nascimento</label>
                    <input type="text" v-mask="'##/##/####'" v-model="volunteer.birthdate" @focusout="calcAge" required>
                    <error :invalid="invalidFields.birthdate">Data inválida</error>
                </sui-form-field>
                <sui-form-field :width="2">
                    <label>Idade</label>
                    <input type="number" v-model="volunteer.age" disabled>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field :width="4">
                    <label>Escolaridade</label>
                    <sui-dropdown
                            required
                            placeholder="Selecione"
                            selection
                            :options="options.schooling"
                            v-model="volunteer.schooling"/>
                </sui-form-field>
                <sui-form-field :width="12" required>
                    <label>Endereço</label>
                    <input type="text" v-model="volunteer.address" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field required>
                    <label>Telefone</label>
                    <input type="text" v-model="volunteer.phone" v-mask="'(##) #####-####'" required>
                </sui-form-field>
                <sui-form-field>
                    <label>Whatsapp</label>
                    <input type="text" v-model="volunteer.whatsapp" v-mask="'(##) #####-####'">
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>E-mail</label>
                    <input type="email" v-model="volunteer.email" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field required>
                    <label>RG</label>
                    <input type="text" v-model="volunteer.rg" required>
                </sui-form-field>
                <sui-form-field required>
                    <label>CPF</label>
                    <input type="text" v-model="volunteer.cpf" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields :inline="false" :fields="2">
                <sui-form-field required>
                    <label>Igreja onde congrega</label>
                    <input type="text" v-model="volunteer.church" required>
                </sui-form-field>
                <sui-form-field required>
                    <label>Nome do pastor</label>
                    <input type="text" v-model="volunteer.pastor" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>Ministério em que atua</label>
                    <input type="text" v-model="volunteer.ministry" required>
                </sui-form-field>
            </sui-form-fields>

            <div class="checkboxes fit">
                <sui-form-fields inline :fields="1">
                    <sui-form-field>
                        <sui-checkbox
                                label="Faz uso contínuo de medicamento"
                                v-model="volunteer.use_medicine"/>
                    </sui-form-field>
                </sui-form-fields>
            </div>

            <sui-form-fields>
                <sui-form-field :width="16" :required="volunteer.use_medicine">
                    <label>Qual?</label>
                    <input type="text" v-model="volunteer.which_medicine" :disabled="!volunteer.use_medicine" :required="volunteer.use_medicine">
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" :required="volunteer.use_medicine">
                    <label>Por que?</label>
                    <input type="text" v-model="volunteer.why_medicine" :disabled="!volunteer.use_medicine" :required="volunteer.use_medicine">
                </sui-form-field>
            </sui-form-fields>

            <div class="checkboxes fit">
                <sui-form-fields inline :fields="1">
                    <sui-form-field>
                        <sui-checkbox
                                label="Faz acompanhamento médico"
                                v-model="volunteer.medical_monitored"/>
                    </sui-form-field>
                </sui-form-fields>
            </div>

            <sui-form-fields>
                <sui-form-field :width="16" :required="volunteer.medical_monitored">
                    <label>Por que?</label>
                    <input type="text" v-model="volunteer.why_medical_monitored" :disabled="!volunteer.medical_monitored" :required="volunteer.medical_monitored">
                </sui-form-field>
            </sui-form-fields>

            <div class="checkboxes fit">
                <sui-form-fields inline :fields="1">
                    <sui-form-field>
                        <sui-checkbox
                                label="Já fez trabalho voluntário"
                                v-model="volunteer.prev_volunteer"/>
                    </sui-form-field>
                </sui-form-fields>
            </div>

            <sui-form-fields>
                <sui-form-field :width="16" :required="volunteer.prev_volunteer">
                    <label>Onde?</label>
                    <input type="text" v-model="volunteer.where_volunteer" :disabled="!volunteer.prev_volunteer" :required="volunteer.prev_volunteer">
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" :required="volunteer.prev_volunteer">
                    <label>Descreva a experiência com 5 palavras</label>
                    <input type="text" v-model="volunteer.experience_as_volunteer" :disabled="!volunteer.prev_volunteer" :required="volunteer.prev_volunteer">
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>O que você entende por voluntariado?</label>
                    <input type="text" v-model="volunteer.what_is_volunteering" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>De acordo com sua opinião, quais são os princípios para a ação voluntária?</label>
                    <input type="text" v-model="volunteer.volunteering_principles" required>
                </sui-form-field>
            </sui-form-fields>

            <div class="checkboxes">
                <sui-form-fields inline :fields="2">
                    <label>Se submete facilmente?</label>
                    <sui-form-field>
                        <sui-checkbox
                                radio
                                label="Sim"
                                value="Y"
                                v-model="volunteer.obedient"/>
                    </sui-form-field>
                    <sui-form-field>
                        <sui-checkbox
                                radio
                                label="Não"
                                value="N"
                                v-model="volunteer.obedient"/>
                    </sui-form-field>
                </sui-form-fields>
            </div>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>Explique</label>
                    <input type="text" v-model="volunteer.obedient_desc" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>O que um voluntário não deve fazer?</label>
                    <input type="text" v-model="volunteer.must_not_do" required>
                </sui-form-field>
            </sui-form-fields>

            <sui-form-fields>
                <sui-form-field :width="16" required>
                    <label>O que você espera da Betelife?</label>
                    <input type="text" v-model="volunteer.expectations" required>
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
            if (this.$route.name === 'edit-volunteer') {
                this.volunteer = this.$route.params.volunteer;
                this.mode = 'edit';
            }
        },
        methods: {
            calcAge() {
                let splittedDate = this.volunteer.birthdate.split('/');
                let date = moment(this.volunteer.birthdate, "DD-MM-YYYY");
                let now = moment();
                if (date.isValid()) {
                    this.volunteer.age = now.diff(date, 'years');
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
                    this.$updateVolunteer(this.volunteer, response => {
                        console.log(response);
                        this.$router.push('/volunteers');
                    });
                } else {
                    this.$saveVolunteer(this.volunteer, response => {
                        console.log(response);
                        this.$router.push('/volunteers');
                    });
                }
            }
        },
        data() {
            return {
                mode: 'new',
                volunteer: {
                    name: '',
                    birthdate: '',
                    age: '',
                    schooling: 'MC',
                    address: '',
                    phone: '',
                    whatsapp: '',
                    email: '',
                    rg: '',
                    cpf: '',
                    church: '',
                    pastor: '',
                    ministry: '',
                    use_medicine: false,
                    which_medicine: '',
                    why_medicine: '',
                    medical_monitored: false,
                    why_medical_monitored: '',
                    prev_volunteer: false,
                    where_volunteer: '',
                    experience_as_volunteer: '',
                    what_is_volunteering: '',
                    volunteering_principles: '',
                    obedient: 'Y',
                    obedient_desc: '',
                    must_not_do: '',
                    expectations: ''
                },
                options: {
                    schooling: [
                        { value: 'FI', text: 'Fundamental Incompleto' },
                        { value: 'FC', text: 'Fundamental Completo' },
                        { value: 'MI', text: 'Médio Incompleto' },
                        { value: 'MC', text: 'Médio Completo' },
                        { value: 'SI', text: 'Superior Incompleto' },
                        { value: 'SC', text: 'Superior Completo' },
                    ]
                },
                invalidFields: {
                    birthdate: false
                },
                loading: false
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
