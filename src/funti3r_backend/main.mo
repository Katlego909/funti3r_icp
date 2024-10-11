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
import Result "mo:base/Result";
import  userInfo "components/UserDetails";
import  businesInfo "components/BusinessDetails";
import Task "components/Task";
import taskModule "./modules/task";
import auth "./modules/auth";
import reviewModule "./modules/review";
import ReviewDetails "components/ReviewDetails";
import subcriptionModule "./modules/subscription";
import Debug "mo:base/Debug";


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
 var minimumTaskAmount : Nat = 10_00_00_00_00; // 10 icp


 public shared func whoami(): async Principal {
  return Principal.fromActor(self);
 };

//================================================== Auth related functions ==========================================

 public  shared(msg)  func getProfileType() : async types.Result<Text, Text> {
   auth.getProfileType(msg.caller, users, businesses);
};

 public shared(msg) func createUserProfile(details: types.UserDetailsRecord): async  types.Result<Text, Text> {    
        auth.createUserProfile(msg.caller, details, users);
  };

 public shared(msg) func createBusinessProfile(details: types.BusinessDetailsRecord): async types.Result<Text, Text> {    
      auth.createBusiness(msg.caller, details, businesses);
  };
   
  // returns the user's profile if they have a profile otherwise returns null
  public shared(msg) func getUserProfile() : async types.Result<types.UserDetailsRecord, Text> {
         auth.loginUser(msg.caller, users);
  };
  
  // returns the user's profile if they have a profile otherwise returns null
  public shared(msg) func getBusinessProfile() : async types.Result<types.BusinessDetailsRecord, Text> {
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

  // only busineeses can now list tasks
  // so we need to add checks in place to ensure that this is rule is followed 
  public shared(msg) func listTask(task : types.TaskRecord, ) : async types.Result<types.TaskRecord, Text> {
    if(auth.isAuthorized(msg.caller, users, businesses)) {
      // make sure they first pay before listing the task;
      // they need to have approved this canister to make payment on thier behalf using icrc2 allowance standard
      let result = await payForTask(task.price, msg.caller);
      switch(result) {
        case (#err(err)) return #err(err); // if the transfer did not go through then we need not list the task on the market place
        case (#ok(k)) {
         let t =  taskModule.listTask(msg.caller,task, listedTask, generateId);
         return #ok(t);
        }
      }
    };

    return #err("authentication needed");
  };

  // function to get all the currently listed tasks
  // only microstaksers should call this method
  // todo:
      //==> we need to add pagination in the future
  public shared(msg) func getAllListedTasks() : async   types.Result<types.Tasks , Text> {
    if(auth.isAuthorized(msg.caller, users, businesses)) {
      let tasks =  taskModule.getAllListedTasks(listedTask);
      return #ok(tasks);
    };
      return #err("authentication needed");
  };
  public shared(msg) func getMicroTaskerApplications() : async   types.Result<types.Tasks , Text> {
    if(auth.isAuthorized(msg.caller, users, businesses)) {
      let tasks =  taskModule.getMicroTaskerApplications(msg.caller, users, listedTask, completedTasks);
      return #ok(tasks);
    };
      return #err("authentication needed");
  };

   // returns all the tasks belonging to the caller both copmleted and not completed
  public shared(msg) func getTasksByOwner() : async  types.Result<types.Tasks , Text>  {
         if(auth.isAuthorized(msg.caller, users, businesses)) {
            let tasks =  taskModule.getTasksByOwner(msg.caller,listedTask, completedTasks);
            return #ok(tasks);
    };

     return #err("authentication needed");
  };


  public shared(msg) func propose(taskId: Nat) : async types.Result<Text, Text>{
         if(auth.isAuthorized(msg.caller, users, businesses)) {
            let  r = taskModule.propose(msg.caller, taskId, listedTask, users);
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
  public shared(msg) func verifyWork(taskId: Nat, isSuccessfullyCompleted: Bool)  :    async  types.Result<Text, Text> {
    if(auth.isAuthorized(msg.caller, users, businesses)) {
            let r =  await taskModule.verifyWork(msg.caller,taskId, listedTask, completedTasks, releaseFundsSuccess, releaseFundsFail, isSuccessfullyCompleted);
             return r;
    };

     return #err("authentication needed");
      
  };

//=========================================== Reviews ===================================================================================

public shared(msg) func getReviewByPrincipal(p : Principal) : async types.Result<List.List<types.Review>, Text> {
       if(auth.isAuthorized(msg.caller, users, businesses)) {
         return reviewModule.getReviewByPrincipal(p, usersReviews);
    };
     return #err("authentication needed");
};


// // the caller creating a review for profile p.
public shared(msg) func createReview(p : Principal, review : types.Review) : async types.Result<Text, Text> {
   if(auth.isAuthorized(msg.caller, users, businesses)) {
        return reviewModule.createReview(p, review, usersReviews, generateReviewId);   
    };
     return #err("authentication needed");
};

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
                 return true;
              } catch (error : Error) {
                  return false;
              };
             };
          };
  };


private func payForTask(amount : Nat, taskOwner: Principal) : async types.Result<Text,Text> {
      if(amount < getMinimumTaskAmount()) {
        return #err("Task amount does not meet the minimum amount required");
      } else {
          if(await transferFrom(taskOwner, await whoami(), amount)) {
              return #ok("success");
          }  else {
              return #err("faild to transfer funds, make sure you have enough funds and try again. ");
          }
      }
};


private func getMinimumTaskAmount() : Nat {
     return minimumTaskAmount;
};

   //called when the task has not been completed successfully so that the funds can be released to the task lister
  private func releaseFundsFail(task : types.TaskRecord, ): async  Bool {
           switch(task.promisor) {
             case null return false;
             case (?microTasker) {
              let percent = (task.completionStatus/100);
              let price : Nat = task.price;
              // return the funds propotionaly based on the amount of work done
              let ownerAmount = Float.toInt((1 -  percent) * Float.fromInt(price));
              let microtTaskerAmount = Float.toInt(percent * Float.fromInt(price)); 
              

              let transferArgsForOnwer : ledger.TransferArgs = {
              // can be used to distinguish between transactions
              memo = Nat64.fromNat(task.taskId);
              // the amount we want to transfer
              amount = {e8s = Nat64.fromIntWrap (ownerAmount)};
              // the ICP ledger charges 10_000 e8s for a transfer
              fee = { e8s = 10_000 };
              // we are transferring from the canisters default subaccount, therefore we don't need to specify it
              from_subaccount = null;
              // we take the principal and subaccount from the arguments and convert them into an account identifier
              to = Principal.toLedgerAccount(task.owner, null); // there is no error on this line, motoko is just acting up
              // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
              created_at_time = null;
            };

            
              let transferArgsForMicroTasker : ledger.TransferArgs = {
              // can be used to distinguish between transactions
              memo = Nat64.fromNat(task.taskId);
              // the amount we want to transfer
              amount = {e8s = Nat64.fromIntWrap(microtTaskerAmount)};
              // the ICP ledger charges 10_000 e8s for a transfer
              fee = { e8s = 10_000 };
              // we are transferring from the canisters default subaccount, therefore we don't need to specify it
              from_subaccount = null;
              // we take the principal and subaccount from the arguments and convert them into an account identifier
              to = Principal.toLedgerAccount(microTasker, null); // there is no error on this line, motoko is just acting up
              // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
              created_at_time = null;
            };
              try {
                 let r1 =  await ledger.transfer(transferArgsForOnwer);
                 let r2 =  await ledger.transfer(transferArgsForMicroTasker);

                 var sent : Bool = true;
                 
                 // if any of the transfer fails we rent false
                 switch(r1) {
                  case (#Err(er)) sent := false;
                  case (#Ok(k)) {}; // /don't do anything. we might want to log these transactions
                 };
                 switch(r2) {
                  case (#Err(er)) sent := false; 
                  case (#Ok(k)) {}; // /don't do anything
                 };

                 return sent;

              } catch (error : Error) {
                  return false;
              };
             };
          };
  };



   
  // gets the balance that the canister is holding
  private func getBalance() : async  Nat {
    let   p : Principal = await whoami();
      await ledger.icrc1_balance_of({owner = p ; subaccount = null})
  };


  private func transferFrom(p : Principal, canisterId : Principal, price : Nat) : async Bool  {
        let transferFromArgs : ledger.TransferFromArgs = {
        spender_subaccount =  null;
        from = {owner = p; subaccount = null };
        to   = {owner = canisterId; subaccount = null};
        amount = price;
        fee = null;
        memo  = null;
        created_at_time = null; // null for now
     };
      let result = await ledger.icrc2_transfer_from(transferFromArgs);
   
      switch(result) {
        case(#Ok(re)) { 
            return true;
         };

        case(#Err(err)) { 
             return false;
        };
      };

  };



    
  //used when a principal wants a subType subscription type
  public  shared(msg) func subscribe(subType : types.SubscriptionModel) : async  types.Result<Text, Text> { 
    let canisterId : Principal =  await whoami();
        if(auth.isAuthorized(msg.caller, users, businesses)) {
           return await subcriptionModule.subscribe(msg.caller, canisterId , subType, users, businesses, transferFrom);
            };
          return #err("authentication needed");
  };


  public func getSubscriptionPrices() : async types.SubscriptionsPrices {
    return subcriptionModule.getSubscriptionPrices();
  };

//============================================================= Testing methods only===================
 
};