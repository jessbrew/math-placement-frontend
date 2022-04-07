<template>
<div>
  <h1>You have completed the test.</h1>
  <h2>You may now close this window.</h2>
  <table id="results">
    <th colspan="3"><h3>Scoring Summary</h3></th>
    <tr>
      <th>Correct</th>
      <th>Total</th>
      <th>Score</th>
    </tr>
    <tr>
      <td id="correct">{{correct}}</td>
      <td id="total">{{total}}</td>
      <td id="score">{{score}}</td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
    name: "Test",
    data: function() {
        return {
            correct: 12,
            total: 20,
            score: '0%'
        }
    },
    mounted() {
        // set total and correct here
        this.score = String(this.correct / parseFloat(this.total) * 100) + "%";
    }
}
</script>

<style lang='scss' scoped>
@use '../style/base';
h1 {
    font-size: 3rem;
    text-align: center;
    color: base.$emphasis-color;
}
h2 {
    text-align: center;
    margin-bottom: 1rem;
}
#results {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}
#results th, #results td {
    padding: 5px;
    width: 8rem;
    font-size: 2rem;
}
#results td {
    font-weight: 500;
}
#results th, #results td, #results {
    border: 2px solid base.$alternate-background-color;
    border-collapse: collapse;
}
</style>
