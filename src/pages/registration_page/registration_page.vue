<template>
    <div class="hackathon__registartion-page">
        <h1 class="hackathon__registartion-page__title">Регистрация на хакатон</h1>
        <span class="hackathon__registartion-page__alert">Будьте внимательны при регистрации, этот процесс можно пройти только единожды - формат участия, личные данные и прочее изменить потом будет невозможно.</span>
        <selector-cmp 
            :selector_list="participation_format"
            :current_value="'Формат участия *'"
            class="hackathon__registartion-page__form"
            @select_format="setFormat"
        />
        <template v-if="format.value === 1">
            <template 
                v-for="field in registration_form_individual"
                :key="field.id"
            >                
                <selector-cmp 
                    :selector_list="field.combo_box"
                    :current_value="field.label"
                    :selector_id="field.id"
                    v-if="field.combo_box"
                    class="hackathon__registartion-page__form"
                    @select_value="setValue"
                />
                <input-cmp 
                    class="hackathon__registartion-page__form"
                    :input_value="field.value"
                    :input_required="field.required"
                    :input_type="field.id"
                    :input_label="field.label"
                    :input_error="field.error"
                    @update="setValue"
                    @blur="validCheck(field)"
                    v-else
                />
            </template>
        </template>
        <template v-else-if="format.value === 2">
            <input-cmp 
                :input_label="'Название команды'"
                :input_type="'text'"
                :input_value="team_name.value"
                class="hackathon__registartion-page__form _team-name"
            />
            <div 
                class="hackathon__registartion-page__participant"
                v-for="(participant, idx) in registration_form_team"
                :key="participant"
            >   
                <div class="hackathon__registartion-page__participant__container">
                    <span class="hackathon__registartion-page__participant__count">Участник {{ idx + 1 }}/ 4</span>
                    <div 
                        class="hackathon__registartion-page__participant__delete" 
                        @click="deleteParticipant(idx)"
                        v-if="idx !== 0 && idx !== 1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#808E9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Удалить</span>
                    </div>
                </div>             
                <template v-for="(field) in participant.participant" :key="field">
                    <selector-cmp 
                        :selector_list="field.combo_box"
                        :current_value="field.label"
                        v-if="field.combo_box"
                        @blur="validCheck(field)"
                        class="hackathon__registartion-page__form"
                        @select_format="setValue"
                        :participant_idx="idx"
                    />
                    <input-cmp 
                        class="hackathon__registartion-page__form"
                        :input_value="field.value"
                        :input_required="field.required"
                        :input_type="field.id"
                        :input_label="field.label"
                        :input_pattern="field.pattern"
                        :input_error="field.error"
                        :participant_idx="idx"
                        @update="setValue"
                        @blur="validCheck(field)"
                        v-else
                    />
                </template>
            </div>
        </template>
        <div 
            class="hackathon__registartion-page__add-participant" 
            v-if="registration_form_team.length !== 4 && format.value === 2"
            @click="addParticipant"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Добавить участника</span>
        </div>
        <span class="hackathon__registartion-page__privacy-policy">Нажимая кнопку “Зарегистрироваться”, я подтверждаю, что ознакомлен и согласен с <a class="">Политикой обработки персональных данных.</a></span>
        <div class="hackathon__registartion-page__btns">
            <btn-cmp 
                :btn_type="'secondary'"
                :btn_text="'Назад'"
            />
            <btn-cmp 
                :btn_disabled="btn_disabled.value"
                :btn_type="'secondary'"
                :btn_text="'Зарегистрироваться'"
                @click="registration"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import selectorCmp from '../../components/ui-components/selector-cmp/selector-cmp.vue'
import inputCmp from '../../components/ui-components/input-cmp/input-cmp.vue'
import btnCmp from '../../components/ui-components/btn-cmp/btn-cmp.vue'
import { mapMutations } from 'vuex'

export default defineComponent({
    setup() {
        const participation_format = [
            {
                name: 'Индивидуальный',
                id: 1,
            },
            {
                name: 'Командный',
                id: 2,
            }
        ]

        
        const registration_form_team = reactive([
            {
                participant: [
                    {
                        id: 'FIO',
                        type: 'text',
                        value: '',
                        required: true,
                        valid: false,
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        label: 'ФИО *',
                        error: ''
                    },
                    {
                        id: 'study_place',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Место учёбы *',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'specialization',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Специальность *',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'level_education',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Уровень образования *',
                        pattern: '',
                        valid: false,
                        error: '',
                        combo_box: [
                            {
                                name: 'Среднее профессиональное образование',
                                id: 1,
                            },
                            {
                                name: 'Бакалавриат',
                                id: 2,
                            },
                            {
                                name: 'Специалитет',
                                id: 3,
                            },
                            {
                                name: 'Магистратура',
                                id: 4,
                            },
                            {
                                name: 'Аспирантура',
                                id: 5,
                            },
                            {
                                name: 'Ординатура',
                                id: 6,
                            },
                        ]
                    },
                    {
                        id: 'Course',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Курс *',
                        pattern: '',
                        valid: false,
                        error: '',
                        // selector: true,
                        combo_box: [
                            {
                                name: 1,
                                id: 1,
                            },
                            {
                                name: 2,
                                id: 2,
                            },
                            {
                                name: 3,
                                id: 3,
                            },
                            {
                                name: 4,
                                id: 4,
                            },
                            {
                                name: 5,
                                id: 5,
                            },
                            {
                                name: 6,
                                id: 6,
                            },
                            {
                                name: 'Выпускник',
                                id: 6,
                            },
                        ]
                    },
                    {
                        id: 'work_place',
                        type: 'text',
                        value: '',
                        required: false,
                        label: 'Место работы',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'position',
                        type: 'text',
                        value: '',
                        required: false,
                        label: 'Должность',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'tel',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Телефон *',
                        pattern: /^[\d\s-]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'email',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Email *',
                        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                        valid: false,
                        error: ''
                    }, 
                ]
            },
            {
                participant: [
                    {
                        id: 'FIO',
                        type: 'text',
                        value: '',
                        required: true,
                        valid: false,
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        label: 'ФИО *',
                        error: ''
                    },
                    {
                        id: 'study_place',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Место учёбы *',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'specialization',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Специальность *',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'level_education',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Уровень образования *',
                        pattern: '',
                        valid: false,
                        error: '',
                        combo_box: [
                            {
                                name: 'Среднее профессиональное образование',
                                id: 1,
                            },
                            {
                                name: 'Бакалавриат',
                                id: 2,
                            },
                            {
                                name: 'Специалитет',
                                id: 3,
                            },
                            {
                                name: 'Магистратура',
                                id: 4,
                            },
                            {
                                name: 'Аспирантура',
                                id: 5,
                            },
                            {
                                name: 'Ординатура',
                                id: 6,
                            },
                        ]
                    },
                    {
                        id: 'Course',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Курс *',
                        pattern: '',
                        valid: false,
                        error: '',
                        // selector: true,
                        combo_box: [
                            {
                                name: 1,
                                id: 1,
                            },
                            {
                                name: 2,
                                id: 2,
                            },
                            {
                                name: 3,
                                id: 3,
                            },
                            {
                                name: 4,
                                id: 4,
                            },
                            {
                                name: 5,
                                id: 5,
                            },
                            {
                                name: 6,
                                id: 6,
                            },
                            {
                                name: 'Выпускник',
                                id: 6,
                            },
                        ]
                    },
                    {
                        id: 'work_place',
                        type: 'text',
                        value: '',
                        required: false,
                        label: 'Место работы',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'position',
                        type: 'text',
                        value: '',
                        required: false,
                        label: 'Должность',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'tel',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Телефон *',
                        pattern: /^[\d\s-]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'email',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Email *',
                        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                        valid: false,
                        error: ''
                    }, 
                ]
            }    
        ]) 

        const registration_form_individual = reactive([
            {
                id: 'FIO',
                type: 'text',
                value: '',
                required: true,
                valid: false,
                pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                label: 'ФИО *',
                error: ''
            },
            {
                id: 'study_place',
                type: 'text',
                value: '',
                required: true,
                label: 'Место учёбы *',
                pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                valid: false,
                error: ''
            },
            {
                id: 'specialization',
                type: 'text',
                value: '',
                required: true,
                label: 'Специальность *',
                pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                valid: false,
                error: ''
            },
            {
                id: 'level_education',
                type: 'text',
                value: '',
                required: true,
                label: 'Уровень образования *',
                pattern: '',
                valid: false,
                error: '',
                // selector: true,
                combo_box: [
                    {
                        name: 'Среднее профессиональное образование',
                        id: 1,
                    },
                    {
                        name: 'Бакалавриат',
                        id: 2,
                    },
                    {
                        name: 'Специалитет',
                        id: 3,
                    },
                    {
                        name: 'Магистратура',
                        id: 4,
                    },
                    {
                        name: 'Аспирантура',
                        id: 5,
                    },
                    {
                        name: 'Ординатура',
                        id: 6,
                    },
                ]
            },
            {
                id: 'Course',
                type: 'text',
                value: '',
                required: true,
                label: 'Курс *',
                pattern: '',
                valid: false,
                error: '',
                // selector: true,
                combo_box: [
                    {
                        name: 1,
                        id: 1,
                    },
                    {
                        name: 2,
                        id: 2,
                    },
                    {
                        name: 3,
                        id: 3,
                    },
                    {
                        name: 4,
                        id: 4,
                    },
                    {
                        name: 5,
                        id: 5,
                    },
                    {
                        name: 6,
                        id: 6,
                    },
                    {
                        name: 'Выпускник',
                        id: 6,
                    },
                ]
            },
            {
                id: 'work_place',
                type: 'text',
                value: '',
                required: false,
                label: 'Место работы',
                pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                valid: false,
                error: ''
            },
            {
                id: 'position',
                type: 'text',
                value: '',
                required: false,
                label: 'Должность',
                pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                valid: false,
                error: ''
            },
            {
                id: 'tel',
                type: 'text',
                value: '',
                required: true,
                label: 'Телефон *',
                pattern: /^[\d\s-]+$/,
                valid: false,
                error: ''
            },
            {
                id: 'email',
                type: 'text',
                value: '',
                required: true,
                label: 'Email *',
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                valid: false,
                error: ''
            },
        ])
        
        const team_name = reactive({
            value: ''
        })

        const btn_disabled = reactive({
            value: true
        })

        const format = reactive({
            value: 0
        })

        return {
            participation_format,
            btn_disabled,
            registration_form_individual,
            registration_form_team,
            team_name,
            format
        }
    },
    components: {
        'selector-cmp': selectorCmp,
        'btn-cmp': btnCmp,
        'input-cmp': inputCmp
    },
    methods: {
        ...mapMutations('modalModule', ['open']),

        setFormat(val: number) {
            this.format.value = val
        },
        addParticipant() {
            this.registration_form_team.push({
                participant: [
                    {
                        id: 'FIO',
                        type: 'text',
                        value: '',
                        required: true,
                        valid: false,
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        label: 'ФИО *',
                        error: ''
                    },
                    {
                        id: 'study_place',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Место учёбы *',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'specialization',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Специальность *',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'level_education',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Уровень образования *',
                        pattern: '',
                        valid: false,
                        error: '',
                        combo_box: [
                            {
                                name: 'Среднее профессиональное образование',
                                id: 1,
                            },
                            {
                                name: 'Бакалавриат',
                                id: 2,
                            },
                            {
                                name: 'Специалитет',
                                id: 3,
                            },
                            {
                                name: 'Магистратура',
                                id: 4,
                            },
                            {
                                name: 'Аспирантура',
                                id: 5,
                            },
                            {
                                name: 'Ординатура',
                                id: 6,
                            },
                        ]
                    },
                    {
                        id: 'Course',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Курс *',
                        pattern: '',
                        valid: false,
                        error: '',
                        // selector: true,
                        combo_box: [
                            {
                                name: 1,
                                id: 1,
                            },
                            {
                                name: 2,
                                id: 2,
                            },
                            {
                                name: 3,
                                id: 3,
                            },
                            {
                                name: 4,
                                id: 4,
                            },
                            {
                                name: 5,
                                id: 5,
                            },
                            {
                                name: 6,
                                id: 6,
                            },
                            {
                                name: 'Выпускник',
                                id: 6,
                            },
                        ]
                    },
                    {
                        id: 'work_place',
                        type: 'text',
                        value: '',
                        required: false,
                        label: 'Место работы',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'position',
                        type: 'text',
                        value: '',
                        required: false,
                        label: 'Должность',
                        pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'tel',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Телефон *',
                        pattern: /^[\d\s-]+$/,
                        valid: false,
                        error: ''
                    },
                    {
                        id: 'email',
                        type: 'text',
                        value: '',
                        required: true,
                        label: 'Email *',
                        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                        valid: false,
                        error: ''
                    }, 
                ]
            })
        },
        setValue(val: { type: string; value?: string, selector_id: string, select_value?: any, idx: number }) {
            if(this.format.value === 1) {
                for (let i = 0; i < this.registration_form_individual.length; i++) {
                    if(this.registration_form_individual[i].id === val.type || this.registration_form_individual[i].id === val.selector_id) {  
                        if(val.value) {
                            this.registration_form_individual[i].value = val.value
                        } else if(val.select_value) {                        
                            this.registration_form_individual[i].value = val.select_value.name
                        }
                    }
                }
            } else {
                console.log(val);
                for (let i = 0; i < this.registration_form_team.length; i++) {
                    if(i === val.idx) {                        
                        for(let j = 0; j < this.registration_form_team[i].participant.length; j++) {
                            if(this.registration_form_team[i].participant[j].id === val.type || this.registration_form_team[i].participant[j].id === val.selector_id) {  
                                if(val.value) {
                                    this.registration_form_team[i].participant[j].value = val.value
                                } else if(val.select_value) {                        
                                    this.registration_form_team[i].participant[j].value = val.select_value.name
                                }
                            }

                        }
                    }
                }
            }
            
        },
        validCheck(input: { value: string; pattern: string|RegExp, id: string, error: string, required: boolean, valid: boolean}) {  
            const regExp = new RegExp(input.pattern, 'i');            
            if(input.value) {
                if(input.id === 'email' && !input.value.match(/@/gi)) {
                    input.error = 'Поле может содержать только латиницу, цифры и специальные символы'
                } else if(!regExp.test(input.value)){
                    console.log(regExp.test(input.value));
                    input.error = 'Поле может содержать только латиницу, кириллицу, цифры и пробел'
                } else {
                    input.error = ""

                    if(this.registration_form_individual.every(field_value => field_value.value !== '')) {
                        this.btn_disabled.value = false
                    }
                }
               
            } else if(!input.value.length && input.required) {   
                input.error = 'Поле обязательно к заполнению'
            } 
        },
        deleteParticipant(participant_idx: number) {
            this.registration_form_team.splice(participant_idx, 1)
        },
        registration() {
            this.$router.push('/')
            this.open()
        }
    }
})
</script>
