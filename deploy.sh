#!/bin/bash

dfx identity use anonymous
export MINTING_ACCOUNT=$(dfx ledger account-id )

#change user  (this identity must be created)
dfx identity use user1
export USER1_ACCOUNT=$(dfx ledger account-id)


dfx identity use anonymous

#=======================================================================================
#THIS ARE REMOTE CANISTER TESTED ON LOCAL NET
# we need to start deploying
dfx deploy internet_identity


# we are deploying a local ledger canister to interact with. We want the id of this canister to match the id of the icp ledger running
# on mainnet
dfx deploy --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai icp_ledger_canister   --argument "
  (variant {
    Init = record {
      minting_account = \"$MINTING_ACCOUNT\";
      initial_values = vec {
        record {
          \"$USER1_ACCOUNT\";
          record {
            e8s = 1_000_000_000_000 : nat64; 
          };
        };
      };
      send_whitelist = vec {};
      transfer_fee = opt record {
        e8s = 10_000 : nat64;
      };
      token_symbol = opt \"LICP\";
      token_name = opt \"Local ICP\";
    }
  })
"


#==================================================================================
#FUNTI3R CANISTERS STARTS HERE
dfx deploy funti3r_frontend
dfx deploy funti3r_backend


dfx identity use user1
echo Getting icp balance for user1
dfx ledger balance