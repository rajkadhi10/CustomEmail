<template>
  <v-dialog v-model="deleteDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Are you sure to Delete?</span>
      </v-card-title>
      <v-card-actions>
        <div class="flex grow 1"></div>
        <v-btn color="blue darken-1" text @click="deleteDialogHide">Close</v-btn>
        <v-btn color="error" @click="deleteDetails()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<script>
import emailService from "../services/EmailHandler";
export default {
  data() {
    return {
      deleteDialog: false,
      deleteDataId: ""
    };
  },
  props: ["getEmail"],
  methods: {
    // ------------------------Delete method called--------------------
    async deleteDetails() {
      let deleteDetail = {
        id: this.deleteDataId
      };
      await emailService.deleteDetails(deleteDetail);
      this.deleteDialog = false;
      this.getEmail();
    
    },
    // ----------------------Dialog close----------------------
    deleteDialogHide() {
      this.deleteDialog = false;
     
    },
    // ---------------------Dialog show---------------------------
    deleteDialogShow(id) {
      this.deleteDataId = id;
      this.deleteDialog = true;
    }
  }
};
</script>