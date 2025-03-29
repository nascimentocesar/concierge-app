import React from "react";
import PromptBox from "../components/promptBox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { post } from "../lib/axios";

const HomePage: React.FC = () => {
  const [hasSubmittedPrompt, setHasSubmittedPrompt] = React.useState(false);
  const [trip, setTrip] = React.useState();
  const [currentStep, setCurrentStep] = React.useState(0);

  const onSubmitCallback = (text: string) => {
    setHasSubmittedPrompt(true);

    post("/trips", { prompt: text }).then((response) => {
      console.log("API response:", response);
    });
  };

  return (
    <>
      <Tabs defaultValue="prompt" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger disabled={!trip} value="recommendations">
            Recommendations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="prompt">
          <PromptBox
            isDisabled={hasSubmittedPrompt}
            onSubmitCallback={(text) => onSubmitCallback(text)}
          />
        </TabsContent>
        <TabsContent value="recommendations"></TabsContent>
      </Tabs>
    </>
  );
};

export default HomePage;
