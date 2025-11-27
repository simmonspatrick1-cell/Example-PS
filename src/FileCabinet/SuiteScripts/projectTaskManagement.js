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
                    id: 'custpage_validateprojecttask',
                    label: 'Validate Project Task',
                    functionName: 'validateProjectTask'
                });
                form.clientScriptModulePath = './projectTaskManagementClient.js';
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
                var title = newRecord.getValue({ fieldId: 'title' });
                var project = newRecord.getValue({ fieldId: 'project' });
                var startDate = newRecord.getValue({ fieldId: 'startdate' });

                if (!title || title.trim() === '') {
                    throw new Error('Task Title is required and cannot be empty.');
                }

                if (!project) {
                    throw new Error('Associated Project is required for a project task.');
                }

                if (startDate && new Date(startDate) < new Date()) {
                    log.warning({
                        title: 'Past Start Date',
                        details: 'Start Date for project task is in the past.'
                    });
                }

                // Set a custom field to indicate validation status (assuming a custom field exists)
                newRecord.setValue({
                    fieldId: 'custentity_task_validation_status',
                    value: 'Pending Review'
                });

                log.debug({
                    title: 'Project Task Validation',
                    details: 'Project Task ' + title + ' passed basic validation checks.'
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
                var taskId = scriptContext.newRecord.id;
                log.audit({
                    title: 'Project Task Record Updated',
                    details: 'Project Task ID ' + taskId + ' has been created or updated.'
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

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
