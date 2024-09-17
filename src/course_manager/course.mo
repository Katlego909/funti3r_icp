import Principal "mo:base/Principal";
import List "mo:base/List";
import Map "mo:map/Map";
import courseTypes "../Types/courseTypes";
import CourseModule "courseModule";
import Cycles "mo:base/ExperimentalCycles";
import CourseTypes "../Types/courseTypes";
import Prim "mo:prim";
import Nat64 "mo:base/Nat64";

import {phash; ihash} "mo:map/Map";

actor class Course(p : Principal) = self {
    private type CoursePair = {
         moduleActor : CourseModule.CourseModule;
         moduleHeading : Text;
     };

    private type CoursePairMap = Map.Map<Principal, CoursePair>;

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
        return true; // for tesing purposes must change this once the course manager has been determined
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



    public shared query(msg) func getCourseDetails() : async courseTypes.Result<?courseTypes.CourseDetails, Text>  {
      if(not isEnrolled(msg.caller)) {
         return #err("not enrolled");
      }  else if(courseInformation == null) {
            return #err("no content, yet");
      } else {
           let details = getDetails();
           return #ok(details);
      };
    };

    public shared(msg) func createModule(moduleName : Text, moduleNumber : Nat) : async courseTypes.Result<courseTypes.ModulePair, Text> {
       if(not isValidCaller(msg.caller)) {
        return #err("error")
       } else {
         Cycles.add<system>(moduleDefaultCycles);
         let m  = await CourseModule.CourseModule(moduleName, moduleNumber);
          
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


    public func updateModuleStatus(person : Principal, moduleNumberCompleted : Nat) : async Bool {
         if(not isEnrolled(person)) {
          return false;
         };
         switch(Map.get(enrolled, phash, person)) {
          case null {};
          case (?profile) {
               let completed = profile.modulesCompleted;
               Map.set(completed,ihash,moduleNumberCompleted, true); // since completed is a reference to the map, we need not reasign it to the profile
               //todo => check if all the modules have been completed and update their profile so a certificate can be issued out
          };
         };
         return true;
    };


    public  shared query(msg) func getCourseProfile() : async courseTypes.Result<?CourseTypes.CourseProfileQuest, Text> {
         if(not isEnrolled(msg.caller)) {
            return #err("not enrolled for this course");
         } else {
          switch(Map.get(enrolled, phash, msg.caller)) {
               case null return #ok(null);
               case (?profile) {
                 var completedModules = List.nil<Nat>();
                 let m = profile.modulesCompleted;
                  for(t in m.keys()) {
                     completedModules := List.push(t,completedModules);
                  };
                  let c : CourseTypes.CourseProfileQuest = {
                        enrollmentDate =  profile.enrollmentDate;
                        courseCompleted  =  profile.courseCompleted;
                        modulesCompleted  = completedModules;
                  };
                  return #ok(?c);
               };
          };
         };
    };
  // cycles related
  public func getCurrentCycles() : async Nat {
    return Cycles.balance();
 };


// utility function
private func getDetails() : ?courseTypes.CourseDetails {
    var modules = List.nil<courseTypes.ModulePair>();
           List.iterate(courseModules, func (pairMap : CoursePairMap) {
              for(pair in Map.vals(pairMap)) { // there is only one value in this map, so loop will run once
                    let modulePair : courseTypes.ModulePair  = {
                       modulePrincipal = Principal.fromActor(pair.moduleActor);
                       title = pair.moduleHeading;
                    };
                    modules := List.push(modulePair, modules);
              };
           });

           switch(courseInformation) {
            case null {return null};
            case (?inf) {
              let details : courseTypes.CourseDetails = {
             courseName  = inf.courseName;
              category   = inf.category;
              lastUpated = inf.lastUpated;
              totalModules = totalModules;
              modules    = modules;
           };
            return ?details;
            };
           }
    
 
};


// enrollment
 // called when micro-tasker wants to enroll in a course
 // todo => they must pay first
 //  the payments processing must happen on the backend for security
 public shared(msg) func enroll() : async Bool {
   return true;
 };



 
   public shared func getCurrentHeapMemory():  async Nat64 {
        Nat64.fromNat(Prim.rts_heap_size());
    };

    public shared func getCurrentMemory(): async Nat64 {
        Nat64.fromNat(Prim.rts_memory_size());
    };

}