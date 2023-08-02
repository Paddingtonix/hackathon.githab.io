<template>
    <div class="hackathon__task-page">
        <h1 class="hackathon__task-page__title">{{ tasks.task.title }}</h1>
        <div class="hackathon__task-page__container">
            <span class="hackathon__task-page__subtitle">{{ tasks.task.subtitle }}</span>
            <div class="hackathon__task-page__task-text hachathon__wysiwig" v-html="tasks.task.wysiwyg"></div>
        </div>
        <template v-if="isAuth">
            <primary-link-cmp 
                class="hackathon__task-page__btn"
                :text="'Отправить решение'"
                @click="$router.push('/solution')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z" stroke="#03AEE2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </primary-link-cmp>
            <primary-link-cmp 
                class="hackathon__task-page__btn"
                :text="'Смотреть результаты'"
                @click="$router.push('/leader_board')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 11H8M10 15H8M16 7H8M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H11.5M22 22L20.5 20.5M21.5 18C21.5 19.933 19.933 21.5 18 21.5C16.067 21.5 14.5 19.933 14.5 18C14.5 16.067 16.067 14.5 18 14.5C19.933 14.5 21.5 16.067 21.5 18Z" stroke="#03AEE2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </primary-link-cmp>
        </template>
        <div class="hackathon__task-page__btns">
            <btn-cmp 
                class="hackathon__task-page__back"
                :btn_type="'secondary'"
                :btn_text="'Назад'"
                @click="$router.push('/')"
            />
            <btn-cmp 
                v-if="!isAuth"
                class="hackathon__task-page__back"
                :btn_type="'primary'"
                :btn_text="'Принять участие'"
                @click="$router.push('/authorization')"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import primaryLinkCmp from '../../components/ui-components/primary-link-cmp/parimary-link-cmp.vue'
import btnCmp from '../../components/ui-components/btn-cmp/btn-cmp.vue'
import { mapState } from 'vuex'

interface tasks {
    title: String,
    subtitle: String,
    wysiwyg: String
}

export default defineComponent({
    setup() {
        const tasks = reactive({
            task: Array<tasks>()
        })

        axios
            .get('api/task.json')
            .then(task => {
                tasks.task = task.data
            })
        
        return {
            tasks
        }
    },
    computed: {
        ...mapState('authorizationModule', ['isAuth'])
    },
    components: {
        'primary-link-cmp': primaryLinkCmp,
        'btn-cmp': btnCmp
    }
})
</script>