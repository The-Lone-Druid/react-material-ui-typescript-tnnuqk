/* SPDX-FileCopyrightText: 2021 @koistya */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import { Typography, CssBaseline, Button, Box } from "@mui/material";
import { ThemeProvider } from "./ThemeProvider";
import DataTable, { Column, RowData } from "./DataTable";
import { useFormik } from "formik";
import * as Yup from "yup";

interface UserDetails {
  firstName: string;
  lastName: string;
  age: number;
}

interface ExampleData {
  data: UserDetails[];
}

/**
 * The top-level (root) React component.
 *
 * @see https://reactjs.org/
 * @see https://mui.com/core/
 */
export function App(): JSX.Element {
  const exampleEditableData = useFormik<ExampleData>({
    initialValues: {
      data: [],
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: (values) => {},
  });

  const [columns, setColumns] = React.useState<Column[]>([
    {
      id: "firstName",
      label: "First name",
      renderCell: (rowData) => rowData.firstName,
    },
    {
      id: "lastName",
      label: "Last name",
      renderCell: (rowData) => rowData.lastName,
    },
    {
      id: "age",
      label: "Age",
      renderCell: (rowData) => rowData.age,
    },
  ]);

  return (
    <ThemeProvider>
      <CssBaseline />
      <DataTable columns={columns} data={data} />
    </ThemeProvider>
  );
}
