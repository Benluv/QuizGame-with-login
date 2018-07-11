import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'

@Injectable()
export class ApiService {

    private selectedQuestion = new Subject<any>()
    questionSelected = this.selectedQuestion.asObservable()

    private selectedQuiz = new Subject<any>()
    quizSelected = this.selectedQuiz.asObservable()

    constructor(private http: HttpClient) { }

    // Questions API calls

    getQuestions(quizId) {
        return this.http.get(`http://localhost:58331/api/questions/${quizId}`)
    }

    postQuestion(question) {
        this.http.post('http://localhost:58331/api/questions', question)
            .subscribe(res => {
                console.log(res)
            })
    }

    putQuestion(question) {
        this.http.put(`http://localhost:58331/api/questions/${question.id}`, question)
            .subscribe(res => {
                console.log(res)
            })
    }

    // Quizzes API calls

    getQuizzes() {
        return this.http.get('http://localhost:58331/api/quizzes')
    }

    getAllQuizzes() {
        return this.http.get('http://localhost:58331/api/quizzes/all')
    }

    putQuiz(quiz) {
        this.http.put(`http://localhost:58331/api/quizzes/${quiz.id}`, quiz)
            .subscribe(res => {
                console.log(res)
            })
    }

    postQuiz(quiz) {
        this.http.post('http://localhost:58331/api/quizzes', quiz)
            .subscribe(res => {
                console.log(res)
            })
    }

    selectQuestion(question) {
        this.selectedQuestion.next(question)
    }

    selectQuiz(quiz) {
        this.selectedQuiz.next(quiz)
    }
}