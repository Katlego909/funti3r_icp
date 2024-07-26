import backEndCanister "canister:funti3r_backend";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";


actor {
  type TaskId  = Nat;
    
  private var backendCanisterID : ?Principal  =  null;

  public func getBackendCainsterId() : async ?Principal {
      switch(backendCanisterID) {
        case(null) {  
            backendCanisterID := ?(await backEndCanister.whoami());
           return backendCanisterID;
        };
        case(?value) { ?value };
      };
  };

   // called when a new task is listed so that the last lister can pay upfront
  public func listTask() : async Bool {
     return true;
  };

   //called when the task has been completed so that the funds can be released to the micro-tasker
  public func releaseFundsSuccess(taskId : TaskId): async Bool {
    return true;
  };
   //called when the task has not been completed successfully so that the funds can be released to the task lister
  public func releaseFundsFail(taskId : TaskId): async Bool {
    return true;
  };
  
  //used when a principal wants sub_type subscription model
  public func subscribe(sub_type: Text, p : Principal) : async Bool {
     return true;
  }
}