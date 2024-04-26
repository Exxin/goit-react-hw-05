import { useState } from "react";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  const [searchedItem, setSearchedItem] = useState("");

  const handleSearch = (event) => {
    setSearchedItem(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = searchedItem.trim().toLowerCase();
    if (!query) return;

    onSubmit(query);
    setSearchedItem("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="search"
        value={searchedItem}
        onChange={handleSearch}
        placeholder="Search movie..."
        autoComplete="off"
        required
      />
      <button className={css.btn} type="submit" disabled={!searchedItem}>
        Search
      </button>
    </form>
  );
}
