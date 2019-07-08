<template>
    <div class="about">
        <p class="label">1、防抖</p>
        <p class="content">常用在input搜索的时候，控制请求频率。实现方式就是监听键盘输入事件（@keyup），然后每次事件都绑定一个setTimeout，
        </p>
        <input type="text" v-model="txt" @keyup="handleKeyUp">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                txt: '',
                timer: ''
            }
        },
        methods: {
            handleKeyUp() {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    console.log(this.txt)
                }, 250);
            }
        }
    }
</script>
