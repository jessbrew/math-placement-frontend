<template>
<div id="questions">
  <component :is="popupComponent" v-bind="popupProperties"></component>
  <v-card>
    <v-card-title><h1 class="text-center text-h1">Questions</h1></v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="QuestionOverview.questions"
        :items-per-page="20"
        :footer-props="{itemsPerPageOptions:[5,10,20,40,50,-1]}"
        @click:row="showPopup"
        show-group-by>
        <!--
            List of questions, groupable by category and number of answers
            Clicking on question opens editing dialogue, like for student details
            Ability to add new question
            Editing dialogue has button to render LaTeX
            Editing dialogue has ability to insert svg
            Editing dialogue has ability to insert <strong> tag for bolding
            Editing dialogue has checkbox for which tests to include in
            Editing dialogue has dropdown for category
          -->
      </v-data-table>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import QuestionOverview from '@/test-data/questions_overview.json';
import QuestionPopup from '@/components/QuestionPopup.vue';
/*
  Question overview JSON data:
  total_questions:int
  questions: [{id,category,question,answers[],correct_answer,included_in_tests}]
*/
export default {
    data: function() {
        return {
            QuestionOverview,
            headers: [
                {text:"ID",value:"id",groupable:false},
                {text:"Question",value:"text",groupable:false},
                {text:"Category",value:"category"},
                {text:"Number of Answers",value:"num_answers"}
            ],
            popupComponent: null,
            popupProperties: {'id':null}
            // categories: ["Arithmetic","Factoring","Equations","Simplification","Exponentiation","Functions","Trigonometry","Limits","Derivatives","Integration","Coordinates","Partial Derivatives","Series","Multiple Integration","Depth"]
        }
    },
    components: {
        QuestionPopup
    },
    methods: {
        showPopup(questionID) {
            let id = questionID.id;
            this.popupProperties.id = id;
            this.popupComponent = "QuestionPopup";
        },
        hidePopup() {
            this.popupComponent = null;
        }
    },
    mounted() {
        // get question information here
    }
}
</script>

<style lang="scss" scoped>
@use '../style/base';
#questions {
    margin-right: auto;
    margin-left: auto;
    width: 60vw;
}
.text-center {
    margin-right: auto;
    margin-left: auto;
}
</style>
