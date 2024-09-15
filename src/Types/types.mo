import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Course "../course_manager/course";
import courseModule "../course_manager/courseModule";
// import Map "mo:map/Map";


module {
   public type Result<OK, ERR> = Result.Result<OK, ERR>;

   public type UserDetailsRecord =  {
         name : Text;
         email: Text;
         phone : Text;
         location: Text;
         qualifications : List.List<Text>; // list of qualifications
         socials: List.List<Text>; // contains links to the users socials
         description: Text;
         applications: List.List<Nat>; // contains a list of tasks they "applied for"
         subscription: SubscriptionModel;

    };
   
   public type BusinessDetailsRecord =  {
         name : Text;
         email: Text;
         phone : Text;
         location: Text;
         socials: List.List<Text>; // contains links to the users socials
         description: Text;
         applications: List.List<Nat>; // contains a list of tasks they "applied for"
         subscription: SubscriptionModel;
    };
   
   public type TaskRecord = {
    taskId: Nat;   // for dev purposes only (we might need to change the way Id are generated for security purporses)
    owner: Principal;
    price : Nat;
    postedDate: Text;
    expectedCompletionDate: Text;
    category: Text;
    description: Text;
    completed : Bool;
    completionStatus: Float;
    promisor: ?Principal; // the person that will be performing the work
    inProgress: Bool; // indicates whether a task lister has already chosen or picked someone to complete the task
    promisors : List.List<Principal>; // these are individuals/busniess willing to complete the task
   };
    

    public type Review = {
      id     : Nat;
      rating : Float;
      reviewer: Principal;
      date : Text;
      review: Text;
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
   
   public type SubscriptionsPrices = {
        none : Nat;
        premium : Nat;
        enterprise : Nat;
    };


   public type payArgs = {
     amount : Float;
     taskId : Nat;
   };
   
   public type TransferFromError = {
    BadFee :  { expected_fee : Nat };
    BadBurn :  { min_burn_amount : Nat };
    // The [from] account does not hold enough funds for the transfer.
    InsufficientFunds :  { balance : Nat };
    // The caller exceeded its allowance.
    InsufficientAllowance :  { allowance : Nat };
    CreatedInFuture:  { ledger_time : Nat64 };
    Duplicate :  { duplicate_of : Nat };
    GenericError :  { error_code : Nat; message : Text };
};

   public type ICRC_Result<OK, ERR> = {
    #Err : ERR;
    #Ok : OK
   };
   
   public type Tasks = List.List<TaskRecord>;

// course related types
   public type Courses = List.List<Course.Course>; // it will contain the list of course actors
   public type CourseModules = List.List<courseModule.CourseModule>;
   
}