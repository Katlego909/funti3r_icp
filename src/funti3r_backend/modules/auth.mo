import Principal "mo:base/Principal";
import Map "mo:map/Map";
import {phash} "mo:map/Map";
import types "../../Types/types";
import UserDetails "../components/UserDetails";
import BusinessDetails "../components/BusinessDetails";

// Module for authentication and identity management
module auth {
    public type Users = Map.Map<Principal, UserDetails.UserDetails>;
    public type Businesses = Map.Map<Principal, BusinessDetails.BusinessDetails>;

    // Check if a user is authorized to access a specific resource
    public func isAuthorized(p: Principal, users: Users, businesses: Businesses): Bool {
        if (Principal.isAnonymous(p)) {
            return false;
        };
        return userExists(p, users) or businessExists(p, businesses);
    };

    // Check if a user profile exists
    public func userExists(p: Principal, users: Users): Bool {
        return Map.has(users, phash, p);
    };

    // Check if a business profile exists
    public func businessExists(p: Principal, businesses: Businesses): Bool {
        return Map.has(businesses, phash, p);
    };

    // Determine the profile type of the principal
    public func getProfileType(p: Principal, users: Users, businesses: Businesses): types.Result<Text, Text> {
        if (userExists(p, users)) {
            return #ok("user");
        } else if (businessExists(p, businesses)) {
            return #ok("business");
        } else {
            return #err("does not exist");
        };
    };

    // Create a user profile
    public func createUserProfile(p: Principal, details: types.UserDetailsRecord, users: Users): types.Result<Text, Text> {
        if (Principal.isAnonymous(p)) {
            return #err("An anonymous identity cannot create a profile");
        };
        if (not userExists(p, users)) {
            let user = UserDetails.UserDetails(
                details.name,
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
        return #err("Profile already exists for this wallet");
    };

    // Create a business profile
    public func createBusiness(p: Principal, details: types.BusinessDetailsRecord, businesses: Businesses): types.Result<Text, Text> {
        if (Principal.isAnonymous(p)) {
            return #err("An anonymous identity cannot create a profile");
        };
        if (not businessExists(p, businesses)) {
            let info = BusinessDetails.BusinessDetails(
                details.name,
                details.email,
                details.phone,
                details.location,
                details.socials,
                details.description
            );
            Map.set(businesses, phash, p, info);
            return #ok("success");
        };
        return #err("Profile already exists for this wallet");
    };

    // Login user
    public func loginUser(p: Principal, users: Users): types.Result<types.UserDetailsRecord, Text> {
        let result = Map.get(users, phash, p);
        switch (result) {
            case null #err("User does not have an account");
            case (?user) {
                return #ok(user.getUserRecord());
            };
        }
    };

    // Login business
    public func loginB(p: Principal, businesses: Businesses): types.Result<types.BusinessDetailsRecord, Text> {
        let result = Map.get(businesses, phash, p);
        switch (result) {
            case null #err("Business does not have an account");
            case (?business) {
                return #ok(business.getBusinessRecord());
            };
        }
    };
};
