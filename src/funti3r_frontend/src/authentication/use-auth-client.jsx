import React, { createContext, useContext, useEffect, useState } from "react";
import { canisterId, idlFactory } from "../../../declarations/funti3r_backend/";
import { AuthClient } from "@dfinity/auth-client";  
import { Principal } from '@dfinity/principal';    

// Custom hook to handle authentication and manage user state
export const useAuthClient = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);
  const [profileType, setProfileType] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const [tasks, setTasks] = useState([]);

  const nnsCanisterId = 'ryjl3-tyaaa-aaaaa-aaaba-cai';


  useEffect(() => {
    const initializeAuthClient = async () => {
      try {
        const client = await AuthClient.create(); // Initialize AuthClient
        setAuthClient(client);

        const authenticated = await client.isAuthenticated();
        setIsAuthenticated(authenticated);
        await fetchProfileType()

      } catch (error) {
        console.error("Error initializing AuthClient:", error);
      }
    };

    initializeAuthClient();
  }, []);

  const fetchProfileType = async () => {
    try {
      const result = await whoamiActor.getProfileType();
      // console.log(result)
      if ("ok" in result) {
        setProfileType(result.ok);
        return result.ok;
      } else {
        console.error('Failed to fetch profile type:', result.err);
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile type:", error);
    }
  };

  const getWalletIdentity = async () => {
    try {
      const isConnected =  await window.ic.plug.requestConnect({
        whitelist: [canisterId, nnsCanisterId],
        host: "http://127.0.0.1:4943"
      });

      if (isConnected) {

        const actor = await window.ic.plug.createActor({
          canisterId: canisterId,
          interfaceFactory: idlFactory,
          host: "http://127.0.0.1:4943", 
        });
        const principal = await window.ic.plug.agent.getPrincipal();
        setIsAuthenticated(true);
        return { actor, principal }; // Return both actor and principal
      } else {
        throw new Error("Unable to connect to Plug Wallet");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      return null;
    }
  };

  const login = async () => {
    try {
      const { actor , principal} = await getWalletIdentity()
       await fetchProfileType()
       setWhoamiActor(actor);
       setPrincipal(principal);
      console.log("Login successful, whoamiActor:", actor);
      console.log("Wallet connected, principal:", principal);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const createUserProfile = async (details, navigate) => {
    if (!whoamiActor) {
      console.error("User is not authenticated or whoamiActor is not initialized");
      return;
    }

    try {
      // console.log("Checking existing profile...");
      // console.warn(whoamiActor)
      const existingProfile = await whoamiActor.getUserProfile();
      // const result2 = await whoamiActor.getProfileType();

      console.log("existingProfile:", existingProfile);
   
      
      console.log("existingProfile:", JSON.stringify(existingProfile, null, 2));
     



      if ("ok" in existingProfile) {
        console.warn("User profile already exists. Redirecting to user dashboard...");
        await fetchProfileType()
        navigate("/user/dashboard");
        return;
      }

      console.log("Creating new profile...");
      const subscriptionVariant = formatSubscription(details.subscription);

      const result = await whoamiActor.createUserProfile({
        ...details,
        subscription: subscriptionVariant,
      });

      console.log("Creating results...");
      if ("ok" in result) {
        console.log(result.ok)
        setProfileType('user')
        navigate("/user/dashboard"); // Redirect after successful profile creation
      } else {
        console.error("Failed to create user profile:", result.err);
      }
    } catch (error) {
      if (error.message.includes("profile already exists for this wallet")) {
        console.warn("Profile already exists. Redirecting to user dashboard...");
        navigate("user/dashboard");
      } else {
        console.error("Failed to create user profile:", error);
      }}
  };

  const formatSubscription = (subscription) => {
    switch (subscription) {
      case "none":
        return { none: null };
      case "premium":
        return { premium: null };
      case "enterprise":
        return { enterprise: null };
      default:
        throw new Error(`Unknown subscription type: ${subscription}`);
    }
  };

  const createBusinessProfile = async (details, navigate) => {
    if (!whoamiActor) {
      console.error("User is not authenticated or whoamiActor is not initialized");
      return;
    }

    try {
      const existingProfile = await whoamiActor.getBusinessProfile();
      if ("ok" in existingProfile) {
        await fetchProfileType()
        navigate("business/dashboard");
        return;
      }

      const subscriptionVariant = formatSubscription(details.subscription);
      const result = await whoamiActor.createBusinessProfile({
        ...details,
        subscription: subscriptionVariant,
      });

      if ("ok" in result) {
        setProfileType("business");
        navigate("business/dashboard");
      } else {
        console.error("Failed to create business profile:", result.err);
      }
    } catch (error) {
      if (error.message.includes("profile already exists for this wallet")) {
        navigate("business/dashboard");
      } else {
        console.error("Failed to create business profile:", error);
      }
    }
  };

  const fetchUserProfile = async () => {
    if (!whoamiActor) {
      console.error("whoamiActor is not initialized");
      return null;
    }

    try {
      const result = await whoamiActor.getUserProfile();
      if ("ok" in result) {
        setUserProfile(result.ok);
        return result.ok;
      } else {
        console.error("Failed to fetch user profile:", result.err);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const fetchBusinessProfile = async () => {
    if (!whoamiActor) {
      console.error("whoamiActor is not initialized");
      return null;
    }

    try {
      const result = await whoamiActor.getBusinessProfile();
      if ("ok" in result) {
        setBusinessProfile(result.ok);
        return result.ok;
      } else {
        console.error("Failed to fetch business profile:", result.err);
        return null;
      }
    } catch (error) {
      console.error("Error fetching business profile:", error);
      return null;
    }
  };

  const fetchTasks = async () => {
    if (!whoamiActor) {
      console.error("whoamiActor is not initialized");
      return;
    }

    try {
      const result = await whoamiActor.getTasks();
      if ("ok" in result) {
        setTasks(result.ok);
      } else {
        console.error("Failed to fetch tasks:", result.err);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const numericPrice = BigInt(taskData.price);
      const taskIdBigInt = BigInt(taskData.taskId);

      const taskRecordToSend = {
        ...taskData,
        price: numericPrice,
        taskId: taskIdBigInt,
        promisor: [],
      };

      // const isWalletConnected = () => {
      //   return window.ic && window.ic.plug && window.ic.plug.isConnected();
      // };
      
      // In createTask function
      const approval =  await requestPlugWalletApproval(numericPrice);
      if (!approval) throw new Error("Transaction not approved by Plug Wallet");

      const result = await whoamiActor.listTask(taskRecordToSend,
       );
      console.log(result)
      return result;
    } catch (err) {
      console.error("Error creating task:", err);
      throw new Error("Failed to create task on backend.");
    }
  };

  const requestPlugWalletApproval = async (amount) => {
    try {
      if (!window.ic?.plug) {
        throw new Error("Plug Wallet is not installed.");
      }
  
      const connected = await window.ic.plug.isConnected();
      console.log("Is Plug Wallet connected?", connected);
      
      if (!connected) {
        const request_connect = await window.ic.plug.requestConnect();
        if (!request_connect) {
          throw new Error("User refused Plug Wallet connection.");
        }
      }
  
      const canister_principal = await whoamiActor.whoami();
      console.log("Canister principal:", canister_principal.toText());
  
      // const formattedAmount = (Number(amount) / 1e8).toFixed(8).toString();
      // console.log("Amount to transfer:", formattedAmount);

      const hardcodedAmount =15_00_00_00_00; //testing purposes
  
  
      console.log("Requesting Plug Wallet approval for task amount...");
      const transfer_result = await window.ic.plug.requestTransfer({
        // // to: canister_principal.toText(),
        // to: nnsCanisterId,
        // amount: hardcodedAmount,
        // opts: {
        //   fee: 0
        // },
        
          to: canister_principal.toText(),
          amount: hardcodedAmount,
          opts: {
            fee: 1000,
            memo: "Task approved",
            // from_subaccount: Number,
            created_at_time: {
              timestamp_nanos: 0
            },
          },
        
      });
  
      // transferFromArgs: {
      //   spender_subaccount: null,
      //   from: { owner: window.ic.plug.principalId, subaccount: null },
      //   to: { owner: nnsCanisterId , subaccount: null },
      //   amount: numericPrice,
      //   fee: 0,
      //   memo: null,
      //   created_at_time: null,
      
  
      console.log("Transfer result:", transfer_result);
  
      if (!transfer_result || !transfer_result.height) {
        throw new Error("User did not approve the transaction.");
      }
  
      return transfer_result;
    } catch (error) {
      console.error("Error during transaction approval:", error);
      throw new Error("Failed to request approval from Plug Wallet.");
    }
  };
  
  
    // // Helper function to request approval using Plug Wallet
    // const requestPlugWalletApproval = async (amount) => {
    //   try {
    //     if (!window.ic?.plug) {
    //       throw new Error("Plug Wallet is not installed.");
    //     }
  
    //     const transferResult = await window.ic.plug.requestTransfer({
    //       to: principal, // Replace with the receiver's Principal or Account ID
    //       amount: amount.toString(),
    //       opts: {},
    //     });
  
    //     console.log(`Approval result:`, transferResult);
    //     return transferResult.success;
    //   } catch (error) {
    //     console.error("User denied transaction in Plug Wallet:", error);
    //     return false;
    //   }
    // };
  
    // Fetch all listed tasks
    const fetchAllListedTasks = async () => {
      try {
        const result = await whoamiActor.getAllListedTasks();
        if ("Ok" in result) {
          setTasks(result.Ok);
        } else {
          console.error(result.Err);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
  
    // Fetch tasks by owner
    const fetchTaskByOwner = async () => {
      try {
        const result = await whoamiActor.getTasksByOwner();
        if ("Ok" in result) {
          return result;
        } else {
          console.error(result.Err);
        }
      } catch (err) {
        console.error("Error fetching tasks by owner:", err);
      }
    };
  

  return {
    isAuthenticated,
    identity: principal,
    whoamiActor,
    profileType,
    userProfile,
    businessProfile,
    tasks,
    login,
    createUserProfile,
    createBusinessProfile,
    fetchUserProfile,
    fetchBusinessProfile,
    fetchTasks,
    principal,
    userProfile,
    businessProfile,
    createTask,
    fetchAllListedTasks,
    fetchTaskByOwner,
    fetchProfileType
  };
};

// Create a context to provide authentication state and methods
const AuthContext = createContext();

// Provide authentication context to components
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
