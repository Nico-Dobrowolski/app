// material
import {
    Box,
    Stack,
    Card,
    Button,
    Divider,
    Typography,
    CardHeader,
    Avatar,
} from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewsUpdate() {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios
            .get("/api/blogs", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((res) => {
                console.log(
                    `The data are from api url : ${process.env.REACT_APP_API_BASE_URL}/api/blogs `,
                    res.data
                );
                setBlogs(res.data);
            });
    }, []);

    return (
        <Card>
            <CardHeader title="News Update" />

            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                {blogs &&
                    blogs.map((blog, index) => {
                        return (
                            <Stack
                                key={index}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <Avatar
                                    alt={blog.titre}
                                    src={blog.url}
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 1.5,
                                    }}
                                    loading="lazy"
                                />

                                <Box sx={{ minWidth: 240 }}>
                                    <Typography variant="subtitle2" noWrap>
                                        {blog.titre}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "text.secondary",
                                        }}
                                        noWrap
                                    >
                                        {blog.description}
                                    </Typography>
                                </Box>
                            </Stack>
                        );
                    })}
            </Stack>
            <Divider />

            <Box sx={{ p: 2, textAlign: "right" }}>
                <Button
                    to="#"
                    size="small"
                    color="inherit"
                    endIcon={<ArrowForwardOutlinedIcon />}
                >
                    View all
                </Button>
            </Box>
        </Card>
    );
}
