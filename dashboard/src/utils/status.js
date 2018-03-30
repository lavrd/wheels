const getStatusColors = (status) => {
  const statuses = {
    danger: 'is-danger'
  };
  return statuses[status] || '';
};

export {getStatusColors};
