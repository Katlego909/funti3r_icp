import {test; suite; expect; } "mo:test/async";
import Map "mo:map/Map";
import types "../../Types/types";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import List "mo:base/List";
import  businesInfo "../../funti3r_backend/components/BusinessDetails";
import auth "../../funti3r_backend/modules/auth";
import  userInfo "../../funti3r_backend/components/UserDetails";

// Test Data
 type TaskId  = Nat;

 // all these data should be made stable before production
 //profile data storages
 let users = Map.new<Principal, userInfo.UserDetails>();
 let businesses = Map.new<Principal,businesInfo.BusinessDetails>();
 let principal = Principal.fromText("un4fu-tqaaa-aaaab-qadjq-cai"); // testing purposes only
 
let businessdetails : types.BusinessDetailsRecord = {
                name  = "voldi";
                email = "voldi@gmail.com";
                phone  = "0732323242";
                location = "some place in SA";
                socials = List.nil<Text>(); // contains links to the users socials
                description = "Hey I am voldi";
                applications = List.nil<TaskId>();
                subscription = #none;
             };


//tests begin here 
suite("test user profile creation and authentication", func() : async () {
      await test("test login without a profile", func() : async () {
        let result  =  auth.loginB(principal, businesses);
      assert result == #err("Business does not have an account");
     });
      await test("create user profile", func() : async () {
        let result = auth.createBusiness(principal,businessdetails, businesses);
        assert result == #ok("success");
     });
     await test("test if profile was created ", func () : async () {
           let result = auth.businessExists(principal, businesses);
           assert result == true;
     });
     await test("test if user is authorized", func () : async () {
         let result =  auth.isAuthorized(principal, users, businesses);
         assert result == true;
     });

     await test("login user after profile creation", func() : async() {
       let result  =  auth.loginB(principal, businesses);
        assert  result != #err("Business does not have an account");
     });

     await test("Get the profile type", func() : async() {
         let result = auth.getProfileType(principal, users, businesses);
         assert result == #ok("business");
     });
});
