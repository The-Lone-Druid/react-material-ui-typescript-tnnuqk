/* SPDX-FileCopyrightText: 2021 @koistya */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import { Typography, CssBaseline, Button, Box, TextField } from "@mui/material";
import { ThemeProvider } from "./ThemeProvider";
import DataTable, { Column, RowData } from "./DataTable";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";

interface UserDetails {
  id: string;
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
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      data: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string()
            .required("First name is required to be filled")
            .min(3, "First name must be at least 3 characters"),
          lastName: Yup.string()
            .required("Last name is required to be filled")
            .min(3, "Last name must be at least 3 characters"),
          age: Yup.number()
            .required("Age is required to be filled")
            .min(4, "Age must be at least 4 years old")
            .max(18, "Age must be at most 18 years old"),
        })
      ),
    }),
    onSubmit: (values) => {},
  });

  const [dynamicColumns, setDynamicColumns] = React.useState<Column[]>([]);

  /**
   * Column memoization is important to prevent re-rendering of the columns and
   * to get the latest values of the formik values and errors.
   */
  const meoizedColumns = React.useMemo(() => {
    const defaultColumns: Column[] = [
      {
        id: "firstName",
        label: "First name",
        renderCell: (rowData) => {
          /**
           * Find the index of the error in the formik errors array
           */
          const currentIndex = exampleEditableData.values.data.findIndex(
            (data) => data.id === rowData.id
          );

          /**
           * Check if the error exists and if it is the first name error
           */
          const hasError =
            exampleEditableData.errors.data &&
            currentIndex !== undefined &&
            currentIndex >= 0 &&
            (
              exampleEditableData.errors.data[
                currentIndex
              ] as FormikErrors<UserDetails>
            )?.firstName;

          return (
            <Box>
              <TextField
                size={"small"}
                label={"First name"}
                value={rowData.firstName}
                onChange={(e) => {
                  /**
                   * This is where you write your logic to update the data
                   */
                  const updatedData = exampleEditableData.values.data;
                  updatedData[currentIndex].firstName = e.target.value;

                  /**
                   * This is where you set the updated data to the formik values
                   */
                  exampleEditableData.setValues({ data: updatedData });
                }}
                error={Boolean(hasError)}
                helperText={hasError}
              />
            </Box>
          );
        },
      },
      {
        id: "lastName",
        label: "Last name",
        renderCell: (rowData) => {
          /**
           * Find the index of the error in the formik errors array
           */
          const currentIndex = exampleEditableData.values.data.findIndex(
            (data) => data.id === rowData.id
          );

          /**
           * Check if the error exists and if it is the first name error
           */
          const hasError =
            exampleEditableData.errors.data &&
            currentIndex !== undefined &&
            currentIndex >= 0 &&
            (
              exampleEditableData.errors.data[
                currentIndex
              ] as FormikErrors<UserDetails>
            )?.lastName;

          return (
            <Box>
              <TextField
                size={"small"}
                label={"Last name"}
                value={rowData.lastName}
                onChange={(e) => {
                  /**
                   * This is where you write your logic to update the data
                   */
                  const updatedData = exampleEditableData.values.data;
                  updatedData[currentIndex].lastName = e.target.value;

                  /**
                   * This is where you set the updated data to the formik values
                   */
                  exampleEditableData.setValues({ data: updatedData });
                }}
                error={Boolean(hasError)}
                helperText={hasError}
              />
            </Box>
          );
        },
      },
      {
        id: "age",
        label: "Age",
        renderCell: (rowData) => {
          /**
           * Find the index of the error in the formik errors array
           */
          const currentIndex = exampleEditableData.values.data.findIndex(
            (data) => data.id === rowData.id
          );

          /**
           * Check if the error exists and if it is the first name error
           */
          const hasError =
            exampleEditableData.errors.data &&
            currentIndex !== undefined &&
            currentIndex >= 0 &&
            (
              exampleEditableData.errors.data[
                currentIndex
              ] as FormikErrors<UserDetails>
            )?.age;

          return (
            <Box>
              <TextField
                size={"small"}
                label={"Age"}
                value={rowData.age}
                type="number"
                onChange={(e) => {
                  /**
                   * This is where you write your logic to update the data
                   */
                  const updatedData = exampleEditableData.values.data;
                  updatedData[currentIndex].age = Number(e.target.value);

                  /**
                   * This is where you set the updated data to the formik values
                   */
                  exampleEditableData.setValues({ data: updatedData });
                }}
                error={Boolean(hasError)}
                helperText={hasError}
              />
            </Box>
          );
        },
      },
    ];

    return [...defaultColumns, ...dynamicColumns];
  }, [
    exampleEditableData.values.data,
    exampleEditableData.errors.data,
    exampleEditableData.touched.data,
    dynamicColumns,
  ]);

  /**
   * This is where you write your logic to set the data received
   * from an API call, this is the process if you also want to change
   * it's valud in real time or add a validation to it.
   */
  React.useEffect(() => {
    exampleEditableData.setValues({
      data: [
        { id: "1", firstName: "John", lastName: "Doe", age: 17 },
        { id: "2", firstName: "Jane", lastName: "Doe", age: 14 },
        { id: "3", firstName: "Zahid", lastName: "Shaikh", age: 18 },
      ],
    });
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <DataTable
        columns={meoizedColumns}
        data={exampleEditableData.values.data}
      />
      <Button
        sx={{ m: 2 }}
        variant={"contained"}
        onClick={() => {
          setDynamicColumns([
            ...dynamicColumns,
            {
              id: Date.now().toString(),
              label: "New column",
              renderCell: (rowData) => {
                return (
                  <Box>
                    <Typography>This is a new column </Typography>
                  </Box>
                );
              },
            },
          ]);
        }}
      >
        Add new column dynamically
      </Button>
    </ThemeProvider>
  );
}
