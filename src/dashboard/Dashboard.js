import Chart from "./Chart";
import DashboardFilters from "./DashboardFilters";
import React, { useEffect, useMemo, useState } from "react";
import {
  fetchData,
  getCampaigns,
  getChartData,
  getDatasources,
  parseCSV,
} from "../utils/utils";
import "./Dashboard.css";

export const Dashboard = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [filters, setFilters] = useState({ ds: [], campaigns: [] });

  const campaigns = useMemo(() => getCampaigns(data), [data]);
  const datasources = useMemo(() => getDatasources(data), [data]);

  async function update() {
    try {
      const fetchedData = await fetchData();
      if (fetchedData) {
        const decoded = parseCSV(fetchedData);
        const { data } = decoded;
        setData(data);
      }
    } catch (error) {
      setError("Could not fetch data.");
    }
  }
  useEffect(() => {
    update();
  }, []);

  const ds = filters.ds.length === 0 ? datasources : filters.ds;
  const campaign =
    filters.campaigns.length === 0 ? campaigns : filters.campaigns;
  return error ? (
    <div>${error}</div>
  ) : (
    <div className="dashboard">
      <h1 className="dashboard__header">Dashboard</h1>
      <div className="dashboard__content">
        <DashboardFilters
          campaigns={campaigns}
          datasources={datasources}
          onDatasourceChange={(ds) =>
            setFilters({ ds, campaigns: filters.campaigns })
          }
          onCampaignsChange={(campaigns) =>
            setFilters({ ds: filters.ds, campaigns })
          }
        />
        <Chart data={data ? getChartData(data, ds, campaign) : undefined} />
      </div>
      <div className="dashboard__footer">
        <button onClick={update}>refresh</button>
      </div>
    </div>
  );
};
