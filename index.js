import express from "express"
import cors from "cors"
import {getCalendarData, setCalendarData} from "./mongo.js"

const app = express()

app.use(express.json());
app.use(cors())

app.get("/api/v1/calendar/month/get", async (request, response) => {
    console.log("GET")
    response.send(JSON.stringify(await getCalendarData(request.query.month, request.query.year)))
})

app.post("/api/v1/calendar/month/set", async(request, response) => {
    console.log("POST", request.body)
    const check = await setCalendarData(request.query.month, request.query.year, request.body)
    response.send(JSON.stringify({status:true,toSave:request.body,saved:check}))
})
const port = "4000";

app.listen(port, () => {
    console.log("Calendar API running on port "+port)
})