import {test; suite } "mo:test/async";
import Map "mo:map/Map";
import types "../../Types/types";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Result "mo:base/Result";
import {phash} "mo:map/Map";
import  userInfo "../../funti3r_backend/components/UserDetails";
import  businesInfo "../../funti3r_backend/components/BusinessDetails";
import subModule "../../funti3r_backend/modules/subscription";


type TaskId = Nat;
// test data
let principal = Principal.fromText("un4fu-tqaaa-aaaab-qadjq-cai"); // testing purposes only
let principal2 = Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai");

 let users = Map.new<Principal, userInfo.UserDetails>();
 let businesses = Map.new<Principal,businesInfo.BusinessDetails>();



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


/// creating a temproary user profile
let user : userInfo.UserDetails =  userInfo.UserDetails(userdetails.name, 
          userdetails.email,
          userdetails.phone,
          userdetails.location,
          userdetails.qualifications,
          userdetails.socials,
          userdetails.description
         );

Map.set(users, phash, principal, user);


//creating a temporary business profile
let business = businesInfo.BusinessDetails(
        businessdetails.name,
        businessdetails.email,
        businessdetails.phone,
        businessdetails.location,
        businessdetails.socials,
        businessdetails.description
    );
Map.set(businesses, phash, principal2 , business);

suite("Testing subscription functionalities", func () : async()  {
    
    await test("Get default subscription for user profile", func() : async () {
       assert user.getSubscription() == #none;
    });
    
    await test("Get default subscription for business profile", func() : async () {
       assert business.getSubscription() == #none;
    });
    

    await test("update user subscription type ", func() : async () {
       let result = subModule.updateProfileSubscription(principal, #premium, users, businesses);
       assert result == #ok("success");
    });
    

    await test("update business profile subscription type ", func() : async () {
       let result = subModule.updateProfileSubscription(principal2, #enterprise, users, businesses);
       assert result == #ok("success");
    });
    
    await test("Get updated subscription for user profile", func() : async () {
       assert user.getSubscription() == #premium;
    });
    
    await test("Get updated subscription for business profile", func() : async () {
       assert business.getSubscription() == #enterprise;
    });
 });