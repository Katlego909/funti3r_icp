import React, { createContext, useContext, useEffect, useState } from "react";
import { createActor, canisterId } from "../../declarations/funti3r_backend/";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from '@dfinity/principal'; // Ensure you import Principal

const AuthContext = createContext();

const getIdentityProvider = () => {
  let idpProvider;
  if (typeof window !== "undefined") {
    const isLocal = process.env.DFX_NETWORK !== "ic";
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isLocal) {
      if (isSafari) {
        idpProvider = `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;
      } else {
        idpProvider = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;
      }
    }
  }
  return idpProvider;
};

const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider: getIdentityProvider(),
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [agent, setAgent] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);
  const [profileType, setProfileType] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const initializeAuthClient = async () => {
      const client = await AuthClient.create(options.createOptions); // Initialize with idle management
      setAuthClient(client);

      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const iden = client.getIdentity();
        setIdentity(iden);
        initializeActor(identity);
        // fetchProfileType()
      }
    };
    initializeAuthClient();
  }, []);

  const initializeActor = (identity) => {
    const actor = createActor(canisterId, {
      agentOptions: { identity },
    });

    setWhoamiActor(actor)
  };

  // Connects to Plug Wallet and retrieves its identity
  const getWalletIdentity = async () => {
    const whitelist = [canisterId];

    try {
      const isConnected = await window.ic.plug.requestConnect({ whitelist });

      if (isConnected) {
        const principalID = await window.ic.plug.agent.options.principal;
        const agent = window.ic.plug.agent;
        console.log("wallet is connected")
        setPrincipal(principalID);
        setAgent(agent);
        return { agent, principal: principalID };
      } else {
        throw new Error("Unable to connect to Plug Wallet");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      return null;
    }
  };

  // Handles login with Plug Wallet and updates AuthClient state
  const login = async () => {
    try {

      // const wallet = await getWalletIdentity()

      await authClient.login({
        ...options.loginOptions,
        onSuccess: async () => {

          const wallet = await getWalletIdentity()
          if (wallet) {
            const identity = authClient.getIdentity()
          }
          // const identity = wallet.identity;
          const principalID = wallet.principal

          const identity = authClient.getIdentity()

          // console.log("auth principal"+ principalID)
          console.log("Prosper " + identity)
          if (identity) {
            setIdentity(identity);
            setPrincipal(principalID)
            // getWalletIdentity()
            setIsAuthenticated(true)
            initializeActor(identity);
            setWhoamiActor(identity)
            await fetchProfileType(); // Fetch the profile type
            // console.log("Profile Type: ", profileType);
          } else {
            console.error("Login failed: Identity is not authenticated");
          }
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const fetchProfileType = async () => {
    if (!whoamiActor) {
      console.error("whoamiActor is not initialized");
      return null;
    }

    console.log(whoamiActor)

    try {
      const result = await whoamiActor.getProfileType();

      console.log("User profile result:", result);
      console.log(`Profile type: ${result.ok}`);

      if ("ok" in result) {
        // console.log(Profile type: ${result.ok}); // Should log "user" or "business"
        setProfileType(result.ok); // Optionally update state
        return result.ok; // Return the profile type
      } else {
        console.error('Failed to fetch profile type:', result.err);
        return null; // Return null if there's an error
      }
    } catch (error) {
      console.error("Failed to fetch profile type:", error);
      return null; // Return null if there's an exception
    }
  };

  const createUserProfile = async (details, navigate) => {
    if (!whoamiActor) {
      console.error("User is not authenticated or whoamiActor is not initialized");
      // navigate("/login");
      return;
    }

    try {
      // Ensure the identity is authenticated and not anonymous
      // if (!identity || identity.getPrincipal().isAnonymous()) {
      //   console.error("User is not authenticated");
      //   navigate("/login");
      //   return;
      // }

      const existingProfile = await whoamiActor.getUserProfile();
      if ("ok" in existingProfile) {

        console.warn("User profile already exists. Redirecting to user dashboard...");
        //  setProfileType("user");
        // await fetchProfileType();
        navigate("/dashboard/user");
        return;
      }

      const subscriptionVariant = formatSubscription(details.subscription);
      const result = await whoamiActor.createUserProfile({
        ...details,
        subscription: subscriptionVariant,
      });

      if ("ok" in result) {
        setProfileType("user");
        // await fetchProfileType();
        navigate("/dashboard/user");
      } else {
        console.error("Failed to create user profile:", result.err);
      }
    } catch (error) {
      if (error.message.includes("profile already exists for this wallet")) {
        console.warn("Profile already exists. Redirecting to user dashboard...");
        navigate("/dashboard/user");
      } else {
        console.error("Failed to create user profile:", error);
      }
    }
  };

  async function createBusinessProfile(details, navigate) {

    if (!whoamiActor) {
      console.error("Business is not authenticated or whoamiActor is not initialized");
      navigate("/login");
      return;
    }

    try {
      // Ensure the identity is authenticated and not anonymous
      if (!identity || identity.getPrincipal().isAnonymous()) {
        console.error("Business is not authenticated");
        navigate("/login");
        return;
      }


      const existingProfile = await whoamiActor.getBusinessProfile();
      if ("ok" in existingProfile) {

        console.warn("Business profile already exists. Redirecting to user dashboard...");
        //  setProfileType("user");
        // await fetchProfileType();
        navigate("/dashboard/business");
        return;
      }

      const subscriptionVariant = formatSubscription(details.subscription);
      const result = await whoamiActor.createBusinessProfile({
        ...details,
        subscription: subscriptionVariant,
      });

      if ("ok" in result) {
        // setProfileType("business");
        // await fetchBusinessProfile();
        navigate('/dashboard/business');
      } else {
        console.error("Failed to create business profile:", result.err);
      }
    } catch (error) {
      if (error.message.includes("profile already exists for this wallet")) {
        console.warn("Profile already exists. Redirecting to business dashboard...");
        navigate('/dashboard/business');
      } else {
        console.error("Failed to create business profile:", error);
      }
    }
  }

  const formatSubscription = (subscription) => {
    switch (subscription) {
      case "none":
        return { none: null };
      case "premium":
        return { premium: null };
      case "enterprise":
        return { enterprise: null };
      default:
        throw new Error("Unknown subscription type: ${subscription}");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const result = await whoamiActor.getUserProfile();
      if ("ok" in result) {
        setUserProfile(result.ok);

      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUserProfile(null);
    }
  };

  const fetchBusinessProfile = async () => {
    try {
      const result = await whoamiActor.getBusinessProfile();
      if ("ok" in result) {
        setBusinessProfile(result.ok);
      } else {
        setBusinessProfile(null);
      }
    } catch (error) {
      console.error("Failed to fetch business profile:", error);
      setBusinessProfile(null);
    }
  };

  //Creating a task. This is giving a promisor error
  const createTask = async (taskRecord) => {
    try {
      // Convert price to BigInt for Nat
      const { price, promisor, ...rest } = taskRecord;
      const numericPrice = BigInt(price); // Use BigInt for `Nat`

      // Convert promisor to Principal if it's a valid string; otherwise, set to null
      let promisorPrincipal = null;
      if (typeof promisor === 'string' && promisor.trim().length > 0) {
        try {
          promisorPrincipal = Principal.fromText(promisor);
        } catch (error) {
          console.warn("Invalid promisor value, setting to null:", promisor);
        }
      }

      // Create task record, always including promisor
      const taskRecordToSend = {
        ...rest,
        price: numericPrice,
        promisor: promisorPrincipal
      };

      console.log("Sending task record:", taskRecordToSend);

      const result = await whoamiActor.listTask(taskRecordToSend);

      return result; // Return result to handle in the calling component
    } catch (err) {
      console.error("Error creating task:", err);
      throw new Error("Failed to create task."); // Propagate error
    }
  };

  // Fetch all listed tasks for user
  const fetchAllListedTasks = async () => {
    try {
      const result = await whoamiActor.getAllListedTasks();
      if (result.Ok) {
        setTasks(result.Ok);
      } else {
        setError(result.Err);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks.");
    }
  };

  // Fetch all listed tasks by owner
  const fetchTaskByOwner = async () => {
    try {
      const result = await whoamiActor.getTasksByOwner();
      if (result.Ok) {
        // setTasks(result.Ok);
        return result;
      } else {
        console.error("Error task owner:", err);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      // setError("Failed to fetch tasks.");
    }
  };

  //accept proposal
  const acceptProposal = async () => {
    try {
      const result = await whoamiActor.acceptProposal();
      if (result.Ok) {
        setTasks(result.Ok);
      } else {
        setError(result.Err);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks.");
    }
  }

  //get task by owner
  const completeTask = async () => {
    try {
      const result = await whoamiActor.getAllListedTasks();
      if (result.Ok) {
        setTasks(result.Ok);
      } else {
        setError(result.Err);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks.");
    }
  }

  return {
    isAuthenticated,
    identity,
    principal,
    profileType,
    createUserProfile,
    createBusinessProfile,
    login,
    agent,
    fetchProfileType,
    fetchUserProfile,
    fetchBusinessProfile,
    userProfile,
    businessProfile,
    createTask,
    fetchTaskByOwner
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);