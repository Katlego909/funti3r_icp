import types "../../Types/types";
import ReviewDetails "../components/ReviewDetails";
import List "mo:base/List";
import Map "mo:map/Map";
import {phash} "mo:map/Map";


module {
    type Review = ReviewDetails.ReviewDetails;
    type Reviews = List.List<Review>;
    type UsersReviews = Map.Map<Principal, List.List<Review>>;

   public func getReviewByPrincipal(p : Principal, usersReviews : UsersReviews) :  types.Result<List.List<types.Review>, Text> {
    var reviewsList = List.nil<types.Review>();
    let r =  Map.get(usersReviews, phash, p);
    switch(r) {
        case(null) { // just return an empty list of reviews since this principal has none  
          return #ok(reviewsList);
        };
        case(?reviews) {
           reviewsList := List.map<Review, types.Review>(reviews, mapReviewsToReviewRecords);
           #ok(reviewsList);
         };
    };
};

// the caller creating a review for profile p.
public func createReview(p : Principal, review : types.Review, usersReviews : UsersReviews, idGenerator : () -> Nat ) :  types.Result<Text, Text> {
  let r = Map.get(usersReviews, phash, p );
  switch(r) {
    case null {
         var reviewsListDetails = List.nil<Review>();
         let id = idGenerator();
         let reviewDetails = ReviewDetails.ReviewDetails(id, 
         review.rating, 
         review.reviewer, 
         review.date, 
         review.review); // create a new review object
         reviewsListDetails := List.push<Review>(reviewDetails, reviewsListDetails); // add the review to the list
        Map.set(usersReviews, phash, p,reviewsListDetails);

        return #ok("success");

    };

    case (?reviews) { 
         var updated = false;
         // a review single user can only create a single review to another another user.
         // thus we update if an old review old alredy exisits
         for (v in List.toIter<Review>(reviews)) {
              if (v.getReviewer() == review.reviewer) {
                    updated := true;
                    v.setReview(review.review);
                    v.setDate(review.date);
              };
         };
        
        if(not updated) { // if a user has not already laid a review before then we create a new one
         let id = idGenerator();
         let reviewDetails = ReviewDetails.ReviewDetails(id, 
         review.rating, 
         review.reviewer, 
         review.date, 
         review.review); // create a new review object
         let upatedList = List.push<Review>(reviewDetails, reviews); // add the review to the list
        Map.set(usersReviews, phash, p,upatedList);
        };
         return #ok("success");
    };
  }
};

 private func mapReviewsToReviewRecords(review : Review) : types.Review {
    return review.getReviewRecord();
 };
}