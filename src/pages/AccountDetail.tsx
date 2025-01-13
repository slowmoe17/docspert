import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getAccountDetails, getAccountTransactions } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const AccountDetail = () => {
  const { id } = useParams<{ id: string }>(); // id will be a string
  const navigate = useNavigate();
  
  // Fetch account details
  const { data: account, isLoading } = useQuery({
    queryKey: ["account", id],
    queryFn: () => getAccountDetails(id),
    enabled: !!id,
  });

  // Fetch transactions for the account
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ["transactions", id],
    queryFn: () => getAccountTransactions(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading account...</div>;
  if (!account) return <div>Account not found</div>;

  if (isLoadingTransactions) return <div>Loading transactions...</div>;
  if (!transactions) return <div>No transactions found</div>;

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-6">{account.name}</h1>
        <div className="grid gap-4">
          <div>
            <label className="text-sm text-gray-500">Account Number</label>
            <p className="text-lg font-medium">{account.id}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Current Balance</label>
            <p className="text-3xl font-bold text-primary">
              ${parseFloat(account.balance).toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">Transactions</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">other Account Name</th>
              <th className="px-4 py-2 text-left">status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any) => (
              <tr key={transaction.id}>
                <td className="px-4 py-2">{transaction.id}</td>
                <td className="px-4 py-2">{transaction.timestamp}</td>
                <td className="px-4 py-2">${parseFloat(transaction.amount).toFixed(2)}</td>
                <td className="px-4 py-2">{
                  
                   transaction.from_account.id === account.id ? "sent" : "recieved"
                  }</td>
                <td className="px-4 py-2">{
                    transaction.from_account.id === account.id ? transaction.to_account.name : transaction.from_account.name
                  
                  }</td>
                <td className="px-4 py-2">confirmed</td>
                
              </tr>
              
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AccountDetail;


