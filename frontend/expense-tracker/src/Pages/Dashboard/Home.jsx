import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import axiosInstance from '../../Utils/axiosinstance';
import { API_PATHS } from '../../Utils/ApiPaths';
import InfoCard from '../../Components/Cards/InfoCard';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import{IoMdCard} from "react-icons/io";
import { addThousandsSeperator } from '../../Utils/helper';
import RecentTransactions from '../../Components/Dashboard/RecentTransactions';
import FinanceOverview from '../../Components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../Components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../Components/Dashboard/last30DaysExpenses';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [DashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu = "Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon={<IoMdCard />}
          label="Total Balance"
          value={addThousandsSeperator(DashboardData?.totalBalance || 0)}
          color="bg-primary"
          />

          <InfoCard
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandsSeperator(DashboardData?.totalIncome || 0)}
          color="bg-orange-500"
          />

          <InfoCard
          icon={<LuHandCoins />}
          label="Total Expense"
          value={addThousandsSeperator(DashboardData?.totalExpense || 0)}
          color="bg-red-500"
          />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <RecentTransactions
            transactions={DashboardData?.RecentTransactions}
            onSeeMore={() => navigate("/expense")}
            />

            <FinanceOverview
            totalBalance={DashboardData?.totalBalance || 0}
            totalIncome={DashboardData?.totalIncome || 0}
            totalExpense={DashboardData?.totalExpense || 0}
            />

            <ExpenseTransactions
              transactions={DashboardData?.last30DaysExpenses?.transactions || [] }
              onSeeMore={() => navigate("/expense")}
              />

              <Last30DaysExpenses
              data={DashboardData?.last30DaysExpenses?.transactions || []}
              />
          </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
