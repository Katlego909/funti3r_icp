
import Principal "mo:base/Principal";
import List "mo:base/List";
import Map "mo:map/Map";
import {ihash;phash} "mo:map/Map";
import types "../../Types/types";
import UserDetails "../components/UserDetails";
import BusinessDetails "../components/BusinessDetails";
import Task "../components/Task";

//should contain functions or routines for working with tasks 
module {
    public type TaskId =  Nat;
    public type Users =  Map.Map<Principal, UserDetails.UserDetails>;
    public type Businesses = Map.Map<Principal, BusinessDetails.BusinessDetails>;
    public type ListedTasks = Map.Map<TaskId, Task.Task>;
   

  public func listTask(owner : Principal, task : types.TaskRecord, listedTasks : ListedTasks, generator : () -> Nat ) :  types.TaskRecord {
    let taskCounter = generator();
    let t = Task.Task(owner,
     task.price, 
     task.postedDate, 
     task.expectedCompletionDate, 
     task.category, 
     task.description);
    t.generateId(taskCounter); // generate an id
     Map.set(listedTasks, ihash, taskCounter ,t);
     return t.getTaskRecord();
  };

  
  // function to get all the currently listed tasks
  public  func getAllListedTasks(listedTasks : ListedTasks) : List.List<types.TaskRecord> {
      var tasks : types.Tasks = List.nil<types.TaskRecord>();
  
    for (t in Map.vals(listedTasks)) {
            tasks := List.push(t.getTaskRecord(), tasks );
      };
      return tasks;
  };

   // returns all the tasks belonging to the caller both copmleted and not completed
  public func getTasksByOwner(owner : Principal , listedTasks : ListedTasks, completedTasks : ListedTasks) :  List.List<types.TaskRecord> {
     var tasks : types.Tasks = List.nil<types.TaskRecord>();
     //get all uncomplted tasks
     for(t in Map.vals(listedTasks)) {
        if(t.getOwner() ==  owner) {
              tasks := List.push(t.getTaskRecord(), tasks);
        };
     }; 
     // get all completed tasks
     for(t in Map.vals(completedTasks)) {
           if(t.getOwner() == owner) {
              tasks := List.push(t.getTaskRecord(), tasks);
        };
     };
     return tasks;
  };
  
  public func getTaskById(id : Nat, listedTasks : ListedTasks, completedTasks : ListedTasks) : ?types.TaskRecord {
       var t = Map.get(listedTasks, ihash, id);
       switch(t){
        case (null) {
          return switch(Map.get(completedTasks, ihash, id)) {
            case null return null;
            case (?task) {
              return ?task.getTaskRecord();
            };
          };
        };
        case(?task) {
          return ?task.getTaskRecord();
        }
       }; 
  };

  public func propose(proposer : Principal , taskId: Nat, listedTasks : ListedTasks, microTaskers : Users) :  types.Result<Text, Text>{
      
      let result = Map.get(listedTasks, ihash, taskId);
      switch(result) {
        case null #err("no such task");
        case (?task) {
          if(not task.getInProgress()) {
            task.addPromisor(proposer); // we should notify the task lister
            //upate microtaskter application details
            updateMicrotaskerDetails(proposer, microTaskers, taskId);
            return #ok("success");
          };
          return #err("Sorry, task currently does not take any further proposals");
        };
      };
  };

  private func  updateMicrotaskerDetails(proposer : Principal, microTaskers : Users, taskId : Nat) {
      let result = Map.get(microTaskers, phash, proposer);
      switch(result) {
        case null return; // this can never be the case since the auth module will gurantee that the person calling this method is already authenticated
        case (?user) {
           user.setApplication(taskId);
        };
      }
  };
  

  // it should return a list of all the tasks this microTasker has ever applied to
  public func getMicroTaskerApplications(microTasker: Principal, microTaskers: Users,  listedTasks : ListedTasks, completedTasks : ListedTasks ) :  List.List<types.TaskRecord>{
    var tasks : types.Tasks = List.nil<types.TaskRecord>();
    let user = Map.get(microTaskers, phash, microTasker);
     switch(user) {
      case (null) return tasks;
      case (?tasker) {
        let applications = tasker.getApplications(); // get all the ids of the tasks they have ever applied for
        for(t in List.toIter<Nat>(applications)) {
         tasks := loadTaskIntoList(t,tasks, listedTasks);
         tasks :=  loadTaskIntoList(t,tasks, completedTasks);
        };

        return tasks;
      };
     }
  };


  private func loadTaskIntoList(taskId : Nat, list : types.Tasks, lists : ListedTasks) : types.Tasks {
       let r = Map.get(lists, ihash, taskId);
       switch(r) {
        case (null) return list; // return the old list
         case (?task) {
           let r =  List.push<types.TaskRecord>(task.getTaskRecord(), list);
           return r; // return the updated list
        };
       }
  };
  // called when a task lister wants to pick someone to complete their task
  public func acceptProposal(taskOwner : Principal , taskId: Nat, microTasker: Principal, listedTasks : ListedTasks) :  (types.Result<Text, Text>){
       let task =  Map.get(listedTasks, ihash, taskId);
      switch(task) {
        case null #err("Such a task does not exists");
        case (?t) { 
            if( not (t.getOwner() == taskOwner)) {
                return #err("not a valid task owner")
            };

           t.setInProgress(); // prevents other micro-taskers from propsing further
           t.setPromisor(microTasker); // sets the person whom will do the job. The person to do the job need not be the one whom propsosed
           // this allows people to select whomever they want to complete the job.
           // weway need a way to alert the promisor that they have been selected to do the task using some websocet or other real time protocols
           return #ok("success");
        };
      };
  };
  

  // returns the new updated task if the update was a success
  public  func updateCompletionStatus(p : Principal , taskId: Nat ,status: Float, listedTasks : ListedTasks) :  types.Result<types.TaskRecord, Text> {
     let task = Map.get(listedTasks, ihash, taskId);
     if (status < 0) {
         return #err("invalid status value")
     };
     switch(task) {
      case null #err("such a task does not exists");
      case (?t) {
      switch(t.getPromisor()) {
             case null #err("could not update the status, try again later");
             case (?promisor) {
                if( not (promisor == p)) { return #err("could not update status, you are not assigned to do this task")}; // people should only update status of which they are approved to update
                  let record =  t.updateCompletionStatus(status);
                  return #ok(record);
             };
          };
      }
     };
  };

  public  func completeTask(p : Principal, taskId : Nat, listedTasks : ListedTasks) :  types.Result<Text, Text> {
    // should add more checks to ensure that the caller is indeed the who is suppposed to be calling the method
    let task = Map.get(listedTasks, ihash, taskId);
    switch(task) {
      case null #err("such a task does not exists");
      case (?v) {
          switch(v.getPromisor()) {
             case null #err("could not update the status, try again later");
             case (?promisor) {
                if( not (promisor == p)) { return #err("could not update status, you are not assigned to do this task")}; // people should only update status of which they are approved to update
                  v.setCompleted(true);
           // we must use other real time communication protocols like emails or notifications to notifier the 
           // task lister so they can verify the work          
          return #ok("success")
             };
          };
      };
    }
  
  };

   // called wby a listtasker when work is completed. this is when the funds held by the binder should be sent
   // to the microstaker who has just completed the task
  public  func verifyWork(taskOwner : Principal, 
   taskId: Nat, 
   listedTasks : ListedTasks, 
   completedTasks : ListedTasks, 
   releaseFundsSuccess : (types.TaskRecord, ?Principal) -> async Bool,
   releaseFundsFail    : (types.TaskRecord) -> async Bool,
   isSuccessfullyCompleted: Bool
   )  : async types.Result<Text, Text> {
    //assuming that the task lister and micro-tasker have communicated and all went well
       let task =  Map.remove(listedTasks, ihash, taskId); // we need to remove it and relocate it to the completed section
       switch(task) {
        case null #err("No such task");
        case (?t) {
          if (t.getOwner() != taskOwner) {
             Map.set(listedTasks, ihash, taskId, t); // put it back if the caller is not allowed to remove
             // this function will seldom run since it is very unlikely that a random person will have to the task id 
             return #err("oops, unauthorised access")
          } else {
            // we need to release the funds
            // move the task to the completed section
            if(isSuccessfullyCompleted) {
              let microTasker : ?Principal = t.getPromisor(); // get the microstasker
              let isSent = await releaseFundsSuccess(t.getTaskRecord(), microTasker);
              if(isSent) {
                relocate(t, completedTasks);
                return #ok("success")
             } else {
                return #err("could not transfer funds, try again later")
             };

            } else {
              let isSent = await releaseFundsFail(t.getTaskRecord());
                relocate(t, completedTasks);// relocate the task to prevent double spending
              if(isSent) {
                return #ok("success")
             } else {
                return #err("could not transfer funds to one or both parties, try again later")
             };
            }
          };
        }
       }
  
  };

  private func relocate(t: Task.Task, tasks: Map.Map<Nat, Task.Task>) {
        Map.set(tasks, ihash, t.getTaskId(), t);
  };
  
}