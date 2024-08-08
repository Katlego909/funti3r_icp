import {test; suite } "mo:test/async";
import Map "mo:map/Map";
import types "../../Types/types";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Result "mo:base/Result";
import Task "../../funti3r_backend/components/Task";
import taskModule "../../funti3r_backend/modules/task";

type TaskId = Nat;
// test data
let principal = Principal.fromText("un4fu-tqaaa-aaaab-qadjq-cai"); // testing purposes only
let principal2 = Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai");

//tasks data storages
 // map of (key = id of task, value = Task)
 let listedTask = Map.new<Nat, Task.Task>();
 let completedTasks = Map.new<Nat, Task.Task>(); // keeps track of the completed tasks
 var taskCounter : TaskId = 0; // for dev purposes only, should be initialsed to some larger number for production


let taskRecord : types.TaskRecord = {
    taskId = 0;   // for dev purposes only (we might need to change the way Id are generated for security purporses)
    owner = principal;
    price = 100000;
    postedDate = "2024/05/02";
    expectedCompletionDate = "2024/06/02";
    category = "IT";
    description = "I need some my data and file to get backed on to a cloud computer";
    completed =  false;
    completionStatus = 0.0;
    promisor  = null; // the person that will be performing the work
    inProgress = false; // indicates whether a task lister has already chosen or picked someone to complete the task
    promisors = List.nil<Principal>(); // these are individuals/busniess willing to complete the task
};



 func generateId() : Nat {
    taskCounter += 1;
    return taskCounter;
 };


 suite("Testing task creation and retirievals", func () : async()  {
     await test("create a task", func () : async ()  {   
        let _ = taskModule.listTask(principal, taskRecord, listedTask, generateId);
        assert taskCounter == 1;
     });
    
    await test("get Task belonging to a certing principal", func () : async() {
        let tasks = taskModule.getTasksByOwner(principal, listedTask, completedTasks);
         assert List.size<types.TaskRecord>(tasks) == 1;
    });

     await test("create a another task", func () : async ()  {   
        let _ = taskModule.listTask(principal2, taskRecord, listedTask, generateId);
        assert taskCounter == 2;
     });
     await test("Get all tasks", func () : async () {
        let tasks = taskModule.getAllListedTasks(listedTask);

        assert List.size<types.TaskRecord>(tasks) == 2;
     } );

     await test("propose to do a task", func () : async () {
        let r = taskModule.propose(principal2, 1, listedTask);
        assert r == #ok("success");
     } );


     await test("task owner accepting wrong task", func () : async () {
         let r = taskModule.acceptProposal(principal, 100, principal2, listedTask);
         assert  r == #err("Such a task does not exists"); 
     });
     
     await test("An incorrect task owner accepting a task", func () : async () {
         let r = taskModule.acceptProposal(principal, 2, principal2, listedTask);
         assert  r == #err("not a valid task owner"); 
     });

     await test("task owner accepting a task", func () : async () {
         let r = taskModule.acceptProposal(principal, 1, principal2, listedTask);
         assert  r == #ok("success"); 
     });
      
      await test("update task status with invalid status", func () : async () {
         let r = taskModule.updateCompletionStatus(principal2, 1, -0.2, listedTask);
         assert r == #err("invalid status value");
      });
      await test("update task status with wrong task", func () : async () {
         let r = taskModule.updateCompletionStatus(principal2, 1000, 38, listedTask);
         assert r == #err("such a task does not exists");
      });
      await test("update task status with wrong micro-tasker", func () : async () {
         let r = taskModule.updateCompletionStatus(principal, 1, 80.0, listedTask);
         assert r == #err("could not update status, you are not assigned to do this task");
      });
      
      await test("update task status", func () : async () {
         let r = taskModule.updateCompletionStatus(principal2, 1, 80.0, listedTask);
         assert Result.isOk(r);
      });
    
      await test("complete task status with wrong task", func () : async () {
         let r = taskModule.completeTask(principal2, 1000, listedTask);
         assert r == #err("such a task does not exists");
      });
      await test("complete task status with wrong micro-tasker", func () : async () {
         let r = taskModule.completeTask(principal, 1, listedTask);
         assert r == #err("could not update status, you are not assigned to do this task");
      });
      
      await test("complete task status", func () : async () {
         let r = taskModule.completeTask(principal2, 1, listedTask);
         assert Result.isOk(r);
      });
    

 });