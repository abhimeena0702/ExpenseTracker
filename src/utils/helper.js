import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) {
    return;
  }
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) {
    return "";
  }
  const [integerPart, fractionalPart] = num.toString().split(".");

  const isNegative = integerPart.startsWith("-");
  const absoluteIntegerPart = isNegative ? integerPart.slice(1) : integerPart;

  const formattedInteger = absoluteIntegerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  const finalIntegerPart = isNegative
    ? `-${formattedInteger}`
    : formattedInteger;
  return fractionalPart
    ? `${finalIntegerPart}.${fractionalPart}`
    : finalIntegerPart;
};

export const prepareExpenseBarChartData = (data = []) => {
  const aggregatedMap = data.reduce((acc, item) => {
    const category = item?.category;
    const amount = item?.amount || 0;

    if (category) {
      // Sum the amounts for the same category
      acc[category] = (acc[category] || 0) + amount;
    }
    return acc;
  }, {});

  // Convert the map back into an array of objects for Recharts
  const chartData = Object.keys(aggregatedMap).map((category) => {
    return {
      category: category,
      amount: aggregatedMap[category],
    };
  });
  return chartData;
};


export const prepareIncomeBarChartData = (data=[])=>{
  const chartData = data.map((item)=>{
    return({
      month:moment(item?.date).format("Do MMM"),
      amount:item?.amount,
      source:item?.source
    })
  })
return chartData;
}

export const prepareExpenseLineChartData = (data=[])=>{
  const chartData = data.map((item)=>{
    return {
      month : moment(item?.date).format("Do MMM"),
      amount:item?.amount,
      category:item?.category,
    }
  })
  return chartData;
}