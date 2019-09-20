<template>
  <v-dialog v-model="editDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Details</span>
      </v-card-title>

      <v-card-text>
        <v-container>
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
          <h2>Services</h2>
          <br />
          <v-select :items="items" v-model="service" label="select service" outlined></v-select>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="editDialogHide()">Close</v-btn>
        <v-btn color="blue darken-1" @click="updateDetails()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { required } from "vuelidate/lib/validators";
import emailService from "../services/EmailHandler";
export default {
  data() {
    return {
      username: "",
      password: "",
      service: "",
      items: ["gmail", "yahoo"],
      editDialog: false
    };
  },
  props: ["getEmail"],
  methods: {
    async getDetailsById(id) {
      this.id = id;
      let id1 = {
        id: id
      };

      //   ------------------- Load form filled details -----------------
      let email = await emailService.getDetailsById(id1);
      this.username = email[0].username;
      this.password = email[0].password;
      this.service = email[0].service;
    },

    // ----------------------- Update details -----------------------
    async updateDetails() {
      this.editDialog = false;
      let updateDetail = {
        id: this.id,
        username: this.username,
        password: this.password,
        service: this.service
      };
      await emailService.updateDetails(updateDetail);
      this.editDialog = false;
      this.getEmail();
      this.$router.push("/");
    },

    // ------------------Close dailog-------------------
    editDialogHide() {
      this.editDialog = false;
      this.$router.push("/");
    },

    // ----------------- Show dialog -------------------
    editDialogShow(id) {
      this.getDetailsById(id);
      this.editDialog = true;
    }
  },

  validations: {
    username: { required },
    password: { required }
  },
  computed: {
    // ---------------------------Edit username errors-----------------------
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },

    // -----------------------Edit password errors--------------------
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  }
};
</script>