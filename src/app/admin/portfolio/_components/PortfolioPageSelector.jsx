"use client";

import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { getPortfolioPageOptions } from "@/server/actions/portfolio";
import PortfolioMultiSelect from "./PortfolioMultiSelect";

const PortfolioPageSelector = ({ value = [], onChange }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [pageOptions, setPageOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      const resp = await getPortfolioPageOptions();
      if (resp.success) {
        setLocationOptions(resp.data.locations ?? []);
        setPageOptions(resp.data.pages ?? []);
      }
      setLoading(false);
    };
    loadOptions();
  }, []);

  const locationValues = useMemo(
    () =>
      value.filter((v) =>
        locationOptions.some((option) => option.value === v),
      ),
    [value, locationOptions],
  );

  const pageValues = useMemo(
    () =>
      value.filter((v) => pageOptions.some((option) => option.value === v)),
    [value, pageOptions],
  );

  const handleLocationChange = (selected) => {
    onChange([...pageValues, ...selected]);
  };

  const handlePageChange = (selected) => {
    onChange([...locationValues, ...selected]);
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading pages...</p>;
  }

  return (
    <div className="col-span-2 space-y-4">
      <Label className="block">Show on pages</Label>
      <PortfolioMultiSelect
        label="Locations"
        placeholder="Select locations..."
        options={locationOptions}
        value={locationValues}
        onChange={handleLocationChange}
      />
      <PortfolioMultiSelect
        label="Pages"
        placeholder="Select pages..."
        options={pageOptions}
        value={pageValues}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PortfolioPageSelector;
