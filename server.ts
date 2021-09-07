import app from "./app";

app.listen(process.env.PORT, () => {
    return console.log(
        `server is listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT},`
    );
});
