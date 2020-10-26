<template>
    <div id="forgot_password" class="grid">
        <label id="forgot_item1">Recuperar Password</label>
        <input v-model="email" id="forgot_username" class="forgotInput" type="text" placeholder="Enter your email...">

        <input @click.prevent="recoverAcc" id="btn_forgot" class="forgotButton" type="submit" value="Recuperar">

        <label id="forgot_errormsg" class="forgotInput hidden"></label>

        <a id="forgot_toLogin" href="#" @click.prevent="toLogin">Voltar ao login</a>
    </div>
</template>

<script>

export default {
    name: "Recover",
    data() {
        return{
            email: "",
            currentUser: undefined
        }
    },
    methods: {
        toLogin() {
            this.$router.push({name : "login"});
        },
        recoverAcc(){
            console.log(this.email);
        }
    }
}
</script>

<style src="@/assets/css/login.css" scoped></style>
