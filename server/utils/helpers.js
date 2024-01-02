const Transaction = require('../models/transaction.model');

const excludedWords = ['AN', 'AND', 'IN'];

const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (word) =>
        excludedWords.includes(word)
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(),
    );

const removePrefix = (str, prefix) => {
    const words = str.split('_');
    const prefixWords = prefix.split('_');

    // Remove the matching prefix words from the beginning of the array
    let index = 0;
    while (
        index < words.length &&
        index < prefixWords.length &&
        words[index].toUpperCase() === prefixWords[index].toUpperCase()
    ) {
        index++;
    }

    // Join the remaining words into a string
    const result = words.slice(index).join(' ');

    return result;
};

async function getMonthlySpending(id, year, month) {
    // Check if transactions exist
    const results = await Transaction.find({ user: id });

    if (results.length > 0) {
        const data = await Transaction.aggregate([
            {
                $match: {
                    date: {
                        $gte: `${year}-${month}-01`,
                        $lte: `${year}-${month}-31`,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    sumSpending: { $sum: '$amount' },
                },
            },
        ]);

        return data;
    }

    // Return empty array if no transactions
    return results;
}

module.exports = {
    toTitleCase,
    removePrefix,
    getMonthlySpending,
};
