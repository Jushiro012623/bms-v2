export class TokenDecoder {
    public static decode(token: string) {
        if (typeof token !== "string" || !token.trim()) {
            throw new Error("Token must be a non-empty string");
        }

        const [headerPart, claimsPart] = token.split(".");
        if (!headerPart || !claimsPart) {
            throw new Error("Invalid JWT format");
        }

        const decoder = new TokenDecoder();
        return {
            header: decoder.decodePart(headerPart),
            claims: decoder.decodePart(claimsPart),
        };
    }

    private decodePart(value: string) {
        return this.jsonDecode(this.base64Decode(value));
    }

    private base64Decode(value: string) {
        if (value.length % 4) {
            value += "=".repeat(4 - (value.length % 4));
        }

        const normalized = value.replace(/-/g, "+").replace(/_/g, "/");

        try {
            return Buffer.from(normalized, "base64").toString("utf8");
        } catch {
            throw new Error("Invalid base64url string");
        }
    }

    private jsonDecode(value: string) {
        try {
            return JSON.parse(value);
        } catch {
            throw new Error("Invalid JSON structure in token part");
        }
    }
}
