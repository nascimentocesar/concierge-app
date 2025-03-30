import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { post } from "../../lib/axios";
import { Loader2, Send } from "lucide-react";

interface PromptTextareaProps {
  onSuccessCallback: (data: any) => void;
  trip?: any;
}

const PromptTextarea: React.FC<PromptTextareaProps> = ({
  onSuccessCallback,
  trip,
}) => {
  const [prompt, setPrompt] = useState((trip && trip.prompt) || "");
  const [isLoading, setIsLoading] = useState(trip && !trip.isComplete);

  const onSubmitCallback = (text: string) => {
    setIsLoading(true);
    post("/trips", { prompt: text }).then((response) => {
      onSuccessCallback(response.data);
    });
  };

  return (
    <div className="w-full">
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
            className="h-60"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(event) => {
              if (!isLoading && event.ctrlKey && event.key === "Enter") {
                onSubmitCallback(prompt);
              }
            }}
            placeholder="Describe here..."
            value={prompt}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          {!isLoading && (
            <Button
              disabled={prompt.length === 0}
              onClick={() => onSubmitCallback(prompt)}
            >
              <Send />
              {prompt.length === 0 ? "Type something..." : "Ctrl + Enter"}
            </Button>
          )}
          {isLoading && (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PromptTextarea;
