import Papa from "papaparse";

const PROXY = "https://cors-anywhere.herokuapp.com/";
const DATA_URL =
  "http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv";

export async function fetchData(url = DATA_URL) {
  const response = await fetch(PROXY + url, {
    method: "get",
  });
  if (response.ok) {
    return response.text();
  }
  return null;
}

export function parseCSV(csvString) {
  return Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transform: (value, columnName) => {
      if ((columnName === "Impressions" || columnName === "Clicks") && !value) {
        return 0;
      }
      return value;
    },
  });
}

export function getDatasources(items = []) {
  const datasource = items.map((i) => i.Datasource);
  return Array.from(new Set(datasource));
}
export function getCampaigns(items = []) {
  const campaigns = items.map((i) => i.Campaign);
  return Array.from(new Set(campaigns));
}
export function getChartData(items, datasources, campaigns) {
  const elementsByDate = items
    .filter(
      (item) =>
        datasources.includes(item.Datasource) &&
        campaigns.includes(item.Campaign)
    )
    .reduce((result, current) => {
      if (result[current.Date]) {
        result[current.Date].Clicks += current.Clicks;
        result[current.Date].Impressions += current.Impressions;
      } else {
        result[current.Date] = {};
        result[current.Date]["Clicks"] = current.Clicks;
        result[current.Date]["Impressions"] = current.Impressions;
      }
      return result;
    }, {});

  return Object.keys(elementsByDate).map((key) => {
    return {
      date: key,
      clicks: elementsByDate[key].Clicks,
      impressions: elementsByDate[key].Impressions,
    };
  });
}
