const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "business.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.post("/api/business", (req, res) => {
    try {
        fs.writeFileSync(
            DATA_FILE,
            JSON.stringify(req.body, null, 2),
            "utf8"
        );

        res.json({
            success: true,
            message: "Business information saved successfully."
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Could not save business information."
        });
    }
});

app.get("/api/business", (req, res) => {
    if (!fs.existsSync(DATA_FILE)) {
        return res.json({});
    }

    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not read business information."
        });
    }
});

app.listen(PORT, () => {
    console.log(`AI Business Assistant running at http://localhost:${PORT}`);
});