<template>
    <div 
        class="hackathon__selector" 
        :class="{'_select-field':open_list.value }"
    >
        <div 
            class="hackathon__selector__label" 
            @click="openSelectorList"
        >
            <label :class="{'_fill-label': default_value.value !== current_value}">{{ default_value.value }}</label>
            <svg :class="{'_open-list': open_list.value}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <transition name="fadeHeight">
            <div class="hackathon__selector__list"  v-if="open_list.value">
                <span 
                    class="hackathon__selector__list__name"
                    v-for="list_value in selector_list" 
                    :key="list_value"
                    @click="selectValue(list_value, selector_id)"
                >{{ list_value.name }}</span>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

    export default defineComponent({
        props: {
            selector_list: {
                type: Array,
                default: () => []
            },
            current_value: {
                type: String,
                default: 'Формат участия *'
            },
            selector_id: {
                default: ''
            },
            participant_idx: {
                type: Number,
                default: 0
            }

        },
        setup(props) {
            const default_value = reactive({
                value: props.current_value
            })

            const open_list = reactive({
                value: false
            })

            return {
                default_value,
                open_list
            }
        },
        methods: {
            openSelectorList() {
                this.open_list.value = !this.open_list.value
            },
            selectValue(select_value: {name: string, id: number}, selector_id: string) {
                this.default_value.value = select_value.name
                this.openSelectorList()
                this.$emit('select_format', select_value.id)
                this.$emit('select_value', {select_value, selector_id })
            }
        }
    })
</script>