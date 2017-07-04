const formatDate = date => {
  return date.getDate() + '/'
    + (date.getMonth() + 1) + '/'
    + date.getFullYear() + ' @ '
    + date.getHours() + ':'
    + date.getMinutes() + ':'
    + date.getSeconds();
};

const logCurrentContent = text => {
  const currentDate = new Date();
  const date = formatDate(currentDate);
  const temporaryBackup = { date, text };
  console.log('Text from: ' + date); // eslint-disable-line no-console
  console.log(temporaryBackup); // eslint-disable-line no-console
};

export default logCurrentContent;
