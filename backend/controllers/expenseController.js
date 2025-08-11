const xlsx = require('xlsx');
const Expense = require('../models/Expense');

// add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const{ icon, category, amount, date } = req.body;

        //validaion: check for missing fields
        if(!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are reuired"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    }catch (error){
        console.log("Add Expense Error:", error); // Log the error
        res.status(500).json({ message: "Server Error"});
    }
}

// get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date: -1 });
        res.json(expense);
    } catch(error) {
        console.log("Get All Expense Error:", error); // Log the error
        res.status(500).json({ message: "Server Error"});
    }
};

// delete Expense Source
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted succeefully"});
    } catch (error) {
        console.log("Delete Expense Error:", error); // Log the error
        res.status(500).json({ message: "Server Error"});
    }
};
   
// download Expense Excel Source
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //prepare data fo excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        console.log("Download Expense Excel Error:", error); // Log the error
        res.status(500).json({message: "Server Error"});
    }
};
