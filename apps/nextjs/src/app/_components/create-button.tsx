import { HousePlus } from "lucide-react";

import { Button } from "@acme/ui/button";

export const CreateButton = () => {
  return (
    <>
      <Button variant="outline" className="rounded-lg">
        <HousePlus />
        <span className="ml-1">Create</span>
      </Button>
    </>
  );
};
