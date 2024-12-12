"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateMonthlyBills } from "@/utils/generateBills";

interface GenerationResult {
    success: boolean;
    message: string;
    count?: number;
}

async function handleGenerateBills(): Promise<GenerationResult> {
    try {
        const result = await generateMonthlyBills();

        if (Array.isArray(result)) {
            if (result.length > 0) {
                return { success: true, message: `Generated ${result.length} bills successfully.`, count: result.length };
            } else {
                return { success: true, message: "No bills were generated. Bills for this month may already exist." };
            }
        }

        if (typeof result === 'object' && result !== null && 'success' in result && typeof result.success === 'boolean' && 'message' in result && typeof result.message === 'string') {
            return { success: result.success, message: result.message };
        }

        return { success: false, message: "An unexpected error occurred." };
    } catch (error) {
        console.error("Error generating bills:", error);
        return { success: false, message: "An error occurred during bill generation." };
    }
}

const GenerateBillsButton = () => {
    const [generating, setGenerating] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleClick = async () => {
        setGenerating(true);
        setMessage("Generating Bills...");

        try {
            const result = await handleGenerateBills();
            setMessage(result.message);
        } catch (error) {
            console.log(error);
            setMessage("An unexpected error occurred during handleClick."); // More specific message
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                disabled={generating}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {generating ? "Generating..." : "Generate Bills"}
            </Button>
            {message && (
                <p className="mt-2 text-center" style={{ color: message.startsWith("Generated") ? 'green' : message === "Generating Bills..." ? 'inherit' : 'red' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default GenerateBillsButton;