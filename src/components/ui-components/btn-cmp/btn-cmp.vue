<template>
    <div class="hackathon-btn" 
        :class="[
            btn_type === 'primary' ? '_primary' : '_secondary', 
            btn_disabled ? '_disabled' : ''
        ]">
        <slot></slot>
        <span class="hackathon-btn__text">{{ btn_text }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        btn_type: {
            type: String,
            default: 'primary'
        },
        btn_text: {
            type: String,
            default: 'button'
        },
        btn_disabled: {
            type: Boolean,
            default: false
        }
    },
})
</script>