import React from "react";
import { Progress } from "antd";
const Analytics = ({ alltransactions }) => {
  // calculations for pie chart
  // total transaction
  const totalTransaction = alltransactions.length;
  const totalIncomeTransactions = alltransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = alltransactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total turnover
  const totalTurnover = alltransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = alltransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = alltransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransactions.length}
              </h5>
              
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
             
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={100 - totalIncomePercent.toFixed(0)}
                />
              
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total TurnOver : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTurnover}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTurnover}
              </h5>
              
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
              <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={100 - totalIncomeTurnoverPercent.toFixed(0)}
                />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
