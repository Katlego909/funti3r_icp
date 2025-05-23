import List "mo:base/List";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import types "../../Types/types";


module {

   public class Task (_owner: Principal, _price: Nat, _postedDate: Text, _expectedCompletionDate: Text, _category: Text, _description: Text) = this {
    private var owner = _owner;
    private var price = _price;
    private var postedDate = _postedDate;
    private var expectedCompletionDate = _expectedCompletionDate;
    private var category = _category;
    private var description = _description;
    private var completed = false;
    private var promisors = List.nil<Principal>(); // these are individuals/businesses willing to complete the task
    private var taskId = 0;
    private var completionStatus : Float = 0;
    private var promisor: ?Principal   =  null; // the person that will be performing the work
    private var inProgress = false;

    // Getters
    public func getOwner(): Principal { owner };
    public func getPrice(): Nat { price };
    public func getPostedDate(): Text { postedDate };
    public func getExpectedCompletionDate(): Text { expectedCompletionDate };
    public func getCategory(): Text { category };
    public func getDescription(): Text { description };
    public func isCompleted(): Bool { completed };
    public func getPromisors(): List.List<Principal> { promisors };
    public func getTaskId(): Nat {taskId};
    public func getCompletionStatus(): Float {completionStatus};
    public func getPromisor(): ?Principal {
         return promisor;
    };
    public func getInProgress() : Bool {
      return inProgress;
    };
    // Setters
    public func setOwner(newOwner: Principal) { owner := newOwner };
    public func setPrice(newPrice: Nat) { price := newPrice };
    public func setPostedDate(newPostedDate: Text) { postedDate := newPostedDate };
    public func setExpectedCompletionDate(newExpectedCompletionDate: Text) { expectedCompletionDate := newExpectedCompletionDate };
    public func setCategory(newCategory: Text) { category := newCategory };
    public func setDescription(newDescription: Text) { description := newDescription };
    public func setCompleted(newCompleted: Bool) { completed := newCompleted };
    public func setPromisors(newPromisors: List.List<Principal>) { promisors := newPromisors };
    public func setPromisor(p: Principal) {promisor:= ?p};
    public func setInProgress() {inProgress := true};
    //update methods

    public func updateCompletionStatus(status : Float) : types.TaskRecord {
         completionStatus := status;
         return getTaskRecord();
    };


    public func getTaskRecord() :  types.TaskRecord  {
        let r : types.TaskRecord = {
            taskId = getTaskId();
            owner = getOwner();
            price = getPrice();
            postedDate = getPostedDate();
            expectedCompletionDate = getExpectedCompletionDate();
            category = getCategory();
            description = getDescription();
            completed = isCompleted();
            promisors = getPromisors(); // these are individuals/busniess willing to complete the task
            completionStatus = getCompletionStatus();
            inProgress = getInProgress();
            promisor = getPromisor();
        };

        return r;
    };

    public func addPromisor(p: Principal) {
     promisors := List.push(p, promisors);
    };

    public func generateId(taskCounter: Nat) {
       taskId := taskCounter;
    };
}

}