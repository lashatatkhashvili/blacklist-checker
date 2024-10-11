"use client";

import { useState } from "react";
import axios from "axios";
import PhoneTable from "@/components/PhoneTable";
import Loader from "@/components/Loader";
import EmptyPhones from "@/components/EmptyPhones";
import Button from "@/components/Button";
import { generateRandomPhoneNumbers } from "@/utils/generateRandomPhoneNumbers";
import { IBlacklistResult } from "@/types";

const HomePage: React.FC = () => {
  const [results, setResults] = useState<IBlacklistResult[]>([]);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheck = async () => {
    setIsLoading(true);
    setResults([]);
    setTimeTaken(null);
    setError(null);

    const phoneNumbers = generateRandomPhoneNumbers();

    const startTime = performance.now();

    try {
      const response = await axios.post("/api/check-numbers", { phoneNumbers });
      setResults(response.data.results);
      const endTime = performance.now();
      setTimeTaken((endTime - startTime) / 1000);
    } catch (error) {
      console.error("Error checking phone numbers:", error);
      setError(
        "An error occurred while checking the phone numbers. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-svh pt-[48px] bg-[#F2F4F7]">
      <div className="w-[800px] max-w-[800px]">
        <div className="flex items-center justify-between mb-[24px]">
          <div className="flex items-center gap-[16px]">
            <h1 className="text-[20px] font-bold">Blacklist Checker</h1>

            {!error && timeTaken && (
              <div className="px-[12px] py-[8px] bg-[#FFFFFF] rounded-[8px]">
                <p className="text-[18px]">
                  Time Taken: {timeTaken.toFixed(2)} seconds
                </p>
              </div>
            )}
          </div>

          <Button onClick={handleCheck} disabled={isLoading}>
            Generate Numbers
          </Button>
        </div>

        <div className="w-full h-[90%] p-[16px] bg-[#FFF] rounded-[20px] overflow-hidden">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {!error && !isLoading && (
                <>
                  {results?.length > 0 ? (
                    <PhoneTable results={results} />
                  ) : (
                    <EmptyPhones />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
