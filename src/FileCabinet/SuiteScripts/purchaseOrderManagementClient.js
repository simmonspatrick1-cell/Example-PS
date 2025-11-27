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
            console.log('Purchase Order Management Client Script initialized.');
        } catch (e) {
            console.error('Error in pageInit: ' + e.toString());
        }
    }

    /**
     * Function to validate purchase order data on button click.
     */
    function validatePurchaseOrder() {
        try {
            var currentRecord = record.get();
            var vendor = currentRecord.getValue({ fieldId: 'entity' });
            var lineCount = currentRecord.getLineCount({ sublistId: 'item' });
            var total = currentRecord.getValue({ fieldId: 'total' });
            var validationMessage = '';
            var isValid = true;

            if (!vendor) {
                validationMessage += 'Vendor is required for a purchase order.\n';
                isValid = false;
            }

            if (lineCount === 0) {
                validationMessage += 'At least one item is required on a purchase order.\n';
                isValid = false;
            }

            if (total <= 0) {
                validationMessage += 'Total amount must be greater than zero.\n';
                isValid = false;
            }

            if (isValid) {
                dialog.alert({
                    title: 'Validation Success',
                    message: 'Purchase order data is valid.'
                });
            } else {
                dialog.alert({
                    title: 'Validation Errors',
                    message: 'Please correct the following issues:\n' + validationMessage
                });
            }
        } catch (e) {
            console.error('Error in validatePurchaseOrder: ' + e.toString());
            dialog.alert({
                title: 'Error',
                message: 'An error occurred while validating purchase order data: ' + e.toString()
            });
        }
    }

    return {
        pageInit: pageInit,
        validatePurchaseOrder: validatePurchaseOrder
    };
    
});
