<template>
    <button class="hackathon-primary-link">
        <slot></slot>
        <span class="hackathon__primary-btn">{{ text }}</span>
    </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        text: {
            type: String,
            default: "Отправить"
        }
    }
})
</script>