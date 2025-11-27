/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/ui/serverWidget'],

function(record, log, serverWidget) {
    
    /**
     * Function called before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {
        try {
            if (scriptContext.type === scriptContext.UserEventType.VIEW) {
                var form = scriptContext.form;
                form.addButton({
                    id: 'custpage_validatecustomer',
                    label: 'Validate Customer Data',
                    functionName: 'validateCustomerData'
                });
                form.clientScriptModulePath = './customerManagementClient.js';
            }
        } catch (e) {
            log.error({
                title: 'Error in beforeLoad',
                details: e.toString()
            });
        }
    }

    /**
     * Function called before record is submitted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
        try {
            if (scriptContext.type === scriptContext.UserEventType.CREATE || scriptContext.type === scriptContext.UserEventType.EDIT) {
                var newRecord = scriptContext.newRecord;
                var companyName = newRecord.getValue({ fieldId: 'companyname' });
                var email = newRecord.getValue({ fieldId: 'email' });

                if (!companyName || companyName.trim() === '') {
                    throw new Error('Company Name is required and cannot be empty.');
                }

                if (email && !validateEmail(email)) {
                    throw new Error('Invalid email format for customer.');
                }

                // Set a custom field to indicate validation status (assuming a custom field exists)
                newRecord.setValue({
                    fieldId: 'custentity_validation_status',
                    value: 'Pending Review'
                });

                log.debug({
                    title: 'Customer Validation',
                    details: 'Customer ' + companyName + ' passed basic validation checks.'
                });
            }
        } catch (e) {
            log.error({
                title: 'Error in beforeSubmit',
                details: e.toString()
            });
            throw e; // Re-throw to prevent saving if validation fails
        }
    }

    /**
     * Function called after record is submitted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {
        try {
            if (scriptContext.type === scriptContext.UserEventType.CREATE || scriptContext.type === scriptContext.UserEventType.EDIT) {
                var customerId = scriptContext.newRecord.id;
                log.audit({
                    title: 'Customer Record Updated',
                    details: 'Customer ID ' + customerId + ' has been created or updated.'
                });

                // Additional post-submission logic can be added here, e.g., notifications or related record updates
            }
        } catch (e) {
            log.error({
                title: 'Error in afterSubmit',
                details: e.toString()
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
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
