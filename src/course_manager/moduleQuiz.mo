import Map "mo:map/Map";
import quizTypes "../Types/quizTypes";
import {ihash} "mo:map/Map";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Float "mo:base/Float";


actor class ModuleQuiz(n : Nat) {
    var moduleNumber : Nat = n;
    var questions = Map.new<Nat, quizTypes.Question>();
    stable var id : quizTypes.QuestionId = 0;
    stable var PASS_MARK : Float = 60.0;

    public query func sayQuiz() : async Text {
        return "Hello, want to take a quiz ? (:";
    };
    
    public shared(msg) func setQuestion(q : quizTypes.Question) : async Bool {
         // must add measures to ensure that only authorized people are allowed to call this method
        //if id = 0 then we assume this question is a brand  new question
        // otherwise we check if a question with this id already exists hence this operation becomes an upade operation
        if(q.id == 0 or (not Map.has(questions, ihash, q.id))) {
         // new question
         let newQ : quizTypes.Question = {
            id  = q.id;
            question  = q.question;
            choices   = q.choices; // these can be shuffled when sending the question to the user
            answerId  = q.answerId;
         };
          Map.set(questions, ihash, newQ.id, newQ);
          id := id  + 1; // upate the id
        }else {
          Map.set(questions, ihash, q.id, q); // just overwrite the old question
        };

        return true;
    };
    
     // for clients
    public query  func getQuiz() : async quizTypes.Questions {
       var quiz : quizTypes.Questions  = List.nil<quizTypes.QuestionRequest>();
        for(q in Map.vals(questions)) {
            let questionRequest : quizTypes.QuestionRequest  = {
              id  = q.id;
              question = q.question;
              choices  = q.choices;
            };
            quiz := List.push(questionRequest, quiz);
        };

       return quiz;
    };


// for admins
// todo => only ensure that admins can call this method
public query func getQuestions() : async  List.List<quizTypes.Question> {
     var  adminQuestions  = List.nil<quizTypes.Question>();
        for(q in Map.vals(questions)) {
            adminQuestions := List.push(q, adminQuestions);
        };

       return adminQuestions;
};

// pass in the right courseId associated with this module
public shared(msg)  func verifyAnswers(answers : [quizTypes.Answer], coursePrincipal : Principal) : async Float {
    var correctCount : Nat = 0;
    if(answers.size() == 0) {
      return 0;
    };
    for (ans in answers.vals()) {
       switch(Map.get(questions, ihash,ans.questionId)) {
        case null {};
        case (?v) {
          if(v.answerId == ans.answerId) {
            correctCount :=correctCount + 1;
          };
        };
       }  
    };
     let result  = (Float.fromInt(correctCount) / Float.fromInt(answers.size())) * 100;
    if(result >= PASS_MARK) {
      let course = actor(Principal.toText(coursePrincipal)) : actor {updateModuleStatus : (Principal, Nat) -> async Bool};
      let r = await course.updateModuleStatus(msg.caller, moduleNumber);
    };
    return  result;
};


}