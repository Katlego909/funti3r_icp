import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Nat "mo:base/Nat";

module {

   public type UserDetailsRecord =  {
         name : Text;
         email: Text;
         phone : Text;
         location: Text;
         qualifications : List.List<Text>; // list of qualifications
         socials: List.List<Text>; // contains links to the users socials
         description: Text;
         subscription: SubscriptionModel;

    };
   
   public type BusinessDetailsRecord =  {
         name : Text;
         email: Text;
         phone : Text;
         location: Text;
         socials: List.List<Text>; // contains links to the users socials
         description: Text;
         subscription: SubscriptionModel;
    };
   
   public type TaskRecord = {
    taskId: Nat;   // for dev purposes only (we might need to change the way Id are generated for security purporses)
    owner: Principal;
    price : Float;
    postedDate: Text;
    expectedCompletionDate: Text;
    category: Text;
    description: Text;
    completed : Bool;
    promisors : List.List<Principal>; // these are individuals/busniess willing to complete the task
   };
    
  public type TaskListed = {
    id     : Nat;
    amount : Float;
    lister : Principal;
    microTasker : Principal;
  };


   public type SubscriptionModel = {
     #none;
     #premium;
     #enterprise;
   };


   public type Tasks = List.List<TaskRecord>;
}