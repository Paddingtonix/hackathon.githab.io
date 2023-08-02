<template>
    <transition name="fade">
        <div class="hackathon__modal" v-if="openModal">
            <div class="hackathon__modal__shadow" @click="close"></div>
            <div class="hackathon__modal__container">
                <span class="hackathon__modal__title">Спасибо за регистрацию!</span>
                <p class="hackathon__modal__text">Ваша заявка на регистрацию принята, после того как она пройдем модерацию, вам на почту придет сообщение с логином и паролем для входа в личный кабинет</p>
                <btn-cmp 
                    :btn_text="'Закрыть'"
                    :btn_type="'primary'"
                    @click="close"
                />
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex';
import btnCmp from '../../ui-components/btn-cmp/btn-cmp.vue'

export default defineComponent({
    setup() {
        
    },
    components: {
        'btn-cmp': btnCmp
    },
    computed: {
        ...mapState('modalModule', ['openModal'])
    },
    methods: {
        ...mapMutations('modalModule', ['close'])
    }
})
</script>
