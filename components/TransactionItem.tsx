// import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

// interface TransactionItemProps {
//   amount: string;
//   status: string;
//   created_at: string
//   description: string
//   id:string
//   transaction_type: string
// }

// export const TransactionItem: React.FC<TransactionItemProps> = ({
//   amount,
//   status ,
//   created_at ,
//   description ,
//   transaction_type,
//   id
// }) => {
//   const isPositive = amount > 0;

//   return (
//     <div className="flex justify-between items-center border-b p-3">
//       <div className="flex items-center gap-3">
//         {isPositive ? (
//           <ArrowDownCircle className="text-green-500" />
//         ) : (
//           <ArrowUpCircle className="text-red-500" />
//         )}
//         <div>
//           <div className="font-medium">{description}</div>
//           <div className="text-sm text-gray-500">{created_at}</div>
//           <div className="text-sm text-gray-500">{transaction_type}</div>

//         </div>
//       </div>
//       <div
//         className={`font-semibold ${
//           isPositive ? "text-green-600" : "text-red-600"
//         }`}
//       >
//         NGN {amount}
//       </div>
//     </div>
//   );
// };


import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface TransactionItemProps {
  amount: string;
  status: string;
  created_at: string;
  description: string;
  id: string;
  transaction_type: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  amount,
  status,
  created_at,
  description,
  transaction_type,
  id
}) => {
  const isCredit = transaction_type.toLowerCase() === "credit";

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(created_at));

  return (
    <div className="">
<div className="flex gap-[170px]  justify-between items-center border-b p-3">
      <div className="flex items-center gap-3">
        {isCredit ? (
          <ArrowDownCircle className="text-[green]" />
        ) : (
          <ArrowUpCircle className="text-[red]" />
        )}
        <div>
          <div className={`font-medium  ${
          isCredit ? "text-[green]" : "text-[red]"
        }`}>{description}</div>
          <div className={`text-sm text-gray-500  ${
          isCredit ? "text-[green]" : "text-[red]"
        }`}>{formattedDate}</div>
          <div className={`text-sm text-red capitalize  ${
          isCredit ? "text-[green]" : "text-[red]"
        }`}>{transaction_type}</div>
        </div>
      </div>
      <div
        className={`font-semibold ${
          isCredit ? "text-[green]" : "text-[red]"
        }`}
      >
        {isCredit ? "$ " : "- $ "}
        {amount}
      </div>
    </div>
    </div>
    
  );
};
