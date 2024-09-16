
import Map "mo:map/Map";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";



module {
     public type Result<OK, ERR> = Result.Result<OK, ERR>;
// course related types
   public type CourseProfile = { // this profile will belong to an individual person that has enrolled for a course
     enrollmentDate : Text;
     courseCompleted : Bool;
     modulesCompleted :   Map.Map<Nat, Bool>;
     lastAccessedCourse : Text;
     coursePrice        : Float; // the amount they paid for the course
   };

   public type CourseProfileQuest = { // this profile will belong to an individual person that has enrolled for a course
     enrollmentDate : Text;
     courseCompleted : Bool;
     modulesCompleted :   List.List<Nat>;
   };

   public type ModulePair = {
    title: Text;
    modulePrincipal: Principal;
   };

 

   public type CourseDetails = {
    courseName: Text;
    category  : Text;
    lastUpated : Text; 
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


 public type FileInfo = {
  id: Text;
  fileName: Text;
  size : Nat;
  mimeType : Text;
  chunkCount: Nat;
  allChunksUploaded: Bool;
 };

 public type UnitDetails = {
   name : Text;
   number: Nat;
 };

}