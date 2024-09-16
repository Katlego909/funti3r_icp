import Principal "mo:base/Principal";
import List "mo:base/List";
import Map "mo:map/Map";
import courseTypes "../Types/courseTypes";
import CourseModule "courseModule";
import Cycles "mo:base/ExperimentalCycles";
import {phash} "mo:map/Map";


actor class Course(p : Principal) = self {
     type CoursePair = {
         moduleActor : CourseModule.CourseModule;
         moduleHeading : Text;
     };

     type CoursePairMap = Map.Map<Principal, CoursePair>;

     var manager : Principal = p;
     var enrolled : courseTypes.Enrolled = Map.new<Principal, courseTypes.CourseProfile>(); 
     var courseModules  = List.nil<CoursePairMap>();
     var courseInformation : ?courseTypes.CourseInformation = null;
     var totalModules = 0;
     var moduleDefaultCycles = 1_000_000_000_000;

    private func isEnrolled(p : Principal) : Bool {
      return Map.has(enrolled, phash, p);
    };

    private func isManager (callerPrincipal : Principal) : Bool {
        if(manager == callerPrincipal) { 
            return true;
        };
        return false;
    };
    
    // this will check if the caller is this canister
    private func isValidCaller(caller : Principal) : Bool {
         if(Principal.fromActor(self) == caller ) { // this makes no sense, must be scrapt
            return true;
         } else {
           return true;
         };
    };

    public shared(msg) func setCourseInformation(courseInfo : courseTypes.CourseInformation) : async courseTypes.Result<Text, Text> {
        if(not isManager(msg.caller)) {
            return #err("not authorized");
        } else {
            courseInformation := ?courseInfo;
         return #ok("success");
        };
    };



    public shared func getCourseDetails() : async ?courseTypes.CourseDetails  {
      return null;
    };

    public shared(msg) func createModule(moduleName : Text) : async courseTypes.Result<courseTypes.ModulePair, Text> {
       if(not isValidCaller(msg.caller)) {
        return #err("error")
       } else {
         Cycles.add<system>(moduleDefaultCycles);
         let m  = await CourseModule.CourseModule(moduleName);
          
         let coursePair : CoursePair = {
            moduleActor  =  m;
            moduleHeading =  moduleName;
         };
          let p = Principal.fromActor(m);
          let map : CoursePairMap = Map.new<Principal, CoursePair>();
            Map.set(map, phash, p, coursePair);
            courseModules := List.push(map, courseModules);
            totalModules := totalModules + 1;
           return #ok({
               title =  moduleName;
               modulePrincipal = p;
           });
       };
    };

  // cycles related
  public func getCourseManagerCurrentCycles() : async Nat {
    return Cycles.balance();
 };

   public func recieveCycles(coursePrincipal : Principal) : async Bool {
    //todo
    //  loop through 
    return true;
   }


}