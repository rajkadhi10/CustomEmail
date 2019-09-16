<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <br />

        <!-- ------------------ Add email details ----------------- -->
        <div class="d-flex justify-end mx-auto">
          <v-btn color="primary" @click="addEmail()">
            <v-icon small dark left>fas fa-plus</v-icon>Add custom email configuration
          </v-btn>
        </div>
        <v-card-title>
          <h3>Custom Email Configuration</h3>
          <br />
        </v-card-title>

        <!------------------- Compose email -------------------------->
        <div class="d-flex justify-center mx-auto">
          <v-btn v-if="compose  " color="red" @click="composeEmail()">
            <v-icon small dark>fas fa-edit</v-icon>Compose
          </v-btn>
        </div>

        <div class="d-flex justify-end">
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
                  <v-list-item-title @click="editDialog=true">
                    <v-btn color="primary" text @click="editData(item.id)">Edit</v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title @click="deleteDialog=true">
                    <v-btn color="error" text @click="deleteid(item.id)">Delete</v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>

        <!-- ----------------Edit Details------------------- -->
        <v-dialog v-model="editDialog" persistent max-width="600px">
          <EditDetails :editDataId="selectedId" />
        </v-dialog>

        <!------------------------- Delete details ------------------------->
        <v-dialog v-model="deleteDialog" persistent max-width="600px">
          <DeleteDetails :deleteDataId="deletedId" />
        </v-dialog>

        <!------------------------- Add details ------------------------->
        <v-dialog v-model="addDialog" persistent max-width="600px">
          <AddDetails />
        </v-dialog>

        <!------------------------- Compose mail ------------------------->
        <v-dialog v-model="composeDialog" persistent max-width="600px">
          <ComposeMail :selectedRow="selected" />
        </v-dialog>
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
        { text: "#", value: "id" },
        { text: "Username", value: "username", align: "center" },
        { text: "UUID", value: "id_primary", align: "center", width: "25%" },
        { text: "Service", value: "service", align: "center" },
        { text: "Port-number", value: "" },
        { text: "URL", value: "" },
        { text: "ACTIONS", value: "action" }
      ],
      emails: [],
      totalRows: "",
      selected: [],
      items: ["gmail", "yahoo"],
      search: "",
      selectedId: "",
      deletedId: "",
      compose: false,
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      composeDialog: false
    };
  },
  components: {
    EditDetails,
    DeleteDetails,
    AddDetails,
    ComposeMail
  },

  methods: {
    // --------------- Set id for edit operation --------------
    editData(id) {
      this.selectedId = id;
    },

    // ------------------- Set id for delete operation ----------------
    deleteid(id) {
      this.deletedId = id;
    },

    // ---------------- Dialog opens for add email details -------------------
    addEmail() {
      this.addDialog = true;
    },

    // ------------------- Dialog opens for compose email ------------------------
    composeEmail() {
      this.composeDialog = true;
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