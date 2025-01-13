import { Card } from "@/components/ui/card";
import { Account } from "@/services/api";
import { useNavigate } from "react-router-dom";

export const AccountCard = ({ account }: { account: Account }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/account/${account.id}`)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{account.owner_name}</h3>
          <p className="text-sm text-gray-500">{account.account_number}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${account.balance.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
};