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
import taskModule "./modules/task";
// import reviewModule "./modules/review";
import ReviewDetails "components/ReviewDetails";


//importing canisters
import  ledger "canister:icp_ledger_canister"; // no error here as well


actor class Main() = self {

 type TaskId  = Nat;
 type ReviewId = Nat;
 type Reviews = List.List<ReviewDetails.ReviewDetails>;

 // all these data should be made stable before production
 //profile data storages
 let users = Map.new<Principal, userInfo.UserDetails>();
 let businesses = Map.new<Principal,businesInfo.BusinessDetails>();

 //review data storate
 let usersReviews = Map.new<Principal, Reviews>(); // holds reviews for each microstaker or user of the application

 //tasks data storages
 // map of (key = id of task, value = Task)
 let listedTask= Map.new<Nat, Task.Task>();
 let completedTasks= Map.new<Nat, Task.Task>(); // keeps track of the completed tasks


 var taskCounter : TaskId = 0; // for dev purposes only, should be initialsed to some larger number for production
 var reviewId :   ReviewId = 0;


 public shared func whoami(): async Principal {
  return Principal.fromActor(self);
 };

//================================================== Auth related functions ==========================================

 public shared(msg) func getProfileType() : async types.Result<Text, Text> {
   auth.getProfileType(msg.caller, users, businesses);
};

 public shared(msg) func createUserProfile(details: types.UserDetailsRecord): async  types.Result<Text, Text> {    
        auth.createUserProfile(msg.caller, details, users);
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
  private func generateId() : TaskId {
     taskCounter += 1;
     return taskCounter;
  };
  
  private func generateReviewId() : ReviewId {
     reviewId += 1;
     return reviewId;
  };

  public shared(msg) func listTask(task : types.TaskRecord, ) : async types.Result<types.TaskRecord, Text> {
  
    if(auth.isAuthorized(msg.caller, users, businesses)) {
      let t =  taskModule.listTask(msg.caller,task, listedTask, generateId);
      return #ok(t);
    };

    return #err("authentication needed");
  };

  
  // function to get all the currently listed tasks
  public shared(msg) func getAllListedTasks() : async   types.Result<List.List<types.TaskRecord> , Text> {
    if(auth.isAuthorized(msg.caller, users, businesses)) {
      let tasks =  taskModule.getAllListedTasks(listedTask);
      return #ok(tasks);
    };
      return #err("authentication needed");
  };

   // returns all the tasks belonging to the caller both copmleted and not completed
  public shared(msg) func getTasksByOwner() : async  types.Result<List.List<types.TaskRecord> , Text>  {
         if(auth.isAuthorized(msg.caller, users, businesses)) {
            let tasks =  taskModule.getTasksByOwner(msg.caller,listedTask, completedTasks);
            return #ok(tasks);
    };

     return #err("authentication needed");
  };

  public shared(msg) func propose(taskId: Nat) : async types.Result<Text, Text>{
         if(auth.isAuthorized(msg.caller, users, businesses)) {
            let  r = taskModule.propose(msg.caller, taskId, listedTask);
            return r;
    };
     return #err("authentication needed");
  };
  
  // called when a task lister wants to pick someone to complete their task
  public shared(msg) func acceptProposal(taskId: Nat, microTasker: Principal) : async (types.Result<Text, Text>){
          if(auth.isAuthorized(msg.caller, users, businesses)) {
            let  r = taskModule.acceptProposal(msg.caller, taskId, microTasker,  listedTask);
            return r;
    };
     return #err("authentication needed");
  };
  

  // returns the new updated task if the update was a success
  public shared(msg) func updateCompletionStatus(taskId: Nat ,status: Float) : async types.Result<types.TaskRecord, Text> {
          if(auth.isAuthorized(msg.caller, users, businesses)) {
            let r =  taskModule.updateCompletionStatus(msg.caller,taskId, status, listedTask);
          return r;
    };

     return #err("authentication needed");
  };

  public shared(msg) func completeTask(taskId : Nat) : async types.Result<Text, Text> {
       if(auth.isAuthorized(msg.caller, users, businesses)) {
            let r =  taskModule.completeTask(msg.caller,taskId, listedTask);
            return r;
    };
     return #err("authentication needed");
  };

   // called wby a listtasker when work is completed. this is when the funds held by the binder should be sent
   // to the microstaker who has just completed the task
  public shared(msg) func verifyWork(taskId: Nat)  :    async  types.Result<Text, Text> {
    if(auth.isAuthorized(msg.caller, users, businesses)) {
            let r =  await taskModule.verifyWork(msg.caller,taskId, listedTask, completedTasks, releaseFundsSuccess, releaseFundsFail);
             return r;
    };

     return #err("authentication needed");
      
  };

//=========================================== Reviews ===================================================================================

// public func getReviewByPrincipal(p : Principal) : async types.Result<Reviews, Text> {
   
// };


// // the caller creating a review for profile p.
// public func createReview(p : Principal, review : types.Review) : async types.Result<Text, Text> {
   
// };

//======================================================================================================================================
  //payment related stuff
   //called when the task has been completed so that the funds can be released to the micro-tasker
  private func releaseFundsSuccess(task : types.TaskRecord, microTasker: ?Principal): async Bool {
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
  private func releaseFundsFail(task : types.TaskRecord): async  Bool {
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
