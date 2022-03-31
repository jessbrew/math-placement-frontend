<template>
<div id="test">
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
    <v-radio-group v-model="answer" id="answers" column dense :rules="testRules">
      <v-radio
        value="A">
        <template v-slot:label>
          <div id="a"></div>
        </template>
      </v-radio>
      <v-radio
        value="B">
        <template v-slot:label>
          <div id="b"></div>
        </template>
      </v-radio>
      <v-radio
        value="C"
        v-show="answersNumber >= 3">
        <template v-slot:label>
          <div id="c"></div>
        </template>
      </v-radio>
      <v-radio
        value="D"
        v-show="answersNumber >= 4">
        <template v-slot:label>
          <div id="d"></div>
        </template>
      </v-radio>
    </v-radio-group>
    <v-btn
      type="submit">
      submit
    </v-btn>
  </v-form>
</div>
</template>

<script>
import Data from '@/test-data/questions.json'; // eslint-disable-line
export default {
    name: "Test",
    data: function() {
        return {
            valid: true,
            Data,
            answer:"",
            answersNumber: 4, // set this to number of possible answers for question
            currentQuestion: 0, // zero-based counter for questions
            questionText: "", // overwritten by dynamic content
			testRules: [
				v => !!v || "Please select an option.",
				v => v !== "" || "Please select an option",
			],
        }
    },
    methods: {
        updateQuestion() {
			// Update the question
            this.questionText = this.Data[this.currentQuestion]["question_text"];
            document.getElementById("questionText").innerHTML = this.questionText;
			// Format the question svg, if there is one
			if (typeof document.getElementById("questionText").getElementsByTagName("svg")[0] !== "undefined") {
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.display = "Block";
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.marginLeft = "auto";
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.marginRight = "auto";
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.width = "100%";
				document.getElementById("questionText").getElementsByTagName("svg")[0].style.height = "20vh";
			}
			// Update the answers
            this.answersNumber = this.Data[this.currentQuestion]["answers"].length;
            document.getElementById("a").innerHTML = this.Data[this.currentQuestion].answers[0].answer_text
            document.getElementById("b").innerHTML = this.Data[this.currentQuestion].answers[1].answer_text
			// Check if there are 2, 3, or 4 possible answers
            if (this.answersNumber > 2) {
                document.getElementById("c").innerHTML = this.Data[this.currentQuestion].answers[2].answer_text
            }
            if (this.answersNumber > 3) {
                document.getElementById("d").innerHTML = this.Data[this.currentQuestion].answers[3].answer_text
            }
			// Called after the formatting of question svg, because this outputs more svgs
            MathJax.typeset() // eslint-disable-line
        },
        submitForm() {
            if (this.$refs.question.validate()){
                console.log(this.answer); // logs the selected answer; replace with submission to server
                  this.currentQuestion++;
                if (this.currentQuestion == this.Data.length) {
					// The test is done. Replace this with a redirect to the next page.
                    alert("Test completed!")
                }
                else {
                    // get the next question
                    this.updateQuestion(); // get the next question/answer set
					this.$refs.question.reset(); // clear selection
                }
            }
        },
    },
    mounted() {
        // run when page loaded
        this.updateQuestion();
        MathJax.typeset(); // eslint-disable-line
    },
    updated() {
        // run when page updated
    }
}
</script>

<style lang='scss' scoped>
@use '../style/base';
/* Putting styling for dynamically-loaded SVGs here does nothing */
#test {
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
	/* Mathjax respects this in SVG output */
	font-size: 1.5rem;
}
/* The possible answers */
#a, #b, #c, #d {
	font-size: 1.5rem;
}
</style>
