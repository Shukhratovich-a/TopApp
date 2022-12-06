import React, { KeyboardEvent } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import { SearchProps } from "./Search.props";

import { Input, Button } from "../index";

import SearchIcon from "./search.svg";

import styles from "./Search.module.css";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = React.useState<string>("");
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      goToSearch();
    }
  };

  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button className={styles.button} appearance="primary" onClick={goToSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};
