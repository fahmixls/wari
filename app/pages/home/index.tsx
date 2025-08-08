import { Button } from "@/components/ui/button";
import { useFetcher } from "react-router";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { blockchainOptions } from "@/lib/constants";

export default function WalletForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";
  const [selectedBlockchainId, setSelectedBlockchainId] = useState<string>("");
  const result = fetcher.data;
  return (
    <div className="max-w-md mx-auto space-y-4 p-7">
      <h2 className="text-xl font-bold">Create Wallet</h2>
      <fetcher.Form
        method="post"
        action="/api/wallet/create"
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="walletName">Wallet Name</Label>
          <Input name="walletName" placeholder="My Wallet" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="blockchain">Blockchain</Label>
          <Select
            value={selectedBlockchainId}
            onValueChange={(value) => {
              console.log(value);
              setSelectedBlockchainId(value);
            }}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select blockchain" />
            </SelectTrigger>
            <SelectContent>
              {blockchainOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <input type="hidden" name="blockchains" value={selectedBlockchainId} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </fetcher.Form>
      {result && (
        <div
          className={`text-sm font-medium ${
            result.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {JSON.stringify(result)}
        </div>
      )}
      {result?.errors && (
        <ul className="text-sm text-red-500 list-disc list-inside">
          {result.errors}
        </ul>
      )}
    </div>
  );
}
