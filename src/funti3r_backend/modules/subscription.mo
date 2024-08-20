
import types "../../Types/types";
import Map "mo:map/Map";
import {phash} "mo:map/Map";
import Principal "mo:base/Principal";
import UserDetails "../components/UserDetails";
import BusinessDetails "../components/BusinessDetails";
import authModule "./auth";


module {
       public type Users =  Map.Map<Principal, UserDetails.UserDetails>;
       public type Businesses = Map.Map<Principal, BusinessDetails.BusinessDetails>;

    private let subscriptionsPrices : types.SubscriptionsPrices = {
        none : Nat = 0;
        premium : Nat =  500_000_000;
        enterprise : Nat = 1000_000_000;
    };
      //used when a principal wants a subType subscription type
  public func subscribe( p : Principal, canisterId : Principal, 
  subType : types.SubscriptionModel, 
  users : Users, 
  businesses : Businesses,
  transferFrom:  (Principal, Principal, Nat) -> async Bool ) : async  types.Result<Text, Text> {
   
     let price = getSubscriptionPrice(subType);
  
     let result = await transferFrom(p, canisterId, price);
     if(result) {
        let _ = updateProfileSubscription(p, subType, users, businesses); // update their profile after a successful transfer of subscription fees

        return #ok("success");
     } else {
       return #err("could not subscribe, try again latter");
     }
  };


 // after a client has paid for the subscription we next update their profile to reflect this
 public func updateProfileSubscription( p : Principal, subtype  : types.SubscriptionModel , users : Users, businesses : Businesses) :  types.Result<Text, Text> {
        if(authModule.userExists(p, users)) {
         let user  = Map.get(users, phash, p);
          switch(user) {
            case null return #err("oops, could not update subscription, contact support");
            case (?_user) {
               _user.setSubscription(subtype);
               return #ok("success");
            };
          };
      } else {
           let business  = Map.get(businesses, phash, p);
           switch(business) {
            case null return #err("oops, could not update subscription, contact support");
            case (?_business) {
               _business.setSubscription(subtype);
               return #ok("success");
            };
          };
      };
 };
   private func getSubscriptionPrice(subType : types.SubscriptionModel) : Nat {
           switch(subType) {
            case (#none) return subscriptionsPrices.none;
            case (#premium) return subscriptionsPrices.premium;
            case (#enterprise) return subscriptionsPrices.enterprise;
           };
   };
  
  public func getSubscriptionPrices() : types.SubscriptionsPrices {
    return subscriptionsPrices;
  };


}