
import Map "mo:map/Map";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";



module {
     public type Result<OK, ERR> = Result.Result<OK, ERR>;
// course related types
   public type CourseProfile = { // this profile will belong to an individual person that has enrolled for a course
     enrollmentDate : Text;
     courseCompleted : Bool;
     modulesCompleted : Nat;
     lastAccessedCourse : Text;
     coursePrice        : Float; // the amount they paid for the course
   };

   public type ModulePair = {
    title: Text;
    modulePrincipal: Principal;
   };

 

   public type CourseDetails = {
    courseName: Text;
    category  : Text;
    lastUpated : Text; 
    price       : Float;
    totalModules : Nat;
    modules : List.List<ModulePair>;
   };

   public type CourseInformation = {
    courseName: Text;
    category  : Text;
    lastUpated : Text; 
    price       : Float;
   };

   public type Enrolled =  Map.Map<Principal, CourseProfile>;


}