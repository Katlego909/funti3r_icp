
import types "../../Types/types";
import Map "mo:map/Map";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import UserDetails "../components/UserDetails";
import BusinessDetails "../components/BusinessDetails";
import  ledger "canister:icp_ledger_canister"; 

module {
       public type Users =  Map.Map<Principal, UserDetails.UserDetails>;
       public type Businesses = Map.Map<Principal, BusinessDetails.BusinessDetails>;

    private let subscriptionsPrices : types.SubscriptionsPrices = {
        none : Nat = 0;
        premium : Nat =  500_000_000;
        enterprise : Nat = 1000_000_000;
    };
      //used when a principal wants a subType subscription type
  public func subscribe( p : Principal, canisterId : Principal, subType : types.SubscriptionModel, users : Users, businesses : Businesses) : async  types.ICRC_Result<Nat, ledger.TransferFromError> {
     let price = getSubscriptionPrice(subType);

     let transferFromArgs : ledger.TransferFromArgs = {
        spender_subaccount =  null;
        from = {owner = p; subaccount = null };
        to   = {owner = canisterId; subaccount = null};
        amount = price;
        fee = null;
        memo  = null;
        created_at_time = null; // null for now
     };
     let result = await ledger.icrc2_transfer_from(transferFromArgs);
    
     return result;
  };
   

   private func getSubscriptionPrice(subType : types.SubscriptionModel) : Nat {
           switch(subType) {
            case (#none) return subscriptionsPrices.none;
            case (#premium) return subscriptionsPrices.premium;
            case (enterprise) return subscriptionsPrices.enterprise;
           };
   };


  public func getSubscriptionPrices() : types.SubscriptionsPrices {
    return subscriptionsPrices;
  };


}