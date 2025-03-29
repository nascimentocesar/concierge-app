import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface PromptBoxProps {
  isDisabled: boolean;
  onSubmitCallback: (message: string) => void;
}

const PromptBox: React.FC<PromptBoxProps> = ({
  isDisabled,
  onSubmitCallback,
}) => {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Where to next?</CardTitle>
          <CardDescription>
            Enter your trip details below, including destination, dates, number
            of adults/children, departure location, and any preferences. The
            more info, the better!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            disabled={isDisabled}
            className="h-36"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(event) => {
              if (!isDisabled && event.ctrlKey && event.key === "Enter") {
                onSubmitCallback(prompt);
              }
            }}
            placeholder="Describe here..."
            value={prompt}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            disabled={isDisabled || prompt.length === 0}
            onClick={() => !isDisabled && onSubmitCallback(prompt)}
          >
            Ctrl + Enter
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PromptBox;
