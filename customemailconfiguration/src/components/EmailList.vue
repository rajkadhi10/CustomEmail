<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="ma-5">
        <br />
        <!-------------------- Add email details ------------------->
        <div class="d-flex justify-end mx-auto pa-5">
          <v-btn color="primary" v-bind:to="'/add'" @click="addEmail()">
            <v-icon small dark left>fas fa-plus</v-icon>Add custom email configuration
          </v-btn>
        </div>
        <v-card-title>
          <h3 class="customFont">Custom Email Configuration</h3>
          <br />
        </v-card-title>

        <!------------------- Compose email -------------------------->
        <div class="d-flex justify-center mx-auto">
          <v-btn v-if="compose  " v-bind:to="'/composemail'" color="red" @click="composeEmail()">
            <v-icon small dark>fas fa-edit</v-icon>Compose
          </v-btn>
        </div>

        <!----------------------- Search in table ----------------------------->
        <div class="d-flex justify-end pa-5">
          <v-text-field
            append-icon="fas fa-search"
            class="col-4"
            outlined
            v-model="search"
            label="Search Contact "
          ></v-text-field>
        </div>

        <!--------------- Table of email details ------------------->
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="emails"
          :single-select="true"
          :items-per-page="5"
          :search="search"
          show-select
          class="elevation-1"
        >
          <template v-slot:item.action="{item}">
            <v-menu close-on-click left bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title  @click="editDialog=true">
                    <v-btn color="primary" v-bind:to="'/edit'" text @click="editData(item.id)">Edit</v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title @click="deleteDialog=true">
                    <v-btn color="error"  v-bind:to="'/delete'" text @click="deleteid(item.id)">Delete</v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>

        <!------------------ Edit Details ----------------------->
        <EditDetails ref="editDialog" :getEmail="getemail" />

        <!----------------- Delete details ---------------------->
        <DeleteDetails ref="deleteDialog" :getEmail="getemail" />

        <!----------------- Add details ------------------------->
        <AddDetails ref="addDialog" :getEmail="getemail" />

        <!---------------- Compose mail ------------------------->
        <ComposeMail ref="composeDialog" :selectedRow="selected" />
      </v-card>
    </v-app>
  </div>
</template>

<script>
import emailService from "../services/EmailHandler";
import EditDetails from "./EditDetails";
import DeleteDetails from "./DeleteDetails";
import AddDetails from "./AddDetails";
import ComposeMail from "./ComposeMail";
export default {
  name: "getEmail",
  data() {
    return {
      headers: [
        { text: "#", value: "id", class: "text-uppercase" },
        { text: "Username", value: "username", class: "text-uppercase" },
        {
          text: "UUID",
          value: "id_primary",
          class: "text-uppercase",
          width: "25%"
        },
        { text: "Service", value: "service", class: "text-uppercase" },
        { text: "Port-number", value: "", class: "text-uppercase" },
        { text: "URL", value: "", class: "text-uppercase" },
        { text: "ACTIONS", value: "action", class: "text-uppercase" }
      ],
      emails: [],
      totalRows: "",
      selected: [],
      items: ["gmail", "yahoo"],
      search: "",
      compose: false
    };
  },
  components: {
    EditDetails,
    DeleteDetails,
    AddDetails,
    ComposeMail
  },

  methods: {
    // --------------- Dialog open for edit operation --------------
    editData(id) {
      this.$refs.editDialog.editDialogShow(id);
    },

    // ------------------- Dialog open for delete operation ----------------
    deleteid(id) {
      this.$refs.deleteDialog.deleteDialogShow(id);
    },

    // ---------------- Dialog opens for add email details -------------------
    addEmail() {
      this.$refs.addDialog.addDialogShow();
    },

    // ------------------- Dialog opens for compose email ------------------------
    composeEmail() {
      this.$refs.composeDialog.composeDialogShow(this.selected);
    },

    // -------------------- Get email list ------------------------
    async getemail() {
      this.emails = await emailService.getEmails();
      this.totalRows = this.emails.length;
    }
  },

  created: function() {
    this.getemail();
  },

  //   ----------------------- get changes on the row selection ---------------------------
  watch: {
    selected: function() {
      if (this.selected[0] !== undefined) {
        this.compose = true;
      } else {
        this.compose = false;
      }
    }
  }
};
</script>
<style scoped>
.customFont {
  font-family: Florence;
}
</style>