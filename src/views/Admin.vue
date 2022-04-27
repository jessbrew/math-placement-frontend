<template>
<div id='table'>
  <component :is="popupComponent" v-bind="popupProperties"></component>
  <h1 class="text-center text-h2">Student Results</h1>
  <v-form method="post" @submit.prevent="submitForm">
    <v-card>
      <v-card-title>
        <v-text-field label="Search" hide-details single-line v-model="search"></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="overviewData"
        item-key="id"
        class="elevation-1"
        :search="search"
        :items-per-page="20"
        :footer-props="{itemsPerPageOptions:[5,10,20,40,50,-1]}"
        @click:row="showPopup">
        <template v-slot:item.score="{item}">
          {{item.score.toFixed(2)}}%
        </template>
        <template v-slot:item.date="{item}">
          {{formatDate(item.date)}}
        </template>
        <template v-slot:item.sent_to_registrar="{item}">
          {{item.sent_to_registrar ? '✅' : '❌'}}
        </template>
        <template v-slot:item.submit="{item}">
          <v-simple-checkbox
            v-model="submitToRegistrar[item.id]"></v-simple-checkbox>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-right padding-top">
      <v-btn type="submit">Submit to Registrar</v-btn>
    </div>
  </v-form>
</div>
</template>

<script>
import overviewData from '@/test-data/student_overview_data.json'
import StudentPopup from '@/components/StudentPopup.vue'
export default {
    name: "AdminOverview",
    data: function() {
        return {
            overviewData,
            headers: [
                {text: "Last Name",value: "lname"},
                {text: "First Name",value: "fname"},
                {text: "Date",value: "date"},
                {text: "Score",value: "score"},
                {text: "Placement",value: "placement"},
                {text: "Submitted",value: "sent_to_registrar"},
                {text: "Submit",value: "submit"}
            ],
            search: "",
            popupComponent: null,
            popupProperties: {'id':null},
            submitToRegistrar: {}
        }
    },
    components: {
        StudentPopup
    },
    methods: {
        formatDate(date) {
            let format_date = new Date(date); // Date constructor assumes UTC, access UTC date/month/year for values not off by 5-6 hours
            return String(format_date.getUTCDate())
                + "/" + String(format_date.getUTCMonth() + 1) // getUTCMonth returns 0-based month
                + "/" + String(format_date.getUTCFullYear())
        },
        showPopup(studentID) {
            let id = studentID.id;
            this.popupProperties.id = id;
            this.popupComponent = "StudentPopup";
        },
        hidePopup() {
            this.popupComponent = null;
        },
        submitForm() {
            if (Object.keys(this.submitToRegistrar).length != 0) {
                console.log(Object.keys(this.submitToRegistrar));
            }
        }
    }
}
</script>

<style lang='scss' scoped>
#table {
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
}
.padding-top {
    padding-top: 10px;
}
</style>
