const fs = require("fs");

const businessFile = "business.json";
const knowledgeFile = "business-knowledge.txt";

if (!fs.existsSync(businessFile)) {
    console.log("business.json not found.");
    process.exit(1);
}

const business = JSON.parse(
    fs.readFileSync(businessFile, "utf8")
);

const knowledge = `
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

Do not invent prices, services, availability, opening hours, policies,
contact details, products, or other business information.

If requested information is not available, say:

"I don't have verified information about that."

This information was provided by the business.
`;

fs.writeFileSync(
    knowledgeFile,
    knowledge.trim(),
    "utf8"
);

console.log("Business knowledge generated successfully.");
console.log(`Created: ${knowledgeFile}`);