import Principal "mo:base/Principal";
import Map "mo:map/Map";
import {phash; ihash} "mo:map/Map";
import types "../../Types/types";
import UserDetails "../components/UserDetails";
import BusinessDetails "../components/BusinessDetails";

//should contain routins for working with authentication
module auth {

    public type Users =  Map.Map<Principal, UserDetails.UserDetails>;
    public type Businesses = Map.Map<Principal, BusinessDetails.BusinessDetails>;

    // a utility function to check if a user is authorized to access a specific resource
 public func isAuthorized(p : Principal, users: Users, businesses : Businesses) : async (Bool) {
     if ((not (userExists(p, users)) or (not (businessExists(p, businesses))))) {
        return  false;
     } else {
      return true;
     }
 };
 

 //checks if a user profile associated witth the given profile exists
 public func userExists(p: Principal, users : Users) :  (Bool) {
     let hasUser = Map.has(users, phash, p); 
      if(not hasUser) {
         return false;
      };
      return true;
 };


 public func businessExists(p: Principal, businesses : Businesses) :  (Bool) {
     let hasProfile = Map.has(businesses, phash, p); 
      if(not hasProfile) {
        return false;
      };
      return true;
 };
 
 // determines the profile type of the principal
 public func getProfileType(p: Principal , users : Users, businesses: Businesses) : types.Result<Text, Text> {
   if(userExists(p, users)) {
    return #ok("user");
   } else if (businessExists(p, businesses)) {
    return #ok("business")
   } else {
     #err("does not exist");
   };
 };

  public  func creatUserProfile(p : Principal , details: types.UserDetailsRecord, users : Users):  types.Result<Text, Text> {    
      if(not (auth.userExists(p, users))) {
        let user = UserDetails.UserDetails(details.name, 
          details.email,
          details.phone,
          details.location,
          details.qualifications,
          details.socials,
          details.description
         );
        Map.set(users, phash, p, user);
        return #ok("success");
      };
      return #err("profile already exists for this wallet");
  };

 public  func createBusiness(p: Principal, details: types.BusinessDetailsRecord, businesses : Businesses):  types.Result<Text, Text> {    
      if(not (auth.businessExists(p, businesses))) {
        let info = BusinessDetails.BusinessDetails(
          details.name,
          details.email,
          details.phone,
          details.location,
          details.socials,
          details.description
        );
        Map.set(businesses, phash, p , info);
        return #ok("success");
      };
      return #err("profile already exists for this wallet");
  };
   
  // returns the user's profile if they have a profile otherwise returns null
  public func loginUser(p : Principal, users : Users) :  types.Result<types.UserDetailsRecord, Text> {
        let result =  Map.get(users, phash, p);
        switch(result) {
          case null #err("User does not have an account"); 
          case (?user) {
            // create the record to return to the client
            return #ok(user.getUserRecord()); 
          }
        }
  };
  
  // returns the user's profile if they have a profile otherwise returns null
  public func loginB(p: Principal, businesses : Businesses) :  types.Result<types.BusinessDetailsRecord, Text> {
        let result =  Map.get(businesses, phash, p);
        switch(result) {
          case null #err("User does not have an account");
          case (?business) {
            return #ok(business.getBusinessRecord());
          }
        }
  };


}