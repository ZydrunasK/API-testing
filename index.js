import e from "express";
import { apiRouter } from "./api/apiRouter.js";

const app = e();
const port = 5123;

app.use(e.json({
    type: 'application/json',
}));
app.use(e.urlencoded({
    extended: true,
}))

app.use('/api', apiRouter)

app.get('/', (req, res) => {
return res.send('HOMEPAGE');
});


app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(port, () => {
    console.log('SERVER: http://localhost:' + port);
});

