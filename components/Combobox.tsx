/* SPDX-FileCopyrightText: 2021 @koistya */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import { TextField, Autocomplete, AutocompleteProps } from "@mui/material";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete/Autocomplete";

type Option = { id: string; label: string };
type ComboboxProps = Omit<
  AutocompleteProps<Option, undefined, undefined, undefined>,
  "renderInput" | "options"
>;

function renderInput(params: AutocompleteRenderInputParams) {
  return <TextField placeholder="Select a project..." {...params} />;
}

/**
 * TODO: Build a combobox based on Material UI Autocomplete component.
 *
 * @see https://mui.com/components/autocomplete/
 */
export function Combobox(props: ComboboxProps): JSX.Element {
  const { sx, ...other } = props;

  return (
    <Autocomplete
      sx={{ /* CSS */ ...sx }}
      options={projects}
      renderInput={renderInput}
      {...other}
    />
  );
}

// #region Data

const projects = [
  {
    id: "1",
    label: "google.com",
  },
  {
    id: "2",
    label: "facebook.com",
  },
  {
    id: "3",
    label: "github.com",
  },
  {
    id: "4",
    label: "apple.com",
  },
  {
    id: "5",
    label: "amazon.com",
  },
  {
    id: "6",
    label: "youtube.com",
  },
  {
    id: "7",
    label: "wikipedia.org",
  },
  {
    id: "8",
    label: "reddit.com",
  },
  {
    id: "9",
    label: "bing.com",
  },
  {
    id: "10",
    label: "ebay.com",
  },
  {
    id: "11",
    label: "twitter.com",
  },
  {
    id: "12",
    label: "instagram.com",
  },
];

// #endregion
