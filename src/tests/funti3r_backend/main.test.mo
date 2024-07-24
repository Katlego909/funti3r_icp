import {test; suite; expect; } "mo:test/async";
import List "mo:base/List";
import backdendCanister "../../funti3r_backend/main";
import types "../../Types/types";


let canister = await backdendCanister.Main();
let userdetails : types.UserDetailsRecord = {
                name  = "voldi";
                email = "voldi@gmail.com";
                phone  = "0732323242";
                location = "some place in SA";
                qualifications  = List.nil<Text>(); // list of qualifications
                socials = List.nil<Text>(); // contains links to the users socials
                description = "Hey I am voldi";
                subscription = #none;
             };
let userdetails2 : types.UserDetailsRecord = {
                name  = "voldi";
                email = "voldi@gmail.com";
                phone  = "0732323242";
                location = "some place in SA";
                qualifications  = List.nil<Text>(); // list of qualifications
                socials = List.nil<Text>(); // contains links to the users socials
                description = "Hey I am voldi";
                subscription = #none;
             };




//tests begin here 
suite("test user profile creation and authentication", func() : async () {
      await test("test login without a profile", func() : async () {
        let result  = await canister.loginUser( );
      assert result == null;
     });
      await test("create user profile", func() : async () {

        let result = await canister.creatUserProfile(userdetails);
        assert result == ?userdetails
     });

     await test("login user after profile creation", func() : async() {
        let result = await canister.loginUser();
        assert result == ?userdetails2;
     });
});
