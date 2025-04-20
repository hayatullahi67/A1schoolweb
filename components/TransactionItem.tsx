import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface TransactionItemProps {
  title: string;
  amount: number;
  date: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  amount,
  date,
}) => {
  const isPositive = amount > 0;

  return (
    <div className="flex justify-between items-center border-b p-3">
      <div className="flex items-center gap-3">
        {isPositive ? (
          <ArrowDownCircle className="text-green-500" />
        ) : (
          <ArrowUpCircle className="text-red-500" />
        )}
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
      <div
        className={`font-semibold ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        NGN {Math.abs(amount).toFixed(2)}
      </div>
    </div>
  );
};
