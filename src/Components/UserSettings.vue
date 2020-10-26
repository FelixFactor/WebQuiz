<template>
  <div id="settings" class="gridSettings">
    <div id="settings_item1">
      <label>Primeiro Nome</label>
      <input id="settings_first_name" class="" type="text" v-model="input.firstName"/>
    </div>
    <div id="settings_item2">
      <label>Apelido</label>
      <input id="settings_last_name" class="" type="text" v-model="input.lastName"/>
    </div>
    <div id="settings_item3">
      <label>Email</label>
      <input id="settings_username" class="" type="text" v-model="input.email"/>
    </div>
    <div id="settings_item4">
      <label>Password</label>
      <input id="settings_pass" class="" type="password" v-model="input.password"/>
    </div>
    <div id="settings_item5">
      <label>Repetir Password</label>
      <input id="settings_repeat_pass" class="" type="password" v-model="input.confirmedPassword"/>
    </div>
    <div id="settings_item6">
      <label>Telemóvel</label>
      <input id="settings_phone" class="" type="text" v-model="input.phone"/>
    </div>
    <div id="settings_item7">
      <label>País</label>
      <select id="settings_country" class="" v-model="input.country">
        <option value="Portugal">Portugal</option>
        <option value="Espanha">Espanha</option>
        <option value="França">França</option>
        <option value="Inglaterra">Inglaterra</option>
      </select>
    </div>
    <div id="settings_item8">
      <label>Morada</label>
      <input id="settings_address" class="" type="text" v-model="input.address"/>
    </div>
    <div id="settings_item9">
      <label>Data Nascimento</label>
      <input id="settings_birth_date" class="" type="date" v-model="input.birthDate"/>
    </div>
    <div id="settings_item10">
      <label>NIF</label>
      <input id="settings_tin" class="" type="text" v-model="input.NIF"/>
    </div>
    <input id="save_settings" type="submit" value="Guardar alterações" @click.prevent="saveSettings"/>
    <label id="settings_errormsg" class="hidden"></label>
  </div>
</template>

<script>


export default {
    name: "UserSettings",
    props: {currentUSer: Object},
    data(){
        return{
          input: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmedPassword: "",
        phone: "",
        country: "",
        address: "",
        birthDate: "",
        NIF: "",
      }
    }
  },
  created() {
    this.loadUser();
  },
  methods:{
    saveSettings(){

    },
    loadUser(){
      //ir buscar o user a DB e encava-lo nos fields
    }
  }
}
</script>