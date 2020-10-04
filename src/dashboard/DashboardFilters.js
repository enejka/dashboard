import Select from "react-select";
import React, { useMemo } from "react";
import "./DashboardFilters.css";

const DashboardFilters = ({
  campaigns,
  datasources,
  onCampaignsChange,
  onDatasourceChange,
}) => {
  const campaignOptions = useMemo(() => {
    return prepareSelectOptions(campaigns);
  }, [campaigns]);
  const datasourceOptions = useMemo(() => prepareSelectOptions(datasources), [
    datasources,
  ]);

  return (
    <div className="dashboardFilters__form">
      <header className="dashboardFilters__header">
        Filter Dimension values
      </header>
      <div className="dashboardFilters__select">
        <label htmlFor="datasource">Datasource</label>
        <Select
          inputId="datasource"
          isMulti
          onChange={(value) => {
            const newDS = getValues(value);
            onDatasourceChange(newDS);
          }}
          options={datasourceOptions}
        />
      </div>
      <div className="dashboardFilters__select">
        <label htmlFor="campaign">Campaign</label>
        <Select
          inputId="campaign"
          isMulti
          filterOption={false}
          onChange={(value) => {
            const newCampaigns = getValues(value);
            onCampaignsChange(newCampaigns);
          }}
          options={campaignOptions}
        />
      </div>
    </div>
  );
};
const prepareSelectOptions = (items) =>
  items.map((item) => {
    return { value: item, label: item };
  });
const getValues = (items) => (items ? items.map((item) => item.value) : []);

export default DashboardFilters;
