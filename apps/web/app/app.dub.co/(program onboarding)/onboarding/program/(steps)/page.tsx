import { GettingStarted } from "./page-client";
import { StepPage } from "./step-page";

export default async function GetStarted() {
  return (
    <StepPage title="Getting started">
      <GettingStarted />
    </StepPage>
  );
}
