<template>
    <div id="quiz_layout" class="quiz-layout">
    <header>
      <h2>Disciplina:{{ quiz.test.course }}</h2>
      <h4>Tópico:{{ quiz.test.topic }}</h4>
      <h1>Nota:{{userTest.score}}</h1>
    </header>

    <div v-for="q in quiz.questions" :key="q.id">
      <div class="multiple" v-if="q.type === 'multiple'" :id="q.id">
        <h4>{{ q.question }}</h4>

        <div v-for="answer in q.answers" :key="answer.id">

          <div class="multChoice" :id="q.id">
            <input type="radio" :value="answer" :name="q.id" :id="q.id" 
             :checked="answer === userTest.answers.find(i => i.questionId == q.id).answer" disabled />
            <label :class="{ 'correct' : q.correctAnswer == answer, 'wrong' : q.correctAnswer != answer}"> {{ answer }} </label>
          </div>

        </div>
      </div>

      <div class="direct" v-else-if="q.type === 'direct'">
        <h4>{{ q.question }}</h4>
        <input type="text" 
        :class="{'correct' : q.correctAnswer === userTest.answers.find(i => i.questionId == q.id).answer,
        'wrong' : q.correctAnswer !== userTest.answers.find(i => i.questionId == q.id).answer }"
        readonly
        :value="userTest.answers.find(i => i.questionId == q.id).answer"/>
            
        <label>Resposta Correcta:{{q.correctAnswer}}</label>
      </div>
    </div>
    <div>
      <router-link :to="{name: 'finished-list'}">
          <button id="btn_backToList">Voltar para a lista</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import userTestManager from "@/assets/js/userTestsManager.js";
import testManager from "@/assets/js/testManager.js";

export default {
    name: "SubmittedTest",
    props:{
        quizId: Number
    },
    data(){
        return {
            quiz: {},
            userTest: {},
            rightAnswers: [],
            userAnswers: []
        }
    },
    created() {
        this.getUserQuiz();
        this.getQuiz();
    },
    methods: {
        getQuiz(){
            this.quiz = testManager.getCompleteQuiz(this.userTest.quizId);
        },
        getUserQuiz(){
            this.userTest = userTestManager.getUserTestById(this.quizId); 
        }
    }
}
</script>

<style scoped>

</style>