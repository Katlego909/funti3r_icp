import List "mo:base/List";
import Principal "mo:base/Principal";
import types "../Types/types";
import Cycles "mo:base/ExperimentalCycles";
import Bool "mo:base/Bool";
import Course "course";
import Prim "mo:prim";
import Nat64 "mo:base/Nat64";

actor Manager {
    var courses : types.Courses = List.nil<Course.Course>();
    let COURSE_CYCLES = 20_000_000_000_000;
    public shared func createCourse() : async Principal {
        Cycles.add<system>(COURSE_CYCLES);
        let course = await Course.Course(Principal.fromActor(Manager));
        courses := List.push(course,courses);
        return Principal.fromActor(course);
    };
    

   public query func getCourses() : async List.List<Course.Course> {
    return courses;
   };

   public func topUpCourse(coursePrincipal : Principal) : async Bool {
    //todo
    // find a course with the principal that matches the one passed to it and top it with cycles
    return true;
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