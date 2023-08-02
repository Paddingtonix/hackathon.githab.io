<template>
    <div class="hackathon-link">
        <a class="hackathon-link__text">{{ link_text }}</a>
        <slot></slot>
    </div>
</template>
<script lang=ts>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        link_text: {
            type: String,
            default: 'Подробнее'
        }
    },
    setup() {
        
    },
})
</script>