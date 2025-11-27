/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/dialog', 'N/record'],

function(dialog, record) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
        try {
            console.log('Customer Management Client Script initialized.');
        } catch (e) {
            console.error('Error in pageInit: ' + e.toString());
        }
    }

    /**
     * Function to validate customer data on button click.
     */
    function validateCustomerData() {
        try {
            var currentRecord = record.get();
            var companyName = currentRecord.getValue({ fieldId: 'companyname' });
            var email = currentRecord.getValue({ fieldId: 'email' });
            var validationMessage = '';
            var isValid = true;

            if (!companyName || companyName.trim() === '') {
                validationMessage += 'Company Name is required and cannot be empty.\n';
                isValid = false;
            }

            if (email && !validateEmail(email)) {
                validationMessage += 'Invalid email format for customer.\n';
                isValid = false;
            }

            if (isValid) {
                dialog.alert({
                    title: 'Validation Success',
                    message: 'Customer data is valid.'
                });
            } else {
                dialog.alert({
                    title: 'Validation Errors',
                    message: 'Please correct the following issues:\n' + validationMessage
                });
            }
        } catch (e) {
            console.error('Error in validateCustomerData: ' + e.toString());
            dialog.alert({
                title: 'Error',
                message: 'An error occurred while validating customer data: ' + e.toString()
            });
        }
    }

    /**
     * Helper function to validate email format.
     * @param {string} email - Email address to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return {
        pageInit: pageInit,
        validateCustomerData: validateCustomerData
    };
    
});
