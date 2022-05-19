<template>
<v-overlay opacity="0.9">
  <div id="header">
    <v-app-bar light><strong>Question #{{id}}</strong>
      <v-spacer/>
      <v-tooltip bottom>
        <template v-slot:activator="{on}">
          <v-btn
            small
            light
            right
            v-on="on"
            @click="closePopup">
            X
          </v-btn>
        </template>
        <span>Close Window</span>
      </v-tooltip>
    </v-app-bar>
  </div>
  <div id="content">
    <v-card light>
      <v-card-title><span>Edit Question</span></v-card-title>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr class="text-left">
                <th>Question</th>
                <td>
                  <div v-html="questionInput" v-mutate="() => format()" id="questionPreview"></div>
                  <v-textarea
                    label="Question"
                    no-resize
                    outlined
                    v-model="questionInput">
                    <!--
                        NOTES: $ designates the start and end of LaTeX math mode.
                        Text entered here is treated as literal HTML, so < and > must be surrounded by spaces.
                      -->
                  </v-textarea>
                </td>
              </tr>
              <tr class="text-left" id="category">
                <th>Category</th>
                <v-select
                  :items="categories"
                  label="Category"
                  flat
                  v-model="category">
                </v-select>
              </tr>
              <tr class="text-left">
                <th>Answers</th>
                <td v-html="QuestionData.answers.length"></td>
              </tr>
              
              <!-- Display answer edit buttons -->
              <!-- NOTE: This is still not working. See note later in code -->
              <tr>
                <th>Edit Answers</th>
                <!-- <template> -->
                  <!--   <div v-for="index in numAnswers" :key="index"> -->
                    <!--     <v-dialog :v-model="answersDialogue[index].popup" persistent width="62vw"> -->
                      <!--       <template v-slot:activator="{on,attrs}"> -->
                        <!--         <v-btn -->
                        <!--           small -->
                        <!--           v-bind="attrs" -->
                        <!--           color="primary" -->
                        <!--           v-on="on"> -->
                          <!--           Answer {{index + 1}} -->
                          <!--         </v-btn> -->
                        <!--       </template> -->
                      <!--       <template v-slot:default> -->
                        <!--       <v-card> -->
                          <!--         <v-card-title>Answer {{index + 1}}</v-card-title> -->
                          <!--         <v-card-text> -->
                            <!--           Hello world -->
                            <!--         </v-card-text> -->
                          <!--         <v-divider /> -->
                          <!--         <v-card-actions> -->
                            <!--           <v-btn color="primary" @click="closeAnswer(index)">Close</v-btn> -->
                            <!--         </v-card-actions> -->
                          <!--       </v-card> -->
                        <!--       </template> -->
                      <!--     </v-dialog> -->
                    <!--   </div> -->
                  <!-- </template> -->
                <td>
                  <div v-if="answersDialogue.length > 1">
                    <!-- NOTE: Clicking the button, then editing the question text or category causes the popup to open -->
                    <v-btn color="primary" dense @click.stop="openAnswer(0)">Question 1</v-btn>
                    <v-dialog v-model="answersDialogue[0].popup" width="62vw" persistent>
                        <v-card>
                          <v-card-title>Answer 1</v-card-title>
                          <v-card-text>
                            {{answersDialogue[0].text}} {{answersDialogue[0].popup}}
                          </v-card-text>
                          <v-divider />
                        <v-card-actions>
                          <v-btn color="primary" @click="answersDialogue[0].popup = false">Close</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </td>
              </tr>

              
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit">Submit</v-btn>
        <v-btn @click="reset">Reset</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</v-overlay>
</template>

<script>
import QuestionData from '@/test-data/question_info.json'
export default {
    name: 'QuestionPopup',
    props: {id:Number},
    data: function() {
        return {
            QuestionData,
            questionInput: "",
            categories: ["Arithmetic","Factoring","Equations","Simplification","Exponentiation","Functions","Trigonometry","Limits","Derivatives","Integration","Coordinates","Partial Derivatives","Series","Multiple Integration","Depth"],
            category: "",
            answersDialogue: QuestionData.answers,
            numAnswers: QuestionData.answers.length
        }
    },
    methods: {
        getModifiedData() {
            let modifiedData = {};
            if (this.questionInput != this.QuestionData.text) {
                modifiedData['text'] = this.questionInput;
            }
            if (this.category != this.QuestionData.category) {
                modifiedData['category'] = this.category;
            }
            if (Object.keys(modifiedData).length > 0) {
                return modifiedData;
            }
            return null;
        },
        closePopup() {
            if (this.getModifiedData() === null || confirm("Are you sure wish to close this popup?\nAny unsubmitted changes will not be saved.")) {
                this.$parent.hidePopup()
            }
        },
        getQuestionOverview(id) {
            if (id) {
                console.log("Got information on question id #" + String(id));
            }
        },
        format() {
            MathJax.typeset() // eslint-disable-line
        },
        closeAnswer(index) {
            this.answersDialogue[index] = false;
        },
        submit() {
            let modifiedData = this.getModifiedData();
            if (modifiedData !== null) {
                // Only submit modified
                console.log(modifiedData);
                this.QuestionData.text = this.questionInput;
                this.QuestionData.category = this.category;
            }
        },
        reset() {
            this.questionInput = QuestionData.text;
            this.category = this.QuestionData.category;
        },
        openAnswer(answerNumber) {
            this.answersDialogue[answerNumber].popup = true;
        }
    },
    mounted() {
        this.getQuestionOverview(this.id);
        this.questionInput = QuestionData.text;
        this.category = this.QuestionData.category;
        for (let x = 0; x < this.answersDialogue.length; x++) {
            this.answersDialogue[x].popup = false;
        }
    }
}
</script>

<style lang='scss' scoped>
@use '../style/base';
#header {
    position: fixed;
    right: 0px;
    top: 0px;
    width: 100%;
    z-index: 6;
}
#content {
    width: 60vw;
    height: 80vh;
    overflow: auto;
    position: fixed;
    left: 20vw;
    top: 5rem;
}
.text-left > th {
    /* Prevents resizing when selecting category */
    width: 1.1rem;
}
#questionPreview {
    border: 1px solid base.$alternate-background-color;
    padding: 4px 0;
    margin-bottom: 4px;
}
</style>
