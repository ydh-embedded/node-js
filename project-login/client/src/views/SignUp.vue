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
            <td><input type="submit" @click="signUp" value="Registriesen"></td>
            <td>|</td>
            <td><button id="zurueck">Zurücksetzen</button></td>
            <td>|</td>
            <td><button id="logout">LOGOUT</button></td>
        </tr>
    </table>




    <div id="antwort">
        <p v-if="msg"></p>
    </div>





</template>