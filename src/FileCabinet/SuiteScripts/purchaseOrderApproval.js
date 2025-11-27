/**
 * @NApiVersion 2.x
 * @NScriptType WorkflowActionScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/email'],

function(record, log, email) {
    
    /**
     * Definition of the Workflow Action script trigger point.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @returns {boolean} - Return true to continue with the workflow transition
     * @Since 2015.2
     */
    function onAction(scriptContext) {
        try {
            var purchaseOrder = scriptContext.newRecord;
            var total = purchaseOrder.getValue({ fieldId: 'total' });
            var approvalStatus = purchaseOrder.getValue({ fieldId: 'approvalstatus' });
            var approver = purchaseOrder.getValue({ fieldId: 'nextapprover' });
            var threshold = 5000.00; // Approval threshold amount

            // Check if the purchase order total exceeds the threshold for approval
            if (total > threshold && approvalStatus !== 'Approved') {
                purchaseOrder.setValue({
                    fieldId: 'approvalstatus',
                    value: 'Pending Approval'
                });
                
                // If an approver is set, send a notification email
                if (approver) {
                    email.send({
                        author: 1, // Use a system user ID or current user
                        recipients: approver,
                        subject: 'Purchase Order Approval Required',
                        body: 'A purchase order with ID ' + purchaseOrder.id + ' and total $' + total.toFixed(2) + ' requires your approval.'
                    });
                    
                    log.audit({
                        title: 'Purchase Order Approval Notification Sent',
                        details: 'Notification sent to approver ID ' + approver + ' for PO ID ' + purchaseOrder.id
                    });
                } else {
                    log.warning({
                        title: 'No Approver Set for Purchase Order',
                        details: 'Purchase Order ID ' + purchaseOrder.id + ' exceeds threshold but no approver is set.'
                    });
                }
            } else if (total <= threshold && approvalStatus !== 'Approved') {
                // Automatically approve POs below threshold if not already approved
                purchaseOrder.setValue({
                    fieldId: 'approvalstatus',
                    value: 'Approved'
                });
                
                log.audit({
                    title: 'Purchase Order Auto-Approved',
                    details: 'Purchase Order ID ' + purchaseOrder.id + ' auto-approved as total $' + total.toFixed(2) + ' is below threshold.'
                });
            } else {
                log.debug({
                    title: 'Purchase Order Approval Check',
                    details: 'Purchase Order ID ' + purchaseOrder.id + ' already approved or status unchanged.'
                });
            }
            
            return true; // Allow workflow transition to continue
        } catch (e) {
            log.error({
                title: 'Error in Purchase Order Approval Workflow Action',
                details: e.toString()
            });
            return false; // Prevent workflow transition if error occurs
        }
    }

    return {
        onAction: onAction
    };
    
});
