# QuizGame-with-login

Quiz game with login authentication using Angular, Angular Http service, .Net backend.
Create, delete and edit quizzes if logged in your account. 
Answer the created quizzes and get a score out of the existing questions.

## Clone and install


```sh
> git clone https://github.com/ricardocasares/rolling-with-alexa.git
> cd QuizGame-with-login
cont.
```

### For frontend

```sh
> cd frontend
> npm install # or yarn
```

### For backend

```sh
> cd quiz-backend
> start quiz-backend.sln
Set current solution as StartUp project to be safe
```

## Running the tests

### For frontent

```sh
Inside ./frontend
> ng serve
```

### For backend

```sh
Run the backed (click the "[green run icon] IIS Express" button)
```

### Test

First create a Register a user, otherwise no features are accessible.
When registering a user take into account that passwords require a complex password (i.e., "Abc123!" ).

Create a quiz (note that when a new quiz is created the website must be refreshed for it to take effect).

Then click the name of the quiz and so enabling the quiz options:
* Edit: Changes the name of the quiz (specified above)
* New: Changes to creation quiz page
* Edit questions: Sends user to page where he can create edit or create new questions
  Clicking the name of the questions enables you to edit the selected question (select edit to confirm)
  
Play lets user choose from the pool of quizzes created by all users
No need to login to play a quiz. 

Registering simply enables the user to create, delete and edit his quizzes and corresponding questions. No other user can access other users questions.
