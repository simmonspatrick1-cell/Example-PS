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
            console.log('Project Task Management Client Script initialized.');
        } catch (e) {
            console.error('Error in pageInit: ' + e.toString());
        }
    }

    /**
     * Function to validate project task data on button click.
     */
    function validateProjectTask() {
        try {
            var currentRecord = record.get();
            var title = currentRecord.getValue({ fieldId: 'title' });
            var project = currentRecord.getValue({ fieldId: 'project' });
            var validationMessage = '';
            var isValid = true;

            if (!title || title.trim() === '') {
                validationMessage += 'Task Title is required and cannot be empty.\n';
                isValid = false;
            }

            if (!project) {
                validationMessage += 'Associated Project is required for a project task.\n';
                isValid = false;
            }

            if (isValid) {
                dialog.alert({
                    title: 'Validation Success',
                    message: 'Project task data is valid.'
                });
            } else {
                dialog.alert({
                    title: 'Validation Errors',
                    message: 'Please correct the following issues:\n' + validationMessage
                });
            }
        } catch (e) {
            console.error('Error in validateProjectTask: ' + e.toString());
            dialog.alert({
                title: 'Error',
                message: 'An error occurred while validating project task data: ' + e.toString()
            });
        }
    }

    return {
        pageInit: pageInit,
        validateProjectTask: validateProjectTask
    };
    
});
