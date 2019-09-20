<template>
  <v-dialog v-model="composeDialog" persistent max-width="600px">
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
          >
          
          </v-text-field>
          <v-text-field v-model="subject" label="Subject" required outlined></v-text-field>
          <v-textarea v-model="body" required outlined></v-textarea>
          <v-file-input
            v-model="files"
            placeholder="Upload your documents"
            label="File input"
            multiple
            webkitdirectory
            prepend-icon="mdi-paperclip"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label color="primary">{{ text }}</v-chip>
            </template>
          </v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn class="mr-4" color="primary" @click="submit">submit</v-btn>
          <v-btn @click="composeDialogHide">cancel</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
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
      body: "",
      selectedRow: [],
      files: [],
      composeDialog: false,
       chip2: true,
    };
  },
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
        id: this.selectedRow[0].id,
      };

      //   -------------- Calling mail send method -------------------
      let res = await emailhandler.sendEmail(composeDetails);
      if (res == "success") {
        this.composeDialog = false;
      } else {
        alert("Error!!");
        this.composeDialog = false;
      }
       this.$router.push("/")
    },

    // ------------------------- Close the dialog -------------------------
    composeDialogHide() {
      this.composeDialog = false;
       this.$router.push("/")
    },
    clear() {
      this.receiver = "";
      this.subject = "";
      this.body = "";
    },
    composeDialogShow(selectedRow) {
      this.clear();
      this.selectedRow = selectedRow;
      this.composeDialog = true;

    }
  }
};
</script>