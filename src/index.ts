import express, {Request, Response, NextFunction} from "express";

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on: ${port}`));