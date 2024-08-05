import Map "mo:map/Map";
import {phash; ihash} "mo:map/Map";
import types "../Types/types";
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
import auth "./modules/auth";

//importing canisters
import  ledger "canister:icp_ledger_canister";


actor class Main() = self {
 // all these data should be made stable before production
 //profile data storages
 let users = Map.new<Principal, userInfo.UserDetails>();
 let businesses = Map.new<Principal,businesInfo.BusinessDetails>();

 //review data storate
 let usersReviews = Map.new<Principal, types.Review>(); // holds reviews for each microstaker

 //tasks data storages
 // map of (key = id of task, value = Task)
 let listedTask= Map.new<Nat, Task.Task>();
 let completedTasks= Map.new<Nat, Task.Task>(); // keeps track of the completed tasks
 var taskCounter : Nat = 0; // for dev purposes only, should be initialsed to some larger number for production
 type TaskId  = Nat;


 public shared func whoami(): async Principal {
  return Principal.fromActor(self);
 };

//================================================== Auth related functions ==========================================

 public shared(msg) func getProfileType() : async types.Result<Text, Text> {
   auth.getProfileType(msg.caller, users, businesses);
};

 public shared(msg) func creatUserProfile(details: types.UserDetailsRecord): async  types.Result<Text, Text> {    
        auth.creatUserProfile(msg.caller, details, users);
  };

 public shared(msg) func createBusiness(details: types.BusinessDetailsRecord): async types.Result<Text, Text> {    
      auth.createBusiness(msg.caller, details, businesses);
  };
   
  // returns the user's profile if they have a profile otherwise returns null
  public shared(msg) func loginUser() : async types.Result<types.UserDetailsRecord, Text> {
         auth.loginUser(msg.caller, users);
  };
  
  // returns the user's profile if they have a profile otherwise returns null
  public shared(msg) func loginB() : async types.Result<types.BusinessDetailsRecord, Text> {
          auth.loginB(msg.caller, businesses);
  };

//=================================================== Auth ends here ===================================================================

// ================================================= Tasks related functions ============================================================

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

   // returns all the tasks belonging to the caller both copmleted and not completed
  public shared(msg) func getTasksByOwner() : async List.List<types.TaskRecord> {
     var tasks : types.Tasks = List.nil<types.TaskRecord>();
     //get all uncomplted tasks
     for(t in Map.vals(listedTask)) {
        if(t.getOwner() == msg.caller) {
              tasks := List.push(t.getTaskRecord(), tasks);
        };
     }; 
     // get all completed tasks
     for(t in Map.vals(completedTasks)) {
           if(t.getOwner() == msg.caller) {
              tasks := List.push(t.getTaskRecord(), tasks);
        };
     };
     return tasks;
  };

  public shared(msg) func propose(taskId: Nat) : async types.Result<Text, Text>{
      let result = Map.get(listedTask, ihash, taskId);
      switch(result) {
        case null #err("no such task");
        case (?task) {
          if(not task.getInProgress()) {
            task.addPromisor(msg.caller);
            return #ok("success");
          };
          return #err("Sorry, task currently does not take any further proposals");
        };
      };
  };
  
  // called when a task lister wants to pick someone to complete their task
  public shared(msg) func acceptProposal(taskId: Nat, microTasker: Principal) : async (types.Result<Text, Text>){
       let task =  Map.get(listedTask, ihash, taskId);
      switch(task) {
        case null #err("Such a task does not exists");
        case (?t) { 
           t.setInProgress(); // prevents other micro-taskers from propsing further
           t.setPromisor(microTasker); // sets the person whom will do the job. The person to do the job need not be the one whom propsosed
           // this allows people to select whomever they want to complete the job.
           // weway need a way to alert the promisor that they have been selected to do the task using some websocet or other real time protocols
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
       let task =  Map.remove(listedTask, ihash, taskId); // we need to remove it and relocate it to the completed section
       switch(task) {
        case null #err("No such task");
        case (?t) {
          if (t.getOwner() != msg.caller) {
             Map.set(listedTask, ihash, taskId, t); // put it back if the caller is not allowed to remove
             // this function will seldom run since it is very unlikely that a random person will have to the task id 
             return #err("oops, unauthorised access")
          } else {
            // we need to release the funds
            // move the task to the completed section
             relocate(t, completedTasks);
            let microTasker : ?Principal = t.getPromisor(); // get the microstasker
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

  private func relocate(t: Task.Task, tasks: Map.Map<Nat, Task.Task>) {
        Map.set(tasks, ihash, t.getTaskId(), t);
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
              to = Principal.toLedgerAccount(principal, null); // there is no error on this line, motoko is just acting up
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
