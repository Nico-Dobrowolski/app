import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
    Box,
    Card,
    Checkbox,
    CardHeader,
    Typography,
    FormControlLabel,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

TaskItem.propTypes = {
    task: PropTypes.string,
    checked: PropTypes.bool,
    formik: PropTypes.object,
};

function TaskItem({ task, checked, formik, ...other }) {
    const { getFieldProps } = formik;

    return (
        <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
            <FormControlLabel
                control={
                    <Checkbox
                        {...getFieldProps("checked")}
                        value={task}
                        checked={checked}
                        {...other}
                    />
                }
                label={
                    <Typography
                        variant="body2"
                        sx={{
                            ...(checked && {
                                color: "text.disabled",
                                textDecoration: "line-through",
                            }),
                        }}
                    >
                        {task}
                    </Typography>
                }
            />
        </Stack>
    );
}

export default function AppTasks() {
    axios.defaults.baseURL = process.env.REACT_APP_PROD_API_BASE_URL;
    const [tasks, setTasks] = useState([]);

    const formik = useFormik({
        initialValues: {
            checked: [tasks[0], tasks[1]],
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const { values, handleSubmit } = formik;

    useEffect(() => {
        axios
            .get("/api/tasks", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => {
                console.log(
                    `The data are from api url : ${process.env.REACT_APP_PROD_API_BASE_URL}/api/tasks `,
                    res.data
                );
                setTasks(res.data);
            });
    }, []);

    return (
        <Card>
            <CardHeader title="Tasks" />
            <Box sx={{ px: 3, py: 1 }}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        {tasks &&
                            tasks.map((task) => (
                                <TaskItem
                                    key={task}
                                    task={task}
                                    formik={formik}
                                    checked={values.checked.includes(task)}
                                />
                            ))}
                    </Form>
                </FormikProvider>
            </Box>
        </Card>
    );
}
