import { TransactionItem } from "@/components/TransactionItem";

const transactions = [
  { title: "Payment for Vue js", amount: 100, date: "4/18/2025" },
  { title: "Payment for Node js", amount: 100, date: "4/18/2025" },
  { title: "Payment Failed", amount: -190, date: "4/16/2025" },
  { title: "Payment for Node js", amount: 100, date: "4/16/2025" },
  { title: "Payment for Node", amount: 100, date: "4/16/2025" },
  { title: "Payment Failed", amount: -100, date: "4/16/2025" },
  { title: "Payment for css", amount: 100, date: "4/16/2025" },
  { title: "Payment for PHP", amount: 100, date: "4/16/2025" },
  { title: "Payment Failed", amount: -110, date: "4/16/2025" },
  { title: "Payment for PHP", amount: 100, date: "4/16/2025" },
  { title: "Payment Failed", amount: -180, date: "4/15/2025" },
  { title: "Payment for react ts", amount: 100, date: "4/15/2025" },
  { title: "Payment Failed", amount: -95, date: "4/15/2025" },
  { title: "Payment for react ts", amount: 100, date: "4/14/2025" },
];

export default function Home() {
  return (
    <main className="pb-20 max-w-md mx-auto">
      {transactions.map((tx, idx) => (
        <TransactionItem key={idx} {...tx} />
      ))}
    </main>
  );
}
