<template>
    <div class="hackathon">
        <header-cmp :menu="nav_menu.menu" />
        <div class="hackathon__container">
            <transition name="page">
                <router-view></router-view>
            </transition>
        </div>
        <footer-cmp :menu="nav_menu.menu" />
        <modal-cmp />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios'
import headerCmp from './components/base/header/header-cmp.vue'
import footerCmp from './components/base/footer/footer-cmp.vue'
import modalCmp from './components/base/modals/modal-cmp.vue'
import { mapState } from 'vuex'

interface nav_menu {
    name: string,
    link: string
}

export default defineComponent({
    
    setup() {
        axios.defaults.baseURL = "/"

        const nav_menu = reactive({
            menu: [
                {
                    name: 'Хакатон',
                    link: '/'
                },
                {
                    name: 'Чемпионат',
                    link: '/'
                },
                {
                    name: 'Практика',
                    link: '/'
                },
                {
                    name: 'Курсы',
                    link: '/'
                },
                {
                    name: 'Сертификаты',
                    link: '/'
                },
            ] as Array<nav_menu>
        })

        return {
            nav_menu,
        }
    },
    computed: {
        ...mapState('authorizationModule', ['isAuth'])
    },
    components: {
        'header-cmp': headerCmp,
        'footer-cmp': footerCmp,
        'modal-cmp': modalCmp
    }
});
</script>

<style>
</style>
