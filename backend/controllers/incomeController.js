const xlsx = require('xlsx');
const Income = require('../models/Income');

// add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const{ icon, source, amount, date } = req.body;

        //validaion: check for missing fields
        if(!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are reuired"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    }catch (error){
        console.log("Add Income Error:", error); // Log the error
        res.status(500).json({ message: "Server Error"});
    }
}

// get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date: -1 });
        res.json(income);
    } catch(error) {
        console.log("Get All Income Error:", error); // Log the error
        res.status(500).json({ message: "Server Error"});
    }
};

// delete Income Source
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted succeefully"});
    } catch (error) {
        console.log("Delete Income Error:", error); // Log the error
        res.status(500).json({ message: "Server Error"});
    }
};
   
// download Income Excel Source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        //prepare data fo excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (error) {
        console.log("Download Income Excel Error:", error); // Log the error
        res.status(500).json({message: "Server Error"});
    }
};
