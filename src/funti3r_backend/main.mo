import Map "mo:map/Map";
import types "../Types/types";
import {phash; ihash} "mo:map/Map";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Float "mo:base/Float";
import  userInfo "components/UserDetails";
import  businesInfo "components/BusinessDetails";
import Task "components/Task";


actor class Main() = self {

 let users = Map.new<Principal, userInfo.UserDetails>();
 let businesses = Map.new<Principal,businesInfo.BusinessDetails>();
 // map of (key = id of task, value = Task)
 let listedTask= Map.new<Nat, Task.Task>(); 

 var taskCounter : Nat = 0; // for dev purposes only

 public shared func whoami(): async Principal {
  return Principal.fromActor(self);
 };
 // a utility function to check if a user is authorized to access a specific resource
 private func verifyCaller(p : Principal) : async () {
     if (Principal.isAnonymous(p) or (not (await userExists(p)) or (not (await businessExists(p))))) {
       // throw an error if caller is not authorized
     }
 };

 private func userExists(p: Principal) : async (Bool) {
     let hasUser = Map.has(users, phash, p); 
      if(not hasUser) {
         return false;
      };
      return true;
 };


 private func businessExists(p: Principal) : async (Bool) {
     let hasProfile = Map.has(businesses, phash, p); 
      if(not hasProfile) {
        return false;
      };
      return true;
 };

 public shared(msg) func creatUserProfile(details: types.UserDetailsRecord): async (?types.UserDetailsRecord) {    
      if(not (await userExists(msg.caller))) {
        let user = userInfo.UserDetails(details.name, 
          details.email,
          details.phone,
          details.location,
          details.qualifications,
          details.socials,
          details.description
         );
        Map.set(users, phash, msg.caller, user);
        return ?details;
      };
      return null;
  };

 public shared(msg) func creatBusiness(details: types.BusinessDetailsRecord): async (?types.BusinessDetailsRecord) {    
      if(not ( await businessExists(msg.caller))) {
        let info = businesInfo.BusinessDetails(
          details.name,
          details.email,
          details.phone,
          details.location,
          details.socials,
          details.description
        );
        Map.set(businesses, phash, msg.caller, info);
        return ?details;
      };
      return null;
  };
   
  // returns the user's profile if they have a profile otherwise returns null
  public shared(msg) func loginUser() : async ?types.UserDetailsRecord {
        let result =  Map.get(users, phash, msg.caller);
        switch(result) {
          case null null; // return null if the usr does not exists
          case (?value) {
            // create the record to return to the client
            let userDetails : types.UserDetailsRecord = {
              name =  value.getName();
              email = value.getEmail();
              phone = value.getPhone();
              location = value.getLocation();
              qualifications = value.getQualifications(); // list of qualifications
              socials = value.getSocials(); // contains links to the users socials
              description = value.getDescription();
              subscription =  value.getSubscription();
            };
            return ?userDetails; 
          }
        }
  };
  
  // returns the user's profile if they have a profile otherwise returns null
  public shared(msg) func loginB() : async ?types.BusinessDetailsRecord {
        let result =  Map.get(businesses, phash, msg.caller);
        switch(result) {
          case null null;
          case (?info) {
            let record : types.BusinessDetailsRecord = {
                  name  = info.getName();
                  email = info.getEmail();
                  phone = info.getPhone();
                  location = info.getLocation();
                  socials = info.getSocials();
                  description = info.getDescription();
                  subscription =  info.getSubscription();
            };
            return ?record;
          }
        }
  };



  public shared(msg) func listTask(task : types.TaskRecord) : async types.TaskRecord {
    // we should eventually check to see if the client is authorized and only then can they post task, will do that later
    taskCounter += 1;
    let t = Task.Task(msg.caller,
     task.price, 
     task.postedDate, 
     task.expectedCompletionDate, 
     task.category, 
     task.description);

    t.generateId(taskCounter); // generate an id
     Map.set(listedTask, ihash, taskCounter ,t);
     return task;

  };

  
  // function to get all the currently listed tasks
  public  func getAllListedTasks() : async  List.List<types.TaskRecord> {
      var tasks : types.Tasks = List.nil<types.TaskRecord>();
  
    for (t in Map.vals(listedTask)) {
            tasks := List.push(t.getTaskRecord(), tasks );
      };
      return tasks;
  };

   // returns all the tasks belonging to the caller
  public  func getTasksByOwner() : async ?List.List<types.TaskRecord> {
     return null;
  };

  public shared(msg) func propose(taskId: Nat) : async Bool{
      let result = Map.get(listedTask, ihash, taskId);
      switch(result) {
        case null false;
        case (?task) {
          task.addPromisor(msg.caller);
          return true;
        }
      };
  };
  
  // called when a task lister wants to pick someone to complete their task
  public shared(msg) func acceptProposal(taskId: Nat, microTasker: Principal) : async Bool {
       return true
  };
  
  public shared(msg) func updateCompletionStatus(taskId: Nat ,status: Float) : async Bool {
     return true;
  };

  public shared(msg) func completeTask(taskId : Nat) : async Bool {
    return true;
  };

   // called wby a listtasker when work is completed. this is when the funds held by the binder should be sent
   // to the microstaker who has just completed the task
  public shared(msg) func verifyWork(taskId: Nat)  :    async Bool {
      return true;
  };

};
