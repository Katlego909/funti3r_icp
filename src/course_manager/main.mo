import List "mo:base/List";
import Principal "mo:base/Principal";
import types "../Types/types";
import Cycles "mo:base/ExperimentalCycles";
import Bool "mo:base/Bool";
import Course "course";


actor Manager {
    var courses : types.Courses = List.nil<Course.Course>();
    let COURSE_CYCLES = 20_000_000_000_000;
    public shared func createCourse() : async Principal {
        Cycles.add<system>(COURSE_CYCLES);
        let course = await Course.Course(Principal.fromActor(Manager));
        courses := List.push(course,courses);
        return Principal.fromActor(course);
    };
    
   // method to view cycles information about the manager canister
   public func getCourseManagerCurrentCycles() : async Nat {
    return Cycles.balance();
   };

   public query func getCourses() : async List.List<Course.Course> {
    return courses;
   };

   public func topUpCourse(coursePrincipal : Principal) : async Bool {
    //todo
    // find a course with the principal that matches the one passed to it and top it with cycles
    return true;
   }


}