<template>
  <v-card>
    <v-card-title>
      <span class="headline">Are you sure to Delete?</span>
    </v-card-title>
    <v-card-actions>
      <div class="flex grow 1"></div>
      <v-btn color="blue darken-1" text @click="deleteClose">Close</v-btn>
      <v-btn color="error" @click="deleteDetails()">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>



<script>
import emailService from "../services/EmailHandler";
export default {
  props: ["deleteDataId"],
  methods: {
    async deleteDetails() {
      console.log(this.id);
      let deleteDetail = {
        id: this.deleteDataId
      };
      await emailService.deleteDetails(deleteDetail);
      this.$router.go();
    },
    deleteClose() {
      this.$router.go();
    }
  }
};
</script>