import Map "mo:map/Map";
import types "../Types/types";
import {phash; ihash} "mo:map/Map";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Float "mo:base/Float";
import Option "mo:base/Option";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import  userInfo "components/UserDetails";
import  businesInfo "components/BusinessDetails";
import Task "components/Task";

//importing canisters
import  ledger "canister:icp_ledger_canister";


actor class Main() = self {

 let users = Map.new<Principal, userInfo.UserDetails>();
 let usersReviews = Map.new<Principal, types.Review>(); // holds reviews for each microstaker
 let businesses = Map.new<Principal,businesInfo.BusinessDetails>();
 // map of (key = id of task, value = Task)
 let listedTask= Map.new<Nat, Task.Task>();
 
 var taskCounter : Nat = 0; // for dev purposes only, should be initialsed to some larger number for production

   type TaskId  = Nat;

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



  public shared(msg) func listTask(task : types.TaskRecord, ) : async types.TaskRecord {
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
  public shared(msg) func getTasksByOwner() : async List.List<types.TaskRecord> {
     var tasks : types.Tasks = List.nil<types.TaskRecord>();
     for(t in Map.vals(listedTask)) {
        if(t.getOwner() == msg.caller) {
              tasks := List.push(t.getTaskRecord(), tasks);
        };
     }; 
     return tasks;
  };

  public shared(msg) func propose(taskId: Nat) : async Bool{
      let result = Map.get(listedTask, ihash, taskId);
      switch(result) {
        case null false;
        case (?task) {
          task.addPromisor(msg.caller);
          return true;
        };
      };
  };
  
  // called when a task lister wants to pick someone to complete their task
  public shared(msg) func acceptProposal(taskId: Nat, microTasker: Principal) : async (types.Result<Text, Text>){
       let task =  Map.get(listedTask, ihash, taskId);
      switch(task) {
        case null #err("Such a task does not exists");
        case (?t) {
           // we need to pick to one of the promisors from the list
           // prevent other micro-taskers from futher propsing 
           // remove all the othe proposers
           return #ok("success");
        };
      };
  };
  

  // returns the new updated task if the update was a success
  public shared(msg) func updateCompletionStatus(taskId: Nat ,status: Float) : async types.Result<types.TaskRecord, Text> {
     let task = Map.get(listedTask, ihash, taskId);
     if (status < 0) {
         return #err("invalid status value")
     };
     switch(task) {
      case null #err("such a task does not exists");
      case (?t) {
       let record =  t.updateCompletionStatus(status);
        return #ok(record);
      }
     };
  };

  public shared(msg) func completeTask(taskId : Nat) : async types.Result<Text, Text> {
    // should add more checks to ensure that the caller is indeed the who is suppposed to be calling the method
    let task = Map.get(listedTask, ihash, taskId);
    switch(task) {
      case null #err("could update the status, try again later");
      case (?v) {
           v.setCompleted(true);
           // we must use other real time communication protocols like emails or notifications to notifier the 
           // task lister so they can verify the work          
          return #ok("success")
      };
    }
  
  };

   // called wby a listtasker when work is completed. this is when the funds held by the binder should be sent
   // to the microstaker who has just completed the task
  public shared(msg) func verifyWork(taskId: Nat)  :    async  types.Result<Text, Text> {
    //assuming that the task lister and micro-tasker have communicated and all went well
       let task = Map.get(listedTask, ihash, taskId);
       switch(task) {
        case null #err("No such task");
        case (?t) {
          if (t.getOwner() != msg.caller) {
             return #err("oops, unauthorised access")
          } else {
            // we need to release the funds
            let microTasker : ?Principal = List.get<Principal>(t.getPromisors(), 0); // there should be only one 
             let isSent =  (await releaseFundsSuccess(t.getTaskRecord(), microTasker));
             if(isSent) {
               return #ok("success")
             } else {
                return #err("could not transfer funds, try again later")
             };
          };
        }
       }
  
  };
  

//======================================================================================================================================
  //payment related stuff
   //called when the task has been completed so that the funds can be released to the micro-tasker
  public func releaseFundsSuccess(task : types.TaskRecord, microTasker: ?Principal): async Bool {
          switch(microTasker) {
             case null return false;
             case (?principal) {
              let transferArgs : ledger.TransferArgs = {
              // can be used to distinguish between transactions
              memo = Nat64.fromNat(task.taskId);
              // the amount we want to transfer
              amount = {e8s = Nat64.fromNat(task.price)};
              // the ICP ledger charges 10_000 e8s for a transfer
              fee = { e8s = 10_000 };
              // we are transferring from the canisters default subaccount, therefore we don't need to specify it
              from_subaccount = null;
              // we take the principal and subaccount from the arguments and convert them into an account identifier
              to = Principal.toLedgerAccount(principal, null);
              // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
              created_at_time = null;
            };
              try {
                let result = await ledger.transfer(transferArgs);
                 // return true for now
                 return true;
              } catch (error : Error) {
                  return false;
              };
             };
          };
        
  
  };
   //called when the task has not been completed successfully so that the funds can be released to the task lister
  public func releaseFundsFail(taskId : TaskId): async Bool {
    return true;
  };
  
  //used when a principal wants sub_type subscription model
  public func subscribe(subType: Text, p : Principal) : async Bool {
     return true;
  };
   
  // gets the balance that the canister is holding
  public func getBalance() : async  Nat {
    let   p : Principal = await whoami();
      await ledger.icrc1_balance_of({owner = p ; subaccount = null})
  };

};
