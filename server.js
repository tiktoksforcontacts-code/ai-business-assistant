const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, "business.json");
const KNOWLEDGE_FILE = path.join(__dirname, "business-knowledge.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function generateKnowledge(business) {
    return `
BUSINESS KNOWLEDGE BASE

Business Name: ${business.businessName || "Not provided"}
Business Type: ${business.businessType || "Not provided"}

DESCRIPTION
${business.description || "Not provided"}

LOCATION
Address: ${business.address || "Not provided"}
City: ${business.city || "Not provided"}
Country: ${business.country || "Not provided"}

OPENING HOURS
${business.hours || "Not provided"}

SERVICES / PRODUCTS
${business.services || "Not provided"}

BOOKING / APPOINTMENTS
${business.booking || "Not provided"}

PAYMENT METHODS
${business.payments || "Not provided"}

POLICIES
${business.policies || "Not provided"}

CONTACT INFORMATION
Phone: ${business.phone || "Not provided"}
Email: ${business.email || "Not provided"}
Website: ${business.website || "Not provided"}
Social Media: ${business.social || "Not provided"}

FREQUENTLY ASKED QUESTIONS
${business.faqs || "Not provided"}

IMPORTANT AI RULES

Use only the information provided in this knowledge base.

Never invent or guess business information.

If requested information is not available, say:

"I don't have verified information about that."
`.trim();
}

app.post("/api/business", (req, res) => {
    try {
        fs.writeFileSync(
            DATA_FILE,
            JSON.stringify(req.body, null, 2),
            "utf8"
        );

        fs.writeFileSync(
            KNOWLEDGE_FILE,
            generateKnowledge(req.body),
            "utf8"
        );

        res.json({
            success: true,
            message: "Business information and knowledge base generated successfully."
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

app.get("/api/knowledge", (req, res) => {
    if (!fs.existsSync(KNOWLEDGE_FILE)) {
        return res.status(404).send("Knowledge base not found.");
    }

    res.type("text/plain");
    res.send(fs.readFileSync(KNOWLEDGE_FILE, "utf8"));
});

app.listen(PORT, () => {
    console.log(`AI Business Assistant running on port ${PORT}`);
});