<template>
  <v-card class="pa-md-4" color="white">
    <br />
    <form>
      <v-card-title>
        <h3>Add Details</h3>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          label="Username"
          required
          outlined
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          :error-messages="passwordErrors"
          label="Password"
          required
          outlined
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>

        <h2>Active</h2>
        <v-radio-group v-model="active" :mandatory="true">
          <v-radio color="indigo" label="Yes" value="true"></v-radio>
          <v-radio color="indigo" label="No" value="false"></v-radio>
        </v-radio-group>

        <h2>Services</h2>
        <br />
        <v-select :items="items" v-model="service" label="select service" outlined></v-select>
      </v-card-text>

      <v-btn class="mr-4" color="primary" @click="submit">submit</v-btn>
      <v-btn @click="close">cancel</v-btn>
    </form>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import emailhandler from "../services/EmailHandler";
export default {
  name: "CustomEmailConfigurationForm",
  data() {
    return {
      username: "",
      password: "",
      radios: "",
      items: ["gmail", "yahoo"],
      service: "gmail",
      active: "true"
    };
  },
  validations: {
    username: { required },
    password: { required }
  },
  computed: {

    // --------------------------- Username field errors ---------------------
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },
    // -------------------------- Password field errors ----------------------
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {

    // ---------------------------- Submit form -----------------------------
    async submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      let emailDetails = {
        username: this.username,
        password: this.password,
        active: this.active,
        service: this.service
      };
      await emailhandler.addEmail(emailDetails);
      this.$router.go();
    },

    // ----------------------------- Close dialog --------------------------------
    close() {
      this.$router.go();
    }
  }
};
</script>