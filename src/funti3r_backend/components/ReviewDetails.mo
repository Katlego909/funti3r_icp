import Principal "mo:base/Principal";
import Text "mo:base/Text";
import types "../../Types/types";

module {
 public class ReviewDetails(_id : Nat, _rating : Float , _reviewer : Principal, _date : Text, _review : Text) = self  {
   private var   id : Nat = _id;
   private var   rating : Float = _rating;
   private var   reviewer: Principal = _reviewer;
   private var   date : Text = _date;
   private var   review: Text = _review;

   ///getters 
   public func getId() : Nat {id};
   public func getRating(): Float {rating};
   public func getReviewer() : Principal {reviewer};
   public func getDate()   : Text {date};
   public func getReview() : Text  {review};
   
   //setters, we can only update the content and rating of a review once it has been created
    public func setRating(newRating : Float)  { rating := newRating};
    public func setReview(newContent: Text)  {review := newContent};
    public func setDate(newContent: Text)  {date := newContent};
    

    public func getReviewRecord() : types.Review {
      let r = {
      id      =  getId();
      rating  =  getRating();
      reviewer =  getReviewer();
      date  =  getDate();
      review =  getReview();
    };
     return r;
    };
  };
}