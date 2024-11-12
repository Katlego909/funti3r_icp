
import React, { createContext, useContext, useEffect, useState } from "react";
import { canisterId, idlFactory } from "../../../declarations/funti3r_backend/";

//=====================
import { canisterId as canisterId2, idlFactory as idlFactory2 } from "../../../declarations/icp_ledger_canister/";
//=====================
import { AuthClient } from "@dfinity/auth-client";  
import { Principal } from '@dfinity/principal';    
//import { set } from "react-datepicker/dist/date_utils";

// Custom hook to handle authentication and manage user state
export const useAuthClient = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);


  //===========================================
  const[icpLedger, seticpLedger] = useState(null);
  //===========================================


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
      const isConnected = await window.ic.plug.requestConnect({
        whitelist: [canisterId2, canisterId],
        host: "http://127.0.0.1:4943"
      });

      if (isConnected) {

         const actor = await window.ic.plug.createActor({
          canisterId: canisterId,
           interfaceFactory: idlFactory,
           host: "http://127.0.0.1:4943", 
         });

        //============================
        const actor2 = await window.ic.plug.createActor({
          canisterId: canisterId2,
          interfaceFactory: idlFactory2,
          host: "http://127.0.0.1:4943", 
        })

//============

        const principal = await window.ic.plug.agent.getPrincipal();
       // const principald = await window.ic.plug.disconnect(); Logout
        setIsAuthenticated(true);
        return { actor, actor2, principal }; // Return actor and principal (added actor2)

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
      const { actor ,actor2, principal} = await getWalletIdentity() //==added actor2
       await fetchProfileType()
       setWhoamiActor(actor);
       //=================================================
       seticpLedger(actor2);
       //=================================================
       setPrincipal(principal);
      console.log("Login successful, whoamiActor:", actor);
      console.log("ICP Ledger Created, icpLedger:", actor2);
      console.log("Wallet connected, principal:", principal);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    setWhoamiActor(null);
    //=================================================
    seticpLedger(null);
    //=================================================
    setPrincipal(null);
    isAuthenticated(false)
  }

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
      // Log the task data inputs before processing
      console.log("Inserted Task Inputs:", taskData);
  
      const feeBigInt = BigInt(10000);
      const allowance = BigInt(taskData.price + feeBigInt); // The lister should also pay for the transfer fee
      const taskIdBigInt = BigInt(taskData.taskId);
  
      // Format the expectedCompletionDate to 'YYYY-MM-DD'
      const formattedCompletionDate = new Date(taskData.expectedCompletionDate).toISOString().split("T")[0];
      
      // Format the postedDate to 'YYYY-MM-DD'
      const formattedPostedDate = new Date().toISOString().split("T")[0]; 
  
      const taskRecordToSend = {
        ...taskData,
        taskId: taskIdBigInt,
        price: BigInt(taskData.price),
        expectedCompletionDate: formattedCompletionDate, // Updated this field with the formatted date
        postedDate: formattedPostedDate, // Updated this field with the formatted date
        promisor: [], 
      };
  
      const approvalRecord = {
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount: allowance,
        expected_allowance: [],
        expires_at: [],
        spender: {
          owner: Principal.fromText(canisterId),
          subaccount: [],
        },
      };
  
      // Approve the transaction in the ICP ledger
      const approval = await icpLedger.icrc2_approve(approvalRecord);
      if (!approval.Ok) throw new Error("Transaction not approved by Plug Wallet");
  
      // List the task on the backend
      const result = await whoamiActor.listTask(taskRecordToSend);
      if (!result.ok) throw new Error(result.err);
      
      // Print success message in the console
      console.log("Task successfully created:", result);
      
      return result;
    } catch (err) {
      console.error("Error creating task:", err);
      throw new Error("Failed to create task on backend.");
    }
  };
  
  
7
// Fetch all listed tasks
//============================================================
const fetchAllListedTasks = async () => {
  try {
    const result = await whoamiActor.getAllListedTasks();
    if ("ok" in result) {
      return result.ok;
    } else {
      console.error(result.Err);
    }
  } catch (err) {
    console.error("Error fetching tasks by owner:", err);
  }
};

//============================================================


//Propose to complete task
//============================================================
const proposeTask = async (taskId) => {
  if (!isAuthenticated || !whoamiActor) {
    console.error("User is not authenticated or whoamiActor is not initialized");
    return { error: "Authentication required" };
  }

  try {
    // Pass BigInt taskId to the propose function
    const result = await whoamiActor.propose(taskId); 

    if ("ok" in result) {
      console.log("Task proposal successful:", result.ok);
      return { success: result.ok };
    } else {
      console.error("Failed to propose task:", result.err);
      return { error: result.err };
    }
  } catch (error) {
    console.error("Error proposing task:", error);
    return { error: "Failed to propose task" };
  }
};

//============================================================

//getTaskById
//============================================================
const fetchTaskById = async (id) => {
  if (!isAuthenticated || !whoamiActor) {
    console.error("User is not authenticated or whoamiActor is not initialized");
    return { error: "Authentication required" };
  }

  try {
    // Pass BigInt taskId to the getTaskById function
    const result = await whoamiActor.getTaskById(id); 

    if ("ok" in result) {
      console.log("Task retrieval successful:", result.ok);
      return { success: result.ok };
    } else {
      console.error("Failed to retrieve task:", result.err);
      return { error: result.err };
    }
  } catch (error) {
    console.error("Error retrieving task:", error);
    return { error: "Failed to retrieve task" };
  }
};
//========================================================

const fetchMicroTaskerApplications = async () => {
  try {
      // Call the actor's method to get microtasker applications
      const result = await whoamiActor.getMicroTaskerApplications();
      // console.log("Output" + JSON.stringify(result));
      const serializedResult = JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
        2
      );
      
      console.log("Output:", serializedResult);
      // Check if the result is successful
      if ("ok" in result) {
          return result.ok; // Return the successful result
      } else {
          console.error(result.err); // Log the error if unsuccessful
      }
  } catch (err) {
      console.error("Error fetching microtasker applications:", err); // Log any caught errors
  }
};

  
    // Fetch tasks by owner
    const fetchTaskByOwner = async () => {
      try {
        const result = await whoamiActor.getTasksByOwner();
        if ("ok" in result) {
          return result.ok;
        } else {
          console.error(result.Err);
        }
      } catch (err) {
        console.error("Error fetching tasks by owner:", err);
      }
    };
  
    
     const accProposal = async (taskId, microTasker) => {
      try {
        const result = await whoamiActor.acceptProposal(taskId, microTasker);
        console.log("womp womp" + result.ok);
        if ("ok" in result) {
          return result.ok;
        } else {
          console.error(result.Err);
        }
      } catch (err) {
        console.error("Error accepting proposal:", err);
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
    createTask,
    fetchAllListedTasks,
    proposeTask, 
    fetchTaskByOwner,
    fetchProfileType,
    fetchTaskById,
    fetchMicroTaskerApplications,
    accProposal,
    logout
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