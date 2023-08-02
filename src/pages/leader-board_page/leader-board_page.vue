<template>
    <div class="hackathon__leader-board">
        <h1 class="hackathon__leader-board__title">Решения и результаты</h1>
        <tabs-cmp 
            class="hackathon__leader-board__tabs"
            :tabs="tabs"
            :id="tab_id.value"
            @select="setTabId"
        />
        <div class="hackathon__leader-board__table" v-if="tab_id.value === 2">
            <div class="hackathon__leader-board__table__row">
                <span class="hackathon__leader-board__table__row__value">Команда</span>
                <span class="hackathon__leader-board__table__row__value">Счет</span>
                <span class="hackathon__leader-board__table__row__value">Загрузка</span>
                <span class="hackathon__leader-board__table__row__value">Попытки на сегодня</span>
            </div>
            <div 
                class="hackathon__leader-board__table__row" 
                v-for="row in table.table" 
                :key="row"
            >
                <span class="hackathon__leader-board__table__row__value">{{ row.team }}</span>
                <span class="hackathon__leader-board__table__row__value">{{ row.score }}</span>
                <span class="hackathon__leader-board__table__row__value">{{ row.loaded }}</span>
                <span class="hackathon__leader-board__table__row__value">{{ row.try }}</span>
            </div>
        </div>
        <div class="hackathon__leader-board__upload-file" v-if="tab_id.value === 1">
            <input ref="fileInput" type="file" :style="{display: 'none'}" />
            <btn-cmp 
                :btn_text="upload_btn"
                @click="uploadFile"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M21.5 15V16.2C21.5 17.8802 21.5 18.7202 21.173 19.362C20.8854 19.9265 20.4265 20.3854 19.862 20.673C19.2202 21 18.3802 21 16.7 21H8.3C6.61984 21 5.77976 21 5.13803 20.673C4.57354 20.3854 4.1146 19.9265 3.82698 19.362C3.5 18.7202 3.5 17.8802 3.5 16.2V15M17.5 8L12.5 3M12.5 3L7.5 8M12.5 3V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </btn-cmp>
            <span v-if="!file" class="hackathon__leader-board__upload-file__explanation">Форматы файлов: DOC, DOCX, PDF</span>
            <div v-else class="hackathon__leader-board__upload-file__explanation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 10V4.5C6 3.67157 6.67157 3 7.5 3C8.32843 3 9 3.67157 9 4.5V10C9 11.6569 7.65685 13 6 13C4.34315 13 3 11.6569 3 10V6M12.5 2H15.2C16.8802 2 17.7202 2 18.362 2.32698C18.9265 2.6146 19.3854 3.07354 19.673 3.63803C20 4.27976 20 5.11984 20 6.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V16.5" stroke="#737F84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>
                    Загружено:
                    {{ file.name }}
                    ({{ file.size }} B)
                </span>
            </div>
            <div class="hackathon__leader-board__upload-file__text">
                <span :class="{'_error': attempts.current === 0}">На сегодня осталось попыток: {{ attempts.current }}</span>
                <span>Всего сделано попыток: {{ attempts.general }}</span>
            </div>
        </div>
        <div class="hackathon__leader-board__btns" :class="{'_upload-file': tab_id.value === 1}">
            <btn-cmp 
                :btn_text="'Назад'"
                :btn_type="'secondary'"
                class="hackathon__leader-board__back"
                @click="$router.push('/')"
            />
            <btn-cmp
                v-if="tab_id.value === 1"
                :btn_text="'Отправить'"
                :btn_disabled="disabled.value"
                @click="setFile"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios'
import btnCmp from '../../components/ui-components/btn-cmp/btn-cmp.vue'
import tabsCmp from '../../components/ui-components/tabs-cmp/tabs-cmp.vue'

export default defineComponent({
    setup() {
        const tabs = reactive(
        [
            {
                name: 'Отправить данные',
                id: 1
            },
            {
                name: 'Предварительные результаты',
                id: 2
            }
        ])
        const disabled = reactive({
            value: true
        })
        
        const tab_id = reactive({
            value: 2
        })

        const table = reactive({
            table: [] as Array<{
                team: String,
                score: Number,
                loaded: Number,
                try: Number
            }>
        })

        const attempts = reactive({
            general: 0,
            current: 0
        })
        
        axios
            .get('/api/table.json')
            .then(table_response => table.table = table_response.data)


        axios
            .get('/api/attempts.json')
            .then(attempts_response => {
                attempts.current = attempts_response.data.current
                attempts.general = attempts_response.data.general
            })

        return {
            tabs,
            tab_id,
            table,
            disabled,
            attempts
        }
    },
    data() {
        return {
            file: null as any,
            upload_btn: 'Загрузить задание',
            success: false
        }
    },
    components: {
        'tabs-cmp': tabsCmp,
        'btn-cmp': btnCmp,
    },
    methods: {
        setTabId(val: number) {
            this.tab_id.value = val
        },
        uploadFile() {
            const file_input = this.$refs.fileInput as any

            file_input.click();
            file_input.addEventListener('change', () => {
                this.file = file_input.files[0]
                if(this.file) {
                    this.disabled.value = false
                    this.upload_btn = 'Загрузить другой файл'
                }                
            })
        },
        setFile() {
            //axios 
            this.success = !this.success
        }
    }
})
</script>