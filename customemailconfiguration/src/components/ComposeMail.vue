<template>
  <v-card class="pa-md-4" color="white">
    <br />
    <form>
      <v-card-title>
        <h3>Add Details</h3>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="receiver"
          :error-messages="receiverErrors"
          label="To"
          required
          outlined
        ></v-text-field>
        <v-text-field v-model="subject" label="Subject" required outlined></v-text-field>
        <v-textarea v-model="body" required outlined></v-textarea>
      </v-card-text>

      <v-btn class="mr-4" color="primary" @click="submit">submit</v-btn>
      <v-btn @click="clear">cancel</v-btn>
    </form>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import emailhandler from "../services/EmailHandler";
export default {
  name: "ComposeMail",
  data() {
    return {
      receiver: "",
      subject: "",
      body: ""
    };
  },
  props: ["selectedRow"],
  validations: {
    receiver: { required }
  },
  computed: {
    //   ----------------------- Atleast 1 recipient is required -----------------
    receiverErrors() {
      const errors = [];
      if (!this.$v.receiver.$dirty) return errors;
      !this.$v.receiver.required &&
        errors.push("Atleast one recipient is required.");
      return errors;
    }
  },
  methods: {
    //   ------------------------ Send mail -------------------------------
    async submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      let composeDetails = {
        receivers: this.receiver,
        subject: this.subject,
        body: this.body,
        service: this.selectedRow[0].service,
        username: this.selectedRow[0].username,
        pass: this.selectedRow[0].password,
        id:this.selectedRow[0].id
      };

      //   -------------- Calling mail send method -------------------
      let res = await emailhandler.sendEmail(composeDetails);
      if (res == "success") {
        this.$router.go();
      } else {
        alert("Error!!");
      }
    },

    // ------------------------- Close the dialog -------------------------
    clear() {
      this.$router.go();
    }
  }
};
</script>