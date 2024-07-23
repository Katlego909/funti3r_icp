import List "mo:base/List";
import Principal "mo:base/Principal";

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


    // Getters
    public func getOwner(): Principal { owner };
    public func getPrice(): Float { price };
    public func getPostedDate(): Text { postedDate };
    public func getExpectedCompletionDate(): Text { expectedCompletionDate };
    public func getCategory(): Text { category };
    public func getDescription(): Text { description };
    public func isCompleted(): Bool { completed };
    public func getPromisors(): List.List<Principal> { promisors };

    // Setters
    public func setOwner(newOwner: Principal) { owner := newOwner };
    public func setPrice(newPrice: Float) { price := newPrice };
    public func setPostedDate(newPostedDate: Text) { postedDate := newPostedDate };
    public func setExpectedCompletionDate(newExpectedCompletionDate: Text) { expectedCompletionDate := newExpectedCompletionDate };
    public func setCategory(newCategory: Text) { category := newCategory };
    public func setDescription(newDescription: Text) { description := newDescription };
    public func setCompleted(newCompleted: Bool) { completed := newCompleted };
    public func setPromisors(newPromisors: List.List<Principal>) { promisors := newPromisors };
}

}