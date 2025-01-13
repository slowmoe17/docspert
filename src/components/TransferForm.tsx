import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account, makeTransfer } from "@/services/api";

interface TransferFormProps {
  accounts: Account[];
  onSuccess: () => void;
}

export const TransferForm = ({ accounts, onSuccess }: TransferFormProps) => {
  const { toast } = useToast();
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAccount || !toAccount || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await makeTransfer({
        from_account: fromAccount, // Keep it as string since it's UUID
        to_account: toAccount, // Same as above
        amount: parseFloat(amount),
      });
      toast({
        title: "Success",
        description: "Transfer completed successfully",
      });
      onSuccess();
      setFromAccount("");
      setToAccount("");
      setAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete transfer",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">From Account</label>
        <Select value={fromAccount} onValueChange={setFromAccount}>
          <SelectTrigger>
            <SelectValue placeholder="Select source account" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id.toString()}>
               {account.balance} - {account.name} --- {account.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">To Account</label>
        <Select value={toAccount} onValueChange={setToAccount}>
          <SelectTrigger>
            <SelectValue placeholder="Select destination account" />
          </SelectTrigger>
          <SelectContent>
            {accounts
              .filter((account) => account.id.toString() !== fromAccount)
              .map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                 {account.balance} -  {account.name} --- {account.id}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Amount</label>
        <Input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : "Transfer"}
      </Button>
    </form>
  );
};
