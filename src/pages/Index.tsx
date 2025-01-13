"use client";
import { AccountCard } from "@/components/AccountCard";
import { TransferForm } from "@/components/TransferForm";
import { ImportAccounts } from "@/components/ImportAccounts";
import { getAccounts } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Index = () => {
  const navigate = useNavigate();
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await getAccounts();
      setAccounts(accounts);
    };

    fetchAccounts();
  }, []);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Docspert</h1>
        <div className="space-x-4">
          <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
            <DialogTrigger asChild>
              <Button>Make Transfer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transfer Money</DialogTitle>
              </DialogHeader>
              <TransferForm
                accounts={accounts}
                onSuccess={() => {
                  setIsTransferOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-8">
        <ImportAccounts onSuccess={() => {ImportAccounts}} />
      </div>

      {/* Table View */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Accounts Table</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account ID</TableHead>
                <TableHead>Owner Name</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow
                  key={account.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/account/${account.id}`)}
                >
                  <TableCell>{account.id}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell className="text-right">
                    ${account.balance.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>


    </div>
  );
};

export default Index;