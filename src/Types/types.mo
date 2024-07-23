import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Float "mo:base/Float";

module {

   public type UserDetailsRecord =  {
         name : Text;
         email: Text;
         phone : Text;
         location: Text;
         qualifications : List.List<Text>; // list of qualifications
         socials: List.List<Text>; // contains links to the users socials
         description: Text;

    };
   
   public type BusinessDetailsRecord =  {
         name : Text;
         email: Text;
         phone : Text;
         location: Text;
         socials: List.List<Text>; // contains links to the users socials
         description: Text
    };
   
   public type TaskRecord = {
    owner: Principal;
    price : Float;
    postedDate: Text;
    expectedCompletionDate: Text;
    category: Text;
    description: Text;
    completed : Bool;
    promisors : List.List<Principal>; // these are individuals/busniess willing to complete the task
   };

   public type subscriptionModels = {
     #none;
     #premium;
     #enterprise;
   };
}