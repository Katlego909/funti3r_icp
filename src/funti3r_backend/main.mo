import Map "mo:map/Map";
import types "../Types/types";
import {phash} "mo:map/Map";
import Principal "mo:base/Principal";
import  userInfo "components/UserDetails";
import  businesInfo "components/BusinessDetails";


actor class  Main () {
 let users = Map.new<Principal, userInfo.UserDetails>();
 let businesses = Map.new<Principal,businesInfo.BusinessDetails>();

 // a utility function to check if a user is authorized to access a specific resource
 private func verifyCaller(p : Principal) : async () {
     if (Principal.isAnonymous(p) or (not (await userExists(p)) or (not (await businessExists(p))))) {
       // throw an error if caller is not authorized
     }
 };

 private func userExists(p: Principal) : async (Bool) {
     let hasUser = Map.has(users, phash, p); 
      if(not hasUser) {
         return false;
      };
      return true;
 };


 private func businessExists(p: Principal) : async (Bool) {
     let hasProfile = Map.has(businesses, phash, p); 
      if(not hasProfile) {
        return false;
      };
      return true;
 };

 public shared(msg) func creatUserProfile(details: types.UserDetailsRecord): async (?types.UserDetailsRecord) {    
      if(not (await userExists(msg.caller))) {
        let user = userInfo.UserDetails(details.name, 
          details.email,
          details.phone,
          details.location,
          details.qualifications,
          details.socials,
          details.description
         );
        Map.set(users, phash, msg.caller, user);
        return ?details;
      };
      return null;
  };

 public shared(msg) func creatBusiness(details: types.BusinessDetailsRecord): async (?types.BusinessDetailsRecord) {    
      if(not ( await businessExists(msg.caller))) {
        let info = businesInfo.BusinessDetails(
          details.name,
          details.email,
          details.phone,
          details.location,
          details.socials,
          details.description
        );
        Map.set(businesses, phash, msg.caller, info);
        return ?details;
      };
      return null;
  };
   
  // returns the user's profile if they have a profile otherwise returns null
  public shared(msg) func loginUser() : async ?types.UserDetailsRecord {
        let result =  Map.get(users, phash, msg.caller);
        switch(result) {
          case null null; // return null if the usr does not exists
          case (?value) {
            // create the record to return to the client
            let userDetails : types.UserDetailsRecord = {
              name =  value.getName();
              email = value.getEmail();
              phone = value.getPhone();
              location = value.getLocation();
              qualifications = value.getQualifications(); // list of qualifications
              socials = value.getSocials(); // contains links to the users socials
              description = value.getDescription();
            };
            return ?userDetails; 
          }
        }
  };
  
  // returns the user's profile if they have a profile otherwise returns null
  public shared(msg) func loginB() : async ?types.BusinessDetailsRecord {
        let result =  Map.get(businesses, phash, msg.caller);
        switch(result) {
          case null null;
          case (?info) {
            let record : types.BusinessDetailsRecord = {
                  name  = info.getName();
                  email = info.getEmail();
                  phone = info.getPhone();
                  location = info.getLocation();
                  socials = info.getSocials();
                  description = info.getDescription();
            };
            return ?record;
          }
        }
  } 
};
