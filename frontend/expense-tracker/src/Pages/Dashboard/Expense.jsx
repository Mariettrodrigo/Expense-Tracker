import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import ExpenseOverview from '../../Components/Expense/ExpenseOverview';
import axiosInstance from '../../Utils/axiosinstance';
import { API_PATHS } from '../../Utils/ApiPaths';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false) 

      // get all expense details
      const fetchExpenseDetails = async () => {
        if (loading) return;
    
        setLoading(true);
    
        try{
          const response = await axiosInstance.get(
            `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
          );
    
          if(response.data) {
            setExpenseData(response.data);
          }
        }catch (error) {
          console.log("Something went wrong. Please try again.", error)
        } finally {
          setLoading(false);
        }
      };
    
      // handle add expense
      const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;
    
        //validation checks
        if (!category.trim()) {
          toast.error("category is required.");
          return;
        }
    
        if (!amount  || isNaN(amount) || Number(amount) <= 0) {
          toast.error("Amount should be a valid number greater than 0.");
          return;
        }
    
        if (!date) {
          toast.error("Date is required.");
          return;
        }
    
        try {
          await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
            category,
            amount,
            date,
            icon,
          });
    
          setOpenAddExpenseModel(false);
          toast.success("Expense added succesfully");
          fetchExpenseDetails();
        } catch (error) {
          console.error(
          "Error adding expense:",
          error.response?.data?.message || error.message
        );
        }
      };

      useEffect(() => {
        fetchExpenseDetails()

        return () => {
        }
      },[] );
    

  return (
    <DashboardLayout activeMenu = "Expense">
          <div className='my-5 mx-auto'></div>
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <ExpenseOverview
                 transactions={expenseData}
                 onExpenseIncome={() => setOpenAddExpenseModel(true)}
                 />
            </div>
          </div>
    </DashboardLayout>
  )
}

export default Expense
