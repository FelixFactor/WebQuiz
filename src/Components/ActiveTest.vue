<template>
      <div id="quiz_layout" class="quiz-layout" v-bind:key="quiz.header.id">
        <header>
          <h2>${currentTest.test.course}</h2>
          <h4>${currentTest.test.topic}</h4>
        </header>
    
        <div class="multiple" data-id="${_item.id}">
          <h4>${_item.question}</h4>
    
          <div class="multChoice">
            <input type="radio" name="selected${_item.id}" value="${answer}"
              data-id="${_item.id}"/>
            <label id="${answer}"> ${answer} </label>
          </div>
        </div>
    
        <div class="direct">
          <h4>${_item.question}</h4>
          <input type="text" data-id="${_item.id}" id="direct${_item.id}" />
        </div>
    
        <div>
          <button id="btn_submitTest">Submit</button>
        </div>
      </div>
</template>

<script>
import testManager from "@/assets/js/testManager.js"

export default {
    name: "ActiveTest",
    props:{
        id: Int32Array //???
    },
    data() {
        return {
            quiz: {}
        }
    },
    created() {
        this.loadQuiz();
    },
    methods: {
        loadQuiz() {
            this.quiz = testManager.getCompleteQuiz(this.id);
        }
    }
}
</script>