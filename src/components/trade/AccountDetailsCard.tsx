// src/components/common/AccountDetailsCard.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AccountDetailsCardProps {
  selectedApi: string;
  setSelectedApi: (api: string) => void;
  isBrokeragesLoading: boolean;
  brokerages: any[];
  title?: string;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  selectedApi,
  setSelectedApi,
  isBrokeragesLoading,
  brokerages,
  title = "Account Details",
}) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Card className="border bg-white rounded-lg shadow-sm">
      <CardHeader
        className="flex flex-row items-center justify-between cursor-pointer p-4"
        onClick={() => setOpen((prev) => !prev)}
      >
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </CardHeader>
      <div className={cn("transition-all duration-200", open ? "block" : "hidden")}>
        <CardContent className="p-4 pt-0 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <Select value={selectedApi} onValueChange={setSelectedApi}>
              <SelectTrigger className="w-full bg-white border rounded">
                <SelectValue placeholder="Select API connection" />
              </SelectTrigger>
              <SelectContent>
                {isBrokeragesLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : brokerages.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No brokerages found
                  </SelectItem>
                ) : (
                  brokerages.map((b: any) => (
                    <SelectItem key={b.id} value={b.id.toString()}>
                      {b.brokerage_name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};