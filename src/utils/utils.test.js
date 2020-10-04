import { getCampaigns, getChartData, getDatasources } from "./utils";

it("getDatasource should return array of datasources", () => {
  const input = [
    {
      Date: "01.01.2019",
      Datasource: "Facebook Ads",
      Campaign: "Like Ads",
      Clicks: 274,
      Impressions: 1979,
    },
    {
      Date: "01.01.2019",
      Datasource: "Facebook Ads",
      Campaign: "Offer Campaigns - Conversions",
      Clicks: 10245,
      Impressions: 764627,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "B2B - Leads",
      Clicks: 7,
      Impressions: 444,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "GDN Prospecting - App - Prio 2 Offer",
      Clicks: 93,
      Impressions: 18866,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "GDN Prospecting - Desktop - India Offer",
      Clicks: 72,
      Impressions: 59558,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "GDN Prospecting - Desktop - Prio 1 Offer",
      Clicks: 65,
      Impressions: 34592,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "GDN Prospecting - Desktop - Prio 2 Offer",
      Clicks: 26,
      Impressions: 20901,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "GDN Prospecting - Desktop - Prio 3 Offer",
      Clicks: 87,
      Impressions: 47845,
    },
  ];
  const datasources = getDatasources(input);
  expect(datasources.length).toEqual(2);
  expect(datasources.includes("Facebook Ads")).toEqual(true);
  expect(datasources.includes("Google Adwords")).toEqual(true);
  expect(datasources.includes("Google Analytics")).toEqual(false);
});

it("getDatasource should return empty array", () => {
  const input = undefined;
  const datasources = getDatasources(input);
  expect(datasources.length).toEqual(0);
});

it("getCampaign should return array of campaigns", () => {
  const input = [
    {
      Date: "01.01.2019",
      Datasource: "Facebook Ads",
      Campaign: "Offer Campaigns - Conversions",
      Clicks: 10245,
      Impressions: 764627,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "B2B - Leads",
      Clicks: 7,
      Impressions: 444,
    },
  ];
  const campaigns = getCampaigns(input);
  expect(campaigns.length).toEqual(2);
  expect(campaigns.includes("Offer Campaigns - Conversions")).toEqual(true);
  expect(campaigns.includes("B2B - Leads")).toEqual(true);
});

it("getCampaigns should return empty array", () => {
  const input = undefined;
  const campaigns = getCampaigns(input);
  expect(campaigns.length).toEqual(0);
});

it("getChartData should return array of objects, where each object will contain data an sum of click and impressions for specified datasources and campaign", () => {
  const input = [
    {
      Date: "01.01.2019",
      Datasource: "Facebook Ads",
      Campaign: "Like Ads",
      Clicks: 274,
      Impressions: 1979,
    },
    {
      Date: "01.01.2019",
      Datasource: "Facebook Ads",
      Campaign: "Offer Campaigns - Conversions",
      Clicks: 10245,
      Impressions: 764627,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "B2B - Leads",
      Clicks: 7,
      Impressions: 444,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "Like Ads",
      Clicks: 4,
      Impressions: 1,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "Like Ads",
      Clicks: 4,
      Impressions: 2,
    },
    {
      Date: "01.01.2019",
      Datasource: "Google Adwords",
      Campaign: "GDN Prospecting - Desktop - Prio 1 Offer",
      Clicks: 65,
      Impressions: 34592,
    },
    {
      Date: "02.01.2019",
      Datasource: "Google Adwords",
      Campaign: "Like Ads",
      Clicks: 4,
      Impressions: 2,
    },
    {
      Date: "03.01.2019",
      Datasource: "Google Adwords",
      Campaign: "Like Ads",
      Clicks: 4,
      Impressions: 33,
    },
  ];
  const data = getChartData(input, ["Google Adwords"], ["Like Ads"]);
  const element = data.find((e) => e.date === "01.01.2019");
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toEqual(3);
  expect(element.clicks).toEqual(8);
  expect(element.impressions).toEqual(3);
});
