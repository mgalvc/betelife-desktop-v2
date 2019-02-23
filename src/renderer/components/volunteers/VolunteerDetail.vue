<template>
    <sui-modal v-model="open">
        <sui-modal-header>{{ volunteer.name }}</sui-modal-header>
        <sui-modal-content scrolling>
            <sui-modal-description>
                <p><b>Data de nascimento</b>: {{ volunteer.birthdate }}</p>
                <p><b>Idade</b>: {{ volunteer.age }}</p>
                <p><b>Escolaridade</b>: {{ volunteer.schooling }}</p>
                <p><b>Telefone</b>: {{ volunteer.phone }}</p>
                <p><b>Whatsapp</b>: {{ volunteer.whatsapp }}</p>
                <p><b>E-mail</b>: {{ volunteer.email }}</p>
                <p><b>RG</b>: {{ volunteer.rg }}</p>
                <p><b>CPF</b>: {{ volunteer.cpf }}</p>
                <p><b>Igreja onde congrega</b>: {{ volunteer.church }}</p>
                <p><b>Pastor</b>: {{ volunteer.pastor }}</p>
                <p><b>Ministério em que atua</b>: {{ volunteer.ministry }}</p>
                <p><b>Medicamento contínuo</b>: {{ medicine }}</p>
                <p v-if="volunteer.use_medicine"><b>Motivo do medicamento</b>: {{ volunteer.why_medicine }}</p>
                <p><b>Acompanhamento médico</b>: {{ medicalMonitored }}</p>
                <p v-if="volunteer.medical_monitored"><b>RG</b>: {{ volunteer.why_medical_monitored }}</p>
                <p><b>Já foi voluntário</b>: {{ prevVolunteer }}</p>
                <p v-if="volunteer.prev_volunteer"><b>Experiência</b>: {{ volunteer.experience_as_volunteer }}</p>
                <p><b>O que entende por voluntariado</b>: {{ volunteer.what_is_volunteering }}</p>
                <p><b>Princípios do voluntariado</b>: {{ volunteer.volunteering_principles }}</p>
                <p><b>Se submete facilmente</b>: {{ isObedient }}</p>
                <p><b>Sobre submissão</b>: {{ volunteer.obedient_desc }}</p>
                <p><b>O que um voluntário não deve fazer</b>: {{ volunteer.must_not_do }}</p>
                <p><b>O que espera da Betelife</b>: {{ volunteer.expectations }}</p>
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
            'volunteer': Object
        },
        computed: {
            medicine() {
                return this.volunteer.use_medicine ? volunteer.which_medicine : 'Não utiliza';
            },
            medicalMonitored() {
                return this.volunteer.medical_monitored ? 'Sim' : 'Não';
            },
            prevVolunteer() {
                return this.volunteer.prev_volunteer ? 'Sim' : 'Não';
            },
            isObedient() {
                return this.volunteer.obedient ? 'Sim' : 'Não';
            }
        },
        methods: {
            edit() {
                this.$router.push({ name: 'edit-volunteer', params: { volunteer: this.volunteer } });
            },
            changeStatus() {
                let info = { id: this.volunteer.id, active: !this.volunteer.active };
                this.$updateVolunteerStatus(info, done => {
                    if (done) {
                        this.$emit('update');
                    }
                });
            },
            remove() {
                if (confirm('Deseja realmente deletar este voluntário?')) {
                    this.$deleteVolunteer(this.volunteer.id, done => {
                        if (done) {
                           this.$emit('update'); 
                        }
                    });
                }
            }
        }
    }
</script>