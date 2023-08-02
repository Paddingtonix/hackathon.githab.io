<template>
    <div class="hackathon__input">
        <input 
            class="hackathon__input__field"
            :class="{'_fill-input': input_field_value.value.length, '_error-input': input_error.length}"
            :type="input_type"
            v-model="input_field_value.value"
            @keyup="setValue"
            v-bind="$attrs"
        />
        <label class="hackathon__input__label">{{ input_label }}</label>
        <!-- <span class="hackathon__input__error" v-if="input_error.length">{{ input_error }}</span> -->
        <span class="hackathon__input__error">{{ input_error }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    props: {
        input_type: {
            type: String,
            default: 'text'
        },
        input_value: {
            type: String,
            default: ''
        },
        input_mask: {
            type: String,
            default: ''
        },
        input_valid: {
            type: String,
            default: ''
        },
        input_label: {
            type: String,
            default: 'label'
        },
        input_pattern: {
            type: String,
            default: ''
        },
        input_error: {
            type: String,
            default: ''
        },
        participant_idx: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const input_field_value = reactive({
            value: props.input_value
        })

        return {
            input_field_value
        }
    },
    methods: {
        setValue() {
            this.$emit('update', {value: this.input_field_value.value, type: this.$props.input_type, idx: this.$props.participant_idx})
        },
        // validCheck(input: { value: string; pattern: string|RegExp}) {  
        //     if (input.value && input.value.trim().length) {
        //         if (input.pattern) {
        //             const regExp = new RegExp(input.pattern, 'i');
        //             if (input.id === 'email' && !input.value.match(/@/gi)) {
        //                 this.form.find(item => console.log(item))
        //                 // this.form.find(item => item.id === input.id).error = "ошибка"
        //             } else if (!regExp.test(input.value)) {
        //                 // this.form.find(item => item.id === input.id).error = "ошибка";
        //             } else {
        //                 // this.form.find(item => item.id === input.id).error = '';
        //                 // this.form.find(item => item.id === input.id).valid = true;
        //             }
        //         }
        //     }
        // },
    }
})
</script>
