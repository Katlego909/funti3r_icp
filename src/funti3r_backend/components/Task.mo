import List "mo:base/List";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import types "../../Types/types";


module {

   public class Task (_owner: Principal, _price: Float, _postedDate: Text, _expectedCompletionDate: Text, _category: Text, _description: Text) {
    var owner = _owner;
    var price = _price;
    var postedDate = _postedDate;
    var expectedCompletionDate = _expectedCompletionDate;
    var category = _category;
    var description = _description;
    var completed = false;
    var promisors = List.nil<Principal>(); // these are individuals/businesses willing to complete the task
    var taskId = 0;

    // Getters
    public func getOwner(): Principal { owner };
    public func getPrice(): Float { price };
    public func getPostedDate(): Text { postedDate };
    public func getExpectedCompletionDate(): Text { expectedCompletionDate };
    public func getCategory(): Text { category };
    public func getDescription(): Text { description };
    public func isCompleted(): Bool { completed };
    public func getPromisors(): List.List<Principal> { promisors };
    public func getTaskId(): Nat {taskId};
    // Setters
    public func setOwner(newOwner: Principal) { owner := newOwner };
    public func setPrice(newPrice: Float) { price := newPrice };
    public func setPostedDate(newPostedDate: Text) { postedDate := newPostedDate };
    public func setExpectedCompletionDate(newExpectedCompletionDate: Text) { expectedCompletionDate := newExpectedCompletionDate };
    public func setCategory(newCategory: Text) { category := newCategory };
    public func setDescription(newDescription: Text) { description := newDescription };
    public func setCompleted(newCompleted: Bool) { completed := newCompleted };
    public func setPromisors(newPromisors: List.List<Principal>) { promisors := newPromisors };


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