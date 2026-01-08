import React from "react";
import CustomPieChart from "../../charts/CustomPieChart";
const COLORS = ["#875cf5","#fa2c37","#ff6900"]
const FinancialOverview = ({ totalIncome, totalExpense, totalBalance }) => {
  const balanceData = [
    {
      name: "Total Balance",
      amount: totalBalance,
    },
    {
      name: "Total Income",
      amount: totalIncome,
    },
    {
      name: "Total Expense",
      amount: totalExpense,
    },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>
      <CustomPieChart data={balanceData} label="Total Balance" totalAmount={`$${totalBalance}`} colors={COLORS} showTextAnchor />
    </div>
  );
};

export default FinancialOverview;
