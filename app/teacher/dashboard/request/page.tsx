
// // 'use client'


// // import { useEffect, useState } from "react";
// // // import { toast } from "react-hot-toast";
// // import { toast, ToastContainer } from "react-toastify";

// // interface Bank {
// //   id: number;
// //   code: string;
// //   name: string;
// // }

// // interface Instructor {
// //   fullname: string;
// //   email: string;
// //   id: string;
// //   token: string;
// //   wallet: {
// //     balance: string;
// //   };
// // }

// // const RequestPayOut = () => {
// //   // const [banks, setBanks] = useState<Bank[]>([]);
// //   const [banks, setBanks] = useState<Bank[]>([]);
// //   const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
// //   const [accountNumber, setAccountNumber] = useState("");
// //   const [bankSearchQuery, setBankSearchQuery] = useState("");
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [instructor, setInstructor] = useState<Instructor>({
// //     fullname: "Loading...",
// //     email: "",
// //     id: "",
// //     token: "",
// //     wallet: {
// //       balance: "0.00" // Default value
// //     }
// //   });

// //   // Fetch instructor data from localStorage
// //   useEffect(() => {
// //     const stored = localStorage.getItem("userData");
// //     console.log("stored", stored);
// //     if (stored) {
// //       const parsed = JSON.parse(stored);
// //       console.log("parsed", parsed);
// //       setInstructor({
// //         fullname: parsed.fullname || "Student",
// //         email: parsed.email || "",
// //         id: parsed.id,
// //         token: parsed.token,
// //         wallet: parsed.wallet
// //       });
// //     }
// //   }, []);

// //   // Fetch banks from API
// //   // useEffect(() => {
// //   //   const fetchBanks = async () => {
// //   //     try {
// //   //       setIsLoading(true);
// //   //       const response = await fetch("https://api.a1schools.org/utility/get-banks");
// //   //       if (!response.ok) {
// //   //         toast.error("Failed to fetch banks");
// //   //       }
// //   //       const data = await response.json();
// //   //       setBanks(data);
// //   //       setFilteredBanks(data);
// //   //     } catch (error) {
// //   //       console.error("Error fetching banks:", error);
// //   //       toast.error("Failed to load banks. Please refresh the page.");
// //   //     } finally {
// //   //       setIsLoading(false);
// //   //     }
// //   //   };

// //   //   fetchBanks();
// //   // }, []);

// //   // Fetch banks from API
// // useEffect(() => {
// //   const fetchBanks = async () => {
// //     try {
// //       setIsLoading(true);
// //       const response = await fetch("https://api.a1schools.org/utility/get-banks");
      
// //       if (!response.ok) {
// //         toast.error("Failed to fetch banks");
// //         return;
// //       }

// //       const responseData = await response.json();
      
// //       // Check if response has data array
// //       if (Array.isArray(responseData.data)) {
// //         setBanks(responseData.data);
// //         setFilteredBanks(responseData.data);
// //       } else {
// //         toast.error("Unexpected banks format");
// //         setBanks([]);
// //       }
      
// //     } catch (error) {
// //       console.error("Error fetching banks:", error);
// //       toast.error("Failed to load banks. Please refresh the page.");
// //       setBanks([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   fetchBanks();
// // }, []);

// //   // Filter banks based on search query
// //   // useEffect(() => {
// //   //   // const filtered = banks.filter(bank => 
// //   //   //   bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase())
// //   //   // );
// //   //   const filtered = banks?.filter(bank => 
// //   //     bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase())
// //   //   ) || [];
// //   //   setFilteredBanks(filtered);
// //   // }, [bankSearchQuery, banks]);

// //   useEffect(() => {
// //     const filtered = (Array.isArray(banks) ? banks.filter(bank => 
// //       bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase())
// //     ) : [])
// //     setFilteredBanks(filtered);
// //   }, [bankSearchQuery, banks]);

// //   const handleBankSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setBankSearchQuery(e.target.value);
// //     setShowDropdown(true);
// //   };

// //   const selectBank = (bank: Bank) => {
// //     setSelectedBank(bank);
// //     setBankSearchQuery(bank.name);
// //     setShowDropdown(false);
// //   };

// //   const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setAccountNumber(e.target.value);
// //   };

// //   const handleAddBank = async () => {

// //    // Check if account number is exactly 10 digits
// //   if (accountNumber.length < 10) {
// //     toast.error("Account number must be 10 digits");
// //     return;
// //   }
  
// //   if (accountNumber.length > 10) {
// //     toast.error("Account number must be 10 digits");
// //     return;
// //   }

// //     if (!accountNumber || !selectedBank) {
// //       toast.error("Please enter your account number and select a bank");
// //       return;
// //     }
    
// //     try {
// //       setIsLoading(true);
// //       const payload = {
// //         account_bank: selectedBank.code,
// //         account_number: accountNumber,
// //         currency: "NGN"
// //       };

// //       const response = await fetch(
// //         `https://api.a1schools.org/instructors/${instructor.id}/bank-account`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             "Authorization": `Bearer ${instructor.token}`
// //           },
// //           body: JSON.stringify(payload)
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error("Failed to add bank account");
// //       }
    

// //       toast.success("Bank account added successfully");
// //       setAccountNumber("");
// //       setBankSearchQuery("");
// //       setSelectedBank(null);
// //     } catch (error) {
// //       console.error("Error adding bank account:", error);
// //       toast.error("Failed to add bank account. Please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const isFormValid = accountNumber.trim().length > 0 && selectedBank !== null;

// //   return (
// //     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
// //       <ToastContainer />
// //       <h2 className="text-xl font-semibold mb-6">Add Bank Account</h2>
      
// //       <div className="mb-4">
// //         <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
// //           Account Number
// //         </label>
// //         <input
// //           type="text"
// //           id="accountNumber"
// //           value={accountNumber}
// //           onChange={handleAccountNumberChange}
// //           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           placeholder="Enter your account number"
// //           maxLength={10}
// //         />
// //       </div>

// //       <div className="mb-6 relative">
// //         <label htmlFor="bankSearch" className="block text-sm font-medium text-gray-700 mb-1">
// //           Search Bank
// //         </label>
// //         <input
// //           type="text"
// //           id="bankSearch"
// //           value={bankSearchQuery}
// //           onChange={handleBankSearch}
// //           onFocus={() => setShowDropdown(true)}
// //           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           placeholder="Search for your bank..."
// //           disabled={isLoading || banks.length === 0}
// //         />
        
// //         {showDropdown && (
// //           <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
// //             {filteredBanks.length > 0 ? (
// //               filteredBanks.map((bank) => (
// //                 <div
// //                   key={bank.id}
// //                   className="px-4 py-2 cursor-pointer hover:bg-gray-100"
// //                   onClick={() => selectBank(bank)}
// //                 >
// //                   {bank.name}
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="px-4 py-2 text-gray-500">No banks found</div>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       <button
// //         onClick={handleAddBank}
// //         disabled={!isFormValid || isLoading}
// //         className={`w-full py-2 px-4 rounded-md font-medium text-white ${
// //           isFormValid && !isLoading
// //             ? "bg-[blue] hover:bg-blue-700"
// //             : "bg-[gray] cursor-not-allowed"
// //         }`}
// //       >
// //         {isLoading ? "Adding..." : "Add Bank"}
// //       </button>
// //     </div>
// //   );
// // };

// // export default RequestPayOut;













// 'use client'

// import { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

// interface Bank {
//   id: number;
//   code: string;
//   name: string;
// }

// interface Instructor {
//   fullname: string;
//   email: string;
//   id: string;
//   token: string;
//   wallet: {
//     balance: string;
//   };
// }

// const RequestPayOut = () => {
//   const [banks, setBanks] = useState<Bank[]>([]);
//   const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankSearchQuery, setBankSearchQuery] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
  
//   // New state for payout request
//   const [payoutAmount, setPayoutAmount] = useState("");
//   const [hasBankAccount, setHasBankAccount] = useState(false);
//   const [isCheckingBank, setIsCheckingBank] = useState(true);
//   const [isPayoutLoading, setIsPayoutLoading] = useState(false);
  
//   const [instructor, setInstructor] = useState<Instructor>({
//     fullname: "Loading...",
//     email: "",
//     id: "",
//     token: "",
//     wallet: {
//       balance: "0.00" // Default value
//     }
//   });

//   // Fetch instructor data from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("userData");
//     console.log("stored", stored);
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       console.log("parsed", parsed);
//       setInstructor({
//         fullname: parsed.fullname || "Student",
//         email: parsed.email || "",
//         id: parsed.id,
//         token: parsed.token,
//         wallet: parsed.wallet
//       });
//     }
//   }, []);

//   // Check if instructor has a bank account
//   useEffect(() => {
//     const checkBankAccount = async () => {
//       if (!instructor.id || !instructor.token) return;
      
//       try {
//         setIsCheckingBank(true);
//         const response = await fetch(
//           `https://api.a1schools.org/instructors/${instructor.id}/bank-account`,
//           {
//             method: "GET",
//             headers: {
//               "Authorization": `Bearer ${instructor.token}`
//             }
//           }
//         );
        
//         if (response.ok) {
//           setHasBankAccount(true);
//         } else {
//           setHasBankAccount(false);
//         }
//       } catch (error) {
//         console.error("Error checking bank account:", error);
//         setHasBankAccount(false);
//       } finally {
//         setIsCheckingBank(false);
//       }
//     };

//     if (instructor.id) {
//       checkBankAccount();
//     }
//   }, [instructor.id, instructor.token]);

//   // Fetch banks from API
//   useEffect(() => {
//     const fetchBanks = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch("https://api.a1schools.org/utility/get-banks");
        
//         if (!response.ok) {
//           toast.error("Failed to fetch banks");
//           return;
//         }

//         const responseData = await response.json();
        
//         // Check if response has data array
//         if (Array.isArray(responseData.data)) {
//           setBanks(responseData.data);
//           setFilteredBanks(responseData.data);
//         } else {
//           toast.error("Unexpected banks format");
//           setBanks([]);
//         }
        
//       } catch (error) {
//         console.error("Error fetching banks:", error);
//         toast.error("Failed to load banks. Please refresh the page.");
//         setBanks([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBanks();
//   }, []);

//   useEffect(() => {
//     const filtered = (Array.isArray(banks) ? banks.filter(bank => 
//       bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase())
//     ) : [])
//     setFilteredBanks(filtered);
//   }, [bankSearchQuery, banks]);

//   const handleBankSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBankSearchQuery(e.target.value);
//     setShowDropdown(true);
//   };

//   const selectBank = (bank: Bank) => {
//     setSelectedBank(bank);
//     setBankSearchQuery(bank.name);
//     setShowDropdown(false);
//   };

//   const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Only allow digits
//     const value = e.target.value.replace(/\D/g, '');
//     setAccountNumber(value);
//   };

//   const handlePayoutAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Only allow digits and decimal point
//     const value = e.target.value.replace(/[^\d]/g, '');
//     setPayoutAmount(value);
//   };

//   const handleAddBank = async () => {
//     // Check if account number is exactly 10 digits
//     if (accountNumber.length < 10) {
//       toast.error("Account number must be 10 digits");
//       return;
//     }
    
//     if (accountNumber.length > 10) {
//       toast.error("Account number must be 10 digits");
//       return;
//     }

//     if (!accountNumber || !selectedBank) {
//       toast.error("Please enter your account number and select a bank");
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       const payload = {
//         account_bank: selectedBank.code,
//         account_number: accountNumber,
//         currency: "NGN"
//       };

//       const response = await fetch(
//         `https://api.a1schools.org/instructors/${instructor.id}/bank-account`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${instructor.token}`
//           },
//           body: JSON.stringify(payload)
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to add bank account");
//       }
    
//       toast.success("Bank account added successfully");
//       setAccountNumber("");
//       setBankSearchQuery("");
//       setSelectedBank(null);
//       setHasBankAccount(true); // Update bank account status
//     } catch (error) {
//       console.error("Error adding bank account:", error);
//       toast.error("Failed to add bank account. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const handleRequestPayout = async () => {
//   //   // Check if amount is at least 100
//   //   const amountValue = parseFloat(payoutAmount);
//   //   if (isNaN(amountValue) || amountValue < 100) {
//   //     toast.error("The minimum payout amount is 100 Naira");
//   //     return;
//   //   }

//   //   try {
//   //     setIsPayoutLoading(true);
//   //     const payload = {
//   //       amount: payoutAmount
//   //     };

//   //     const response = await fetch(
//   //       `https://api.a1schools.org/instructors/${instructor.id}/request-payout`,
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           "Authorization": `Bearer ${instructor.token}`
//   //         },
//   //         body: JSON.stringify(payload)
//   //       }
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error("Failed to request payout");
//   //     }

//   //     toast.success("Payout request submitted successfully");
//   //     setPayoutAmount("");
//   //   } catch (error) {
//   //     console.error("Error requesting payout:", error);
//   //     toast.error("Failed to request payout. Please try again.");
//   //   } finally {
//   //     setIsPayoutLoading(false);
//   //   }
//   // };


//   const handleRequestPayout = async () => {
//     // Check if amount is at least 100
//     const amountValue = parseFloat(payoutAmount);
//     if (isNaN(amountValue) || amountValue < 100) {
//       toast.error("The minimum payout amount is 100 Naira");
//       return;
//     }
  
//     try {
//       setIsPayoutLoading(true);
      
//       // Make sure we're sending the actual number value, not a string
//       const payload = {
//         amount: amountValue
//       };
  
//       console.log("Sending payout request with payload:", payload);
  
//       const response = await fetch(
//         `https://api.a1schools.org/instructors/${instructor.id}/request-payout`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${instructor.token}`
//           },
//           body: JSON.stringify(payload)
//         }
//       );
  
//       // Log complete response for debugging
//       const responseData = await response.json();
//       console.log("Payout response:", responseData);
  
//       if (!response.ok) {
//         // Get more detailed error information
//         throw new Error(responseData.message || "Failed to request payout");
//       }
  
//       toast.success("Payout request submitted successfully");
//       setPayoutAmount("");
//     } catch (error) {
//       console.error("Error requesting payout:", error);
//       toast.error(error.message || "Failed to request payout. Please try again.");
//     } finally {
//       setIsPayoutLoading(false);
//     }
//   };
//   const isFormValid = accountNumber.trim().length > 0 && selectedBank !== null;
//   const isPayoutValid = payoutAmount.trim().length > 0 && parseFloat(payoutAmount) >= 100 && hasBankAccount;

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <ToastContainer />
//       <h2 className="text-xl font-semibold mb-6">Add Bank Account</h2>
      
//       <div className="mb-4">
//         <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
//           Account Number
//         </label>
//         <input
//           type="text"
//           id="accountNumber"
//           value={accountNumber}
//           onChange={handleAccountNumberChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter your account number"
//           maxLength={10}
//         />
//       </div>

//       <div className="mb-6 relative">
//         <label htmlFor="bankSearch" className="block text-sm font-medium text-gray-700 mb-1">
//           Search Bank
//         </label>
//         <input
//           type="text"
//           id="bankSearch"
//           value={bankSearchQuery}
//           onChange={handleBankSearch}
//           onFocus={() => setShowDropdown(true)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Search for your bank..."
//           disabled={isLoading || banks.length === 0}
//         />
        
//         {showDropdown && (
//           <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
//             {filteredBanks.length > 0 ? (
//               filteredBanks.map((bank) => (
//                 <div
//                   key={bank.id}
//                   className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                   onClick={() => selectBank(bank)}
//                 >
//                   {bank.name}
//                 </div>
//               ))
//             ) : (
//               <div className="px-4 py-2 text-gray-500">No banks found</div>
//             )}
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleAddBank}
//         disabled={!isFormValid || isLoading}
//         className={`w-full py-2 px-4 rounded-md font-medium text-white ${
//           isFormValid && !isLoading
//             ? "bg-[blue] hover:bg-blue-700"
//             : "bg-[gray] cursor-not-allowed"
//         }`}
//       >
//         {isLoading ? "Adding..." : "Add Bank"}
//       </button>

//       {/* Payout Request Section */}
//       <div className="mt-10 pt-6 border-t border-gray-200">
//         <h2 className="text-xl font-semibold mb-6">Request Payout</h2>
        
//         {!hasBankAccount && !isCheckingBank && (
//           <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
//             Please add a bank account before requesting a payout.
//           </div>
//         )}
        
//         <div className="mb-6">
//           <label htmlFor="payoutAmount" className="block text-sm font-medium text-gray-700 mb-1">
//             Amount (NGN)
//           </label>
//           <input
//             type="text"
//             id="payoutAmount"
//             value={payoutAmount}
//             onChange={handlePayoutAmountChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter amount (minimum 100 Naira)"
//             disabled={!hasBankAccount || isCheckingBank}
//           />
//           <p className="mt-1 text-sm text-gray-500">Minimum withdrawal: 100 Naira</p>
//         </div>

//         <button
//           onClick={handleRequestPayout}
//           disabled={!isPayoutValid || isPayoutLoading || isCheckingBank}
//           className={`w-full py-2 px-4 rounded-md font-medium text-white ${
//             isPayoutValid && !isPayoutLoading && !isCheckingBank
//               ? "bg-[green] hover:bg-green-700"
//               : "bg-[gray] cursor-not-allowed"
//           }`}
//         >
//           {isPayoutLoading ? "Processing..." : "Request Payout"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RequestPayOut;




















'use client'

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoChevronBack, IoChevronForward, IoInformationCircleOutline, IoCloseOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sider";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  DollarSign,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
  PlusCircle,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";


interface Bank {
  id: number;
  code: string;
  name: string;
}

interface Instructor {
  fullname: string;
  email: string;
  id: string;
  token: string;
  wallet: {
    balance: string;
  };
}

interface AccountDetails {
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
}

const RequestPayOut = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankSearchQuery, setBankSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [step, setStep] = useState(1); // 1: Enter details, 2: Confirm withdrawal
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  
  const [instructor, setInstructor] = useState<Instructor>({
    fullname: "Loading...",
    email: "",
    id: "",
    token: "",
    wallet: {
      balance: "0.00" // Default value
    }
  });

  // Fetch instructor data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setInstructor({
        fullname: parsed.fullname || "Student",
        email: parsed.email || "",
        id: parsed.id,
        token: parsed.token,
        wallet: parsed.wallet
      });
    }
  }, []);

  // Fetch banks from API
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://api.a1schools.org/utility/get-banks");
        
        if (!response.ok) {
          toast.error("Failed to fetch banks");
          return;
        }

        const responseData = await response.json();
        
        // Check if response has data array
        if (Array.isArray(responseData.data)) {
          setBanks(responseData.data);
          setFilteredBanks(responseData.data);
        } else {
          toast.error("Unexpected banks format");
          setBanks([]);
        }
        
      } catch (error) {
        console.error("Error fetching banks:", error);
        toast.error("Failed to load banks. Please refresh the page.");
        setBanks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const filtered = (Array.isArray(banks) ? banks.filter(bank => 
      bank.name.toLowerCase().includes(bankSearchQuery.toLowerCase())
    ) : [])
    setFilteredBanks(filtered);
  }, [bankSearchQuery, banks]);

  const handleBankSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  const selectBank = (bank: Bank) => {
    setSelectedBank(bank);
    setBankSearchQuery(bank.name);
    setShowDropdown(false);
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '');
    setAccountNumber(value);
  };

  const handlePayoutAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and decimal point
    const value = e.target.value.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      return;
    }
    setPayoutAmount(value);
  };

  const verifyAccountDetails = async () => {
    if (!selectedBank || accountNumber.length !== 10) {
      toast.error("Please select a bank and enter a valid 10-digit account number");
      return;
    }

    try {
      setVerifyingAccount(true);
      const payload = {
        account_bank: selectedBank.code,
        account_number: accountNumber,
        currency: "NGN"
      };

      const response = await fetch(
        "https://api.a1schools.org/utility/verify-account-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${instructor.token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify account details");
      }

      const data = await response.json();
      setAccountDetails({
        account_name: data.data.account_name,
        account_number: accountNumber,
        bank_name: selectedBank.name,
        bank_code: selectedBank.code
      });
      console.log("acc",data.data.account_name)
      
      // Move to confirmation step
      setStep(2);
    } catch (error) {
      console.error("Error verifying account:", error);
      toast.error("Failed to verify account details. Please check and try again.");
    } finally {
      setVerifyingAccount(false);
    }
  };

  const handleContinue = () => {
    // Validate inputs
    if (!selectedBank) {
      toast.error("Please select a bank");
      return;
    }
    
    if (accountNumber.length !== 10) {
      toast.error("Account number must be 10 digits");
      return;
    }
    
    const amountValue = parseFloat(payoutAmount);
    if (isNaN(amountValue) || amountValue < 100) {
      toast.error("The minimum withdrawal amount is ₦100");
      return;
    }
    
    // Verify account details and proceed to confirmation
    verifyAccountDetails();
  };

  const handleRequestPayout = async () => {
    try {
      setIsLoading(true);
      
      // Make sure we're sending a number value
      const amountValue = parseFloat(payoutAmount);
      
      const payload = {
        amount: amountValue
      };

      const response = await fetch(
        `https://api.a1schools.org/instructors/${instructor.id}/request-payout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${instructor.token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to request payout");
      }

      toast.success("Withdrawal request submitted successfully");
      // Reset form and go back to step 1
      setAccountNumber("");
      setBankSearchQuery("");
      setSelectedBank(null);
      setPayoutAmount("");
      setAccountDetails(null);
      setStep(1);
    } catch (error) {
      console.error("Error requesting payout:", error);
      // toast.error( `${error.message} Failed to request withdrawal. Please try again.`);
      toast.error(`${(error as Error).message} Failed to request withdrawal. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const isFormValid = selectedBank !== null && 
                      accountNumber.length === 10 && 
                      payoutAmount.trim().length > 0 && 
                      parseFloat(payoutAmount) >= 100;

  // Step 1: Enter withdrawal details
  const renderWithdrawalForm = () => (
    <div className="space-y-6">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Bank
        </label>
        <div 
          onClick={() => setShowDropdown(!showDropdown)} 
          className="flex justify-between items-center w-full px-3 py-3 border border-gray-300 rounded-md cursor-pointer"
        >
          <span className="text-gray-700">
            {selectedBank ? selectedBank.name : "Select Bank"}
          </span>
          <IoChevronForward className="text-gray-400" />
        </div>
        
        {showDropdown && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="p-2 border-b">
              <input
                type="text"
                value={bankSearchQuery}
                onChange={handleBankSearch}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Search for bank..."
              />
            </div>
            <div className="max-h-60 overflow-auto">
              {filteredBanks.length > 0 ? (
                filteredBanks.map((bank) => (
                  <div
                    key={bank.id}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100"
                    onClick={() => selectBank(bank)}
                  >
                    {bank.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">No banks found</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Number
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          className="w-full px-3 py-3 border border-gray-300 rounded-md"
          placeholder="Enter 10-digit account number"
          maxLength={10}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount (₦)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            ₦
          </span>
          <input
            type="text"
            value={payoutAmount}
            onChange={handlePayoutAmountChange}
            className="w-full px-3 py-3 pl-8 border border-gray-300 rounded-md"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="flex items-start space-x-2 text-sm text-gray-500">
        <IoInformationCircleOutline className="mt-0.5 flex-shrink-0" />
        <p>Withdrawals typically process within 24 hours. Minimum withdrawal amount is ₦100</p>
      </div>

      <button
        onClick={handleContinue}
        disabled={!isFormValid || isLoading || verifyingAccount}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${
          isFormValid && !isLoading && !verifyingAccount
            ? "bg-[blue]"
            : "bg-[gray] cursor-not-allowed"
        }`}
      >
        {verifyingAccount ? "Verifying..." : "Continue"}
      </button>
    </div>
  );

  // Step 2: Confirmation screen
  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <div className="bg-gray-100 p-2 rounded-full mb-2">
            <BsBank className="text-blue-600 text-xl" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">{accountDetails?.bank_name || "BANK"}</h3>
            <p className="text-sm text-gray-600">Bank Code: {accountDetails?.bank_code || "000000"}</p>
            <p className="text-sm text-gray-600">Account: {accountDetails?.account_number || "0000000000"}</p>
            <p className="text-sm text-blue-600">
              Account Name: {accountDetails?.account_name || "ACCOUNT NAME"}
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-b">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Amount</span>
            <span className="font-bold text-lg">₦{parseFloat(payoutAmount).toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-start space-x-2 text-sm text-gray-500">
          <IoInformationCircleOutline className="mt-0.5 flex-shrink-0" />
          <p>Please verify all details before confirming. Withdrawals typically process within 24 hours.</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600">Bank</span>
            <span>{accountDetails?.bank_name || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600">Account Number</span>
            <span>{accountDetails?.account_number || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600">Account Name</span>
            <span>{accountDetails?.account_name || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600">Amount</span>
            <span>₦{parseFloat(payoutAmount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600">Processing Time</span>
            <span>24 Hours</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleRequestPayout}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-[blue] rounded-md font-medium text-white flex items-center justify-center"
      >
        {isLoading ? "Processing..." : "Confirm Withdrawal"}
      </button>
    </div>
  );

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://api.a1schools.org/auth/logout/${instructor.id}`,
        {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            
          },
        }
      );
  
      if (response.ok) {
        console.log('Logout successful');
        // Optional: Clear any user data from localStorage/sessionStorage
        // Redirect to login/home page
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message);
      }
    } catch (error) {
      console.error('Network error during logout:', error);
    }
  };
  return (
    <>
    <SidebarProvider>
           <Sidebar>
                         <SidebarHeader className="flex items-center gap-2 px-4">
                           <BookOpen className="h-6 w-6 text-primary" />
                           <span className="font-bold">A1 School</span>
                         </SidebarHeader>
                         <SidebarContent>
                           <SidebarMenu>
                             <SidebarMenuItem>
                               <SidebarMenuButton asChild isActive>
                                 <Link href="/teacher/dashboard">
                                   <LayoutDashboard className="h-4 w-4" />
                                   <span>Dashboard</span>
                                 </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem>
                             {/* <SidebarMenuItem>
                               <SidebarMenuButton asChild>
                                 <Link href="/teacher/courses">
                                   <BookOpen className="h-4 w-4" />
                                   <span>My Courses</span>
                                 </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem> */}
                             {/* <SidebarMenuItem>
                               <SidebarMenuButton asChild>
                                 <Link href="/teacher/students">
                                   <Users className="h-4 w-4" />
                                   <span>Students</span>
                                 </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem> */}
                             {/* <SidebarMenuItem>
                               <SidebarMenuButton asChild>
                                 <Link href="/teacher/analytics">
                                   <BarChart3 className="h-4 w-4" />
                                   <span>Analytics</span>
                                 </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem> */}
                             <SidebarMenuItem>
                               <SidebarMenuButton asChild>
                                 <Link href="/teacher/dashboard/transaction">
                                   <DollarSign className="h-4 w-4" />
                                   <span>Wallet</span>
                                 </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem>
                             {/* <SidebarMenuItem>
                               <SidebarMenuButton asChild>
                                 <Link href="/teacher/messages">
                                   <MessageSquare className="h-4 w-4" />
                                   <span>Messages</span>
                                 </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem> */}
                             <SidebarMenuItem>
                               <SidebarMenuButton asChild>
                                 <Link href="/teacher/dashboard/profile">
                                   <User className="h-4 w-4" />
                                   <span>Profile</span>
                                 </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem>
                             {/* <SidebarMenuItem>
                               <SidebarMenuButton asChild>
                                 <Link href="/teacher/settings">
                                   <Settings className="h-4 w-4" />
                                   <span>Settings</span>
                                 </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem> */}
               
                             <SidebarMenuItem>
                                   <SidebarMenuButton asChild>
                                    <button  onClick={handleLogout}>
               
                                    <span  className="text-[red]">Log Out</span>
               
                                    </button>
                                     
                                   </SidebarMenuButton>
                                 </SidebarMenuItem>
                           </SidebarMenu>
                         </SidebarContent>
                         <SidebarFooter className="p-4">
                           <div className="flex items-center gap-3">
                             <Image
                               src="/placeholder.svg?height=40&width=40"
                               width={40}
                               height={40}
                               alt="User avatar"
                               className="rounded-full"
                             />
                             <div className="flex flex-col">
                               <span className="text-sm font-medium">{instructor.fullname}</span>
                               <span className="text-xs text-muted-foreground">
                                 {instructor.email}
                               </span>
                             </div>
                           </div>
                         </SidebarFooter>
                       </Sidebar>
                       <SidebarTrigger className="h-10 w-10 ml-[30px] mt-[30px] lg:hidden border border-gray-300 rounded-md flex items-center justify-center">
                       <PanelLeft className="h-4 w-4" />
                     </SidebarTrigger>
    <div className="max-w-md mt-[50px] mx-auto bg-white rounded-lg shadow-sm">
      <ToastContainer />
      
      {/* Header */}
      <div className="p-4 border-b flex items-center">
        {step === 2 && (
          <button onClick={goBack} className="mr-2">
            <IoChevronBack className="text-gray-600" />
          </button>
        )}
        <h2 className="text-lg font-semibold">
          {step === 1 ? "Withdraw Funds" : "Confirm Withdrawal"}
        </h2>
      </div>
      
      {/* Body */}
      <div className="p-4">
        {step === 1 ? renderWithdrawalForm() : renderConfirmation()}
      </div>
    </div>
    </SidebarProvider>
    </>
  );
};

export default RequestPayOut;