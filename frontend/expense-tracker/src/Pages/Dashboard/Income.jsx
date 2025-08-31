import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/layouts/DashboardLayout'
import IncomeOverview from '../../Components/Income/IncomeOverview';
import axiosInstance from '../../Utils/axiosinstance';
import { API_PATHS } from '../../Utils/ApiPaths';
import Modal from '../../Components/Modal';
import AddIncomeForm from '../../Components/Income/AddIncomeForm';
import IncomeList from '../../Components/Inputs/IncomeList';
import DeleteAlert from '../../Components/deleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false) 

  // get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if(response.data) {
        setIncomeData(response.data);
      }
    }catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  // handle add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validation checks
    if (!source.trim()) {
      toast.error("Source is required.");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModel(false);
      toast.success("Income added succesfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
      "Error adding income:",
      error.response?.data?.message || error.message
    );
    }
  };

  //Delete Income
  const deleteIncome = async (id) => {
     try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
     } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
     }
  };

  //handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
    }, []);


  return (
    <DashboardLayout activeMenu = "Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }} 
            onDownload={handleDownloadIncomeDetails}
            />
        </div>

        <Modal
           isOpen={openAddIncomeModel}
           onClose={() => setOpenAddIncomeModel(false)}
           title="Add Income"
           >
            <AddIncomeForm onAddIncome={handleAddIncome} />
           </Modal>

           <Modal
           isOpen={openDeleteAlert.show}
           onClose={() => setOpenDeleteAlert({ show: false, date: null})}
           title="Delete Income"
           >
            <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
            
           </Modal>
        </div>
        </DashboardLayout>
  )
}

export default Income
