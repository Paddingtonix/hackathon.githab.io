<template>
    <div class="hackathon__authorization-page">
        <h1 class="hackathon__authorization-page__title">Авторизация</h1>
        <div class="hackathon__authorization-page__form">
            <input-cmp 
                v-for="input in form"
                class="hackathon__authorization-page__form__input"
                :key="input.id"
                :input_value="input.value"
                :input_required="input.required"
                :input_type="input.type"
                :input_label="input.label"
                :input_pattern="input.pattern"
                :input_error="input.error"
                @update="setValue"
                @blur="validCheck(input)"
            />
        </div>  
        <span class="hackathon__authorization-page__registration">
            У вас нет аккаунта? 
            <link-cmp 
                :link_text="'Зарегистрируйтесь'"
                @click="$router.push('/registration')"
            />прямо сейчас!
        </span>
        <btn-cmp 
            :btn_text="'Войти'"
            @click="authorizationUser"
            :btn_disabled="disabled_btn.value"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import inputCmp from '../../components/ui-components/input-cmp/input-cmp.vue'
import linkCmp from '../../components/ui-components/link-cmp/link-cmp.vue'
import btnCmp from '../../components/ui-components/btn-cmp/btn-cmp.vue'
import { mapMutations } from 'vuex'

export default defineComponent({
    setup() {
        const form = reactive([
            {
                id: 'email',
                type: 'text',
                value: '',
                required: true,
                valid: false,
                pattern: '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/i',
                label: 'Email',
                error: ''
            },
            {
                id: 'password',
                type: 'password',
                value: '',
                required: true,
                label: 'Пароль',
                pattern: '',
                valid: false,
                error: ''
            },
        ])

        const disabled_btn = reactive({
            value: true
        })

        // const checkField = () => {
        //     form.every(field => field.value !== '') {
        //         disabled_btn.value = false
        //     }
        // }

        return {
            form,
            disabled_btn,
            // checkField
        }
    },
    components: {
        'input-cmp': inputCmp,
        'link-cmp': linkCmp,
        'btn-cmp': btnCmp
    },
    methods: {
        ...mapMutations('authorizationModule', ['logIn']),

        setValue(val: { type: string; value: string }) {
            for (let i = 0; i < this.form.length; i++) {
                if(this.form[i].type === val.type) {
                    this.form[i].value = val.value
                }
            }
        },
        validCheck(input: { value: string; pattern: string|RegExp, id: string}) {              
            if (input.value && input.value.trim().length) {
                if (input.pattern) {
                    // const regExp = new RegExp(input.pattern, 'i');
                    if (input.id === 'email' && !input.value.match(/@/gi)) {                        
                        const emailInput = this.form.find(item => item.id === input.id);
                        if (emailInput) {
                            emailInput.error = "email обязательно должен содержать @";
                        }
                    } else {
                        const validInput = this.form.find(item => item.id === input.id);
                        if (validInput) {
                            validInput.error = '';
                            validInput.valid = true;
                            if(this.form.every(field => field.error === '')) {
                                this.disabled_btn.value = false
                            }
                        }
                    }
                } else {
                    const validInput = this.form.find(item => item.id === input.id);

                    if (validInput) {
                        validInput.error = '';
                        validInput.valid = true;
                        if(this.form.every(field => field.error === '')) {
                            this.disabled_btn.value = false
                        }
                    }
                }
            } else {
                const inputItem = this.form.find(item => item.id === input.id);
                if (inputItem) {
                    inputItem.error = "поле обязательное для заполнения";
                    this.disabled_btn.value = true
                }
            }
        },
        authorizationUser() {
            this.logIn()
            this.$router.push('/')
        }
    },
    mounted() {
        this.form.every(field => {
            if(field.value) {
                console.log('field');
            }
        })
    },
})
</script>
