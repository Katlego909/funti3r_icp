import List "mo:base/List";

module {
public  type QuestionId = Nat;
public type Choice = {
  id: Nat;
  choice : Text;
};

public type Question = {
    id : QuestionId;
    question : Text;
    choices : [Choice]; // these can be shuffled when sending the question to the user
    answerId : Nat;
};

public type QuestionRequest = {
    id : QuestionId;
    question : Text;
    choices : [Choice];
};

public type Questions = List.List<QuestionRequest>;

public type Answer = {
  questionId: Nat;
  answerId  : Nat;
};
}