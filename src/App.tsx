import React from "react";
import "./App.css";
import PromptTextarea from "./components/app/promptTextarea";
import TripRecommendations from "./components/app/tripRecommendations";
import TripHistory from "./components/app/tripHistory";

const App: React.FC = () => {
  const [prompt, setPrompt] = React.useState("");
  const [trip, setTrip] = React.useState<any>();

  const onTripCreatedCallback = (data: any) => {
    setPrompt(data.prompt);
    setTrip(data);
  };

  return (
    <div className="grid gap-10 w-screen max-w-4xl p-10 pb-100">
      <div>
        <TripHistory
          onSelectCallback={(trip) => {
            setTrip(trip);
            setPrompt(trip.prompt);
          }}
        />
      </div>
      <>
        <PromptTextarea
          key={prompt}
          defaultPrompt={prompt}
          onSuccessCallback={(data) => onTripCreatedCallback(data)}
        />
        {trip && (
          <TripRecommendations trip={trip} onSuccessCallback={() => {}} />
        )}
      </>
    </div>
  );
};

export default App;
