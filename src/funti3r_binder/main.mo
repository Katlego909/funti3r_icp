import backEndCanister "canister:funti3r_backend";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Map "mo:map/Map";
import {ihash} "mo:map/Map";
import types "../Types/types";



actor class Binder() = self {
  type TaskId  = Nat;

  var listedTask  = Map.new<TaskId, types.TaskListed>();

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

  public func getBackendCainsterLedgerAccount(p : Principal) : async Blob {
    return  Principal.toLedgerAccount( p, null);
  };

   // called when a new task is listed so that the last lister can pay upfront
  public func listTask(task : types.TaskListed) : async Bool {
     // we must transfer icp token from the task lister to the this canister 
     // if success then we add the task to the listed tasks and return true otherwise we return false
      let transferSuccess = true;
      if (transferSuccess) {
         Map.set(listedTask, ihash, task.id, task);
         return true;
      };
     return false;
  };

}