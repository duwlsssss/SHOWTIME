export const salaryFormatter = (salary: string) => {
	if (!salary) return '';
	return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
