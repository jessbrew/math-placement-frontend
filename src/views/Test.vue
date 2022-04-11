<template>
<div id="test">
  <p><strong>Time Remaining</strong>: {{remainingTime}}</p>
  <v-form
    ref="question"
    v-model="valid"
    method="post"
    lazy-validation
    @submit.prevent="submitForm"
    >
    <v-card>
      <div id="questionText"></div>
    </v-card>
    <v-radio-group v-model="answer" id="answers" column dense :rules="testRules" class="text--primary">
      <v-radio
        value="A">
        <template v-slot:label>
          <div id="a" class="text--primary"></div>
        </template>
      </v-radio>
      <v-radio
        value="B">
        <template v-slot:label>
          <div id="b" class="text--primary"></div>
        </template>
      </v-radio>
      <v-radio
        value="C"
        v-show="this.Data.questions[this.currentQuestion].answers.length >= 3">
        <template v-slot:label>
          <div id="c" class="text--primary"></div>
        </template>
      </v-radio>
      <v-radio
        value="D"
        v-show="this.Data.questions[this.currentQuestion].answers.length >= 4">
        <template v-slot:label>
          <div id="d" class="text--primary"></div>
        </template>
      </v-radio>
    </v-radio-group>
    <math-button msg="submit"></math-button>
  </v-form>
</div>
</template>

<script>
import Data from '@/test-data/questions.json'; // eslint-disable-line
import MathButton from '@/components/Button.vue';
export default {
    name: "Test",
    data: function() {
        return {
            valid: true,
            Data,
            answer:"",
            currentQuestion: 0, // zero-based counter for questions
			testRules: [
				v => !!v || "Please select an option.",
				v => v !== "" || "Please select an option",
			],
            remainingTime: 20,
        }
    },
    components: {
        MathButton
    },
    methods: {
		formatQuestion() {
			// Format the question svg, if there is one
			if (typeof document.getElementById("questionText").getElementsByTagName("svg")[0] !== "undefined") {
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.display = "Block";
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.marginLeft = "auto";
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.marginRight = "auto";
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.width = "100%";
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.height = "20vh";
			}
			// Make emphasized text red
			if (typeof document.getElementById("questionText").getElementsByTagName("strong")[0] !== "undefined") {
				for (let i = 0; i < document.getElementById("questionText").getElementsByTagName("strong").length; i++) {
					document.getElementById("questionText").getElementsByTagName("strong")[i].style.color = "rgb(119,36,50)";
				}
			}
			// Called after the formatting of question svg, because this outputs more svgs
            MathJax.typeset(); // eslint-disable-line
		},
        getQuestion() {
			// Update the question
            document.getElementById("questionText").innerHTML = this.Data.questions[this.currentQuestion]["question_text"];
			// Update the answers
            document.getElementById("a").innerHTML = this.Data.questions[this.currentQuestion].answers[0].answer_text
            document.getElementById("b").innerHTML = this.Data.questions[this.currentQuestion].answers[1].answer_text
			// Check if there are only 2 possible answers
            if (this.Data.questions[this.currentQuestion].answers.length > 2) {
                document.getElementById("c").innerHTML = this.Data.questions[this.currentQuestion].answers[2].answer_text
            }
            if (this.Data.questions[this.currentQuestion].answers.length > 3) {
                document.getElementById("d").innerHTML = this.Data.questions[this.currentQuestion].answers[3].answer_text
            }
        },
        submitForm() {
            if (this.$refs.question.validate()){
                console.log(this.answer); // logs the selected answer; replace with submission to server
                  this.currentQuestion++;
                if (this.currentQuestion == this.Data.questions.length) {
                    this.$router.replace("/Completed");
                }
                else {
                    // get the next question
                    this.getQuestion(); // get the next question/answer set
					this.formatQuestion(); // format the outputed questions
					this.$refs.question.reset(); // clear selection
                }
            }
        },
    },
    mounted() {
        // run when page loaded
        this.getQuestion();
		this.formatQuestion();
        this.remainingTime = this.Data.time_remaining
    },
}
</script>

<style lang='scss' scoped>
@use '../style/base';
/* Putting styling for dynamically-loaded SVGs here does nothing */
#test {
    width: 35vw;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
	/* Mathjax respects this in SVG output */
	font-size: 1.5rem;
    margin-top: 1rem;
}
/* The possible answers */
#a, #b, #c, #d {
	font-size: 1.5rem;
}
strong {
    color: base.$emphasis-color;
}
</style>
