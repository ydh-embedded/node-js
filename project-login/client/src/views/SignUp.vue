<template>

<div class="card">


    <form action="/api/sign-up" methode="POST">
        
        <div class="titel">User-ID:</div>
            <input type="text" id="user" v-model="u">
        <div id="userinfo" class="info"></div>
        
        <br>
        
        <div class="titel">Passwort:</div>
            <input type="text" id="pw" v-model="p">
        <div id="pwinfo" class="info"></div>
    
        <br>
        <div class="titel">Passwort:</div>
            <input type="password" id="pw" v-model="p">
        <div id="pwinfo" class="info"></div>
        
    </form>
    </div>
    
    
    <table>
        <tr>
            <td><button id="frage">Daten wegschicken</button></td>
            <td>|</td>
            <td><input type="submit" @click="signUp" value="Registrieren"></td>
            <td>|</td>
            <td><button id="zurueck">Zurücksetzen</button></td>
            <td>|</td>
            <td><button id="logout">LOGOUT</button></td>
        </tr>
    </table>




    <div id="antwort">
        <p v-if="msg">{{ msg }}</p>
    </div>

<script>
import { AuthService } from "@/services/AuthService.js";
</script>


<script>
export default{
    data(){
        return {
            username: '' ,
            password: '' ,
            password_repeat: '',
            msg: ''
        }
    }   ,
    methods: {
        async signUp(){
            try{
                const credentials = {
                    username: this.username ,
                    password: this.password ,
                    password_repeat: this.password_repeat ,
                };
                const response = await AuthService.signUp(credentials);
                this.msg = response.msg
            }
            catch (error) {
                this.msg = error.response.data.msg
            }
        }

    }
}
</script>



</template>