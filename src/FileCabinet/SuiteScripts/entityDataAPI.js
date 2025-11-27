/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/log', 'N/error', 'N/http'],

function(record, search, log, error, http) {
    
    /**
     * Function called upon sending a GET request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doGet(requestParams) {
        try {
            var entityType = requestParams.entity;
            var entityId = requestParams.id;
            
            if (!entityType) {
                return {
                    success: false,
                    message: 'Entity type is required. Use "customers" or "items".'
                };
            }
            
            if (entityType === 'customers') {
                return handleCustomerGet(entityId);
            } else if (entityType === 'items') {
                return handleItemGet(entityId);
            } else if (entityType === 'projects') {
                return handleProjectGet(entityId);
            } else if (entityType === 'estimates') {
                return handleEstimateGet(entityId);
            } else if (entityType === 'purchaseorders') {
                return handlePurchaseOrderGet(entityId);
            } else {
                return {
                    success: false,
                    message: 'Unsupported entity type. Use "customers", "items", "projects", "estimates", or "purchaseorders".'
                };
            }
        } catch (e) {
            log.error({
                title: 'Error in GET request',
                details: e.toString()
            });
            return {
                success: false,
                message: 'An error occurred: ' + e.toString()
            };
        }
    }

    /**
     * Function called upon sending a PUT request to the RESTlet.
     *
     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain' or as an Object when request Content-Type is 'application/json'
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doPut(requestBody) {
        try {
            var data = typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
            var entityType = data.entity;
            var entityId = data.id;
            
            if (!entityType) {
                return {
                    success: false,
                    message: 'Entity type is required. Use "customers" or "items".'
                };
            }
            
            if (!entityId) {
                return {
                    success: false,
                    message: 'Entity ID is required for update operations.'
                };
            }
            
            if (entityType === 'customers') {
                return handleCustomerPut(entityId, data);
            } else if (entityType === 'items') {
                return handleItemPut(entityId, data);
            } else if (entityType === 'projects') {
                return handleProjectPut(entityId, data);
            } else if (entityType === 'estimates') {
                return handleEstimatePut(entityId, data);
            } else if (entityType === 'purchaseorders') {
                return handlePurchaseOrderPut(entityId, data);
            } else {
                return {
                    success: false,
                    message: 'Unsupported entity type. Use "customers", "items", "projects", "estimates", or "purchaseorders".'
                };
            }
        } catch (e) {
            log.error({
                title: 'Error in PUT request',
                details: e.toString()
            });
            return {
                success: false,
                message: 'An error occurred: ' + e.toString()
            };
        }
    }

    /**
     * Function called upon sending a POST request to the RESTlet.
     *
     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain' or as an Object when request Content-Type is 'application/json'
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doPost(requestBody) {
        try {
            var data = typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
            var entityType = data.entity;
            
            if (!entityType) {
                return {
                    success: false,
                    message: 'Entity type is required. Use "customers" or "items".'
                };
            }
            
            if (entityType === 'customers') {
                return handleCustomerPost(data);
            } else if (entityType === 'items') {
                return handleItemPost(data);
            } else if (entityType === 'projects') {
                return handleProjectPost(data);
            } else if (entityType === 'estimates') {
                return handleEstimatePost(data);
            } else if (entityType === 'purchaseorders') {
                return handlePurchaseOrderPost(data);
            } else {
                return {
                    success: false,
                    message: 'Unsupported entity type. Use "customers", "items", "projects", "estimates", or "purchaseorders".'
                };
            }
        } catch (e) {
            log.error({
                title: 'Error in POST request',
                details: e.toString()
            });
            return {
                success: false,
                message: 'An error occurred: ' + e.toString()
            };
        }
    }

    /**
     * Function called upon sending a DELETE request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doDelete(requestParams) {
        try {
            var entityType = requestParams.entity;
            var entityId = requestParams.id;
            
            if (!entityType) {
                return {
                    success: false,
                    message: 'Entity type is required. Use "customers" or "items".'
                };
            }
            
            if (!entityId) {
                return {
                    success: false,
                    message: 'Entity ID is required for delete operations.'
                };
            }
            
            if (entityType === 'customers') {
                return handleCustomerDelete(entityId);
            } else if (entityType === 'items') {
                return handleItemDelete(entityId);
            } else if (entityType === 'projects') {
                return handleProjectDelete(entityId);
            } else if (entityType === 'estimates') {
                return handleEstimateDelete(entityId);
            } else if (entityType === 'purchaseorders') {
                return handlePurchaseOrderDelete(entityId);
            } else {
                return {
                    success: false,
                    message: 'Unsupported entity type. Use "customers", "items", "projects", "estimates", or "purchaseorders".'
                };
            }
        } catch (e) {
            log.error({
                title: 'Error in DELETE request',
                details: e.toString()
            });
            return {
                success: false,
                message: 'An error occurred: ' + e.toString()
            };
        }
    }

    // Helper functions for Customer operations
    function handleCustomerGet(customerId) {
        if (customerId) {
            var customer = record.load({
                type: record.Type.CUSTOMER,
                id: customerId,
                isDynamic: false
            });
            return {
                success: true,
                data: {
                    id: customer.id,
                    companyName: customer.getValue({ fieldId: 'companyname' }),
                    email: customer.getValue({ fieldId: 'email' }),
                    phone: customer.getValue({ fieldId: 'phone' }),
                    address: customer.getValue({ fieldId: 'defaultaddress' })
                }
            };
        } else {
            var customerSearch = search.create({
                type: search.Type.CUSTOMER,
                columns: ['internalid', 'companyname', 'email', 'phone', 'defaultaddress'],
                filters: []
            });
            var searchResults = customerSearch.run().getRange({ start: 0, end: 100 });
            var customers = searchResults.map(function(result) {
                return {
                    id: result.getValue('internalid'),
                    companyName: result.getValue('companyname'),
                    email: result.getValue('email'),
                    phone: result.getValue('phone'),
                    address: result.getValue('defaultaddress')
                };
            });
            return {
                success: true,
                data: customers
            };
        }
    }

    function handleCustomerPost(data) {
        var customer = record.create({
            type: record.Type.CUSTOMER,
            isDynamic: true
        });
        customer.setValue({ fieldId: 'companyname', value: data.companyName });
        if (data.email) customer.setValue({ fieldId: 'email', value: data.email });
        if (data.phone) customer.setValue({ fieldId: 'phone', value: data.phone });
        if (data.address) customer.setValue({ fieldId: 'defaultaddress', value: data.address });
        
        var customerId = customer.save();
        log.audit({
            title: 'Customer Created',
            details: 'Customer created with ID: ' + customerId
        });
        return {
            success: true,
            message: 'Customer created successfully',
            id: customerId
        };
    }

    function handleCustomerPut(customerId, data) {
        var customer = record.load({
            type: record.Type.CUSTOMER,
            id: customerId,
            isDynamic: true
        });
        if (data.companyName) customer.setValue({ fieldId: 'companyname', value: data.companyName });
        if (data.email) customer.setValue({ fieldId: 'email', value: data.email });
        if (data.phone) customer.setValue({ fieldId: 'phone', value: data.phone });
        if (data.address) customer.setValue({ fieldId: 'defaultaddress', value: data.address });
        
        var updatedId = customer.save();
        log.audit({
            title: 'Customer Updated',
            details: 'Customer updated with ID: ' + updatedId
        });
        return {
            success: true,
            message: 'Customer updated successfully',
            id: updatedId
        };
    }

    function handleCustomerDelete(customerId) {
        record.delete({
            type: record.Type.CUSTOMER,
            id: customerId
        });
        log.audit({
            title: 'Customer Deleted',
            details: 'Customer deleted with ID: ' + customerId
        });
        return {
            success: true,
            message: 'Customer deleted successfully',
            id: customerId
        };
    }

    // Helper functions for Project operations
    function handleProjectGet(projectId) {
        if (projectId) {
            var project = record.load({
                type: 'project', // Using a generic project type; adjust based on actual NetSuite record type
                id: projectId,
                isDynamic: false
            });
            return {
                success: true,
                data: {
                    id: project.id,
                    name: project.getValue({ fieldId: 'title' }) || project.getValue({ fieldId: 'entityid' }),
                    status: project.getValue({ fieldId: 'status' }) || 'Unknown',
                    customer: project.getValue({ fieldId: 'customer' }) || 'N/A',
                    startDate: project.getValue({ fieldId: 'startdate' }) || 'N/A',
                    endDate: project.getValue({ fieldId: 'enddate' }) || 'N/A'
                }
            };
        } else {
            var projectSearch = search.create({
                type: 'project',
                columns: ['internalid', 'entityid', 'title', 'status', 'customer', 'startdate', 'enddate'],
                filters: []
            });
            var searchResults = projectSearch.run().getRange({ start: 0, end: 100 });
            var projects = searchResults.map(function(result) {
                return {
                    id: result.getValue('internalid'),
                    name: result.getValue('title') || result.getValue('entityid'),
                    status: result.getValue('status') || 'Unknown',
                    customer: result.getValue('customer') || 'N/A',
                    startDate: result.getValue('startdate') || 'N/A',
                    endDate: result.getValue('enddate') || 'N/A'
                };
            });
            return {
                success: true,
                data: projects
            };
        }
    }

    function handleProjectPost(data) {
        var project = record.create({
            type: 'project',
            isDynamic: true
        });
        project.setValue({ fieldId: 'title', value: data.name });
        if (data.status) project.setValue({ fieldId: 'status', value: data.status });
        if (data.customer) project.setValue({ fieldId: 'customer', value: data.customer });
        if (data.startDate) project.setValue({ fieldId: 'startdate', value: data.startDate });
        if (data.endDate) project.setValue({ fieldId: 'enddate', value: data.endDate });
        
        var projectId = project.save();
        log.audit({
            title: 'Project Created',
            details: 'Project created with ID: ' + projectId
        });
        return {
            success: true,
            message: 'Project created successfully',
            id: projectId
        };
    }

    function handleProjectPut(projectId, data) {
        var project = record.load({
            type: 'project',
            id: projectId,
            isDynamic: true
        });
        if (data.name) project.setValue({ fieldId: 'title', value: data.name });
        if (data.status) project.setValue({ fieldId: 'status', value: data.status });
        if (data.customer) project.setValue({ fieldId: 'customer', value: data.customer });
        if (data.startDate) project.setValue({ fieldId: 'startdate', value: data.startDate });
        if (data.endDate) project.setValue({ fieldId: 'enddate', value: data.endDate });
        
        var updatedId = project.save();
        log.audit({
            title: 'Project Updated',
            details: 'Project updated with ID: ' + updatedId
        });
        return {
            success: true,
            message: 'Project updated successfully',
            id: updatedId
        };
    }

    function handleProjectDelete(projectId) {
        record.delete({
            type: 'project',
            id: projectId
        });
        log.audit({
            title: 'Project Deleted',
            details: 'Project deleted with ID: ' + projectId
        });
        return {
            success: true,
            message: 'Project deleted successfully',
            id: projectId
        };
    }

    // Helper functions for Estimate operations
    function handleEstimateGet(estimateId) {
        if (estimateId) {
            var estimate = record.load({
                type: record.Type.ESTIMATE,
                id: estimateId,
                isDynamic: false
            });
            return {
                success: true,
                data: {
                    id: estimate.id,
                    estimateNumber: estimate.getValue({ fieldId: 'tranid' }),
                    customer: estimate.getValue({ fieldId: 'entity' }),
                    total: estimate.getValue({ fieldId: 'total' }) || 0,
                    status: estimate.getValue({ fieldId: 'status' }) || 'Pending',
                    date: estimate.getValue({ fieldId: 'trandate' })
                }
            };
        } else {
            var estimateSearch = search.create({
                type: search.Type.ESTIMATE,
                columns: ['internalid', 'tranid', 'entity', 'total', 'status', 'trandate'],
                filters: []
            });
            var searchResults = estimateSearch.run().getRange({ start: 0, end: 100 });
            var estimates = searchResults.map(function(result) {
                return {
                    id: result.getValue('internalid'),
                    estimateNumber: result.getValue('tranid'),
                    customer: result.getValue('entity'),
                    total: result.getValue('total') || 0,
                    status: result.getValue('status') || 'Pending',
                    date: result.getValue('trandate')
                };
            });
            return {
                success: true,
                data: estimates
            };
        }
    }

    function handleEstimatePost(data) {
        var estimate = record.create({
            type: record.Type.ESTIMATE,
            isDynamic: true
        });
        if (data.customer) estimate.setValue({ fieldId: 'entity', value: data.customer });
        if (data.total) estimate.setValue({ fieldId: 'total', value: data.total });
        if (data.status) estimate.setValue({ fieldId: 'status', value: data.status });
        if (data.date) estimate.setValue({ fieldId: 'trandate', value: data.date });
        
        var estimateId = estimate.save();
        log.audit({
            title: 'Estimate Created',
            details: 'Estimate created with ID: ' + estimateId
        });
        return {
            success: true,
            message: 'Estimate created successfully',
            id: estimateId
        };
    }

    function handleEstimatePut(estimateId, data) {
        var estimate = record.load({
            type: record.Type.ESTIMATE,
            id: estimateId,
            isDynamic: true
        });
        if (data.customer) estimate.setValue({ fieldId: 'entity', value: data.customer });
        if (data.total) estimate.setValue({ fieldId: 'total', value: data.total });
        if (data.status) estimate.setValue({ fieldId: 'status', value: data.status });
        if (data.date) estimate.setValue({ fieldId: 'trandate', value: data.date });
        
        var updatedId = estimate.save();
        log.audit({
            title: 'Estimate Updated',
            details: 'Estimate updated with ID: ' + updatedId
        });
        return {
            success: true,
            message: 'Estimate updated successfully',
            id: updatedId
        };
    }

    function handleEstimateDelete(estimateId) {
        record.delete({
            type: record.Type.ESTIMATE,
            id: estimateId
        });
        log.audit({
            title: 'Estimate Deleted',
            details: 'Estimate deleted with ID: ' + estimateId
        });
        return {
            success: true,
            message: 'Estimate deleted successfully',
            id: estimateId
        };
    }

    // Helper functions for Purchase Order operations
    function handlePurchaseOrderGet(purchaseOrderId) {
        if (purchaseOrderId) {
            var purchaseOrder = record.load({
                type: record.Type.PURCHASE_ORDER,
                id: purchaseOrderId,
                isDynamic: false
            });
            return {
                success: true,
                data: {
                    id: purchaseOrder.id,
                    poNumber: purchaseOrder.getValue({ fieldId: 'tranid' }),
                    vendor: purchaseOrder.getValue({ fieldId: 'entity' }),
                    total: purchaseOrder.getValue({ fieldId: 'total' }) || 0,
                    status: purchaseOrder.getValue({ fieldId: 'status' }) || 'Pending',
                    date: purchaseOrder.getValue({ fieldId: 'trandate' })
                }
            };
        } else {
            var poSearch = search.create({
                type: search.Type.PURCHASE_ORDER,
                columns: ['internalid', 'tranid', 'entity', 'total', 'status', 'trandate'],
                filters: []
            });
            var searchResults = poSearch.run().getRange({ start: 0, end: 100 });
            var purchaseOrders = searchResults.map(function(result) {
                return {
                    id: result.getValue('internalid'),
                    poNumber: result.getValue('tranid'),
                    vendor: result.getValue('entity'),
                    total: result.getValue('total') || 0,
                    status: result.getValue('status') || 'Pending',
                    date: result.getValue('trandate')
                };
            });
            return {
                success: true,
                data: purchaseOrders
            };
        }
    }

    function handlePurchaseOrderPost(data) {
        var purchaseOrder = record.create({
            type: record.Type.PURCHASE_ORDER,
            isDynamic: true
        });
        if (data.vendor) purchaseOrder.setValue({ fieldId: 'entity', value: data.vendor });
        if (data.total) purchaseOrder.setValue({ fieldId: 'total', value: data.total });
        if (data.status) purchaseOrder.setValue({ fieldId: 'status', value: data.status });
        if (data.date) purchaseOrder.setValue({ fieldId: 'trandate', value: data.date });
        
        var poId = purchaseOrder.save();
        log.audit({
            title: 'Purchase Order Created',
            details: 'Purchase Order created with ID: ' + poId
        });
        return {
            success: true,
            message: 'Purchase Order created successfully',
            id: poId
        };
    }

    function handlePurchaseOrderPut(purchaseOrderId, data) {
        var purchaseOrder = record.load({
            type: record.Type.PURCHASE_ORDER,
            id: purchaseOrderId,
            isDynamic: true
        });
        if (data.vendor) purchaseOrder.setValue({ fieldId: 'entity', value: data.vendor });
        if (data.total) purchaseOrder.setValue({ fieldId: 'total', value: data.total });
        if (data.status) purchaseOrder.setValue({ fieldId: 'status', value: data.status });
        if (data.date) purchaseOrder.setValue({ fieldId: 'trandate', value: data.date });
        
        var updatedId = purchaseOrder.save();
        log.audit({
            title: 'Purchase Order Updated',
            details: 'Purchase Order updated with ID: ' + updatedId
        });
        return {
            success: true,
            message: 'Purchase Order updated successfully',
            id: updatedId
        };
    }

    function handlePurchaseOrderDelete(purchaseOrderId) {
        record.delete({
            type: record.Type.PURCHASE_ORDER,
            id: purchaseOrderId
        });
        log.audit({
            title: 'Purchase Order Deleted',
            details: 'Purchase Order deleted with ID: ' + purchaseOrderId
        });
        return {
            success: true,
            message: 'Purchase Order deleted successfully',
            id: purchaseOrderId
        };
    }

    // Helper functions for Item operations
    function handleItemGet(itemId) {
        if (itemId) {
            var item = record.load({
                type: record.Type.INVENTORY_ITEM,
                id: itemId,
                isDynamic: false
            });
            return {
                success: true,
                data: {
                    id: item.id,
                    itemId: item.getValue({ fieldId: 'itemid' }),
                    displayName: item.getValue({ fieldId: 'displayname' }),
                    description: item.getValue({ fieldId: 'salesdescription' }),
                    cost: item.getValue({ fieldId: 'cost' })
                }
            };
        } else {
            var itemSearch = search.create({
                type: search.Type.ITEM,
                columns: ['internalid', 'itemid', 'displayname', 'salesdescription', 'cost'],
                filters: []
            });
            var searchResults = itemSearch.run().getRange({ start: 0, end: 100 });
            var items = searchResults.map(function(result) {
                return {
                    id: result.getValue('internalid'),
                    itemId: result.getValue('itemid'),
                    displayName: result.getValue('displayname'),
                    description: result.getValue('salesdescription'),
                    cost: result.getValue('cost')
                };
            });
            return {
                success: true,
                data: items
            };
        }
    }

    function handleItemPost(data) {
        var item = record.create({
            type: record.Type.INVENTORY_ITEM,
            isDynamic: true
        });
        item.setValue({ fieldId: 'itemid', value: data.itemId });
        if (data.displayName) item.setValue({ fieldId: 'displayname', value: data.displayName });
        if (data.description) item.setValue({ fieldId: 'salesdescription', value: data.description });
        if (data.cost) item.setValue({ fieldId: 'cost', value: data.cost });
        
        var itemId = item.save();
        log.audit({
            title: 'Item Created',
            details: 'Item created with ID: ' + itemId
        });
        return {
            success: true,
            message: 'Item created successfully',
            id: itemId
        };
    }

    function handleItemPut(itemId, data) {
        var item = record.load({
            type: record.Type.INVENTORY_ITEM,
            id: itemId,
            isDynamic: true
        });
        if (data.itemId) item.setValue({ fieldId: 'itemid', value: data.itemId });
        if (data.displayName) item.setValue({ fieldId: 'displayname', value: data.displayName });
        if (data.description) item.setValue({ fieldId: 'salesdescription', value: data.description });
        if (data.cost) item.setValue({ fieldId: 'cost', value: data.cost });
        
        var updatedId = item.save();
        log.audit({
            title: 'Item Updated',
            details: 'Item updated with ID: ' + updatedId
        });
        return {
            success: true,
            message: 'Item updated successfully',
            id: updatedId
        };
    }

    function handleItemDelete(itemId) {
        record.delete({
            type: record.Type.INVENTORY_ITEM,
            id: itemId
        });
        log.audit({
            title: 'Item Deleted',
            details: 'Item deleted with ID: ' + itemId
        });
        return {
            success: true,
            message: 'Item deleted successfully',
            id: itemId
        };
    }

    return {
        'get': doGet,
        'put': doPut,
        'post': doPost,
        'delete': doDelete
    };
});
