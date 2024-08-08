import {test; suite } "mo:test/async";
import Map "mo:map/Map";
import types "../../Types/types";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import List "mo:base/List";
import  userInfo "../../funti3r_backend/components/UserDetails";
import  businesInfo "../../funti3r_backend/components/BusinessDetails";
import auth "../../funti3r_backend/modules/auth";

type TaskId   = Nat;

// test data
 //profile data storages
 let users = Map.new<Principal, userInfo.UserDetails>();
 let businesses = Map.new<Principal,businesInfo.BusinessDetails>();

let principal = Principal.fromText("un4fu-tqaaa-aaaab-qadjq-cai"); // testing purposes only
 


let userdetails : types.UserDetailsRecord = {
                name  = "voldi";
                email = "voldi@gmail.com";
                phone  = "0732323242";
                location = "some place in SA";
                qualifications  = List.nil<Text>(); // list of qualifications
                socials = List.nil<Text>(); // contains links to the users socials
                description = "Hey I am voldi";
               applications = List.nil<TaskId>();
                subscription = #none;
             };


//tests begin here 
suite("test user profile creation and authentication", func() : async () {
      await test("test login without a profile", func() : async () {
        let result  =  auth.loginUser(principal, users);
      assert result == #err("User does not have an account");
     });
      await test("create user profile", func() : async () {
        let result = auth.createUserProfile(principal,userdetails, users);
        assert result == #ok("success");
     });
     await test("test if profile was created ", func () : async () {
           let result = auth.userExists(principal, users);
           assert result == true;
     });
     await test("test if user is authorized", func () : async () {
         let result =  auth.isAuthorized(principal, users, businesses);
         assert result == true;
     });

     await test("login user after profile creation", func() : async() {
       let result  =  auth.loginUser(principal, users);
        assert  result != #err("User does not have an account");
     });

     await test("Get the profile type", func() : async() {
         let result = auth.getProfileType(principal, users, businesses);
         assert result == #ok("user");
     });


});
