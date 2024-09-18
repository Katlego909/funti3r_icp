import CourseVideo "./courseVideo";
import List "mo:base/List";
import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import ModuleQuiz "moduleQuiz";
import Prim "mo:prim";
import Nat64 "mo:base/Nat64";



actor class CourseModule(name : Text, n : Nat) {
  type Video = CourseVideo.CourseVideo;
  type ModuleInfo = {
   moduleName : Text;
   moduleNumber : Nat;
  };
   stable let DEFAULT_UNIT_CYCLES = 1_000_000_000_000_000;
   stable var quizActor : ?ModuleQuiz.ModuleQuiz = null;

   var  moduleName : Text = name;
   var moduleNumber : Nat = n;

   stable var moduleUnits = List.nil<Video>();
   
   public query func getCourseModulInfo() : async ModuleInfo {
       return {
         moduleName;
         moduleNumber;
       };
   };


   public shared(msg) func createModuleUnit(name : Text, number: Nat)  : async Principal {
    // To do => check if the person calling this method is an admin
    Cycles.add<system>(DEFAULT_UNIT_CYCLES);
    let v = await CourseVideo.CourseVideo(name, number);
    ignore List.push<Video>(v, moduleUnits);
    return Principal.fromActor(v);
   };

   public shared(msg) func createModuleQuiz() : async Principal {
    // To do => check if the person calling this method is an admin
    // we return the old quiz canister if it is already created, for efficient utilization of canisters
     switch(quizActor) {
        case (null) {
           Cycles.add<system>(DEFAULT_UNIT_CYCLES);
          let quiz = await ModuleQuiz.ModuleQuiz(moduleNumber);
           quizActor := ?quiz;
          return Principal.fromActor(quiz);
        };
        case (?quiz) {return Principal.fromActor(quiz)}
     }
   };

   public query func getModuleUnits() : async List.List<Video> {
    return moduleUnits;
   };


     // cycles related
  public func getCurrentCycles() : async Nat {
    return Cycles.balance();
 };

 
   public shared func getCurrentHeapMemory():  async Nat64 {
        Nat64.fromNat(Prim.rts_heap_size());
    };

    public shared func getCurrentMemory(): async Nat64 {
        Nat64.fromNat(Prim.rts_memory_size());
    };
}