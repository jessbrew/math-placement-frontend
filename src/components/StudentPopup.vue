<!--
    TODO: Grouping for categories
    TODO: Table scrolling
-->
<template>
<v-overlay opacity="0.9">
  <div id="header">
    <v-app-bar light><strong>{{studentData.lname}}, {{studentData.fname}}</strong>
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
    <div id="data_table">
      <v-card light>
        <v-card-title>
          <div id="title">
            <strong>{{studentData.lname}}, {{studentData.fname}}</strong>
            <p>Total correct: {{studentData.total_correct}}</p>
          </div>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="studentHeaders"
            :items="studentData.scores"
            item-key="category"
            show-expand
            dense
            hide-default-footer
            disable-pagination
            :expanded.sync="expanded"
            :items-per-page="-1">
            <template v-slot:expanded-item="{headers,item}">
              <td :colspan="headers.length">
                <v-data-table
                  dense
                  :headers="[{text:'Question',value:'question'},{text:'Status',value:'status'}]"
                  :items="item.questions"
                  hide-default-footer
                  :items-per-page="-1">
                </v-data-table>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
    
    <div id="input"> <!-- Placement -->
      <v-card light>
        <v-card-title>
          <strong>Placement</strong>
        </v-card-title>
        <v-form
          ref="adminControls"
          v-model="valid"
          lazy-validation
          method="post"
          @submit.prevent="submitInformation">
          <v-card-text>
            <v-text-field
              v-model="updatedInformation.placement"
              :label="placement">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn
                  small
                  v-on="on"
                  type="Submit">
                  Submit
                </v-btn>
              </template>
              <span>Submit</span>
            </v-tooltip>
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </div>
</v-overlay>
</template>

<script>
import studentData from '@/test-data/student_info.json'
export default {
    name: 'StudentPopup',
    props: {
        id: Number
    },
    data: function() {
        return {
            valid: true,
            placement: null,
            studentData,
            expanded: [],
            updatedInformation: {
                placement: null,
            },
            studentHeaders: [
                {text:"Category",value:"category"},
                {text:"Correct",value:"correct"},
                {text:"Unanswered",value:"unanswered"},
                {text:"Total",value:"total"}
            ],
        }
    },
    methods: {
        // get information from server on id
        getStudentOverview(id) {
            if (id) {
                console.log("Got overview information on " + String(id));
            }
        },
        // submit updated information to server
        submitInformation() {
            if (this.updatedInformation.placement) {
                if (this.updatedInformation.placement == "") {
                    this.updatedInformation.placement = null;
                }
                console.log(this.updatedInformation.placement);
                alert("Submitted!");
                this.placement = this.updatedInformation.placement;
                this.$refs.adminControls.reset();
            }
        },
        closePopup() {
            this.$parent.popupComponent = null;
        }
    },
    beforeUpdate() {
        if (document.getElementsByClassName("v-overlay--active")[0]) {
            document.getElementsByClassName("v-overlay--active")[0].style.position = "sticky";
        }
    },
    mounted() {
        // Overlay background scroll prevention
        if (document.getElementsByClassName("v-overlay__scrim")[0]) {
            document.getElementsByClassName("v-overlay__scrim")[0].style.position = "fixed";
        }
        this.getStudentOverview(this.id);
        this.placement = studentData.placement;
    }
}
</script>

<style lang='scss' scoped>
@use '../style/base';
#data_table {
    width: 60vw;
}
#placement {
    color: base.$alternate-foreground-color;
}
#title {
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    font-size: 1.5rem;
}
#title strong {
    font-size: 2rem;
}
#content {
    display: flex;
    margin-right: auto;
    margin-left: auto;
    justify-content: space-between;
    flex-wrap: no-wrap;
}
#content div {
    padding-left: 2rem;
    padding-right: 2rem;
}
#header {
    position: fixed;
    right: 0px;
    top: 0px;
    width: 100%;
    z-index: 6;
}
</style>
