const axios = require('axios');

module.exports = {
  totalRatingsAndAvgRating: (obj) => {
    var arr = [1, 2, 3, 4, 5];
    var helperArr = arr.reduce((acc, element) => {
      var key = String(element);
      acc[0] += Number(obj[key]) || 0;
      acc[1] += Number(obj[key] * element) || 0;
      return acc;
    }, [0, 0]);
    return [helperArr[0], (Math.round(helperArr[1] / helperArr[0] * 100) / 100).toFixed(2)];
  },

 QuantitySelectArr: (num) => {
    if (num === 0) {
      return [];
    }
    var num = Math.min(15, num);
    var arr = [...Array(num + 1).keys()];
    return arr.slice(1);
  }
}