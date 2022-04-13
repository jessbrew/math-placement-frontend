<template>
<div id='table'>
  <v-data-table
    :headers="headers"
    :items="overviewData"
    class="elevation-1">
    <template v-slot:item.score="{item}">
      {{item.score}}%
    </template>
    <template v-slot:item.date="{item}">
      {{formatDate(item.date)}}
    </template>
  </v-data-table>
</div>
</template>

<script>
import overviewData from '@/test-data/student_overview_data.json'
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
                {text: "Placement",value: "placement"}
            ],
        }
    },
    methods: {
        formatDate(date) {
            let format_date = new Date(date); // Date constructor assumes UTC, access UTC date/month/year for values not off by 5-6 hours
            return String(format_date.getUTCDate())
                + "/" + String(format_date.getUTCMonth() + 1) // getUTCMonth returns 0-based month
                + "/" + String(format_date.getUTCFullYear())
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
</style>
