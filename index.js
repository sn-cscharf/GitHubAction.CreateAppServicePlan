const core = require('@actions/core');
const appservices = require("@azure/arm-appservice");
const identity = require("@azure/identity");

async function createResourceGroup() {
  try {
    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
    const credential = new identity.DefaultAzureCredential();
    const appservicesClient = new appservices.WebSiteManagementClient(credential, subscriptionId);

    const appServicePlan = await appservicesClient.appServicePlans.beginCreateOrUpdateAndWait(
      "TEST-GROUP-DEV",
      "TEST-PLAN-DEV",
      { location: "westeurope", sku: {name: "FREE", tier: "F1", size: "FREE"}}
    );

    core.info(`The resource group was created successfully.`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

createResourceGroup();