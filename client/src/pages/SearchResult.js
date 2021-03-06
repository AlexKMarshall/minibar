import React from "react";
import { useLocation } from "react-router-dom";
import CompactList from "../components/CompactList";
import { useSearchDrinks } from "../hooks/drinks";

function useSearchTerm() {
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("ingredient");
  return { searchTerm };
}

export default function Discover() {
  const { searchTerm } = useSearchTerm();

  const { isLoading, error, data: drinks } = useSearchDrinks(searchTerm);

  if (isLoading) return "Loading...";
  if (error) return "An error ocurred " + error;

  return (
    <>
      <h2 className="mb-4 text-xl font-display">
        Search results for {searchTerm}
      </h2>
      {drinks.length ? <CompactList drinks={drinks} /> : "No results found"}
    </>
  );
}
