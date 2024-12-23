import React from "react";
import { findPortfolioById } from "@/server/actions/portfolio";
import EditPortfolio from "../_components/EditPortfolio";
const Page = async ({ params }) => {
const {portfolio_id : portfolioId} = params;
const portfolioResponse = await findPortfolioById({ _id: portfolioId })
console.log("portfolio response ",portfolioResponse)
let fetchedSinglePortfolio = portfolioResponse.data[0]
return (
    <>
      <div className="flex flex-col items-center justify-start overflow-auto min-h-full bg-gray-200 p-8 w-full">
        <EditPortfolio singlePortfolio={fetchedSinglePortfolio} />
      </div>
    </>
)
}
export default Page;