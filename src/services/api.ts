import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.6:8000/api/",
});

export interface Account {
  id: string;
  balance: number;
  name: string;
}

export interface TransferData {
  from_account: number;
  to_account: number;
  amount: number;
}


export const getAccounts = async () => {
  const response = await api.get<Account[]>("accounts/");
  console.log(response)
  return response.data.data;
};

export const getAccountDetails = async (id: string) => {
  const response = await api.get<Account[]>(`account-details`, {
    params: { id },
  });

  console.log("API Response:", response.data);

  return response.data.data[0]; 
};

export const makeTransfer = async (data: TransferData) => {
  const response = await api.post("transfer/", data);
  return response.data;
};

export const getAccountTransactions = async (id: string) => {
  const response = await api.get<TransferData[]>(`account-transactions/`, { params: { id } });
  console.log(response.data.data)
  return response.data.data;
};

export const importAccounts = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("import-accounts/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};